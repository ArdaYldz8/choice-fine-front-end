import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, AlertCircle, Shield, Star } from "lucide-react";
import { supabase, getCurrentUserProfile, clearAuthCache } from "../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      console.log('Attempting login with:', email);
      
      // Clear any existing cache before login
      clearAuthCache();
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      console.log('Login response:', { data, error });

      if (error) {
        console.error('Login error:', error);
        throw error;
      }

      if (data.user) {
        console.log('Login successful, user:', data.user);
        setSuccess('Login successful! Redirecting...');
        
        // Check if user is admin and redirect accordingly
        const isAdmin = data.user.app_metadata?.role === 'admin' || data.user.email?.endsWith('@admin.com');
        
        if (isAdmin) {
          console.log('Admin user detected, redirecting to admin panel');
          setTimeout(() => navigate('/admin'), 1000);
        } else {
          // For regular users, check if profile is approved with force refresh
          try {
            console.log('Regular user, checking profile approval...');
            const profile = await getCurrentUserProfile(true); // Force refresh
            console.log('Profile check result:', profile);
            
            if (!profile || !profile.approved) {
              await supabase.auth.signOut();
              clearAuthCache();
              setError('Your account has not been approved yet. Please wait for administrator approval.');
              return;
            }
            console.log('User approved, redirecting to home');
          } catch (err) {
            console.error('Profile check error:', err);
            await supabase.auth.signOut();
            clearAuthCache();
            setError('An error occurred while checking profile. Please try again.');
            return;
          }
          setTimeout(() => navigate('/'), 1000);
        }
      }
    } catch (err) {
      console.error('Catch block error:', err);
      clearAuthCache();
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  }, [email, password, navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      console.log('Attempting signup with:', email, fullName);
      
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            full_name: fullName.trim(),
          }
        }
      });

      console.log('Signup response:', { data, error });

      if (error) {
        console.error('Signup error:', error);
        throw error;
      }

      if (data.user) {
        setSuccess(
          'Registration successful! Your account has been created and sent for administrator approval. ' +
          'You will be able to log in after receiving approval.'
        );
        
        // Reset form
        setEmail('');
        setPassword('');
        setFullName('');
        setIsSignUp(false);
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError(null);
    setSuccess(null);
    setEmail('');
    setPassword('');
    setFullName('');
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-br from-primaryBlue/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-accentRed/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-primaryBlue/10 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }} />
      </div>

      <div className="relative container mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md animate-fade-in">
          {/* Header Section */}
          <div className="text-center mb-10">
            <div className="space-y-3">
              <h1 className="text-4xl font-serif font-bold bg-gradient-to-r from-neutralBlack to-primaryBlue bg-clip-text text-transparent">
                {isSignUp ? 'Join Our Community' : 'Welcome Back'}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed max-w-sm mx-auto">
                {isSignUp 
                  ? 'Apply for your wholesale account and gain access to premium Mediterranean products.'
                  : 'Sign in to your wholesale account and manage your orders with ease.'
                }
              </p>
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 relative overflow-hidden animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {/* Card decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primaryBlue/10 to-transparent rounded-full blur-xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-accentRed/10 to-transparent rounded-full blur-xl" />
            
            <div className="relative">
              {/* Mode Toggle Pills */}
              <div className="flex bg-gray-100 rounded-2xl p-1 mb-8">
                <button
                  onClick={() => !isSignUp && toggleMode()}
                  className={`flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    !isSignUp 
                      ? 'bg-white text-primaryBlue shadow-lg transform scale-[1.02]' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => isSignUp && toggleMode()}
                  className={`flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isSignUp 
                      ? 'bg-white text-primaryBlue shadow-lg transform scale-[1.02]' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-6">
                {isSignUp && (
                  <div className="animate-fade-in">
                    <label className="block text-sm font-semibold text-neutralBlack mb-3">Full Name</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primaryBlue transition-colors duration-200" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primaryBlue/20 focus:border-primaryBlue bg-white/50 backdrop-blur-sm transition-all duration-300 hover:border-gray-300"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className={isSignUp ? "animate-fade-in" : ""} style={{ animationDelay: isSignUp ? '0.1s' : '0' }}>
                  <label className="block text-sm font-semibold text-neutralBlack mb-3">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primaryBlue transition-colors duration-200" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primaryBlue/20 focus:border-primaryBlue bg-white/50 backdrop-blur-sm transition-all duration-300 hover:border-gray-300"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className={isSignUp ? "animate-fade-in" : ""} style={{ animationDelay: isSignUp ? '0.2s' : '0' }}>
                  <label className="block text-sm font-semibold text-neutralBlack mb-3">Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primaryBlue transition-colors duration-200" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-14 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primaryBlue/20 focus:border-primaryBlue bg-white/50 backdrop-blur-sm transition-all duration-300 hover:border-gray-300"
                      placeholder={isSignUp ? "Create a strong password" : "Enter your password"}
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primaryBlue transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {!isSignUp && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center group cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          className="sr-only"
                        />
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-md group-hover:border-primaryBlue transition-colors duration-200"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-2 h-2 bg-primaryBlue rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                        </div>
                      </div>
                      <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-200">Remember me</span>
                    </label>
                    <a href="#" className="text-sm text-primaryBlue hover:text-accentRed transition-colors duration-200 font-medium">
                      Forgot password?
                    </a>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start animate-shake">
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-red-700 text-sm font-medium">{error}</p>
                  </div>
                )}

                {success && (
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 animate-fade-in">
                    <p className="text-green-700 text-sm font-medium flex items-center">
                      <Star className="h-4 w-4 mr-2 fill-current" />
                      {success}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-primaryBlue to-accentRed text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primaryBlue/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      {isSignUp ? 'Sending Application...' : 'Signing In...'}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      {isSignUp ? 'Submit Application' : 'Sign In'}
                      <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                  </p>
                  <button 
                    onClick={toggleMode}
                    className="w-full py-3 px-6 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-300 hover:border-primaryBlue hover:text-primaryBlue hover:bg-primaryBlue/5"
                  >
                    {isSignUp ? 'Sign In Instead' : 'Apply for Membership'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info for Sign Up */}
          {isSignUp && (
            <div className="mt-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-primaryBlue/10 rounded-full blur-xl" />
                <div className="relative">
                  <div className="flex items-center mb-4">
                    <Shield className="h-6 w-6 text-primaryBlue mr-3" />
                    <h3 className="font-serif font-bold text-neutralBlack text-lg">Approval Process</h3>
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Your application will be reviewed and your account activated within 1-2 business days. 
                    We ensure all our wholesale partners meet our quality standards.
                  </p>
                  <p className="text-sm text-gray-600">
                    For urgent matters, please visit our{" "}
                    <Link to="/contact" className="text-primaryBlue hover:text-accentRed transition-colors duration-200 font-medium underline">
                      contact page
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <p>
              By {isSignUp ? 'applying' : 'signing in'}, you agree to our{" "}
              <Link to="/terms-of-service" className="text-primaryBlue hover:text-accentRed transition-colors duration-200 underline">Terms of Service</Link>
              {" "}and{" "}
              <Link to="/privacy-policy" className="text-primaryBlue hover:text-accentRed transition-colors duration-200 underline">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
