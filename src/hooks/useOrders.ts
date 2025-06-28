import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import { Order } from '../contexts/CartContext';
import { cacheUtils, performanceMonitor, optimizeQuery } from '../lib/cache-utils';

export function useOrders(options: {
  pageSize?: number;
  status?: Order['status'];
  dateRange?: { start: Date; end: Date };
  enabled?: boolean;
} = {}) {
  const {
    pageSize = 25,
    status,
    dateRange,
    enabled = true
  } = options;

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  // Generate cache key based on filters
  const cacheKey = useMemo(() => {
    const filters = { status, dateRange, page: currentPage, pageSize };
    return `orders_${JSON.stringify(filters)}`;
  }, [status, dateRange, currentPage, pageSize]);

  // Fetch orders with caching and optimization
  const fetchOrders = useCallback(async (page = 0, append = false) => {
    if (!enabled) return;

    try {
      performanceMonitor.startTiming('fetchOrders');
      
      if (!append) {
        setLoading(true);
        setError(null);
      }

      // Try cache first for instant loading
      if (!append) {
        const cachedOrders = await cacheUtils.get<Order[]>('orders', cacheKey);
        if (cachedOrders) {
          console.log('📦 Orders loaded from cache');
          setOrders(cachedOrders);
          setLoading(false);
          performanceMonitor.endTiming('fetchOrders');
          return;
        }
      }

      // Build optimized query
      let query = supabase
        .from('orders')
        .select(`
          id,
          user_id,
          status,
          total_items,
          notes,
          items,
          created_at,
          updated_at
        `);

      // Add filters
      if (status) {
        query = query.eq('status', status);
      }

      if (dateRange) {
        query = query
          .gte('created_at', dateRange.start.toISOString())
          .lte('created_at', dateRange.end.toISOString());
      }

      // Add pagination and ordering
      query = query
        .order('created_at', { ascending: false })
        .range(page * pageSize, (page + 1) * pageSize - 1);

      const { data, error: queryError } = await query;

      if (queryError) {
        console.error('Orders fetch error:', queryError);
        throw queryError;
      }

      const newOrders = data || [];
      
      // Update state
      if (append) {
        setOrders(prev => [...prev, ...newOrders]);
      } else {
        setOrders(newOrders);
        // Cache the results
        await cacheUtils.set('orders', cacheKey, newOrders);
      }

      // Check if there are more pages
      setHasNextPage(newOrders.length === pageSize);
      
      console.log(`✅ Fetched ${newOrders.length} orders from database`);
      performanceMonitor.endTiming('fetchOrders');

    } catch (err: any) {
      console.error('Error fetching orders:', err);
      setError(err.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, [enabled, cacheKey, pageSize, status, dateRange]);

  // Load next page for pagination
  const loadNextPage = useCallback(async () => {
    if (!hasNextPage || loading) return;
    
    setCurrentPage(prev => {
      const nextPage = prev + 1;
      fetchOrders(nextPage, true);
      return nextPage;
    });
  }, [hasNextPage, loading, fetchOrders]);

  // Update order status with optimistic updates
  const updateOrderStatus = useCallback(async (orderId: string, newStatus: Order['status']) => {
    try {
      performanceMonitor.startTiming('updateOrderStatus');
      
      // Find the order for optimistic update
      const orderToUpdate = orders.find(order => order.id === orderId);
      if (!orderToUpdate) {
        throw new Error('Order not found');
      }

      const previousStatus = orderToUpdate.status;

      // Optimistic update
      setOrders(prev => 
        prev.map(order => 
          order.id === orderId 
            ? { ...order, status: newStatus, updated_at: new Date().toISOString() }
            : order
        )
      );

      // Perform actual database update
      const { error } = await supabase
        .from('orders')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId);

      if (error) {
        // Revert optimistic update on error
        setOrders(prev => 
          prev.map(order => 
            order.id === orderId 
              ? { ...order, status: previousStatus }
              : order
          )
        );
        throw error;
      }

      // Clear cache to ensure fresh data
      cacheUtils.clear('orders');
      
      console.log(`✅ Order ${orderId} status updated to ${newStatus}`);
      performanceMonitor.endTiming('updateOrderStatus');

      return true;
    } catch (err: any) {
      console.error('Error updating order status:', err);
      setError(err.message);
      return false;
    }
  }, [orders]);

  // Batch update order statuses
  const batchUpdateStatus = useCallback(async (orderIds: string[], newStatus: Order['status']) => {
    try {
      performanceMonitor.startTiming('batchUpdateStatus');
      
      // Optimistic update
      const previousOrders = orders.slice();
      setOrders(prev => 
        prev.map(order => 
          orderIds.includes(order.id!) 
            ? { ...order, status: newStatus, updated_at: new Date().toISOString() }
            : order
        )
      );

      // Batch database update
      const { error } = await supabase
        .from('orders')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .in('id', orderIds);

      if (error) {
        // Revert on error
        setOrders(previousOrders);
        throw error;
      }

      // Clear cache
      cacheUtils.clear('orders');
      
      console.log(`✅ Batch updated ${orderIds.length} orders to ${newStatus}`);
      performanceMonitor.endTiming('batchUpdateStatus');

      return true;
    } catch (err: any) {
      console.error('Error batch updating orders:', err);
      setError(err.message);
      return false;
    }
  }, [orders]);

  // Get order statistics with memoization
  const getOrderStats = useCallback(() => {
    const stats = {
      totalOrders: orders.length,
      pendingOrders: 0,
      confirmedOrders: 0,
      processingOrders: 0,
      shippedOrders: 0,
      deliveredOrders: 0,
      cancelledOrders: 0,
      totalValue: 0
    };

    orders.forEach(order => {
      switch (order.status) {
        case 'pending':
          stats.pendingOrders++;
          break;
        case 'confirmed':
          stats.confirmedOrders++;
          break;
        case 'processing':
          stats.processingOrders++;
          break;
        case 'shipped':
          stats.shippedOrders++;
          break;
        case 'delivered':
          stats.deliveredOrders++;
          break;
        case 'cancelled':
          stats.cancelledOrders++;
          break;
      }
      
      // Calculate total value if available
      if (order.items) {
        const orderValue = order.items.reduce((sum, item) => {
          return sum + (item.price || 0) * item.quantity;
        }, 0);
        stats.totalValue += orderValue;
      }
    });

    return stats;
  }, [orders]);

  // Memoized stats for performance
  const orderStats = useMemo(() => getOrderStats(), [getOrderStats]);

  // Refetch orders
  const refetch = useCallback(() => {
    setCurrentPage(0);
    setOrders([]);
    fetchOrders(0, false);
  }, [fetchOrders]);

  // Real-time subscription with debouncing
  useEffect(() => {
    fetchOrders();

    // Subscribe to real-time changes with performance optimization
    const subscription = supabase
      .channel('orders_admin_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'orders' 
        }, 
        (payload) => {
          console.log('Orders real-time update:', payload.eventType);
          
          // Debounced refresh to avoid excessive updates
          const debouncedRefresh = setTimeout(() => {
            fetchOrders(0, false); // Refresh from beginning
          }, 1000);

          return () => clearTimeout(debouncedRefresh);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchOrders]);

  // Effect for filter changes
  useEffect(() => {
    setCurrentPage(0);
    setOrders([]);
    fetchOrders(0, false);
  }, [status, dateRange]);

  return {
    orders,
    loading,
    error,
    hasNextPage,
    currentPage,
    orderStats,
    refetch,
    loadNextPage,
    updateOrderStatus,
    batchUpdateStatus,
    getOrderStats: () => orderStats,
    // Performance and cache utilities
    cacheStats: cacheUtils.getStats()
  };
} 