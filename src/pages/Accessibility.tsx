import React from 'react';
import { Eye, Ear, Hand, Monitor, Smartphone, Mail, Phone } from 'lucide-react';

export default function Accessibility() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primaryBlue to-neutralBlack text-white py-12 sm:py-16">
        <div className="container-custom text-center px-4">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
              <Eye className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4 sm:mb-6">
            Accessibility Statement
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed opacity-90">
            We are committed to ensuring our website is accessible to everyone, regardless of ability.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="container-custom py-12 sm:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sm:p-12">
            
            {/* Last Updated */}
            <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-sm text-blue-700">
                <strong>Last Updated:</strong> January 2025
              </p>
            </div>

            {/* Our Commitment */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-neutralBlack mb-6">Our Commitment to Accessibility</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Choice Foods is committed to ensuring that our website is accessible to people with disabilities. 
                We believe that everyone should have equal access to information and functionality, and we strive 
                to provide an inclusive digital experience for all our users.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                We are continuously working to improve the accessibility of our website and ensure compliance 
                with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.
              </p>
            </section>

            {/* Accessibility Features */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-neutralBlack mb-6">Accessibility Features</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Our website includes the following accessibility features:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                  <Eye className="h-6 w-6 text-primaryBlue mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-neutralBlack mb-2">Visual Accessibility</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• High contrast color schemes</li>
                      <li>• Scalable text and images</li>
                      <li>• Alternative text for images</li>
                      <li>• Clear visual hierarchy</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                  <Hand className="h-6 w-6 text-primaryBlue mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-neutralBlack mb-2">Motor Accessibility</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Large touch targets</li>
                      <li>• Keyboard navigation support</li>
                      <li>• No time-sensitive interactions</li>
                      <li>• Easy-to-use forms</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                  <Ear className="h-6 w-6 text-primaryBlue mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-neutralBlack mb-2">Auditory Accessibility</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Text alternatives for audio</li>
                      <li>• Visual indicators for sound</li>
                      <li>• No auto-playing audio</li>
                      <li>• Clear content structure</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                  <Monitor className="h-6 w-6 text-primaryBlue mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-neutralBlack mb-2">Cognitive Accessibility</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Simple, clear language</li>
                      <li>• Consistent navigation</li>
                      <li>• Error prevention and correction</li>
                      <li>• Logical page structure</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Technical Standards */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-neutralBlack mb-6">Technical Standards</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Our website is designed to be compatible with:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-neutralBlack mb-4">Assistive Technologies</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Screen readers (JAWS, NVDA, VoiceOver)</li>
                    <li>Voice recognition software</li>
                    <li>Screen magnification tools</li>
                    <li>Alternative keyboards and pointing devices</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-neutralBlack mb-4">Browser Compatibility</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Chrome, Firefox, Safari, Edge</li>
                    <li>Mobile browsers (iOS Safari, Chrome Mobile)</li>
                    <li>Keyboard-only navigation</li>
                    <li>High contrast mode support</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Mobile Accessibility */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Smartphone className="h-6 w-6 text-primaryBlue mr-3" />
                <h2 className="text-2xl font-serif font-bold text-neutralBlack">Mobile Accessibility</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                Our mobile website includes additional accessibility features:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Touch-friendly interface with large tap targets (minimum 44px)</li>
                <li>Responsive design that works across all screen sizes</li>
                <li>Support for mobile screen readers and voice assistants</li>
                <li>Gesture-based navigation alternatives</li>
                <li>Optimized performance for slower connections</li>
                <li>Readable text without horizontal scrolling</li>
              </ul>
            </section>

            {/* Ongoing Efforts */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-neutralBlack mb-6">Ongoing Accessibility Efforts</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                We are continuously working to improve accessibility through:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Regular accessibility audits and testing</li>
                <li>User testing with people with disabilities</li>
                <li>Staff training on accessibility best practices</li>
                <li>Implementation of user feedback and suggestions</li>
                <li>Staying current with accessibility standards and guidelines</li>
                <li>Third-party accessibility assessments</li>
              </ul>
            </section>

            {/* Known Issues */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-neutralBlack mb-6">Known Accessibility Issues</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                We are aware of some accessibility challenges that we are actively working to address:
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <ul className="list-disc list-inside text-yellow-800 space-y-2">
                  <li>Some third-party content may not fully meet accessibility standards</li>
                  <li>Complex data tables in product catalogs are being enhanced</li>
                  <li>Some PDF documents are being converted to accessible formats</li>
                </ul>
                <p className="text-yellow-800 text-sm mt-4">
                  <strong>Note:</strong> We are actively working to resolve these issues and appreciate your patience.
                </p>
              </div>
            </section>

            {/* Alternative Access */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-neutralBlack mb-6">Alternative Access Methods</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                If you encounter accessibility barriers on our website, we offer alternative ways to access our services:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <h3 className="font-semibold text-neutralBlack mb-3">Phone Support</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    Our customer service team can assist you with:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Product information and pricing</li>
                    <li>• Account registration and management</li>
                    <li>• Order placement and tracking</li>
                    <li>• General inquiries</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 rounded-xl">
                  <h3 className="font-semibold text-neutralBlack mb-3">Email Support</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    Email us for assistance with:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Detailed product specifications</li>
                    <li>• Custom orders and special requests</li>
                    <li>• Account documentation</li>
                    <li>• Accessibility feedback</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Feedback */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-neutralBlack mb-6">Accessibility Feedback</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                We welcome your feedback on the accessibility of our website. If you encounter any accessibility 
                barriers or have suggestions for improvement, please let us know. Your input helps us create a 
                better experience for everyone.
              </p>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-neutralBlack mb-4">How to Provide Feedback</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primaryBlue" />
                    <div>
                      <p className="font-semibold text-neutralBlack">Phone</p>
                      <p className="text-gray-600">336-782-8283</p>
                      <p className="text-sm text-gray-500">Monday - Friday, 8 AM - 4 PM EST</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primaryBlue" />
                    <div>
                      <p className="font-semibold text-neutralBlack">Email</p>
                      <p className="text-gray-600">choicefoods@hotmail.com</p>
                      <p className="text-sm text-gray-500">Subject: Website Accessibility</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Legal Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-neutralBlack mb-6">Legal Information</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                This accessibility statement applies to the Choice Foods website. We are committed to 
                compliance with applicable accessibility laws and regulations, including the Americans 
                with Disabilities Act (ADA) and Section 508 of the Rehabilitation Act.
              </p>
              <p className="text-gray-700 leading-relaxed">
                This statement was last reviewed and updated in January 2025. We review and update 
                this statement regularly to ensure it remains current and accurate.
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
} 