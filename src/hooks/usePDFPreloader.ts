import { useEffect, useState } from 'react';

interface PDFPreloadResult {
  isPreloaded: boolean;
  progress: number;
  error: boolean;
}

export const usePDFPreloader = (pdfUrl: string, enabled: boolean = true): PDFPreloadResult => {
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!enabled || !pdfUrl) return;

    let timeoutId: NodeJS.Timeout;

    const preloadPDF = async () => {
      try {
        // Check if already cached
        const cacheKey = `pdf-preload-${pdfUrl}`;
        const cached = sessionStorage.getItem(cacheKey);
        
        if (cached === 'true') {
          setIsPreloaded(true);
          setProgress(100);
          return;
        }

        // Start preloading
        const response = await fetch(pdfUrl, {
          method: 'HEAD', // Just check headers first
          headers: {
            'Range': 'bytes=0-1024', // Try to get first 1KB
          }
        });

        if (response.ok) {
          // Mark as preloaded and cache the result
          sessionStorage.setItem(cacheKey, 'true');
          setIsPreloaded(true);
          setProgress(100);
        } else {
          setError(true);
        }
      } catch (err) {
        console.warn('PDF preload failed:', err);
        setError(true);
      }
    };

    // Simulate progress for UX
    const progressIntervals = [10, 25, 40, 60, 80];
    progressIntervals.forEach((prog, index) => {
      timeoutId = setTimeout(() => {
        setProgress(prog);
      }, index * 500);
    });

    preloadPDF();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [pdfUrl, enabled]);

  return { isPreloaded, progress, error };
};