# Decisions log

Short records of technical choices that are not spelled out in
[spec.md](spec.md), or that adjust it. Newest first.

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
