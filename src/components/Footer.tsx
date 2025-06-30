import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-neutralBlack via-gray-900 to-neutralBlack text-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primaryBlue rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-accentRed rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative container-custom py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg p-2">
                <img 
                  src="/logo.png" 
                  alt="Choice Foods Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="font-serif font-bold text-xl">Choice Foods</div>
                <div className="text-sm text-gray-400">Since 2010</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your source for fine Mediterranean products. As a proud member of the North Carolina community since 2010, 
              we supply our clients with the very best in the Grocery Wholesaler industry.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="group w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-primaryBlue hover:to-accentRed rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <Facebook className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors" />
              </a>
              <a href="#" className="group w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-primaryBlue hover:to-accentRed rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <Instagram className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors" />
              </a>
              <a href="#" className="group w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-primaryBlue hover:to-accentRed rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <Linkedin className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Product Categories */}
          <div className="space-y-6">
            <h3 className="font-serif font-bold text-xl mb-6 text-white">Our Products</h3>
            <ul className="space-y-3">
              <li className="group flex items-center">
                <ArrowRight className="h-3 w-3 text-primaryBlue mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                <span className="text-gray-300 group-hover:text-white transition-colors duration-200">Premium Grains</span>
              </li>
              <li className="group flex items-center">
                <ArrowRight className="h-3 w-3 text-primaryBlue mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                <span className="text-gray-300 group-hover:text-white transition-colors duration-200">Frozen Vegetables</span>
              </li>
              <li className="group flex items-center">
                <ArrowRight className="h-3 w-3 text-primaryBlue mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                <span className="text-gray-300 group-hover:text-white transition-colors duration-200">Imported Beverages</span>
              </li>
              <li className="group flex items-center">
                <ArrowRight className="h-3 w-3 text-primaryBlue mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                <span className="text-gray-300 group-hover:text-white transition-colors duration-200">European Wafers & Cakes</span>
              </li>
              <li className="group flex items-center">
                <ArrowRight className="h-3 w-3 text-primaryBlue mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                <span className="text-gray-300 group-hover:text-white transition-colors duration-200">Dairy Products</span>
              </li>
            </ul>
            <div className="pt-2 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
              <span className="text-primaryBlue text-xs">*Member login required to view catalog</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-serif font-bold text-xl mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="group flex items-center text-gray-300 hover:text-white transition-all duration-200">
                  <ArrowRight className="h-3 w-3 text-accentRed mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                  <span className="group-hover:underline">Home</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="group flex items-center text-gray-300 hover:text-white transition-all duration-200">
                  <ArrowRight className="h-3 w-3 text-accentRed mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                  <span className="group-hover:underline">Contact</span>
                </Link>
              </li>
              <li>
                <Link to="/login" className="group flex items-center text-gray-300 hover:text-white transition-all duration-200">
                  <ArrowRight className="h-3 w-3 text-accentRed mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                  <span className="group-hover:underline">Member Login</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="font-serif font-bold text-xl mb-6 text-white">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors duration-200">
                <div className="w-8 h-8 bg-gradient-to-br from-primaryBlue to-accentRed rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div className="text-gray-300 text-sm">
                  409 Prospect St.<br />
                  High Point, NC 27260<br />
                  United States
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors duration-200">
                <div className="w-8 h-8 bg-gradient-to-br from-primaryBlue to-accentRed rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-4 w-4 text-white" />
                </div>
                <a href="tel:336-782-8283" className="text-gray-300 hover:text-white transition-colors text-sm">
                  336-782-8283
                </a>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors duration-200">
                <div className="w-8 h-8 bg-gradient-to-br from-primaryBlue to-accentRed rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <a href="mailto:choicefoods@hotmail.com" className="text-gray-300 hover:text-white transition-colors text-sm break-all">
                  choicefoods@hotmail.com
                </a>
              </div>
              
              <div className="p-3 bg-gradient-to-r from-primaryBlue/20 to-accentRed/20 rounded-lg border border-primaryBlue/30">
                <div className="text-gray-300 text-xs">
                  <strong className="text-white">Hours:</strong> Monday - Friday, 8:00 AM - 4:00 PM
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 bg-gray-900/50 backdrop-blur-sm">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-1">
                <img 
                  src="/logo.png" 
                  alt="Choice Foods" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span>© 2025 Choice Foods. All rights reserved.</span>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors duration-200 hover:underline">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors duration-200 hover:underline">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors duration-200 hover:underline">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
