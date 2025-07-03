import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { brands } from '../lib/brands-data';

const CompactBrandsSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Get only featured brands for the showcase, with exclusive brands first
  const exclusiveBrands = brands.filter(brand => brand.featured && (brand.id === 'marmia' || brand.id === 'moda'));
  const otherFeaturedBrands = brands.filter(brand => brand.featured && brand.id !== 'marmia' && brand.id !== 'moda');
  const allBrands = [...exclusiveBrands, ...otherFeaturedBrands];

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
          <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
            Trusted Partners
          </p>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
            Quality brands we proudly carry
          </h3>
          <p className="text-xs sm:text-sm text-amber-700 font-medium">
            Including exclusive NC distributorships for MARMIA & MODA
          </p>
        </div>

        {/* Logos Container - Mobile enhanced */}
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
            {allBrands.map((brand, index) => {
              const isExclusiveBrand = brand.id === 'marmia' || brand.id === 'moda';
              return (
                <div
                  key={brand.id}
                  className={`flex-shrink-0 ${isExclusiveBrand ? 'w-40 h-24 sm:w-44 sm:h-28' : 'w-32 h-20 sm:w-36 sm:h-24'} flex flex-col items-center justify-center 
                             ${isExclusiveBrand 
                               ? 'bg-gradient-to-br from-primaryBlue via-purple-600 to-accentRed text-white border-2 border-amber-400' 
                               : 'bg-white border border-gray-200'
                             } rounded-xl shadow-sm hover:shadow-lg 
                             transition-all duration-300 hover:scale-105 cursor-pointer group p-2 sm:p-3 relative`}
                >
                  {/* Exclusive Badge - Mobile responsive */}
                  {isExclusiveBrand && (
                    <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-amber-400 text-amber-900 text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full shadow-lg">
                      EXCLUSIVE
                    </div>
                  )}
                  {/* Logo Section - Mobile optimized */}
                  <div className={`flex items-center justify-center mb-1 sm:mb-2 ${isExclusiveBrand ? 'h-10 sm:h-14' : 'h-8 sm:h-12'}`}>
                    {brand.logoUrl ? (
                      <>
                        <img
                          src={brand.logoUrl}
                          alt={`${brand.name} logo`}
                          className="max-w-full max-h-full object-contain filter grayscale 
                                     group-hover:grayscale-0 transition-all duration-300"
                          onError={(e) => {
                            // Fallback to placeholder if image fails to load
                            const target = e.target as HTMLImageElement;
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) {
                              target.style.display = 'none';
                              fallback.style.display = 'flex';
                            }
                          }}
                        />
                        <div className={`hidden ${isExclusiveBrand ? 'w-12 h-6 sm:w-16 sm:h-10' : 'w-10 h-5 sm:w-12 sm:h-8'} bg-gradient-to-br from-amber-400 to-yellow-500 
                                        rounded-lg flex items-center justify-center text-amber-900 font-bold ${isExclusiveBrand ? 'text-xs sm:text-sm' : 'text-xs'}`}>
                          {brand.logoPlaceholder}
                        </div>
                      </>
                    ) : (
                      <div className={`${isExclusiveBrand ? 'w-12 h-6 sm:w-16 sm:h-10' : 'w-10 h-5 sm:w-12 sm:h-8'} ${isExclusiveBrand ? 'bg-gradient-to-br from-amber-400 to-yellow-500 text-amber-900' : 'bg-gradient-to-br from-primaryBlue to-accentRed text-white'} 
                                      rounded-lg flex items-center justify-center font-bold ${isExclusiveBrand ? 'text-xs sm:text-sm' : 'text-xs'}`}>
                        {brand.logoPlaceholder}
                      </div>
                    )}
                  </div>
                  
                  {/* Brand Name - Mobile responsive */}
                  <div className="text-center">
                    <div className={`font-medium ${isExclusiveBrand ? 'text-xs sm:text-sm text-white' : 'text-xs text-gray-700'} leading-tight`}>
                      {brand.name}
                    </div>
                    {isExclusiveBrand && (
                      <div className="text-xs text-amber-200 mt-0.5 sm:mt-1 font-semibold">
                        <span className="hidden sm:inline">NC Exclusive Distributor</span>
                        <span className="sm:hidden">NC Exclusive</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Fade effects - Mobile adapted */}
          <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-8 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-6 sm:w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>

        {/* Bottom text - Mobile responsive */}
        <div className="text-center mt-3 sm:mt-4 md:mt-6">
          <p className="text-xs text-gray-400">
            <span className="hidden sm:inline">Proudly serving {allBrands.length} premium brands across North Carolina</span>
            <span className="sm:hidden">{allBrands.length} premium brands in NC</span>
          </p>
        </div>
      </div>


    </section>
  );
};

export default CompactBrandsSection; 