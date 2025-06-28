import { useState, useEffect } from 'react'
import { supabase, Profile } from '../lib/supabase'
import { useToast } from './use-toast'

export interface UseAdminApprovalReturn {
  pendingUsers: Profile[]
  isLoading: boolean
  error: string | null
  approveUser: (uid: string) => Promise<void>
  refreshPendingUsers: () => Promise<void>
}

export const useAdminApproval = (): UseAdminApprovalReturn => {
  const [pendingUsers, setPendingUsers] = useState<Profile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // Fetch pending users (onay bekleyen kullanıcıları getir)
  const fetchPendingUsers = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('approved', false)
        .order('created_at', { ascending: false })

      if (fetchError) {
        throw fetchError
      }

      setPendingUsers(data || [])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      console.error('Error fetching pending users:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Approve user via Edge Function (Edge Function ile kullanıcı onaylama)
  const approveUser = async (uid: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session?.access_token) {
        throw new Error('Not authenticated')
      }

      // Call Edge Function
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/approve-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ uid })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to approve user')
      }

      // Remove approved user from pending list
      setPendingUsers(prev => prev.filter(user => user.id !== uid))
      
      toast({
        title: "Kullanıcı Onaylandı",
        description: "Kullanıcı başarıyla onaylandı.",
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      toast({
        title: "Hata",
        description: errorMessage,
        variant: "destructive",
      })
      console.error('Error approving user:', err)
    }
  }

  // Alternative: Direct database update (Alternatif: Doğrudan veritabanı güncellemesi)
  const approveUserDirect = async (uid: string) => {
    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          approved: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', uid)

      if (updateError) {
        throw updateError
      }

      // Remove approved user from pending list
      setPendingUsers(prev => prev.filter(user => user.id !== uid))
      
      toast({
        title: "Kullanıcı Onaylandı",
        description: "Kullanıcı başarıyla onaylandı.",
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      toast({
        title: "Hata",
        description: errorMessage,
        variant: "destructive",
      })
      console.error('Error approving user:', err)
    }
  }

  // Refresh pending users list
  const refreshPendingUsers = async () => {
    await fetchPendingUsers()
  }

  // Subscribe to real-time updates (gerçek zamanlı güncellemeler)
  useEffect(() => {
    fetchPendingUsers()

    // Set up real-time subscription
    const subscription = supabase
      .channel('profiles_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'profiles',
          filter: 'approved=eq.false'
        }, 
        (payload) => {
          console.log('Real-time update:', payload)
          fetchPendingUsers() // Refresh the list
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return {
    pendingUsers,
    isLoading,
    error,
    approveUser: approveUserDirect, // Uses Direct Database Update (Edge Function yerine)
    refreshPendingUsers
  }
} 