import React from 'react';
import { FileText, Scale, AlertTriangle, CreditCard, Truck, Shield } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primaryBlue to-neutralBlack text-white py-12 sm:py-16">
        <div className="container-custom text-center px-4">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
              <FileText className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4 sm:mb-6">
            Terms of Service
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed opacity-90">
            Please read these terms carefully before using our wholesale services.
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
                <Scale className="h-6 w-6 text-primaryBlue mr-3" />
                <h2 className="text-2xl font-serif font-bold text-neutralBlack">Agreement to Terms</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms of Service ("Terms") constitute a legally binding agreement between you and Choice Foods 
                ("Company," "we," "our," or "us") regarding your use of our wholesale food distribution services 
                and website.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                By accessing or using our services, you agree to be bound by these Terms. If you disagree with any 
                part of these terms, you may not access our services.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-yellow-800 text-sm">
                    <strong>Important:</strong> These terms apply to wholesale customers only. Retail sales are not available through this platform.
                  </p>
                </div>
              </div>
            </section>

            {/* Account Registration */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-neutralBlack mb-6">Account Registration and Approval</h2>
              
              <h3 className="text-xl font-semibold text-neutralBlack mb-4">Eligibility</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our services are available only to legitimate wholesale businesses, including:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Licensed restaurants and food service establishments</li>
                <li>Grocery stores and specialty food retailers</li>
                <li>Food distributors and wholesalers</li>
                <li>Catering companies and institutional buyers</li>
              </ul>

              <h3 className="text-xl font-semibold text-neutralBlack mb-4">Account Approval Process</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                All accounts require approval before activation. We reserve the right to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Verify business credentials and licenses</li>
                <li>Request additional documentation</li>
                <li>Approve or deny applications at our discretion</li>
                <li>Suspend or terminate accounts for violations</li>
              </ul>
            </section>

            {/* Orders and Pricing */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <CreditCard className="h-6 w-6 text-primaryBlue mr-3" />
                <h2 className="text-2xl font-serif font-bold text-neutralBlack">Orders and Pricing</h2>
              </div>
              
              <h3 className="text-xl font-semibold text-neutralBlack mb-4">Minimum Orders</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Minimum order requirements may apply and vary by product category and delivery location. 
                Current minimums will be displayed during the ordering process.
              </p>

              <h3 className="text-xl font-semibold text-neutralBlack mb-4">Pricing and Payment</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>All prices are wholesale and exclude applicable taxes</li>
                <li>Prices are subject to change without notice</li>
                <li>Payment terms are net 30 days for approved accounts</li>
                <li>We accept checks, wire transfers, and approved credit accounts</li>
                <li>Late payments may incur additional charges</li>
              </ul>

              <h3 className="text-xl font-semibold text-neutralBlack mb-4">Order Acceptance</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                All orders are subject to acceptance and product availability. We reserve the right to 
                refuse or cancel orders at our discretion, including for credit issues or product shortages.
              </p>
            </section>

            {/* Delivery and Shipping */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Truck className="h-6 w-6 text-primaryBlue mr-3" />
                <h2 className="text-2xl font-serif font-bold text-neutralBlack">Delivery and Shipping</h2>
              </div>
              
              <h3 className="text-xl font-semibold text-neutralBlack mb-4">Delivery Areas</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                We primarily serve North Carolina and surrounding areas. Delivery availability and 
                schedules vary by location and will be confirmed when placing orders.
              </p>

              <h3 className="text-xl font-semibold text-neutralBlack mb-4">Delivery Terms</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Delivery dates are estimates and not guaranteed</li>
                <li>You must be available to receive deliveries during scheduled times</li>
                <li>Inspection of products upon delivery is required</li>
                <li>Claims for damaged or incorrect items must be reported immediately</li>
                <li>Delivery fees may apply based on location and order size</li>
              </ul>
            </section>

            {/* Product Quality */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Shield className="h-6 w-6 text-primaryBlue mr-3" />
                <h2 className="text-2xl font-serif font-bold text-neutralBlack">Product Quality and Returns</h2>
              </div>
              
              <h3 className="text-xl font-semibold text-neutralBlack mb-4">Quality Assurance</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                We are committed to providing high-quality products and maintain strict quality control standards. 
                All products are sourced from reputable suppliers and stored in appropriate conditions.
              </p>

              <h3 className="text-xl font-semibold text-neutralBlack mb-4">Returns and Exchanges</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Perishable items cannot be returned unless defective upon delivery</li>
                <li>Non-perishable items may be returned within 7 days in original condition</li>
                <li>All returns require prior authorization</li>
                <li>Customer is responsible for return shipping costs unless product is defective</li>
                <li>Refunds will be processed within 14 business days of approved returns</li>
              </ul>
            </section>

            {/* Prohibited Uses */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-neutralBlack mb-6">Prohibited Uses</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree not to use our services for any unlawful purpose or in violation of these Terms. 
                Prohibited activities include:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Reselling products to unauthorized parties</li>
                <li>Using false or misleading information during registration</li>
                <li>Attempting to circumvent credit or approval processes</li>
                <li>Interfering with the proper functioning of our website or systems</li>
                <li>Violating any applicable laws or regulations</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-neutralBlack mb-6">Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                All content on our website, including text, graphics, logos, images, and software, is the property 
                of Choice Foods or our licensors and is protected by copyright and other intellectual property laws. 
                You may not use, reproduce, or distribute any content without our written permission.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-neutralBlack mb-6">Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                To the fullest extent permitted by law, Choice Foods shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages, including loss of profits, data, or use, 
                arising from your use of our services, even if we have been advised of the possibility of such damages.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Our total liability for any claim arising from these Terms or your use of our services shall not 
                exceed the amount paid by you for the specific products or services giving rise to the claim.
              </p>
            </section>

            {/* Indemnification */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-neutralBlack mb-6">Indemnification</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                You agree to indemnify, defend, and hold harmless Choice Foods and its officers, directors, employees, 
                and agents from any claims, damages, losses, or expenses arising from your use of our services, 
                violation of these Terms, or violation of any rights of another party.
              </p>
            </section>

            {/* Governing Law */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-neutralBlack mb-6">Governing Law and Disputes</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                These Terms shall be governed by and construed in accordance with the laws of the State of North Carolina, 
                without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of 
                our services shall be resolved in the state or federal courts located in North Carolina.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-neutralBlack mb-6">Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon 
                posting on our website. Your continued use of our services after any changes constitutes acceptance 
                of the new Terms. We recommend reviewing these Terms periodically.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-neutralBlack mb-6">Contact Information</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="font-semibold text-neutralBlack mb-2">Choice Foods</p>
                    <p className="text-gray-600 text-sm">
                      409 Prospect St.<br />
                      High Point, NC 27260<br />
                      United States
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-neutralBlack mb-2">Contact</p>
                    <p className="text-gray-600 text-sm">
                      Phone: 336-782-8283<br />
                      Email: choicefoods@hotmail.com
                    </p>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
} 