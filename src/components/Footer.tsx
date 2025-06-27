
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-midnight text-white">
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal to-olive rounded-lg flex items-center justify-center">
                <span className="text-white font-serif font-bold">CF</span>
              </div>
              <div>
                <div className="font-serif font-bold text-lg">Choice Fine Foods</div>
                <div className="text-sm text-gray-300">Since 1979</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              North Carolina's premier importer and wholesaler of Mediterranean & specialty groceries, 
              serving over 1,400 retailers across the Southeast.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-saffron transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-saffron transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-saffron transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Catalog Links */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-4">Catalog</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products" className="text-gray-300 hover:text-saffron transition-colors">All Products</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-saffron transition-colors">Olive Oils</a></li>
              <li><a href="#" className="text-gray-300 hover:text-saffron transition-colors">Vinegars</a></li>
              <li><a href="#" className="text-gray-300 hover:text-saffron transition-colors">Pasta & Grains</a></li>
              <li><a href="#" className="text-gray-300 hover:text-saffron transition-colors">Preserved Foods</a></li>
              <li><a href="#" className="text-gray-300 hover:text-saffron transition-colors">Spices & Seasonings</a></li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-4">Industries</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/industries" className="text-gray-300 hover:text-saffron transition-colors">All Industries</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-saffron transition-colors">Independent Grocers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-saffron transition-colors">Restaurants</a></li>
              <li><a href="#" className="text-gray-300 hover:text-saffron transition-colors">Specialty Markets</a></li>
              <li><a href="#" className="text-gray-300 hover:text-saffron transition-colors">Distributors</a></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-4">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 text-teal flex-shrink-0" />
                <div className="text-gray-300">
                  1234 Trade Center Drive<br />
                  Charlotte, NC 28202
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-teal" />
                <a href="tel:+1-919-555-0123" className="text-gray-300 hover:text-saffron transition-colors">
                  (919) 555-0123
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-teal" />
                <a href="mailto:sales@choicefinefoods.com" className="text-gray-300 hover:text-saffron transition-colors">
                  sales@choicefinefoods.com
                </a>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-2">Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-teal text-white"
                />
                <button className="px-4 py-2 bg-olive text-white text-sm rounded-r-lg hover:bg-opacity-90 transition-colors">
                  Subscribe
                </button>
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
              © 2025 Choice Fine Foods. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-saffron transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-saffron transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-saffron transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
