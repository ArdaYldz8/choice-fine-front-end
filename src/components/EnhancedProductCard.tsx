import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Eye, MapPin, Shield, Package } from 'lucide-react';
import { type Product } from '../types/product';
import { getProductImageUrl, getCategoryPlaceholder } from '../lib/image-utils';

interface EnhancedProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity?: number) => void;
  onQuickView?: (product: Product) => void;
  viewMode?: 'grid' | 'list';
}

// Enhanced product image mapping with more sophisticated placeholder logic
const getEnhancedProductImage = (category: string, productName: string) => {
  const imageMap: { [key: string]: string } = {
    'BAKERY': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'CANDY': 'https://images.unsplash.com/photo-1514849302-984523450cf4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'CHEESES': 'https://images.unsplash.com/photo-1452195100486-9cc805987862?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'COOKIES': 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'DATES': 'https://images.unsplash.com/photo-1577069861033-55d04cec4ef5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'DRINKS': 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'FROZEN': 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'GRAINS': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'NUTS': 'https://images.unsplash.com/photo-1508747792480-cca4d777b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'OLIVES': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'PASTA': 'https://images.unsplash.com/photo-1551892589-865f69869476?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'SPICES': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'TEA': 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'COFFEE': 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  };
  
  return imageMap[category] || 'https://images.unsplash.com/photo-1556909114-4f0f33e6a3c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
};

// Get origin flag based on product category/name
const getOriginInfo = (category: string, productName: string) => {
  const origins = {
    'OLIVES': { country: 'Greece', flag: '🇬🇷' },
    'PASTA': { country: 'Italy', flag: '🇮🇹' },
    'SPICES': { country: 'Turkey', flag: '🇹🇷' },
    'COFFEE': { country: 'Lebanon', flag: '🇱🇧' },
    'TEA': { country: 'Morocco', flag: '🇲🇦' },
    'CHEESES': { country: 'Cyprus', flag: '🇨🇾' },
    'DATES': { country: 'Tunisia', flag: '🇹🇳' },
    'NUTS': { country: 'Syria', flag: '🇸🇾' },
  };
  
  return origins[category as keyof typeof origins] || { country: 'Mediterranean', flag: '🌊' };
};

export default function EnhancedProductCard({ 
  product, 
  onAddToCart, 
  onQuickView,
  viewMode = 'grid' 
}: EnhancedProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [productImageUrl, setProductImageUrl] = useState<string>(getCategoryPlaceholder(product.category || ''));
  
  const origin = getOriginInfo(product.category || '', product.name);

  // Load the actual product image
  useEffect(() => {
    const loadImage = async () => {
      try {
        const imageUrl = await getProductImageUrl(product.name, product.category || '', product.image_url);
        setProductImageUrl(imageUrl);
      } catch (error) {
        console.error('Error loading product image:', error);
        // Keep the placeholder image on error
      }
    };

    loadImage();
  }, [product.name, product.category, product.image_url]);
  
  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    onQuickView?.(product);
  };
  
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCartWithQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    onAddToCart(product, quantity);
    // Reset quantity after adding to cart
    setQuantity(1);
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 mb-4">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-48 h-48 relative overflow-hidden">
            <img
              src={productImageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to category placeholder on image load error
                const target = e.target as HTMLImageElement;
                target.src = getCategoryPlaceholder(product.category || '');
              }}
            />
            <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
              {origin.flag} {origin.country}
            </div>
            <div className="absolute top-3 right-3 flex gap-2">
              <button 
                onClick={handleWishlist}
                className={`p-2 rounded-full bg-white/90 backdrop-blur-sm transition-colors ${isWishlisted ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
              <button 
                onClick={handleQuickView}
                className="p-2 rounded-full bg-white/90 backdrop-blur-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Eye className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="flex-1 p-4 md:p-6">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
              <div className="flex-1 mb-4 lg:mb-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium w-fit">
                    {product.category}
                  </span>
                </div>
                <h3 className="text-lg lg:text-xl font-serif font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2 text-sm lg:text-base">{product.description || 'Premium Mediterranean product sourced directly from local producers.'}</p>
              </div>
              
              <div className="lg:text-right lg:ml-6">
                {product.price && (
                  <div className="mb-3">
                    <div className="text-xl lg:text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</div>
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <Package className="h-4 w-4" />
                  <span>SKU: {product.sku}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-green-600 mb-4">
                  <Shield className="h-4 w-4" />
                  <span>In Stock: {product.quantity_on_hand || 'Available'}</span>
                </div>

                {/* Quantity Selector for List View - Mobile Optimized */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center border border-gray-300 rounded-lg bg-white w-full sm:w-auto">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setQuantity(Math.max(1, quantity - 1));
                        }}
                        className="p-2 hover:bg-gray-50 rounded-l-lg transition-colors flex-shrink-0"
                      >
                        <span className="text-lg font-medium">-</span>
                      </button>
                      <span className="px-4 py-2 min-w-[60px] text-center font-medium flex-1 sm:flex-initial">{quantity}</span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setQuantity(quantity + 1);
                        }}
                        className="p-2 hover:bg-gray-50 rounded-r-lg transition-colors flex-shrink-0"
                      >
                        <span className="text-lg font-medium">+</span>
                      </button>
                    </div>
                    {product.price && (
                      <div className="text-sm text-gray-600 text-center sm:text-left">
                        Total: <span className="font-medium text-blue-600">${(product.price * quantity).toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <button 
                  onClick={handleAddToCartWithQuantity}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 lg:px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="hidden sm:inline">Add {quantity > 1 ? `${quantity} items` : 'to Cart'}</span>
                  <span className="sm:hidden">Add {quantity > 1 ? `${quantity}` : ''}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
      <div className="relative overflow-hidden">
        <img
          src={productImageUrl}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // Fallback to category placeholder on image load error
            const target = e.target as HTMLImageElement;
            target.src = getCategoryPlaceholder(product.category || '');
          }}
        />
        
        {/* Origin Badge */}
        <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          {origin.flag} {origin.country}
        </div>
        
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={handleWishlist}
            className={`p-2 rounded-full bg-white/90 backdrop-blur-sm transition-colors ${isWishlisted ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          <button 
            onClick={handleQuickView}
            className="p-2 rounded-full bg-white/90 backdrop-blur-sm text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Eye className="h-5 w-5" />
          </button>
        </div>
        
        {/* Stock Status */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 text-sm text-white bg-green-600 px-3 py-1 rounded-full">
          <Shield className="h-4 w-4" />
          <span>In Stock</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
            {product.category}
          </span>
        </div>
        
        <h3 className="text-lg font-serif font-bold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description || 'Premium Mediterranean product sourced directly from local producers.'}</p>
        
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Package className="h-4 w-4" />
          <span>SKU: {product.sku}</span>
        </div>
        
        {product.price && (
          <div className="mb-4">
            <div className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</div>
            
            {/* Total price display for grid view */}
            {quantity > 1 && (
              <div className="mt-2 text-sm text-gray-600">
                Total: <span className="font-medium text-blue-600">${(product.price * quantity).toFixed(2)}</span>
              </div>
            )}
          </div>
        )}

        {/* Compact Quantity Selector for Grid View */}
        <div className="mb-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center border border-gray-300 rounded-lg bg-white">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setQuantity(Math.max(1, quantity - 1));
                }}
                className="p-2 hover:bg-gray-50 rounded-l-lg transition-colors"
              >
                <span className="text-sm font-medium">-</span>
              </button>
              <span className="px-3 py-2 min-w-[40px] text-center text-sm font-medium">{quantity}</span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setQuantity(quantity + 1);
                }}
                className="p-2 hover:bg-gray-50 rounded-r-lg transition-colors"
              >
                <span className="text-sm font-medium">+</span>
              </button>
            </div>
            <span className="text-xs text-gray-500">Qty</span>
          </div>
        </div>
        
        <button 
          onClick={handleAddToCartWithQuantity}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart className="h-5 w-5" />
          Add {quantity > 1 ? `${quantity}` : 'to Cart'}
        </button>
      </div>
    </div>
  );
} 