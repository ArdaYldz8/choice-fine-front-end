
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Package, Users, Globe, Award } from "lucide-react";

export default function Index() {
  const [counters, setCounters] = useState({ products: 0, retailers: 0, years: 0 });

  useEffect(() => {
    const animateCounters = () => {
      const targets = { products: 3000, retailers: 1400, years: 45 };
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setCounters({
          products: Math.floor(targets.products * progress),
          retailers: Math.floor(targets.retailers * progress),
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
        {/* Background Image (placeholder for video) */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-gradient-to-r from-midnight/70 to-teal/50"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')"
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 text-center text-white space-y-8 container-custom">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight animate-fade-in">
            Fine Mediterranean Foods,<br />
            <span className="text-saffron">Delivered Fast</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed opacity-90">
            Importer & wholesale partner to <strong>1,400+ retailers</strong> across the Southeast. 
            Discover premium Mediterranean & specialty groceries sourced from trusted producers worldwide.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
            <Link to="/products" className="btn-primary text-xl px-10 py-5">
              Browse Catalog
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/supplier" className="btn-secondary text-xl px-10 py-5">
              Become a Supplier
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section id="stats-section" className="bg-soft-bg section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-5xl md:text-6xl font-serif font-bold text-midnight">
                {counters.products.toLocaleString()}+
              </div>
              <div className="text-xl font-medium text-teal">SKUs Available</div>
              <p className="text-gray-600">Premium Mediterranean & specialty products from trusted suppliers worldwide</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl md:text-6xl font-serif font-bold text-midnight">
                {counters.retailers.toLocaleString()}+
              </div>
              <div className="text-xl font-medium text-teal">Retail Partners</div>
              <p className="text-gray-600">Independent grocers, restaurants, and specialty markets across the Southeast</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl md:text-6xl font-serif font-bold text-midnight">
                {counters.years}
              </div>
              <div className="text-xl font-medium text-teal">Years of Excellence</div>
              <p className="text-gray-600">Trusted wholesale partner since 1979, serving North Carolina and beyond</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-midnight mb-6">
              Why Retailers Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're more than a supplier—we're your partner in bringing authentic Mediterranean flavors to your customers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-teal to-olive rounded-xl flex items-center justify-center mx-auto">
                <Package className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold text-midnight">Vast Selection</h3>
              <p className="text-gray-600">
                Over 3,000 SKUs including rare and specialty items you won't find anywhere else.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-olive to-saffron rounded-xl flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold text-midnight">Expert Support</h3>
              <p className="text-gray-600">
                Dedicated account managers who understand your business and provide personalized service.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-saffron to-teal rounded-xl flex items-center justify-center mx-auto">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold text-midnight">Global Sourcing</h3>
              <p className="text-gray-600">
                Direct relationships with producers in Italy, Spain, Greece, and throughout the Mediterranean.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-teal to-midnight rounded-xl flex items-center justify-center mx-auto">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold text-midnight">Quality Assured</h3>
              <p className="text-gray-600">
                FDA, Kosher, and Halal certified. Every product meets our rigorous quality standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="bg-soft-bg section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-midnight mb-6">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover some of our most popular Mediterranean specialties, sourced directly from artisanal producers.
            </p>
            <Link to="/products" className="btn-outline">
              View Full Catalog
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-elevation overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-olive/10 to-teal/10 relative">
                <img 
                  src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Premium Extra Virgin Olive Oil"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-olive text-white px-3 py-1 rounded-full text-sm font-medium">
                  Bestseller
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif font-bold text-lg text-midnight mb-2">Premium Extra Virgin Olive Oil</h3>
                <p className="text-gray-600 mb-4">Cold-pressed from Kalamata olives. Rich, peppery finish perfect for finishing dishes.</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-teal font-medium">500ml Glass Bottle</span>
                  <button className="btn-outline text-sm px-4 py-2">Request Price</button>
                </div>
              </div>
            </div>

            <div className="card-elevation overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-saffron/10 to-olive/10 relative">
                <img 
                  src="https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Aged Balsamic Vinegar"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-saffron text-midnight px-3 py-1 rounded-full text-sm font-medium">
                  Premium
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif font-bold text-lg text-midnight mb-2">18-Year Aged Balsamic Vinegar</h3>
                <p className="text-gray-600 mb-4">Traditional Modena DOP. Complex, sweet-tart profile with notes of fig and cherry.</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-teal font-medium">250ml Glass Bottle</span>
                  <button className="btn-outline text-sm px-4 py-2">Request Price</button>
                </div>
              </div>
            </div>

            <div className="card-elevation overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-teal/10 to-midnight/10 relative">
                <img 
                  src="https://images.unsplash.com/photo-1588013273468-315900bafd4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Artisanal Pasta Collection"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-teal text-white px-3 py-1 rounded-full text-sm font-medium">
                  Artisanal
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif font-bold text-lg text-midnight mb-2">Bronze-Die Pasta Collection</h3>
                <p className="text-gray-600 mb-4">Hand-crafted using traditional bronze dies. Perfect texture for holding sauces.</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-teal font-medium">500g Package</span>
                  <button className="btn-outline text-sm px-4 py-2">Request Price</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-midnight to-teal text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Ready to Elevate Your Inventory?
          </h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
            Join over 1,400 retailers who trust Choice Fine Foods for premium Mediterranean & specialty groceries. 
            Our team is ready to help you find the perfect products for your customers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/products" className="btn-primary bg-white text-midnight hover:bg-gray-100 text-lg px-8 py-4">
              Browse Our Catalog
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/contact" className="btn-secondary border-white text-white hover:bg-white hover:text-midnight text-lg px-8 py-4">
              Contact Sales Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
