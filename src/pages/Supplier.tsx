
import { useState } from "react";
import { CheckCircle, Upload, ArrowRight, Award, Shield, Globe } from "lucide-react";

export default function Supplier() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    country: "",
    productLine: "",
    annualVolume: "",
    certifications: [] as string[],
    description: "",
    experience: ""
  });

  const steps = [
    { number: 1, title: "Company Information", description: "Basic details about your company" },
    { number: 2, title: "Product Details", description: "Information about your products" },
    { number: 3, title: "Certifications", description: "Quality and compliance certificates" }
  ];

  const certificationOptions = [
    "Organic Certified",
    "FDA Approved", 
    "Kosher Certified",
    "Halal Certified",
    "Non-GMO Project",
    "DOP/PDO Certified",
    "Fair Trade",
    "SQF Certified",
    "BRC Certified",
    "Other"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCertificationChange = (cert: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      certifications: checked 
        ? [...prev.certifications, cert]
        : prev.certifications.filter(c => c !== cert)
    }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    setCurrentStep(4); // Success screen
  };

  if (currentStep === 4) {
    return (
      <div className="min-h-screen bg-soft-bg flex items-center justify-center">
        <div className="container-custom max-w-2xl text-center">
          <div className="bg-white rounded-2xl p-12 shadow-elevation">
            <div className="w-24 h-24 bg-olive rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-midnight mb-6">
              Thank You for Your Interest!
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We've received your supplier application and will review it within 2-3 business days. 
              Our sourcing team will contact you with next steps.
            </p>
            <div className="bg-soft-bg p-6 rounded-xl mb-8">
              <h3 className="font-serif font-bold text-lg text-midnight mb-4">What happens next?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-olive rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Initial review of your application and product line</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-olive rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Product sampling and quality evaluation</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-olive rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Partnership discussion and onboarding process</span>
                </div>
              </div>
            </div>
            <button className="btn-primary mb-4">
              Download Vendor Guidelines
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <div className="text-sm text-gray-500">
              Questions? Contact our sourcing team at sourcing@choicefinefoods.com
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-bg">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-midnight to-teal text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Become a Supplier
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed opacity-90">
            Join our network of trusted Mediterranean producers and bring your authentic products 
            to thousands of retailers across the Southeast.
          </p>
        </div>
      </section>

      {/* Requirements Overview */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-midnight mb-6">
              What We Look For
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We partner with producers who share our commitment to quality, authenticity, and excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-teal to-olive rounded-xl flex items-center justify-center mx-auto">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold text-midnight">Premium Quality</h3>
              <p className="text-gray-600">
                Authentic Mediterranean products that meet our rigorous quality standards and certifications.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-olive to-saffron rounded-xl flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold text-midnight">Compliance</h3>
              <p className="text-gray-600">
                FDA approval, proper documentation, and adherence to U.S. import regulations.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-saffron to-teal rounded-xl flex items-center justify-center mx-auto">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold text-midnight">Reliability</h3>
              <p className="text-gray-600">
                Consistent supply capacity and commitment to long-term partnership growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16">
        <div className="container-custom max-w-4xl">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step) => (
                <div key={step.number} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    currentStep >= step.number ? 'bg-olive text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step.number}
                  </div>
                  <div className="ml-3 hidden md:block">
                    <div className={`font-medium ${currentStep >= step.number ? 'text-midnight' : 'text-gray-500'}`}>
                      {step.title}
                    </div>
                    <div className="text-sm text-gray-500">{step.description}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-olive h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-elevation">
            {/* Step 1: Company Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-serif font-bold text-midnight mb-6">Company Information</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-midnight mb-2">Company Name *</label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                      placeholder="Your Company Name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-midnight mb-2">Contact Name *</label>
                    <input
                      type="text"
                      value={formData.contactName}
                      onChange={(e) => handleInputChange('contactName', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                      placeholder="Primary Contact Person"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-midnight mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                      placeholder="contact@yourcompany.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-midnight mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-midnight mb-2">Website</label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                      placeholder="https://www.yourcompany.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-midnight mb-2">Country of Origin *</label>
                    <select
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                      required
                    >
                      <option value="">Select Country</option>
                      <option value="Italy">Italy</option>
                      <option value="Spain">Spain</option>
                      <option value="Greece">Greece</option>
                      <option value="France">France</option>
                      <option value="Turkey">Turkey</option>
                      <option value="Morocco">Morocco</option>
                      <option value="Lebanon">Lebanon</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-midnight mb-2">Years in Business</label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                    placeholder="How long have you been in business?"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Product Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-serif font-bold text-midnight mb-6">Product Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-midnight mb-2">Product Line *</label>
                  <select
                    value={formData.productLine}
                    onChange={(e) => handleInputChange('productLine', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                    required
                  >
                    <option value="">Select Primary Product Category</option>
                    <option value="Olive Oils">Olive Oils & Vinegars</option>
                    <option value="Pasta">Pasta & Grains</option>
                    <option value="Sauces">Sauces & Condiments</option>
                    <option value="Dairy">Dairy & Cheese</option>
                    <option value="Preserved">Preserved Foods</option>
                    <option value="Spices">Spices & Seasonings</option>
                    <option value="Seafood">Seafood</option>
                    <option value="Confections">Confections</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-midnight mb-2">Annual Production Volume</label>
                  <select
                    value={formData.annualVolume}
                    onChange={(e) => handleInputChange('annualVolume', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                  >
                    <option value="">Select Volume Range</option>
                    <option value="Small">Small Scale (< 50 tons/year)</option>
                    <option value="Medium">Medium Scale (50-500 tons/year)</option>
                    <option value="Large">Large Scale (500+ tons/year)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-midnight mb-2">Product Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                    placeholder="Describe your products, production methods, and what makes them unique..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-midnight mb-2">Product Samples & Documentation</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-teal transition-colors cursor-pointer">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">
                      Drop files here or <span className="text-teal font-medium">browse</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Upload product sheets, certifications, or sample photos (Max 10MB)
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Certifications */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-serif font-bold text-midnight mb-6">Quality Certifications</h3>
                
                <div>
                  <label className="block text-sm font-medium text-midnight mb-4">
                    Select all certifications that apply to your products:
                  </label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {certificationOptions.map((cert) => (
                      <label key={cert} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-soft-bg cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.certifications.includes(cert)}
                          onChange={(e) => handleCertificationChange(cert, e.target.checked)}
                          className="rounded border-gray-300 text-teal focus:ring-teal"
                        />
                        <span className="text-midnight">{cert}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-midnight mb-2">Upload Certificates</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-teal transition-colors cursor-pointer">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">
                      Drop certificate files here or <span className="text-teal font-medium">browse</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Upload PDF copies of your certifications (Max 10MB each)
                    </p>
                  </div>
                </div>

                <div className="bg-soft-bg p-6 rounded-lg">
                  <h4 className="font-medium text-midnight mb-2">Note on FDA Requirements</h4>
                  <p className="text-sm text-gray-600">
                    All food products imported to the United States must comply with FDA regulations. 
                    We'll work with you to ensure all necessary documentation is in order before importing.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8 border-t border-gray-200">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-midnight hover:bg-gray-300'
                }`}
              >
                Previous
              </button>

              {currentStep === 3 ? (
                <button
                  onClick={handleSubmit}
                  className="btn-primary"
                >
                  Submit Application
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  className="btn-primary"
                >
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
