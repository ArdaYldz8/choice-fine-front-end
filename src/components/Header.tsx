import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Catalog",
    href: "/products",
  },
  {
    name: "Contact",
    href: "/contact",
  },
  {
    name: "Member Login",
    href: "/login",
  }
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar - desktop only */}
      <div className="hidden lg:block bg-neutralBlack text-white py-2">
        <div className="container-custom flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <a href="tel:336-782-8283" className="flex items-center space-x-2 hover:text-accentRed transition-colors">
              <Phone className="h-4 w-4" />
              <span>336-782-8283</span>
            </a>
            <a href="mailto:choicefoods@hotmail.com" className="flex items-center space-x-2 hover:text-accentRed transition-colors">
              <Mail className="h-4 w-4" />
              <span>choicefoods@hotmail.com</span>
            </a>
          </div>
          <div className="text-xs">
            Hours: M-F 8am-4pm
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primaryBlue to-accentRed rounded-lg flex items-center justify-center">
              <span className="text-white font-serif font-bold text-xl">CF</span>
            </div>
            <div>
              <div className="font-serif font-bold text-xl text-neutralBlack">Choice Foods</div>
              <div className="text-sm text-primaryBlue">Your Source for Fine Mediterranean Products</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "font-medium transition-colors hover:text-primaryBlue focus-ring px-3 py-2 rounded-lg",
                  isActive(item.href) ? "text-primaryBlue" : "text-neutralBlack"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/contact" className="btn-primary">
              Get In Touch
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden focus-ring p-2 rounded-lg"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-neutralBlack" />
            ) : (
              <Menu className="h-6 w-6 text-neutralBlack" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 py-4 border-t border-gray-200">
            <div className="space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "block px-3 py-2 rounded-lg font-medium transition-colors",
                    isActive(item.href) ? "text-primaryBlue bg-lightGrey" : "text-neutralBlack hover:text-primaryBlue hover:bg-lightGrey"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-3">
                <Link
                  to="/contact"
                  className="block btn-primary text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get In Touch
                </Link>
              </div>
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <a href="tel:336-782-8283" className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>336-782-8283</span>
                </a>
                <a href="mailto:choicefoods@hotmail.com" className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>choicefoods@hotmail.com</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
