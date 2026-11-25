# Architecture & delivery plan — two-sided hyperlocal marketplace

Status: **accepted; §12 decisions locked 25 Nov 2026** · supersedes nothing,
extends [spec.md](spec.md)

> ServiceHub (Bheda Jenish & Rushi Joshi) is a **design reference only**. No code,
> copy, brand or assets are reused. This plan keeps the existing Bazar/Mauritius
> work and widens it from a merchant tool into a full two-sided marketplace.

---

## 1. The one-paragraph version

We already have a working foundation: Next.js 16 + Supabase, design tokens,
three languages, email-code auth, a merchant dashboard, shop creation with logo
upload, and Row Level Security with tests. What is missing is **the other half of
the marketplace** (buyers) and **the second rail** (services). The plan is:

> **One Next.js app, three route groups, one Supabase backend, one role table.**
> Buyer storefront, partner console and admin console are different _surfaces_
> over the same data. Authorisation lives in the database (RLS), never in the
> navigation. Products and services share one commerce spine (status machines,
> events, reviews, notifications) but keep separate workflow tables, because
> a cart-and-courier flow is not a slot-booking flow.

Build in **vertical slices**, not whole sides: every milestone must leave a
working buyer → partner loop, or a working customer → provider loop.

---

## 2. Where the project actually is today

Re-audited statically at `m1-auth-shop` / `d55ebaf` (no `npm run build`, per
instruction). The branch moved during planning: M1 shipped in between, so the
notes below describe the current branch, not `main`.

| Area             | State | Notes                                                               |
| ---------------- | ----- | ------------------------------------------------------------------- |
| Framework        | ✅    | Next.js 16.4.6, React 19.3, TypeScript, Tailwind v4                 |
| Design system    | ✅    | Tokens in `globals.css` + `design/tokens.json`, token-parity test   |
| i18n             | ✅    | next-intl, cookie-based, `en` / `fr` / `mfe`, switcher              |
| Supabase clients | ✅    | browser / server / admin, `server-only` guards, session proxy       |
| DB               | 🟡    | `profiles`, `categories`, `shops` + RLS + storage bucket only       |
| Auth             | 🟡    | Email 6-digit code works; phone OTP blocked (no SMS provider)       |
| Merchant app     | 🟡    | Dashboard home + onboarding only; nav has 2 items                   |
| Buyer app        | 🟡    | Shop storefront `/s/{slug}` + 404 + link previews; no catalogue yet |
| Partner roles    | 🔴    | `user_role` enum has no `provider` / `rider`                        |
| Admin            | 🔴    | No route group, no verification queue, no moderation                |
| AI               | 🔴    | Provider configured, no routes, no credits (HTTP 402)               |
| Tests            | 🟡    | 47 unit, 4 e2e, 25 RLS; **no tests for orders/bookings**            |
| CI               | ✅    | lint, format, typecheck, unit, local Supabase + RLS, build, e2e     |

### Findings that block "done"

1. **M1 lives on `m1-auth-shop`, not `main`.** The branch is ahead of `main` and
   the migrations have not been pushed to the real Supabase project yet. Until
   it merges, the deployed site does not have the storefront.
2. **The storefront is a shell.** `/s/{slug}` renders the shop header and a
   deliberate "no products yet" state, because `products` does not exist. The
   buyer side has a shop page but no catalogue, cart or order.
3. **No `images.remotePatterns`.** Supabase Storage images use raw `<img>` today.
   The moment we switch to `next/image` for product photos, the config must
   allow the project host.
4. **No route-level `loading.tsx` / `error.tsx`.** Shop has a `not-found.tsx`,
   but a failed Supabase call still surfaces as an unstyled crash.
5. **OG has no generated fallback.** Metadata uses `shop.logo_url` when present;
   shops without a logo share a bare link. Add `opengraph-image.tsx`.
6. **`shops` has no lifecycle column.** Public read is `true`, so once products
   exist we cannot distinguish draft/suspended shops from live ones without a
   new `status` column.
7. **i18n has no key-parity test.** `fr.json` is already ~500 bytes larger than
   `en.json`; missing keys silently fall back. Add a test.
8. **Seed data is a stub.** Demos and e2e need ~6 Mauritian shops with real
   products; `seed.sql` is two comment lines.
9. **No rate limiting.** Guest checkout and AI routes are the abuse targets; both
   arrive in the next milestones.
10. **Platform scope drift.** `spec.md` is merchant-first; the posted ServiceHub
    brief is a full marketplace. This document reconciles them. The wedge is now
    decided (see §12): merchant-first slices, full marketplace by M4.

---

## 3. Product surfaces and roles

### 3.1 Surfaces (three, not four)

| Surface             | Route group                    | Audience                          | Primary job                       |
| ------------------- | ------------------------------ | --------------------------------- | --------------------------------- |
| **Marketplace**     | `src/app/(public)/`            | Logged-out and buyer              | Find, trust, buy, book            |
| **Partner console** | `src/app/(partner)/dashboard/` | Merchant, service provider, rider | Sell, accept, fulfil, earn        |
| **Admin console**   | `src/app/(admin)/admin/`       | Platform staff                    | Verify, moderate, resolve, report |

Public shop pages (`/s/{slug}`) belong to the marketplace surface but render a
single partner's catalogue.

### 3.2 Roles

Replace the single `profiles.role` enum with a **role table** so one person can
be a shopkeeper and a rider, and so grants are auditable.

```sql
create type public.user_role as enum ('buyer','merchant','provider','rider','admin');

create table public.user_roles (
  user_id uuid references public.profiles(id) on delete cascade,
  role    public.user_role not null,
  granted_by uuid references public.profiles(id),
  granted_at timestamptz not null default now(),
  primary key (user_id, role)
);
```

- `handle_new_user()` inserts `buyer`.
- Creating a business entity grants `merchant` / `provider` / `rider`.
- `admin` is granted manually (SQL) or by an existing admin; never self-service.
- `profiles.primary_role` (derived or stored) drives post-login redirect and
  the default console.

### 3.3 The business entity: `partners`

A shop, a service business and a delivery agent are all **partners**. One table,
one verification workflow, one rating, one location.

```
profiles 1─n user_roles
profiles 1─n partners
partners.kind ∈ {shop, service, delivery}
```

Migration: rename `shops` → `partners`, add `kind`, `status`, `verified_at`,
`verified_by`. Keep the public URL `/s/{slug}` for shops and add `/p/{slug}` for
service providers; riders are never public.

Why one table: verification, trust badges, ratings, district and geo-matching are
identical across kinds. Splitting them triples the policy surface and guarantees
drift.

---

## 4. Route map and navigation

### 4.1 Marketplace (buyer)

```
(public)/
  layout.tsx                     MarketShell: header + bottom nav
  page.tsx                       1. Home: location, search, categories, nearby
  search/page.tsx                2. Results (products + services, filter, sort)
  c/[slug]/page.tsx              3. Category listing
  p/[slug]/page.tsx              4. Product detail
  s/[slug]/page.tsx              5. Shop storefront  ← MISSING, build first
  provider/[slug]/page.tsx       6. Service provider profile
  book/[serviceId]/page.tsx      7. Booking wizard (date → slot → address)
  cart/page.tsx                  8. Cart
  checkout/page.tsx              9. Checkout (guest allowed, COD)
  o/[token]/page.tsx            10. Order tracking (unguessable token)
  b/[token]/page.tsx            11. Booking tracking
  account/…                     12. Profile, addresses, orders, bookings, reviews
  sell/page.tsx                 Merchant landing ("open your shop")
  (marketing)/about|privacy|terms|help
```

**Buyer mobile nav (4 + FAB):** `Home · Explore · Orders · Account`, floating
"Near me" button on Home. Desktop: sticky header with location chip, search,
cart, account; no bottom bar.

Rules:

- Catalogue is browsable **logged out**. Identity is required only at checkout
  optional capture, and for order history.
- Guests order with name + phone; the order is reachable only through its
  128-bit token page, plus a WhatsApp confirmation link.
- Every list has an intentional empty state and skeleton.

### 4.2 Partner console

```
(partner)/dashboard/
  layout.tsx                     role-aware shell, guards, bottom nav
  page.tsx                       Home: tasks + KPIs (role-dependent)
  onboarding/page.tsx            Create partner (exists for shops)
  products/page.tsx              List / bulk status
  products/new/page.tsx          Create (AI or manual)  ← M2
  products/[id]/page.tsx         Edit, stock, images
  orders/page.tsx                Inbox of orders (realtime)
  orders/[id]/page.tsx           Detail + status actions
  services/page.tsx              Service catalogue      ← M4
  services/[id]/page.tsx         Edit, price, duration
  bookings/page.tsx              Booking requests
  bookings/[id]/page.tsx         Accept / decline / complete
  availability/page.tsx          Weekly rules + exceptions
  deliveries/page.tsx            Rider-assigned jobs    ← Phase 3
  inbox/page.tsx                 Unified messages + AI drafts  ← M6
  insights/page.tsx              Revenue, top items, low stock
  earnings/page.tsx              Commission, payouts
  settings/page.tsx              Profile, verification, AI consent, language
```

**Partner mobile nav (5):** `Home · Orders · Products · Inbox · Shop`.
Provider variant swaps `Orders/Products` for `Bookings/Services`. Desktop:
grouped sidebar (Sell, Operations, Money, Settings).

### 4.3 Admin console

```
(admin)/admin/
  layout.tsx                     desktop-first shell, hard role guard
  page.tsx                       Overview: GMV, orders, bookings, alerts
  verifications/page.tsx         Queue + approve/reject with reason
  users/page.tsx                 Search, roles, suspend
  partners/page.tsx              Directory, status, ratings
  categories/page.tsx            CRUD, ordering, translations
  orders/page.tsx                Oversight, refunds, disputes
  bookings/page.tsx              Oversight, reassignment
  reviews/page.tsx               Moderation
  complaints/page.tsx            Tickets
  payouts/page.tsx               Commission + settlement
  settings/page.tsx              Fees, service areas, feature flags
  audit/page.tsx                 Immutable action log
```

Admin nav: left sidebar only; tables with server-side pagination, filters in the
URL (`?status=&district=&page=`), and CSV export later.

### 4.4 Navigation rules

- **Guard in layout, enforce in DB.** `(partner)/layout.tsx` calls
  `requireRole('merchant'|'provider'|'rider')`; `(admin)/layout.tsx` calls
  `requireRole('admin')`. Every table still has RLS. Hiding a link is not
  security.
- **Post-login redirect** by `primary_role`: buyer → `/`, partner → `/dashboard`,
  admin → `/admin`. `?next=` still wins when safe (`safeNext`).
- **No dead links.** Every `href` in the app must resolve to a route that exists
  or be disabled with a reason. Add an e2e link crawler.
- Shop link pattern stays `/s/{slug}` (already in the spec and in merchant
  copy). Do not add a locale prefix to it.

---

## 5. Data model

Conventions already in place: `uuid` ids, `created_at` / `updated_at`, money
`numeric(10,2)` MUR, RLS on every table, column-level grants for sensitive
columns.

### 5.1 Identity and partners

| Table             | Key columns                                                                                                                                                                                                       | Notes                        |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `profiles`        | id, full_name, phone, preferred_language, avatar_url                                                                                                                                                              | drop `role`                  |
| `user_roles`      | user_id, role, granted_by, granted_at                                                                                                                                                                             | replaces enum column         |
| `partners`        | owner_id, kind, name, slug, description, category_id, whatsapp_phone, district, address, location, h3_index, logo_url, cover_url, status, verification_status, verified_at, verified_by, rating_avg, rating_count | was `shops`                  |
| `partner_members` | partner_id, user_id, role_in_partner                                                                                                                                                                              | staff accounts; optional MVP |

`partners.status`: `draft | active | suspended | closed`.
Only `active` partners appear in discovery. A `draft` still has a shareable link
so onboarding works, but shows "not yet open".

### 5.2 Catalogue

| Table                     | Key columns                                                                                                                                           |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `products`                | partner_id, title, description, category_id, price_mur, compare_at_mur, stock_qty, low_stock_threshold, status, images[], ai_generated, search_vector |
| `services`                | partner_id, category_id, title, description, price_type (`fixed`/`from`/`hourly`), price_mur, duration_minutes, status, images[], search_vector       |
| `availability_rules`      | partner_id, weekday, start_time, end_time, slot_minutes                                                                                               |
| `availability_exceptions` | partner_id, date, closed, note                                                                                                                        |

Stock is decremented inside the order-transition function, not by the client.

### 5.3 Commerce spine

Products and services share **events, reviews, notifications, audit**; they keep
separate order/booking tables.

| Table              | Purpose                                                                                                                                                                                           |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `orders`           | order_no, public_token, partner_id, buyer_id?, buyer_name, buyer_phone, channel, status, subtotal, delivery_fee, total, payment_method, payment_status, delivery_method, address, district, notes |
| `order_items`      | order_id, product_id, title_snapshot, unit_price_mur, qty                                                                                                                                         |
| `order_events`     | order_id, from_status, to_status, actor_id, note                                                                                                                                                  |
| `bookings`         | booking_no, public_token, partner_id, buyer_id?, service_id, status, scheduled_date, start_time, duration_minutes, price_mur, address, notes                                                      |
| `booking_events`   | booking_id, from_status, to_status, actor_id, note                                                                                                                                                |
| `invoices`         | order_id / booking_id, invoice_no, pdf_url, issued_at                                                                                                                                             |
| `payments` (later) | polymorphic to order/booking, method, amount, status, provider_ref                                                                                                                                |

`public_token`: `gen_random_bytes(16)` base32, unique index. Never sequential.
`order_no` is human-friendly (`GM-261125-0007`), not a secret.

### 5.4 Trust and operations

`reviews` (partner_id, order_id?, booking_id?, buyer_id, rating, comment,
status) · `complaints` · `inquiries` · `notifications` (outbox) · `ai_consents` ·
`ai_usage` · `audit_log` · `platform_settings`.

### 5.5 Status machines

Enforce transitions in **SQL functions**, not only in the UI.

```
order:   new → confirmed → preparing → ready → out_for_delivery → delivered → completed
         new|confirmed → cancelled
         delivered → refunded (admin only)

booking: requested → accepted → en_route → in_progress → completed
         requested → declined
         requested|accepted → cancelled_by_customer
         accepted → no_show
```

```sql
create function public.advance_order(p_order uuid, p_next public.order_status)
returns public.order_status
language plpgsql security definer set search_path = ''
-- locks the row (select ... for update), checks actor owns the partner,
-- rejects illegal jumps, inserts order_events, returns the new status.
```

Why: "impossible states" are the most common marketplace bug (delivered before
confirmed, double-accept, stock going negative). One function kills the class.

### 5.6 RLS matrix (default deny)

| Table               | anon                           | buyer                        | merchant/provider      | rider         | admin |
| ------------------- | ------------------------------ | ---------------------------- | ---------------------- | ------------- | ----- |
| partners            | read active                    | read active                  | read/write own         | read active   | all   |
| products / services | read active of active partners | same                         | CRUD own partner       | –             | all   |
| orders / bookings   | –                              | read own                     | read/write own partner | read assigned | all   |
| order_items         | –                              | own order                    | own partner            | assigned      | all   |
| reviews             | read visible                   | insert after completed order | read own               | –             | all   |
| notifications       | –                              | own                          | own                    | own           | all   |
| audit_log           | –                              | –                            | –                      | –             | read  |
| ai_*                | –                              | own consent                  | own shop usage         | –             | all   |

Guest checkout runs in a Server Action with the **secret-key client** after Zod
validation and rate limiting — anon never gets `insert` on `orders`. Guest order
reads go through the token page, also server-side. This keeps RLS closed without
weakening it.

---

## 6. Backend architecture

### 6.1 Mutation pattern (one shape everywhere)

```
Client form (useActionState)
  → Server Action
      1. auth + role check            (getUser / requireRole)
      2. Zod parse                    (shared schema, server-side)
      3. business guard               (owns partner? status allows it? slot free?)
      4. DB write via user client     (RLS applies)  — or SQL RPC for multi-row
      5. revalidatePath / revalidateTag
      6. return typed state            (field errors, never throw raw DB errors)
```

- **Server Actions** for in-app forms (already the pattern).
- **Route Handlers** for: AI (`/api/ai/*`), invoice PDF, OG images, cron
  (notifications), webhooks (payments, email), health.
- **No client-side writes** except Storage uploads (browser → bucket, RLS
  scoped to `{userId}/`), which is already correct.
- **Admin** uses `createAdminClient()` only inside `server-only` modules, and
  every admin mutation writes `audit_log` in the same transaction.

### 6.2 Money and inventory correctness

- Never accept a price, subtotal or total from the browser.
- At checkout: re-read every product, verify `status = 'active'` and stock,
  recompute subtotal + delivery fee, then insert in one SQL function with
  `for update` locks.
- `order_items.title_snapshot` / `unit_price_mur` snapshot the sale.
- Payment status is separate from order status (COD: `pending` → `paid` on
  delivery confirmation).
- Idempotency: `checkout_token` unique per buyer attempt; a double-tap returns
  the same order.

### 6.3 Search (cheap and good enough)

Skip pgvector for now. Use Postgres native:

```sql
alter table products add column search_vector tsvector generated always as (
  to_tsvector('simple', unaccent(coalesce(title,'') || ' ' || coalesce(description,'')))
) stored;
create index products_search_idx on products using gin (search_vector);
create extension if not exists pg_trgm;
```

- `simple` dictionary + `unaccent` avoids language-specific stemming, which
  matters for Kreol and mixed French/English listings.
- `pg_trgm` for typo tolerance on names.
- One `search_catalog(q, district, kind)` RPC unions products and services,
  ranks by `ts_rank * 0.6 + rating * 0.2 + proximity * 0.2`.
- Add multilingual synonyms in a table (`search_synonyms`) later; pgvector and
  embeddings stay a Phase 2 upgrade, not an MVP dependency.

### 6.4 Location

- PostGIS is already installed and `partners.location` is indexed with GiST.
- Discovery: `ST_DWithin(location, customer_point, radius_m)`; radius per
  category (e.g. 5 km products, 15 km services).
- **Fallback is district**, because Mauritius addresses are informal and
  geolocation permission is often denied. Never make location mandatory.
- `h3_index` stays as a denormalised column for later prefiltering. Do **not**
  add the H3 library or a routing engine now: at island scale PostGIS is exact
  and fast. Road-routing ETA is a Phase 3 concern with the rider rollout.

### 6.5 Realtime, notifications, AI

- **Realtime:** subscribe to `orders` / `bookings` filtered by `partner_id` on
  the detail and list pages only; fallback to refresh-on-focus. Do not put a
  channel on every page.
- **Notifications:** an outbox table (`notifications`), written in the same
  transaction as the status change, drained by a cron Route Handler. Email via
  Resend; WhatsApp via click-to-chat links (no Business API dependency).
- **AI:** server-only, opt-in, Zod-validated JSON, 10 s timeout, one retry,
  manual-form fallback, usage rows with no message content. Rate limit per
  user + per shop. Blocked today by billing (HTTP 402) and unconfirmed vision
  support — **do not let the roadmap depend on it.**

### 6.6 Caching

- Cache Components stays off (existing decision). Render per request now.
- When public pages get traffic: `revalidateTag('partner:{id}')` on catalogue
  changes and `revalidatePath('/s/{slug}')`. Shop pages are the natural first
  candidates for ISR because they are read-mostly.
- Never cache anything under `/dashboard` or `/admin`.

---

## 7. Frontend architecture

### 7.1 Rendering

- **Server Components by default.** Every page fetches through `lib/*` helpers
  (`cache()`-wrapped) using the request-scoped Supabase client.
- **Client islands only where needed:** cart quantity, filters, image upload,
  map, realtime status, mobile nav active state, dialogs.
- No global state library. No React Query. Server state is fetched on the
  server; form state is `useActionState`; UI state is local.
- **Cart:** cookie-based (works logged out, readable by RSC), validated and
  repriced on the server at checkout. Never trust the cookie's prices.

### 7.2 Folder conventions

```
src/
  app/(public)/…          buyer routes
  app/(merchant)/…        partner routes  → rename to (partner) when providers land
  app/(admin)/…           admin routes
  app/api/…               route handlers (ai, invoices, og, cron, webhooks)
  components/ui/          primitives (Button, Input, Card, Sheet, Table…)
  components/market/      buyer feature components
  components/partner/     console feature components
  components/admin/       admin tables and filters
  lib/<domain>/           queries + actions, one folder per domain
  lib/supabase/           clients (exists)
  messages/               en/fr/mfe (exists)
```

Rule: a page is thin; domain logic lives in `lib/<domain>`. Server Actions live
next to their route only when they are page-specific.

### 7.3 Component inventory to build

| Needed                                            | Exists | Notes                                          |
| ------------------------------------------------- | ------ | ---------------------------------------------- |
| Button, Input, Textarea, Select, Field            | ✅     | extend with `Card`, `Sheet`                    |
| StatusPill                                        | 🟡     | verification only → generic status machine map |
| ProductCard (grid/list, stock states)             | ❌     | buyer + partner reuse                          |
| ShopHeader (cover, logo, badge, rating, WhatsApp) | ❌     |                                                |
| CategoryRail / FilterChips                        | ❌     | horizontal scroll on 360px                     |
| SearchInput with suggestions                      | ❌     |                                                |
| CartLine / QuantityStepper / OrderSummary         | ❌     |                                                |
| RatingStars, ReviewCard                           | ❌     |                                                |
| EmptyState, Skeleton, ErrorBanner                 | ❌     | standardise per surface                        |
| DataTable + filters + pagination                  | ❌     | admin + partner lists                          |
| ImageUploader with crop                           | 🟡     | logo only today                                |
| Map (Leaflet, client-only, dynamic import)        | ❌     | Phase 2                                        |
| BottomNav / Sidebar                               | 🟡     | merchant only                                  |

### 7.4 UI/UX system

**Layout rules (already in the spec, keep them):** design at 360 px first,
44 px touch targets, 4 px spacing grid, 16 px page padding, max width 1200,
bottom nav on mobile → sidebar at 1280.

**Buyer home (from the ServiceHub screenshot, rebuilt in Bazar tokens):**

```
┌──────────────────────────────┐
│ 📍 Rose Hill ▾      🔔  🛒   │  slim top bar
├──────────────────────────────┤
│ Hi Sherif 👋                 │
│ Everything local,            │  display type, teal on sand
│ one search.                  │
│ [ Search services & products ]│
│ [ Browse categories → ]      │
├──────────────────────────────┤
│ Services near you            │
│ ( AC · Plumbing · Car · … )  │  horizontal rail, icon tiles
├──────────────────────────────┤
│ ✓ Verified  ✓ Fast  ✓ Cash   │  trust strip (icons + text)
├──────────────────────────────┤
│ Products near you   See all →│
│ (cards: image, price, shop)  │  horizontal rail
├──────────────────────────────┤
│ Home  Explore  Orders  Account│  bottom nav
└──────────────────────────────┘
```

Differences from the reference: no blue gradient, no fake "1234567890"; use the
district chip, real verified badges, `Rs` prices, and a WhatsApp CTA. Keep the
information hierarchy, not the skin.

**Partner home** answers "what do I do now?" — a task queue (new orders, booking
requests, low stock, unread messages) above KPI tiles, never a wall of charts.

**Admin home** is an operations dashboard: verification backlog, late orders,
open complaints, GMV today. Desktop tables, mobile cards.

### 7.5 i18n, images, metadata

- All strings through `next-intl` (existing rule). Add a **key-parity test** so
  `fr`/`mfe` cannot silently miss keys.
- Keep cookie-based locale for the app. **Decision needed** for SEO: public
  marketplace pages ideally need locale-prefixed URLs (`/fr/s/{slug}`). If SEO
  is a goal, move only the public group; if shareability matters more, keep
  cookies and add `?lang=` for shared links. Recommendation: keep cookies for
  the MVP, revisit after launch.
- `images.remotePatterns` for the Supabase host; `next/image` for catalogue
  imagery with explicit width/height to protect CLS.
- `generateMetadata` + `opengraph-image.tsx` per shop and product. This is a
  product feature (WhatsApp/Facebook previews), not polish.

---

## 8. Security, privacy, abuse

- RLS on every table; `security definer` helpers with `search_path = ''`
  (`is_admin`, `has_role`, `owns_partner`). Revoke execute from `anon`.
- Column-level grants for anything a user must not set (role, verification,
  ratings, totals, tokens).
- Secret key only in `server-only` modules; CI build fails if imported elsewhere.
- Rate limits: login, AI, guest checkout, review submit. Postgres-backed counter
  is enough at this scale; Upstash only if traffic demands it.
- Uploads: MIME + 2 MB (bucket policy exists), random paths, no SVG.
- Order tokens: 128-bit, single-purpose, no enumeration; rate-limit the lookup.
- Audit: verification decisions, role grants, refunds, status changes, admin
  edits.
- Privacy: collect only what an order needs; export/delete; DPA 2017 wording in
  all three languages; AI is opt-in and never trained on merchant data.

---

## 9. Testing and quality gates

| Layer | What must exist                                                                                                                            |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Unit  | Zod schemas, status transitions, cart repricing, search ranking, format, slug, **i18n key parity**                                         |
| DB    | RLS per table (cannot read/write across partners), illegal status jumps rejected, stock cannot go negative, token lookup only              |
| E2E   | 4 journeys at 360 px: guest buys; merchant fulfils; customer books; admin verifies. Plus link crawler, no horizontal scroll, 44 px targets |
| A11y  | axe on the 6 key screens; keyboard-only checkout; status never colour-only                                                                 |
| Perf  | LCP < 2.5 s on throttled 4G mid-range Android; route JS budget; no CLS from images                                                         |
| CI    | existing pipeline + `test:db` + seeded e2e; Lighthouse check later                                                                         |

Definition of done for any milestone: RLS test for every new table, one e2e happy
path, all three languages, no dead links, `npm run lint && npm run typecheck &&
npm test && npm run build` locally.

---

## 10. Delivery plan

Order matters: each milestone completes a **loop**, not a layer.

| #        | Milestone         | Both sides?                       | Done when                                                                                   |
| -------- | ----------------- | --------------------------------- | ------------------------------------------------------------------------------------------- |
| **M1.5** | Close-out + model | buyer sees seller                 | Branch merged, CI green, migrations pushed, `partners`/`user_roles` migration applied       |
| **M2**   | Catalogue         | merchant lists ↔ buyer browses    | Partner CRUD products, images, stock; buyer home/search/category/product pages; seed data   |
| **M3**   | Product orders    | buyer buys ↔ merchant fulfils     | Cart, COD checkout (guest), order token page, partner order inbox + status machine, email   |
| **M4**   | Services rail     | customer books ↔ provider accepts | Provider onboarding, services, availability, booking wizard, accept/decline, booking status |
| **M5**   | Trust & admin     | platform governs both             | Verification queue, roles, reviews, complaints, categories, audit, admin overview           |
| **M6**   | AI layer          | merchant is faster                | Photo/text → listing, reply drafts, smart search; invoices; insights                        |
| **M7**   | Delivery & polish | rider closes the loop             | Rider assignment + live status (optional), PWA, perf/a11y, demo script                      |

Why products before services: the codebase already has shops, categories and
product-oriented copy. Reusing that path proves the commerce spine cheaply; the
services rail then reuses the same guards and UI patterns instead of inventing
them twice.

### M1.5 / M2 start list (the immediate next commit)

**Close-out (ops, no new features)**

1. Push `m1-auth-shop`, get CI green, apply migrations with `supabase db push`,
   merge to `main`.
2. Add `loading.tsx` / `error.tsx` for `(public)` and `(merchant)`.
3. Add `manifest.ts` + icons + theme colour.
4. Add `opengraph-image.tsx` as the fallback when a shop has no logo.
5. Add `images.remotePatterns` in `next.config.ts` (needed for product photos).
6. Add the i18n key-parity unit test.

**Then M2 opens with the locked model change**

7. **Migrate `shops` → `partners`**: add `kind`, `status`, `verified_at`,
   `verified_by`; move `profiles.role` to `user_roles`; update
   `handle_new_user`, `promote_shop_owner`, RLS tests, `lib/shops.ts`,
   `database.types.ts` and the `/s/[slug]` page.
8. Add `products` + `product_images` (or `images[]`) with RLS and an RLS test.
9. Partner product CRUD (list, new, edit, stock, image upload).
10. Buyer home, category listing and product detail.
11. Seed 6 partners / 24 products in `supabase/seed.sql`.
12. e2e: open a seeded shop at 360 px, assert product grid, price, no overflow.

---

## 11. Risks and mitigations

| Risk                                          | Impact                            | Mitigation                                                                      |
| --------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------- |
| Scope: full ServiceHub = 3 surfaces × 2 rails | Never ships                       | Vertical slices; services deferred to M4; riders to M7                          |
| Cold start (no buyers)                        | Marketplace feels empty           | Merchant-first wedge: shop links work with zero buyers; marketplace opens at M3 |
| AI blocked (402, vision unknown)              | M6 slips                          | AI never gates a milestone; manual paths complete                               |
| Phone OTP unavailable                         | Friction for WhatsApp-first users | Email code now; WhatsApp click-to-chat; add SMS provider when funded            |
| Solo build, deadline unknown                  | Overrun                           | Milestones are independently demoable; stop at any boundary                     |
| Location data quality                         | Bad "near me"                     | District fallback; PostGIS only; no routing dependency                          |
| Locale/SEO trade-off                          | Weak search presence              | Decide before M2; cookie now, optional locale routes later                      |
| Payments                                      | No online money                   | COD first; `payments` table designed but unused                                 |
| Uncommitted work / drift                      | Lost changes, broken main         | Commit at every milestone boundary; CI is the gate                              |

---

## 12. Decisions

### Locked (25 Nov 2026, with Sherif)

1. **Wedge — merchant-first slices, full marketplace by M4.** Keep the Mauritius
   SME positioning. Ship the merchant loop (list → buy → fulfil) first, then open
   the services rail. No breadth-first build.
2. **Partner model — migrate `shops` → `partners` now**, with
   `kind ∈ {shop, service, delivery}`. No production data exists, so the rename
   is cheap.
3. **Commerce behaviour — own-shop delivery + pickup, and direct booking.**
   No rider role before M7. No broadcast booking offers in the MVP.

### Still open

4. **SEO/i18n:** cookie-only locale (shareable, simpler) vs locale-prefixed
   public URLs (indexable). _Recommendation: cookies for now; revisit after
   launch._
5. **Brand:** keep "Bazar" or move to a ServiceHub-style name. Affects domain,
   OG images, copy and the pitch — decide before M2.

### Consequences of the locked decisions

- The `partners` migration is part of **M1.5**, before any catalogue work.
  `products` and `services` both reference `partner_id` from day one.
- `orders.delivery_method ∈ {pickup, partner_delivery}`. A `rider` method and a
  `deliveries` table are reserved but not created until M7.
- `bookings` references a chosen `partner_id` directly. No `booking_offers`
  table.
- `user_roles` still includes `rider` in the enum so the schema does not need a
  later migration; nothing grants it until M7.

---

## 13. What I did not do

- I did **not** run `npm run build`, `npm test` or `npm run dev`.
- I did **not** change code, schema or translations.
- I did **not** commit the working tree.

Everything above is a proposal; `spec.md` remains the source of truth until this
document is approved and the affected sections are merged into it.
