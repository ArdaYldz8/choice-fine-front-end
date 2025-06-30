import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Package, Users, Globe, Award } from "lucide-react";

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
      <section className="relative h-[110vh] w-full flex items-center justify-center overflow-hidden -mt-24 pt-24">
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
        
        {/* Content - Clean and Elegant */}
        <div className="relative z-10 text-center text-white space-y-8 container-custom">
          {/* Hero Logo */}
          <div className="flex justify-center animate-fade-in">
            <img 
              src="/logo.png" 
              alt="Choice Foods Logo" 
              className="h-96 w-auto object-contain filter brightness-110 drop-shadow-2xl"
            />
          </div>

          {/* Simple Elegant Slogan */}
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <p className="text-2xl md:text-3xl lg:text-4xl font-light text-white/95 max-w-4xl mx-auto leading-relaxed">
              North Carolina's premier Mediterranean wholesaler
            </p>
          </div>

          {/* Single CTA */}
          <div className="pt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Link 
              to="/catalog" 
              className="group inline-flex items-center justify-center bg-white text-neutralBlack px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/50"
            >
              Explore Our Products
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section id="stats-section" className="bg-gradient-to-br from-white via-lightGrey to-white section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="text-6xl md:text-7xl font-serif font-bold bg-gradient-to-r from-primaryBlue to-accentRed bg-clip-text text-transparent mb-4">
                {counters.products.toLocaleString()}+
              </div>
              <div className="text-2xl font-semibold text-neutralBlack mb-3">Quality Products</div>
              <p className="text-gray-600 leading-relaxed">Premium Mediterranean products from trusted suppliers worldwide</p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="text-6xl md:text-7xl font-serif font-bold bg-gradient-to-r from-accentRed to-primaryBlue bg-clip-text text-transparent mb-4">
                {counters.clients.toLocaleString()}+
              </div>
              <div className="text-2xl font-semibold text-neutralBlack mb-3">Satisfied Clients</div>
              <p className="text-gray-600 leading-relaxed">Restaurants, grocery stores, and food service providers across North Carolina</p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="text-6xl md:text-7xl font-serif font-bold bg-gradient-to-r from-primaryBlue to-neutralBlack bg-clip-text text-transparent mb-4">
                {counters.years}
              </div>
              <div className="text-2xl font-semibold text-neutralBlack mb-3">Years of Excellence</div>
              <p className="text-gray-600 leading-relaxed">Serving North Carolina with dedication since 2009</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Premium Products Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutralBlack mb-6">
              Our Premium Products
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choice Foods supplies our clients with the best and freshest products in the market to ensure their health and satisfaction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}>
                <div className="h-full bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4">
                    <Package className="h-8 w-8 text-white mb-2" />
                  </div>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-serif font-bold text-neutralBlack mb-3">Premium Grains</h3>
                <p className="text-gray-600 leading-relaxed">
                  We carry a wide variety of grains from around the world, ensuring the freshest quality for our clients.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1590779033100-9f60a05a013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}>
                <div className="h-full bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4">
                    <Users className="h-8 w-8 text-white mb-2" />
                  </div>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-serif font-bold text-neutralBlack mb-3">Frozen Vegetables</h3>
                <p className="text-gray-600 leading-relaxed">
                  The most popular brands in frozen vegetables, including exotic varieties and common favorites.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}>
                <div className="h-full bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4">
                    <Globe className="h-8 w-8 text-white mb-2" />
                  </div>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-serif font-bold text-neutralBlack mb-3">Imported Beverages</h3>
                <p className="text-gray-600 leading-relaxed">
                  The very best imported beverages to support a healthy and balanced lifestyle.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486427944299-d1955d23e34d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}>
                <div className="h-full bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4">
                    <Award className="h-8 w-8 text-white mb-2" />
                  </div>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-serif font-bold text-neutralBlack mb-3">European Wafers & Cakes</h3>
                <p className="text-gray-600 leading-relaxed">
                  The best Italian wafers and a wide variety of European cakes and cookies available in the US.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}>
                <div className="h-full bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4">
                    <Package className="h-8 w-8 text-white mb-2" />
                  </div>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-serif font-bold text-neutralBlack mb-3">Dairy Products</h3>
                <p className="text-gray-600 leading-relaxed">
                  Extensive selection of cheeses, yogurts and other dairy products of the highest quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-gradient-to-br from-lightGrey via-white to-lightGrey section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-lg border border-gray-100">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutralBlack mb-8">
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
