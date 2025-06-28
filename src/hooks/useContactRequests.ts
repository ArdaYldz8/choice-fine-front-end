import { useState } from 'react'
import { supabase } from '../lib/supabase'

export interface ContactRequest {
  id: string
  name: string
  email: string
  company: string
  status: 'pending' | 'contacted' | 'approved' | 'rejected'
  submitted_at: string
  notes?: string
}

export function useContactRequests() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitContactRequest = async (data: {
    name: string
    email: string
    company: string
    password: string
  }) => {
    try {
      setLoading(true)
      setError(null)

      // Sadece request kaydet, hesap oluşturma
      const { data: result, error } = await supabase
        .from('contact_requests')
        .insert([{
          name: data.name,
          email: data.email,
          company: data.company,
          password: data.password, // Şifreyi sakla
          status: 'pending' // Manuel onay bekliyor
        }])
        .select()

      if (error) throw error

      return { success: true, data: result }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to submit request'
      setError(message)
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }



  return {
    loading,
    error,
    submitContactRequest
  }
} 