import React from 'react';
import { Download, Eye, BookOpen } from 'lucide-react';
import SimplePDFViewer from '../components/SimplePDFViewer';

export default function Catalog() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section - Mobile optimized */}
      <section className="relative bg-gradient-to-br from-primaryBlue via-neutralBlack to-primaryBlue text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-accentRed rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-primaryBlue rounded-full blur-3xl animate-pulse" />
        </div>
        
        <div className="relative container-custom py-12 sm:py-16 md:py-20">
          <div className="text-center">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-2xl flex items-center justify-center">
                <BookOpen className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 sm:mb-6 leading-tight">
              Product <span className="text-accentRed">Catalog</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto px-4">
              Browse our comprehensive catalog featuring premium Mediterranean and Middle Eastern products.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <a 
                href="/Choice Foods Catalog.pdf"
                download="Choice Foods Catalog.pdf"
                className="group inline-flex items-center justify-center bg-white text-neutralBlack px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 touch-target"
              >
                <Download className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                Download PDF
              </a>
              
              <a 
                href="#catalog-viewer"
                className="group inline-flex items-center justify-center border-2 border-white text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-white hover:text-neutralBlack touch-target"
              >
                <Eye className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                View Catalog
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Embed Section - Mobile optimized */}
      <section className="container-custom py-8 sm:py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 bg-primaryBlue/10 text-primaryBlue px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-3 sm:mb-4">
              <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm font-medium">Interactive Catalog</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-neutralBlack mb-3 sm:mb-4">
              Choice Foods Product Catalog
            </h2>
            
            <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto px-4">
              Explore our extensive collection of Mediterranean and Middle Eastern products.
            </p>
          </div>

          {/* Interactive PDF Viewer - Mobile responsive */}
          <div id="catalog-viewer" className="mb-8 sm:mb-12 md:mb-16">
            <SimplePDFViewer 
              pdfUrl="/Choice Foods Catalog.pdf"
              title="Choice Foods Product Catalog"
            />
          </div>

          {/* Contact CTA - Mobile optimized */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-primaryBlue to-accentRed rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 text-white">
              <h3 className="font-serif font-bold text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4">
                Ready to Place an Order?
              </h3>
              
              <p className="text-white/90 mb-4 sm:mb-6 max-w-2xl mx-auto px-2 sm:px-4 text-sm sm:text-base">
                Contact our team for pricing, availability, and wholesale inquiries.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="inline-flex items-center justify-center bg-white text-neutralBlack px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 touch-target"
                >
                  Contact Our Team
                </a>
                
                <a 
                  href="tel:336-782-8283" 
                  className="inline-flex items-center justify-center border-2 border-white text-white px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 hover:bg-white hover:text-neutralBlack touch-target"
                >
                  Call: 336-782-8283
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 