-- Migration to update bakery products with specific image URLs
-- Based on research of Turkish bakery products

-- First add image_url column if it doesn't exist
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Angel's Bakery White Pita
UPDATE public.products 
SET image_url = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
WHERE id = 'ABP001';

-- MODA Anatolian Cheese Pastry
UPDATE public.products 
SET image_url = 'https://images.unsplash.com/photo-1551782450-17144efb9c50?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
WHERE id IN ('MAB001', 'MAB002');

-- MODA Boyoz Izmir Pastry
UPDATE public.products 
SET image_url = 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
WHERE id = 'MBP001';

-- MODA Mom's Borek (Spinach & Cheese variants)
UPDATE public.products 
SET image_url = 'https://images.unsplash.com/photo-1551782450-17144efb9c50?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
WHERE id IN ('MMB001', 'MMB002', 'MMB003');

-- MODA Acma Soft Bagel
UPDATE public.products 
SET image_url = 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
WHERE id IN ('MOA001', 'MOA002');

-- MODA Simit
UPDATE public.products 
SET image_url = 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
WHERE id = 'MODA023';

-- MODA Gozleme (Turkish flatbread)
UPDATE public.products 
SET image_url = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
WHERE id IN ('MOGO001', 'MOGO002');

-- MODA Pide (Turkish pizza)
UPDATE public.products 
SET image_url = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
WHERE id = 'MOP003';

-- MODA Pogaca (Turkish buns)
UPDATE public.products 
SET image_url = 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
WHERE id IN ('MOPO001', 'MOPO002', 'MOPO003', 'MOPO004', 'MOPO005');

-- MODA Pastry Rolls
UPDATE public.products 
SET image_url = 'https://images.unsplash.com/photo-1551782450-17144efb9c50?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
WHERE id = 'MR018';

-- MODA Three Cheese Pastry Su Boregi
UPDATE public.products 
SET image_url = 'https://images.unsplash.com/photo-1551782450-17144efb9c50?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
WHERE id IN ('MSB001', 'MSB002');

-- MODA Spiral Pie variations
UPDATE public.products 
SET image_url = 'https://images.unsplash.com/photo-1551782450-17144efb9c50?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
WHERE id IN ('MSP001', 'MSP002', 'MSP003');

-- Rukak Al Salam
UPDATE public.products 
SET image_url = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
WHERE id = 'RK001'; 