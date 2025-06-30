import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Phone, Mail, User, LogOut, Settings, ShieldCheck, ChevronDown, ShoppingCart } from "lucide-react";
import { cn } from "../lib/utils";
import { supabase, checkAdminRole, getCurrentUserProfile, clearAuthCache } from "../lib/supabase";
import { useCart } from "../contexts/CartContext";
import { clearAllCaches } from "../lib/cache-utils";

const navigation = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Catalog",
    href: "/catalog",
  }
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastProfileCheck, setLastProfileCheck] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { state: cartState, toggleCart } = useCart();

  // Memoized isActive function for better performance
  const isActive = useCallback((href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  }, [location.pathname]);

  // Force refresh profile data every 30 seconds
  const forceRefreshProfile = useCallback(async () => {
    const now = Date.now();
    if (now - lastProfileCheck > 30000) { // 30 seconds cache
      try {
        if (user) {
          const [adminStatus, userProfile] = await Promise.all([
            checkAdminRole(),
            getCurrentUserProfile()
          ]);
          setIsAdmin(adminStatus);
          setProfile(userProfile);
          setLastProfileCheck(now);
          console.log('Profile refreshed:', { adminStatus, approved: userProfile?.approved });
        }
      } catch (error) {
        console.error('Profile refresh error:', error);
      }
    }
  }, [user, lastProfileCheck]);

  // Check auth status with improved caching and error handling
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setUser(session.user);
          
          // Parallel execution for better performance
          const [adminStatus, userProfile] = await Promise.all([
            checkAdminRole(),
            getCurrentUserProfile()
          ]);
          
          setIsAdmin(adminStatus);
          setProfile(userProfile);
          setLastProfileCheck(Date.now());
          
          console.log('Auth check completed:', { 
            email: session.user.email, 
            isAdmin: adminStatus, 
            approved: userProfile?.approved,
            metadata: session.user.app_metadata,
            profileData: userProfile
          });
        } else {
          setUser(null);
          setIsAdmin(false);
          setProfile(null);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        // Clear state on error
        setUser(null);
        setIsAdmin(false);
        setProfile(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes - FIXED: Avoid deadlock by using setTimeout
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state change:', event, session?.user?.email);
      
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user);
        setIsLoading(true);
        
        // CRITICAL FIX: Use setTimeout to avoid Supabase deadlock
        setTimeout(async () => {
          try {
            const [adminStatus, userProfile] = await Promise.all([
              checkAdminRole(),
              getCurrentUserProfile()
            ]);
            
            setIsAdmin(adminStatus);
            setProfile(userProfile);
            setLastProfileCheck(Date.now());
            
            console.log('Profile loaded after auth change:', {
              isAdmin: adminStatus,
              approved: userProfile?.approved,
              email: session.user.email
            });
          } catch (error) {
            console.error('Sign in profile fetch error:', error);
          } finally {
            setIsLoading(false);
          }
        }, 0);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsAdmin(false);
        setProfile(null);
        setLastProfileCheck(0);
        setIsLoading(false);
        
        // Clear any cached data
        localStorage.removeItem('supabase.auth.token');
        sessionStorage.clear();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Auto-refresh profile data periodically
  useEffect(() => {
    if (user && !isLoading) {
      const interval = setInterval(forceRefreshProfile, 30000); // Every 30 seconds
      return () => clearInterval(interval);
    }
  }, [user, isLoading, forceRefreshProfile]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = useCallback(async () => {
    try {
      console.log('Header: Starting optimized sign out...');
      
      // Clear local state immediately
      setUser(null);
      setIsAdmin(false);
      setProfile(null);
      setLastProfileCheck(0);
      setIsMobileMenuOpen(false);
      setIsUserMenuOpen(false);
      
      // Clear auth cache
      clearAuthCache();
      
      // Clear all browser caches
      await clearAllCaches();
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      if (error) {
        console.error('Supabase sign out error:', error);
      }
      
      console.log('Header: Sign out successful, redirecting...');
      
      // Force complete page reload to clear all state
      window.location.replace('/');
      
    } catch (error) {
      console.error('Header: Sign out error:', error);
      // Force navigation even on error
      window.location.replace('/');
    }
  }, []);

  return (
    <header className="bg-white/60 backdrop-blur-lg shadow-sm fixed top-0 left-0 right-0 w-full z-50">
      {/* Top bar - desktop only */}
      <div className="hidden lg:block bg-neutralBlack/90 backdrop-blur-md text-white py-2">
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
          <Link to="/" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="Choice Foods Logo" 
              className="h-16 w-auto object-contain hover:scale-105 transition-transform duration-200"
            />
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
            {/* Sadece üyeler için Shop */}
            {user && profile?.approved && (
              <Link
                to="/products"
                className={cn(
                  "font-medium transition-colors hover:text-primaryBlue focus-ring px-3 py-2 rounded-lg",
                  isActive("/products") ? "text-primaryBlue" : "text-neutralBlack"
                )}
              >
                Shop
              </Link>
            )}
          </div>

          {/* Auth Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {user && profile?.approved && (
              <button
                onClick={toggleCart}
                className="relative p-2 text-neutralBlack hover:text-primaryBlue transition-colors focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:ring-offset-2 rounded-lg"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartState.totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accentRed text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartState.totalItems}
                  </span>
                )}
              </button>
            )}
            {user ? (
              <div className="flex items-center space-x-4">
                {/* User Menu Dropdown */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => {
                      console.log('Header: User menu button clicked, current state:', isUserMenuOpen);
                      setIsUserMenuOpen(!isUserMenuOpen);
                    }}
                    className="flex items-center space-x-2 text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:ring-offset-2"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-primaryBlue to-accentRed rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-neutralBlack">
                        {profile?.full_name || user.email?.split('@')[0]}
                      </div>
                      <div className="text-xs text-gray-500">
                        {profile?.approved ? 'Approved Member' : 'Pending Approval'}
                      </div>
                    </div>
                    <ChevronDown className={cn(
                      "h-4 w-4 text-gray-400 transition-transform",
                      isUserMenuOpen && "rotate-180"
                    )} />
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white/90 backdrop-blur-md rounded-lg shadow-elevation border border-gray-200/50 py-2 z-50">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="font-medium text-neutralBlack">
                          {profile?.full_name || 'User'}
                        </div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                        <div className="flex items-center mt-2">
                          <div className={cn(
                            "w-2 h-2 rounded-full mr-2",
                            profile?.approved ? "bg-green-500" : "bg-yellow-500"
                          )} />
                          <span className="text-xs text-gray-500">
                            {profile?.approved ? 'Account Approved' : 'Pending Approval'}
                          </span>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => {
                            console.log('Header: Profile link clicked');
                            setIsUserMenuOpen(false);
                          }}
                        >
                          <Settings className="h-4 w-4 mr-3" />
                          My Profile
                        </Link>
                        
                        {isAdmin && (
                          <Link
                            to="/admin"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <ShieldCheck className="h-4 w-4 mr-3" />
                            Admin Panel
                          </Link>
                        )}
                        
                        <div className="border-t border-gray-100 my-1"></div>
                        
                        <button
                          onClick={handleSignOut}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="h-4 w-4 mr-3" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-neutralBlack hover:text-primaryBlue transition-colors">
                  Member Login
                </Link>
              </div>
            )}
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
          <div className="lg:hidden mt-4 py-4 border-t border-gray-200/50 bg-white/80 backdrop-blur-md rounded-lg mx-4">
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
              
              {/* Mobile - Sadece üyeler için Shop */}
              {user && profile?.approved && (
                <Link
                  to="/products"
                  className={cn(
                    "block px-3 py-2 rounded-lg font-medium transition-colors",
                    isActive("/products") ? "text-primaryBlue bg-lightGrey" : "text-neutralBlack hover:text-primaryBlue hover:bg-lightGrey"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Shop
                </Link>
              )}
              
              {/* Mobile Auth Section */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                {user && profile?.approved && (
                  <button
                    onClick={() => {
                      toggleCart();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <ShoppingCart className="h-4 w-4" />
                      <span>Shopping Cart</span>
                    </div>
                    {cartState.totalItems > 0 && (
                      <span className="bg-accentRed text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartState.totalItems}
                      </span>
                    )}
                  </button>
                )}
                
                {user ? (
                  <>
                    <div className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-gradient-to-br from-primaryBlue to-accentRed rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-neutralBlack">
                          {profile?.full_name || user.email?.split('@')[0]}
                        </div>
                        <div className="text-xs text-gray-500">
                          {profile?.approved ? 'Approved Member' : 'Pending Approval'}
                        </div>
                      </div>
                    </div>
                    
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Settings className="h-4 w-4" />
                      <span>My Profile</span>
                    </Link>
                    
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <ShieldCheck className="h-4 w-4" />
                        <span>Admin Panel</span>
                      </Link>
                    )}
                    
                    <button
                      onClick={handleSignOut}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block btn-outline text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Member Login
                  </Link>
                )}
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
