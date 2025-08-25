import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Immediate scroll to top
    window.scrollTo(0, 0);
    
    // Also scroll to top after a short delay to ensure it works
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, [pathname]);

  return null;
}