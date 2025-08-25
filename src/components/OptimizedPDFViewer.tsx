import React, { useState, useCallback, useEffect, useRef } from 'react';
import { X, Download, ExternalLink, Loader2, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.js';

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
  const [pdf, setPdf] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1.0);
  const [pageLoading, setPageLoading] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load PDF
  useEffect(() => {
    const loadPDF = async () => {
      try {
        setLoading(true);
        setError(false);

        const loadingTask = pdfjsLib.getDocument({
          url: pdfUrl,
          disableAutoFetch: false,
          disableStream: false,
        });

        loadingTask.onProgress = (data: { loaded: number; total: number }) => {
          if (data.total > 0) {
            const progress = Math.round((data.loaded / data.total) * 100);
            setLoadingProgress(progress);
          }
        };

        const pdfDoc = await loadingTask.promise;
        setPdf(pdfDoc);
        setTotalPages(pdfDoc.numPages);
        setLoading(false);
      } catch (err) {
        console.error('Error loading PDF:', err);
        setError(true);
        setLoading(false);
      }
    };

    loadPDF();
  }, [pdfUrl]);

  // Render page
  const renderPage = useCallback(async (pageNum: number) => {
    if (!pdf || !canvasRef.current) return;

    try {
      setPageLoading(true);
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale });
      
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (!context) return;
      
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      
      await page.render(renderContext).promise;
      setPageLoading(false);
    } catch (err) {
      console.error('Error rendering page:', err);
      setPageLoading(false);
    }
  }, [pdf, scale]);

  // Render page when it changes
  useEffect(() => {
    if (pdf && currentPage) {
      renderPage(currentPage);
    }
  }, [pdf, currentPage, renderPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 2.5));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

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
            <p className="text-gray-600 mb-6">We couldn't load the PDF. Please try one of these options:</p>
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

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Loading Catalog</h3>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            
            <p className="text-gray-600 text-sm mb-2">{loadingProgress}% loaded</p>
            <p className="text-gray-500 text-xs">
              Loading from fast CDN - should be ready in 3-5 seconds
            </p>

            {/* Quick action buttons */}
            <div className="mt-6 flex gap-3 justify-center">
              <button
                onClick={handleOpenNew}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Open in Browser
              </button>
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-gray-800 px-4 py-2 text-sm"
              >
                Cancel
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
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="font-semibold text-gray-900">{title}</h3>
            {pageLoading && <Loader2 className="h-4 w-4 animate-spin text-blue-600" />}
          </div>
          
          <div className="flex items-center gap-2">
            {/* Navigation Controls */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-2 py-1">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage <= 1}
                className="p-1 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                title="Previous Page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              
              <span className="text-sm px-2 font-medium">
                {currentPage} / {totalPages}
              </span>
              
              <button
                onClick={handleNextPage}
                disabled={currentPage >= totalPages}
                className="p-1 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                title="Next Page"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg px-2 py-1">
              <button
                onClick={handleZoomOut}
                className="p-1 hover:bg-gray-200 rounded"
                title="Zoom Out"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <span className="text-sm px-2 min-w-[3rem] text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-1 hover:bg-gray-200 rounded"
                title="Zoom In"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
            </div>

            <div className="h-6 w-px bg-gray-300" />

            {/* Action Buttons */}
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
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* PDF Canvas */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-auto bg-gray-800 flex items-center justify-center p-4"
      >
        {pageLoading && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-10">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        )}
        
        <canvas
          ref={canvasRef}
          className="max-w-full max-h-full shadow-2xl bg-white"
          style={{ display: pdf ? 'block' : 'none' }}
        />
      </div>
    </div>
  );
}