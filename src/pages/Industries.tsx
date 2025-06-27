
import { ArrowRight, Store, ChefHat, ShoppingBag, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const industries = [
  {
    id: "grocers",
    title: "Independent Grocers",
    icon: Store,
    description: "Elevate your store's offering with premium Mediterranean & specialty products that set you apart from big-box competitors.",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    benefits: [
      "Exclusive products not available at chain stores",
      "Flexible ordering with no minimum requirements",
      "Marketing support and product education",
      "Competitive wholesale pricing"
    ],
    caseStudy: {
      title: "Mediterranean Market Success",
      description: "How one independent grocer increased specialty food sales by 45% in six months."
    }
  },
  {
    id: "restaurants",
    title: "Restaurants & Foodservice",
    icon: ChefHat,
    description: "Source authentic ingredients that help your culinary team create memorable Mediterranean dishes your customers will love.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    benefits: [
      "Restaurant-grade packaging and portions",
      "Direct relationships with Mediterranean producers",
      "Consistent quality and availability",
      "Chef-focused product selection"
    ],
    caseStudy: {
      title: "Farm-to-Table Partnership",
      description: "Regional restaurant chain transforms menu with authentic Mediterranean ingredients."
    }
  },
  {
    id: "specialty",
    title: "Specialty Markets",
    icon: ShoppingBag,
    description: "Curate an exceptional selection of hard-to-find Mediterranean products that keep customers coming back for more.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    benefits: [
      "Rare and artisanal products",
      "Small batch and limited editions",
      "Educational resources for staff",
      "Custom product sourcing"
    ],
    caseStudy: {
      title: "Gourmet Market Expansion",
      description: "Boutique market doubles Mediterranean section with our curated selection."
    }
  },
  {
    id: "distributors",
    title: "Regional Distributors",
    icon: Truck,
    description: "Expand your portfolio with our comprehensive Mediterranean line, backed by reliable supply chain and competitive terms.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    benefits: [
      "Volume pricing tiers",
      "Drop-shipping capabilities",
      "Marketing materials and support",
      "Dedicated distributor portal"
    ],
    caseStudy: {
      title: "Regional Expansion Success",
      description: "Southeast distributor grows Mediterranean category by 200% in 18 months."
    }
  }
];

export default function Industries() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-midnight to-teal text-white section-padding">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            Industries We Serve
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed opacity-90">
            From independent grocers to regional distributors, we provide tailored solutions 
            that help businesses thrive in the Mediterranean & specialty food market.
          </p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-16">
            {industries.map((industry, index) => (
              <div key={industry.id} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
                <div className="flex-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal to-olive rounded-xl flex items-center justify-center mb-6">
                    <industry.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-midnight mb-4">
                    {industry.title}
                  </h2>
                  
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {industry.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {industry.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-olive rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-soft-bg p-6 rounded-xl mb-6">
                    <h3 className="font-serif font-bold text-lg text-midnight mb-2">
                      {industry.caseStudy.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {industry.caseStudy.description}
                    </p>
                    <button className="text-teal font-medium hover:text-midnight transition-colors">
                      Read Case Study <ArrowRight className="inline h-4 w-4 ml-1" />
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/products" className="btn-primary">
                      Browse Products
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    <Link to="/contact" className="btn-outline">
                      Get Pricing
                    </Link>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="relative">
                    <img
                      src={industry.image}
                      alt={industry.title}
                      className="w-full h-96 object-cover rounded-xl shadow-elevation"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight/20 to-transparent rounded-xl"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-soft-bg section-padding">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-midnight mb-12">
            Trusted Across Industries
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="text-4xl font-serif font-bold text-teal">800+</div>
              <div className="text-lg font-medium text-midnight">Independent Grocers</div>
              <div className="text-sm text-gray-600">Family-owned stores across the Southeast</div>
            </div>
            
            <div className="space-y-2">
              <div className="text-4xl font-serif font-bold text-teal">350+</div>
              <div className="text-lg font-medium text-midnight">Restaurants</div>
              <div className="text-sm text-gray-600">From casual dining to fine establishments</div>
            </div>
            
            <div className="space-y-2">
              <div className="text-4xl font-serif font-bold text-teal">150+</div>
              <div className="text-lg font-medium text-midnight">Specialty Markets</div>
              <div className="text-sm text-gray-600">Gourmet shops and boutique food stores</div>
            </div>
            
            <div className="space-y-2">
              <div className="text-4xl font-serif font-bold text-teal">100+</div>
              <div className="text-lg font-medium text-midnight">Regional Distributors</div>
              <div className="text-sm text-gray-600">Wholesale partners throughout the region</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-olive to-teal rounded-2xl p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Ready to Grow Your Business?
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Join the thousands of businesses that trust Choice Fine Foods to provide 
              exceptional Mediterranean & specialty products that delight customers.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact" className="btn-primary bg-white text-midnight hover:bg-gray-100">
                Contact Sales Team
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link to="/products" className="btn-secondary border-white text-white hover:bg-white hover:text-teal">
                Browse Catalog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
