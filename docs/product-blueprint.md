# Product blueprint — the Mauritian business hub

26 Nov 2026 · companion to [architecture.md](architecture.md) · visual artefact:
`design/prototype/index.html`

## 1. The product in one paragraph

A consolidated hub where Mauritians discover local businesses, order from a real
catalogue, and get it delivered — while owners run the shop, invoicing and money
from one console. A separate, strictly verified **resale** mode lets individuals
sell personal and second-hand items. A **delivery network** of verified companies
(Grabbit first) closes the loop. **Admin trust** verifies all three kinds of
supply, and an **AI layer** handles invoices, profit, analytics and suggestions.

Services (plumbers, electricians) are **out of scope**. They were removed on
25 Nov 2026.

## 2. The six sections

| #   | Section      | Who               | Job                                                              | Route group            |
| --- | ------------ | ----------------- | ---------------------------------------------------------------- | ---------------------- |
| 01  | **Buy**      | Customer          | Discover by category, order with Juice or cash, track            | `(public)`             |
| 02  | **Business** | Shop owner        | Catalogue, stock, orders, invoices, money                        | `(merchant)/dashboard` |
| 03  | **Resale**   | Individual seller | Verified second-hand and personal listings                       | `(public)/sell`        |
| 04  | **Delivery** | Courier company   | Jobs, tracking, COD, coverage, earnings                          | `(partner)/delivery`   |
| 05  | **Trust**    | Admin             | Three verification queues, disputes, audit                       | `(admin)/admin`        |
| 06  | **Cashflow** | Revenue + AI      | Invoices, revenue, profit, balance sheet, analytics, suggestions | `lib/ai`, `/api/ai/*`  |

**The key distinction:** business selling is recurring and catalogue-based.
Resale is one-off, identity-verified, and reviewed listing by listing. They share
identity, location, SafePay payments and admin, but **not** the same onboarding or the
same trust bar.

## 3. Personas

| Persona           | Side     | What they need                           | Sees             |
| ----------------- | -------- | ---------------------------------------- | ---------------- |
| Customer          | Demand   | One place to find, compare and buy local | Marketplace      |
| Business owner    | Supply   | Orders, catalogue, invoices, profit      | Business console |
| Individual seller | Supply   | A safe way to sell a phone or a desk     | Resale flow      |
| Delivery company  | Supply   | Jobs, routes, COD reconciliation         | Delivery console |
| Trust admin       | Platform | Proof, disputes and an audit trail       | Trust console    |

The customer is the same person in both buy and resale. The business owner and the
individual seller are different account modes, deliberately separated at the
first tap of "Sell".

## 4. Category taxonomy

Validated in the artefact, to be tested with 5 merchants and 5 customers before
M2. Labels carry English + Kreol so customers recognise their own market.

| Slug           | English             | Kreol        |
| -------------- | ------------------- | ------------ |
| `home-cooking` | Home cooking        | Manze lakaz  |
| `cakes`        | Cakes & pastries    | Gato         |
| `fruit-veg`    | Fruit & vegetables  | Fri ek legim |
| `groceries`    | Groceries & pantry  | Komisio      |
| `pickles`      | Pickles & achards   | Achard       |
| `drinks`       | Drinks & juices     | Bwason       |
| `fashion`      | Fashion & tailoring | Linz         |
| `beauty`       | Beauty & care       | Labote       |
| `crafts`       | Handicrafts         | Lartizana    |
| `home-living`  | Home & living       | Lakaz        |
| `kids`         | Kids & baby         | Zanfan       |
| `flowers`      | Flowers & gifts     | Fler ek kado |

**Behaviour:** tapping Handicrafts shows only handicraft shops. Each category is a
real filtered route (`/c/{slug}`), not a search shortcut. No "related" filler, no
paid placement in the first version.

**Density rule:** every category page shows **4–6 verified shops and 6 real
listings**, each with a photo. The category tile itself is a photo, not an icon.
If a category cannot reach five real listings, it stays hidden until it can. A
thin category damages trust more than a missing one.

## 5. Resale (individual sellers)

Jumia-style discipline, adapted to Mauritius:

1. **Choose the path.** "I run a business" vs "I'm selling my own things" — the
   first tap separates catalogue sellers from individuals.
2. **Verify identity.** Phone, national ID front/back, selfie liveness match.
   Documents live in a private bucket; only the trust team can open them.
3. **Read the rules.** Allowed categories, prohibited items (food, medicine,
   counterfeits, stolen goods, weapons), photo guidance and pricing help.
4. **Create the listing.** Photos, title, category, condition, price, handover
   (public meetup or Grabbit courier). AI suggests a title and a price range from
   similar **sold** items; the seller sets the final price.
5. **Human review.** The first listing is a draft until an admin checks the ID
   match, photos, serial number and category. Target under 24 hours.
6. **Sell safely.** Verified badge, meet-in-public guidance, inspect before
   paying, never pay in advance, report and appeal paths.

**Why the bar is higher:** a second-hand phone can be stolen or counterfeit in a
way a cake cannot. The review form changes with the type.

**Browse is Gumtree-style.** A dark plum header, green CTAs, a large search bar,
location radius, category tiles, a local listing grid and a watchlist. It is
general classifieds, not phones only. The tech-only Swappa price-guide direction
was dropped.

**Negotiation is a dark deal room.** Charcoal and orange, chat-first, with offers,
voice notes, meetup suggestions and SafePay status. Discovery stays light and
trustworthy; the deal room is focused and urgent.

## 6. Delivery network

Shops can deliver themselves, offer pickup, or hand the parcel to a verified
partner. **Grabbit Express is the first integration** — Mauritius's first 100%
electric on-demand delivery company. Fleet, riders and battery telemetry are
managed in **Kilo** (`business.kiloapp.org`).

The public tracking link follows
`https://delivery.grabbit-express.com/track/{DEL_yyyy_nnn}/{code}` and is branded
Grabbit Express (lime on black, "Powered by Kilo"). It shows the errand, live
status, delivery fee in MUR, cash-on-delivery state and the rider timeline.

| Step         | What happens                                                         |
| ------------ | -------------------------------------------------------------------- |
| Quote        | Checkout asks the partner API for a price and ETA for the district   |
| Book         | Order creates a job; the partner accepts and assigns a driver        |
| Track        | Customer sees courier, status, OTP and ETA                           |
| Collect cash | COD is collected, then remitted to the shop                          |
| Reconcile    | Every remittance writes to the order timeline and the shop statement |

**Verification bar for a delivery company:** company registration, insurance
(parcel value), fleet size, driver IDs and licences, coverage districts, a signed
cash-handling addendum, and a live API sandbox test. Re-checked every 6 months.

Only verified partners are bookable. Pending companies appear in the directory as
"not bookable yet", never hidden silently.

### 6.1 Payments: Juice and cash for shops, SafePay for Pre-loved

**Shop orders are paid directly.** Juice or cash on delivery. There is **no
escrow** on business orders: the buyer pays the shop, and the protection is the
delivery OTP plus a 48-hour dispute window.

**SafePay escrow is only for Pre-loved resale.** The buyer pays; Bazar holds the
money until the buyer confirms the item matches the listing, photos and
description. Only then is the individual seller paid.

| Section       | Methods                                  | Protection                         |
| ------------- | ---------------------------------------- | ---------------------------------- |
| Business shop | Juice, cash on delivery                  | Delivery OTP + 48 h dispute window |
| Pre-loved     | SafePay escrow (Juice/card), cash meetup | Money held until buyer confirms    |

**Escrow states (Pre-loved only):**
`pending → held → released | refunded | partially_refunded`.

- **Release:** buyer taps "Confirm & release"; the seller is paid on the next
  payout.
- **Refund request:** buyer picks a reason (not as described, damaged, not
  delivered, other). The seller has **48 hours** to respond with evidence.
- **No response:** SafePay auto-refunds the buyer.
- **No action by buyer:** SafePay auto-releases after **7 days**.
- **Evidence:** listing photos, chat, courier proof and delivery OTP.
- **Juice refunds** go back to the buyer's Juice wallet in 1–3 working days.
- **Resale seller view:** available, in escrow, released and refunded.
- **Pre-loved disputes:** one queue with release/refund actions and an audit row
  for every decision.

The platform fee is separate from escrow. Whether to charge an escrow fee is
still open; the prototype does not show one.

## 7. Cashflow & AI that earns its place

| Feature                 | Who      | Pain                             | Shipped |
| ----------------------- | -------- | -------------------------------- | ------- |
| Photo/text → listing    | Business | Blank page, inconsistent prices  | M2      |
| **Automatic invoices**  | Business | No transaction record            | M3      |
| Revenue, cost, profit   | Business | Money managed from memory        | M4      |
| Balance sheet           | Business | No clean view for the accountant | M4      |
| Smart analytics         | Business | "What actually sells?"           | M5      |
| Reply drafts            | Business | Unanswered WhatsApp messages     | M3      |
| Price suggestion        | Resale   | Sellers guess and lose money     | M2.5    |
| Explainable suggestions | Customer | Endless scrolling                | M5      |
| Near-you picks          | Customer | Discovery is district-based      | M5      |

**Guardrails**

- Money is **never** model output. Totals, profit and the balance sheet are SQL
  views; the model writes the sentence around the number.
- Every invoice, listing and reply is a draft until a human approves it.
- Every customer suggestion shows a reason ("because you bought gato patate
  twice"), and preferences can be edited or switched off.
- AI permissions are per feature, opt-in, and never train on merchant data.

## 8. Navigation

```
/                          Buy · home (categories, near you, for you)
├── /c/{slug}              Category page (filtered)
├── /search                Search shops + products
├── /s/{slug}              Shop storefront
├── /p/{slug}              Product detail
├── /cart → /checkout      Cart, delivery choice, COD
├── /o/{token}             Order tracking (Grabbit included)
├── /sell                  Resale landing (business vs individual)
│   ├── /sell/verify       ID + selfie + phone
│   ├── /sell/rules        What can be sold
│   ├── /sell/new          Create listing
│   ├── /sell/listings     Active, pending, sold
│   └── /listing/{id}      Buyer view of a second-hand item
├── /dashboard             Business console
│   ├── products | orders | invoices
│   ├── analytics | money | customers
│   └── settings
├── /delivery              Delivery partner console (Grabbit)
└── /admin                 Trust console
    ├── verifications      businesses | individuals | delivery
    ├── listings           review queue
    ├── disputes
    └── audit
```

## 9. Data model delta

Reuses `profiles`, `user_roles`, `partners`, `products`, `orders`, `reviews`.

```sql
-- resale
seller_profiles   (user_id, verification_status, id_document_url,
                   selfie_url, phone_verified_at, reviewed_by, reviewed_at)
listings          (seller_id, category_id, title, description, condition,
                   price_mur, images[], status, review_note, search_vector)
offers            (listing_id, buyer_id, amount_mur, status)

-- delivery
delivery_partners (name, registration_no, insurance_url, fleet_size,
                   coverage districts[], status, api_status, verified_at)
shipments         (order_id, partner_id, driver_ref, status, fee_mur,
                   tracking_url, cod_amount, remitted_at)

-- business payments (no escrow)
payments           (order_id, method juice|cod, amount_mur,
                    status pending|paid|refunded, provider_ref)

-- Pre-loved orders and escrow (resale only)
listing_orders     (id, listing_id, buyer_id, seller_id, amount_mur,
                    handover meetup|courier, status, created_at)
escrow_transactions(listing_order_id, state pending|held|released|refunded,
                    held_at, released_at, refunded_at, reason, actor_id)
disputes           (listing_order_id, buyer_id, seller_id, reason,
                    evidence[], status, resolution, resolved_by, resolved_at)
payouts            (seller_id, amount_mur, status, period_start, period_end,
                    statement_url)

-- trust
verification_cases (subject_type, subject_id, status, assigned_to, reason)
audit_log          (actor_id, action, entity_type, entity_id, before, after)
```

`listings` is deliberately separate from `products`: resale has condition,
single quantity and review-per-listing; business products have stock and a
recurring catalogue.

## 10. Delivery plan

| #    | Slice                                               | Proof                                                      |
| ---- | --------------------------------------------------- | ---------------------------------------------------------- |
| M1.5 | Merge M1, `partners` + `user_roles`                 | CI green, migrations pushed                                |
| M2   | Products, categories, buyer browse                  | 4–6 shops + 6 photo listings per category; filters correct |
| M2.5 | Resale verification + listings                      | a verified individual publishes one reviewed listing       |
| M3   | Cart, Juice or cash on delivery, automatic invoices | guest order → shop paid directly → invoice drafted         |
| M3.5 | Delivery network + Grabbit                          | one order delivered with tracking and COD reconciled       |
| M4   | Revenue, profit, balance sheet                      | owner exports a month statement                            |
| M5   | Smart analytics + customer suggestions              | 5 users act on an explained suggestion                     |
| M6   | Reviews, disputes, payouts, admin polish            | admin verifies all three supply types                      |
| M7   | Rider dispatch and live status                      | optional, only if volume justifies it                      |

Every milestone must leave a working customer → supply loop. No milestone ships
a screen with no counterpart.

## 11. Risks

| Risk                              | Mitigation                                                                       |
| --------------------------------- | -------------------------------------------------------------------------------- |
| Six sections becomes six products | Ship in the order above; resale and delivery are gated on hub volume             |
| Resale fraud                      | ID + selfie + first-listing review + stolen-device checks + report path          |
| Delivery partner failure          | Only verified partners; insurance; COD reconciliation; fallback to shop delivery |
| AI trust                          | Money from SQL, drafts only, visible reasons, opt-in                             |
| Cold start                        | Business hub first; resale uses existing buyer traffic; Grabbit brings supply    |
| Category sprawl                   | 12 labels, tested with users; merge rather than add                              |

## 12. Visual artefact

Design rules, tokens and the audit are in [design/DESIGN.md](../design/DESIGN.md).

`design/prototype/index.html` (no build step) contains:

- **Overview** — six sections, category taxonomy, who gets verified, IA map.
- **Customer** - 12 screens: home, category filter, search, shop, product, cart,
  checkout with Juice/cash, confirmation, orders, tracking, for-you, saved.
- **Business** - 12 screens: dashboard, orders, order detail, products, AI editor,
  inventory, money, analytics, invoices, customers, settings, payouts (direct,
  available vs paid).
- **Resale** - 12 screens: landing, verify, rules, create, preview, my listings,
  buyer view, Gumtree-style browse, dark deal room, offer accepted, transaction
  complete, SafePay wallet.
- **Delivery** - 5 screens: checkout options, partners, tracking, Grabbit console,
  and the public Grabbit tracking link (`/track/DEL_2026_119/NAJS4SYF`).
- **Trust** - 4 screens: queue, individual review, delivery review, Pre-loved
  escrow disputes.
- **Category system** — 12 photo tiles; each category page shows 4–6 shops and
  6 real listings, and filters for real.
- **Cashflow** — playable invoice animation, revenue/profit/balance sheet,
  guardrails.
- **Live demo** — clickable customer and seller flows.
- **Roadmap** — Now / Next / Later with acceptance criteria.

## 13. Implementation map (demo UI)

The Next.js build mirrors the artefact. Every frame has a route or a section
inside one; the flows that the artefact shows as a single scroll are combined
rather than duplicated.

| Section   | Routes                                                                                                                                                                                                                                                                        |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Buy       | `/`, `/c/[slug]`, `/search`, `/s/[slug]`, `/p/[slug]`, `/cart`, `/checkout`, `/o/[token]`, `/o/[token]/track`, `/account`, `/for-you`, `/saved`                                                                                                                               |
| Business  | `/dashboard`, `/dashboard/orders`, `/dashboard/orders/[id]`, `/dashboard/products`, `/dashboard/products/new`, `/dashboard/inventory`, `/dashboard/money`, `/dashboard/analytics`, `/dashboard/invoices`, `/dashboard/customers`, `/dashboard/settings`, `/dashboard/payouts` |
| Resale    | `/preloved`, `/preloved/[slug]`, `/preloved/[slug]/deal`, `/preloved/[slug]/offer`, `/preloved/complete`, `/preloved/wallet`, `/sell`, `/sell/verify`, `/sell/rules`, `/sell/new`, `/sell/preview`, `/sell/listings`                                                          |
| Delivery  | `/delivery`, `/delivery/partners`, `/track/[deliveryId]/[code]`; checkout offers shop delivery, Grabbit Express, or pickup                                                                                                                                                    |
| Trust     | `/admin`, `/admin/verifications`, `/admin/verifications/[id]`, `/admin/disputes`                                                                                                                                                                                              |
| Cashflow  | `/dashboard/money` (revenue, profit, balance sheet, AI narrative) and `/dashboard/invoices`                                                                                                                                                                                   |
| Auth / DB | `/login`, `/dashboard/onboarding`, `/s/[slug]` (real shop branch behind the demo catalogue)                                                                                                                                                                                   |

Demo data lives in `src/lib/demo/`; catalogue data in `src/lib/catalog/`. Photos
are local files in `public/photos/` with credits, ready to be replaced by
merchant photography. Prices and totals are computed in TypeScript, not by a
model. Escrow exists only in the Pre-loved routes.

## 14. Open decisions

- Final brand name and whether resale gets a sub-brand.
- Commission: flat per order, per category, or subscription.
- Grabbit commercial terms: per-parcel fee, COD remittance schedule, insurance.
- Juice merchant account and API access; who holds the escrow balance and under
  which licence.
- Escrow fee: none, flat, or a small percentage. Refund SLA and auto-release
  window (currently 48 h to respond, 7 days to auto-release).
- Whether individual sellers can also post services (currently no).
- SEO/i18n routing (cookie-only vs locale-prefixed public URLs).
