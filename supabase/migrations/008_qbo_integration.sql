-- QuickBooks Online Integration Tables
-- This migration adds support for QBO inventory management via Invoice creation

-- Store QBO item mappings
create table if not exists public.qb_items (
  id uuid primary key default gen_random_uuid(),
  sku text unique not null,
  qb_item_id text unique not null, -- QBO ItemRef.Id (Inventory item)
  name text,
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Orders table (if not exists)
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  status text check (status in ('pending','approved','cancelled')) default 'pending',
  customer_name text,
  email text,
  phone text,
  shipping_address text,
  total numeric(10,2),
  currency text default 'USD',
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Order items
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade,
  sku text not null,
  product_name text,
  qty integer not null check (qty > 0),
  unit_price numeric(10,2) not null,
  total numeric(10,2) generated always as (qty * unit_price) stored,
  created_at timestamptz default now(),
  constraint fk_order_items_sku foreign key (sku) references public.qb_items(sku),
  constraint unique_order_sku unique(order_id, sku)
);

-- QBO sync tracking
create table if not exists public.qbo_sync (
  id uuid primary key default gen_random_uuid(),
  order_id uuid unique references public.orders(id) on delete cascade,
  qbo_txn_id text,
  qbo_txn_type text default 'Invoice', -- 'Invoice' for inventory decrement
  qbo_customer_id text,
  status text check (status in ('queued','sent','confirmed','failed')) default 'queued',
  last_error text,
  retry_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- OAuth tokens storage
create table if not exists public.integration_tokens (
  provider text primary key check (provider in ('qbo')), -- 'qbo'
  access_token text,
  refresh_token text,
  expires_at timestamptz,
  realm_id text,
  updated_at timestamptz default now()
);

-- Indexes for performance
create index if not exists idx_orders_status on public.orders(status);
create index if not exists idx_order_items_order_id on public.order_items(order_id);
create index if not exists idx_qbo_sync_order_id on public.qbo_sync(order_id);
create index if not exists idx_qbo_sync_status on public.qbo_sync(status);

-- Enable RLS
alter table public.qb_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.qbo_sync enable row level security;
alter table public.integration_tokens enable row level security;

-- RLS Policies
-- Admin read access for all tables
create policy "Admin can read qb_items" on public.qb_items
  for select using (
    exists (
      select 1 from auth.users
      where auth.uid() = id
      and (raw_app_metadata->>'role')::text = 'admin'
    )
  );

create policy "Admin can read orders" on public.orders
  for select using (
    exists (
      select 1 from auth.users
      where auth.uid() = id
      and (raw_app_metadata->>'role')::text = 'admin'
    )
  );

create policy "Admin can update orders" on public.orders
  for update using (
    exists (
      select 1 from auth.users
      where auth.uid() = id
      and (raw_app_metadata->>'role')::text = 'admin'
    )
  );

create policy "Admin can read order_items" on public.order_items
  for select using (
    exists (
      select 1 from auth.users
      where auth.uid() = id
      and (raw_app_metadata->>'role')::text = 'admin'
    )
  );

create policy "Admin can read qbo_sync" on public.qbo_sync
  for select using (
    exists (
      select 1 from auth.users
      where auth.uid() = id
      and (raw_app_metadata->>'role')::text = 'admin'
    )
  );

-- Service role only for integration_tokens (sensitive data)
create policy "Service role only for integration_tokens" on public.integration_tokens
  for all using (false);

-- Update triggers for updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_qb_items_updated_at before update on public.qb_items
  for each row execute function update_updated_at_column();

create trigger update_orders_updated_at before update on public.orders
  for each row execute function update_updated_at_column();

create trigger update_qbo_sync_updated_at before update on public.qbo_sync
  for each row execute function update_updated_at_column();

create trigger update_integration_tokens_updated_at before update on public.integration_tokens
  for each row execute function update_updated_at_column();

-- Sample data for testing (comment out in production)
-- insert into public.qb_items (sku, qb_item_id, name) values
--   ('OLIVE-001', '1', 'Premium Olives'),
--   ('FETA-001', '2', 'Greek Feta Cheese'),
--   ('BAKLAVA-001', '3', 'Traditional Baklava');