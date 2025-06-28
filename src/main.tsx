import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { clearAuthCache } from './lib/supabase'
import { setupCacheManagement, clearAllCaches } from './lib/cache-utils'

// Setup cache management
setupCacheManagement();

// Clear cache on app startup
clearAuthCache();

// Handle logout parameter in URL
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('logout') === 'true') {
  clearAllCaches();
  clearAuthCache();
  window.history.replaceState({}, '', '/');
}

// Handle page visibility change to refresh cache
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    // Page became visible again, clear cache to force refresh
    clearAuthCache();
  }
});

createRoot(document.getElementById("root")!).render(<App />);
