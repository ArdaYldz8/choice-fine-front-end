import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, Filter, Grid, List, Lock, ShoppingCart, Package } from "lucide-react";
import { type Product } from "../types/product";
import { useCart } from "../contexts/CartContext";
import { useProducts } from "../hooks/useProducts";
import { useDebounce } from "../hooks/use-mobile";
import EnhancedProductCard from "../components/EnhancedProductCard";
import QuickViewModal from "../components/QuickViewModal";

// CSV'den çıkarılan gerçek brand listesi
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

// Get unique brand names for filter
const brandNames = ["All Brands", ...csvBrands.sort()];

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
  "OTHERS",
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
    'OTHERS': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'PASTA': 'https://images.unsplash.com/photo-1551892589-865f69869476?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'SPICES': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'TEA': 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'COFFEE': 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'YOGURT': 'https://images.unsplash.com/photo-1571212515416-8b71b4752fdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  };
  
  return imageMap[category] || 'https://images.unsplash.com/photo-1556909114-4f0f33e6a3c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
};

export default function Products() {
  const [searchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { addItem, addItemWithQuantity, openCart } = useCart();
  
  // Get brand from URL parameters
  const brandParam = searchParams.get('brand');
  
  // Debounce search input to prevent API calls on every keystroke
  const debouncedSearchTerm = useDebounce(searchInput, 500);
  
  // Determine active brand - prefer URL parameter, then selected brand
  const activeBrand = brandParam || (selectedBrand !== "All Brands" ? selectedBrand : "");
  
  // Use search term for text search, brand filtering will be handled separately
  const effectiveSearchTerm = debouncedSearchTerm;

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 35;

  // Use the optimized products hook with filters (no auth check - using mock data)
  const { 
    products: allProducts, 
    loading: productsLoading, 
    error: productsError
  } = useProducts({
    category: selectedCategory,
    searchTerm: effectiveSearchTerm,
    brand: activeBrand,
    pageSize: 2000, // Get all products (we have 1041 products), we'll handle pagination client-side
    enabled: true // Always enabled since we're using mock data
  });

  // Debug: Log product count and filtering
  useEffect(() => {
    console.log(`🔍 Products loaded: ${allProducts.length} total products`);
    console.log(`🎯 Active brand filter: "${activeBrand}"`);
    console.log(`📂 Selected category: "${selectedCategory}"`);
    console.log(`🔍 Search term: "${effectiveSearchTerm}"`);
  }, [allProducts.length, activeBrand, selectedCategory, effectiveSearchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(allProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const products = allProducts.slice(startIndex, endIndex);

  // Handle brand parameter from URL
  useEffect(() => {
    if (brandParam) {
      // Clear search input when brand is selected from URL
      setSearchInput("");
      
      // Find matching brand (case insensitive)
      const matchingBrand = brandNames.find(brand => 
        brand.toLowerCase() === brandParam.toLowerCase()
      );
      
      if (matchingBrand && selectedBrand !== matchingBrand) {
        setSelectedBrand(matchingBrand);
      }
    }
  }, [brandParam]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedBrand, effectiveSearchTerm]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Set mock profile for demo purposes (Supabase disabled)
  useEffect(() => {
    // Mock approved user profile
    const mockProfile = {
      approved: true,
      email: 'demo@choicefoods.com',
      name: 'Demo User'
    };
    
    setProfile(mockProfile);
    setUser({ email: 'demo@choicefoods.com' });
    setIsLoading(false);
  }, []);

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primaryBlue mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
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

  // Show products loading for approved users
  if (user && profile?.approved && productsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Simple loading hero */}
        <section className="relative bg-gradient-to-br from-primaryBlue via-neutralBlack to-primaryBlue text-white overflow-hidden">
          <div className="relative container-custom py-20">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center">
                  <Package className="h-10 w-10 text-white" />
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight">
                Our <span className="text-accentRed">Products</span>
              </h1>
            </div>
          </div>
        </section>
        <div className="container-custom py-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primaryBlue mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
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
                <Package className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 sm:mb-6 leading-tight">
              {brandParam ? (
                <>
                  <span className="text-accentRed">{brandParam}</span> Products
                </>
              ) : (
                <>
                  Our <span className="text-accentRed">Products</span>
                </>
              )}
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto px-4">
              {brandParam ? (
                `Explore all ${brandParam} products in our catalog. ${!user || !profile?.approved ? 'Sign in to see pricing and place orders.' : 'Browse and add items to your cart.'}`
              ) : (
                !user || !profile?.approved 
                  ? "Sign in to access our complete product catalog with pricing and ordering capabilities."
                  : "Browse our extensive collection of premium Mediterranean and Middle Eastern products."
              )}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              {!user ? (
                <>
                  <Link 
                    to="/login"
                    className="group inline-flex items-center justify-center bg-white text-neutralBlack px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 touch-target"
                  >
                    <Lock className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                    Sign In
                  </Link>
                  
                  <Link 
                    to="/catalog"
                    className="group inline-flex items-center justify-center border-2 border-white text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-white hover:text-neutralBlack touch-target"
                  >
                    <Package className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                    View Catalog
                  </Link>
                </>
              ) : !profile?.approved ? (
                <>
                  <Link 
                    to="/contact"
                    className="group inline-flex items-center justify-center bg-white text-neutralBlack px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 touch-target"
                  >
                    <Package className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                    Contact Support
                  </Link>
                  
                  <Link 
                    to="/catalog"
                    className="group inline-flex items-center justify-center border-2 border-white text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-white hover:text-neutralBlack touch-target"
                  >
                    <Package className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                    View Catalog
                  </Link>
                </>
              ) : (
                <>
                  <a 
                    href="#products-section"
                    className="group inline-flex items-center justify-center bg-white text-neutralBlack px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 touch-target"
                  >
                    <Search className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                    Browse Products
                  </a>
                  
                  <button 
                    onClick={openCart}
                    className="group inline-flex items-center justify-center border-2 border-white text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-white hover:text-neutralBlack touch-target"
                  >
                    <ShoppingCart className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                    View Cart
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Mobile optimized */}
      <div id="products-section" className="container-custom py-8 sm:py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          {/* Filters Sidebar - Mobile enhanced */}
          {user && profile?.approved && (
            <div className={`lg:w-80 space-y-4 sm:space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-white/50 sticky top-4 sm:top-8">
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-neutralBlack mb-4 sm:mb-6">Filters</h3>
                
                {/* Search - Mobile optimized */}
                <div className="mb-4 sm:mb-6">
                  <label className="block text-sm font-semibold text-neutralBlack mb-2 sm:mb-3">Search Products</label>
                  <div className="relative">
                    <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primaryBlue/20 focus:border-primaryBlue bg-white/50 transition-all duration-300 text-sm sm:text-base"
                    />
                    {/* Show loading indicator when user is typing but search hasn't been triggered yet */}
                    {searchInput !== debouncedSearchTerm && searchInput.length > 0 && (
                      <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-2 border-primaryBlue border-t-transparent"></div>
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

                {/* Category Filter - Mobile optimized */}
                <div className="mb-4 sm:mb-6">
                  <label className="block text-sm font-semibold text-neutralBlack mb-2 sm:mb-3">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primaryBlue/20 focus:border-primaryBlue bg-white/50 transition-all duration-300 text-sm sm:text-base"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Brand Filter - Mobile optimized */}
                <div className="mb-6 sm:mb-8">
                  <label className="block text-sm font-semibold text-neutralBlack mb-2 sm:mb-3">Brand</label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => {
                      const newBrand = e.target.value;
                      setSelectedBrand(newBrand);
                      // Update URL when brand is changed
                      if (newBrand !== "All Brands") {
                        window.history.replaceState({}, '', `/products?brand=${encodeURIComponent(newBrand)}`);
                      } else {
                        window.history.replaceState({}, '', '/products');
                      }
                    }}
                    className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primaryBlue/20 focus:border-primaryBlue bg-white/50 transition-all duration-300 text-sm sm:text-base"
                  >
                    {brandNames.map((brand) => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => {
                    setSearchInput("");
                    setSelectedCategory("All Categories");
                    setSelectedBrand("All Brands");
                    setCurrentPage(1);
                    // Clear brand parameter from URL
                    window.history.replaceState({}, '', '/products');
                  }}
                  className="w-full py-3 px-4 sm:px-6 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-300 hover:border-primaryBlue hover:text-primaryBlue hover:bg-primaryBlue/5 touch-target"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {/* Controls - Mobile enhanced */}
            {user && profile?.approved && (
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
                <div className="flex items-center gap-3 sm:gap-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden py-2 px-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-300 hover:border-primaryBlue hover:text-primaryBlue touch-target"
                  >
                    <Filter className="h-4 w-4 mr-2 inline-block" />
                    Filters
                  </button>
                  <span className="text-gray-600 font-medium text-sm sm:text-base">
                    Showing {startIndex + 1}-{Math.min(endIndex, allProducts.length)} of {allProducts.length} {activeBrand ? `${activeBrand} ` : ''}products
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 sm:p-3 rounded-xl transition-all duration-300 touch-target ${
                      viewMode === "grid" 
                        ? "bg-primaryBlue text-white shadow-lg" 
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    }`}
                  >
                    <Grid className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 sm:p-3 rounded-xl transition-all duration-300 touch-target ${
                      viewMode === "list" 
                        ? "bg-primaryBlue text-white shadow-lg" 
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    }`}
                  >
                    <List className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Products Display */}
            {!user || !profile?.approved ? (
              /* Membership Required Message - Mobile optimized */
              <div className="text-center py-12 sm:py-16">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-primaryBlue/10 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
                  <Lock className="h-10 w-10 sm:h-12 sm:w-12 text-primaryBlue" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutralBlack mb-3 sm:mb-4">
                  {!user ? "Member Access Required" : "Account Under Review"}
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                  {!user 
                    ? "Sign in or create an account to access our complete product catalog with pricing and ordering capabilities."
                    : "Your account is currently under review. You'll gain access to our product catalog once approved by our team."
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                  {!user ? (
                    <>
                      <Link 
                        to="/login" 
                        className="inline-flex items-center justify-center bg-primaryBlue text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl touch-target"
                      >
                        Sign In
                      </Link>
                      <Link 
                        to="/contact" 
                        className="inline-flex items-center justify-center border-2 border-primaryBlue text-primaryBlue px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-primaryBlue hover:text-white touch-target"
                      >
                        Request Account
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link 
                        to="/contact" 
                        className="inline-flex items-center justify-center bg-primaryBlue text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl touch-target"
                      >
                        Contact Support
                      </Link>
                      <Link 
                        to="/catalog" 
                        className="inline-flex items-center justify-center border-2 border-primaryBlue text-primaryBlue px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-primaryBlue hover:text-white touch-target"
                      >
                        View PDF Catalog
                      </Link>
                    </>
                  )}
                </div>
              </div>
            ) : (
              /* Actual Products for Approved Members - Mobile optimized */
              <>
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
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
                  <div className="space-y-4 sm:space-y-6">
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

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-2 py-8">
                    {/* Previous button */}
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                        currentPage === 1
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Previous
                    </button>

                    {/* Page numbers */}
                    <div className="flex space-x-1">
                      {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 7) {
                          pageNum = i + 1;
                        } else if (currentPage <= 4) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 3) {
                          pageNum = totalPages - 6 + i;
                        } else {
                          pageNum = currentPage - 3 + i;
                        }

                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                              currentPage === pageNum
                                ? 'bg-primaryBlue text-white'
                                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    {/* Next button */}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                        currentPage === totalPages
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Next
                    </button>
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
              </>
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
