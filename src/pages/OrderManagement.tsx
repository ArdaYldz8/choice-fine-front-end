import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Skeleton } from '../components/ui/skeleton'
import { Alert, AlertDescription } from '../components/ui/alert'
import { 
  RefreshCw, 
  Check, 
  X, 
  Package, 
  DollarSign,
  FileText,
  AlertCircle,
  CheckCircle2,
  Clock,
  XCircle
} from 'lucide-react'
import { checkAdminRole, supabase } from '../lib/supabase'
import { useToast } from '../hooks/use-toast'

interface Order {
  id: string
  status: 'pending' | 'approved' | 'cancelled'
  customer_name: string
  email: string
  phone?: string
  shipping_address?: string
  total: number
  currency: string
  notes?: string
  created_at: string
  updated_at: string
  order_items?: OrderItem[]
  qbo_sync?: QBOSync
}

interface OrderItem {
  id: string
  sku: string
  product_name: string
  qty: number
  unit_price: number
  total: number
  qb_items?: {
    qb_item_id: string
    name: string
  }
}

interface QBOSync {
  qbo_txn_id?: string
  status: 'queued' | 'sent' | 'confirmed' | 'failed'
  last_error?: string
  updated_at: string
}

const OrderManagement: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [syncing, setSyncing] = useState<string | null>(null)
  const { toast } = useToast()

  // Check admin authorization
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const adminStatus = await checkAdminRole()
        setIsAdmin(adminStatus)
        if (adminStatus) {
          await fetchOrders()
        }
      } catch (error) {
        console.error('Error checking admin status:', error)
        setIsAdmin(false)
      } finally {
        setIsCheckingAuth(false)
      }
    }

    checkAuth()
  }, [])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            qb_items (
              qb_item_id,
              name
            )
          ),
          qbo_sync (
            qbo_txn_id,
            status,
            last_error,
            updated_at
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setOrders(data || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
      toast({
        title: "Error",
        description: "Failed to fetch orders",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const approveOrder = async (orderId: string) => {
    try {
      // Update order status to approved
      const { error: updateError } = await supabase
        .from('orders')
        .update({ status: 'approved' })
        .eq('id', orderId)

      if (updateError) throw updateError

      // Call QBO Edge Function
      setSyncing(orderId)
      const response = await supabase.functions.invoke('qbo-create-invoice', {
        body: { order_id: orderId }
      })

      if (response.error) {
        throw new Error(response.error.message)
      }

      const { invoice_id } = response.data

      toast({
        title: "Success",
        description: `Order approved and QBO Invoice ${invoice_id} created`,
      })

      // Refresh orders
      await fetchOrders()
    } catch (error: any) {
      console.error('Error approving order:', error)
      toast({
        title: "Error",
        description: error.message || "Failed to approve order",
        variant: "destructive",
      })
      
      // Revert order status on error
      await supabase
        .from('orders')
        .update({ status: 'pending' })
        .eq('id', orderId)
    } finally {
      setSyncing(null)
    }
  }

  const resyncOrder = async (orderId: string) => {
    try {
      setSyncing(orderId)
      const response = await supabase.functions.invoke('qbo-create-invoice', {
        body: { order_id: orderId }
      })

      if (response.error) {
        throw new Error(response.error.message)
      }

      const { invoice_id, status } = response.data

      toast({
        title: "Success",
        description: status === 'sent' 
          ? `QBO Invoice ${invoice_id} already exists`
          : `QBO sync successful`,
      })

      await fetchOrders()
    } catch (error: any) {
      console.error('Error resyncing order:', error)
      toast({
        title: "Error",
        description: error.message || "Failed to resync order",
        variant: "destructive",
      })
    } finally {
      setSyncing(null)
    }
  }

  const cancelOrder = async (orderId: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: 'cancelled' })
        .eq('id', orderId)

      if (error) throw error

      toast({
        title: "Success",
        description: "Order cancelled",
      })

      await fetchOrders()
    } catch (error) {
      console.error('Error cancelling order:', error)
      toast({
        title: "Error",
        description: "Failed to cancel order",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getSyncStatusIcon = (status?: string) => {
    switch (status) {
      case 'queued': return <Clock className="h-4 w-4 text-yellow-600" />
      case 'sent': return <CheckCircle2 className="h-4 w-4 text-blue-600" />
      case 'confirmed': return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case 'failed': return <XCircle className="h-4 w-4 text-red-600" />
      default: return <AlertCircle className="h-4 w-4 text-gray-400" />
    }
  }

  // Show loading spinner during auth check
  if (isCheckingAuth) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Checking authorization...</p>
          </div>
        </div>
      </div>
    )
  }

  // Redirect if not admin
  if (!isAdmin) {
    toast({
      title: "Access Denied",
      description: "You need admin privileges to access this page.",
      variant: "destructive",
    })
    return <Navigate to="/login" replace />
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Order Management</h1>
          <p className="text-muted-foreground">
            Approve orders and sync with QuickBooks Online
          </p>
        </div>
        <Button 
          onClick={fetchOrders} 
          variant="outline"
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Orders List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Orders
          </CardTitle>
          <CardDescription>
            Manage customer orders and QuickBooks integration
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border rounded-lg p-4">
                  <Skeleton className="h-4 w-[300px] mb-2" />
                  <Skeleton className="h-3 w-[200px]" />
                </div>
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-8">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No orders yet</h3>
              <p className="text-muted-foreground">
                Orders will appear here once customers place them.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div 
                  key={order.id} 
                  className="border rounded-lg p-4 space-y-4"
                >
                  {/* Order Header */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">Order #{order.id.slice(-8)}</h4>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                        {order.qbo_sync && (
                          <div className="flex items-center gap-1">
                            {getSyncStatusIcon(order.qbo_sync.status)}
                            <span className="text-xs text-muted-foreground">
                              QBO: {order.qbo_sync.status}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Customer: {order.customer_name}</p>
                        <p>Email: {order.email}</p>
                        {order.phone && <p>Phone: {order.phone}</p>}
                        <p>Total: ${order.total.toFixed(2)} {order.currency}</p>
                        <p>Date: {new Date(order.created_at).toLocaleString()}</p>
                        {order.notes && <p>Notes: {order.notes}</p>}
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {order.status === 'pending' && (
                        <>
                          <Button
                            onClick={() => approveOrder(order.id)}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            disabled={syncing === order.id}
                          >
                            {syncing === order.id ? (
                              <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                            ) : (
                              <Check className="h-4 w-4 mr-1" />
                            )}
                            Approve & Sync
                          </Button>
                          <Button
                            onClick={() => cancelOrder(order.id)}
                            size="sm"
                            variant="destructive"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Cancel
                          </Button>
                        </>
                      )}
                      
                      {order.status === 'approved' && order.qbo_sync?.status === 'failed' && (
                        <Button
                          onClick={() => resyncOrder(order.id)}
                          size="sm"
                          variant="outline"
                          disabled={syncing === order.id}
                        >
                          {syncing === order.id ? (
                            <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                          ) : (
                            <RefreshCw className="h-4 w-4 mr-1" />
                          )}
                          Re-sync
                        </Button>
                      )}
                      
                      {order.qbo_sync?.qbo_txn_id && (
                        <Badge variant="outline" className="ml-2">
                          <FileText className="h-3 w-3 mr-1" />
                          Invoice: {order.qbo_sync.qbo_txn_id}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Order Items */}
                  {order.order_items && order.order_items.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <h5 className="font-medium text-sm mb-2">Order Items:</h5>
                      <div className="space-y-1">
                        {order.order_items.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span>
                              {item.product_name || item.qb_items?.name || item.sku}
                              {' '}
                              <span className="text-muted-foreground">(SKU: {item.sku})</span>
                            </span>
                            <span>
                              {item.qty} × ${item.unit_price.toFixed(2)} = ${item.total.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* QBO Sync Error */}
                  {order.qbo_sync?.status === 'failed' && order.qbo_sync.last_error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        QBO Sync Error: {order.qbo_sync.last_error}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default OrderManagement