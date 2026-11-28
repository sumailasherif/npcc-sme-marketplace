# Bazar — status

_Last updated: 28 Nov 2026_

## Where we are

Screens are designed as **plain HTML prototypes** (one per screen), in your
brand. On 28 Nov we started reconnecting the **old Supabase backend** (saved on
the git branch `backup/old-build-2026-11-27`) to these screens.

Full list of technologies and why: [tech-stack.md](tech-stack.md).

### Brand
- Colours: lime `#D4F53C`, black `#0E0E0C`, cream `#F4F0E6`, card `#FBF8F1`,
  readable green `#496100`. No pure white.
- Font: Inter Display for headlines (Inter with optical sizing), Inter for body.
- Bazar is a mobile-first **PWA** (installed from the browser, no app stores).
- Screen sizes (in `brand.css`): phone 0–767px (design 390), tablet 768–1279px
  (820), laptop 1280px+ (1440).

### Screens (prototypes)
| Screen | File | Notes |
|---|---|---|
| Landing / For business | `business.html` | Rotating "what Bazar does" line |
| Sign in / Sign up | `auth.html` | To be connected to real email-code sign-in |
| Buyer Home | `index.html` | Location picker with free mini map |
| Map | `map.html` | MapLibre + OpenFreeMap, distance + route (OSRM) |
| Resell + escrow | `resell.html` | Camera/upload photos, smart description, in-app chat |
| Business dashboard | `dashboard.html` | Bill scan (camera/photo/PDF), invoices, PDF statement — sample data |
| Preview tool | `preview.html` | Phone / tablet / laptop side by side |

Shared: `brand.css`, `app.css`, `i18n.js` (EN / FR / Kreol), `doc-tools.js`
(camera, reading bills, PDFs), `edit-text.js` (draft tool only).

### Rules from Sherif
- Never send users out to Google Maps or other apps; keep everything in Bazar.
- Translate every screen (EN / FR / Kreol).

### Known gaps
- Real businesses and their photos shown as if they're on Bazar — replace or
  mark "Not on Bazar yet".
- `auth.html` uses the Tailwind CDN; dashboard has no language button yet.
- Kreol / French need a native-speaker check.

### Backend (reconnected 28 Nov)
- Screens moved from `site/` to `public/`; Next.js serves them at
  http://localhost:3000 (`npm run dev`). Short addresses: `/`, `/map`, `/resell`,
  `/dashboard`, `/auth`, `/onboarding`.
- Restored from `backup/old-build-2026-11-27`: Supabase helpers, sign-in,
  shop rules, `supabase/` migrations (profiles, categories, shops, storage), DB tests.
- Web APIs (`src/app/api/`): `auth/send-code`, `auth/verify-code`, `auth/sign-out`,
  `me`, `categories`, `shops` (create), `shops/[slug]`, `shops/slug-check`, `shops/logo`.
- Connected: `auth.html` (email + 6-digit code, no password), `dashboard.html`
  (protected, real shop name), new `onboarding.html` (create shop in 3 steps).
- **Needs:** Supabase URL + publishable key + secret key in `.env` (template
  in `.env.example`). Until then screens run in demo mode.

### Next
1. Fill `.env`, check the Supabase tables are still there, test real sign-in.
2. Tables + APIs for products, orders, resell listings, chat, invoices/expenses.
3. Design: shop page, product page, cart/checkout, order tracking.
