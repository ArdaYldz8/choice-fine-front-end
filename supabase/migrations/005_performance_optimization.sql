-- Performance optimization migration for 2025
-- This migration adds indexes and optimizations based on query patterns

-- 1. Optimize products table queries
-- Add composite indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_products_active_category ON public.products(active, category) WHERE active = true;
CREATE INDEX IF NOT EXISTS idx_products_active_name ON public.products(active, name) WHERE active = true;
CREATE INDEX IF NOT EXISTS idx_products_category_name ON public.products(category, name) WHERE active = true;

-- Add text search index for product search
CREATE INDEX IF NOT EXISTS idx_products_search ON public.products USING gin(to_tsvector('english', name || ' ' || COALESCE(description, ''))) WHERE active = true;

-- 2. Optimize profiles table queries  
-- Add index for pending user queries
CREATE INDEX IF NOT EXISTS idx_profiles_approved_created ON public.profiles(approved, created_at) WHERE approved = false;

-- Add partial index for approved users
CREATE INDEX IF NOT EXISTS idx_profiles_approved ON public.profiles(id) WHERE approved = true;

-- 3. Optimize orders table queries
-- Add composite index for status and date queries
CREATE INDEX IF NOT EXISTS idx_orders_status_created ON public.orders(status, created_at);

-- Add index for user orders
CREATE INDEX IF NOT EXISTS idx_orders_user_created ON public.orders(user_id, created_at);

-- Add index for admin order management
CREATE INDEX IF NOT EXISTS idx_orders_created_status ON public.orders(created_at DESC, status);

-- 4. Optimize RLS policies for better performance
-- Update products RLS policy to use indexed columns
DROP POLICY IF EXISTS "Approved users can view active products" ON public.products;
CREATE POLICY "Approved users can view active products" ON public.products
  FOR SELECT USING (
    active = true AND
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.approved = true
    )
  );

-- 5. Add function for optimized product search
CREATE OR REPLACE FUNCTION search_products(
  search_query text DEFAULT '',
  category_filter text DEFAULT '',
  limit_count int DEFAULT 50,
  offset_count int DEFAULT 0
)
RETURNS TABLE (
  id text,
  name text,
  description text,
  price decimal,
  category text,
  sku text,
  active boolean,
  quantity_on_hand integer
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.name,
    p.description,
    p.price,
    p.category,
    p.sku,
    p.active,
    p.quantity_on_hand
  FROM public.products p
  WHERE 
    p.active = true
    AND (category_filter = '' OR category_filter = 'All Categories' OR p.category = category_filter)
    AND (
      search_query = '' OR 
      p.name ILIKE '%' || search_query || '%' OR 
      p.description ILIKE '%' || search_query || '%'
    )
  ORDER BY p.name
  LIMIT limit_count
  OFFSET offset_count;
END;
$$;

-- 6. Add function for admin dashboard stats
CREATE OR REPLACE FUNCTION get_admin_stats()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result json;
BEGIN
  -- Check if user is admin
  IF NOT EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.raw_app_meta_data->>'role' = 'admin'
  ) THEN
    RAISE EXCEPTION 'Access denied: Admin privileges required';
  END IF;

  SELECT json_build_object(
    'pending_users', (SELECT COUNT(*) FROM public.profiles WHERE approved = false),
    'total_users', (SELECT COUNT(*) FROM public.profiles),
    'total_orders', (SELECT COUNT(*) FROM public.orders),
    'pending_orders', (SELECT COUNT(*) FROM public.orders WHERE status = 'pending'),
    'processing_orders', (SELECT COUNT(*) FROM public.orders WHERE status = 'processing'),
    'total_products', (SELECT COUNT(*) FROM public.products WHERE active = true),
    'low_stock_products', (SELECT COUNT(*) FROM public.products WHERE active = true AND quantity_on_hand < 10)
  ) INTO result;

  RETURN result;
END;
$$;

-- 7. Update table statistics for better query planning
ANALYZE public.products;
ANALYZE public.profiles;
ANALYZE public.orders;

-- 8. Add materialized view for dashboard analytics (refresh periodically)
CREATE MATERIALIZED VIEW IF NOT EXISTS public.dashboard_stats AS
SELECT 
  'products' as category,
  COUNT(*) as total_count,
  COUNT(*) FILTER (WHERE active = true) as active_count,
  COUNT(*) FILTER (WHERE quantity_on_hand < 10 AND active = true) as low_stock_count
FROM public.products
UNION ALL
SELECT 
  'users' as category,
  COUNT(*) as total_count,
  COUNT(*) FILTER (WHERE approved = true) as active_count,
  COUNT(*) FILTER (WHERE approved = false) as low_stock_count
FROM public.profiles
UNION ALL
SELECT 
  'orders' as category,
  COUNT(*) as total_count,
  COUNT(*) FILTER (WHERE status IN ('confirmed', 'processing', 'shipped')) as active_count,
  COUNT(*) FILTER (WHERE status = 'pending') as low_stock_count
FROM public.orders;

-- Add index on materialized view
CREATE UNIQUE INDEX IF NOT EXISTS idx_dashboard_stats_category ON public.dashboard_stats(category);

-- 9. Create function to refresh materialized view
CREATE OR REPLACE FUNCTION refresh_dashboard_stats()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY public.dashboard_stats;
END;
$$;

-- 10. Add comment for maintenance
COMMENT ON MATERIALIZED VIEW public.dashboard_stats IS 'Dashboard statistics - refresh every 15 minutes for optimal performance';

-- Grant necessary permissions
GRANT SELECT ON public.dashboard_stats TO authenticated;
GRANT EXECUTE ON FUNCTION search_products(text, text, int, int) TO authenticated;
GRANT EXECUTE ON FUNCTION get_admin_stats() TO authenticated;
GRANT EXECUTE ON FUNCTION refresh_dashboard_stats() TO authenticated; 