import React, { useState } from 'react';
import { X, ShoppingCart, Heart, Share2, Truck, Shield, Award, MapPin } from 'lucide-react';
import { type Product } from '../types/product';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity?: number) => void;
}

// Same image logic as enhanced card
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

const getOriginInfo = (category: string) => {
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

export default function QuickViewModal({ product, isOpen, onClose, onAddToCart }: QuickViewModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!isOpen || !product) return null;

  const origin = getOriginInfo(product.category || '');
  const mainImage = getEnhancedProductImage(product.category || '', product.name);
  
  // Mock additional images
  const productImages = [
    mainImage,
    mainImage, // In real app, these would be different angles
    mainImage,
  ];

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        ></div>
        
        {/* Modal */}
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="grid md:grid-cols-2 gap-0">
            {/* Product Images */}
            <div className="bg-gray-50">
              <div className="aspect-square relative">
                <img
                  src={productImages[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Origin Badge */}
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-2 rounded-full text-sm font-medium">
                  {origin.flag} {origin.country}
                </div>
                
                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {productImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === selectedImageIndex 
                          ? 'bg-white scale-125' 
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-8 overflow-y-auto max-h-[90vh]">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </span>
                <span className="text-sm text-gray-500">SKU: {product.sku}</span>
              </div>

              <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {product.description || 'Premium Mediterranean product sourced directly from local producers. This authentic item brings the finest flavors and traditional craftsmanship to your table.'}
              </p>

              {/* Price */}
              {product.price && (
                <div className="mb-6">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-3xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
                    <span className="text-sm text-gray-500">per unit</span>
                  </div>
                  <div className="text-sm text-green-600 font-medium">
                    Volume discounts available for orders 12+
                  </div>
                </div>
              )}

              {/* Product Features */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Award className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-sm">Premium Quality</div>
                    <div className="text-xs text-gray-600">Certified authentic</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Truck className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium text-sm">Fast Delivery</div>
                    <div className="text-xs text-gray-600">24-48 hours</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Shield className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="font-medium text-sm">Quality Guarantee</div>
                    <div className="text-xs text-gray-600">100% satisfaction</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-orange-600" />
                  <div>
                    <div className="font-medium text-sm">Direct Import</div>
                    <div className="text-xs text-gray-600">From source</div>
                  </div>
                </div>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-6 p-4 bg-green-50 rounded-lg">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-700">In Stock</span>
                <span className="text-sm text-green-600">
                  ({product.quantity_on_hand || 'Available'} units available)
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-gray-50 rounded-l-lg"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-gray-50 rounded-r-lg"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-sm text-gray-600">
                    Total: <span className="font-medium">${((product.price || 0) * quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </button>
                
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    isWishlisted 
                      ? 'border-red-500 text-red-500 bg-red-50' 
                      : 'border-gray-300 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
                
                <button className="p-3 rounded-lg border-2 border-gray-300 text-gray-600 hover:border-gray-400 transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>

              {/* Additional Info */}
              <div className="border-t pt-6">
                <h3 className="font-medium text-gray-900 mb-3">Product Information</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Authentic Mediterranean sourcing</li>
                  <li>• Temperature-controlled shipping</li>
                  <li>• Wholesale pricing available</li>
                  <li>• Expert culinary consultation included</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 