
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  {
    name: "Products",
    href: "/products",
    megaMenu: {
      categories: ["Olive Oils", "Vinegars", "Pasta", "Sauces", "Spices", "Preserved Foods"],
      featured: ["New Arrivals", "Bestsellers", "Seasonal Items"]
    }
  },
  {
    name: "Industries",
    href: "/industries",
    megaMenu: {
      categories: ["Independent Grocers", "Restaurants", "Specialty Markets", "Distributors"],
      featured: ["Case Studies", "Success Stories"]
    }
  },
  {
    name: "Resources",
    href: "/resources",
    megaMenu: {
      categories: ["Recipes", "Articles", "Guides", "Certifications"],
      featured: ["Featured Recipes", "Industry News"]
    }
  },
  {
    name: "Company",
    href: "/about",
    megaMenu: {
      categories: ["About Us", "Contact", "Careers", "Sustainability"],
      featured: ["Our Story", "Leadership Team"]
    }
  }
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar - desktop only */}
      <div className="hidden lg:block bg-midnight text-white py-2">
        <div className="container-custom flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <a href="tel:+1-919-555-0123" className="flex items-center space-x-2 hover:text-saffron transition-colors">
              <Phone className="h-4 w-4" />
              <span>(919) 555-0123</span>
            </a>
            <a href="mailto:sales@choicefinefoods.com" className="flex items-center space-x-2 hover:text-saffron transition-colors">
              <Mail className="h-4 w-4" />
              <span>sales@choicefinefoods.com</span>
            </a>
          </div>
          <div className="text-xs">
            Serving retailers across the Southeast since 1979
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-teal to-olive rounded-lg flex items-center justify-center">
              <span className="text-white font-serif font-bold text-xl">CF</span>
            </div>
            <div>
              <div className="font-serif font-bold text-xl text-midnight">Choice Fine Foods</div>
              <div className="text-sm text-teal">Mediterranean & Specialty Groceries</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setActiveMegaMenu(item.name)}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <Link
                  to={item.href}
                  className={cn(
                    "font-medium transition-colors hover:text-teal focus-ring px-3 py-2 rounded-lg",
                    isActive(item.href) ? "text-teal" : "text-midnight"
                  )}
                >
                  {item.name}
                </Link>

                {/* Mega Menu */}
                {activeMegaMenu === item.name && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-96 bg-white rounded-xl shadow-elevation border p-6 z-50">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-serif font-bold text-midnight mb-3">Categories</h3>
                        <ul className="space-y-2">
                          {item.megaMenu.categories.map((category) => (
                            <li key={category}>
                              <a href="#" className="text-sm text-gray-600 hover:text-teal transition-colors">
                                {category}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-midnight mb-3">Featured</h3>
                        <ul className="space-y-2">
                          {item.megaMenu.featured.map((featured) => (
                            <li key={featured}>
                              <a href="#" className="text-sm text-gray-600 hover:text-teal transition-colors">
                                {featured}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/supplier" className="btn-outline">
              Become a Supplier
            </Link>
            <Link to="/login" className="btn-primary">
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden focus-ring p-2 rounded-lg"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-midnight" />
            ) : (
              <Menu className="h-6 w-6 text-midnight" />
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
                    isActive(item.href) ? "text-teal bg-soft-bg" : "text-midnight hover:text-teal hover:bg-soft-bg"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-3">
                <Link
                  to="/supplier"
                  className="block btn-outline text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Become a Supplier
                </Link>
                <Link
                  to="/login"
                  className="block btn-primary text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
              </div>
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <a href="tel:+1-919-555-0123" className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>(919) 555-0123</span>
                </a>
                <a href="mailto:sales@choicefinefoods.com" className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>sales@choicefinefoods.com</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
