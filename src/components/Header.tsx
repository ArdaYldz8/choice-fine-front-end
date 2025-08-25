import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail } from "lucide-react";
import { cn } from "../lib/utils";

const navigation = [
  {
    name: "Home",
    href: "/"
  },
  {
    name: "Catalog",
    href: "/catalog"
  }
];

const desktopNavigation = [
  ...navigation,
  {
    name: "Shop",
    href: "https://www.choicefinefoods.com/shop-3",
    external: true
  }
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // isActive function for navigation
  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  // Handle scroll event for navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50); // Transparent after 50px scroll
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Wix embed cleanup - prevent button stacking
  useEffect(() => {
    // Check if we're in a Wix iframe
    const isWixEmbed = () => {
      try {
        return window.parent !== window && 
               (document.referrer.includes('wix.com') || 
                window.location !== window.parent.location);
      } catch (e) {
        return true; // Cross-origin error indicates iframe
      }
    };

    if (isWixEmbed()) {
      // Clean up duplicate Wix buttons on route changes
      const cleanupWixButtons = () => {
        // Remove stacked shopping cart and profile buttons
        const wixButtonSelectors = [
          '[data-hook="shopping-cart-icon"]',
          '[data-hook="profile-menu"]',
          '[class*="cart-button"]',
          '[class*="profile-button"]',
          'button[aria-label*="cart"]',
          'button[aria-label*="profile"]',
          '[id*="cart"]',
          '[id*="profile"]'
        ];

        wixButtonSelectors.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          // Keep only the first instance, remove duplicates
          for (let i = 1; i < elements.length; i++) {
            elements[i].remove();
          }
        });
      };

      // Run cleanup immediately
      cleanupWixButtons();
      
      // Run cleanup after route changes
      const timeoutId = setTimeout(cleanupWixButtons, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [location.pathname]); // Run on route changes


  return (
    <header className={cn(
      "shadow-sm fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300",
      isScrolled 
        ? "bg-white/60 backdrop-blur-lg" 
        : "bg-white"
    )}>
      {/* Main navigation */}
      <nav className="w-full" style={{ padding: '0.25rem 1rem' }}>
        {/* Mobile Layout - Menu button centered at top */}
        <div className="lg:hidden flex justify-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="focus-ring p-3 rounded-xl bg-white/80 shadow-md"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-neutralBlack" />
            ) : (
              <Menu className="h-6 w-6 text-neutralBlack" />
            )}
          </button>
        </div>

        {/* Desktop Layout - Logo, Navigation, and Auth */}
        <div className="hidden lg:flex items-center justify-between px-4 w-full">
          {/* Logo - Desktop only - Left with margin */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center ml-8">
              <img 
                src="/logo.png" 
                alt="Choice Foods Logo" 
                className="h-24 md:h-28 lg:h-32 w-auto object-contain hover:scale-105 transition-transform duration-200"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="flex items-center justify-center space-x-12 flex-1">
            {desktopNavigation.map((item) => (
              item.external ? (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "font-medium transition-colors hover:text-primaryBlue focus-ring px-4 py-2 rounded-lg text-lg text-neutralBlack"
                  )}
                >
                  {item.name}
                </a>
              ) : item.disabled ? (
                <span
                  key={item.name}
                  className={cn(
                    "font-medium px-4 py-2 rounded-lg text-gray-400 cursor-not-allowed text-lg"
                  )}
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "font-medium transition-colors hover:text-primaryBlue focus-ring px-4 py-2 rounded-lg text-lg",
                    isActive(item.href) ? "text-primaryBlue" : "text-neutralBlack"
                  )}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          {/* Right spacer for balance */}
          <div className="flex-shrink-0 w-40">
            {/* Auth Section Placeholder - for future login functionality */}
          </div>

        </div>

        {/* Mobile Navigation - Enhanced */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 py-6 border-t border-gray-200/50 bg-white/95 backdrop-blur-md rounded-xl shadow-xl mx-4">
            <div className="space-y-2 px-6">
              {desktopNavigation.map((item) => (
                item.external ? (
                  <a
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center px-4 py-4 rounded-xl font-medium transition-colors text-lg touch-target text-neutralBlack hover:text-primaryBlue hover:bg-lightGrey"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ) : item.disabled ? (
                  <span
                    key={item.name}
                    className={cn(
                      "flex items-center px-4 py-4 rounded-xl font-medium text-lg touch-target text-gray-400 cursor-not-allowed"
                    )}
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center px-4 py-4 rounded-xl font-medium transition-colors text-lg touch-target",
                      isActive(item.href) ? "text-primaryBlue bg-primaryBlue/10 shadow-sm" : "text-neutralBlack hover:text-primaryBlue hover:bg-lightGrey"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              
              {/* Mobile Contact Info */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <div className="px-4">
                  <h4 className="text-sm font-semibold text-neutralBlack mb-3">Contact</h4>
                  <div className="space-y-2">
                    <a href="tel:336-782-8283" className="flex items-center space-x-3 text-sm text-gray-600 hover:text-primaryBlue transition-colors touch-target">
                      <Phone className="h-4 w-4" />
                      <span>336-782-8283</span>
                    </a>
                    <a href="mailto:choicefoods@hotmail.com" className="flex items-center space-x-3 text-sm text-gray-600 hover:text-primaryBlue transition-colors touch-target">
                      <Mail className="h-4 w-4" />
                      <span>choicefoods@hotmail.com</span>
                    </a>
                  </div>
                </div>
                <Link
                  to="/contact"
                  className="block btn-primary text-center mx-4 touch-target"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get In Touch
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
