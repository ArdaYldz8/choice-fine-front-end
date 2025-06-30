import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import { Order } from '../contexts/CartContext';
import { cacheUtils, performanceMonitor, optimizeQuery } from '../lib/cache-utils';

export function useOrders(options: {
  pageSize?: number;
  status?: Order['status'];
  dateRange?: { start: Date; end: Date };
  enabled?: boolean;
  userId?: string;
} = {}) {
  const {
    pageSize = 25,
    status,
    dateRange,
    enabled = true,
    userId
  } = options;

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  // Generate cache key based on filters
  const cacheKey = useMemo(() => {
    const filters = { status, dateRange, page: currentPage, pageSize, userId };
    return `orders_${JSON.stringify(filters)}`;
  }, [status, dateRange, currentPage, pageSize, userId]);

  // Fetch orders with caching and optimization
  const fetchOrders = useCallback(async (page = 0, append = false) => {
    console.log('🔄 fetchOrders called:', { enabled, userId, page, append });
    
    if (!enabled) {
      console.log('❌ fetchOrders disabled, returning');
      return;
    }

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
          console.log('📦 Orders loaded from cache:', cachedOrders.length);
          setOrders(cachedOrders);
          setLoading(false);
          performanceMonitor.endTiming('fetchOrders');
          return;
        }
      }

      console.log('🔍 Building query with filters:', { status, dateRange, userId, page, pageSize });

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
        console.log('🔎 Adding status filter:', status);
        query = query.eq('status', status);
      }

      if (dateRange) {
        console.log('🔎 Adding date range filter:', dateRange);
        query = query
          .gte('created_at', dateRange.start.toISOString())
          .lte('created_at', dateRange.end.toISOString());
      }

      // Add user filter for user-specific orders
      if (userId) {
        console.log('🔎 Adding userId filter:', userId);
        query = query.eq('user_id', userId);
      }

      // Add pagination and ordering
      query = query
        .order('created_at', { ascending: false })
        .range(page * pageSize, (page + 1) * pageSize - 1);

      console.log('📡 Executing query...');
      const { data, error: queryError } = await query;

      if (queryError) {
        console.error('❌ Orders fetch error:', queryError);
        throw queryError;
      }

      console.log('📊 Query result:', { 
        dataLength: data?.length || 0, 
        data: data ? data.map(o => ({ id: o.id, user_id: o.user_id, status: o.status })) : null 
      });

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
      console.error('❌ Error fetching orders:', err);
      setError(err.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, [enabled, cacheKey, pageSize, status, dateRange, userId]);

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
    if (!enabled) {
      console.log('❌ useOrders: Not enabled, skipping subscription');
      return;
    }

    console.log('🔄 useOrders: Setting up subscription and initial fetch');
    fetchOrders();

    // Subscribe to real-time changes with performance optimization
    const channelName = userId ? `orders_user_${userId}_changes` : 'orders_admin_changes';
    console.log('📡 useOrders: Creating subscription channel:', channelName);
    
    const subscription = supabase
      .channel(channelName)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'orders'
          // Removed user filter - do client-side filtering instead
        }, 
        (payload) => {
          console.log('📨 Orders real-time update received:', payload.eventType, payload);
          
          // Client-side filtering: only react to changes for this user
          if (userId && payload.new && (payload.new as any).user_id !== userId && 
              payload.old && (payload.old as any).user_id !== userId) {
            console.log('🚫 Ignoring update for different user');
            return;
          }
          
          // Clear cache immediately on updates
          cacheUtils.clear('orders');
          
          // Debounced refresh to avoid excessive updates
          setTimeout(() => {
            console.log('🔄 Refreshing orders after real-time update');
            fetchOrders(0, false); // Refresh from beginning
          }, 500); // Reduced delay for better UX
        }
      )
      .subscribe((status) => {
        console.log('📡 Subscription status:', status);
      });

    return () => {
      console.log('🚪 useOrders: Cleaning up subscription');
      subscription.unsubscribe();
    };
  }, [fetchOrders, userId, enabled]);

  // Effect for filter changes
  useEffect(() => {
    if (!enabled) return;
    
    console.log('🔄 useOrders: Filters changed, refetching orders');
    setCurrentPage(0);
    setOrders([]);
    // Clear cache when filters change
    cacheUtils.clear('orders');
    fetchOrders(0, false);
  }, [status, dateRange, userId, enabled]);

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