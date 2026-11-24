# Project Status — Bazar (working name)

Last updated: 25 Nov 2026

## Current milestone

**M0 — Setup:** code done and committed locally. Remaining: push to GitHub,
create the Supabase project, connect Vercel (Sherif's accounts).

## Milestones

| #   | Milestone                                                                                         | Status                                 |
| --- | ------------------------------------------------------------------------------------------------- | -------------------------------------- |
| M0  | Setup (Next.js, Tailwind, shadcn, Supabase clients, tokens, lint, Vitest, Playwright, CI, Vercel) | 🟡 Code done; accounts and deploy left |
| M1  | Auth and shop                                                                                     | ⏳ Not started                         |
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
- [ ] Push to GitHub and see CI go green
- [ ] Supabase project created and linked (`npx supabase link`)
- [ ] Vercel project connected; live URL added here

## Done

- 25 Nov 2026: Full product plan and build spec saved to [docs/spec.md](spec.md).
- 25 Nov 2026: M0 code done in 9 commits (see `git log`). Choices recorded in [decisions.md](decisions.md).

## Next steps

1. Sherif: push `main` to GitHub (`git push -u origin main`) and check the CI run.
2. Sherif: create the Supabase project and fill in `.env.local`.
3. Sherif: import the repo on Vercel and add the same env variables.
4. Claude: plan M1 (auth and shop) and wait for OK.

## Open questions and blockers

- **NPCC deadline:** next submission or demo day still unknown. It decides how much we build.
- **Supabase project:** needs creating at supabase.com (Sherif's account).
- **Vercel:** connect GitHub repo `sumailasherif/npcc-sme-marketplace` (Sherif's account).
- **Translations:** Kreol and French text needs a native-speaker check before merchant tests.

## Environment

Node 24.22, npm 11.19, Next.js 16.4, Supabase CLI 3.4, Windows 11.
