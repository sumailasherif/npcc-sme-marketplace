# Decisions log

Short records of technical choices that are not spelled out in
[spec.md](spec.md), or that adjust it. Newest first.

## 2026-11-26 — Blueprint refinement: photo categories, SafePay, Juice

**Real photography.** 19 product and shop photos plus 12 category tiles, all
Wikimedia Commons (CC0 / CC BY / CC BY-SA), stored locally with
`CREDITS.md` and `CREDITS-categories.md`. Replace with commissioned Mauritian
photography before launch.

**SafePay escrow is the default for Pre-loved only.** Money is held until the buyer confirms
the item matches the listing and photos. Refund request → shop has 48 h → no
response auto-refunds; no buyer action auto-releases after 7 days. Juice is an
instant method that still lands in escrow. COD remains an option with delivery
OTP and the same dispute window. Escrow is a separate ledger from order status.

**Category density rule.** Each category page shows 4–6 verified shops and 6 real
listings, with a photo tile. A category stays hidden until it can meet the bar.

**Pre-loved visual direction: Gumtree browse + dark deal room.** Swappa was
dropped as a reference: it is tech-only and blocked automated review. The browse
screens now follow Gumtree — dark plum header, green CTAs, large search, location
radius, category tiles, local listing grid, watchlist. The negotiation itself
uses a charcoal/orange deal room (the Dribbble reference): chat, offers, voice
notes, meetup and SafePay status. Discovery stays light; the deal room is focused.

**Design system codified in `design/DESIGN.md`.** It synthesizes Impeccable
(paper/ink, colour as jewellery, mono for machine data, 11 px floor, flat
surfaces), Anthropic frontend-design (distinct point of view, no template
chrome), UI UX Pro Max (44 px targets, focus, reflow, reduced motion), Gumtree
(browse pattern) and the Dribbble deal room. Audit fixes: dark-screen specificity,
AA green, functional text floor, touch targets, orange focus in the deal room,
and removal of non-sequential numbering from the principles.

**Escrow is Pre-loved only.** Shop checkout uses Juice or cash on delivery; no
escrow on business orders. The seller payout screen shows a direct net balance,
and the dispute queue is scoped to Pre-loved.

**Current frame count.** 12 customer, 12 business, 12 resale, 5 delivery, 4 trust,
plus Cashflow = 46 frames and two live demos.

## 2026-11-25 — Six sections; services removed; resale and delivery added

The product is now six sections: **Buy, Business, Resale, Delivery, Trust, AI**.
Services, bookings and the `provider` role are **removed** from the plan and the
artefact. Full definition: [product-blueprint.md](product-blueprint.md).

**Business and resale are separate products, not one catalogue.** A business
shop has recurring stock and a catalogue. An individual seller has one item, a
condition, and a per-listing human review. They share identity, location, money
and admin, but not onboarding or the trust bar. `listings` is therefore a
separate table from `products`.

**Resale verification is strict.** Phone + national ID (front/back) + selfie
liveness match, then a human review of the first listing (photos, serial number,
category, price). Documents live in a private bucket. Prohibited items are
enumerated in the UI: food, medicine, counterfeits, stolen goods, weapons.

**Delivery is a verified third-party network, Grabbit first.** Partners must
provide company registration, insurance, fleet size, driver IDs, coverage and a
passing API sandbox. Only verified partners are bookable; pending partners are
visible but disabled. COD is reconciled separately from delivery completion.

**Trust is one console with three proof bars.** Business, individual and delivery
each have their own checklist, but one queue, one case record and one audit log.

**Naming: section 06 is "Cashflow".** It covers automatic invoices, revenue,
cost of goods, profit, balance sheet and AI analytics. The old "AI & money" label
is retired everywhere.

**Grabbit Express branding is used in the delivery section.** The official
wordmark (lime on black, "Powered by Kilo") is stored in
`design/prototype/assets/` and used on the partner card, checkout, tracking page
and fleet console. Grabbit is described as Mauritius's first 100% electric
on-demand delivery company; fleet, riders and battery telemetry are managed in
Kilo (`business.kiloapp.org`). Public tracking follows
`https://delivery.grabbit-express.com/track/{DEL_yyyy_nnn}/{code}`. The asset is
used for the pitch; trademark permission is still to confirm.

**Payments: SafePay escrow, Juice, COD.** SafePay holds the buyer's money until
they confirm the item matches the listing and photos. A refund request gives the
shop 48 hours to respond; no response auto-refunds; no buyer action auto-releases
after 7 days. Juice is an instant payment method that still lands in escrow. COD
keeps the dispute window and delivery OTP but bypasses the escrow balance. The
escrow ledger is separate from order status, so `delivered` never implies `paid`.

**Category system: photo tiles and a density rule.** Every category tile uses a
real photo, and every category page must show 4–6 verified shops plus 6 real
listings. A category with fewer than five listings stays hidden until it can meet
the bar. This prevents the marketplace from looking empty and prevents "related"
filler from diluting the filter.

**Consequence for the artefact.** `design/prototype/index.html` now has 13
customer screens, 12 business screens, 12 resale screens, 5 delivery screens, 4
trust screens, the Cashflow section and two live demos. Category pages filter for
real and show photo listings.

## 2026-11-26 — Two separate spaces: Bazar Business vs Bazar Pre-loved

- **Why:** Sherif asked for a clear distinction between SMEs on Bazar and the
  second-hand reselling/buying side, each with its own dashboard.
- **Decision:** Pre-loved gets its own shell, colours (plum + leaf, now real
  tokens in `globals.css` and `design/tokens.json`) and a personal dashboard at
  `/preloved/me`. Businesses keep teal and `/dashboard`. `/sell` is a fork
  page. Details in `design/DESIGN.md` §12.
- **Still demo data** for `/preloved/me` (`src/lib/demo/preloved.ts`).

## 2026-11-26 — Home page and categories reframed as e-commerce + SME storefronts

- **Why:** Sherif: Bazar is not a local market. It is a unified front for SMEs
  (e-commerce for buyers, Jiji-style for individual sellers, storefront +
  business support + AI for SMEs).
- **Demo categories** (`src/lib/catalog/data.ts`): reordered so non-food comes
  first; added `electronics` (Phones & electronics) with a demo shop
  (Phone Lakaz); renamed Fashion and Gifts & flowers. The **database seed is
  unchanged**; update the categories migration in M2 to match.
- **Partner fields:** optional `tagline` and `socials` (instagram, facebook,
  whatsapp) to show the channels a business already uses.

## 2026-11-25 — Marketplace architecture: three surfaces, two rails

Sherif approved [architecture.md](architecture.md), which widens the product from
a merchant tool into a full two-sided marketplace without discarding the M0/M1
work. Three choices were locked:

**Merchant-first slices, full marketplace by M4.** We keep the Mauritian SME
positioning and finish the merchant loop (list → buy → fulfil) before opening
the services rail. Every milestone must demo on its own; no breadth-first build.

**One `partners` table.** `shops` is renamed to `partners` with
`kind ∈ {shop, service, delivery}`, so verification, ratings, district and
geo-matching are defined once. `profiles.role` is replaced by a `user_roles`
table, so one person can be a shopkeeper and a rider and every grant is
auditable. This happens in M1.5, before catalogue work, while there is no
production data.

**Own-shop delivery + pickup, and direct booking.** No rider role before M7 and
no broadcast booking offers in the MVP. `orders.delivery_method` is
`pickup | partner_delivery`; `bookings` references the chosen `partner_id`
directly. The `rider` enum value exists so the schema does not need a later
migration.

Still open: SEO/i18n (cookie-only locale vs locale-prefixed public URLs) and the
final brand name. Both are recorded in §12 of architecture.md.

## 2026-11-25 — Applying migrations to the real project

M1 migrations were applied to the real Supabase project through the
dashboard **SQL Editor** (one transaction), not `supabase db push`, because
`db push` needs the database password. The script also wrote each version
into `supabase_migrations.schema_migrations`, the CLI's history table, so a
later `supabase db push` skips them. RLS was switched on for that history
table when the dashboard suggested it.

**Found in production, not in CI:** the real project did not grant table
access to `service_role` (the secret key), while the local CI database did.
Migration `20261125000300_service_role_grants.sql` grants it (now and for
future tables), and an RLS test checks it.

## 2026-11-25 — M1 choices

Approved with the M1 plan: **A** email codes only (phone OTP later, needs an
SMS provider), **B** login emails through Resend SMTP, **C** one shop per
account (`shops.owner_id` is unique), **D** no map pin yet (district only;
`location` and `h3_index` columns exist, empty), **E** database tests run in
CI against a throwaway local Supabase.

Small additions to the spec's data model:

- `categories.slug` and `categories.sort_order`: stable names for code and a
  display order. Seeded with 13 product and 5 service categories in en/fr/mfe.
- `shops.district` is an enum of the 9 districts plus Rodrigues.
- Helper functions: `set_updated_at()`, `handle_new_user()` (creates the
  profile on sign-up, saving the chosen language), `promote_shop_owner()`
  (buyer becomes merchant when they create a shop), `is_admin()` (for later
  policies), `is_reserved_slug()`.

Security choices beyond row policies: **column grants** stop users from
changing `profiles.role`, `shops.verification_status`, ratings, location or
`owner_id`, even on their own rows. Shop images live in a public
`shop-media` bucket under `<user id>/...`; only that user can write there,
and the server only accepts logo URLs from that folder.

Login flow: `signInWithOtp` creates the account on first use; the code is
checked with `verifyOtp(type: "email")`, falling back to `"signup"` for
first-time confirmations. Redirects after login only go to our own pages.

## 2026-11-25 — AI provider: OpenCode instead of Claude API

Sherif chose OpenCode as the AI provider, replacing the spec's "Claude API".
The app talks to it through the OpenAI-compatible chat format, set by three
server-only variables: `AI_BASE_URL`, `AI_API_KEY`, `AI_MODEL`. Because the
format is standard, the provider can be changed later by editing these values
only, with no code changes.

**Which OpenCode plan.** OpenCode's docs say the **Go subscription** is meant
for coding agents, and "apps that don't send a session ID can't use Go
models"; such apps should use the **pay-as-you-go Console API** (paid from the
account balance). Bazar is a normal web app, not a coding agent, so the
default `AI_BASE_URL` is the pay-as-you-go endpoint
`https://opencode.ai/inference/openai/v1`. We do not disguise app traffic as
coding-agent traffic.

**Model:** `deepseek-v4.1-flash` (Sherif's choice; ID confirmed from the
provider's model list on 25 Nov 2026).

**Still to confirm before M2:** a test call returned HTTP 402 "Insufficient
balance": the account has Go but no pay-as-you-go credits, which the app
needs. After a top-up, check the model accepts images (photo-to-listing) and
returns JSON. If it is text-only, photo-to-listing needs a vision model
(paste-a-post-to-listing and reply drafts still work with text). Guardrails from the spec are unchanged: server-only,
opt-in, Zod-validated, merchant reviews every output.

## 2026-11-25 — M0 setup choices

**Tailwind v4: tokens live in CSS, not `tailwind.config`.**
Tailwind v4 (the current version) defines the theme with `@theme` in
`src/app/globals.css`. The spec's "design tokens in Tailwind config" is met
there, with the spec's token names (`teal-500`, `text-h1`, `rounded-card`,
`shadow-e2` ...). `design/tokens.json` holds the same values for Figma, and a
unit test fails if the two files disagree. Approved by Sherif with the M0 plan.

**Cache Components turned off.**
Next.js 16 enables "Cache Components" in new projects. It requires every
cookie read to sit inside a `<Suspense>` boundary. Almost every page reads
the login or language cookie, so for the MVP we render per request instead.
We can turn it on later for public shop pages if speed needs it.

**Language in a cookie, not the URL.**
next-intl runs "without i18n routing". The language is stored in the
`NEXT_LOCALE` cookie, so the shared shop link stays exactly `/s/{slug}` as
the spec says, rather than `/en/s/{slug}`.

**Prices always "Rs 1,250".**
`formatPrice` uses the same format in every language, as the spec says, even
though French usually writes `1 250`. Dates use `25 Nov 2026` in Mauritius
time.

**Supabase keys: publishable and secret.**
Supabase now issues a "publishable" key (replacing "anon") and a "secret"
key (replacing "service_role"). The variables are
`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` and `SUPABASE_SECRET_KEY`; the old
keys also work in them. The secret key is only read in files marked
`server-only`, so the build fails if browser code imports it.

**Session refresh in `src/proxy.ts`.**
Next.js 16 renamed Middleware to Proxy. It refreshes Supabase auth cookies on
each request and does nothing until Supabase is configured.

**shadcn/ui on Base UI, Phosphor icons.**
The current shadcn CLI builds on Base UI primitives and uses the `cn` package
for class merging. `cn` is told about our custom tokens so `text-h1` and
`text-white` don't cancel each other out. Icons switched from Lucide to
Phosphor as the spec says.

**Kreol text needs a native check.**
`src/messages/mfe.json` is a first draft. A native Kreol speaker should
review it before testing with merchants (spec: "checked by native
speakers"). The same applies to French.
