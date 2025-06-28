import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import { useContactRequests } from "../hooks/useContactRequests";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    password: "",
    honeypot: "" // Hidden field for spam prevention
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const { submitContactRequest, loading, error } = useContactRequests();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check honeypot field (should be empty)
    if (formData.honeypot) {
      return; // Likely spam
    }

    const result = await submitContactRequest({
      name: formData.name,
      email: formData.email,
      company: formData.company,
      password: formData.password
    });

    if (result.success) {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-lightGrey flex items-center justify-center">
        <div className="container-custom max-w-2xl text-center">
          <div className="bg-white rounded-2xl p-12 shadow-elevation">
            <div className="w-24 h-24 bg-accentRed rounded-full flex items-center justify-center mx-auto mb-8">
              <MessageCircle className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-neutralBlack mb-6">
              Your details were sent successfully!
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Thank you for contacting Choice Foods. Our team will review your message 
              and get back to you within 1 business day.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: "",
                  email: "",
                  company: "",
                  password: "",
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
      <section className="bg-gradient-to-r from-primaryBlue to-neutralBlack text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Get In Touch
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed opacity-90">
            Interested in doing business with Choice Foods? Contact us to see what we can do for you.
          </p>
        </div>
      </section>

      <div className="container-custom py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-serif font-bold text-neutralBlack mb-8">
              Contact Information
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Whether you're looking to stock premium Mediterranean products or have questions about our services, 
              we'd love to hear from you. Our dedicated team is here to help.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primaryBlue rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutralBlack mb-1">Address</h3>
                  <p className="text-gray-600">
                    409 Prospect St.<br />
                    High Point, NC 27260<br />
                    United States
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accentRed rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutralBlack mb-1">Phone & Fax</h3>
                  <p className="text-gray-600">
                    <a href="tel:336-782-8283" className="hover:text-primaryBlue transition-colors">
                      336-782-8283
                    </a><br />
                    <span className="text-sm">Fax: 336-499-3232</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-neutralBlack rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutralBlack mb-1">Email</h3>
                  <p className="text-gray-600">
                    <a href="mailto:choicefoods@hotmail.com" className="hover:text-primaryBlue transition-colors">
                      choicefoods@hotmail.com
                    </a><br />
                    <span className="text-sm">General inquiries & orders</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primaryBlue rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutralBlack mb-1">Business Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 8:00 AM - 4:00 PM EST<br />
                    Saturday - Sunday: Closed
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
                <div className="w-full h-full bg-primaryBlue/20 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <span className="text-neutralBlack font-medium">High Point, NC Location</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-xl p-8 shadow-elevation">
              <h3 className="text-2xl font-serif font-bold text-neutralBlack mb-6">
                Request Membership
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

                <div>
                  <label className="block text-sm font-medium text-neutralBlack mb-2">Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryBlue focus:border-transparent"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutralBlack mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryBlue focus:border-transparent"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutralBlack mb-2">Company Name *</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryBlue focus:border-transparent"
                    placeholder="Your company name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutralBlack mb-2">Password *</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryBlue focus:border-transparent"
                    placeholder="Choose a secure password"
                    minLength={6}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Password must be at least 6 characters long
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Request Membership
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>

                {error && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                <p className="text-sm text-gray-500 text-center">
                  By submitting this form, you're requesting wholesale membership with Choice Foods. Our team will review your application and contact you within 1 business day.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
