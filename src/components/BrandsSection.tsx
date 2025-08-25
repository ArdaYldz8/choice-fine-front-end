import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Badge, Package, Star } from "lucide-react";
import { Brand } from "../lib/brands-data";

interface BrandsSectionProps {
  brands: Brand[];
  title?: string;
  showAll?: boolean;
  className?: string;
}

interface BrandCardProps {
  brand: Brand;
  featured?: boolean;
}

function BrandCard({ brand, featured = false }: BrandCardProps) {
  return (
    <div className={`group relative ${featured ? 'bg-gradient-to-br from-emerald-50 to-teal-50' : 'bg-white'} 
                    rounded-xl shadow-md hover:shadow-xl transition-all duration-300 
                    border border-gray-100 hover:border-emerald-200 overflow-hidden`}>
      {/* Hover overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative p-6">
        {/* Logo section */}
        <div className="relative w-16 h-16 mb-4 mx-auto">
          {brand.logoUrl ? (
            <div className="w-16 h-16 flex items-center justify-center bg-white rounded-lg shadow-sm border border-gray-100">
              <img 
                src={brand.logoUrl} 
                alt={`${brand.name} logo`}
                className="max-w-full max-h-full object-contain p-1"
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              {/* Fallback placeholder */}
              <div className="hidden w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 
                              rounded-lg flex items-center justify-center text-white font-bold text-sm">
                {brand.logoPlaceholder}
              </div>
            </div>
          ) : (
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 
                            rounded-lg flex items-center justify-center text-white font-bold text-sm">
              {brand.logoPlaceholder}
            </div>
          )}
        </div>

        {/* Brand info */}
        <div className="text-center">
          <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-emerald-700 
                         transition-colors duration-300">
            {brand.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {brand.description}
          </p>
          <div className="flex items-center justify-between text-xs">
            <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full font-medium">
              {brand.productCount} products
            </span>
            <span className="text-gray-500">
              {brand.category}
            </span>
          </div>
        </div>

        {/* Featured badge */}
        {featured && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
                           bg-amber-100 text-amber-800">
              ⭐ Featured
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export function BrandsSection({ 
  brands, 
  title = "Our Trusted Brands", 
  showAll = false, 
  className = "" 
}: BrandsSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Get unique categories
  const categories = ['All', ...new Set(brands.map(brand => brand.category))];

  // Get featured brands (for homepage section)
  const featuredBrands = brands.filter(brand => brand.featured).slice(0, 6);

  // Filter and sort brands
  const filteredBrands = brands
    .filter(brand => {
      const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          brand.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || brand.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'products':
          return b.productCount - a.productCount;
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const displayBrands = showAll ? brands : brands.slice(0, 8);
  
  return (
    <section className={`section-padding ${className}`}>
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Badge className="h-8 w-8 text-primaryBlue mr-3" />
            <div className="w-16 h-px bg-gradient-to-r from-primaryBlue to-accentRed"></div>
            <span className="mx-4 text-sm font-medium text-primaryBlue uppercase tracking-wider">
              Quality Partners
            </span>
            <div className="w-16 h-px bg-gradient-to-r from-accentRed to-primaryBlue"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutralBlack mb-6">
            {title}
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We partner with {brands.length}+ trusted brands from around the world to bring you the finest 
            Mediterranean, Middle Eastern, and international food products.
          </p>
        </div>

        {/* Featured Brands Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Featured Brands</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBrands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} featured={true} />
            ))}
          </div>
        </div>

        {/* All Brands Section */}
        <div className="border-t border-gray-200 pt-12">
          {/* Search and Filter Controls */}
          <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search brands..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
                         focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex space-x-4">
              {/* Category Filter */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center px-4 py-3 bg-white border border-gray-300 rounded-lg 
                           hover:border-emerald-500 focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
                >
                  <span className="mr-2">{selectedCategory}</span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 
                                rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-emerald-50 transition-colors duration-200
                                  ${selectedCategory === category ? 'bg-emerald-100 text-emerald-700' : 'text-gray-700'}`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
                         focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
              >
                <option value="name">Sort by Name</option>
                <option value="products">Sort by Products</option>
                <option value="category">Sort by Category</option>
              </select>
            </div>
          </div>

          {/* Brands Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBrands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>

          {/* No results message */}
          {filteredBrands.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No brands found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* View All Brands CTA */}
        {!showAll && brands.length > 8 && (
          <div className="text-center">
            <Link
              to="/brands"
              className="group inline-flex items-center justify-center bg-gradient-to-r from-primaryBlue to-accentRed text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primaryBlue/50"
            >
              View All {brands.length} Brands
              <Package className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        )}

        {/* Brand Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-primaryBlue mb-2">{brands.length}+</div>
            <div className="text-gray-600">Trusted Brands</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-accentRed mb-2">
              {brands.reduce((sum, brand) => sum + brand.productCount, 0)}+
            </div>
            <div className="text-gray-600">Total Products</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-neutralBlack mb-2">
              {Object.keys(brands.reduce((acc, brand) => {
                acc[brand.category] = true;
                return acc;
              }, {} as Record<string, boolean>)).length}
            </div>
            <div className="text-gray-600">Categories</div>
          </div>
        </div>
      </div>
    </section>
  );
} 