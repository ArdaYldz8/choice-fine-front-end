import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Search, Filter, Grid, List, Lock, ShoppingCart, Plus } from "lucide-react";
import { supabase, getCurrentUserProfile } from "../lib/supabase";
import { useCart } from "../contexts/CartContext";

const categories = [
  "All Categories",
  "Premium Grains", 
  "Frozen Vegetables",
  "Imported Beverages",
  "European Wafers & Cakes",
  "Dairy Products"
];

const countries = [
  "All Countries",
  "Italy", 
  "Spain",
  "Greece", 
  "France",
  "Germany",
  "Netherlands",
  "Turkey"
];

const products = [
  {
    id: 1,
    name: "Premium Whole Wheat Flour",
    description: "High-quality whole wheat flour sourced from the finest grains around the world.",
    category: "Premium Grains",
    country: "Italy",
    packSize: "2kg Bag",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Organic", "Whole Grain", "Premium"],
    featured: true
  },
  {
    id: 2,
    name: "Organic Quinoa",
    description: "Premium quinoa grains, perfect for healthy and nutritious meals.",
    category: "Premium Grains",
    country: "Italy", 
    packSize: "1kg Package",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Organic", "Gluten-Free", "Superfood"],
    featured: true
  },
  {
    id: 3,
    name: "Frozen Mediterranean Vegetables",
    description: "Premium frozen vegetable mix including exotic and common varieties.",
    category: "Frozen Vegetables",
    country: "Spain",
    packSize: "1kg Frozen Pack", 
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Frozen", "Mediterranean", "Popular Brand"],
    featured: false
  },
  {
    id: 4,
    name: "Organic Frozen Spinach",
    description: "Premium frozen spinach from the most popular brands in the market.",
    category: "Frozen Vegetables",
    country: "Netherlands",
    packSize: "500g Frozen Pack",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Organic", "Frozen", "Healthy"],
    featured: false
  },
  {
    id: 5,
    name: "Premium Italian Mineral Water",
    description: "Imported Italian mineral water supporting a healthy and balanced lifestyle.",
    category: "Imported Beverages", 
    country: "Italy",
    packSize: "1L Glass Bottle",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Imported", "Mineral", "Premium"],
    featured: false
  },
  {
    id: 6,
    name: "Italian Wafers Assortment",
    description: "The best Italian wafers available in the US from premium European brands.",
    category: "European Wafers & Cakes",
    country: "Italy",
    packSize: "200g Package",
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Italian", "European", "Premium"],
    featured: false
  },
  {
    id: 7,
    name: "Premium European Cheese Selection",
    description: "Extensive selection of high-quality cheeses from the best European producers.",
    category: "Dairy Products",
    country: "France",
    packSize: "250g Package",
    image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["European", "Premium", "Cheese"],
    featured: true
  },
  {
    id: 8,
    name: "Organic Greek Yogurt",
    description: "Premium quality Greek yogurt and other dairy products.",
    category: "Dairy Products",
    country: "Greece",
    packSize: "500g Container",
    image: "https://images.unsplash.com/photo-1571212515416-8b71b4752fdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Organic", "Greek", "Healthy"],
    featured: false
  }
];

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addItem, openCart } = useCart();

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

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-lightGrey flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primaryBlue mx-auto mb-4"></div>
          <p>Loading...</p>
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

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory;
    const matchesCountry = selectedCountry === "All Countries" || product.country === selectedCountry;
    
    return matchesSearch && matchesCategory && matchesCountry;
  });

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      description: product.description,
      category: product.category,
      country: product.country,
      packSize: product.packSize,
      image: product.image,
      tags: product.tags,
      quickbooks_id: product.quickbooks_id
    });
    openCart();
  };

  return (
    <div className="min-h-screen bg-lightGrey">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container-custom py-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutralBlack mb-4">
            Our Product Catalog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Choice Foods supplies our clients with the best and freshest products in the market. 
            Discover our wide variety of premium Mediterranean & specialty products from trusted producers worldwide.
          </p>
        </div>
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

              {/* Country Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutralBlack mb-2">Country of Origin</label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryBlue focus:border-transparent"
                >
                  {countries.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All Categories");
                  setSelectedCountry("All Countries");
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

            {/* Products */}
            {viewMode === "grid" ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="card-elevation overflow-hidden">
                    <div className="aspect-square relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      {product.featured && (
                        <div className="absolute top-4 left-4 bg-accentRed text-white px-3 py-1 rounded-full text-sm font-medium">
                          Featured
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded text-xs font-medium text-neutralBlack">
                        {product.country}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif font-bold text-lg text-neutralBlack mb-2">{product.name}</h3>
                      <p className="text-gray-600 mb-3 text-sm">{product.description}</p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {product.tags.map((tag) => (
                          <span key={tag} className="bg-lightGrey text-primaryBlue px-2 py-1 rounded-full text-xs font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">{product.packSize}</span>
                        <button 
                          onClick={() => handleAddToCart(product)}
                          className="btn-primary text-sm px-4 py-2 flex items-center space-x-2"
                        >
                          <Plus className="h-4 w-4" />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="card-elevation p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-48 aspect-square md:aspect-auto">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <h3 className="font-serif font-bold text-xl text-neutralBlack">{product.name}</h3>
                          {product.featured && (
                            <span className="bg-accentRed text-white px-3 py-1 rounded-full text-sm font-medium">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600">{product.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {product.tags.map((tag) => (
                            <span key={tag} className="bg-lightGrey text-primaryBlue px-3 py-1 rounded-full text-sm font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <div className="text-sm text-gray-500">
                            <span className="font-medium">{product.packSize}</span> • {product.country}
                          </div>
                          <button 
                            onClick={() => handleAddToCart(product)}
                            className="btn-primary flex items-center space-x-2"
                          >
                            <Plus className="h-4 w-4" />
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredProducts.length === 0 && (
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
                    setSelectedCountry("All Countries");
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
    </div>
  );
}
