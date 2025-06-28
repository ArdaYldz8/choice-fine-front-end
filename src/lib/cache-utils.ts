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
        const databases = await window.indexedDB.databases();
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