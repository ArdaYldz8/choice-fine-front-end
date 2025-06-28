import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Package, Users, Globe, Award } from "lucide-react";

export default function Index() {
  const [counters, setCounters] = useState({ products: 0, clients: 0, years: 0 });

  useEffect(() => {
    const animateCounters = () => {
      const targets = { products: 1000, clients: 500, years: 14 };
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
      <section className="relative h-[75vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-gradient-to-r from-primaryBlue/70 to-neutralBlack/50"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')"
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 text-center text-white space-y-8 container-custom">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight animate-fade-in">
            Choice Foods
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed opacity-90">
            <strong>Your Source for Fine Mediterranean Products</strong><br />
            As a proud member of the North Carolina community since 2010, we supply our clients with the very best in the Grocery Wholesaler industry.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
            <Link to="/products" className="btn-primary text-xl px-10 py-5">
              View Catalog
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/contact" className="btn-secondary text-xl px-10 py-5">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section id="stats-section" className="bg-lightGrey section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-5xl md:text-6xl font-serif font-bold text-neutralBlack">
                {counters.products.toLocaleString()}+
              </div>
              <div className="text-xl font-medium text-primaryBlue">Quality Products</div>
              <p className="text-gray-600">Premium Mediterranean products from trusted suppliers worldwide</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl md:text-6xl font-serif font-bold text-neutralBlack">
                {counters.clients.toLocaleString()}+
              </div>
              <div className="text-xl font-medium text-primaryBlue">Satisfied Clients</div>
              <p className="text-gray-600">Restaurants, grocery stores, and food service providers across North Carolina</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl md:text-6xl font-serif font-bold text-neutralBlack">
                {counters.years}
              </div>
              <div className="text-xl font-medium text-primaryBlue">Years of Excellence</div>
              <p className="text-gray-600">Serving North Carolina with dedication since 2010</p>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primaryBlue to-accentRed rounded-xl flex items-center justify-center mx-auto">
                <Package className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold text-neutralBlack">Premium Grains</h3>
              <p className="text-gray-600">
                We carry a wide variety of grains from around the world, ensuring the freshest quality for our clients.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-accentRed to-primaryBlue rounded-xl flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold text-neutralBlack">Frozen Vegetables</h3>
              <p className="text-gray-600">
                The most popular brands in frozen vegetables, including exotic varieties and common favorites.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-neutralBlack to-primaryBlue rounded-xl flex items-center justify-center mx-auto">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold text-neutralBlack">Imported Beverages</h3>
              <p className="text-gray-600">
                The very best imported beverages to support a healthy and balanced lifestyle.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primaryBlue to-neutralBlack rounded-xl flex items-center justify-center mx-auto">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold text-neutralBlack">European Wafers & Cakes</h3>
              <p className="text-gray-600">
                The best Italian wafers and a wide variety of European cakes and cookies available in the US.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-accentRed to-primaryBlue rounded-xl flex items-center justify-center mx-auto">
                <Package className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold text-neutralBlack">Dairy Products</h3>
              <p className="text-gray-600">
                Extensive selection of cheeses, yogurts and other dairy products of the highest quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-lightGrey section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutralBlack mb-6">
                About Us
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Ever since 2010, the dedicated team of professionals at Choice Foods have been working to supply our customers with the very best quality food products and services.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                You can count on us to deliver your order promptly with no hassles and at a fair and competitive price. We believe that the key to a healthy and balanced lifestyle starts with a person's diet, which is why we only supply our clients with the very best products available in the market.
              </p>
              <Link to="/contact" className="btn-primary">
                Get In Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Choice Foods Warehouse"
                className="w-full h-96 object-cover rounded-xl shadow-elevation"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primaryBlue to-neutralBlack text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Ready to Partner with Choice Foods?
          </h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
            Interested in doing business with Choice Foods? Contact us to see what we can do for you and discover how we can help supply your business with premium Mediterranean products.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/products" className="btn-primary bg-white text-neutralBlack hover:bg-gray-100 text-lg px-8 py-4">
              View Our Catalog
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/contact" className="btn-secondary border-white text-white hover:bg-white hover:text-neutralBlack text-lg px-8 py-4">
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
