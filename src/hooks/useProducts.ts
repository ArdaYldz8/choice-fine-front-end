import { useState, useEffect } from 'react'
import { supabase, type Product } from '../lib/supabase'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('active', true)
        .order('name')

      if (error) throw error
      setProducts(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
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
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct
  }
} 