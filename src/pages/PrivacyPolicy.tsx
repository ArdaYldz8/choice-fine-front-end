import React from 'react';
import { Shield, Eye, Lock, UserCheck, Mail, Phone } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primaryBlue to-neutralBlack text-white py-12 sm:py-16">
        <div className="container-custom text-center px-4">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4 sm:mb-6">
            Privacy Policy
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed opacity-90">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
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

            {/* Introduction */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Eye className="h-6 w-6 text-primaryBlue mr-3" />
                <h2 className="text-2xl font-serif font-bold text-neutralBlack">Introduction</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Choice Foods ("we," "our," or "us") is committed to protecting your privacy and personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
                visit our website and use our wholesale food distribution services.
              </p>
              <p className="text-gray-700 leading-relaxed">
                By accessing or using our services, you agree to the collection and use of information in accordance 
                with this Privacy Policy.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <UserCheck className="h-6 w-6 text-primaryBlue mr-3" />
                <h2 className="text-2xl font-serif font-bold text-neutralBlack">Information We Collect</h2>
              </div>
              
              <h3 className="text-xl font-semibold text-neutralBlack mb-4">Personal Information</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may collect the following personal information when you register for an account or place orders:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Full name and business contact information</li>
                <li>Email address and phone number</li>
                <li>Business address and shipping information</li>
                <li>Company name and business license information</li>
                <li>Payment and billing information</li>
                <li>Order history and preferences</li>
              </ul>

              <h3 className="text-xl font-semibold text-neutralBlack mb-4">Automatically Collected Information</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you visit our website, we may automatically collect:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>IP address and browser information</li>
                <li>Device type and operating system</li>
                <li>Pages visited and time spent on our site</li>
                <li>Referring website information</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            {/* How We Use Information */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Lock className="h-6 w-6 text-primaryBlue mr-3" />
                <h2 className="text-2xl font-serif font-bold text-neutralBlack">How We Use Your Information</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Process and fulfill your wholesale orders</li>
                <li>Manage your account and provide customer support</li>
                <li>Communicate about orders, products, and services</li>
                <li>Verify business credentials and approve accounts</li>
                <li>Improve our website and services</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Prevent fraud and ensure security</li>
                <li>Send marketing communications (with your consent)</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-neutralBlack mb-6">Information Sharing and Disclosure</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your 
                information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li><strong>Service Providers:</strong> With trusted third-party vendors who assist in operations</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with mergers or acquisitions</li>
                <li><strong>Consent:</strong> When you explicitly consent to sharing</li>
              </ul>
            </section>

            {/* Data Security */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-neutralBlack mb-6">Data Security</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We implement appropriate technical and organizational security measures to protect your personal 
                information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>SSL encryption for data transmission</li>
                <li>Secure servers and databases</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and employee training</li>
                <li>Payment processing through secure third-party providers</li>
              </ul>
            </section>

            {/* Cookies */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-neutralBlack mb-6">Cookies and Tracking</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our website uses cookies and similar technologies to enhance your experience. Cookies help us:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Remember your login information and preferences</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Provide personalized content and recommendations</li>
                <li>Improve website functionality and performance</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                You can control cookies through your browser settings, but disabling them may affect website functionality.
              </p>
            </section>

            {/* Your Rights */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-neutralBlack mb-6">Your Rights and Choices</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li><strong>Access:</strong> Request copies of your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request transfer of your data</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Object:</strong> Object to certain data processing activities</li>
              </ul>
            </section>

            {/* Data Retention */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-neutralBlack mb-6">Data Retention</h2>
              <p className="text-gray-700 leading-relaxed">
                We retain your personal information only as long as necessary to fulfill the purposes outlined in this 
                Privacy Policy, comply with legal obligations, resolve disputes, and enforce agreements. When information 
                is no longer needed, we securely delete or anonymize it.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <div className="flex items-center mb-6">
                <Mail className="h-6 w-6 text-primaryBlue mr-3" />
                <h2 className="text-2xl font-serif font-bold text-neutralBlack">Contact Us</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primaryBlue" />
                    <div>
                      <p className="font-semibold text-neutralBlack">Phone</p>
                      <p className="text-gray-600">336-782-8283</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primaryBlue" />
                    <div>
                      <p className="font-semibold text-neutralBlack">Email</p>
                      <p className="text-gray-600">choicefoods@hotmail.com</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    <strong>Address:</strong> 409 Prospect St., High Point, NC 27260, United States
                  </p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
} 