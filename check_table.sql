-- Quick check if products table exists and has data

-- 1. Check if table exists
SELECT table_name, table_type 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'products';

-- 2. Check table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'products'
ORDER BY ordinal_position;

-- 3. Check record count
SELECT COUNT(*) as total_products FROM public.products;

-- 4. Check sample records
SELECT id, name, category, active, price 
FROM public.products 
LIMIT 5; 