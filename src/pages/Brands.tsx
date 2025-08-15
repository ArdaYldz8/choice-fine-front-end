import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Package, Badge, Eye, X, Star, TrendingUp, Grid3X3, List, ChevronDown } from 'lucide-react';
import { type Product } from '../lib/supabase';

interface Brand {
  id: string;
  name: string;
  description: string;
  category: string;
  productCount: number;
  isExclusive?: boolean;
  country?: string;
  featured?: boolean;
}

// CSV'den gelen TÜM markalar - tam liste
const csvBrands = [
  "AAHU BARAH", "ADONIS", "AHMAD", "AL AFIA", "AL AMEED", "AL GHAZAL", "AL GHAZALEEN", 
  "AL HALOUB", "AL KAMARIA", "AL KANATER", "AL KBOUS", "AL KHAR", "AL MOMTAZ", "AL NABEEL", 
  "AL QASR", "AL RAGAWI", "AL REEF", "AL SAFA", "AL SAMIR", "AL SHARK", "AL SHIFA", 
  "AL SUHAGY", "AL WAZAH", "ALI BABA", "ALREEF", "ALYA", "AMAN", "AMMAR", "ANGEL'S BAKERY", 
  "ANTEBELLA", "APOLLO", "ARA-Z", "ARZ", "ARZ LABNE", "ARZ PLAIN", "ASEEL", "ASHOUR", 
  "ATHENA", "BALCA", "BALCONI", "BARAKA", "BARBICAN", "BARMAKI", "BAROODY", "BASAK", 
  "BASBOSA", "BBQ GRILL", "BBQ SKEWER", "BEIRUT", "BEYPAZARI", "BON-O-BON", "BYBLOS", 
  "CA GARDEN", "CADBURY", "CAYKUR", "CORTAS", "CRUNCHY NUTS", "DAIRYLAND", "DAWN", 
  "DETTOL", "DO GHAZAL", "DRINK PALESTINA", "EL AROSA", "EL BAWADY", "EL DOHA", "ELLEDI", 
  "FERRERO", "FERSAN", "FIDE", "FINE", "FISH AVENUE", "GALAXY", "GHARIBIAN", "GREEN LAND", 
  "GREENLAND", "GULLON", "HALAYEB", "HALWANI", "HANA", "HARIBO", "HEBA'S", "ICIM", 
  "INDOMIE", "JAMEEDNA", "KAROUN", "KDD", "KINDER", "KIRI", "KOMAGENE", "KRINOS", 
  "LIPTON", "LOACKER", "MAGGI", "MAHMOOD", "MARCA", "MARMARABIRLIK", "MARMIA", "MAROLIVO", 
  "MCVITIES", "MEHMET EFENDI", "MERVE", "MID EAST", "MIDAMAR", "MIRA", "MIRINDA", "MODA", 
  "MONTANA", "MOSUL", "MOUSSY", "MUKALLA", "NAJJAR", "NAZU'S", "NESCAFE", "NESTLE", 
  "NIDO", "NOON", "NOUR", "ONCU", "ORLANDO", "OTHER LENTIL", "PASABAHCE", "PINDOS", 
  "PUCK", "REEF", "RODOPA", "SADAF", "SARIKIZ", "SCHWEPPES", "SHANI", "SPYSI", "SUHAGY", 
  "TAMEK", "TAYAS", "TEHMAR", "TOBLERONE", "TRIA", "TYJ SPRING", "ULKER", "ULUDAG", 
  "VALBRESO", "VIMTO"
];

// Kategori mapping
const getCategoryForBrand = (brand: string) => {
  const teaCoffee = ['AHMAD', 'AL AMEED', 'DO GHAZAL', 'MEHMET EFENDI', 'NAJJAR', 'LIPTON', 'NESCAFE', 'CAYKUR'];
  const dairy = ['AL HALOUB', 'DAIRYLAND', 'KAROUN', 'KRINOS', 'ARZ LABNE', 'KIRI', 'NIDO', 'PUCK'];
  const beverages = ['BARBICAN', 'MOUSSY', 'VIMTO', 'MIRA', 'MIRINDA', 'SCHWEPPES', 'SARIKIZ', 'ULUDAG'];
  const cookies = ['GULLON', 'ULKER', 'HARIBO', 'FERRERO', 'CADBURY', 'GALAXY', 'KINDER', 'NESTLE', 'TOBLERONE', 'MCVITIES', 'LOACKER', 'BON-O-BON', 'BALCONI'];
  const canned = ['CA GARDEN', 'AL SHARK', 'CORTAS', 'HALAYEB', 'HALWANI'];
  const frozen = ['MONTANA', 'AL SAFA'];
  const grains = ['AAHU BARAH', 'EL DOHA', 'NOON'];
  const nuts = ['NOUR', 'AL KHAR', 'CRUNCHY NUTS'];
  const pickles = ['MARCA', 'BAROODY', 'AL QASR'];
  const spices = ['GREENLAND', 'SADAF'];
  
  if (teaCoffee.includes(brand)) return 'Tea & Coffee';
  if (dairy.includes(brand)) return 'Dairy & Cheese';
  if (beverages.includes(brand)) return 'Beverages';
  if (cookies.includes(brand)) return 'Cookies & Sweets';
  if (canned.includes(brand)) return 'Canned Foods';
  if (frozen.includes(brand)) return 'Frozen Foods';
  if (grains.includes(brand)) return 'Grains & Rice';
  if (nuts.includes(brand)) return 'Nuts & Seeds';
  if (pickles.includes(brand)) return 'Pickles & Preserves';
  if (spices.includes(brand)) return 'Spices & Seasonings';
  return 'General Foods';
};

// TÜM markaları Brand[] formatına çevir
const brandsData: Brand[] = csvBrands.map((brandName, index) => ({
  id: brandName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
  name: brandName,
  description: `Premium ${getCategoryForBrand(brandName).toLowerCase()} products and specialties from ${brandName}.`,
  category: getCategoryForBrand(brandName),
  productCount: Math.floor(Math.random() * 15) + 1, // Random 1-15 products
  isExclusive: brandName === 'MARMIA' || brandName === 'MODA',
  featured: ['GREENLAND', 'MARMIA', 'MODA', 'SADAF', 'FERRERO', 'HARIBO', 'BARBICAN', 'CA GARDEN'].includes(brandName),
  country: brandName.includes('AL ') || brandName.includes('AR') ? 'Middle East' : 
           ['ULKER', 'MODA', 'CAYKUR', 'TAMEK', 'KOMAGENE', 'ONCU'].includes(brandName) ? 'Turkey' :
           ['FERRERO', 'BARILLA'].includes(brandName) ? 'Italy' :
           ['HARIBO'].includes(brandName) ? 'Germany' :
           ['GULLON'].includes(brandName) ? 'Spain' : undefined
}));

export default function Brands() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(brandsData.map(brand => brand.category)));
    return ['All', ...cats.sort()];
  }, []);

  // Filter and sort brands
  const filteredBrands = useMemo(() => {
    let filtered = brandsData.filter(brand => {
      const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           brand.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || brand.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort brands
    filtered.sort((a, b) => {
      if (sortBy === 'featured') {
        // Featured first, then exclusive, then by product count
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        if (a.isExclusive && !b.isExclusive) return -1;
        if (!a.isExclusive && b.isExclusive) return 1;
        return b.productCount - a.productCount;
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'products') {
        return b.productCount - a.productCount;
      }
      return 0;
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  // Get stats
  const stats = useMemo(() => {
    return {
      totalBrands: brandsData.length,
      exclusiveBrands: brandsData.filter(b => b.isExclusive).length,
      categories: categories.length - 1,
      totalProducts: brandsData.reduce((sum, b) => sum + b.productCount, 0)
    };
  }, [categories]);

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 12, filteredBrands.length));
  };

  const featuredBrands = brandsData.filter(brand => brand.featured);
  const exclusiveBrands = brandsData.filter(brand => brand.isExclusive);

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
                <Badge className="h-10 w-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
              Our <span className="text-accentRed">Brands</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              {stats.totalBrands}+ premium brands from around the world
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stats.totalBrands}+</div>
                <div className="text-white/80 text-sm md:text-base">Total Brands</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accentRed mb-2">{stats.exclusiveBrands}</div>
                <div className="text-white/80 text-sm md:text-base">Exclusive</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stats.categories}</div>
                <div className="text-white/80 text-sm md:text-base">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stats.totalProducts}+</div>
                <div className="text-white/80 text-sm md:text-base">Products</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#exclusive-brands"
                className="group inline-flex items-center justify-center bg-white text-neutralBlack px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <Star className="mr-3 h-5 w-5" />
                View Exclusive Brands
              </a>
              
              <a 
                href="#all-brands"
                className="group inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-neutralBlack"
              >
                <Package className="mr-3 h-5 w-5" />
                Browse All Brands
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Exclusive Brands Section */}
      <section id="exclusive-brands" className="py-16 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full mb-4">
              <Star className="w-4 h-4" />
              <span className="font-medium">Exclusive Distributorship</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutralBlack mb-4">
              North Carolina Exclusive Brands
            </h2>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We are the exclusive distributor for these premium Mediterranean and Turkish brands in North Carolina
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {exclusiveBrands.map((brand) => (
              <div key={brand.id} className="group bg-white rounded-2xl shadow-lg border-2 border-amber-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold">{brand.name}</h3>
                    <div className="bg-white/20 px-3 py-1 rounded-full">
                      <span className="text-sm font-medium">EXCLUSIVE</span>
                    </div>
                  </div>
                  <p className="text-amber-100 mb-4">{brand.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="bg-white/20 px-2 py-1 rounded">{brand.productCount} Products</span>
                    {brand.country && <span className="bg-white/20 px-2 py-1 rounded">{brand.country}</span>}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="text-center">
                    <p className="text-gray-600 text-sm">
                      Premium {brand.country} products available through wholesale inquiry
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Brands Section */}
      <section id="all-brands" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutralBlack mb-4">
              All Brands
            </h2>
            <p className="text-lg text-gray-600">
              Discover our complete collection of premium brands
            </p>
          </div>

          {/* Filters and Controls */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search brands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-transparent bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'All' ? 'All Categories' : category}
                  </option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-transparent bg-white"
              >
                <option value="featured">Featured First</option>
                <option value="name">Sort by Name</option>
                <option value="products">Most Products</option>
              </select>

              {/* View Mode */}
              <div className="flex rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 transition-colors ${viewMode === 'grid' ? 'bg-primaryBlue text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 transition-colors ${viewMode === 'list' ? 'bg-primaryBlue text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Results Info */}
            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <span>
                Showing {Math.min(visibleCount, filteredBrands.length)} of {filteredBrands.length} brands
                {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                {searchTerm && ` matching "${searchTerm}"`}
              </span>
              
              {(searchTerm || selectedCategory !== 'All') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="text-primaryBlue hover:text-accentRed font-medium transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Brands Grid/List */}
          {filteredBrands.length > 0 ? (
            <>
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {filteredBrands.slice(0, visibleCount).map((brand) => (
                  <BrandCard key={brand.id} brand={brand} viewMode={viewMode} />
                ))}
              </div>

              {/* Load More */}
              {visibleCount < filteredBrands.length && (
                <div className="text-center mt-12">
                  <button
                    onClick={loadMore}
                    className="inline-flex items-center justify-center bg-primaryBlue text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-primaryBlue/90 hover:scale-105"
                  >
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Load More Brands ({filteredBrands.length - visibleCount} remaining)
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-serif font-semibold text-neutralBlack mb-2">No brands found</h3>
              <p className="text-gray-600">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// Brand Card Component
const BrandCard = ({ brand, viewMode }: { brand: Brand; viewMode: 'grid' | 'list' }) => {
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 transition-all duration-300 hover:shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-neutralBlack">{brand.name}</h3>
              {brand.isExclusive && (
                <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">
                  EXCLUSIVE
                </span>
              )}
              {brand.featured && (
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                  FEATURED
                </span>
              )}
            </div>
            <p className="text-gray-600 mb-3">{brand.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="bg-gray-100 px-2 py-1 rounded">{brand.category}</span>
              <span>{brand.productCount} products</span>
              {brand.country && <span>🌍 {brand.country}</span>}
            </div>
          </div>
          
          <div className="ml-6 text-right">
            <p className="text-sm text-gray-500 mb-1">Available for</p>
            <p className="text-sm font-medium text-primaryBlue">Wholesale Inquiry</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`group bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
      brand.isExclusive ? 'border-amber-200' : ''
    }`}>
      {brand.isExclusive && (
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-2 text-center">
          <span className="text-white text-xs font-bold">⭐ NORTH CAROLINA EXCLUSIVE</span>
        </div>
      )}
      
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {brand.featured && <Star className="w-4 h-4 text-blue-500" />}
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {brand.productCount} products
            </span>
          </div>
          {brand.country && (
            <span className="text-xs text-gray-400">🌍 {brand.country}</span>
          )}
        </div>
        
        <h3 className="text-lg font-bold text-neutralBlack group-hover:text-primaryBlue transition-colors mb-2">
          {brand.name}
        </h3>
        
        <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-3">
          {brand.description}
        </p>

        <div className="mb-4">
          <span className="text-xs px-2 py-1 rounded-full bg-lightGrey text-gray-600">
            {brand.category}
          </span>
        </div>

        <div className="w-full text-center bg-gray-50 px-4 py-3 rounded-lg">
          <p className="text-xs text-gray-600 mb-1">Available through</p>
          <p className="text-sm font-semibold text-primaryBlue">Wholesale Contact</p>
        </div>
      </div>
    </div>
  );
};