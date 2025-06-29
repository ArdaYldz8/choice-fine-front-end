import React from 'react';
import { ArrowRight, Grape, Coffee, Wheat, Fish, Leaf, Pizza } from 'lucide-react';

interface CategoryInfo {
  name: string;
  count: number;
  icon: React.ReactNode;
  description: string;
  image: string;
  featured: boolean;
  color: string;
}

const categoryData: CategoryInfo[] = [
  {
    name: 'OLIVES',
    count: 127,
    icon: <Grape className="h-8 w-8" />,
    description: 'Premium Mediterranean olives from Greece, Turkey & Spain',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: true,
    color: 'from-green-600 to-green-700'
  },
  {
    name: 'SPICES',
    count: 215,
    icon: <Leaf className="h-8 w-8" />,
    description: 'Authentic Mediterranean spices & seasonings',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: true,
    color: 'from-orange-600 to-red-600'
  },
  {
    name: 'COFFEE',
    count: 84,
    icon: <Coffee className="h-8 w-8" />,
    description: 'Traditional Arabic & Turkish coffee blends',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: true,
    color: 'from-amber-700 to-amber-800'
  },
  {
    name: 'PASTA',
    count: 156,
    icon: <Pizza className="h-8 w-8" />,
    description: 'Italian premium pasta & Mediterranean grains',
    image: 'https://images.unsplash.com/photo-1551892589-865f69869476?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: true,
    color: 'from-yellow-600 to-orange-600'
  },
  {
    name: 'CHEESES',
    count: 89,
    icon: <Fish className="h-8 w-8" />,
    description: 'Artisanal Mediterranean cheeses & dairy',
    image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: false,
    color: 'from-blue-600 to-blue-700'
  },
  {
    name: 'GRAINS',
    count: 73,
    icon: <Wheat className="h-8 w-8" />,
    description: 'Ancient grains & Mediterranean cereals',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: false,
    color: 'from-emerald-600 to-emerald-700'
  }
];

interface CategoryShowcaseProps {
  onCategorySelect: (category: string) => void;
  selectedCategory: string;
}

export default function CategoryShowcase({ onCategorySelect, selectedCategory }: CategoryShowcaseProps) {
  const featuredCategories = categoryData.filter(cat => cat.featured);
  const allCategories = categoryData;

  return (
    <div className="mb-12">
      {/* Featured Categories */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">Featured Categories</h2>
            <p className="text-gray-600">Discover our most popular Mediterranean specialties</p>
          </div>
          <button
            onClick={() => onCategorySelect('All Categories')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            View All Products
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCategories.map((category) => (
            <div
              key={category.name}
              onClick={() => onCategorySelect(category.name)}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                selectedCategory === category.name ? 'ring-4 ring-blue-500 ring-opacity-50' : ''
              }`}
            >
              <div className="aspect-[4/5] relative">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity`}></div>
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4">
                    {category.icon}
                  </div>
                  
                  <h3 className="text-xl font-serif font-bold mb-2">{category.name}</h3>
                  <p className="text-sm text-white/90 mb-3 line-clamp-2">{category.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">{category.count} products</span>
                    <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Categories Grid */}
      <div>
        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">All Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <button
            onClick={() => onCategorySelect('All Categories')}
            className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
              selectedCategory === 'All Categories'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="font-semibold">All Products</div>
            <div className="text-sm text-gray-600">1039 items</div>
          </button>
          
          {allCategories.map((category) => (
            <button
              key={category.name}
              onClick={() => onCategorySelect(category.name)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                selectedCategory === category.name
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="text-gray-600">{category.icon}</div>
              </div>
              <div className="font-semibold">{category.name}</div>
              <div className="text-sm text-gray-600">{category.count} items</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 