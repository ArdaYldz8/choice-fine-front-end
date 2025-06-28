import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, AlertCircle } from "lucide-react";
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
        setSuccess('Giriş başarılı! Yönlendiriliyorsunuz...');
        
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
              setError('Hesabınız henüz onaylanmamış. Lütfen yönetici onayını bekleyin.');
              return;
            }
            console.log('User approved, redirecting to home');
          } catch (err) {
            console.error('Profile check error:', err);
            await supabase.auth.signOut();
            clearAuthCache();
            setError('Profil kontrol edilirken hata oluştu. Lütfen tekrar deneyin.');
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
          'Kayıt başarılı! Hesabınız oluşturuldu ve yönetici onayı için gönderildi. ' +
          'Onay aldıktan sonra giriş yapabileceksiniz.'
        );
        
        // Reset form
        setEmail('');
        setPassword('');
        setFullName('');
        setIsSignUp(false);
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError(err instanceof Error ? err.message : 'Kayıt başarısız');
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
              {isSignUp ? 'Üye Olmak İçin Başvur' : 'Üye Girişi'}
            </h1>
            <p className="text-gray-600">
              {isSignUp 
                ? 'Wholesale hesabınız için başvuru yapın. Onay sürecinden sonra giriş yapabileceksiniz.'
                : 'Wholesale hesabınıza giriş yapın ve siparişlerinizi yönetin.'
              }
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-elevation">
            <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-6">
              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-neutralBlack mb-2">Ad Soyad</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryBlue focus:border-transparent"
                      placeholder="Adınız ve Soyadınız"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-neutralBlack mb-2">Email Adresi</label>
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
                <label className="block text-sm font-medium text-neutralBlack mb-2">Şifre</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryBlue focus:border-transparent"
                    placeholder={isSignUp ? "Güçlü bir şifre seçin" : "Şifrenizi girin"}
                    required
                    minLength={6}
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

              {!isSignUp && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primaryBlue focus:ring-primaryBlue"
                    />
                    <span className="ml-2 text-sm text-gray-600">Beni hatırla</span>
                  </label>
                  <a href="#" className="text-sm text-primaryBlue hover:text-neutralBlack transition-colors">
                    Şifrenizi mi unuttunuz?
                  </a>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-green-600 text-sm">{success}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {isSignUp ? 'Başvuru gönderiliyor...' : 'Giriş yapılıyor...'}
                  </>
                ) : (
                  <>
                    {isSignUp ? 'Başvuru Gönder' : 'Giriş Yap'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  {isSignUp ? 'Zaten hesabınız var mı?' : 'Hesabınız yok mu?'}
                </p>
                <button 
                  onClick={toggleMode}
                  className="btn-outline w-full"
                >
                  {isSignUp ? 'Giriş Yapmak için Tıklayın' : 'Üye Olmak İçin Başvurun'}
                </button>
              </div>
            </div>
          </div>

          {isSignUp && (
            <div className="mt-8 text-center">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-neutralBlack mb-2">Onay Süreci Hakkında</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Başvurunuz incelendikten sonra, hesabınız aktif hale getirilecektir. 
                  Bu süreç genellikle 1-2 iş günü sürmektedir.
                </p>
                <p className="text-xs text-gray-500">
                  Acil durumlar için: <Link to="/contact" className="text-primaryBlue hover:text-neutralBlack transition-colors">iletişim sayfamızı</Link> ziyaret edin.
                </p>
              </div>
            </div>
          )}

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              {isSignUp ? 'Başvuru yaparak' : 'Giriş yaparak'}{" "}
              <a href="#" className="text-primaryBlue hover:text-neutralBlack transition-colors">Hizmet Şartlarımızı</a>
              {" "}ve{" "}
              <a href="#" className="text-primaryBlue hover:text-neutralBlack transition-colors">Gizlilik Politikamızı</a>
              {" "}kabul etmiş olursunuz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
