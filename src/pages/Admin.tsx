import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Skeleton } from '../components/ui/skeleton'
import { Alert, AlertDescription } from '../components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { RefreshCw, Check, X, Users, Clock, Package, Truck, ShoppingCart } from 'lucide-react'
import { useAdminApproval } from '../hooks/useAdminApproval'
import { useOrders } from '../hooks/useOrders'
import { checkAdminRole } from '../lib/supabase'
import { useToast } from '../hooks/use-toast'

const Admin: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const { toast } = useToast()
  
  const { 
    pendingUsers, 
    isLoading, 
    error, 
    approveUser, 
    refreshPendingUsers,
    stats: userStats
  } = useAdminApproval()

  const { 
    orders, 
    loading: ordersLoading, 
    error: ordersError, 
    updateOrderStatus,
    orderStats,
    hasNextPage: ordersHasNextPage,
    loadNextPage: loadMoreOrders,
    cacheStats
  } = useOrders({
    pageSize: 20 // Optimized page size for admin interface
  })

  // Check admin authorization (yönetici yetkisi kontrolü)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const adminStatus = await checkAdminRole()
        setIsAdmin(adminStatus)
      } catch (error) {
        console.error('Error checking admin status:', error)
        setIsAdmin(false)
      } finally {
        setIsCheckingAuth(false)
      }
    }

    checkAuth()
  }, [])

  // Show loading spinner during auth check
  if (isCheckingAuth) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Yetki kontrolü yapılıyor...</p>
          </div>
        </div>
      </div>
    )
  }

  // Redirect if not admin
  if (!isAdmin) {
    toast({
      title: "Erişim Reddedildi",
      description: "Bu sayfaya erişim için yönetici yetkisine sahip olmanız gerekiyor.",
      variant: "destructive",
    })
    return <Navigate to="/login" replace />
  }

  const handleApprove = async (uid: string, fullName: string) => {
    try {
      await approveUser(uid)
      toast({
        title: "Başarılı",
        description: `${fullName} başarıyla onaylandı.`,
      })
    } catch (error) {
      console.error('Approval error:', error)
    }
  }

  const handleOrderStatusUpdate = async (orderId: string, status: any) => {
    try {
      await updateOrderStatus(orderId, status)
      toast({
        title: "Başarılı",
        description: `Sipariş durumu güncellendi: ${status}`,
      })
    } catch (error) {
      console.error('Order status update error:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'processing': return 'bg-orange-100 text-orange-800'
      case 'shipped': return 'bg-purple-100 text-purple-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Yönetici Paneli</h1>
          <p className="text-muted-foreground">
            Kullanıcı onaylarını ve siparişleri yönetin
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bekleyen Onaylar</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingUsers.length}</div>
            <p className="text-xs text-muted-foreground">
              Onay bekleyen kullanıcı sayısı
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Sipariş</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderStats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              Toplam sipariş sayısı
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bekleyen Siparişler</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderStats.pendingOrders}</div>
            <p className="text-xs text-muted-foreground">
              İşleme alınacak siparişler
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">İşlenen Siparişler</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderStats.processingOrders}</div>
            <p className="text-xs text-muted-foreground">
              Hazırlanmakta olan siparişler
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content with Tabs */}
      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Kullanıcı Yönetimi
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Sipariş Yönetimi
          </TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <X className="h-4 w-4" />
              <AlertDescription>
                Hata: {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Pending Users Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Onay Bekleyen Kullanıcılar
                  </CardTitle>
                  <CardDescription>
                    Aşağıdaki kullanıcılar sisteme kaydolmuş ve onayınızı bekliyor
                  </CardDescription>
                </div>
                <Button 
                  onClick={refreshPendingUsers} 
                  variant="outline" 
                  size="sm"
                  disabled={isLoading}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Yenile
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-3 w-[150px]" />
                      </div>
                      <Skeleton className="h-9 w-20" />
                    </div>
                  ))}
                </div>
              ) : pendingUsers.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Onay bekleyen kullanıcı yok</h3>
                  <p className="text-muted-foreground">
                    Şu anda onayınızı bekleyen herhangi bir kullanıcı bulunmuyor.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingUsers.map((user) => (
                    <div 
                      key={user.id} 
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{user.full_name || 'İsim belirtilmemiş'}</h4>
                          <Badge variant="secondary">Beklemede</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>Email: {user.email || 'Belirtilmemiş'}</p>
                          <p>Kayıt Tarihi: {new Date(user.created_at).toLocaleDateString('tr-TR')}</p>
                          <p className="font-mono text-xs">ID: {user.id}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleApprove(user.id, user.full_name)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Onayla
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-6">
          {/* Error Alert */}
          {ordersError && (
            <Alert variant="destructive">
              <X className="h-4 w-4" />
              <AlertDescription>
                Hata: {ordersError}
              </AlertDescription>
            </Alert>
          )}

          {/* Orders Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Tüm Siparişler
              </CardTitle>
              <CardDescription>
                Müşteriler tarafından verilen siparişleri yönetin
              </CardDescription>
            </CardHeader>
            <CardContent>
              {ordersLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[300px]" />
                        <Skeleton className="h-3 w-[200px]" />
                      </div>
                      <Skeleton className="h-9 w-24" />
                    </div>
                  ))}
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Henüz sipariş yok</h3>
                  <p className="text-muted-foreground">
                    Müşteriler sipariş vermeye başlayınca burada görünecek.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div 
                      key={order.id} 
                      className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">Sipariş #{order.id?.slice(-8)}</h4>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <p>Toplam Ürün: {order.total_items}</p>
                            <p>Sipariş Tarihi: {new Date(order.created_at || '').toLocaleDateString('tr-TR')}</p>
                            {order.notes && <p>Not: {order.notes}</p>}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <select
                            value={order.status}
                            onChange={(e) => handleOrderStatusUpdate(order.id!, e.target.value)}
                            className="text-sm border rounded px-2 py-1"
                          >
                            <option value="pending">Beklemede</option>
                            <option value="confirmed">Onaylandı</option>
                            <option value="processing">İşleniyor</option>
                            <option value="shipped">Gönderildi</option>
                            <option value="delivered">Teslim Edildi</option>
                            <option value="cancelled">İptal Edildi</option>
                          </select>
                        </div>
                      </div>
                      
                      {/* Order Items */}
                      <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                        <h5 className="font-medium text-sm">Sipariş İçeriği:</h5>
                        <div className="grid gap-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>{item.name} ({item.packSize})</span>
                              <span>Adet: {item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Load More Orders */}
                  {ordersHasNextPage && !ordersLoading && (
                    <div className="text-center pt-4">
                      <Button 
                        onClick={loadMoreOrders}
                        variant="outline"
                        size="sm"
                      >
                        Load More Orders
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Performance Stats (development only) */}
      {process.env.NODE_ENV === 'development' && cacheStats && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">🚀 Performance Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-gray-600 space-y-1">
              <div>Cache hits - Orders: {cacheStats.orders || 0}</div>
              <div>Cache hits - Profiles: {cacheStats.profiles || 0}</div>
              <div>Cache hits - Products: {cacheStats.products || 0}</div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default Admin 