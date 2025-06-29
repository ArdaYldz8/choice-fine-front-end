import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Search, Filter, Grid, List, Lock, ShoppingCart, Plus } from "lucide-react";
import { supabase, getCurrentUserProfile, type Product } from "../lib/supabase";
import { useCart } from "../contexts/CartContext";
import { useProducts } from "../hooks/useProducts";
import ProfessionalHero from "../components/ProfessionalHero";
import CategoryShowcase from "../components/CategoryShowcase";
import EnhancedProductCard from "../components/EnhancedProductCard";
import QuickViewModal from "../components/QuickViewModal";

// Real categories from our product data
const categories = [
  "All Categories",
  "BAKERY", 
  "CANDY",
  "CHEESES",
  "COOKIES",
  "DATES",
  "DESSERT MIX",
  "DRINKS",
  "FETA",
  "FILLO",
  "FOODSERVICE",
  "FROZEN",
  "GRAINS",
  "GROCERY",
  "HALAL CANDY",
  "ICE CREAM",
  "JAMS & HONEY",
  "KITCHEN",
  "MEAT",
  "MISC",
  "NUTS",
  "OLIVES",
  "PASTA",
  "PICKLES",
  "READY TO EAT",
  "SADAF",
  "SAUCES",
  "SNACKS",
  "SPICES",
  "SWEETS",
  "TEA",
  "COFFEE",
  "YOGURT",
  "ZIYAD"
];

// Function to get a placeholder image based on category
const getCategoryImage = (category: string) => {
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
    'PASTA': 'https://images.unsplash.com/photo-1551892589-865f69869476?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'SPICES': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'TEA': 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'COFFEE': 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'YOGURT': 'https://images.unsplash.com/photo-1571212515416-8b71b4752fdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  };
  
  return imageMap[category] || 'https://images.unsplash.com/photo-1556909114-4f0f33e6a3c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
};

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { addItem, addItemWithQuantity, openCart } = useCart();
  
  // Use the optimized products hook with filters
  const { 
    products, 
    loading: productsLoading, 
    error: productsError,
    hasNextPage,
    loadNextPage,
    cacheStats
  } = useProducts({
    category: selectedCategory,
    searchTerm,
    pageSize: 30, // Optimized page size for virtual scrolling
    enabled: !!profile?.approved // Only fetch if user is approved
  });

  // Add timeout for products loading
  useEffect(() => {
    if (productsLoading) {
      const timer = setTimeout(() => {
        setLoadingTimeout(true);
      }, 10000); // 10 second timeout

      return () => clearTimeout(timer);
    } else {
      setLoadingTimeout(false);
    }
  }, [productsLoading]);

  // Check auth status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          const userProfile = await getCurrentUserProfile();
          setProfile(userProfile);
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user);
        const userProfile = await getCurrentUserProfile();
        setProfile(userProfile);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Show loading timeout message
  if (loadingTimeout && productsLoading) {
    return (
      <div className="min-h-screen bg-lightGrey flex items-center justify-center">
        <div className="text-center max-w-lg mx-auto p-8">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="h-8 w-8 text-yellow-600" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-neutralBlack mb-4">
            Loading Taking Too Long
          </h1>
          <p className="text-gray-600 mb-6">
            Products are taking longer than expected to load. This might be because:
          </p>
          <ul className="text-left text-gray-600 mb-6 space-y-2">
            <li>• Products table doesn't exist yet</li>
            <li>• Migration needs to be run</li>
            <li>• Supabase connection issue</li>
          </ul>
          <div className="space-y-3">
            <button 
              onClick={() => window.location.reload()}
              className="btn-primary w-full"
            >
              Try Again
            </button>
            <p className="text-sm text-gray-500">
              Check browser console for error details
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show loading while checking auth or loading products
  if (isLoading || productsLoading) {
    return (
      <div className="min-h-screen bg-lightGrey flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primaryBlue mx-auto mb-4"></div>
          <p>Loading products...</p>
          <p className="text-sm text-gray-500 mt-2">
            {productsLoading ? 'Fetching product data...' : 'Checking authentication...'}
          </p>
        </div>
      </div>
    );
  }

  // Show error if products failed to load
  if (productsError) {
    return (
      <div className="min-h-screen bg-lightGrey flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-neutralBlack mb-4">
            Error Loading Products
          </h1>
          <p className="text-gray-600 mb-6">
            {productsError}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Show approval pending message if not approved
  if (!profile?.approved) {
    return (
      <div className="min-h-screen bg-lightGrey flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="h-8 w-8 text-yellow-600" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-neutralBlack mb-4">
            Account Pending Approval
          </h1>
          <p className="text-gray-600 mb-6">
            Your account is currently under review. You'll gain access to our product catalog once your account is approved by our team.
          </p>
          <p className="text-sm text-gray-500">
            This process typically takes 1-2 business days. Thank you for your patience!
          </p>
        </div>
      </div>
    );
  }

  // Products are now pre-filtered by the optimized hook
  const filteredProducts = products;

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      description: product.description || '',
      category: product.category || '',
      price: product.price,
      sku: product.sku,
      quickbooks_id: product.quickbooks_id,
      image: getCategoryImage(product.category || ''),
      tags: [product.category || 'Product'],
      packSize: 'Unit', // Using default since pack_size doesn't exist in Product type
      country: 'Mediterranean' // Using default since country doesn't exist in Product type
    };

    if (quantity === 1) {
      addItem(cartItem);
    } else {
      addItemWithQuantity(cartItem, quantity);
    }
    
    openCart();
  };

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional Hero Section */}
      <ProfessionalHero />

      {/* Category Showcase */}
      <div className="container-custom py-12">
        <CategoryShowcase 
          onCategorySelect={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
      </div>

      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl p-6 shadow-elevation">
              <h3 className="font-serif font-bold text-lg text-neutralBlack mb-4">Filters</h3>
              
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutralBlack mb-2">Search Products</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryBlue focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutralBlack mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryBlue focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All Categories");
                }}
                className="w-full btn-outline"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden btn-outline"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </button>
                <span className="text-gray-600">
                  {filteredProducts.length} products found
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid" ? "bg-primaryBlue text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list" ? "bg-primaryBlue text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Enhanced Products with Professional Cards */}
            {viewMode === "grid" ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <EnhancedProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onQuickView={handleQuickView}
                    viewMode="grid"
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredProducts.map((product) => (
                  <EnhancedProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onQuickView={handleQuickView}
                    viewMode="list"
                  />
                ))}
              </div>
            )}

            {/* Load More Button for Virtual Scrolling */}
            {hasNextPage && !productsLoading && (
              <div className="text-center py-8">
                <button
                  onClick={loadNextPage}
                  className="btn-outline"
                >
                  Load More Products
                </button>
              </div>
            )}

            {filteredProducts.length === 0 && !productsLoading && (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-serif font-bold text-neutralBlack mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters.</p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All Categories");
                  }}
                  className="btn-primary"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Performance Stats (development only) */}
            {process.env.NODE_ENV === 'development' && cacheStats && (
              <div className="mt-8 p-4 bg-gray-100 rounded-lg text-xs text-gray-600">
                <strong>🚀 Performance Stats:</strong> Cache hits - Products: {cacheStats.products || 0}, 
                Search: {cacheStats.searchResults || 0}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={handleCloseQuickView}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
