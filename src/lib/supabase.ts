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

// Auth helper functions (kimlik doğrulama yardımcı fonksiyonları)
export const checkAdminRole = async (): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return false
    
    return user.app_metadata?.role === 'admin' || 
           user.email?.endsWith('@admin.com') // Fallback domain check
  } catch (error) {
    console.error('Error checking admin role:', error)
    return false
  }
}

// Get current user profile (mevcut kullanıcı profilini al)
export const getCurrentUserProfile = async (): Promise<Profile | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return null
  }
} 