import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-neutralBlack via-gray-900 to-neutralBlack text-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primaryBlue rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-accentRed rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative container-custom py-8 sm:py-12 md:py-16 lg:py-20 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">


          {/* Quick Links - Mobile optimized */}
          <div className="space-y-3 sm:space-y-6">
            <h3 className="font-serif font-bold text-lg sm:text-xl mb-2 sm:mb-6 text-white">Quick Links</h3>
            <ul className="space-y-1 sm:space-y-3">
              <li>
                <Link to="/" className="group flex items-center text-gray-300 hover:text-white transition-all duration-200 py-1">
                  <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-accentRed mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                  <span className="group-hover:underline text-xs sm:text-sm">Home</span>
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="group flex items-center text-gray-300 hover:text-white transition-all duration-200 py-1">
                  <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-accentRed mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                  <span className="group-hover:underline text-xs sm:text-sm">Catalog</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="group flex items-center text-gray-300 hover:text-white transition-all duration-200 py-1">
                  <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-accentRed mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                  <span className="group-hover:underline text-xs sm:text-sm">Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info - Mobile optimized */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="font-serif font-bold text-lg sm:text-xl mb-4 sm:mb-6 text-white">Contact Us</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3 p-2 sm:p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors duration-200">
                <div className="w-8 h-8 sm:w-8 sm:h-8 bg-gradient-to-br from-primaryBlue to-accentRed rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="h-4 w-4 sm:h-4 sm:w-4 text-white" />
                </div>
                <div className="text-gray-300 text-xs sm:text-sm flex-1">
                  409 Prospect St.<br />
                  High Point, NC 27260<br />
                  United States
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-2 sm:p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors duration-200">
                <div className="w-8 h-8 sm:w-8 sm:h-8 bg-gradient-to-br from-primaryBlue to-accentRed rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-4 w-4 sm:h-4 sm:w-4 text-white" />
                </div>
                <a href="tel:336-782-8283" className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm touch-target flex-1">
                  336-782-8283
                </a>
              </div>
              
              <div className="flex items-center gap-3 p-2 sm:p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors duration-200">
                <div className="w-8 h-8 sm:w-8 sm:h-8 bg-gradient-to-br from-primaryBlue to-accentRed rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-4 w-4 sm:h-4 sm:w-4 text-white" />
                </div>
                <a href="mailto:choicefoods@hotmail.com" className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm break-all touch-target flex-1">
                  choicefoods@hotmail.com
                </a>
              </div>
              
              <div className="p-2 sm:p-3 bg-gradient-to-r from-primaryBlue/20 to-accentRed/20 rounded-lg border border-primaryBlue/30">
                <div className="text-gray-300 text-xs">
                  <strong className="text-white">Hours:</strong> Monday - Friday, 8:00 AM - 4:00 PM
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar - Mobile optimized */}
      <div className="border-t border-gray-700 bg-gray-900/50 backdrop-blur-sm">
        <div className="container-custom py-4 sm:py-6 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm text-gray-400 gap-3 sm:gap-0">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-lg flex items-center justify-center p-1">
                <img 
                  src="/logo.png" 
                  alt="Choice Foods" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span>© 2025 Choice Foods. All rights reserved.</span>
            </div>
            <div className="flex space-x-4 sm:space-x-6">
              <Link to="/privacy-policy" className="hover:text-white transition-colors duration-200 hover:underline touch-target">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-white transition-colors duration-200 hover:underline touch-target">Terms of Service</Link>
              <Link to="/accessibility" className="hover:text-white transition-colors duration-200 hover:underline touch-target">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
