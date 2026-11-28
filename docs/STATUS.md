# Bazar — status

_Last updated: 27 Nov 2026_

## Fresh start (27 Nov 2026)

The old Next.js build was removed. Nothing is lost: it is saved on the git
branch `backup/old-build-2026-11-27`.

We now design **page by page in plain HTML** first. Each page is approved
before we move to the next one. Code (app, database, login) comes back only
after the pages are agreed.

### What was kept
- Brand colours: lime `#D4F53C`, black `#0E0E0C`, cream `#F4F0E6`, card `#FBF8F1`,
  readable green `#496100`. No pure white.
- Font: Inter Display for headlines (Inter with optical sizing, weight 600, tight spacing), Inter for body. Unbounded dropped 28 Nov.
- Licensed photos in `site/photos/` (credits in `site/photos/CREDITS.md`).
- The product brief: `docs/spec.md`.

### It's an app (PWA)
Bazar is one mobile-first web app that people can install from the browser
(Add to Home Screen / Install). No Play Store or App Store.

### Screen sizes (set in `site/brand.css`)
| Device | Width range | Design at | Preview frame |
|--------|-------------|-----------|---------------|
| Phone  | 0–767px     | 390px     | 390 × 844     |
| Tablet | 768–1279px  | 820px     | 820 × 1180    |
| Laptop | 1280px+     | 1440px    | 1440 × 900    |

Text sizes (phone / tablet / laptop): hero 40/60/84, h1 28/34/44, h2 22/26/30,
h3 18/20/22, body-l 16/18/20, body 14/15/15. Phone + tablet get a bottom tab
bar; laptop gets a top menu instead.

### How the drafts work
- `site/brand.css` — colours, fonts, type scale. Every page uses it.
- `site/preview.html` — shows any screen on phone, tablet and laptop side by side.
- `site/edit-text.js` — the **Edit text** button (bottom right, or press E):
  every text gets a lime outline with its name; click and type to change it;
  **Save page** downloads the page with the new words.

### Pages
| # | Page | File | State |
|---|------|------|-------|
| 1 | Home — app bar, hero, tab bar | `site/index.html` | Draft — waiting for feedback |

### Next
Get feedback on the landing page, then agree the next page.
