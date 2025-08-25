import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Download, Eye, BookOpen, ExternalLink, ChevronRight, Package, Users, Clock } from 'lucide-react';
import OptimizedPDFViewer from '../components/OptimizedPDFViewer';
import { usePDFPreloader } from '../hooks/usePDFPreloader';

export default function Catalog() {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedPDF, setSelectedPDF] = useState<{ url: string; page?: number } | null>(null);

  // Use jsDelivr CDN for faster PDF loading
  const pdfUrl = 'https://cdn.jsdelivr.net/gh/ArdaYldz8/choice-fine-front-end@main/public/Choice%20Foods%20Catalog.pdf';
  const { isPreloaded, progress: preloadProgress } = usePDFPreloader(pdfUrl, !isMobile);

  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [checkMobile]);

  // Memoized catalog sections to prevent recreating on every render
  const catalogSections = useMemo(() => [
    {
      id: 'chocolate',
      title: 'Chocolate & Candy',
      page: 2, // PDF'te sayfa 3
      description: 'Ferrero Kinder, Galaxy, Maltesers, Nestlé KitKat',
      icon: '🍫',
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'cooler',
      title: 'Dairy & Cooler Products',
      page: 11, // PDF'te sayfa 12
      description: 'Fresh Labneh, Yogurt drinks, Feta cheese varieties',
      icon: '🧀',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'frozen',
      title: 'Frozen Products',
      page: 15, // PDF'te sayfa 16
      description: 'Samosa, Paratha, Fillo/Kataifi, Shawarma & Kebab',
      icon: '🥟',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      id: 'grains',
      title: 'Grains & Rice',
      page: 27, // PDF'te sayfa 28
      description: 'Bulgur, Basmati & Egyptian rice, Lentils, Freekeh',
      icon: '🌾',
      color: 'from-yellow-500 to-amber-500'
    },
    {
      id: 'grocery',
      title: 'Grocery Essentials',
      page: 30, // PDF'te sayfa 31
      description: 'Pomegranate molasses, Rose water, Olive oils, Vinegars',
      icon: '🏪',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'olives',
      title: 'Olives & Olive Oil',
      page: 39, // PDF'te sayfa 40
      description: 'Green, Black, Kalamata varieties & premium olive oils',
      icon: '🫒',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      id: 'pickles',
      title: 'Pickles & Preserves',
      page: 43, // PDF'te sayfa 44
      description: 'Cucumber pickles, Mixed pickles, Jalapeño, Stuffed eggplant',
      icon: '🥒',
      color: 'from-teal-500 to-green-500'
    },
    {
      id: 'spices',
      title: 'Spices & Herbs',
      page: 47, // PDF'te sayfa 48
      description: 'Sumac, Zaatar, Seven Spices, Coriander & Cumin blends',
      icon: '🌿',
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 'tea',
      title: 'Tea & Coffee',
      page: 51, // PDF'te sayfa 52
      description: 'Sadaf teas, Ceylon tea, Mehmet Efendi Turkish coffee',
      icon: '☕',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'snacks',
      title: 'Nuts & Snacks',
      page: 54, // PDF'te sayfa 55
      description: 'Coated pistachios, Sunflower seeds, Mixed nuts',
      icon: '🥜',
      color: 'from-yellow-600 to-orange-600'
    }
  ], []);

  const handleSectionClick = useCallback((page: number) => {
    // PDF viewer için +2 eklememiz gerekiyor (indexing farkı)
    const pdfUrl = `/Choice Foods Catalog.pdf#page=${page + 2}`;
    
    // Mobile'da veya küçük ekranlarda doğrudan yeni tab'da aç
    if (isMobile || window.innerWidth < 1024) {
      window.open(pdfUrl, '_blank');
    } else {
      // Desktop'ta optimized viewer kullan
      setSelectedPDF({ url: pdfUrl, page: page + 2 });
    }
  }, [isMobile]);

  const handleDownload = useCallback(() => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Choice Foods Catalog.pdf';
    link.click();
  }, [pdfUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primaryBlue via-neutralBlack to-primaryBlue text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-accentRed rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primaryBlue rounded-full blur-3xl animate-pulse" />
        </div>
        
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <BookOpen className="h-10 w-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
              Product <span className="text-accentRed">Catalog</span>
            </h1>
            

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  if (isMobile || window.innerWidth < 1024) {
                    window.open(pdfUrl, '_blank');
                  } else {
                    setSelectedPDF({ url: pdfUrl });
                  }
                }}
                className="group inline-flex items-center justify-center bg-white text-neutralBlack px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl relative"
              >
                <Eye className="mr-3 h-5 w-5" />
                View Catalog Online
                <ExternalLink className="ml-2 h-4 w-4 opacity-70" />
                
                {/* Preload status indicator */}
                {!isMobile && !isPreloaded && (
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                    Loading...
                  </span>
                )}
                {!isMobile && isPreloaded && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    ✓ Ready
                  </span>
                )}
              </button>
              
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

      {/* Catalog Navigation */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutralBlack mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Click on any category below to jump directly to that section in the catalog
            </p>
          </div>


          {/* All Categories Grid */}
          <div>
            <h3 className="text-xl font-semibold text-neutralBlack mb-6 flex items-center">
              <span className="w-2 h-2 bg-primaryBlue rounded-full mr-3"></span>
              All Categories
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {catalogSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleSectionClick(section.page)}
                  className="group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-left"
                >
                  <div className={`h-2 bg-gradient-to-r ${section.color}`}></div>
                  
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">{section.icon}</span>
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        Page {section.page + 1}
                      </span>
                    </div>
                    
                    <h4 className="text-lg font-bold text-neutralBlack group-hover:text-primaryBlue transition-colors mb-2">
                      {section.title}
                    </h4>
                    
                    <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors leading-relaxed">
                      {section.description}
                    </p>

                    <div className="mt-4 flex items-center text-primaryBlue text-sm font-medium">
                      <span>View Section</span>
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PDF Viewer Modal */}
      {selectedPDF && (
        <OptimizedPDFViewer
          pdfUrl={selectedPDF.url}
          title="Choice Foods Catalog"
          onClose={() => setSelectedPDF(null)}
        />
      )}

    </div>
  );
}