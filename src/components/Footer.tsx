import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-neutralBlack text-white">
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primaryBlue to-accentRed rounded-lg flex items-center justify-center">
                <span className="text-white font-serif font-bold">CF</span>
              </div>
              <div>
                <div className="font-serif font-bold text-lg">Choice Foods</div>
                <div className="text-sm text-gray-300">Since 2010</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your source for fine Mediterranean products. As a proud member of the North Carolina community since 2010, 
              we supply our clients with the very best in the Grocery Wholesaler industry.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-accentRed transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-accentRed transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-accentRed transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-4">Our Products</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="text-gray-300">Premium Grains</span></li>
              <li><span className="text-gray-300">Frozen Vegetables</span></li>
              <li><span className="text-gray-300">Imported Beverages</span></li>
              <li><span className="text-gray-300">European Wafers & Cakes</span></li>
              <li><span className="text-gray-300">Dairy Products</span></li>
              <li className="pt-2"><span className="text-primaryBlue text-xs">*Member login required to view catalog</span></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-300 hover:text-accentRed transition-colors">Home</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-accentRed transition-colors">Contact</Link></li>
              <li><Link to="/login" className="text-gray-300 hover:text-accentRed transition-colors">Member Login</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primaryBlue flex-shrink-0" />
                <div className="text-gray-300">
                  409 Prospect St.<br />
                  High Point, NC 27260<br />
                  United States
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primaryBlue" />
                <a href="tel:336-782-8283" className="text-gray-300 hover:text-accentRed transition-colors">
                  336-782-8283
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primaryBlue" />
                <a href="mailto:choicefoods@hotmail.com" className="text-gray-300 hover:text-accentRed transition-colors">
                  choicefoods@hotmail.com
                </a>
              </div>
              <div className="text-gray-300 text-xs">
                Hours: Monday - Friday, 8:00 AM - 4:00 PM
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div>
              © 2025 Choice Foods. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-accentRed transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-accentRed transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-accentRed transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
