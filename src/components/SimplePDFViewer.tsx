import { useState } from 'react';
import { Download, Eye, Maximize2, ZoomIn, ZoomOut } from 'lucide-react';

interface SimplePDFViewerProps {
  pdfUrl: string;
  title?: string;
}

export default function SimplePDFViewer({ pdfUrl, title = "PDF Document" }: SimplePDFViewerProps) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const openFullScreen = () => {
    window.open(pdfUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
      {/* PDF Controls */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="font-serif font-bold text-xl text-neutralBlack">{title}</h3>
            <p className="text-gray-600">Premium Mediterranean & Middle Eastern Products</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {/* Full Screen */}
            <button
              onClick={openFullScreen}
              className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:border-primaryBlue hover:text-primaryBlue"
              title="Open in New Tab"
            >
              <Maximize2 className="h-4 w-4" />
              Full Screen
            </button>

            {/* Download */}
            <a
              href={pdfUrl}
              download
              className="inline-flex items-center gap-2 bg-primaryBlue text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:bg-primaryBlue/90"
              title="Download PDF"
            >
              <Download className="h-4 w-4" />
              Download
            </a>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="relative bg-gray-100">
        <iframe
          src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1&page=1&view=FitH`}
          className="w-full h-[700px] border-0"
          title={title}
          loading="lazy"
        />
        
        {/* Overlay for better visual */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-gray-100/20 to-transparent opacity-50" />
      </div>

      {/* Info Bar */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 text-center">
        <p className="text-sm text-gray-600">
          Use the toolbar above to navigate, zoom, and interact with the catalog. 
          <button 
            onClick={openFullScreen}
            className="text-primaryBlue hover:underline ml-1"
          >
            Open in full screen
          </button>
          {" "}for the best viewing experience.
        </p>
      </div>
    </div>
  );
} 