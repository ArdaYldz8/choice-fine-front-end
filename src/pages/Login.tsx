import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Login attempt:", { email, password });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-lightGrey">
      <div className="container-custom py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-primaryBlue to-accentRed rounded-lg flex items-center justify-center">
                <span className="text-white font-serif font-bold text-xl">CF</span>
              </div>
              <div>
                <div className="font-serif font-bold text-xl text-neutralBlack">Choice Foods</div>
                <div className="text-sm text-primaryBlue">Your Source for Fine Mediterranean Products</div>
              </div>
            </Link>
            
            <h1 className="text-3xl font-serif font-bold text-neutralBlack mb-4">
              Member Login
            </h1>
            <p className="text-gray-600">
              Sign in to access your wholesale account and manage your orders.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-elevation">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutralBlack mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryBlue focus:border-transparent"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutralBlack mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryBlue focus:border-transparent"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primaryBlue focus:ring-primaryBlue"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-primaryBlue hover:text-neutralBlack transition-colors">
                  Forgot your password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-gray-600 mb-4">Don't have a member account?</p>
                <Link to="/contact" className="btn-outline w-full">
                  Request Membership
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="bg-primaryBlue/10 border border-primaryBlue/20 rounded-lg p-4">
              <h3 className="font-semibold text-neutralBlack mb-2">New to Choice Foods?</h3>
              <p className="text-sm text-gray-600 mb-3">
                This member portal is for existing wholesale customers. To become a customer and access our premium Mediterranean products, 
                please contact our team.
              </p>
              <Link to="/contact" className="text-primaryBlue font-medium hover:text-neutralBlack transition-colors">
                Contact us today
              </Link>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              By signing in, you agree to our{" "}
              <a href="#" className="text-primaryBlue hover:text-neutralBlack transition-colors">Terms of Service</a>
              {" "}and{" "}
              <a href="#" className="text-primaryBlue hover:text-neutralBlack transition-colors">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
