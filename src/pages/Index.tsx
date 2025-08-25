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
      <section className="relative min-h-[55vh] sm:min-h-[60vh] md:min-h-[65vh] lg:min-h-[70vh] w-full flex items-center justify-center -mt-24 pt-24">
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
        
        {/* Content - Clean and Elegant - Mobile Optimized with Minimum Spacing */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center text-center text-white px-4 py-4 sm:py-12 md:py-16">
          {/* Hero Logo - Responsive sizing */}
          <div className="flex items-center justify-center animate-fade-in mb-2 sm:mb-4 md:mb-6 -mt-4 sm:mt-0">
            <img 
              src="/logo.png" 
              alt="Choice Foods Logo" 
              className="h-44 sm:h-40 md:h-48 lg:h-56 xl:h-64 w-auto object-contain filter brightness-110 drop-shadow-2xl"
            />
          </div>

          {/* Simple Elegant Slogan - Mobile responsive */}
          <div className="animate-fade-in mb-3 sm:mb-4 md:mb-6 -mt-6 sm:-mt-8 md:-mt-10" style={{ animationDelay: '0.3s' }}>
            <p className="text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-white max-w-4xl mx-auto leading-relaxed px-4 mb-1 sm:mb-2">
              Middle Eastern & Mediterranean Flavors, Delivered Your Way.
            </p>
            <p className="text-[10px] sm:text-sm md:text-base lg:text-lg xl:text-xl font-light text-white/90 max-w-3xl mx-auto leading-relaxed px-4">
              Your trusted NC partner since 2010 - flexible weekly deliveries tailored to your business needs.
            </p>
          </div>

          {/* Single CTA - Mobile optimized with better spacing */}
          <div className="animate-fade-in mt-4 sm:mt-6 md:mt-8" style={{ animationDelay: '0.6s' }}>
            <Link 
              to="/catalog" 
              className="group inline-flex items-center justify-center bg-white text-neutralBlack px-4 sm:px-8 md:px-10 lg:px-12 py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-base md:text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/50"
            >
              Explore Our Products
              <ArrowRight className="ml-1.5 sm:ml-2 md:ml-3 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Counter Section - Mobile optimized */}
      <section id="stats-section" className="bg-gradient-to-br from-white via-lightGrey to-white py-4 sm:py-12 md:py-16 lg:py-20">
        <div className="container-custom px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
            <div className="bg-white rounded-2xl p-4 sm:p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold bg-gradient-to-r from-primaryBlue to-accentRed bg-clip-text text-transparent mb-1 sm:mb-4">
                {counters.products.toLocaleString()}+
              </div>
              <div className="text-base sm:text-xl md:text-2xl font-semibold text-neutralBlack mb-1 sm:mb-3">Quality Products</div>
              <p className="text-gray-600 leading-tight sm:leading-relaxed text-xs sm:text-base">Middle Eastern & Mediterranean Flavors from trusted suppliers worldwide</p>
            </div>
            <div className="bg-white rounded-2xl p-4 sm:p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold bg-gradient-to-r from-accentRed to-primaryBlue bg-clip-text text-transparent mb-1 sm:mb-4">
                {counters.clients.toLocaleString()}+
              </div>
              <div className="text-base sm:text-xl md:text-2xl font-semibold text-neutralBlack mb-1 sm:mb-3">Satisfied Clients</div>
              <p className="text-gray-600 leading-tight sm:leading-relaxed text-xs sm:text-base">Restaurants, grocery stores, and food service providers across North Carolina</p>
            </div>
            <div className="bg-white rounded-2xl p-4 sm:p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold bg-gradient-to-r from-primaryBlue to-neutralBlack bg-clip-text text-transparent mb-1 sm:mb-4">
                {counters.years}
              </div>
              <div className="text-base sm:text-xl md:text-2xl font-semibold text-neutralBlack mb-1 sm:mb-3">Years of Excellence</div>
              <p className="text-gray-600 leading-tight sm:leading-relaxed text-xs sm:text-base">Your trusted NC partner since 2010</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Partners Section */}
      <CompactBrandsSection />


      {/* Catalog Download Section */}
      <section className="bg-gradient-to-br from-lightGrey via-white to-lightGrey py-4 sm:py-12 md:py-16 lg:py-20">
        <div className="container-custom">
          {/* Mobile-first layout: Simple catalog image and download button */}
          <div className="lg:hidden">
            <div className="text-center space-y-6">
              {/* Catalog Image */}
              <div className="flex justify-center">
                <Link to="/catalog" className="group">
                  <div className="bg-white rounded-2xl p-3 shadow-lg border border-gray-100 transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
                    <img 
                      src="/catalog-card.png" 
                      alt="Choice Foods Catalog"
                      className="w-64 h-80 object-cover rounded-xl"
                    />
                  </div>
                </Link>
              </div>
              
              {/* Catalog Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link 
                  to="/catalog"
                  className="group inline-flex items-center justify-center bg-white border-2 border-primaryBlue text-primaryBlue px-4 py-2 rounded-lg font-semibold text-xs sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primaryBlue/50"
                >
                  Browse Catalog
                  <ArrowRight className="ml-1.5 h-3 w-3 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <a 
                  href="/Choice Foods Catalog.pdf"
                  download="Choice Foods Catalog.pdf"
                  className="group inline-flex items-center justify-center bg-gradient-to-r from-primaryBlue to-accentRed text-white px-4 py-2 rounded-lg font-semibold text-xs sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primaryBlue/50"
                >
                  Download Catalog
                  <ArrowRight className="ml-1.5 h-3 w-3 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </div>
            </div>
          </div>

          {/* Desktop layout: Original two-column design */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
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
              
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/catalog"
                  className="group inline-flex items-center justify-center bg-white border-2 border-primaryBlue text-primaryBlue px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primaryBlue/50"
                >
                  Browse Catalog
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
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
              <Link to="/catalog" className="relative group cursor-pointer">
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
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-gradient-to-br from-lightGrey via-white to-lightGrey py-3 sm:py-12 md:py-16 lg:py-20">
        <div className="container-custom px-4">
          <div className="flex justify-center">
            <div className="bg-white rounded-xl sm:rounded-3xl p-3 sm:p-6 lg:p-8 xl:p-10 shadow-lg border border-gray-100 max-w-4xl w-full text-center">
              <h2 className="text-base sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-neutralBlack mb-2 sm:mb-6 md:mb-8">
                About Us
              </h2>
              <div className="space-y-2 sm:space-y-6">
                <p className="text-[11px] sm:text-lg text-gray-600 leading-snug sm:leading-relaxed px-2">
                  Choice Foods is a NC-based specialty food distributor serving retailers, restaurants, and markets since 2010. We specialize in Middle Eastern, Turkish, and international products from trusted brands.
                </p>
                <p className="text-[11px] sm:text-lg text-gray-600 leading-snug sm:leading-relaxed px-2">
                  As your local partner, we offer flexible delivery, fast service, and no large volume requirements. Proud exclusive NC distributor for Marmia Foods & Moda.
                </p>
                <div className="pt-2 sm:pt-4">
                  <Link to="/contact" className="group inline-flex items-center justify-center bg-gradient-to-r from-primaryBlue to-accentRed text-white px-4 sm:px-8 py-2 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primaryBlue/50">
                    Get In Touch
                    <ArrowRight className="ml-1.5 sm:ml-3 h-3 w-3 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
