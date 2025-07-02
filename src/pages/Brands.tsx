import { useState } from "react";
import { Search, Filter, Package, Badge, ShoppingCart } from "lucide-react";
import { brands as allBrands, brandsByCategory, Brand } from "../lib/brands-data";
import { Link } from "react-router-dom";

const BrandCard = ({ brand }: { brand: Brand }) => {
  const isExclusiveBrand = brand.id === 'marmia' || brand.id === 'moda';
  
  // Kategori bazlı renk paleti
  const getCategoryColor = (category: string) => {
    // Exclusive brands get special golden gradient
    if (isExclusiveBrand) {
      return "from-amber-500 via-yellow-500 to-orange-500";
    }
    
    const colors: { [key: string]: string } = {
      "Ana Markalar": "from-primaryBlue to-accentRed",
      "Çay & Kahve": "from-amber-500 to-orange-600",
      "Şeker & Tatlı": "from-pink-500 to-rose-600", 
      "Süt Ürünleri": "from-blue-500 to-cyan-600",
      "İçecek": "from-teal-500 to-emerald-600",
      "Konserve & Gıda": "from-green-500 to-lime-600",
      "Baharat & Sos": "from-red-500 to-rose-600",
      "Bisküvi & Wafer": "from-yellow-500 to-amber-600",
      "Dondurulmuş Gıda": "from-indigo-500 to-blue-600",
      "Kuruyemiş": "from-purple-500 to-violet-600",
      "Zeytinyağı & Turşu": "from-emerald-500 to-teal-600",
      "Et Ürünleri": "from-red-600 to-pink-600",
      "Bal & Reçel": "from-orange-500 to-yellow-600",
      "Tahıl & Pirinç": "from-stone-500 to-gray-600"
    };
    return colors[category] || "from-gray-500 to-slate-600";
  };

  return (
    <div className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2
                    border ${isExclusiveBrand ? 'border-amber-300 ring-2 ring-amber-200' : 'border-gray-100'} overflow-hidden`}>
      {/* Exclusive Badge - Mobile responsive */}
      {isExclusiveBrand && (
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-lg">
          ⭐ EXCLUSIVE
        </div>
      )}
      
      {/* Gradient header based on category - Mobile optimized */}
      <div className={`${isExclusiveBrand ? 'h-20 sm:h-24' : 'h-16 sm:h-20'} bg-gradient-to-r ${getCategoryColor(brand.category)} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative h-full flex items-center justify-center">
          <h3 className={`font-serif font-bold ${isExclusiveBrand ? 'text-lg sm:text-2xl' : 'text-base sm:text-xl'} text-white text-center leading-tight px-2 sm:px-4`}>
            {brand.name}
          </h3>
        </div>
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-bl-2xl"></div>
        
        {isExclusiveBrand && (
          <div className="absolute bottom-0 left-0 right-0 bg-amber-400/20 text-white text-center text-xs font-semibold py-0.5 sm:py-1">
            <span className="hidden sm:inline">North Carolina's Exclusive Distributor</span>
            <span className="sm:hidden">NC Exclusive</span>
          </div>
        )}
      </div>

      {/* Brand info - Mobile optimized */}
      <div className="p-4 sm:p-6">
        <p className={`text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed ${isExclusiveBrand ? 'min-h-[2.5rem] sm:min-h-[3rem]' : 'min-h-[2rem] sm:min-h-[2.5rem]'}`}>
          {brand.description}
          {isExclusiveBrand && (
            <span className="block mt-2 text-amber-700 font-semibold text-xs">
              🎯 <span className="hidden sm:inline">We are the exclusive distributor in North Carolina</span>
              <span className="sm:hidden">NC Exclusive distributor</span>
            </span>
          )}
        </p>
        
        <div className="flex items-center justify-between text-sm mb-3 sm:mb-4">
          <span className={`px-2 py-1 sm:px-3 sm:py-1 ${isExclusiveBrand ? 'bg-amber-100 text-amber-700' : 'bg-primaryBlue/10 text-primaryBlue'} rounded-full font-medium text-xs sm:text-sm`}>
            {brand.productCount} products
          </span>
          <Link
            to={`/products?brand=${brand.id}`}
            className="text-primaryBlue hover:text-accentRed font-medium transition-colors duration-300 
                       text-xs sm:text-sm flex items-center space-x-1 hover:underline touch-target"
          >
            <span>View Products</span>
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        <div className="pt-2 sm:pt-3 border-t border-gray-100">
          <span className={`text-xs px-2 py-1 rounded-full ${isExclusiveBrand ? 'bg-amber-100 text-amber-700' : 'bg-lightGrey text-gray-500'}`}>
            {brand.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function Brands() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  // Get all unique categories
  const categories = ["All", ...Object.keys(brandsByCategory)];

  // Filter and sort brands
  const filteredBrands = allBrands
    .filter(brand => {
      const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           brand.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || brand.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      // First prioritize exclusive brands (MARMIA and MODA)
      const aIsExclusive = a.id === 'marmia' || a.id === 'moda';
      const bIsExclusive = b.id === 'marmia' || b.id === 'moda';
      
      if (aIsExclusive && !bIsExclusive) return -1;
      if (!aIsExclusive && bIsExclusive) return 1;
      
      // Then sort by the selected criteria
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "products":
          return b.productCount - a.productCount;
        case "category":
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-lightGrey to-white">
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
                <Badge className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 sm:mb-6 leading-tight">
              Our <span className="text-accentRed">Brands</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto px-4">
              Discover 37+ premium brands from around the world. Quality partners we trust to bring you the best.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <a 
                href="#brands-section"
                className="group inline-flex items-center justify-center bg-white text-neutralBlack px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 touch-target"
              >
                <Badge className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                Browse Brands
              </a>
              
              <a 
                href="/products"
                className="group inline-flex items-center justify-center border-2 border-white text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-white hover:text-neutralBlack touch-target"
              >
                <ShoppingCart className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                View Products
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search - Mobile optimized */}
      <section id="brands-section" className="py-8 sm:py-12 md:py-16 lg:py-24">
        <div className="container-custom px-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 p-4 sm:p-6 md:p-8 mb-8 sm:mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Search - Mobile optimized */}
              <div className="relative col-span-1 sm:col-span-2 lg:col-span-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                <input
                  type="text"
                  placeholder="Search brands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-transparent text-sm sm:text-base"
                />
              </div>

              {/* Category Filter - Mobile optimized */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-transparent appearance-none bg-white text-sm sm:text-base"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Sort - Mobile optimized */}
              <div className="relative">
                <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-transparent appearance-none bg-white text-sm sm:text-base"
                >
                  <option value="name">Sort by Name</option>
                  <option value="products">Sort by Product Count</option>
                  <option value="category">Sort by Category</option>
                </select>
              </div>
            </div>

            {/* Results Info - Mobile responsive */}
            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs sm:text-sm text-gray-600 gap-2 sm:gap-0">
              <span>
                Showing {filteredBrands.length} of 37+ featured brands
                {selectedCategory !== "All" && ` in ${selectedCategory}`}
                {searchTerm && ` matching "${searchTerm}"`}
              </span>
              
              {(searchTerm || selectedCategory !== "All") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                  }}
                  className="text-primaryBlue hover:text-accentRed font-medium transition-colors touch-target"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Brands Grid - Mobile optimized */}
          {filteredBrands.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {filteredBrands.map((brand) => (
                <BrandCard key={brand.id} brand={brand} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <Package className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-serif font-semibold text-neutralBlack mb-2">No brands found</h3>
              <p className="text-sm sm:text-base text-gray-600 px-4">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Brand Categories Overview - Mobile optimized */}
      <section className="bg-gradient-to-br from-lightGrey via-white to-lightGrey py-8 sm:py-12 md:py-16 lg:py-24">
        <div className="container-custom px-4">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-neutralBlack mb-4 sm:mb-6">
              Browse by Category
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Explore our diverse range of brand categories, each carefully curated to meet your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {Object.entries(brandsByCategory).map(([category, brands]) => (
              <div
                key={category}
                className="group bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 cursor-pointer touch-target"
                onClick={() => setSelectedCategory(category)}
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="font-serif font-semibold text-base sm:text-lg md:text-xl text-neutralBlack group-hover:text-primaryBlue transition-colors duration-300">{category}</h3>
                  <div className="bg-primaryBlue/10 text-primaryBlue text-xs sm:text-sm font-medium px-2 py-1 sm:px-3 sm:py-1 rounded-full">
                    {brands.length} brands
                  </div>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                  {brands.reduce((sum, brand) => sum + brand.productCount, 0)} products available
                </p>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {brands.slice(0, 3).map(brand => (
                    <span
                      key={brand.id}
                      className="bg-lightGrey text-neutralBlack text-xs px-2 py-1 rounded-md"
                    >
                      {brand.name}
                    </span>
                  ))}
                  {brands.length > 3 && (
                    <span className="text-gray-400 text-xs px-2 py-1">
                      +{brands.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 