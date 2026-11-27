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

## 13. Sources

- Impeccable `DESIGN.md`: https://github.com/pbakaus/impeccable/blob/main/DESIGN.md
- Anthropic `frontend-design`: https://github.com/anthropics/skills/tree/main/skills/frontend-design
- UI UX Pro Max: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- skills.sh: https://www.skills.sh/
- Gumtree browse reference: https://www.gumtree.com.au/
- Dribbble Pre-loved reference: https://dribbble.com/shots/11137171-Second-Hand-Market-App-Platform
