// Mock Supabase client for now
export const supabase = {
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    signInWithPassword: async () => ({ data: null, error: null }),
    signUp: async () => ({ data: null, error: null }),
    signOut: async () => ({ error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
  },
  from: () => ({
    select: () => ({
      eq: () => ({ data: [], error: null }),
      single: () => ({ data: null, error: null })
    }),
    insert: () => ({ data: null, error: null }),
    update: () => ({ data: null, error: null }),
    delete: () => ({ data: null, error: null })
  })
};

export async function getCurrentUserProfile() {
  return null;
}

export function clearAuthCache() {
  // Mock implementation
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  sub_category?: string;
  price: number;
  unit?: string;
  description?: string;
  image_url?: string;
  in_stock?: boolean;
  bulk_price?: number;
  min_order?: number;
}