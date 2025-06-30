import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { User, Mail, Calendar, Shield, Save, Edit3, Check, X, Package, Clock, Truck, ShoppingBag } from "lucide-react";
import { supabase, getCurrentUserProfile } from "../lib/supabase";
import { useOrders } from "../hooks/useOrders";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";

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

  // Add orders hook for user's orders - AT THE TOP LEVEL
  const userOrders = useOrders({
    userId: user?.id,
    pageSize: 10,
    enabled: !!user?.id && !isLoading // Wait for user to be loaded and auth check complete
  });

  // Debug user orders
  useEffect(() => {
    console.log('Profile: User orders state:', {
      userId: user?.id,
      isLoading: isLoading,
      enabled: !!user?.id && !isLoading,
      ordersLoading: userOrders.loading,
      ordersCount: userOrders.orders.length,
      ordersError: userOrders.error
    });
  }, [user?.id, isLoading, userOrders.loading, userOrders.orders.length, userOrders.error]);

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
      console.log('Profile: Auth state changed:', event, session?.user?.id);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'processing': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'shipped': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200'
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />
      case 'confirmed': return <Check className="h-4 w-4" />
      case 'processing': return <Package className="h-4 w-4" />
      case 'shipped': return <Truck className="h-4 w-4" />
      case 'delivered': return <Check className="h-4 w-4" />
      case 'cancelled': return <X className="h-4 w-4" />
      default: return <Package className="h-4 w-4" />
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pending'
      case 'confirmed': return 'Confirmed'
      case 'processing': return 'Processing'
      case 'shipped': return 'Shipped'
      case 'delivered': return 'Delivered'
      case 'cancelled': return 'Cancelled'
      default: return status
    }
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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-elevation p-6 mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primaryBlue to-accentRed rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-serif font-bold text-neutralBlack">
                  My Account
                </h1>
                <p className="text-gray-600">
                  Manage your account information and orders
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

          {/* Tabs for Profile and Orders */}
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile Information
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                My Orders ({userOrders.orders.length})
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
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
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <ShoppingBag className="h-5 w-5" />
                        My Orders
                      </CardTitle>
                      <CardDescription>
                        Track your orders and delivery status
                      </CardDescription>
                    </div>
                    {userOrders.orders.length > 0 && (
                      <Button 
                        onClick={userOrders.refetch}
                        variant="outline" 
                        size="sm"
                        disabled={userOrders.loading}
                      >
                        <Package className={`h-4 w-4 mr-2 ${userOrders.loading ? 'animate-spin' : ''}`} />
                        Refresh
                      </Button>
                    )}
                    {/* Debug Button */}
                    <Button 
                      onClick={() => {
                        console.log('Manual refetch clicked', { 
                          userId: user?.id, 
                          enabled: !!user?.id && !isLoading 
                        });
                        userOrders.refetch();
                      }}
                      variant="outline" 
                      size="sm"
                      disabled={userOrders.loading}
                    >
                      <Package className={`h-4 w-4 mr-2 ${userOrders.loading ? 'animate-spin' : ''}`} />
                      Debug Refresh
                    </Button>
                    
                    {/* Cache Clear Button */}
                    <Button 
                      onClick={() => {
                        console.log('Cache clear clicked');
                        // Clear all cache
                        if (window.localStorage) {
                          const keys = Object.keys(window.localStorage);
                          keys.forEach(key => {
                            if (key.includes('orders') || key.includes('cache')) {
                              window.localStorage.removeItem(key);
                            }
                          });
                        }
                        // Force refetch
                        setTimeout(() => {
                          userOrders.refetch();
                        }, 100);
                      }}
                      variant="outline" 
                      size="sm"
                      className="bg-red-50 hover:bg-red-100"
                    >
                      🗑️ Clear Cache
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {userOrders.loading && user?.id ? (
                    <div className="space-y-6">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div className="space-y-2">
                              <Skeleton className="h-4 w-32" />
                              <Skeleton className="h-3 w-24" />
                            </div>
                            <Skeleton className="h-6 w-20" />
                          </div>
                          <Skeleton className="h-16 w-full" />
                        </div>
                      ))}
                    </div>
                  ) : userOrders.error ? (
                    <div className="text-center py-12">
                      <X className="h-16 w-16 mx-auto text-red-400 mb-4" />
                      <h3 className="text-xl font-medium text-red-600 mb-2">
                        Error Occurred
                      </h3>
                      <p className="text-red-500 mb-6">
                        {userOrders.error}
                      </p>
                      <Button 
                        onClick={() => {
                          console.log('Error retry clicked');
                          userOrders.refetch();
                        }}
                        variant="outline"
                      >
                        Try Again
                      </Button>
                    </div>
                  ) : userOrders.orders.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-xl font-medium text-gray-600 mb-2">
                        No orders yet
                      </h3>
                      <p className="text-gray-500 mb-6">
                        Browse our products to place your first order.
                      </p>
                      <Button 
                        onClick={() => window.location.href = '/products'}
                        className="btn-primary"
                      >
                        Browse Products
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {userOrders.orders.map((order) => (
                        <div 
                          key={order.id} 
                          className="border rounded-xl p-6 hover:shadow-md transition-shadow bg-gradient-to-r from-white to-gray-50"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-3">
                                <h3 className="font-semibold text-lg">
                                  Order #{order.id?.slice(-8)}
                                </h3>
                                <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                                  {getStatusIcon(order.status)}
                                  {getStatusText(order.status)}
                                </Badge>
                              </div>
                              <div className="text-sm text-gray-600 space-y-1">
                                <p className="flex items-center gap-2">
                                  <Package className="h-4 w-4" />
                                  Total {order.total_items} items
                                </p>
                                <p className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4" />
                                  {new Date(order.created_at || '').toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </p>
                                {order.notes && (
                                  <p className="text-gray-500 italic">Note: {order.notes}</p>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {/* Order Items */}
                          <div className="bg-white rounded-lg border p-4 space-y-3">
                            <h4 className="font-medium text-gray-800 flex items-center gap-2">
                              <ShoppingBag className="h-4 w-4" />
                              Order Details
                            </h4>
                            <div className="grid gap-2">
                              {order.items.map((item, index) => (
                                <div 
                                  key={index} 
                                  className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                  <div>
                                    <span className="font-medium">{item.name}</span>
                                    <span className="text-gray-500 ml-2">({item.packSize})</span>
                                  </div>
                                  <div className="text-right">
                                    <span className="font-medium">Qty: {item.quantity}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Status Timeline - FIXED */}
                          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <h5 className="font-medium text-gray-800 mb-3">Order Status</h5>
                            
                            {/* Timeline Container - Fixed Layout */}
                            <div className="relative">
                              <div className="flex items-center justify-between mb-2">
                                {['pending', 'confirmed', 'processing', 'shipped', 'delivered'].map((status, index) => {
                                  const isActive = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'].indexOf(order.status) >= index;
                                  const isCurrentStatus = order.status === status;
                                  
                                  return (
                                    <div key={status} className="flex flex-col items-center relative z-10">
                                      <div className={`w-4 h-4 rounded-full border-2 ${
                                        isActive 
                                          ? 'bg-primaryBlue border-primaryBlue' 
                                          : 'bg-white border-gray-300'
                                      } ${isCurrentStatus ? 'ring-4 ring-blue-100' : ''}`} />
                                    </div>
                                  );
                                })}
                              </div>
                              
                              {/* Connecting Line */}
                              <div className="absolute top-2 left-2 right-2 h-0.5 bg-gray-300 -z-0">
                                <div 
                                  className="h-full bg-primaryBlue transition-all duration-500"
                                  style={{
                                    width: `${((['pending', 'confirmed', 'processing', 'shipped', 'delivered'].indexOf(order.status)) / 4) * 100}%`
                                  }}
                                />
                              </div>
                              
                              {/* Status Labels */}
                              <div className="flex justify-between text-xs text-gray-500 mt-2">
                                <span className="text-center w-16">Pending</span>
                                <span className="text-center w-16">Confirmed</span>
                                <span className="text-center w-16">Processing</span>
                                <span className="text-center w-16">Shipped</span>
                                <span className="text-center w-16">Delivered</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Load More Orders */}
                      {userOrders.hasNextPage && !userOrders.loading && (
                        <div className="text-center pt-4">
                          <Button 
                            onClick={userOrders.loadNextPage}
                            variant="outline"
                            size="sm"
                          >
                            Load More Orders
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
} 