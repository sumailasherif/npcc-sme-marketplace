# Project Status — Bazar (working name)

Last updated: 26 Nov 2026

## Current milestone

**M1 — Auth and shop:** code done on branch `m1-auth-shop`. Waiting for the
first CI run (database + full-flow tests) and for the migrations to be applied
to the real Supabase project.

## Milestones

| #   | Milestone                                                                                         | Status                                 |
| --- | ------------------------------------------------------------------------------------------------- | -------------------------------------- |
| M0  | Setup (Next.js, Tailwind, shadcn, Supabase clients, tokens, lint, Vitest, Playwright, CI, Vercel) | 🟡 Code done; accounts and deploy left |
| M1  | Auth and shop                                                                                     | 🟡 Code done; CI + DB push left        |
| M2  | Products + AI listing                                                                             | ⏳ Not started                         |
| M3  | Ordering (cash on delivery)                                                                       | ⏳ Not started                         |
| M4  | Inbox + AI replies                                                                                | ⏳ Not started                         |
| M5  | Invoices, insights, admin                                                                         | ⏳ Not started                         |
| M6  | Polish and test                                                                                   | ⏳ Not started                         |

### M0 checklist

- [x] Spec saved to `docs/spec.md`
- [x] Next.js 16 + TypeScript + Tailwind v4 + ESLint scaffold
- [x] Design tokens in `globals.css` (`@theme`) + `design/tokens.json`
- [x] Plus Jakarta Sans + Inter fonts
- [x] shadcn/ui themed with tokens; `Button` (primary, cta, secondary, ghost, destructive)
- [x] next-intl with `en`, `fr`, `mfe` and a language switcher
- [x] Supabase browser, server and admin clients + session proxy
- [x] `.env.example` with every variable; `.env.local` ignored by git
- [x] Vitest (47 unit tests) + Playwright (3 e2e tests at 360px), all passing
- [x] GitHub Actions CI: lint, format, type-check, unit, build, e2e
- [x] README with ServiceHub credit; `docs/decisions.md`
- [x] Pushed to GitHub; CI green (25 Nov 2026)
- [x] Supabase project created; keys in `.env.local` and checked (publishable + secret both OK)
- [x] Supabase Auth: custom SMTP via Resend; redirect URL `http://localhost:3000/**`; Magic link and Confirm sign up emails show a 6-digit code (en/fr/mfe); Email OTP length 6, expiry 1 hour; Confirm email on
- [ ] Link the CLI to the project (`npx supabase login`, then `npx supabase link`)
- [ ] Vercel project connected; live URL added here

### M1 checklist

- [x] Migrations: profiles (auto-created), categories (seeded en/fr/mfe), shops, shop-media bucket
- [x] RLS + column grants; 25 RLS tests (run in CI)
- [x] `/login`: email → 6-digit code → session
- [x] `/dashboard/onboarding`: create shop (name, link, category, district, WhatsApp, logo)
- [x] `/dashboard`: shop link, Copy, Share on WhatsApp, verification badge; nav; sign out
- [x] `/s/{slug}`: public shop page, link previews, 404 page
- [x] Unit tests (validation), e2e (public pages + full sign-up → shop flow in CI)
- [x] CI green on the branch: 71 unit, 25 RLS, 7 e2e (incl. full sign-up → shop flow)
- [x] Migrations applied to the real project via SQL Editor (history recorded); service_role grant fix added
- [ ] Try it on a real phone with your own email

## Done

- 25 Nov 2026: Full product plan and build spec saved to [docs/spec.md](spec.md).
- 25 Nov 2026: M0 code done in 9 commits (see `git log`). Choices recorded in [decisions.md](decisions.md).
- 25 Nov 2026: M1 code done on branch `m1-auth-shop`. How to run the tests: [testing.md](testing.md).
- 25 Nov 2026: Marketplace architecture agreed in [architecture.md](architecture.md). Services were later removed; the active scope is the six shop-focused sections in [product-blueprint.md](product-blueprint.md).
- 26 Nov 2026: Blueprint refined: 19 real product photos + 12 category photo tiles, 4-6 shops and 6 listings per category, SafePay escrow for Pre-loved, Juice or cash for shops, Grabbit branding and tracking, 12 customer / 12 business / 12 resale / 5 delivery / 4 trust screens.
- 26 Nov 2026: Next.js demo of all 46 designed screens is in place. Customer storefront, business console, Pre-loved with SafePay, sell flow, delivery console, Grabbit tracking link, trust consoles and cashflow pages run on demo data. Shop checkout is Juice or cash on delivery only; escrow is Pre-loved only. `npm run build`, `lint`, `typecheck` and 71 unit tests pass.
- 26 Nov 2026: UI redesign steps 1–2 (not committed yet). Fonts and colours now follow `design/DESIGN.md`; grain, ticker and squiggle removed. Home page rebuilt as e-commerce + SME storefronts (featured business, categories, trending, shops on Bazar, Pre-loved, business tools). Then split Bazar Business (teal, `/dashboard`) from Bazar Pre-loved (plum + green, new `/preloved/me` dashboard for selling, buying, messages and SafePay); `/sell` is now a fork between the two. Build, lint, typecheck and 71 unit tests pass.
- 27 Nov 2026: Faire-style home (not committed yet): full-width hero with a business finder (what / district / category), big photo category cards, featured shops by category, Shop by what matters, benefit row, Academy teaser, explore tags. New business values with filter pages `/v/{value}` and badges on shop tiles and shop pages. New ShopTile and ProductCard. `/search` now filters by district and category and lists businesses first. Next: values in the DB and shop setup (M2), shop page as a storefront, Bazar Academy.
- 27 Nov 2026 (not committed yet): rebrand to lime #D4F53C, black and cream (tokens, logo, black header and footer, buttons, cards). New login page (photo + lime headline). Home hero is a six-photo carousel with "Discover Mauritian businesses and shop smarter". Practical categories (restaurants, supermarkets, hotels, car rental, malls first) with 19 new demo businesses and real licensed photos; hotels and car rental show "Enquire on WhatsApp". New `/near` page: dark OpenStreetMap map with photo pins, distance, open now, "Use my location"; iPhone preview of it on the home page. Next: DB category seed (M2), real booking flow, higher-resolution photos.
- 27 Nov 2026 (not committed yet): Unbounded headings; scroll reveal, count-up "Bazar in numbers" photo panels, lime brand band with giant wordmark and rotating badge; hero is a contained card with real Mauritius photos (Wikimedia Commons, 2000 px); plain photo-first cards; real businesses as "Not on Bazar yet" listings (Tribeca, Mahogany, La Croisette, KFC, Dream Price).
- 27 Nov 2026 (not committed yet): new home hero (design/DESIGN.md §17): floating pill header, big uppercase headline with the business finder, a curved drum of real photos sliding past, and a real shop page in a browser window that rises as you scroll (large screens). Old carousel removed. Known issue: `npm test` fails to start every suite (Vitest "reading 'config'" error, even for untouched tests); to investigate.

## Next steps

1. Sherif: push `main` to GitHub (`git push -u origin main`) and check the CI run.
2. Sherif: add pay-as-you-go credits at OpenCode Console (key works, model `deepseek-v4.1-flash` set; calls return 402 until topped up). Needed by M2, not M1.
3. Sherif: import the repo on Vercel and add the same env variables.
4. Push `m1-auth-shop`, check CI, apply migrations, then merge to `main`.
5. Review the six-section blueprint: open `design/prototype/index.html` in a browser, check the Customer / Business / Resale / Delivery / Trust / AI tabs and the live demos. Then run `npm run dev` and click through the same routes in the Next.js build. Record changes in [product-blueprint.md](product-blueprint.md).
6. Claude: write the M2 plan from [architecture.md](architecture.md) §14. M2 opens with the `shops` → `partners` + `user_roles` migration, then products and real category pages. Resale is M2.5; delivery is M3.5.
7. Before M2: validate the 12 category labels with 5 merchants and 5 customers, and confirm each category can reach 5 real listings. Before M3: open a Juice merchant account and decide who legally holds the SafePay escrow balance. Before M3.5: agree Grabbit terms (fee, COD remittance, insurance).
8. Before M2: decide SEO/i18n routing and the final brand name (open in §13).

## Open questions and blockers

- **NPCC deadline:** next submission or demo day still unknown. It decides how much we build.
- **AI provider:** switched to OpenCode (see decisions.md). Use the pay-as-you-go Console API key, not the Go coding subscription. Model ID and vision support to confirm before M2.
- **Phone OTP:** phone sign-up is off in Supabase. It needs an SMS provider (e.g. Twilio) to be turned on; decide in M1 plan.
- **Vercel:** connect GitHub repo `sumailasherif/npcc-sme-marketplace` (Sherif's account).
- **Translations:** Kreol and French text needs a native-speaker check before merchant tests.

## Environment

Node 24.22, npm 11.19, Next.js 16.4, Supabase CLI 3.4, Windows 11.
