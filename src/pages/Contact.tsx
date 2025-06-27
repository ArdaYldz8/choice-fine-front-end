
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
    honeypot: "" // Hidden field for spam prevention
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check honeypot field (should be empty)
    if (formData.honeypot) {
      return; // Likely spam
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-soft-bg flex items-center justify-center">
        <div className="container-custom max-w-2xl text-center">
          <div className="bg-white rounded-2xl p-12 shadow-elevation">
            <div className="w-24 h-24 bg-olive rounded-full flex items-center justify-center mx-auto mb-8">
              <Send className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-midnight mb-6">
              Message Sent Successfully!
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Thank you for contacting Choice Fine Foods. Our team will review your message 
              and get back to you within 1 business day.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: "",
                  email: "",
                  company: "",
                  phone: "",
                  subject: "",
                  message: "",
                  honeypot: ""
                });
              }}
              className="btn-primary"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-midnight to-teal text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Contact Us
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed opacity-90">
            Ready to partner with Choice Fine Foods? Our team is here to help you discover 
            the perfect Mediterranean & specialty products for your business.
          </p>
        </div>
      </section>

      <div className="container-custom py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-serif font-bold text-midnight mb-8">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Whether you're a retailer looking to expand your specialty food selection or a supplier 
              interested in partnership opportunities, we'd love to hear from you.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-teal rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-midnight mb-1">Address</h3>
                  <p className="text-gray-600">
                    1234 Trade Center Drive<br />
                    Charlotte, NC 28202<br />
                    United States
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-olive rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-midnight mb-1">Phone</h3>
                  <p className="text-gray-600">
                    <a href="tel:+1-919-555-0123" className="hover:text-teal transition-colors">
                      (919) 555-0123
                    </a><br />
                    <span className="text-sm">Monday - Friday, 8:00 AM - 6:00 PM EST</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-saffron rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-midnight mb-1">Email</h3>
                  <p className="text-gray-600">
                    <a href="mailto:sales@choicefinefoods.com" className="hover:text-teal transition-colors">
                      sales@choicefinefoods.com
                    </a><br />
                    <span className="text-sm">General inquiries & sales</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-teal rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-midnight mb-1">Business Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 8:00 AM - 6:00 PM EST<br />
                    Saturday: 9:00 AM - 2:00 PM EST<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="w-full h-64 bg-gray-200 rounded-xl overflow-hidden">
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')"
                }}
              >
                <div className="w-full h-full bg-midnight/20 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <span className="text-midnight font-medium">Charlotte, NC Location</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-xl p-8 shadow-elevation">
              <h3 className="text-2xl font-serif font-bold text-midnight mb-6">
                Send us a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field (hidden) */}
                <input
                  type="text"
                  name="website"
                  value={formData.honeypot}
                  onChange={(e) => handleInputChange('honeypot', e.target.value)}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-midnight mb-2">Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-midnight mb-2">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-midnight mb-2">Company</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                      placeholder="Your company name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-midnight mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-midnight mb-2">Subject *</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="pricing">Pricing & Quotes</option>
                    <option value="partnership">Partnership Opportunities</option>
                    <option value="supplier">Become a Supplier</option>
                    <option value="support">Customer Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-midnight mb-2">Message *</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={5}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                    placeholder="Tell us how we can help you..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>

                <p className="text-sm text-gray-500 text-center">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Contact Options */}
      <section className="bg-soft-bg py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-serif font-bold text-midnight mb-8">
            Other Ways to Connect
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-elevation">
              <h3 className="font-serif font-bold text-lg text-midnight mb-3">Sales Team</h3>
              <p className="text-gray-600 mb-4">Ready to place an order or get pricing?</p>
              <a href="mailto:sales@choicefinefoods.com" className="btn-outline">
                Contact Sales
              </a>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-elevation">
              <h3 className="font-serif font-bold text-lg text-midnight mb-3">Supplier Inquiries</h3>
              <p className="text-gray-600 mb-4">Interested in becoming a supplier partner?</p>
              <a href="mailto:sourcing@choicefinefoods.com" className="btn-outline">
                Contact Sourcing
              </a>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-elevation">
              <h3 className="font-serif font-bold text-lg text-midnight mb-3">Customer Support</h3>
              <p className="text-gray-600 mb-4">Need help with an existing order?</p>
              <a href="mailto:support@choicefinefoods.com" className="btn-outline">
                Get Support
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
