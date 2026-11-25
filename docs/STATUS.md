# Project Status — Bazar (working name)

Last updated: 25 Nov 2026

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
- [ ] CI green on the branch (first run of DB + full-flow tests)
- [ ] Apply migrations to the real project (`supabase login`, `link`, `db push`)
- [ ] Try it on a real phone with your own email

## Done

- 25 Nov 2026: Full product plan and build spec saved to [docs/spec.md](spec.md).
- 25 Nov 2026: M0 code done in 9 commits (see `git log`). Choices recorded in [decisions.md](decisions.md).
- 25 Nov 2026: M1 code done on branch `m1-auth-shop`. How to run the tests: [testing.md](testing.md).

## Next steps

1. Sherif: push `main` to GitHub (`git push -u origin main`) and check the CI run.
2. Sherif: add pay-as-you-go credits at OpenCode Console (key works, model `deepseek-v4.1-flash` set; calls return 402 until topped up). Needed by M2, not M1.
3. Sherif: import the repo on Vercel and add the same env variables.
4. Push `m1-auth-shop`, check CI, apply migrations, then merge to `main`.
5. Claude: plan M2 (products + AI listing) and wait for OK.

## Open questions and blockers

- **NPCC deadline:** next submission or demo day still unknown. It decides how much we build.
- **AI provider:** switched to OpenCode (see decisions.md). Use the pay-as-you-go Console API key, not the Go coding subscription. Model ID and vision support to confirm before M2.
- **Phone OTP:** phone sign-up is off in Supabase. It needs an SMS provider (e.g. Twilio) to be turned on; decide in M1 plan.
- **Vercel:** connect GitHub repo `sumailasherif/npcc-sme-marketplace` (Sherif's account).
- **Translations:** Kreol and French text needs a native-speaker check before merchant tests.

## Environment

Node 24.22, npm 11.19, Next.js 16.4, Supabase CLI 3.4, Windows 11.
