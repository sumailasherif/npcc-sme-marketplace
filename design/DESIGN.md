# Bazar design system — Market paper / Night market

Status: **working system**, 26 Nov 2026. Source of truth for the prototype
(`design/prototype`) and the app (`src/`). Tokens live in
`src/app/globals.css`; this file explains the rules behind them.

## 1. The direction

**What Bazar is:** a unified front for Mauritian SMEs to get customers and a
digital presence beyond Facebook, Instagram and WhatsApp. Buyers get an
e-commerce experience; individuals get Jiji-style classifieds (Pre-loved);
businesses get a better storefront plus business support and an AI assistant.
It is **not** a neighbourhood food market: no "what's fresh near you" framing,
no district-first home page.

**Market paper by day, night market for the deal.**

The marketplace is warm sand paper, teal ink and a coral stamp. It should feel
like a Mauritian market ledger: photographed goods, clear prices, district names,
handwritten energy without fake nostalgia. The **Pre-loved deal room** is the one
dark surface: charcoal, orange, chat-first. It is a **mode**, not a theme, and it
exists because negotiation is a different job from browsing.

This is a deliberate answer to the generic AI defaults: no cream + serif +
terracotta landing page, no near-black + acid-green SaaS shell, no identical
rounded cards with the same grey shadow everywhere.

## 2. Influences and what we take

| Source                                          | What we take                                                                                                    | What we reject                                                                          |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **Impeccable** (`pbakaus/impeccable/DESIGN.md`) | Paper/ink surfaces; colour as jewellery; mono for machine data; flat by default; 11 px floor; one lit indicator | Its gold/patina palette and extension density                                           |
| **Anthropic frontend-design**                   | A distinct point of view; subject-grounded copy; one bold moment; restraint; critique while building            | Template chrome: decorative all-caps eyebrows, numbered markers that are not a sequence |
| **UI UX Pro Max**                               | Pre-delivery checklist: contrast, focus, 44 px targets, reflow, reduced motion, no emoji icons, chips that wrap | Generic style catalogue output                                                          |
| **Gumtree**                                     | Dark plum header, green CTAs, big search, category tiles, local listing grid, watchlist                         | Its ad-heavy chrome and marketplace clutter                                             |
| **Dribbble Pre-loved shot**                     | Chat-first deal room, offers, voice notes, transaction complete + review                                        | Full-dark skin across the whole product                                                 |
| **Swappa**                                      | Dropped: tech-only, blocked review                                                                              | Price-guide/condition-grade focus for a general classifieds market                      |

## 3. Colour

### Day — market paper

| Token           | Hex       | Use                        | Rule                   |
| --------------- | --------- | -------------------------- | ---------------------- |
| `sand-50`       | `#F6F5F1` | Page background            | Never pure white pages |
| `white`         | `#FFFFFF` | Cards, inputs              | One level of surface   |
| `teal-500`      | `#0E7C86` | Primary actions, links     | 4.95:1 on white        |
| `teal-700`      | `#0A5C63` | Hover, headings on light   | 7.71:1                 |
| `coral-700`     | `#C0402A` | Main CTA, stamps           | 5.24:1 with white      |
| `coral-500`     | `#F05A3C` | Badges, large display only | Not for body text      |
| `yellow-500`    | `#F6B93B` | Ratings, low stock         | Always with ink text   |
| `ink-900`       | `#0F2A33` | Body and headings          | 13.9:1 on sand         |
| `green-700`     | `#237A53` | Money, success, buy        | 5.28:1 with white      |
| `gumtree-plum`  | `#2B2130` | Pre-loved browse header    | White text only        |
| `gumtree-green` | `#1B7A1B` | Pre-loved CTA              | White text passes AA   |

**Rules**

- **Colour is jewellery.** Teal fills the primary action; coral is a stamp. Never
  use either as a large decorative wash.
- **No colour-only meaning.** Status is dot + text. Condition is a word, not a
  hue. Prices carry the `Rs` symbol.
- **Gumtree green was darkened** from `#22A022` to `#1B7A1B` for 4.5:1 white
  text. Do not brighten it back without rechecking contrast.

### Night — deal room (Pre-loved only)

| Token         | Hex       | Use               |
| ------------- | --------- | ----------------- |
| `night-bg`    | `#111113` | Screen            |
| `night-card`  | `#1B1B1F` | Bubbles, cards    |
| `night-line`  | `#2C2C31` | Borders           |
| `orange`      | `#FF6B2C` | Offer, CTA, focus |
| `night-text`  | `#F4F4F5` | Primary text      |
| `night-muted` | `#A1A1AA` | Secondary text    |

The deal room is the **only** dark surface. Never use it for shop checkout,
seller dashboards, admin or the marketplace.

## 4. Typography

- **Headings:** Plus Jakarta Sans, 600–800, tight tracking (`-0.02em` to `-0.035em`).
- **Body:** Inter, 400–600.
- **Machine data:** `ui-monospace` for prices, counts, IDs, status dots and
  section labels. This is Impeccable's "mono means machine" rule.
- **Sentence case** for headings, buttons and eyebrows. Uppercase is reserved for
  mono system labels (field labels, diagram labels, tags).
- **11 px floor** for anything functional. 11 px is for metadata; controls are
  12 px and up. Nothing essential at 8–9 px.
- **Prices:** tabular figures, `Rs 1,250`, no decimals on whole rupees.
- **Line length:** 60–75 characters on marketing copy; never over 80.

| Style   | Size / line | Weight |
| ------- | ----------- | ------ |
| Display | 32 / 40     | 800    |
| H1      | 24 / 32     | 700    |
| H2      | 20 / 28     | 700    |
| H3      | 17 / 24     | 600    |
| Body L  | 16 / 24     | 400    |
| Body    | 14 / 20     | 400    |
| Label   | 13 / 16     | 600    |
| Caption | 11 / 16     | 500    |
| Price   | 18 / 24     | 700    |

## 5. Layout, shape, elevation

- 4 px spacing grid: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64.
- Radius: 6 chips, 10 buttons, 16 cards, 24 sheets, full pills.
- Page padding: 16 mobile, 24 tablet, 32 desktop; content max 1200.
- Touch targets: **44 × 44 minimum**. Icon buttons may look 36 px but the hit
  area is 44.
- **One surface level.** Cards are not nested. Dense lists use rules and borders,
  not shadows. Shadow is for floating surfaces only (sticky CTA, sheets).
- Focus: 2 px teal ring at 2 px offset; orange ring inside the deal room.

## 6. Components

| Component     | Rules                                                                                                         |
| ------------- | ------------------------------------------------------------------------------------------------------------- |
| Button        | Primary teal, CTA coral, buy green, deal-room orange; 44 px min; loading and disabled states; verb labels     |
| Status pill   | Dot + text; new coral, preparing yellow, ready teal, done green, cancelled grey                               |
| Chip          | Selected state has weight + fill, not colour alone; horizontal scroll on phone with a visible edge affordance |
| Category tile | Photo, bottom gradient, icon chip, English + Kreol; 84 px tall                                                |
| Listing card  | 4:3 photo, green price, location, negotiable tag, save heart                                                  |
| Shop card     | 56 px cover, name, verified badge, district, rating                                                           |
| Escrow card   | Only in Pre-loved; shows held/released/refunded; never in shop checkout                                       |
| Deal room     | Charcoal, chat bubbles, voice note, offer card, SafePay status                                                |
| Empty state   | One sentence + one action; no illustration debt                                                               |

## 7. Motion

- 150–250 ms, ease-out. Motion answers an action; it does not decorate.
- One orchestrated moment per surface: the invoice animation, the deal-room
  transition, the order confirmation.
- Respect `prefers-reduced-motion`.
- No parallax, no scroll-jacking, no bouncing cards.

## 8. Pre-delivery checklist (from UI UX Pro Max)

- [ ] No emoji as icons; SVG only.
- [ ] Text contrast ≥ 4.5:1 (large text ≥ 3:1).
- [ ] Visible focus for keyboard, including the dark deal room.
- [ ] 44 px touch targets.
- [ ] `prefers-reduced-motion` respected.
- [ ] Text, chips and badges reflow at 375, 768, 1024, 1440 without clipping.
- [ ] Status not conveyed by colour alone.
- [ ] Prices tabular; IDs and counts mono.
- [ ] Headings balanced; no orphan single-word lines.
- [ ] Empty, loading, error and success states exist.
- [ ] Escrow appears only in Pre-loved.
- [ ] No fake reviews, stats or urgency.

## 9. Anti-patterns

- AI purple/blue gradients, glassmorphism for its own sake.
- A dark theme for the whole product. Only the deal room is dark.
- Identical rounded cards with the same soft shadow at every level.
- Decorative all-caps eyebrows and numbered markers where there is no sequence.
- 8–9 px functional text.
- Grey text on a coloured fill.
- "Submit", "Learn more", "Click here". Use the action's name.
- Escrow language in shop checkout.
- Emoji as iconography.

## 10. Audit — 26 Nov 2026

Fixed in this pass:

- The dark deal-room background was losing to `.device.iphone .screen`;
  added a higher-specificity rule. Transaction-complete copy is now visible.
- Gumtree green `#22A022` failed AA with white; darkened to `#1B7A1B`.
- Functional text floor raised on phone frames; prices and IDs set in tabular
  figures.
- Primary CTAs raised to 44 px; icon hit areas enlarged.
- Focus ring switched to orange inside the deal room.
- Removed decorative numbering from the four principles (not a sequence).
- Eyebrows moved from all-caps to sentence case; uppercase kept only for mono
  system labels.
- Save hearts on Gumtree listings moved above the photo label layer.

Remaining:

- Product photography is representative (Wikimedia Commons). Replace with
  merchant photos at onboarding.
- Kreol and French copy need a native-speaker pass.
- The prototype board renders at 78% zoom; judge type at 100% in the frame
  overlay.

## 11. Redesign — 26 Nov 2026 (second pass)

Why: the app had drifted to the stock AI look (cream paper, grain texture,
Fraunces serif headings, marquee ticker, squiggles, identical cards).

- Code now follows this file: Plus Jakarta Sans + Inter, tokens equal to
  `design/tokens.json`, no grain, no decorative scroll or float animations.
- Page background cooled from `#FAF6EF` to `#F6F5F1` (less cream).
- Home page order: featured business storefront → category row → trending
  products → shops on Bazar (brand cards with "Also on" channels) → Pre-loved
  classifieds → "Run your business from one place" (storefront, orders and
  invoices, AI assistant, numbers).
- Header: logo, search, Pre-loved, Saved, Account, coral **Sell**, cart.
  Bottom nav: Home, Search, Saved, Account.

## 12. Two spaces: Bazar Business and Bazar Pre-loved — 26 Nov 2026

SME businesses and individual resellers must never look like the same thing.

|             | Bazar Business (SMEs)                                 | Bazar Pre-loved (individuals)                             |
| ----------- | ----------------------------------------------------- | --------------------------------------------------------- |
| Who         | Shops, home kitchens, studios, brands                 | People selling their own things                           |
| Colour      | Teal (`teal-500/700`), coral Sell CTA                 | Plum header (`plum-900`), leaf-green actions (`leaf-700`) |
| Lockup      | `bazar` + teal **Business** chip                      | `bazar` + green **Pre-loved** chip                        |
| Buyer pages | Home, categories, shops `/s/*`, products `/p/*`       | `/preloved`, `/preloved/{slug}`, deal room                |
| Dashboard   | `/dashboard` (catalogue, orders, invoices, money, AI) | `/preloved/me` (selling, buying, messages, SafePay)       |
| Payments    | Juice or cash on delivery                             | SafePay escrow                                            |

- `/sell` is the fork: two cards, teal "I run a business" → `/dashboard`,
  plum "I'm selling my own things" → `/sell/verify`.
- `/sell/*` (individual flow) renders inside `PrelovedShell`.
- `/sell/listings` redirects to `/preloved/me`.
- Account shows both spaces as separate cards.

## 13. Faire-style home and "Shop by what matters" — 27 Nov 2026

Reference: faire.com (homepage structure only; we copy the structure and the
calm, not the look). Businesses come before products, people come before
businesses, and the photos do the work.

Home, top to bottom (revised 27 Nov after user references):
**full-width hero** (three photos under a 70% ink overlay, centred H1,
`BusinessSearch` bar: what / district / category / coral Search, "Popular"
chips) → **Shop by category** (6 big photo cards with gradient, name,
shop and product counts, "Shop now"; other categories as chips) →
**Featured shops** (one row of 4 `ShopTile`s per category) → Trending
products (top 3 tagged "Bestseller") → **Shop by what matters** (7 value
cards + "How we check") → benefit row → Pre-loved teaser → Bazar Business
with an Academy teaser (white, not a teal band) → **More to explore** tags.

No founder or "Meet the makers" content: Bazar is a place for businesses,
and the storefront speaks for them.

- `BusinessSearch` is a plain GET form to `/search` (`q`, `district`,
  `cat`). One pill bar on tablet+, stacked on phones. Search matches a
  business on name, category, district, tagline or anything it sells, and
  lists businesses before products.
- `ShopTile`: 4:3 photo, logo chip on the photo, name + verified seal,
  district · rating, one `ValueBadge`. No tagline, no socials (those live on
  the shop page).
- `ProductCard`: photo (optional tag), name, shop name as its own link with
  the shop's rating, then price.
- Values: Made in Mauritius, Woman-led, Handmade, Home business, Family
  business, Young entrepreneur, Less plastic. Defined in
  `src/lib/catalog/values.ts` with what verification checks for each.
  Filter pages at `/v/{value}`; badges on shop tiles and shop pages.
- Teal is for buttons, links and small icons. Avoid big coloured blocks on
  buyer pages.

## 14. Brand: lime, black and cream — 27 Nov 2026

Supersedes the teal/coral palette in §3 for every buyer, seller and login
screen. Tokens in `globals.css` and `design/tokens.json`.

| Token                   | Hex     | Use                                                                                  |
| ----------------------- | ------- | ------------------------------------------------------------------------------------ |
| `lime-400`              | #D4F53C | Brand fill: primary buttons, logo block, badges, highlights. Always with black text. |
| `lime-700`              | #496100 | The only green used as text or icons on cream (6:1).                                 |
| `ink-900`               | #0E0E0C | Text, header, footer, dark sections and cards.                                       |
| `sand-50` / `cream-100` | #F4F0E6 | Page background.                                                                     |
| `white` / `cream-50`    | #FBF8F1 | Cards. There is no pure white anywhere.                                              |

- Never lime text on cream (1.2:1). Lime text is fine on black (14:1).
- Logo: black "bazar" on a lime block (`components/brand/logo.tsx`).
- Header and footer are black; the phone bottom bar is cream with a lime
  pill behind the current tab.
- Colour comes in blocks, not tints: black shop cards, black price pills
  with lime text, a lime benefit band, black "Near you" and "Bazar Business"
  sections.
- Home hero: six-photo carousel (crossfade + slow zoom, pause button,
  stops on hover/focus, off with reduced motion). Tagline: "Discover
  Mauritian businesses and shop smarter".
- Login: full-bleed photo with the lime headline, cream form card with
  pill input and button. Sign in and sign up are the same screen.
- Map: OpenStreetMap tiles darkened with a CSS filter, round photo pins with
  a bright ring per category (`lib/catalog/pin-colors.ts`), lime "you are
  here" dot. Bright pin colours are for the dark map only.
- Categories, in order: Restaurants & food courts, Groceries &
  supermarkets, Hotels & stays, Car rental, Malls, Phones & electronics,
  Beauty & salons, Home & furniture, Bakeries & cakes, Gifts & flowers,
  Kids & baby, Fashion & clothing, Made in Mauritius.
- Photos: real photographs only, licensed (CC0 / CC BY / CC BY-SA), listed
  in `public/photos/CREDITS.md`. No illustrations, no watermarks.

## 15. Display type, motion and plain cards — 27 Nov 2026

- **Headings: Unbounded** (Google Fonts, latin-ext). Body stays Inter.
  Replaces Plus Jakarta Sans. Use it big and bold; it is wide, so keep
  card titles in Inter.
- **Motion** (reference: ondira.winebald.tech, ideas only, no code or
  assets): scroll reveal (`components/motion/reveal.tsx`), count-up
  numbers, full-width photo panels that stack as you scroll
  (`numbers-section.tsx`), a slowly rotating circle badge. All of it is
  off with prefers-reduced-motion. No WebGL.
- **Hero**: a contained, rounded card (max 1200 px) so 2000 px photos stay
  sharp; zoom limited to 3%. Each slide has its own audience pill, headline,
  text and button.
- **Brand band**: the giant "bazar" wordmark lives in its own lime section
  near the bottom of the home page, not in the hero.
- **Cards**: a plain photo-first style was tried and rejected by the product
  owner; shop cards stay black with a lime logo chip and value badge, and
  prices stay in black pills with lime text (§14).
- **Photos**: real Mauritius photos from Wikimedia Commons (CC0 / CC BY /
  CC BY-SA, 2000 px) where available, credited in `public/photos/CREDITS.md`.

## 17. Hero: the drum and the rising shop window — 27 Nov 2026

Replaces the six-photo carousel (§15). References, layout and motion ideas
only (no code, text or assets): MotionSites "Vertex" and the Scrolltide AI
Studio house style (MIT rules only). Links in §16.

- **Layout** (`components/market/hero-stage.tsx`): black ground with one soft
  lime glow; a floating black pill header (home only); badge, uppercase
  Unbounded headline with "and shop smarter" in lime, one line of text, the
  business finder with a lime glow, Popular chips and "Open your shop".
- **The drum**: 12 cards (real Mauritius photos plus lime / black / cream
  type cards saying what Bazar does for shoppers, businesses and
  travellers) bent into a curve with CSS 3D, sliding forever. No animation
  library. Decorative (`aria-hidden`), with a pause button (WCAG 2.2.2).
- **The shop window** (`components/market/shop-preview.tsx`): a browser
  window showing a real demo shop (Kaskad Food Court) with working links.
- **The one scroll moment** (screens 64rem+ wide, when the words leave room
  for the drum): the stage pins for about 1.3 screens; the words lift away,
  the drum flattens and drops, the window rises and grows. One rAF loop
  writes CSS variables (`--u` per card, `--p` for progress); no React state
  per frame.
- **Still versions**: phones, tablets, reduced motion and no-JS get the same
  pieces stacked, without pinning; with reduced motion the drum stays still.
- **Checked**: screenshots at 0/25/50/75/100% scroll on 1440, 1366, 1920,
  768 and 390 px wide; no sideways scroll at 390/768/1024/1280/1920.

## 16. Sources

- Faire homepage (structure reference): https://www.faire.com/
- Impeccable `DESIGN.md`: https://github.com/pbakaus/impeccable/blob/main/DESIGN.md
- Anthropic `frontend-design`: https://github.com/anthropics/skills/tree/main/skills/frontend-design
- UI UX Pro Max: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- skills.sh: https://www.skills.sh/
- Gumtree browse reference: https://www.gumtree.com.au/
- Dribbble Pre-loved reference: https://dribbble.com/shots/11137171-Second-Hand-Market-App-Platform
- MotionSites "Vertex" (hero layout and motion): https://motionsites.ai/?prompt=vertex
- Scrolltide AI Studio house style: https://github.com/scrolltide/ai-studio-skill
