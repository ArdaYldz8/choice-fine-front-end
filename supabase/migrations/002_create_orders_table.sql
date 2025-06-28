-- Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    items jsonb NOT NULL DEFAULT '[]',
    total_items integer NOT NULL DEFAULT 0,
    status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
    notes text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS orders_user_id_idx ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS orders_status_idx ON public.orders(status);
CREATE INDEX IF NOT EXISTS orders_created_at_idx ON public.orders(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policies for orders table
-- Users can see their own orders
CREATE POLICY "users_select_own_orders" ON public.orders
    FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

-- Users can insert their own orders
CREATE POLICY "users_insert_own_orders" ON public.orders
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Admins can see and modify all orders
CREATE POLICY "admin_full_access_orders" ON public.orders
    FOR ALL TO authenticated
    USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_orders_updated_at 
    BEFORE UPDATE ON public.orders
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions
GRANT ALL ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role; 