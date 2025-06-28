-- Create profiles table for admin-approval workflow (yönetici onaylı kayıt akışı)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT,
  approved BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (Row Level Security - Satır Düzeyi Güvenlik)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies (RLS Poliçeleri)
-- Policy 1: Users can only read their own profile if approved
CREATE POLICY "Users can view own profile when approved" ON public.profiles
  FOR SELECT USING (auth.uid() = id AND approved = true);

-- Policy 2: Users can update their own profile if approved
CREATE POLICY "Users can update own profile when approved" ON public.profiles
  FOR UPDATE USING (auth.uid() = id AND approved = true);

-- Policy 3: Allow inserts for authenticated users (for signup)
CREATE POLICY "Allow profile creation on signup" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Policy 4: Admins can view all profiles
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.raw_app_meta_data->>'role' = 'admin'
    )
  );

-- Policy 5: Admins can update all profiles
CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.raw_app_meta_data->>'role' = 'admin'
    )
  );

-- Create function to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile when user signs up
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at timestamp
CREATE OR REPLACE TRIGGER on_profiles_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at(); 