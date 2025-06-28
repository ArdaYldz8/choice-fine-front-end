import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client with service role key (yönetici istemcisi)
export const supabaseAdmin = supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    })
  : null

// Database types for TypeScript
export interface Product {
  id: string
  quickbooks_id?: string
  name: string
  description?: string
  price?: number
  cost?: number
  quantity_on_hand: number
  sku?: string
  category?: string
  active: boolean
  created_at: string
  updated_at: string
}

export interface SyncLog {
  id: string
  sync_type: string
  status: string
  message?: string
  synced_at: string
}

// Profile interface for admin-approval system (profil arayüzü)
export interface Profile {
  id: string
  full_name: string
  email?: string
  approved: boolean
  created_at: string
  updated_at: string
}

// Cache for auth data to reduce API calls
let authCache: { user: any | null; timestamp: number } = { user: null, timestamp: 0 };
let profileCache: { profile: Profile | null; timestamp: number; userId: string | null } = { 
  profile: null, 
  timestamp: 0, 
  userId: null 
};

const CACHE_DURATION = 30000; // 30 seconds

// Clear cache function
export const clearAuthCache = () => {
  authCache = { user: null, timestamp: 0 };
  profileCache = { profile: null, timestamp: 0, userId: null };
};

// Auth helper functions (kimlik doğrulama yardımcı fonksiyonları)
export const checkAdminRole = async (forceRefresh = false): Promise<boolean> => {
  try {
    const now = Date.now();
    
    // Use cached user if available and not expired
    let user = null;
    if (!forceRefresh && authCache.user && (now - authCache.timestamp < CACHE_DURATION)) {
      user = authCache.user;
    } else {
      const { data: { user: freshUser }, error } = await supabase.auth.getUser();
      if (error) throw error;
      
      user = freshUser;
      authCache = { user, timestamp: now };
    }
    
    if (!user) return false;
    
    const isAdmin = user.app_metadata?.role === 'admin' || 
                   user.email?.endsWith('@admin.com'); // Fallback domain check
    
    console.log('Admin check:', { email: user.email, isAdmin, metadata: user.app_metadata });
    return isAdmin;
  } catch (error) {
    console.error('Error checking admin role:', error);
    clearAuthCache(); // Clear cache on error
    return false;
  }
}

// Get current user profile (mevcut kullanıcı profilini al)
export const getCurrentUserProfile = async (forceRefresh = false): Promise<Profile | null> => {
  try {
    const now = Date.now();
    
    // Get user first (with caching)
    let user = null;
    if (!forceRefresh && authCache.user && (now - authCache.timestamp < CACHE_DURATION)) {
      user = authCache.user;
    } else {
      const { data: { user: freshUser }, error } = await supabase.auth.getUser();
      if (error) throw error;
      
      user = freshUser;
      authCache = { user, timestamp: now };
    }
    
    if (!user) {
      clearAuthCache();
      return null;
    }

    // Use cached profile if available and not expired
    if (!forceRefresh && 
        profileCache.profile && 
        profileCache.userId === user.id && 
        (now - profileCache.timestamp < CACHE_DURATION)) {
      return profileCache.profile;
    }

    // Fetch fresh profile data
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No profile found - return null but don't cache this result
        console.warn('No profile found for user:', user.id);
        return null;
      }
      throw error;
    }

    // Cache the result
    profileCache = { profile: data, timestamp: now, userId: user.id };
    
    console.log('Profile fetched:', { 
      userId: user.id, 
      email: user.email, 
      approved: data?.approved,
      cached: false 
    });
    
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    // Clear cache on error
    profileCache = { profile: null, timestamp: 0, userId: null };
    return null;
  }
} 