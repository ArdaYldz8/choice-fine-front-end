import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { User, Mail, Calendar, Shield, Save, Edit3, Check, X } from "lucide-react";
import { supabase, getCurrentUserProfile } from "../lib/supabase";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: ""
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Check auth status and get profile
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Profile: Checking auth status...');
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Profile: Session:', session);
        
        if (session?.user) {
          console.log('Profile: User found, setting user');
          setUser(session.user);
          
          console.log('Profile: Getting user profile...');
          const userProfile = await getCurrentUserProfile();
          console.log('Profile: User profile:', userProfile);
          
          setProfile(userProfile);
          setFormData({
            full_name: userProfile?.full_name || "",
            email: session.user.email || ""
          });
        } else {
          console.log('Profile: No session found');
        }
      } catch (error) {
        console.error('Profile: Auth check error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user);
        const userProfile = await getCurrentUserProfile();
        setProfile(userProfile);
        setFormData({
          full_name: userProfile?.full_name || "",
          email: session.user.email || ""
        });
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSave = async () => {
    if (!user || !profile) return;

    setIsSaving(true);
    setMessage(null);

    try {
      // Update profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      // Update email if changed
      if (formData.email !== user.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: formData.email
        });

        if (emailError) throw emailError;
      }

      // Refresh profile data
      const updatedProfile = await getCurrentUserProfile();
      setProfile(updatedProfile);
      
      setIsEditing(false);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      console.error('Profile update error:', error);
      setMessage({ 
        type: 'error', 
        text: error.message || 'Failed to update profile. Please try again.' 
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      full_name: profile?.full_name || "",
      email: user?.email || ""
    });
    setIsEditing(false);
    setMessage(null);
  };

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-lightGrey flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primaryBlue mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-lightGrey">
      <div className="container-custom py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-elevation p-6 mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primaryBlue to-accentRed rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-serif font-bold text-neutralBlack">
                  My Profile
                </h1>
                <p className="text-gray-600">
                  Manage your account information and preferences
                </p>
              </div>
            </div>
          </div>

          {/* Message */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              <div className="flex items-center">
                {message.type === 'success' ? (
                  <Check className="h-5 w-5 mr-2" />
                ) : (
                  <X className="h-5 w-5 mr-2" />
                )}
                {message.text}
              </div>
            </div>
          )}

          {/* Profile Information */}
          <div className="bg-white rounded-xl shadow-elevation p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-serif font-bold text-neutralBlack">
                Profile Information
              </h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-outline flex items-center"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="btn-primary flex items-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="btn-outline"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-neutralBlack mb-2">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryBlue focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                ) : (
                  <div className="flex items-center space-x-2 text-gray-700">
                    <User className="h-4 w-4" />
                    <span>{profile?.full_name || "Not provided"}</span>
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-neutralBlack mb-2">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryBlue focus:border-transparent"
                    placeholder="Enter your email"
                  />
                ) : (
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Mail className="h-4 w-4" />
                    <span>{user?.email}</span>
                  </div>
                )}
              </div>

              {/* Account Status */}
              <div>
                <label className="block text-sm font-medium text-neutralBlack mb-2">
                  Account Status
                </label>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    profile?.approved ? 'bg-green-500' : 'bg-yellow-500'
                  }`} />
                  <span className={`font-medium ${
                    profile?.approved ? 'text-green-700' : 'text-yellow-700'
                  }`}>
                    {profile?.approved ? 'Approved' : 'Pending Approval'}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {profile?.approved 
                    ? 'Your account has been approved and you have full access to our catalog.'
                    : 'Your account is under review. You\'ll gain access to our catalog once approved.'
                  }
                </p>
              </div>

              {/* Member Since */}
              <div>
                <label className="block text-sm font-medium text-neutralBlack mb-2">
                  Member Since
                </label>
                <div className="flex items-center space-x-2 text-gray-700">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(profile?.created_at || user?.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-white rounded-xl shadow-elevation p-6">
            <h2 className="text-xl font-serif font-bold text-neutralBlack mb-4">
              Account Actions
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-medium text-neutralBlack">Change Password</h3>
                  <p className="text-sm text-gray-500">Update your account password</p>
                </div>
                <button className="btn-outline">
                  Change Password
                </button>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                <div>
                  <h3 className="font-medium text-red-700">Delete Account</h3>
                  <p className="text-sm text-red-500">Permanently delete your account and data</p>
                </div>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 