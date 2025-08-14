import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface QBOLineItem {
  Amount: number
  DetailType: string
  SalesItemLineDetail: {
    ItemRef: {
      value: string
      name?: string
    }
    Qty: number
    UnitPrice: number
  }
}

interface QBOInvoice {
  Line: QBOLineItem[]
  CustomerRef: {
    value: string
  }
  CurrencyRef?: {
    value: string
  }
  DocNumber?: string
  TxnDate?: string
  DueDate?: string
  PrivateNote?: string
}

async function refreshAccessToken(supabaseAdmin: any): Promise<string> {
  const clientId = Deno.env.get('QBO_CLIENT_ID')!
  const clientSecret = Deno.env.get('QBO_CLIENT_SECRET')!
  
  // Get current refresh token
  const { data: tokenData, error: tokenError } = await supabaseAdmin
    .from('integration_tokens')
    .select('refresh_token, realm_id')
    .eq('provider', 'qbo')
    .single()
  
  if (tokenError || !tokenData?.refresh_token) {
    throw new Error('No refresh token found. Please authorize QBO first.')
  }
  
  // Refresh the access token
  const authHeader = btoa(`${clientId}:${clientSecret}`)
  const response = await fetch('https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${authHeader}`,
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=refresh_token&refresh_token=${tokenData.refresh_token}`,
  })
  
  if (!response.ok) {
    const error = await response.text()
    console.error('OAuth refresh failed:', error)
    throw new Error(`Failed to refresh QBO token: ${response.status}`)
  }
  
  const tokens = await response.json()
  
  // Save new tokens
  const expiresAt = new Date(Date.now() + tokens.expires_in * 1000).toISOString()
  await supabaseAdmin
    .from('integration_tokens')
    .upsert({
      provider: 'qbo',
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at: expiresAt,
      realm_id: tokenData.realm_id,
    })
  
  return tokens.access_token
}

async function findOrCreateCustomer(
  accessToken: string,
  realmId: string,
  email: string,
  name: string
): Promise<string> {
  const env = Deno.env.get('QBO_ENV') || 'sandbox'
  const baseUrl = env === 'production'
    ? `https://quickbooks.api.intuit.com/v3/company/${realmId}`
    : `https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}`
  
  // Try to find customer by email
  const query = email
    ? `select * from Customer where PrimaryEmailAddr='${email}'`
    : `select * from Customer where DisplayName='${name}'`
  
  const searchResponse = await fetch(
    `${baseUrl}/query?query=${encodeURIComponent(query)}&minorversion=75`,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
    }
  )
  
  if (searchResponse.ok) {
    const result = await searchResponse.json()
    if (result.QueryResponse?.Customer?.length > 0) {
      return result.QueryResponse.Customer[0].Id
    }
  }
  
  // Create new customer
  const customerData = {
    DisplayName: name,
    ...(email && { PrimaryEmailAddr: { Address: email } }),
  }
  
  const createResponse = await fetch(`${baseUrl}/customer?minorversion=75`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customerData),
  })
  
  if (!createResponse.ok) {
    const error = await createResponse.text()
    console.error('Failed to create customer:', error)
    throw new Error('Failed to create QBO customer')
  }
  
  const newCustomer = await createResponse.json()
  return newCustomer.Customer.Id
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
    
    const { order_id } = await req.json()
    
    if (!order_id) {
      throw new Error('order_id is required')
    }
    
    console.log(`Processing order ${order_id}`)
    
    // Check for idempotency
    const { data: existingSync } = await supabaseAdmin
      .from('qbo_sync')
      .select('qbo_txn_id, status')
      .eq('order_id', order_id)
      .single()
    
    if (existingSync?.qbo_txn_id) {
      console.log(`Order ${order_id} already synced with invoice ${existingSync.qbo_txn_id}`)
      return new Response(
        JSON.stringify({ ok: true, invoice_id: existingSync.qbo_txn_id, status: existingSync.status }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // Get order details
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          qb_items!inner (
            qb_item_id,
            name
          )
        )
      `)
      .eq('id', order_id)
      .single()
    
    if (orderError || !order) {
      throw new Error(`Order not found: ${order_id}`)
    }
    
    if (order.status !== 'approved') {
      throw new Error(`Order ${order_id} is not approved. Current status: ${order.status}`)
    }
    
    // Create or update qbo_sync record
    await supabaseAdmin
      .from('qbo_sync')
      .upsert({
        order_id,
        status: 'queued',
        qbo_txn_type: 'Invoice',
      })
    
    // Get access token
    const accessToken = await refreshAccessToken(supabaseAdmin)
    
    // Get realm ID
    const { data: tokenData } = await supabaseAdmin
      .from('integration_tokens')
      .select('realm_id')
      .eq('provider', 'qbo')
      .single()
    
    const realmId = tokenData?.realm_id || Deno.env.get('QBO_REALM_ID')!
    
    // Find or create customer
    const customerId = await findOrCreateCustomer(
      accessToken,
      realmId,
      order.email,
      order.customer_name
    )
    
    // Build invoice line items
    const lines: QBOLineItem[] = order.order_items.map((item: any) => ({
      Amount: item.qty * item.unit_price,
      DetailType: 'SalesItemLineDetail',
      SalesItemLineDetail: {
        ItemRef: {
          value: item.qb_items.qb_item_id,
          name: item.qb_items.name,
        },
        Qty: item.qty,
        UnitPrice: item.unit_price,
      },
    }))
    
    // Create invoice payload
    const invoice: QBOInvoice = {
      Line: lines,
      CustomerRef: {
        value: customerId,
      },
      CurrencyRef: {
        value: order.currency || 'USD',
      },
      TxnDate: new Date().toISOString().split('T')[0],
      PrivateNote: `Order ID: ${order_id}`,
    }
    
    // Create invoice in QBO
    const env = Deno.env.get('QBO_ENV') || 'sandbox'
    const baseUrl = env === 'production'
      ? `https://quickbooks.api.intuit.com/v3/company/${realmId}`
      : `https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}`
    
    const invoiceResponse = await fetch(`${baseUrl}/invoice?minorversion=75`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invoice),
    })
    
    if (!invoiceResponse.ok) {
      const error = await invoiceResponse.text()
      console.error('Failed to create invoice:', error)
      
      // Update sync status to failed
      await supabaseAdmin
        .from('qbo_sync')
        .update({
          status: 'failed',
          last_error: error.substring(0, 500),
        })
        .eq('order_id', order_id)
      
      throw new Error(`Failed to create QBO invoice: ${invoiceResponse.status}`)
    }
    
    const invoiceResult = await invoiceResponse.json()
    const invoiceId = invoiceResult.Invoice.Id
    
    console.log(`Created QBO invoice ${invoiceId} for order ${order_id}`)
    
    // Update sync status
    await supabaseAdmin
      .from('qbo_sync')
      .update({
        qbo_txn_id: invoiceId,
        qbo_customer_id: customerId,
        status: 'sent',
        last_error: null,
      })
      .eq('order_id', order_id)
    
    return new Response(
      JSON.stringify({ ok: true, invoice_id: invoiceId }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
    
  } catch (error) {
    console.error('Error in qbo-create-invoice:', error)
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})