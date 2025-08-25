import React, { useState, useCallback } from 'react';
import { X, Download, ExternalLink, Loader2 } from 'lucide-react';

interface OptimizedPDFViewerProps {
  pdfUrl: string;
  title?: string;
  onClose: () => void;
}

export default function OptimizedPDFViewer({ 
  pdfUrl, 
  title = "Product Catalog",
  onClose 
}: OptimizedPDFViewerProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const handlePDFLoad = useCallback(() => {
    setLoading(false);
  }, []);

  const handlePDFError = useCallback(() => {
    setLoading(false);
    setError(true);
  }, []);

  // Simulate loading progress for large PDFs
  React.useEffect(() => {
    if (loading) {
      const intervals = [20, 35, 50, 65, 80, 95];
      const timeouts = [500, 1000, 2000, 3000, 5000, 8000];
      
      intervals.forEach((progress, index) => {
        setTimeout(() => {
          if (loading) setLoadingProgress(progress);
        }, timeouts[index]);
      });

      // Auto-fallback after 10 seconds if still loading
      const fallbackTimeout = setTimeout(() => {
        if (loading) {
          setLoading(false);
          setError(true);
        }
      }, 10000);

      return () => clearTimeout(fallbackTimeout);
    }
  }, [loading]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Choice Foods Catalog.pdf';
    link.click();
  };

  const handleOpenNew = () => {
    window.open(pdfUrl, '_blank');
  };

  if (error) {
    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4">
          <div className="text-center">
            <div className="text-red-500 mb-4 text-4xl">⚠️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Catalog</h3>
            <p className="text-gray-600 mb-6">We couldn't load the PDF viewer. Please try one of these options:</p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleOpenNew}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Open in New Tab
              </button>
              <button
                onClick={handleDownload}
                className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </button>
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-gray-800 px-6 py-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
      {/* Header Controls */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 flex items-center gap-3">
          {loading && <Loader2 className="h-4 w-4 animate-spin text-blue-600" />}
          {title}
        </h3>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Download PDF"
          >
            <Download className="h-4 w-4" />
          </button>
          
          <button
            onClick={handleOpenNew}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Open in New Tab"
          >
            <ExternalLink className="h-4 w-4" />
          </button>
          
          <div className="h-6 w-px bg-gray-300 mx-2" />
          
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* PDF Embed with optimized loading */}
      <div className="flex-1 relative bg-gray-800">
        {loading && (
          <div className="absolute inset-0 bg-white flex flex-col items-center justify-center z-10">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
            <p className="text-gray-600 text-sm mb-4">Loading catalog...</p>
            
            {/* Progress Bar */}
            <div className="w-64 bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            
            <p className="text-gray-500 text-xs text-center max-w-xs">
              Loading 68MB PDF file... {loadingProgress}% complete
              <br />
              <span className="text-xs text-gray-400 mt-1 block">
                First load may take 10-15 seconds
              </span>
            </p>

            {/* Quick action buttons while loading */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleOpenNew}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Open in Browser
              </button>
              <button
                onClick={handleDownload}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Download Instead
              </button>
            </div>
          </div>
        )}
        
        <iframe
          src={`${pdfUrl}#view=FitH&zoom=page-fit&toolbar=1&navpanes=1`}
          className="w-full h-full border-0"
          title={title}
          onLoad={handlePDFLoad}
          onError={handlePDFError}
          loading="lazy"
          style={{ 
            backgroundColor: '#f5f5f5',
            minHeight: '100%'
          }}
        />
      </div>
    </div>
  );
}