import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Package, Users, Globe, Award } from "lucide-react";
import CompactBrandsSection from "../components/CompactBrandsSection";

export default function Index() {
  const [counters, setCounters] = useState({ products: 0, clients: 0, years: 0 });

  useEffect(() => {
    const animateCounters = () => {
      const targets = { products: 1000, clients: 150, years: 15 };
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setCounters({
          products: Math.floor(targets.products * progress),
          clients: Math.floor(targets.clients * progress),
          years: Math.floor(targets.years * progress)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setCounters(targets);
        }
      }, stepTime);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      });
    });

    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[70vh] sm:h-[80vh] md:h-[90vh] lg:h-[100vh] w-full flex items-center justify-center overflow-hidden -mt-24 pt-24">
        {/* Background Image with enhanced overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80')"
          }}
        />
        
        {/* Modern gradient overlay with better contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-primaryBlue/90 via-neutralBlack/85 to-primaryBlue/95" />
        
        {/* Additional texture overlay for depth */}
        <div className="absolute inset-0 opacity-20 bg-gradient-to-t from-neutralBlack/50 to-transparent" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accentRed/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primaryBlue/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        {/* Content - Clean and Elegant - Mobile Optimized */}
        <div className="relative z-10 text-center text-white space-y-6 sm:space-y-8 container-custom px-4">
          {/* Hero Logo - Responsive sizing */}
          <div className="flex justify-center animate-fade-in">
            <img 
              src="/logo.png" 
              alt="Choice Foods Logo" 
              className="h-32 sm:h-40 md:h-48 lg:h-64 xl:h-80 w-auto object-contain filter brightness-110 drop-shadow-2xl"
            />
          </div>

          {/* Simple Elegant Slogan - Mobile responsive */}
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light text-white/95 max-w-4xl mx-auto leading-relaxed px-4">
              North Carolina's Premier Mediterranean Grocery Wholesaler
            </p>
          </div>

          {/* Single CTA - Mobile optimized */}
          <div className="pt-4 sm:pt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Link 
              to="/catalog" 
              className="group inline-flex items-center justify-center bg-white text-neutralBlack px-8 sm:px-12 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/50 touch-target"
            >
              Explore Our Products
              <ArrowRight className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Counter Section - Mobile optimized */}
      <section id="stats-section" className="bg-gradient-to-br from-white via-lightGrey to-white py-6 sm:py-12 md:py-16 lg:py-20">
        <div className="container-custom px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold bg-gradient-to-r from-primaryBlue to-accentRed bg-clip-text text-transparent mb-3 sm:mb-4">
                {counters.products.toLocaleString()}+
              </div>
              <div className="text-lg sm:text-xl md:text-2xl font-semibold text-neutralBlack mb-2 sm:mb-3">Quality Products</div>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">Premium Mediterranean products from trusted suppliers worldwide</p>
            </div>
            <div className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold bg-gradient-to-r from-accentRed to-primaryBlue bg-clip-text text-transparent mb-3 sm:mb-4">
                {counters.clients.toLocaleString()}+
              </div>
              <div className="text-lg sm:text-xl md:text-2xl font-semibold text-neutralBlack mb-2 sm:mb-3">Satisfied Clients</div>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">Restaurants, grocery stores, and food service providers across North Carolina</p>
            </div>
            <div className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold bg-gradient-to-r from-primaryBlue to-neutralBlack bg-clip-text text-transparent mb-3 sm:mb-4">
                {counters.years}
              </div>
              <div className="text-lg sm:text-xl md:text-2xl font-semibold text-neutralBlack mb-2 sm:mb-3">Years of Excellence</div>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">Serving North Carolina with dedication since 2009</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Premium Products Section - Mobile optimized */}
      <section className="py-6 sm:py-12 md:py-16 lg:py-20">
        <div className="container-custom px-4">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-neutralBlack mb-4 sm:mb-6">
              Our Premium Products
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Choice Foods supplies our clients with the best and freshest products in the market to ensure their health and satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="h-40 sm:h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}>
                <div className="h-full bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4">
                    <Package className="h-6 w-6 sm:h-8 sm:w-8 text-white mb-2" />
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-6 text-center">
                <h3 className="text-lg sm:text-xl font-serif font-bold text-neutralBlack mb-2 sm:mb-3">Premium Grains</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  We carry a wide variety of grains from around the world, ensuring the freshest quality for our clients.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="h-40 sm:h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1590779033100-9f60a05a013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}>
                <div className="h-full bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4">
                    <Users className="h-6 w-6 sm:h-8 sm:w-8 text-white mb-2" />
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-6 text-center">
                <h3 className="text-lg sm:text-xl font-serif font-bold text-neutralBlack mb-2 sm:mb-3">Frozen Vegetables</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  The most popular brands in frozen vegetables, including exotic varieties and common favorites.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="h-40 sm:h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}>
                <div className="h-full bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4">
                    <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-white mb-2" />
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-6 text-center">
                <h3 className="text-lg sm:text-xl font-serif font-bold text-neutralBlack mb-2 sm:mb-3">Imported Beverages</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  The very best imported beverages to support a healthy and balanced lifestyle.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="h-40 sm:h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486427944299-d1955d23e34d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}>
                <div className="h-full bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4">
                    <Award className="h-6 w-6 sm:h-8 sm:w-8 text-white mb-2" />
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-6 text-center">
                <h3 className="text-lg sm:text-xl font-serif font-bold text-neutralBlack mb-2 sm:mb-3">European Wafers & Cakes</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  The best Italian wafers and a wide variety of European cakes and cookies available in the US.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="h-40 sm:h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}>
                <div className="h-full bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4">
                    <Package className="h-6 w-6 sm:h-8 sm:w-8 text-white mb-2" />
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-6 text-center">
                <h3 className="text-lg sm:text-xl font-serif font-bold text-neutralBlack mb-2 sm:mb-3">Dairy Products</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  Extensive selection of cheeses, yogurts and other dairy products of the highest quality.
                </p>
              </div>
            </div>
          </div>
                </div>
      </section>

      {/* Compact Brands Section */}
      <CompactBrandsSection />

      {/* Catalog Download Section */}
      <section className="bg-gradient-to-br from-lightGrey via-white to-lightGrey py-6 sm:py-12 md:py-16 lg:py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
            {/* Content */}
            <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-8 xl:p-10 shadow-lg border border-gray-100 space-y-4 sm:space-y-6 md:space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-neutralBlack mb-3 sm:mb-4 md:mb-6">
                  Product-Based Catalogs
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Exploring our product-based catalogs provides detailed information about our offerings. From olives to baklava, our catalog showcases a diverse range of products, offering detailed information on each.
                </p>
              </div>
              
              <div className="pt-4">
                <a 
                  href="/Choice Foods Catalog.pdf"
                  download="Choice Foods Catalog.pdf"
                  className="group inline-flex items-center justify-center bg-gradient-to-r from-primaryBlue to-accentRed text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primaryBlue/50"
                >
                  Download Catalog
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </div>
            </div>

            {/* Catalog Visual */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative group">
                {/* Main Catalog Image */}
                <div className="bg-white rounded-3xl p-4 shadow-lg border border-gray-100 transform rotate-3 group-hover:rotate-6 transition-transform duration-300">
                  <img 
                    src="/catalog-card.png" 
                    alt="Choice Foods Catalog"
                    className="w-80 h-96 object-cover rounded-2xl"
                  />
                </div>

                {/* Background Catalogs */}
                <div className="absolute -top-4 -left-4 w-80 h-96 bg-gray-100/60 rounded-3xl transform -rotate-6 -z-10 border border-gray-200" />
                <div className="absolute -top-8 -left-8 w-80 h-96 bg-gray-50/40 rounded-3xl transform -rotate-12 -z-20 border border-gray-100" />
                
                {/* Decorative element */}
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-primaryBlue to-accentRed text-white p-6 rounded-2xl shadow-xl">
                  <div className="text-2xl font-bold">1000+</div>
                  <div className="text-sm">Products</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-gradient-to-br from-lightGrey via-white to-lightGrey py-6 sm:py-12 md:py-16 lg:py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
            <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-8 xl:p-10 shadow-lg border border-gray-100">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-neutralBlack mb-4 sm:mb-6 md:mb-8">
                About Us
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed">
                  Ever since 2009, the dedicated team of professionals at Choice Foods have been working to supply our customers with the very best quality food products and services.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  You can count on us to deliver your order promptly with no hassles and at a fair and competitive price. We believe that the key to a healthy and balanced lifestyle starts with a person's diet, which is why we only supply our clients with the very best products available in the market.
                </p>
                <div className="pt-4">
                  <Link to="/contact" className="group inline-flex items-center justify-center bg-gradient-to-r from-primaryBlue to-accentRed text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primaryBlue/50">
                    Get In Touch
                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-3xl p-4 shadow-lg border border-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1494412651409-8963ce7935a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Food Wholesale Warehouse"
                  className="w-full h-96 object-cover rounded-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-primaryBlue to-accentRed text-white p-6 rounded-2xl shadow-xl">
                  <div className="text-2xl font-bold">15+</div>
                  <div className="text-sm">Years Serving NC</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
