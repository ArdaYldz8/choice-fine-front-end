import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Search, Filter, Grid, List, Lock, ShoppingCart } from "lucide-react";
import { supabase, getCurrentUserProfile, type Product } from "../lib/supabase";
import { useCart } from "../contexts/CartContext";
import { useProducts } from "../hooks/useProducts";
import { useDebounce } from "../hooks/use-mobile";
import ProfessionalHero from "../components/ProfessionalHero";
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
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { addItem, addItemWithQuantity, openCart } = useCart();
  
  // Debounce search input to prevent API calls on every keystroke
  const debouncedSearchTerm = useDebounce(searchInput, 500);
  
  // Use the optimized products hook with filters
  const { 
    products, 
    loading: productsLoading, 
    error: productsError
  } = useProducts({
    category: selectedCategory,
    searchTerm: debouncedSearchTerm,
    pageSize: 30,
    enabled: !!profile?.approved
  });

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

  // Show loading while checking auth or loading products
  if (isLoading || productsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primaryBlue mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  // Show error if products failed to load
  if (productsError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-neutralBlack mb-4">
            Error Loading Products
          </h1>
          <p className="text-gray-600 mb-6">{productsError}</p>
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="h-8 w-8 text-yellow-600" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-neutralBlack mb-4">
            Account Pending Approval
          </h1>
          <p className="text-gray-600 mb-6">
            Your account is currently under review. You'll gain access to our product catalog once approved by our team.
          </p>
          <p className="text-sm text-gray-500">
            This process typically takes 1-2 business days. Thank you for your patience!
          </p>
        </div>
      </div>
    );
  }

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
      packSize: 'Unit',
      country: 'Mediterranean'
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <ProfessionalHero />

      {/* Main Content */}
      <div className="container-custom py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 sticky top-8">
              <h3 className="font-serif font-bold text-2xl text-neutralBlack mb-6">Filters</h3>
              
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-neutralBlack mb-3">Search Products</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primaryBlue/20 focus:border-primaryBlue bg-white/50 transition-all duration-300"
                  />
                  {/* Show loading indicator when user is typing but search hasn't been triggered yet */}
                  {searchInput !== debouncedSearchTerm && searchInput.length > 0 && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-primaryBlue border-t-transparent"></div>
                    </div>
                  )}
                </div>
                {searchInput.length > 0 && (
                  <div className="mt-2 text-xs text-gray-500">
                    {searchInput === debouncedSearchTerm 
                      ? `Found ${products.length} products` 
                      : 'Searching...'
                    }
                  </div>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-neutralBlack mb-3">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primaryBlue/20 focus:border-primaryBlue bg-white/50 transition-all duration-300"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => {
                  setSearchInput("");
                  setSelectedCategory("All Categories");
                }}
                className="w-full py-3 px-6 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-300 hover:border-primaryBlue hover:text-primaryBlue hover:bg-primaryBlue/5"
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
                  className="lg:hidden py-2 px-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-300 hover:border-primaryBlue hover:text-primaryBlue"
                >
                  <Filter className="h-4 w-4 mr-2 inline-block" />
                  Filters
                </button>
                <span className="text-gray-600 font-medium">
                  {products.length} products found
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    viewMode === "grid" 
                      ? "bg-primaryBlue text-white shadow-lg" 
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    viewMode === "list" 
                      ? "bg-primaryBlue text-white shadow-lg" 
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Products Display */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {products.map((product) => (
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
                {products.map((product) => (
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

            {/* No products found */}
            {products.length === 0 && !productsLoading && (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-neutralBlack mb-4">No products found</h3>
                <p className="text-gray-600 mb-8 text-lg">Try adjusting your search criteria or filters.</p>
                <button
                  onClick={() => {
                    setSearchInput("");
                    setSelectedCategory("All Categories");
                  }}
                  className="btn-primary"
                >
                  Clear All Filters
                </button>
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
