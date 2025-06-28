-- Test Cases for Admin Approval System (Yönetici Onay Sistemi Test Senaryoları)
-- Run these tests in Supabase SQL Editor

-- Test 1: Create a test user profile (Test kullanıcı profili oluştur)
INSERT INTO public.profiles (id, full_name, email, approved) 
VALUES (
  gen_random_uuid(),
  'Test User',
  'test@example.com',
  false
);

-- Expected: Should insert successfully
-- Beklenen: Başarıyla eklenmeli

-- Test 2: Check RLS - Unapproved user cannot read own profile
-- Test 2: RLS Kontrolü - Onaysız kullanıcı kendi profilini okuyamaz
-- (This would need to be run as the actual user with JWT token)

-- Test 3: Admin can view all profiles
SELECT * FROM public.profiles WHERE approved = false;
-- Expected: Shows all unapproved profiles for admin users
-- Beklenen: Admin kullanıcılar için tüm onaysız profilleri gösterir

-- Test 4: Approve a user
UPDATE public.profiles 
SET approved = true, updated_at = NOW()
WHERE email = 'test@example.com';

-- Expected: Should update successfully for admin users
-- Beklenen: Admin kullanıcılar için başarıyla güncellemeli

-- Test 5: Verify approval
SELECT id, full_name, email, approved, created_at, updated_at 
FROM public.profiles 
WHERE email = 'test@example.com';

-- Expected: approved should be true, updated_at should be recent
-- Beklenen: approved true olmalı, updated_at yakın zamanlı olmalı

-- Test 6: Check trigger functionality
INSERT INTO auth.users (id, email, raw_user_meta_data)
VALUES (
  gen_random_uuid(),
  'trigger-test@example.com',
  '{"full_name": "Trigger Test User"}'::jsonb
);

-- Expected: Should automatically create profile via trigger
-- Beklenen: Trigger aracılığıyla otomatik profil oluşturmalı

-- Test 7: Verify trigger created profile
SELECT * FROM public.profiles WHERE email = 'trigger-test@example.com';

-- Expected: Profile should exist with approved = false
-- Beklenen: approved = false ile profil bulunmalı

-- Sample output for successful tests:
/*
Test 1 Output:
INSERT 0 1

Test 3 Output:
                  id                  |    full_name     |       email        | approved |         created_at         |         updated_at         
--------------------------------------+------------------+--------------------+----------+----------------------------+----------------------------
 123e4567-e89b-12d3-a456-426614174000 | Test User        | test@example.com   | f        | 2024-01-15 10:30:00.000000 | 2024-01-15 10:30:00.000000

Test 4 Output:
UPDATE 1

Test 5 Output:
                  id                  |    full_name     |       email        | approved |         created_at         |         updated_at         
--------------------------------------+------------------+--------------------+----------+----------------------------+----------------------------
 123e4567-e89b-12d3-a456-426614174000 | Test User        | test@example.com   | t        | 2024-01-15 10:30:00.000000 | 2024-01-15 10:35:15.123456
*/

-- Cleanup (Temizlik)
DELETE FROM public.profiles WHERE email IN ('test@example.com', 'trigger-test@example.com');
DELETE FROM auth.users WHERE email IN ('test@example.com', 'trigger-test@example.com'); 