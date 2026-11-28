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

### Next (approved 28 Nov)
Reconnect the old backend: restore Supabase code, serve the HTML screens from
Next.js, add web APIs (sign-in, me, categories, shops), connect `auth.html` and
`dashboard.html`, then add tables for products, orders, resell, chat, invoices.
