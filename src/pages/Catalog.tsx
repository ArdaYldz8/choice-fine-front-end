import React from 'react';
import { ExternalLink, Download, Eye, BookOpen } from 'lucide-react';

export default function Catalog() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primaryBlue via-neutralBlack to-primaryBlue text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-accentRed rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-primaryBlue rounded-full blur-3xl animate-pulse" />
        </div>
        
        <div className="relative container-custom py-20">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center">
                <BookOpen className="h-10 w-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight">
              Product <span className="text-accentRed">Catalog</span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
              Browse our comprehensive catalog featuring premium Mediterranean and Middle Eastern products.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://anyflip.com/ixcq/yexj/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center bg-white text-neutralBlack px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
              >
                <ExternalLink className="mr-3 h-5 w-5" />
                Open Full Catalog
              </a>
              
              <a 
                href="https://anyflip.com/ixcq/yexj/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-neutralBlack"
              >
                <Download className="mr-3 h-5 w-5" />
                Download PDF
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Embed Section */}
      <section className="container-custom py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primaryBlue/10 text-primaryBlue px-4 py-2 rounded-full mb-4">
              <Eye className="h-4 w-4" />
              <span className="text-sm font-medium">Interactive Catalog</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutralBlack mb-4">
              Choice Foods Product Catalog
            </h2>
            
            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
              Explore our extensive collection of Mediterranean and Middle Eastern products.
            </p>
          </div>

          {/* Catalog Embed Container */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="font-serif font-bold text-xl text-neutralBlack">Choice Foods Catalog</h3>
                  <p className="text-gray-600">Premium Mediterranean & Middle Eastern Products</p>
                </div>
                
                <div className="flex gap-3">
                  <a
                    href="https://anyflip.com/ixcq/yexj/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primaryBlue text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:bg-primaryBlue/90"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Full Screen
                  </a>
                  
                  <a
                    href="https://anyflip.com/ixcq/yexj/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border-2 border-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:border-primaryBlue hover:text-primaryBlue"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </a>
                </div>
              </div>
            </div>

            {/* Catalog iFrame */}
            <div className="relative w-full" style={{ paddingBottom: '75%', height: 0 }}>
              <iframe
                src="https://anyflip.com/ixcq/yexj/basic/embed"
                className="absolute top-0 left-0 w-full h-full border-0"
                allowFullScreen
                title="Choice Foods Product Catalog"
                loading="lazy"
              />
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-primaryBlue to-accentRed rounded-3xl p-8 text-white">
              <h3 className="font-serif font-bold text-2xl mb-4">
                Ready to Place an Order?
              </h3>
              
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Contact our team for pricing, availability, and wholesale inquiries.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="inline-flex items-center justify-center bg-white text-neutralBlack px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                >
                  Contact Our Team
                </a>
                
                <a 
                  href="tel:336-782-8283" 
                  className="inline-flex items-center justify-center border-2 border-white text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-white hover:text-neutralBlack"
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