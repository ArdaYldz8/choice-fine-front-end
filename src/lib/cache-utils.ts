// Cache management utilities for performance optimization

/**
 * Clear all browser storage and caches
 */
export const clearAllCaches = async (): Promise<void> => {
  try {
    // Clear localStorage and sessionStorage
    localStorage.clear();
    sessionStorage.clear();
    
    // Clear IndexedDB databases
    if (window.indexedDB) {
      try {
        const databases = await window.indexedDB.databases?.();
        if (databases) {
          await Promise.all(
            databases.map(db => {
              if (db.name) {
                return new Promise<void>((resolve) => {
                  const deleteReq = window.indexedDB.deleteDatabase(db.name!);
                  deleteReq.onsuccess = () => resolve();
                  deleteReq.onerror = () => resolve(); // Continue even if error
                });
              }
            }).filter(Boolean)
          );
        }
      } catch (idbError) {
        console.warn('IndexedDB cleanup failed:', idbError);
      }
    }
    
    // Clear Service Worker caches
    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(name => caches.delete(name))
        );
      } catch (cacheError) {
        console.warn('Cache cleanup failed:', cacheError);
      }
    }
    
    console.log('All caches cleared successfully');
  } catch (error) {
    console.error('Cache clearing failed:', error);
  }
};

/**
 * Force page reload with cache bypass
 */
export const forceReload = (): void => {
  // Use location.replace to prevent back button issues
  window.location.replace(window.location.href);
};

/**
 * Clear caches and reload
 */
export const clearCachesAndReload = async (): Promise<void> => {
  await clearAllCaches();
  forceReload();
};

/**
 * Check if user needs cache clear (for troubleshooting)
 */
export const shouldClearCache = (): boolean => {
  const lastClear = localStorage.getItem('last_cache_clear');
  const now = Date.now();
  const oneHour = 60 * 60 * 1000;
  
  if (!lastClear || (now - parseInt(lastClear)) > oneHour) {
    localStorage.setItem('last_cache_clear', now.toString());
    return true;
  }
  
  return false;
};

/**
 * Setup cache management event listeners
 */
export const setupCacheManagement = (): void => {
  // Clear cache on storage events (when another tab clears storage)
  window.addEventListener('storage', (e) => {
    if (e.key === 'clear_cache_signal') {
      clearAllCaches();
    }
  });
  
  // Handle page unload
  window.addEventListener('beforeunload', () => {
    // Signal other tabs to clear cache if needed
    if (shouldClearCache()) {
      localStorage.setItem('clear_cache_signal', Date.now().toString());
    }
  });
  
  // Handle focus events to refresh stale data
  window.addEventListener('focus', () => {
    // Check if we need to refresh due to long inactivity
    const lastActivity = localStorage.getItem('last_activity');
    const now = Date.now();
    const thirtyMinutes = 30 * 60 * 1000;
    
    if (!lastActivity || (now - parseInt(lastActivity)) > thirtyMinutes) {
      // Clear auth cache to force refresh
      import('./supabase').then(({ clearAuthCache }) => {
        clearAuthCache();
      });
    }
    
    localStorage.setItem('last_activity', now.toString());
  });
};

// Advanced caching utilities for 2025 performance optimization
import { supabase } from './supabase';

// Cache configuration
const CACHE_CONFIG = {
  PRODUCTS: 5 * 60 * 1000, // 5 minutes
  PROFILES: 2 * 60 * 1000, // 2 minutes  
  ORDERS: 1 * 60 * 1000,   // 1 minute
  USER_SESSION: 30 * 1000,  // 30 seconds
  SEARCH_RESULTS: 10 * 60 * 1000, // 10 minutes
};

// Memory cache with LRU eviction
class LRUCache<T> {
  private cache = new Map<string, { data: T; timestamp: number; hits: number }>();
  private maxSize: number;

  constructor(maxSize = 100) {
    this.maxSize = maxSize;
  }

  get(key: string, maxAge: number): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    const isExpired = Date.now() - item.timestamp > maxAge;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    // Update access count for LRU
    item.hits++;
    return item.data;
  }

  set(key: string, data: T): void {
    if (this.cache.size >= this.maxSize) {
      // Remove least recently used item
      const lruKey = this.findLRUKey();
      if (lruKey) this.cache.delete(lruKey);
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      hits: 1
    });
  }

  private findLRUKey(): string | null {
    let lruKey: string | null = null;
    let minHits = Infinity;

    for (const [key, item] of this.cache.entries()) {
      if (item.hits < minHits) {
        minHits = item.hits;
        lruKey = key;
      }
    }

    return lruKey;
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

// Global cache instances with explicit typing
const caches = {
  products: new LRUCache<any>(50),
  profiles: new LRUCache<any>(100),
  orders: new LRUCache<any>(200),
  userSession: new LRUCache<any>(10),
  searchResults: new LRUCache<any>(30),
} as const;

type CacheCategory = keyof typeof caches;

// IndexedDB for persistent caching
class IndexedDBCache {
  private dbName = 'ChoiceFoodsCache';
  private version = 1;
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create all necessary object stores
        const stores = ['products', 'profiles', 'orders', 'userSession', 'searchResults', 'metadata'];
        
        stores.forEach(storeName => {
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { keyPath: 'key' });
          }
        });
      };
    });
  }

  async get<T>(store: string, key: string): Promise<T | null> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }
      
      const transaction = this.db.transaction([store], 'readonly');
      const objectStore = transaction.objectStore(store);
      const request = objectStore.get(key);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const result = request.result;
        resolve(result ? result.data : null);
      };
    });
  }

  async set<T>(store: string, key: string, data: T, ttl?: number): Promise<void> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }
      
      const transaction = this.db.transaction([store], 'readwrite');
      const objectStore = transaction.objectStore(store);
      
      const item = {
        key,
        data,
        timestamp: Date.now(),
        ttl: ttl || 0
      };
      
      const request = objectStore.put(item);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
}

// Initialize IndexedDB cache
const persistentCache = new IndexedDBCache();

// Query optimization utilities
export const optimizeQuery = (query: any, options: {
  select?: string[];
  limit?: number;
  offset?: number;
  orderBy?: string;
  filters?: Record<string, any>;
} = {}) => {
  const { select, limit, offset, orderBy, filters } = options;
  
  // Only select required fields
  if (select && select.length > 0) {
    query = query.select(select.join(','));
  }
  
  // Apply filters efficiently
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        query = query.eq(key, value);
      }
    });
  }
  
  // Add ordering
  if (orderBy) {
    query = query.order(orderBy);
  }
  
  // Add pagination
  if (limit) {
    query = query.limit(limit);
  }
  if (offset) {
    query = query.range(offset, offset + (limit || 10) - 1);
  }
  
  return query;
};

// Batch loading utility
export const batchLoad = async <T>(
  requests: Array<() => Promise<T>>,
  batchSize = 5
): Promise<T[]> => {
  const results: T[] = [];
  
  for (let i = 0; i < requests.length; i += batchSize) {
    const batch = requests.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(req => req()));
    results.push(...batchResults);
    
    // Small delay to prevent overwhelming the server
    if (i + batchSize < requests.length) {
      await new Promise(resolve => setTimeout(resolve, 10));
    }
  }
  
  return results;
};

// Debounced cache setter
const debouncedSets = new Map<string, ReturnType<typeof setTimeout>>();

const debouncedCacheSet = <T>(
  cache: LRUCache<T>,
  key: string,
  data: T,
  delay = 100
) => {
  if (debouncedSets.has(key)) {
    const timeoutId = debouncedSets.get(key);
    if (timeoutId) clearTimeout(timeoutId);
  }
  
  const timeoutId = setTimeout(() => {
    cache.set(key, data);
    debouncedSets.delete(key);
  }, delay);
  
  debouncedSets.set(key, timeoutId);
};

// Main cache utilities export
export const cacheUtils = {
  // Get from memory cache with fallback to persistent cache
  async get<T>(category: CacheCategory, key: string): Promise<T | null> {
    const maxAge = CACHE_CONFIG[category.toUpperCase() as keyof typeof CACHE_CONFIG] || 60000;
    
    // Try memory cache first
    const memoryResult = caches[category].get(key, maxAge);
    if (memoryResult) {
      return memoryResult as T;
    }
    
    // Fallback to persistent cache
    try {
      const persistentResult = await persistentCache.get<T>(category, key);
      if (persistentResult) {
        // Restore to memory cache
        caches[category].set(key, persistentResult);
        return persistentResult;
      }
    } catch (error) {
      console.warn('Persistent cache error:', error);
    }
    
    return null;
  },

  // Set in both memory and persistent cache
  async set<T>(category: CacheCategory, key: string, data: T): Promise<void> {
    const maxAge = CACHE_CONFIG[category.toUpperCase() as keyof typeof CACHE_CONFIG] || 60000;
    
    // Set in memory cache
    debouncedCacheSet(caches[category], key, data);
    
    // Set in persistent cache
    try {
      await persistentCache.set(category, key, data, maxAge);
    } catch (error) {
      console.warn('Persistent cache set error:', error);
    }
  },

  // Clear cache
  clear(category?: CacheCategory): void {
    if (category) {
      caches[category].clear();
    } else {
      Object.values(caches).forEach(cache => cache.clear());
    }
  },

  // Get cache stats
  getStats() {
    const stats = {} as Record<string, number>;
    Object.entries(caches).forEach(([key, cache]) => {
      stats[key] = cache.size();
    });
    return stats;
  },

  // Preload data
  async preload<T>(
    category: CacheCategory,
    key: string,
    loader: () => Promise<T>
  ): Promise<T> {
    const cached = await this.get<T>(category, key);
    if (cached) return cached;
    
    const data = await loader();
    await this.set(category, key, data);
    return data;
  }
};

// Performance monitoring
export const performanceMonitor = {
  startTiming: (label: string) => {
    performance.mark(`${label}-start`);
  },
  
  endTiming: (label: string) => {
    performance.mark(`${label}-end`);
    performance.measure(label, `${label}-start`, `${label}-end`);
    
    const measure = performance.getEntriesByName(label)[0] as PerformanceMeasure;
    console.log(`⚡ ${label}: ${measure.duration.toFixed(2)}ms`);
    
    return measure.duration;
  },
  
  clearTimings: () => {
    performance.clearMarks();
    performance.clearMeasures();
  }
};

// Real-time cache invalidation
export const setupCacheInvalidation = () => {
  // Listen for Supabase real-time events
  const channels = ['products', 'profiles', 'orders'];
  
  channels.forEach(table => {
    supabase
      .channel(`${table}_changes`)
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table 
      }, (payload) => {
        console.log(`🔄 Cache invalidation for ${table}:`, payload.eventType);
        
        // Clear related caches
        if (table === 'products') {
          cacheUtils.clear('products');
          cacheUtils.clear('searchResults');
        } else if (table === 'profiles') {
          cacheUtils.clear('profiles');
        } else if (table === 'orders') {
          cacheUtils.clear('orders');
        }
      })
      .subscribe();
  });
};

// Initialize cache system
export const initializeCacheSystem = async () => {
  try {
    await persistentCache.init();
    setupCacheInvalidation();
    console.log('✅ Cache system initialized');
  } catch (error) {
    console.warn('⚠️ Cache system initialization failed:', error);
  }
};

// Force clear all caches and reload page - for troubleshooting
export const forceRefresh = async (): Promise<void> => {
  try {
    // Clear all memory caches
    Object.values(caches).forEach(cache => cache.clear());
    
    // Clear persistent cache
    await persistentCache.init();
    const stores = ['products', 'profiles', 'orders', 'userSession', 'searchResults', 'metadata'];
    
    for (const store of stores) {
      try {
        // Clear IndexedDB store
        const transaction = (persistentCache as any).db.transaction([store], 'readwrite');
        const objectStore = transaction.objectStore(store);
        await new Promise<void>((resolve, reject) => {
          const request = objectStore.clear();
          request.onsuccess = () => resolve();
          request.onerror = () => reject(request.error);
        });
      } catch (error) {
        console.warn(`Failed to clear ${store}:`, error);
      }
    }
    
    // Clear browser storage
    localStorage.clear();
    sessionStorage.clear();
    
    console.log('🔄 All caches cleared, reloading...');
    
    // Force page refresh
    window.location.reload();
  } catch (error) {
    console.error('Force refresh failed:', error);
    // Fallback to regular reload
    window.location.reload();
  }
}; 