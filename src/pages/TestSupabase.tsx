import { useProducts } from '../hooks/useProducts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Skeleton } from '../components/ui/skeleton'

export default function TestSupabase() {
  const { products, loading, error } = useProducts()

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Supabase Connection Test</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-3 w-full mb-2" />
                <Skeleton className="h-3 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Supabase Connection Test</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-red-800 mb-2">Connection Error</h2>
          <p className="text-red-600">{error}</p>
          <p className="text-sm text-red-500 mt-2">
            Make sure you created the .env.local file with the correct Supabase credentials.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Supabase Connection Test</h1>
      
      {products.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-yellow-800 mb-2">No Products Found</h2>
          <p className="text-yellow-600">
            The database connection is working, but no products were found. 
            Make sure you ran the SQL script to create the tables and insert test data.
          </p>
        </div>
      ) : (
        <>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold text-green-800 mb-2">✅ Connection Successful!</h2>
            <p className="text-green-600">
              Found {products.length} products in the database.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <Card key={product.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {product.name}
                    <Badge variant="outline">{product.category}</Badge>
                  </CardTitle>
                  <CardDescription>SKU: {product.sku}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">${product.price}</span>
                    <span className="text-sm">Stock: {product.quantity_on_hand}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
} 