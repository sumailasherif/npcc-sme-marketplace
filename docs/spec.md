# SME Marketplace × ServiceHub — Holistic Product Plan

NPCC National AI Startups Lab · Nov 25, 2026 · @DEEN

## ServiceHub as inspiration

ServiceHub, by Bheda Jenish and Rushi Joshi, is a source of ideas only. We write our own code, design and brand from scratch, so no licence is needed.

Ideas we take from it: the customer / partner / admin role split, hyperlocal matching by distance and availability, and separate flows for service bookings and product delivery.

If judges ask about prior work, naming ServiceHub as an inspiration is good practice.

## What lines up between the two

The SME report found the problem; ServiceHub shows a proven shape for the solution.

| Your SME report                                                              | ServiceHub                                             |
| ---------------------------------------------------------------------------- | ------------------------------------------------------ |
| Two-sided marketplace for Mauritian SMEs                                     | Customer app + partner app + admin app on one backend  |
| Searchable local directory (products and services)                           | Hyperlocal discovery (H3 + PostGIS, 5 km geofence)     |
| Merchant dashboard: inventory, orders                                        | Shopkeeper role: products, inventory, orders           |
| Trust: verified profiles, reviews                                            | Partner verification (KYC) + ratings                   |
| Delivery for cash-on-delivery sellers                                        | Delivery agent role + order workflow                   |
| AI layer: listings, Kreol/French search, reply drafts, invoices, forecasting | Mostly missing. This is your contribution              |
| Mauritius, WhatsApp-first, cash                                              | Built for India (sample data, flows). Needs localising |

ServiceHub is a useful reference, but it solves "find a plumber". The research shows a sharper pain: SMEs are online but can't sell, and they lose orders in comments and DMs. The edge is the combined product with your AI layer and Mauritian focus; service categories are an extra, not the core.

Grabbit Express fits naturally: its riders can be the delivery-agent role in Mauritius, which is far more credible than "we'll recruit delivery agents".

## Product concept

One-liner (draft): An AI sales assistant for Mauritian small businesses. It turns your Facebook and WhatsApp chaos into a real shop, and puts you on a local marketplace where people can actually find you.

The key choice is to start with the merchant, not the marketplace. The SWOT names cold start as the biggest risk, so the rollout runs in three phases:

1. **Phase 1, merchant tool.** Every seller gets a shareable shop link with a catalogue, an order button and consistent prices. It is useful from day one with zero buyers on the platform, because the seller posts the link on Facebook and WhatsApp.
2. **Phase 2, marketplace.** Once enough shops exist, open the public discovery app, with hyperlocal search inspired by ServiceHub.
3. **Phase 3, services and delivery.** Add service bookings (caterers, repairers) and Grabbit delivery.

This follows the report's "meet them where they are" principle and its Airbnb/OpenTable logic.

## Users and roles

| Role                               | Phase                          | Main job                                                |
| ---------------------------------- | ------------------------------ | ------------------------------------------------------- |
| Merchant (home seller, small shop) | 1                              | List products, capture orders, get paid, see what sells |
| Buyer                              | 1 (via shop link), 2 (via app) | Find, trust, order                                      |
| Admin                              | 1 (light)                      | Verify merchants, moderate, handle support              |
| Service provider                   | 3                              | Accept bookings                                         |
| Delivery rider                     | 3                              | Pick up and drop off (Grabbit)                          |

## Where AI earns its place

This is the NPCC "AI fit check": each feature maps to a pain from the research.

| AI feature                                                                                                             | Pain it fixes (from the report)       | Priority     |
| ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ------------ |
| Photo or message to listing: snap a product or paste a WhatsApp/FB post; AI writes title, description, category, price | Missing and inconsistent descriptions | MVP          |
| Reply assistant: drafts answers to "price?" and "available?" in English, French or Kreol                               | Unanswered comments = lost sales      | MVP          |
| Auto invoices and receipts                                                                                             | No transaction record                 | MVP (simple) |
| Smart search ("gâteau patate" = "sweet potato cake")                                                                   | No discoverability                    | Phase 2      |
| Sales insights ("your samosas sell out on Fridays")                                                                    | Inventory managed from memory         | Phase 2      |
| Demand forecasting                                                                                                     | Stock planning                        | Later        |

The privacy concern in the report (80% worried, per Bindah et al.) becomes a design rule: every AI feature is opt-in, explained in plain language, and never trains on or shares business data.

## UX principles

1. **WhatsApp-native.** Orders can arrive by WhatsApp and are captured in the app. Never force sellers to abandon WhatsApp.
2. **Phone-only, one-thumb.** Merchants run the business between other tasks.
3. **Kreol, French and English from day one**, at least in the AI and key labels.
4. **Cash first, digital optional.** Cash on delivery as the default; Juice, MyT Money and similar later.
5. **Trust visible everywhere.** Verified badge, reviews, "replies within 1 hr".
6. **Zero data re-entry.** Excel import and photo-to-listing.

## Screens to design

The prototype needs about 14 screens.

**Merchant app**

1. Onboarding (3 steps)
2. Home dashboard: today's orders, unanswered messages
3. Add product via photo/AI
4. Product list and inventory
5. Orders inbox: WhatsApp and in-app in one place
6. AI reply drafts
7. Shop link share
8. Simple sales insights

**Buyer side**

1. Shop page (from shared link)
2. Product detail
3. Checkout (cash on delivery)
4. Order tracking
5. Marketplace home and search (Phase 2 preview)

## Brand direction

A proposal to react to, not a decision.

Name ideas with Kreol roots, which stand out and signal "local" (domains and trademarks still to check):

- **Bazar**: Port Louis's market, which everyone knows
- **LaBoutik**: Kreol for "the shop"
- **Lakaz Biznes**

Colours. The repo uses generic slate/indigo; this palette gives it an island identity.

| Role       | Colour               | Hex     |
| ---------- | -------------------- | ------- |
| Primary    | Lagoon teal          | #0E7C86 |
| Ink (text) | Deep sea             | #0F2A33 |
| Accent     | Flamboyant red-coral | #F05A3C |
| Highlight  | Pineapple yellow     | #F6B93B |
| Background | Sand                 | #FAF6EF |
| Success    | Palm green           | #2E9E6B |

Bright coral is for badges and large display; the main "Order now" buttons use the darker coral-700 with white text so contrast passes accessibility checks (full token table below).

Type: Plus Jakarta Sans for headings, Inter for body. Both handle French accents well.

Logo direction: a map pin shaped like a woven tant basket. It reads "local market + location" without leaning on the dodo cliché.

## Build order

Each deliverable lines up with a stage of the NPCC Startup Journal: the prompt prototype and Wizard-of-Oz test fill page 4, and the questionnaire feeds page 5.

| #   | Deliverable                                                                     | Format             | NPCC stage        |
| --- | ------------------------------------------------------------------------------- | ------------------ | ----------------- |
| 1   | Brand and design system (colours, type, components, logo concepts)              | Design system      | Prototype         |
| 2   | App screens (merchant + buyer)                                                  | Design canvas      | Prototype         |
| 3   | Interactive walkthrough of how it works                                         | Clickable web page | Prototype / pitch |
| 4   | One real AI feature working (photo/message to listing, in Kreol/French/English) | Prompt prototype   | Prototype (4D)    |
| 5   | Questionnaire for testing with merchants and buyers                             | Google Doc         | Test              |
| 6   | 3-minute pitch outline                                                          | Doc or slides      | Test (5F)         |

## Open questions before building

- [x] Interview findings: what did merchants say? Exact quotes will shape the screens and the pitch more than anything else.
- [x] ServiceHub arrangement: decided: inspiration only, no code reused.
- [x] Name and brand: do any of the names or colours above feel right, or is there one already?
- [x] Grabbit: include Grabbit Express as the delivery partner in the story?
- [ ] NPCC deadline: when is the next submission or demo day? That decides how much we build.

---

# Build spec: scope, stack and structure

This and the next five sections are the brief for Claude Code. We build a full-stack, mobile-first website first; the native app comes later on the same Supabase backend. It follows ServiceHub's proven shape (roles, hyperlocal matching, one backend) but is written from scratch, merchant-first, for Mauritius. "Bazar" is the working name until the brand is chosen.

**MVP scope (Phase 1):** merchant onboarding, shop profile, products with AI listing, public shop link, cash-on-delivery orders, unified inbox with AI reply drafts, simple invoices, basic sales insights, light admin verification.

**Out of MVP:** native mobile app (later, same backend), marketplace discovery (Phase 2), service bookings, rider dispatch and live tracking (Phase 3), online payments, demand forecasting.

| Layer                 | Choice                                                                    | Why                                                                                                 |
| --------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Framework             | Next.js (App Router) + TypeScript + React                                 | Server-rendered shop pages load fast on mobile data and show link previews on WhatsApp and Facebook |
| Styling               | Tailwind CSS + shadcn/ui, themed with our design tokens                   | Consistent UI, fast to build                                                                        |
| Server logic          | Next.js Route Handlers and Server Actions                                 | Frontend and backend in one codebase                                                                |
| Database, auth, files | Supabase: Postgres + PostGIS, Auth (phone OTP + email), Storage, Realtime | One managed backend the app will reuse later                                                        |
| Validation            | Zod                                                                       | Same rules on forms and API                                                                         |
| AI                    | Claude API, called only from server routes                                | API key never reaches the browser                                                                   |
| Maps                  | Leaflet + OpenStreetMap (react-leaflet)                                   | No Google Maps fees                                                                                 |
| Languages             | next-intl with en, fr, mfe message files                                  | English, French, Kreol                                                                              |
| Invoices              | @react-pdf/renderer on the server                                         | Generated, no AI needed                                                                             |
| Notifications         | Email (Resend) + WhatsApp click-to-chat links; web push later             | Works with how sellers already operate                                                              |
| Install on phone      | PWA manifest                                                              | Feels like an app without the stores                                                                |
| Tests                 | Vitest (unit) + Playwright (end-to-end)                                   | Catch regressions before demos                                                                      |
| Hosting               | Vercel (web) + Supabase (backend), free tiers                             | Live URL for judges                                                                                 |

## Repo structure

```
npcc-sme-marketplace/
  src/
    app/
      (public)/              # landing, s/[slug] shop page, product page,
                             # checkout, order tracking
      (merchant)/dashboard/  # home, products, orders, inbox, invoices,
                             # insights, shop settings
      (admin)/admin/         # merchant verification, moderation
      api/                   # ai/listing, ai/reply, invoices/[id]
    components/ui/           # design-system components (shadcn-based)
    components/              # feature components
    lib/                     # supabase (server + browser), ai, zod schemas, utils
    messages/                # en.json, fr.json, mfe.json
  supabase/
    migrations/              # numbered SQL files
    seed.sql                 # Mauritian demo shops and products
  design/tokens.json         # exported from Figma
  tests/                     # unit + e2e
  docs/                      # this spec, decisions, test notes
```

## Data model

All tables live in Supabase Postgres with `id uuid`, `created_at` and `updated_at`. Money is stored as `numeric(10,2)` in Mauritian rupees (MUR) and shown as "Rs 1,250".

| Table        | Key fields                                                                                                                                                                                                                                                                                                                                | Notes                                                  |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| profiles     | id (= auth user), role [buyer, merchant, admin; later provider, rider], full_name, phone, preferred_language [en, fr, mfe], avatar_url                                                                                                                                                                                                    | One row per account                                    |
| shops        | owner_id, name, slug (unique), description, category_id, whatsapp_phone, district, address, location (PostGIS point), h3_index, logo_url, cover_url, verification_status [pending, verified, rejected], rating_avg, rating_count, delivery_options (json)                                                                                 | Slug makes the public link: /s/{slug}                  |
| categories   | name_en, name_fr, name_mfe, parent_id, type [product, service]                                                                                                                                                                                                                                                                            | Seeded with Mauritian SME categories                   |
| products     | shop_id, title, description, category_id, price_mur, stock_qty, low_stock_threshold, status [draft, active, archived], images (text[]), ai_generated (bool)                                                                                                                                                                               | One price everywhere, fixing inconsistent listings     |
| orders       | order_no, shop_id, buyer_id (nullable for guests), buyer_name, buyer_phone, channel [shop_link, whatsapp, facebook, instagram, manual], status, subtotal_mur, delivery_fee_mur, total_mur, payment_method [cash_on_delivery; later juice, card], payment_status, delivery_method [pickup, merchant_delivery; later rider], address, notes | Guests can order without an account                    |
| order_items  | order_id, product_id, title_snapshot, unit_price_mur, qty                                                                                                                                                                                                                                                                                 | Snapshot keeps old orders correct after price changes  |
| order_events | order_id, status, actor_id                                                                                                                                                                                                                                                                                                                | Audit trail of every status change                     |
| inquiries    | shop_id, source [whatsapp, facebook, instagram, web], customer_handle, message_text, ai_draft, status [new, drafted, replied, converted], order_id                                                                                                                                                                                        | The unified inbox; merchants paste or forward messages |
| invoices     | order_id, invoice_no, pdf_url, issued_at                                                                                                                                                                                                                                                                                                  | Numbered per shop                                      |
| reviews      | shop_id, order_id, buyer_id, rating (1-5), comment                                                                                                                                                                                                                                                                                        | Only after a completed order                           |
| ai_consents  | user_id, listing_enabled, replies_enabled                                                                                                                                                                                                                                                                                                 | All AI is opt-in                                       |
| ai_usage     | shop_id, feature, model, tokens_in, tokens_out, accepted (bool)                                                                                                                                                                                                                                                                           | Usage and acceptance metrics, no message content       |

Order statuses: new, confirmed, preparing, ready, out_for_delivery, delivered, completed. An order can be cancelled from new or confirmed.

Later tables (Phase 3, ServiceHub-style): services, bookings, booking_offers (first-accept-wins), deliveries, rider_locations.

## Core flows and AI contracts

### Merchant onboarding

1. Sign up with phone OTP or email; pick language.
2. Create shop: name, category, district, WhatsApp number, logo. The slug is generated and editable.
3. Add a first product (AI or manual). The shop goes live as "unverified" with a shareable link.
4. Admin reviews and marks it verified; the badge appears.

### Buyer order (cash on delivery)

1. Buyer opens /s/{slug} from WhatsApp or Facebook.
2. Browses products, adds to cart, enters name, phone, address and pickup or delivery.
3. Places the order with no account needed; gets an order page and a WhatsApp confirmation link.
4. Merchant gets an email and a dashboard alert, then moves the order through its statuses.
5. On completion an invoice PDF is generated and the buyer is invited to review.

### Inbox to order

1. Merchant pastes a customer message from WhatsApp, Facebook or Instagram.
2. AI drafts a reply and suggests matching products.
3. Merchant edits, copies the reply into WhatsApp with one tap, and can convert the inquiry into an order.

### AI feature contracts

Server routes only; every output is reviewed by the merchant before it is published or sent.

| Endpoint              | Input                                                                             | Output (JSON)                                                                                  | Guardrails                                                                                                                              |
| --------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| POST /api/ai/listing  | 1-3 photos and/or pasted post text, shop category, language                       | title, description, category_id, suggested_tags, price_mur if found in text, detected_language | Never invents a price; flags low-confidence fields; saved as draft                                                                      |
| POST /api/ai/reply    | inquiry text, shop name, up to 30 active products (title, price, stock), language | intent [price, availability, order, delivery, other], reply_text, matched_product_ids          | Only quotes prices and stock from the catalogue; replies in the customer's language; never promises delivery times the shop has not set |
| Phase 2: smart search | query text                                                                        | ranked products                                                                                | Synonyms across en, fr, mfe ("gâteau patate" = "sweet potato cake") via pgvector embeddings                                             |

Use a current Claude Sonnet model with structured JSON output, validate every response with Zod, and fall back to the manual form when the AI fails.

## Security, privacy and localisation

- **Row Level Security on every table.** Merchants read and write only their own shop's rows. Buyers see only their own orders; guests see an order only through its unguessable order link. Admins act through server routes using the service role key, never from the browser.
- **Secrets server-side only.** Supabase service key, Claude API key and email key live in Vercel environment variables.
- **AI privacy.** AI is off until the merchant opts in. Message text is sent to the AI only for the request at hand and is not stored in ai_usage. The privacy page says this in plain English, French and Kreol.
- **Data protection.** Collect only what an order needs; let merchants export and delete their data; align with the Mauritius Data Protection Act 2017.
- **Abuse limits.** Rate-limit AI routes and guest checkout per IP and phone; validate every input with Zod; compress and size-limit image uploads.
- **Audit.** Every order status change and every verification decision is logged in an events table.
- **Localisation.** All UI strings in en.json, fr.json and mfe.json; language switcher in the header; layouts allow about 30% longer French text; prices formatted as "Rs 1,250"; dates as 25 Nov 2026.

## Milestones and acceptance criteria

Build in this order; each milestone ends with a deploy to Vercel and a short demo. Dates follow once the NPCC deadline is confirmed.

| #   | Milestone                 | Done when                                                                                                                                  |
| --- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| M0  | Setup                     | Next.js + Tailwind + shadcn running; Supabase project linked; design tokens in Tailwind config; CI runs lint and tests; live URL on Vercel |
| M1  | Auth and shop             | Merchant signs up (OTP or email), creates a shop, and /s/{slug} shows it publicly                                                          |
| M2  | Products + AI listing     | Merchant adds a product from a photo; AI fills title, description and category in under 10 seconds; merchant edits and publishes           |
| M3  | Ordering                  | Guest places a cash-on-delivery order from a shop link; merchant sees it in real time and moves it through every status                    |
| M4  | Inbox + AI replies        | Merchant pastes a Kreol or French message and gets a correct draft reply quoting real catalogue prices                                     |
| M5  | Invoices, insights, admin | PDF invoice on completion; dashboard shows revenue, top products and low stock; admin can verify or reject shops                           |
| M6  | Polish and test           | All three languages complete; Lighthouse mobile score 90+; RLS tests pass; 5 real merchants complete the onboarding test                   |

## Claude Code working rules

- Write all code from scratch. Do not copy code from ServiceHub or any other repo; ServiceHub is only a design reference.
- Stack: Next.js (App Router) + TypeScript, Tailwind CSS + shadcn/ui, Supabase (Postgres + PostGIS, Auth, Storage, Realtime), Zod, next-intl (en, fr, mfe), Claude API called only from server routes. Deploy on Vercel.
- Follow the repo structure, data model, flows, AI contracts, security rules and design tokens in this spec exactly. Ask before changing any of them.
- Work one milestone at a time (M0 to M6). Before each milestone, show a short plan and wait for OK.
- Make small commits with clear messages. After each commit, explain in simple, beginner-friendly steps what was done and why.
- Every table gets Row Level Security policies plus a test proving a merchant cannot read another shop's data.
- Never put secrets in client code. Use .env.local and list every variable in .env.example.
- Mobile-first: design at 360px wide first, touch targets at least 44px.
- All UI text goes through next-intl message files; no hard-coded strings.
- Every AI output is shown to the merchant for review before it is saved or sent, and every AI feature is opt-in.

---

# Design system: tokens and logo

Every token below has a contrast ratio checked against WCAG AA (4.5:1 for normal text). Use the token names in both Figma variables and the Tailwind config so design and code match.

## Colour

| Token              | Hex     | Use                                                    | Contrast                                |
| ------------------ | ------- | ------------------------------------------------------ | --------------------------------------- |
| teal-50            | #E6F4F5 | Selected rows, info backgrounds                        | -                                       |
| teal-100           | #C2E5E7 | Hover fills, tags                                      | -                                       |
| teal-500 (primary) | #0E7C86 | Primary buttons, links, active nav                     | 4.95 on white                           |
| teal-700           | #0A5C63 | Pressed state, headings on light                       | 7.71 on white                           |
| coral-100          | #FDE3DD | Promo and "new order" highlights                       | -                                       |
| coral-500          | #F05A3C | Illustrations, badges, large display only              | 3.37 with white text: not for body text |
| coral-700 (CTA)    | #C0402A | "Order now" and other main calls to action, white text | 5.24 on white                           |
| yellow-500         | #F6B93B | Ratings, warnings, "low stock"                         | 8.52 with ink text                      |
| yellow-100         | #FDF1D6 | Warning backgrounds                                    | -                                       |
| ink-900            | #0F2A33 | Body text, headings                                    | 13.9 on sand                            |
| ink-700            | #35505A | Secondary text                                         | -                                       |
| ink-500            | #5E747D | Muted text, placeholders                               | 4.92 on white                           |
| ink-300            | #B8C6CB | Borders, dividers                                      | -                                       |
| ink-100            | #E7EDEF | Disabled fills, skeletons                              | -                                       |
| sand-50            | #FAF6EF | Page background                                        | -                                       |
| white              | #FFFFFF | Cards, inputs                                          | -                                       |
| success-500        | #2E9E6B | Success icons and fills                                | -                                       |
| success-700        | #237A53 | Success text                                           | 5.28 on white                           |
| error-600          | #B83232 | Errors, destructive actions                            | -                                       |

## Typography

Plus Jakarta Sans for headings, Inter for body; tabular figures for prices.

| Style   | Font              | Size / line height | Weight |
| ------- | ----------------- | ------------------ | ------ |
| Display | Plus Jakarta Sans | 32 / 40            | 800    |
| H1      | Plus Jakarta Sans | 24 / 32            | 700    |
| H2      | Plus Jakarta Sans | 20 / 28            | 700    |
| H3      | Plus Jakarta Sans | 17 / 24            | 600    |
| Body L  | Inter             | 16 / 24            | 400    |
| Body    | Inter             | 14 / 20            | 400    |
| Label   | Inter             | 13 / 16            | 600    |
| Caption | Inter             | 12 / 16            | 500    |
| Price   | Inter             | 18 / 24            | 700    |

## Spacing, radius, elevation, layout

- Spacing on a 4 px grid: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64.
- Radius: 6 chips, 10 buttons and inputs, 16 cards, 24 bottom sheets and modals, full for pills and avatars.
- Elevation (shadow colour ink-900): e1 0 1 2 at 8%, e2 0 4 12 at 10%, e3 0 12 24 at 14%.
- Breakpoints: 360 (mobile, design here first), 768 (tablet), 1280 (desktop dashboard).
- Page padding 16 on mobile, 24 on tablet, 32 on desktop; content max width 1200.
- Minimum touch target 44 x 44.

## Logo spec

- Mark: a map pin whose head is a woven tant basket; must read clearly at 24 px.
- Wordmark: Plus Jakarta Sans ExtraBold, ink-900 or white.
- Versions: full colour on sand, single-colour ink, reversed white on teal-500, app icon (mark on teal-500, rounded square).
- Clear space: the height of the basket on every side; never stretch, recolour outside the palette or add effects.
- Exports: SVG for web, PNG at 1x/2x/3x, favicon 32 and 180 px, Open Graph image 1200 x 630 for shared shop links.

## Components, icons, imagery and accessibility

Build each component once in Figma with variants, then once in code under components/ui.

| Component          | Variants and states                                                                                                                     |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| Button             | primary (teal), CTA (coral-700), secondary (outline), ghost, destructive; sizes S/M/L; default, hover, pressed, loading, disabled       |
| Input and textarea | default, focus, error, disabled; with label, helper text, prefix "Rs" for prices                                                        |
| Search bar         | empty, typing, with suggestions                                                                                                         |
| Chip / filter      | default, selected, removable                                                                                                            |
| Product card       | grid and list; in stock, low stock, sold out; with AI-draft tag                                                                         |
| Shop header        | cover, logo, name, verified badge, rating, WhatsApp button                                                                              |
| Order card         | compact and full; status pill                                                                                                           |
| Status pill        | new (coral), confirmed (teal), preparing and ready (yellow), out for delivery (teal), delivered and completed (green), cancelled (grey) |
| AI suggestion card | sparkle icon, "AI draft, check before sending" label, accept / edit / regenerate buttons                                                |
| Inbox item         | source icon (WhatsApp, Facebook, Instagram, web), unread dot, status                                                                    |
| Navigation         | mobile bottom nav (merchant: Home, Orders, Products, Inbox, Shop); desktop sidebar; top bar with language switcher                      |
| Overlays           | bottom sheet, modal, toast, confirmation dialog                                                                                         |
| Feedback           | empty state with illustration, skeleton loader, error banner                                                                            |
| Commerce bits      | quantity stepper, cart summary, price display, rating stars, verified badge, image uploader with crop                                   |
| Charts (insights)  | revenue line, top-products bar, KPI tile                                                                                                |

- **Icons:** Phosphor icons, Regular weight, 24 px (20 px in dense lists); open licence and a React package. Use the brand marks for WhatsApp, Facebook and Instagram only inside source labels.
- **Imagery:** real photos of Mauritian sellers and products, taken with consent, are the first choice. Empty states use flat illustrations recoloured to the palette (unDraw or a local illustrator). Avoid stock photos that look foreign.
- **Motion:** 150-250 ms ease-out for transitions; no heavy animation, since many users have low-end phones. Respect "reduce motion".
- **Accessibility:** WCAG 2.2 AA; visible focus rings (teal-500, 2 px); never colour alone for status (pill text plus icon); alt text on product images (AI drafts it); text scales to 130% without breaking layout; forms announce errors to screen readers.
- **Writing style:** short, warm and plain. Buttons are verbs ("Add product", "Send reply"). Write English first, then French and Kreol, checked by native speakers.

## Figma setup, plugins and tools

Figma Education plan (free) via figma.com/education/apply with a school email.

Two Figma files:

1. **Bazar: Design System** — pages Cover, Foundations, Components, Patterns, Changelog.
2. **Bazar: Website** — pages Cover, User journeys (FigJam embeds), Merchant flows, Buyer flows, Admin, Prototype, Handoff, Archive.

Setup:

1. Create variable collections: Colour primitives (the hex table), Colour semantic (bg, surface, text, primary, cta, border, success, warning, error; light mode now, dark later), Spacing, Radius.
2. Create text styles for every row of the type table, and effect styles e1-e3.
3. Build components with auto layout and variants, named with slashes (Button/Primary/M). Use variables, never raw hex.
4. Design every screen at 360 px first, then 768 and 1280. Use a 4-column mobile grid with 16 px margins; 12 columns on desktop.
5. Link screens into a clickable prototype; this becomes the interactive walkthrough for testing and judges.
6. Hand off in Dev Mode, and export tokens to design/tokens.json so Claude Code can generate the Tailwind theme.

Plugins: Tokens Studio (export tokens.json), Stark (contrast), Iconify (Phosphor icons), Unsplash (placeholder photos), Content Reel (Mauritian names/prices/addresses), Autoflow (flow arrows).

Tools: Figma, FigJam, Google Fonts, Phosphor, unDraw, Stark/WebAIM, Maze, Google Forms, Claude Code + VS Code + GitHub, one low-end Android (2-3 GB RAM) plus an iPhone, Chrome DevTools device mode, printed paper screens for in-person tests, phone camera for product photos.
