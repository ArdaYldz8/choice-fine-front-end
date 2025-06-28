import { useState, useEffect, useMemo, useCallback } from 'react'
import { supabase, type Product } from '../lib/supabase'
import { cacheUtils, optimizeQuery, performanceMonitor } from '../lib/cache-utils'

// Mock products as fallback when real data isn't available
const mockProducts: Product[] = [
  {
    id: 'MOCK001',
    name: 'Sample Mediterranean Olive Oil',
    description: 'Premium extra virgin olive oil from Mediterranean region',
    price: 25.99,
    category: 'OLIVES',
    sku: 'MOCK001',
    active: true,
    quantity_on_hand: 100,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'MOCK002', 
    name: 'Traditional Baklava',
    description: 'Authentic honey-sweetened pastry with nuts',
    price: 18.50,
    category: 'SWEETS',
    sku: 'MOCK002',
    active: true,
    quantity_on_hand: 50,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'MOCK003',
    name: 'Premium Turkish Coffee',
    description: 'Finely ground coffee beans, traditional blend',
    price: 12.99,
    category: 'COFFEE',
    sku: 'MOCK003', 
    active: true,
    quantity_on_hand: 75,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Optimized product fetching with pagination and caching
export function useProducts(options: {
  pageSize?: number;
  category?: string;
  searchTerm?: string;
  sortBy?: string;
  enabled?: boolean;
} = {}) {
  const {
    pageSize = 50, // Virtual scrolling-friendly page size
    category,
    searchTerm,
    sortBy = 'name',
    enabled = true
  } = options;

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingMockData, setUsingMockData] = useState(false)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)

  // Generate cache key based on filters
  const cacheKey = useMemo(() => {
    const filters = { category, searchTerm, sortBy, page: currentPage, pageSize };
    return `products_${JSON.stringify(filters)}`;
  }, [category, searchTerm, sortBy, currentPage, pageSize]);

  // Optimized fetch function with caching
  const fetchProducts = useCallback(async (page = 0, append = false) => {
    if (!enabled) return;

    try {
      performanceMonitor.startTiming('fetchProducts');
      
      if (!append) {
        setLoading(true);
        setError(null);
      }
      
      // Try cache first for fast loading
      const cacheResult = await cacheUtils.get<Product[]>('products', cacheKey);
      if (cacheResult && !append) {
        console.log('📦 Products loaded from cache');
        setProducts(cacheResult);
        setLoading(false);
        performanceMonitor.endTiming('fetchProducts');
        return;
      }

      setUsingMockData(false);
      
      // Build optimized query - start with basic query first
      let query = supabase
        .from('products')
        .select('id, name, description, price, category, sku, active, quantity_on_hand')
        .eq('active', true);

      // Add category filter
      if (category && category !== 'All Categories') {
        query = query.eq('category', category);
      }

      // Add pagination and ordering
      query = query
        .order(sortBy)
        .range(page * pageSize, (page + 1) * pageSize - 1);

      // Execute query with timeout
      const queryPromise = query;
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Query timeout - database might be slow')), 15000);
      });

      const { data, error: queryError } = await Promise.race([queryPromise, timeoutPromise]) as any;

      if (queryError) {
        console.error('Supabase error:', queryError);
        throw queryError;
      }
      
      console.log(`✅ Fetched ${data?.length || 0} products from database`);
      
      const newProducts = data || [];
      
      // Update state
      if (append) {
        setProducts(prev => [...prev, ...newProducts]);
      } else {
        setProducts(newProducts);
        // Cache the results
        await cacheUtils.set('products', cacheKey, newProducts);
      }
      
      // Check if there are more pages
      setHasNextPage(newProducts.length === pageSize);
      
      performanceMonitor.endTiming('fetchProducts');
      
    } catch (err) {
      console.error('Error in fetchProducts:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      
      // Use mock data for various error conditions
      if (errorMessage.includes('relation "products" does not exist') || 
          errorMessage.includes('timeout') ||
          errorMessage.includes('Query timeout') ||
          errorMessage.includes('JWT') ||
          errorMessage.includes('permission')) {
        console.log('📦 Using mock product data as fallback');
        setProducts(mockProducts);
        setUsingMockData(true);
        setError(`Using sample data: ${errorMessage}`);
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }, [enabled, cacheKey, pageSize, category, searchTerm, sortBy]);

  // Load next page for virtual scrolling
  const loadNextPage = useCallback(async () => {
    if (!hasNextPage || loading) return;
    
    setCurrentPage(prev => {
      const nextPage = prev + 1;
      fetchProducts(nextPage, true);
      return nextPage;
    });
  }, [hasNextPage, loading, fetchProducts]);

  // Reset and refetch
  const refetch = useCallback(() => {
    setCurrentPage(0);
    setProducts([]);
    fetchProducts(0, false);
  }, [fetchProducts]);

  // Initial load and dependency updates
  useEffect(() => {
    setCurrentPage(0);
    setProducts([]);
    fetchProducts(0, false);
  }, [category, searchTerm, sortBy, enabled]);

  // Memoized filtered products for search
  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  // CRUD operations with cache invalidation
  const addProduct = useCallback(async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()

      if (error) throw error;
      
      if (data) {
        setProducts(prev => [data[0], ...prev]);
        // Invalidate cache
        cacheUtils.clear('products');
      }
      
      return { success: true, data };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add product';
      setError(message);
      return { success: false, error: message };
    }
  }, []);

  const updateProduct = useCallback(async (id: string, updates: Partial<Product>) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()

      if (error) throw error;
      
      if (data) {
        setProducts(prev => prev.map(p => p.id === id ? data[0] : p));
        // Invalidate cache
        cacheUtils.clear('products');
      }
      
      return { success: true, data };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update product';
      setError(message);
      return { success: false, error: message };
    }
  }, []);

  const deleteProduct = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ active: false })
        .eq('id', id)

      if (error) throw error;
      
      setProducts(prev => prev.filter(p => p.id !== id));
      // Invalidate cache
      cacheUtils.clear('products');
      
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete product';
      setError(message);
      return { success: false, error: message };
    }
  }, []);

  return {
    products: filteredProducts,
    allProducts: products, // For cases where you need unfiltered data
    loading,
    error,
    usingMockData,
    hasNextPage,
    currentPage,
    refetch,
    loadNextPage,
    addProduct,
    updateProduct,
    deleteProduct,
    // Performance stats
    cacheStats: cacheUtils.getStats()
  };
} 