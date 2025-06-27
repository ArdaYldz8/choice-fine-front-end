
import { Award, Users, Globe, Truck, Shield, Leaf } from "lucide-react";

const timeline = [
  {
    year: "1979",
    title: "Company Founded",
    description: "Started as a small importer bringing authentic Mediterranean products to North Carolina."
  },
  {
    year: "1985",
    title: "First Warehouse",
    description: "Opened our first distribution center in Charlotte to serve regional retailers."
  },
  {
    year: "1995",
    title: "Southeast Expansion", 
    description: "Extended operations to serve retailers across Georgia, South Carolina, and Tennessee."
  },
  {
    year: "2005",
    title: "Quality Certifications",
    description: "Achieved FDA, Kosher, and Halal certifications to serve diverse customer needs."
  },
  {
    year: "2015",
    title: "Technology Investment",
    description: "Launched online ordering platform and enhanced supply chain management systems."
  },
  {
    year: "2020",
    title: "Sustainability Initiative",
    description: "Committed to sustainable sourcing and eco-friendly packaging across all operations."
  },
  {
    year: "2025",
    title: "Present Day",
    description: "Serving 1,400+ retailers with 3,000+ SKUs from trusted Mediterranean producers."
  }
];

const leadership = [
  {
    name: "Maria Rodriguez",
    title: "Chief Executive Officer",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b494?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "25+ years in specialty food distribution. Led company expansion across the Southeast."
  },
  {
    name: "Giuseppe Martinelli",
    title: "Head of Sourcing",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Third-generation food importer with deep relationships across Mediterranean producers."
  },
  {
    name: "Sarah Chen",
    title: "Chief Operations Officer",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Expert in supply chain optimization and quality assurance for food distribution."
  },
  {
    name: "Ahmed Hassan",
    title: "Director of Sales",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "15+ years building relationships with independent grocers and specialty retailers."
  }
];

const certifications = [
  { name: "FDA Approved", icon: Shield },
  { name: "Kosher Certified", icon: Award },
  { name: "Halal Certified", icon: Award },
  { name: "Organic Certified", icon: Leaf },
  { name: "Non-GMO Project", icon: Leaf },
  { name: "SQF Quality", icon: Shield }
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-midnight to-teal text-white section-padding">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            Our Story
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed opacity-90">
            For over four decades, Choice Fine Foods has been the trusted bridge between 
            Mediterranean producers and American retailers, bringing authentic flavors to tables across the Southeast.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-midnight mb-6">
                Connecting Cultures Through Food
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                What started in 1979 as a passion for bringing authentic Mediterranean foods to North Carolina 
                has grown into one of the Southeast's premier specialty food distributors. We believe that 
                great food has the power to bring people together and create lasting memories.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Today, we partner with over 200 carefully selected producers across the Mediterranean to offer 
                more than 3,000 premium products to our retail partners. Every item in our catalog reflects 
                our commitment to quality, authenticity, and the culinary traditions of the Mediterranean.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-serif font-bold text-teal mb-2">200+</div>
                  <div className="text-sm text-gray-600">Trusted Producers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-serif font-bold text-teal mb-2">3,000+</div>
                  <div className="text-sm text-gray-600">Premium Products</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Mediterranean marketplace"
                className="w-full h-96 object-cover rounded-xl shadow-elevation"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/20 to-transparent rounded-xl"></div>
            </div>
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-teal to-olive rounded-xl flex items-center justify-center mx-auto">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold text-midnight">Authentic Sourcing</h3>
              <p className="text-gray-600">
                Direct relationships with Mediterranean producers ensure authentic flavors and traditional methods.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-olive to-saffron rounded-xl flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold text-midnight">Quality Assurance</h3>
              <p className="text-gray-600">
                Rigorous quality standards and certifications guarantee the finest products for your customers.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-saffron to-teal rounded-xl flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold text-midnight">Partnership Focus</h3>
              <p className="text-gray-600">
                We're more than a supplier—we're your dedicated partner in growing your specialty food business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-soft-bg section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-midnight mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to regional leadership—discover the milestones that shaped Choice Fine Foods.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-teal h-full"></div>
            <div className="space-y-16">
              {timeline.map((item, index) => (
                <div key={item.year} className={`flex items-center ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-elevation">
                      <div className="text-2xl font-serif font-bold text-teal mb-2">{item.year}</div>
                      <h3 className="text-xl font-serif font-bold text-midnight mb-3">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  <div className="w-6 h-6 bg-teal rounded-full border-4 border-white shadow-md z-10"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-midnight mb-6">
              Leadership Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the experienced professionals who guide our mission to bring the finest Mediterranean foods to your market.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((person) => (
              <div key={person.name} className="text-center">
                <div className="w-48 h-48 mx-auto mb-6 relative">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover rounded-xl shadow-elevation"
                  />
                </div>
                <h3 className="text-xl font-serif font-bold text-midnight mb-2">{person.name}</h3>
                <div className="text-teal font-medium mb-3">{person.title}</div>
                <p className="text-gray-600 text-sm leading-relaxed">{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-soft-bg section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-midnight mb-6">
              Quality Certifications
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commitment to quality is backed by industry-leading certifications and rigorous standards.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {certifications.map((cert) => (
              <div key={cert.name} className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl shadow-elevation flex items-center justify-center mx-auto mb-4">
                  <cert.icon className="h-8 w-8 text-teal" />
                </div>
                <div className="text-sm font-medium text-midnight">{cert.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Sustainable farming"
                className="w-full h-96 object-cover rounded-xl shadow-elevation"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/20 to-transparent rounded-xl"></div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-midnight mb-6">
                Committed to Sustainability
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We believe in preserving the Mediterranean traditions and environments that produce our exceptional foods. 
                Our sustainability initiative encompasses every aspect of our operations, from sourcing to packaging.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-olive rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Supporting small-scale, traditional producers</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-olive rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Eco-friendly packaging and reduced waste initiatives</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-olive rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Carbon-neutral shipping options</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-olive rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Investment in renewable energy at our facilities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
