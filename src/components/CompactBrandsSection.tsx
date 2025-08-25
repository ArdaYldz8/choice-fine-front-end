import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { brands } from '../lib/brands-data';

const CompactBrandsSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Get exclusive brands and other featured brands separately
  const exclusiveBrands = brands.filter(brand => brand.featured && (brand.id === 'marmia' || brand.id === 'moda'));
  const otherFeaturedBrands = brands.filter(brand => brand.featured && brand.id !== 'marmia' && brand.id !== 'moda');

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = 300; // Roughly 4 brand cards width
      
      // Use direct scrollLeft manipulation for better compatibility
      if (direction === 'left') {
        container.scrollLeft -= scrollAmount;
      } else {
        container.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    <section className="py-4 sm:py-8 md:py-12 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Mobile optimized */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">
            We are the Exclusive North Carolina Distributor for
          </h3>
          <p className="text-base sm:text-lg font-semibold text-primaryBlue">
            MODA Foods & MARMIA Foods
          </p>
        </div>

        {/* Exclusive Brands Section - Separate and Prominent */}
        {exclusiveBrands.length > 0 && (
          <div className="mb-8 sm:mb-12">
            
            <div className="flex justify-center gap-6 sm:gap-8">
              {exclusiveBrands.map((brand) => (
                <div
                  key={brand.id}
                  className="w-56 h-36 sm:w-64 sm:h-40 flex items-center justify-center 
                             bg-white 
                             border-3 border-amber-400 rounded-2xl shadow-2xl
                             p-4"
                >
                  {/* Logo Only */}
                  {brand.logoUrl ? (
                    <img
                      src={brand.logoUrl}
                      alt={`${brand.name} logo`}
                      className="max-w-full max-h-full object-contain filter brightness-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) {
                          target.style.display = 'none';
                          fallback.style.display = 'flex';
                        }
                      }}
                    />
                  ) : (
                    <div className="w-20 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 text-amber-900
                                    rounded-lg flex items-center justify-center font-bold text-base">
                      {brand.logoPlaceholder}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Featured Brands Section */}
        <div className="mb-4 sm:mb-6">
          <div className="text-center mb-4">
            <h4 className="text-base sm:text-lg font-semibold text-gray-700 mb-1">
              Other Brands
            </h4>
            <p className="text-xs sm:text-sm text-gray-500">
              Proudly serving 142+ premium brands across North Carolina
            </p>
          </div>

          <div className="relative group">
            {/* Scroll Buttons - Larger on mobile */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                scroll('left');
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-white shadow-xl 
                         rounded-full p-2 sm:p-3 transition-all duration-300 hover:scale-110 
                         border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 touch-target"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                scroll('right');
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-white shadow-xl 
                         rounded-full p-2 sm:p-3 transition-all duration-300 hover:scale-110 
                         border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 touch-target"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
            </button>

            {/* Scrollable Logos - Mobile optimized */}
            <div
              ref={scrollContainerRef}
              className="flex space-x-3 sm:space-x-4 overflow-x-scroll pb-2 px-8 sm:px-12 scroll-smooth
                         [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              style={{
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {otherFeaturedBrands.map((brand) => (
                <div
                  key={brand.id}
                  className="flex-shrink-0 w-32 h-20 sm:w-36 sm:h-24 flex flex-col items-center justify-center 
                             bg-white border border-gray-200 rounded-xl shadow-sm 
                             p-2 sm:p-3"
                >
                  {/* Logo Section */}
                  <div className="flex items-center justify-center mb-1 sm:mb-2 h-8 sm:h-12">
                    {brand.logoUrl ? (
                      <>
                        <img
                          src={brand.logoUrl}
                          alt={`${brand.name} logo`}
                          className="max-w-full max-h-full object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) {
                              target.style.display = 'none';
                              fallback.style.display = 'flex';
                            }
                          }}
                        />
                        <div className="hidden w-10 h-5 sm:w-12 sm:h-8 bg-gradient-to-br from-primaryBlue to-accentRed text-white 
                                        rounded-lg flex items-center justify-center font-bold text-xs">
                          {brand.logoPlaceholder}
                        </div>
                      </>
                    ) : (
                      <div className="w-10 h-5 sm:w-12 sm:h-8 bg-gradient-to-br from-primaryBlue to-accentRed text-white 
                                      rounded-lg flex items-center justify-center font-bold text-xs">
                        {brand.logoPlaceholder}
                      </div>
                    )}
                  </div>
                  
                  {/* Brand Name */}
                  <div className="text-center">
                    <div className="font-medium text-xs text-gray-700 leading-tight">
                      {brand.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Fade effects */}
            <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-8 bg-gradient-to-r from-white to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-6 sm:w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
          </div>
        </div>

      </div>


    </section>
  );
};

export default CompactBrandsSection; 