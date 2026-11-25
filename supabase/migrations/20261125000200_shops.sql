-- M1 · Shops and the shop-media storage bucket

create type public.verification_status as enum ('pending', 'verified', 'rejected');

create type public.mu_district as enum (
  'port_louis',
  'pamplemousses',
  'riviere_du_rempart',
  'flacq',
  'grand_port',
  'savanne',
  'black_river',
  'plaines_wilhems',
  'moka',
  'rodrigues'
);

-- Words that cannot be shop links because the app uses them.
create or replace function public.is_reserved_slug(value text)
returns boolean
language sql
immutable
set search_path = ''
as $$
  select value = any (array[
    'admin', 'api', 'app', 'auth', 'bazar', 'dashboard', 'help', 'login',
    'logout', 'new', 'onboarding', 'privacy', 'settings', 'shop', 'shops',
    'signup', 'support', 'terms', 'www'
  ]);
$$;

create table public.shops (
  id uuid primary key default gen_random_uuid(),
  -- One shop per account for the MVP (decision C).
  owner_id uuid not null unique references public.profiles (id) on delete cascade,
  name text not null check (char_length(btrim(name)) between 2 and 60),
  slug text not null unique
    check (slug ~ '^[a-z0-9]([a-z0-9-]{1,38})[a-z0-9]$' and not public.is_reserved_slug(slug)),
  description text check (char_length(description) <= 500),
  category_id uuid references public.categories (id) on delete set null,
  -- Mauritius mobile in E.164: +230 5xxx xxxx
  whatsapp_phone text not null check (whatsapp_phone ~ '^\+2305[0-9]{7}$'),
  district public.mu_district not null,
  address text check (char_length(address) <= 200),
  location extensions.geography (point, 4326),
  h3_index text,
  logo_url text,
  cover_url text,
  verification_status public.verification_status not null default 'pending',
  rating_avg numeric(2, 1) not null default 0 check (rating_avg between 0 and 5),
  rating_count integer not null default 0 check (rating_count >= 0),
  delivery_options jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index shops_category_id_idx on public.shops (category_id);
create index shops_location_idx on public.shops using gist (location);

create trigger shops_set_updated_at
  before update on public.shops
  for each row execute function public.set_updated_at();

alter table public.shops enable row level security;

-- Shop pages are public (shared links), including unverified shops,
-- which show an "unverified" badge.
create policy "shops: public read"
  on public.shops for select
  to anon, authenticated
  using (true);

create policy "shops: owner creates own"
  on public.shops for insert
  to authenticated
  with check (owner_id = (select auth.uid()));

create policy "shops: owner updates own"
  on public.shops for update
  to authenticated
  using (owner_id = (select auth.uid()))
  with check (owner_id = (select auth.uid()));

-- Column-level guard: owners can never set verification_status, ratings,
-- location/h3 (server-computed later) or move the shop to another owner.
-- Admin changes go through server code with the secret key.
revoke all on public.shops from anon, authenticated;
grant select on public.shops to anon, authenticated;
grant insert (owner_id, name, slug, description, category_id, whatsapp_phone,
              district, address, logo_url, cover_url, delivery_options)
  on public.shops to authenticated;
grant update (name, slug, description, category_id, whatsapp_phone,
              district, address, logo_url, cover_url, delivery_options)
  on public.shops to authenticated;

-- Creating a shop turns a buyer account into a merchant account.
create or replace function public.promote_shop_owner()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.profiles
  set role = 'merchant'
  where id = new.owner_id and role = 'buyer';
  return new;
end;
$$;

create trigger shops_promote_owner
  after insert on public.shops
  for each row execute function public.promote_shop_owner();

-- ---------------------------------------------------------------------------
-- Storage: shop-media bucket (logos and covers), public read, 2 MB images
-- Files live under "<user id>/..." and only that user can write there.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('shop-media', 'shop-media', true, 2097152,
        array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

create policy "shop-media: owner reads own folder"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'shop-media'
         and (storage.foldername(name))[1] = (select auth.uid())::text);

create policy "shop-media: owner uploads to own folder"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'shop-media'
              and (storage.foldername(name))[1] = (select auth.uid())::text);

create policy "shop-media: owner updates own folder"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'shop-media'
         and (storage.foldername(name))[1] = (select auth.uid())::text)
  with check (bucket_id = 'shop-media'
              and (storage.foldername(name))[1] = (select auth.uid())::text);

create policy "shop-media: owner deletes own folder"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'shop-media'
         and (storage.foldername(name))[1] = (select auth.uid())::text);
