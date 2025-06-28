-- Admin hesabını manuel olarak onayla ve rolünü ayarla
-- choicefoods@hotmail.com admin email'i ile güncellendi

-- 1. Admin rolünü metadata'ya ekle
UPDATE auth.users 
SET raw_app_meta_data = COALESCE(raw_app_meta_data, '{}'::jsonb) || '{"role": "admin"}'::jsonb 
WHERE email = 'choicefoods@hotmail.com';

-- 2. Profili approved olarak işaretle
UPDATE public.profiles 
SET approved = true, updated_at = NOW()
WHERE email = 'choicefoods@hotmail.com';

-- 3. Kontrol et - admin hesabının durumunu görüntüle
SELECT 
  u.email,
  u.raw_app_meta_data,
  p.approved,
  p.created_at,
  p.updated_at
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE u.email = 'choicefoods@hotmail.com'; 