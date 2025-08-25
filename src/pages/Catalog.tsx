import React from 'react';
import { Download, BookOpen, ExternalLink } from 'lucide-react';

export default function Catalog() {
  // AnyFlip catalog URL
  const anyflipUrl = 'https://anyflip.com/ixcq/yexj/';
  const pdfUrl = '/Choice Foods Catalog.pdf';

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Choice Foods Catalog.pdf';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primaryBlue via-neutralBlack to-primaryBlue text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-accentRed rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primaryBlue rounded-full blur-3xl animate-pulse" />
        </div>
        
        <div className="relative container mx-auto px-4 py-12 md:py-20">
          <div className="text-center max-w-4xl mx-auto mb-8">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <BookOpen className="h-10 w-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
              Product <span className="text-accentRed">Catalog</span>
            </h1>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href={anyflipUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center bg-white text-neutralBlack px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <ExternalLink className="mr-3 h-5 w-5" />
                Open Fullscreen
              </a>
              
              <button
                onClick={handleDownload}
                className="group inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-neutralBlack"
              >
                <Download className="mr-3 h-5 w-5" />
                Download PDF
                <span className="ml-2 text-sm opacity-80">(71 MB)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded AnyFlip Catalog */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="w-full bg-white rounded-lg shadow-xl overflow-hidden">
            <iframe
              src={anyflipUrl}
              width="100%"
              height="800"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; fullscreen"
              className="w-full"
              title="Choice Foods Catalog"
            />
          </div>
        </div>
      </section>
    </div>
  );
}