import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Global Wix embed cleanup - prevent button stacking
if (typeof window !== 'undefined') {
  // Check if running in Wix iframe
  let isWixEmbed = false;
  try {
    isWixEmbed = window.parent !== window && 
                (document.referrer.includes('wix.com') || 
                 window.location !== window.parent.location);
  } catch (e) {
    isWixEmbed = true;
  }

  if (isWixEmbed) {
    // Global observer for Wix button cleanup
    const observer = new MutationObserver(() => {
      const wixButtonSelectors = [
        '[data-hook="shopping-cart-icon"]',
        '[data-hook="profile-menu"]',
        '[class*="cart-button"]',
        '[class*="profile-button"]',
        'button[aria-label*="cart"]',
        'button[aria-label*="profile"]'
      ];

      wixButtonSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 1) {
          // Remove duplicates, keep only the first one
          for (let i = 1; i < elements.length; i++) {
            elements[i].remove();
          }
        }
      });
    });

    // Start observing when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
      observer.observe(document.body, { 
        childList: true, 
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'data-hook', 'id']
      });
    });

    // Also observe immediately if DOM is already loaded
    if (document.readyState !== 'loading') {
      observer.observe(document.body, { 
        childList: true, 
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'data-hook', 'id']
      });
    }
  }
}

createRoot(document.getElementById("root")!).render(<App />);