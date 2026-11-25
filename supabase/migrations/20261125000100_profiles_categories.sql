-- M1 · Profiles and categories
-- Every table: id uuid, created_at, updated_at, Row Level Security ON.

create extension if not exists postgis with schema extensions;

-- ---------------------------------------------------------------------------
-- Shared helper: keep updated_at current on every UPDATE
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
create type public.user_role as enum ('buyer', 'merchant', 'admin');
create type public.app_language as enum ('en', 'fr', 'mfe');
create type public.category_type as enum ('product', 'service');

-- ---------------------------------------------------------------------------
-- profiles: one row per account (id = auth user id)
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role public.user_role not null default 'buyer',
  full_name text check (char_length(full_name) <= 100),
  phone text check (phone ~ '^\+[1-9][0-9]{6,14}$'),
  preferred_language public.app_language not null default 'en',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;

-- A user can read and edit only their own profile.
create policy "profiles: read own"
  on public.profiles for select
  to authenticated
  using (id = (select auth.uid()));

create policy "profiles: update own"
  on public.profiles for update
  to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

-- Column-level guard: nobody can change their own role (no self-made admins).
-- Rows are created by the trigger below, never directly by users.
revoke all on public.profiles from anon, authenticated;
grant select on public.profiles to authenticated;
grant update (full_name, phone, preferred_language, avatar_url)
  on public.profiles to authenticated;

-- Create a profile automatically when someone signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  lang text := new.raw_user_meta_data ->> 'preferred_language';
begin
  insert into public.profiles (id, preferred_language)
  values (
    new.id,
    case when lang in ('en', 'fr', 'mfe') then lang::public.app_language else 'en' end
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- True when the current user is an admin. Used by later policies.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  );
$$;

revoke execute on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

-- ---------------------------------------------------------------------------
-- categories: Mauritian SME categories in English, French and Kreol
-- (slug and sort_order are small additions for stable code references)
-- ---------------------------------------------------------------------------
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  name_en text not null,
  name_fr text not null,
  name_mfe text not null,
  parent_id uuid references public.categories (id) on delete restrict,
  type public.category_type not null default 'product',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index categories_parent_id_idx on public.categories (parent_id);

create trigger categories_set_updated_at
  before update on public.categories
  for each row execute function public.set_updated_at();

alter table public.categories enable row level security;

-- Anyone (even logged out) can read categories. Only admins change them,
-- through server code with the secret key.
create policy "categories: public read"
  on public.categories for select
  to anon, authenticated
  using (true);

revoke all on public.categories from anon, authenticated;
grant select on public.categories to anon, authenticated;

insert into public.categories (slug, name_en, name_fr, name_mfe, type, sort_order) values
  ('cakes-snacks',     'Cakes & snacks',          'Gâteaux et snacks',        'Gato ek gajak',          'product', 10),
  ('home-cooked-food', 'Home-cooked meals',        'Plats faits maison',       'Manze lakaz',            'product', 20),
  ('drinks',           'Drinks & juices',          'Boissons et jus',          'Bwason ek ji',           'product', 30),
  ('fruit-veg',        'Fruit, veg & groceries',   'Fruits, légumes, épicerie','Fri, legim ek komisio', 'product', 40),
  ('pickles-sauces',   'Pickles, achards & sauces','Achards, piments, sauces', 'Asar, piman ek sos',     'product', 50),
  ('fashion',          'Clothes & fashion',        'Vêtements et mode',        'Linz ek lamod',          'product', 60),
  ('beauty',           'Beauty & personal care',   'Beauté et soins',          'Labote ek swin',         'product', 70),
  ('crafts',           'Crafts & handmade',        'Artisanat',                'Lartizana',              'product', 80),
  ('home-garden',      'Home & garden',            'Maison et jardin',         'Lakaz ek zardin',        'product', 90),
  ('kids-baby',        'Kids & baby',              'Enfants et bébés',         'Zanfan ek baba',         'product', 100),
  ('electronics',      'Phones & electronics',     'Téléphones et électronique','Portab ek elektronik', 'product', 110),
  ('flowers-gifts',    'Flowers & gifts',          'Fleurs et cadeaux',        'Fler ek kado',           'product', 120),
  ('other-products',   'Other products',           'Autres produits',          'Lot prodwi',             'product', 990),
  ('catering',         'Catering & events',        'Traiteur et événements',   'Traiter ek levennman',   'service', 1010),
  ('repairs',          'Repairs',                  'Réparations',              'Reparasion',             'service', 1020),
  ('hair-beauty-svc',  'Hair & beauty services',   'Coiffure et esthétique',   'Kwafir ek estetik',      'service', 1030),
  ('tutoring',         'Tutoring & lessons',       'Cours et soutien scolaire','Leson priye',            'service', 1040),
  ('other-services',   'Other services',           'Autres services',          'Lot servis',             'service', 1990);
