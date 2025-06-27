
import { useState } from "react";
import { Search, Clock, ArrowRight, BookOpen, ChefHat } from "lucide-react";

const categories = ["All", "Recipes", "Articles", "Guides", "Industry News"];

const resources = [
  {
    id: 1,
    title: "Mediterranean Mezze Platter Guide",
    type: "Recipe",
    category: "Recipes",
    excerpt: "Create the perfect mezze spread with our curated selection of olives, cheeses, and accompaniments.",
    image: "https://images.unsplash.com/photo-1544124499-58912cbddaad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    readTime: "8 min read",
    date: "2025-01-15",
    featured: true
  },
  {
    id: 2,
    title: "Understanding Olive Oil Grades",
    type: "Guide",
    category: "Guides", 
    excerpt: "Learn the differences between extra virgin, virgin, and refined olive oils to better serve your customers.",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    readTime: "12 min read",
    date: "2025-01-10",
    featured: true
  },
  {
    id: 3,
    title: "2025 Specialty Food Trends",
    type: "Article",
    category: "Industry News",
    excerpt: "Discover the Mediterranean ingredients driving growth in the specialty food market this year.",
    image: "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    readTime: "6 min read",
    date: "2025-01-08",
    featured: false
  },
  {
    id: 4,
    title: "Classic Italian Pasta Puttanesca",
    type: "Recipe",
    category: "Recipes",
    excerpt: "A bold and flavorful pasta dish featuring our premium capers, anchovies, and San Marzano tomatoes.",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    readTime: "10 min read",
    date: "2025-01-05",
    featured: false
  },
  {
    id: 5,
    title: "Cheese Pairing Fundamentals", 
    type: "Guide",
    category: "Guides",
    excerpt: "Master the art of pairing Mediterranean cheeses with wines, fruits, and preserves.",
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    readTime: "15 min read",
    date: "2025-01-03",
    featured: false
  },
  {
    id: 6,
    title: "Spanish Tapas Selection Tips",
    type: "Article",
    category: "Articles",
    excerpt: "How to curate an authentic Spanish tapas selection that will impress your restaurant customers.",
    image: "https://images.unsplash.com/photo-1544124499-58912cbddaad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    readTime: "7 min read",
    date: "2024-12-28",
    featured: false
  }
];

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredResources = resources.filter(resource => resource.featured);

  return (
    <div className="min-h-screen bg-soft-bg">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-midnight to-teal text-white section-padding">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            Resources & Recipes
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed opacity-90">
            Discover culinary inspiration, industry insights, and expert guides to help you 
            make the most of Mediterranean & specialty foods.
          </p>
        </div>
      </section>

      {/* Featured Resources */}
      {featuredResources.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-midnight mb-12 text-center">
              Featured Content
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {featuredResources.map((resource) => (
                <div key={resource.id} className="card-elevation overflow-hidden">
                  <div className="aspect-video relative">
                    <img
                      src={resource.image}
                      alt={resource.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-olive text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-midnight flex items-center">
                      {resource.type === "Recipe" ? <ChefHat className="h-3 w-3 mr-1" /> : <BookOpen className="h-3 w-3 mr-1" />}
                      {resource.type}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif font-bold text-xl text-midnight mb-3">{resource.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{resource.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {resource.readTime}
                        </div>
                        <div>{new Date(resource.date).toLocaleDateString()}</div>
                      </div>
                      <button className="text-teal font-medium hover:text-midnight transition-colors">
                        Read More <ArrowRight className="inline h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Search and Filter */}
      <section className="py-12">
        <div className="container-custom">
          <div className="bg-white rounded-xl p-8 shadow-elevation">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent text-lg"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="md:w-64">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent text-lg"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="pb-24">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-serif font-bold text-midnight">
              {selectedCategory === "All" ? "All Resources" : selectedCategory}
            </h2>
            <div className="text-gray-600">
              {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'} found
            </div>
          </div>

          {filteredResources.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((resource) => (
                <div key={resource.id} className="card-elevation overflow-hidden">
                  <div className="aspect-video relative">
                    <img
                      src={resource.image}
                      alt={resource.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-midnight flex items-center">
                      {resource.type === "Recipe" ? <ChefHat className="h-3 w-3 mr-1" /> : <BookOpen className="h-3 w-3 mr-1" />}
                      {resource.type}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif font-bold text-lg text-midnight mb-3">{resource.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{resource.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {resource.readTime}
                        </div>
                        <div>{new Date(resource.date).toLocaleDateString()}</div>
                      </div>
                      <button className="text-teal font-medium hover:text-midnight transition-colors text-sm">
                        Read More <ArrowRight className="inline h-3 w-3 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-serif font-bold text-midnight mb-2">No resources found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search terms or category filter.</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-r from-olive to-teal text-white py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Stay Inspired
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Get the latest recipes, industry insights, and culinary tips delivered to your inbox monthly.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-lg text-midnight focus:outline-none focus:ring-2 focus:ring-saffron"
            />
            <button className="btn-primary bg-saffron text-midnight hover:bg-yellow-400">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
