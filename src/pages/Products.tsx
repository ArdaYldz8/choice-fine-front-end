
import { useState } from "react";
import { Search, Filter, Grid, List } from "lucide-react";

const categories = [
  "All Categories",
  "Olive Oils",
  "Vinegars", 
  "Pasta & Grains",
  "Sauces & Condiments",
  "Spices & Seasonings",
  "Preserved Foods",
  "Dairy & Cheese",
  "Seafood",
  "Confections"
];

const countries = [
  "All Countries",
  "Italy", 
  "Spain",
  "Greece", 
  "France",
  "Turkey",
  "Morocco",
  "Lebanon"
];

const products = [
  {
    id: 1,
    name: "Premium Extra Virgin Olive Oil",
    description: "Cold-pressed from Kalamata olives. Rich, peppery finish.",
    category: "Olive Oils",
    country: "Greece",
    packSize: "500ml Glass Bottle",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Organic", "DOP", "Cold Pressed"],
    featured: true
  },
  {
    id: 2,
    name: "18-Year Aged Balsamic Vinegar",
    description: "Traditional Modena DOP. Complex, sweet-tart profile.",
    category: "Vinegars",
    country: "Italy", 
    packSize: "250ml Glass Bottle",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["DOP", "Aged", "Premium"],
    featured: true
  },
  {
    id: 3,
    name: "Bronze-Die Spaghetti",
    description: "Hand-crafted using traditional bronze dies.",
    category: "Pasta & Grains",
    country: "Italy",
    packSize: "500g Package", 
    image: "https://images.unsplash.com/photo-1588013273468-315900bafd4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Artisanal", "Bronze Die", "Traditional"],
    featured: false
  },
  {
    id: 4,
    name: "Sicilian Sea Salt",
    description: "Hand-harvested from the Mediterranean. Pure mineral taste.",
    category: "Spices & Seasonings",
    country: "Italy",
    packSize: "1kg Bag",
    image: "https://images.unsplash.com/photo-1516684669134-de6f26736c5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Hand Harvested", "Natural", "Mineral"],
    featured: false
  },
  {
    id: 5,
    name: "Harissa Paste",
    description: "Spicy North African chili paste. Complex heat and flavor.",
    category: "Sauces & Condiments", 
    country: "Morocco",
    packSize: "180g Jar",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Spicy", "Traditional", "Authentic"],
    featured: false
  },
  {
    id: 6,
    name: "Manchego Cheese DOP",
    description: "Aged sheep's milk cheese from La Mancha. Nutty and firm.",
    category: "Dairy & Cheese",
    country: "Spain",
    packSize: "200g Wedge",
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["DOP", "Aged", "Sheep Milk"],
    featured: false
  }
];

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory;
    const matchesCountry = selectedCountry === "All Countries" || product.country === selectedCountry;
    
    return matchesSearch && matchesCategory && matchesCountry;
  });

  return (
    <div className="min-h-screen bg-soft-bg">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container-custom py-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-midnight mb-4">
            Product Catalog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Discover our extensive selection of premium Mediterranean & specialty groceries. 
            Over 3,000 SKUs sourced directly from trusted producers worldwide.
          </p>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl p-6 shadow-elevation">
              <h3 className="font-serif font-bold text-lg text-midnight mb-4">Filters</h3>
              
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-midnight mb-2">Search Products</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-midnight mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Country Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-midnight mb-2">Country of Origin</label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
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
                    viewMode === "grid" ? "bg-teal text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list" ? "bg-teal text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
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
                        <div className="absolute top-4 left-4 bg-olive text-white px-3 py-1 rounded-full text-sm font-medium">
                          Featured
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded text-xs font-medium text-midnight">
                        {product.country}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif font-bold text-lg text-midnight mb-2">{product.name}</h3>
                      <p className="text-gray-600 mb-3 text-sm">{product.description}</p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {product.tags.map((tag) => (
                          <span key={tag} className="bg-soft-bg text-teal px-2 py-1 rounded-full text-xs font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">{product.packSize}</span>
                        <button className="btn-outline text-sm px-4 py-2">
                          Request Price
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
                          <h3 className="font-serif font-bold text-xl text-midnight">{product.name}</h3>
                          {product.featured && (
                            <span className="bg-olive text-white px-3 py-1 rounded-full text-sm font-medium">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600">{product.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {product.tags.map((tag) => (
                            <span key={tag} className="bg-soft-bg text-teal px-3 py-1 rounded-full text-sm font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <div className="text-sm text-gray-500">
                            <span className="font-medium">{product.packSize}</span> • {product.country}
                          </div>
                          <button className="btn-outline">
                            Request Price
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
                <h3 className="text-xl font-serif font-bold text-midnight mb-2">No products found</h3>
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
