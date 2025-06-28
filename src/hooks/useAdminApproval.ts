import { useState, useEffect, useCallback, useMemo } from 'react'
import { supabase, Profile } from '../lib/supabase'
import { useToast } from './use-toast'
import { cacheUtils, performanceMonitor, optimizeQuery } from '../lib/cache-utils'

export interface UseAdminApprovalReturn {
  pendingUsers: Profile[]
  isLoading: boolean
  error: string | null
  approveUser: (uid: string) => Promise<void>
  refreshPendingUsers: () => Promise<void>
  stats: {
    total: number
    pending: number
    approved: number
  }
}

export const useAdminApproval = (): UseAdminApprovalReturn => {
  const [pendingUsers, setPendingUsers] = useState<Profile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // Memoized cache key
  const cacheKey = useMemo(() => 'pending_users_list', []);

  // Fetch pending users with caching (onay bekleyen kullanıcıları getir)
  const fetchPendingUsers = useCallback(async (useCache = true) => {
    try {
      performanceMonitor.startTiming('fetchPendingUsers');
      setIsLoading(true);
      setError(null);

      // Try cache first for instant loading
      if (useCache) {
        const cachedUsers = await cacheUtils.get<Profile[]>('profiles', cacheKey);
        if (cachedUsers) {
          console.log('📦 Pending users loaded from cache');
          setPendingUsers(cachedUsers);
          setIsLoading(false);
          performanceMonitor.endTiming('fetchPendingUsers');
          return;
        }
      }

      // Optimized query - only fetch necessary fields
      const query = supabase
        .from('profiles')
        .select('id, full_name, email, approved, created_at, updated_at')
        .eq('approved', false)
        .order('created_at', { ascending: false })
        .limit(100); // Reasonable limit for admin interface

      const { data, error: fetchError } = await query;

      if (fetchError) {
        throw fetchError;
      }

      const users = data || [];
      setPendingUsers(users);

      // Cache the results
      await cacheUtils.set('profiles', cacheKey, users);
      
      console.log(`✅ Fetched ${users.length} pending users from database`);
      performanceMonitor.endTiming('fetchPendingUsers');

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching pending users:', err);
    } finally {
      setIsLoading(false);
    }
  }, [cacheKey]);

  // Approve user with optimistic updates
  const approveUser = useCallback(async (uid: string) => {
    try {
      performanceMonitor.startTiming('approveUser');
      
      // Find the user for optimistic update
      const userToApprove = pendingUsers.find(user => user.id === uid);
      if (!userToApprove) {
        throw new Error('User not found');
      }

      // Optimistic update - remove from pending list immediately
      setPendingUsers(prev => prev.filter(user => user.id !== uid));

      // Perform the actual database update
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          approved: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', uid);

      if (updateError) {
        // Revert optimistic update on error
        setPendingUsers(prev => [userToApprove, ...prev]);
        throw updateError;
      }

      // Clear cache to ensure fresh data on next fetch
      cacheUtils.clear('profiles');
      
      toast({
        title: "Kullanıcı Onaylandı",
        description: `${userToApprove.full_name} başarıyla onaylandı.`,
      });

      performanceMonitor.endTiming('approveUser');

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      toast({
        title: "Hata",
        description: errorMessage,
        variant: "destructive",
      });
      console.error('Error approving user:', err);
    }
  }, [pendingUsers, toast]);

  // Batch approve users for efficiency
  const batchApproveUsers = useCallback(async (uids: string[]) => {
    try {
      performanceMonitor.startTiming('batchApproveUsers');
      
      // Optimistic update
      const usersToApprove = pendingUsers.filter(user => uids.includes(user.id));
      setPendingUsers(prev => prev.filter(user => !uids.includes(user.id)));

      // Batch update
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          approved: true,
          updated_at: new Date().toISOString()
        })
        .in('id', uids);

      if (updateError) {
        // Revert on error
        setPendingUsers(prev => [...usersToApprove, ...prev]);
        throw updateError;
      }

      // Clear cache
      cacheUtils.clear('profiles');
      
      toast({
        title: "Toplu Onay Başarılı",
        description: `${uids.length} kullanıcı başarıyla onaylandı.`,
      });

      performanceMonitor.endTiming('batchApproveUsers');

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Batch approval failed';
      setError(errorMessage);
      toast({
        title: "Toplu Onay Hatası",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }, [pendingUsers, toast]);

  // Refresh pending users list
  const refreshPendingUsers = useCallback(async () => {
    await fetchPendingUsers(false); // Force refresh without cache
  }, [fetchPendingUsers]);

  // Get user statistics
  const stats = useMemo(() => {
    return {
      total: pendingUsers.length,
      pending: pendingUsers.filter(user => !user.approved).length,
      approved: pendingUsers.filter(user => user.approved).length,
    };
  }, [pendingUsers]);

  // Real-time subscription with debouncing
  useEffect(() => {
    fetchPendingUsers();

    // Set up real-time subscription with performance optimization
    const subscription = supabase
      .channel('profiles_admin_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'profiles',
          filter: 'approved=eq.false'
        }, 
        (payload) => {
          console.log('Real-time admin update:', payload.eventType);
          
          // Debounced refresh to avoid excessive updates
          const debouncedRefresh = setTimeout(() => {
            fetchPendingUsers(false);
          }, 1000);

          return () => clearTimeout(debouncedRefresh);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchPendingUsers]);

  return {
    pendingUsers,
    isLoading,
    error,
    approveUser,
    refreshPendingUsers,
    stats
  };
}; 