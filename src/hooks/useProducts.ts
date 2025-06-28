import { useState, useEffect } from 'react'
import { supabase, type Product } from '../lib/supabase'

// Mock products as fallback when real data isn't available
const mockProducts: Product[] = [
  {
    id: 'MOCK001',
    name: 'Sample Mediterranean Olive Oil',
    description: 'Premium extra virgin olive oil from Mediterranean region',
    price: 25.99,
    category: 'OLIVES',
    sku: 'MOCK001',
    active: true,
    quantity_on_hand: 100,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'MOCK002', 
    name: 'Traditional Baklava',
    description: 'Authentic honey-sweetened pastry with nuts',
    price: 18.50,
    category: 'SWEETS',
    sku: 'MOCK002',
    active: true,
    quantity_on_hand: 50,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'MOCK003',
    name: 'Premium Turkish Coffee',
    description: 'Finely ground coffee beans, traditional blend',
    price: 12.99,
    category: 'COFFEE',
    sku: 'MOCK003', 
    active: true,
    quantity_on_hand: 75,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingMockData, setUsingMockData] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      console.log('Fetching products from Supabase...')
      setLoading(true)
      setError(null)
      setUsingMockData(false)
      
      // Increase timeout to 20 seconds for slow connections
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout - products table might not exist or is very large')), 20000);
      });

      // First, let's check if the table exists
      const tableCheckPromise = supabase
        .from('products')
        .select('count', { count: 'exact', head: true });

      console.log('Checking if products table exists...')
      const { count, error: countError } = await Promise.race([tableCheckPromise, timeoutPromise]) as any;
      
      if (countError) {
        console.error('Table check error:', countError)
        throw countError
      }

      console.log(`Products table exists with ${count} records`)

      // If table exists, fetch the actual data
      if (count !== null) {
        console.log('Fetching product data...')
        const apiPromise = supabase
          .from('products')
          .select('*')
          .eq('active', true)
          .order('name'); // Load all products

        const { data, error } = await Promise.race([apiPromise, timeoutPromise]) as any;

        console.log('Supabase response:', { dataLength: data?.length, error })

        if (error) {
          console.error('Supabase error:', error)
          throw error
        }
        
        console.log(`Successfully fetched ${data?.length || 0} products`)
        setProducts(data || [])
      } else {
        throw new Error('Products table appears to be empty')
      }
    } catch (err) {
      console.error('Error in fetchProducts:', err)
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      
      // Use mock data for various error conditions
      if (errorMessage.includes('relation "products" does not exist') || 
          errorMessage.includes('timeout') ||
          errorMessage.includes('Request timeout') ||
          errorMessage.includes('table appears to be empty') ||
          errorMessage.includes('JWT') ||
          errorMessage.includes('permission')) {
        console.log('📦 Using mock product data as fallback')
        console.log('Reason:', errorMessage)
        setProducts(mockProducts)
        setUsingMockData(true)
        setError(`Using sample data: ${errorMessage}`)
      } else {
        setError(errorMessage)
      }
    } finally {
      setLoading(false)
    }
  }

  const addProduct = async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()

      if (error) throw error
      if (data) {
        setProducts(prev => [...prev, ...data])
      }
      return { success: true, data }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add product'
      setError(message)
      return { success: false, error: message }
    }
  }

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()

      if (error) throw error
      if (data) {
        setProducts(prev => prev.map(p => p.id === id ? data[0] : p))
      }
      return { success: true, data }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update product'
      setError(message)
      return { success: false, error: message }
    }
  }

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ active: false })
        .eq('id', id)

      if (error) throw error
      setProducts(prev => prev.filter(p => p.id !== id))
      return { success: true }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete product'
      setError(message)
      return { success: false, error: message }
    }
  }

  return {
    products,
    loading,
    error,
    usingMockData,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct
  }
} 