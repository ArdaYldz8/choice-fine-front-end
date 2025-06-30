-- Migration to add image_url column to products table
-- This will allow products to have associated images

ALTER TABLE public.products ADD COLUMN image_url TEXT; 