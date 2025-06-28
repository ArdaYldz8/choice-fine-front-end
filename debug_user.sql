-- Debug script to check and fix user approval status

-- 1. Check current user and profile status
SELECT 
  auth.users.id as user_id,
  auth.users.email,
  auth.users.raw_app_meta_data,
  profiles.approved,
  profiles.company_name,
  profiles.created_at
FROM auth.users 
LEFT JOIN public.profiles ON auth.users.id = profiles.id
WHERE auth.users.email = 'choicefoods@hotmail.com';

-- 2. Approve the user if not already approved
UPDATE public.profiles 
SET approved = true 
WHERE id = (
  SELECT id FROM auth.users 
  WHERE email = 'choicefoods@hotmail.com'
);

-- 3. Also make them admin for full access
UPDATE auth.users 
SET raw_app_meta_data = COALESCE(raw_app_meta_data, '{}'::jsonb) || '{"role": "admin"}'::jsonb
WHERE email = 'choicefoods@hotmail.com';

-- 4. Verify the changes
SELECT 
  auth.users.id as user_id,
  auth.users.email,
  auth.users.raw_app_meta_data,
  profiles.approved,
  profiles.company_name
FROM auth.users 
LEFT JOIN public.profiles ON auth.users.id = profiles.id
WHERE auth.users.email = 'choicefoods@hotmail.com'; 