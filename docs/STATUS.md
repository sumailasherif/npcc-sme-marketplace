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
- Fonts: Unbounded (headings), Inter (body).
- Type scale: display 32/40, h1 24/32, h2 20/28, h3 17/24, body-l 16/24,
  body 14/20, label 13/16, caption 12/16, price 18/24.
- Licensed photos in `site/photos/` (credits in `site/photos/CREDITS.md`).
- The product brief: `docs/spec.md`.

### How the drafts work
- `site/brand.css` — colours, fonts, type scale. Every page uses it.
- `site/edit-text.js` — the **Edit text** button (bottom right, or press E):
  every text gets a lime outline with its name; click and type to change it;
  **Save page** downloads the page with the new words.

### Pages
| # | Page | File | State |
|---|------|------|-------|
| 1 | Landing page | `site/index.html` | Draft — waiting for feedback |

### Next
Get feedback on the landing page, then agree the next page.
