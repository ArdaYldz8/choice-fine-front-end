import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

// Debug component to detect Supabase deadlock issues
export function DeadlockDebugger() {
  const [lastApiCall, setLastApiCall] = useState<Date | null>(null);
  const [isHanging, setIsHanging] = useState(false);

  useEffect(() => {
    // Test API call every 10 seconds to detect hanging
    const interval = setInterval(async () => {
      const startTime = new Date();
      setLastApiCall(startTime);
      
      try {
        // Simple non-authenticated call that should always work
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('API call timeout - possible deadlock')), 5000);
        });
        
        const apiPromise = supabase.auth.getSession();
        
        await Promise.race([apiPromise, timeoutPromise]);
        
        setIsHanging(false);
        console.log('✅ Supabase API test passed - no deadlock detected');
      } catch (error) {
        setIsHanging(true);
        console.error('🚨 Potential Supabase deadlock detected:', error);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div 
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        background: isHanging ? '#fee' : '#efe',
        border: `2px solid ${isHanging ? '#f00' : '#0f0'}`,
        padding: '8px',
        borderRadius: '4px',
        fontSize: '12px',
        zIndex: 9999,
        fontFamily: 'monospace'
      }}
    >
      <div>🔍 Deadlock Monitor</div>
      <div>Status: {isHanging ? '🚨 HANGING' : '✅ OK'}</div>
      <div>Last Check: {lastApiCall?.toLocaleTimeString()}</div>
    </div>
  );
} 