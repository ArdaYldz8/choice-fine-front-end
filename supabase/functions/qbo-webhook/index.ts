import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'
import { createHmac } from 'https://deno.land/std@0.168.0/node/crypto.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface WebhookNotification {
  realmId: string
  dataChangeEvent: {
    entities: Array<{
      name: string
      id: string
      operation: string
      lastUpdated: string
    }>
  }
}

function verifyWebhookSignature(payload: string, signature: string): boolean {
  const verifierToken = Deno.env.get('QBO_WEBHOOK_VERIFIER_TOKEN')
  if (!verifierToken) {
    console.error('QBO_WEBHOOK_VERIFIER_TOKEN not configured')
    return false
  }
  
  const hmac = createHmac('sha256', verifierToken)
  hmac.update(payload)
  const expectedSignature = hmac.digest('base64')
  
  return signature === expectedSignature
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  
  // Webhook validation endpoint
  if (req.method === 'GET') {
    const url = new URL(req.url)
    const challenge = url.searchParams.get('challenge')
    if (challenge) {
      console.log('QBO webhook validation challenge received')
      return new Response(challenge, { 
        headers: { 'Content-Type': 'text/plain' } 
      })
    }
  }
  
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }
  
  try {
    // Verify signature
    const signature = req.headers.get('intuit-signature')
    const payload = await req.text()
    
    if (signature && !verifyWebhookSignature(payload, signature)) {
      console.error('Invalid webhook signature')
      return new Response('Unauthorized', { status: 401 })
    }
    
    // Parse webhook payload
    const notification: WebhookNotification = JSON.parse(payload)
    
    // Immediately return 200 OK
    const response = new Response('OK', { 
      status: 200,
      headers: corsHeaders 
    })
    
    // Process asynchronously after response
    (async () => {
      try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!
        const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
        
        console.log(`Processing webhook for realm ${notification.realmId}`)
        
        // Process each entity change
        for (const entity of notification.dataChangeEvent.entities) {
          if (entity.name === 'Invoice') {
            console.log(`Invoice ${entity.id} ${entity.operation} at ${entity.lastUpdated}`)
            
            // Find the sync record for this invoice
            const { data: syncRecord } = await supabaseAdmin
              .from('qbo_sync')
              .select('order_id, status')
              .eq('qbo_txn_id', entity.id)
              .single()
            
            if (syncRecord) {
              // Update status to confirmed
              const newStatus = entity.operation === 'Delete' ? 'failed' : 'confirmed'
              
              await supabaseAdmin
                .from('qbo_sync')
                .update({
                  status: newStatus,
                  updated_at: new Date().toISOString(),
                })
                .eq('qbo_txn_id', entity.id)
              
              console.log(`Updated sync status for invoice ${entity.id} to ${newStatus}`)
              
              // If invoice was deleted/voided, update order status
              if (entity.operation === 'Delete') {
                await supabaseAdmin
                  .from('orders')
                  .update({
                    status: 'pending',
                    updated_at: new Date().toISOString(),
                  })
                  .eq('id', syncRecord.order_id)
                
                console.log(`Reverted order ${syncRecord.order_id} to pending due to invoice deletion`)
              }
            }
          }
        }
      } catch (error) {
        console.error('Error processing webhook:', error)
      }
    })()
    
    return response
    
  } catch (error) {
    console.error('Webhook error:', error)
    return new Response('Internal Server Error', { 
      status: 500,
      headers: corsHeaders 
    })
  }
})