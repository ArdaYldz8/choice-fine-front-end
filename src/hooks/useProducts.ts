import { useState, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  sub_category?: string;
  price: number;
  unit?: string;
  description?: string;
  image_url?: string;
  in_stock?: boolean;
  bulk_price?: number;
  min_order?: number;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Mock data - replace with actual API call later
    setProducts([]);
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Mock implementation
      setProducts([]);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    error,
    refetch: fetchProducts
  };
}