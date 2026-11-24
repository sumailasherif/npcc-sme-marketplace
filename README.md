# Bazar (working name)

An AI sales assistant for Mauritian small businesses. It turns Facebook and
WhatsApp chaos into a real shop with a shareable link, and later puts sellers
on a local marketplace where people can actually find them.

Built for the **NPCC National AI Startups Lab**. Full product plan and build
spec: [docs/spec.md](docs/spec.md). Progress: [docs/STATUS.md](docs/STATUS.md).

## Tech stack

- Next.js 16 (App Router) + TypeScript + React 19
- Tailwind CSS v4 + shadcn/ui, themed with the Bazar design tokens
- Supabase: Postgres + PostGIS, Auth, Storage, Realtime
- next-intl: English, French, Kreol Morisien (`en`, `fr`, `mfe`)
- Zod for validation; Claude API (server routes only) for AI features
- Vitest (unit) + Playwright (end-to-end, 360px phone)
- Hosting: Vercel (web) + Supabase (backend)

## Getting started

You need Node.js 24 and npm.

```bash
# 1. Install dependencies
npm install

# 2. Create your local settings file and fill in the values
cp .env.example .env.local

# 3. Start the dev server, then open http://localhost:3000
npm run dev
```

The home page works before Supabase is set up. Features that need a
database (from M1 on) need the Supabase values in `.env.local`.

### Supabase

1. Create a free project at [supabase.com](https://supabase.com).
2. In **Project Settings > API**, copy the project URL, the publishable key
   and the secret key into `.env.local`.
3. Database changes live in `supabase/migrations/` as numbered SQL files.
   With the [Supabase CLI](https://supabase.com/docs/guides/cli):
   `npx supabase link` then `npx supabase db push`.

## Scripts

| Command             | What it does                               |
| ------------------- | ------------------------------------------ |
| `npm run dev`       | Start the dev server                       |
| `npm run build`     | Production build                           |
| `npm run lint`      | ESLint                                     |
| `npm run typecheck` | TypeScript check                           |
| `npm run format`    | Format all files with Prettier             |
| `npm test`          | Unit tests (Vitest)                        |
| `npm run test:e2e`  | End-to-end tests (Playwright; build first) |

Before the first e2e run: `npx playwright install chromium`.

## Project structure

```text
src/
  app/              pages and API routes (App Router)
  components/ui/    design-system components (shadcn-based)
  components/       feature components
  i18n/             language setup (cookie-based, no URL prefix)
  lib/              supabase clients, env checks, formatting, utils
  messages/         en.json, fr.json, mfe.json
  proxy.ts          refreshes the login session on each request
supabase/           config and numbered SQL migrations
design/tokens.json  design tokens (mirrors src/app/globals.css)
tests/unit/         Vitest
tests/e2e/          Playwright
docs/               spec, status, decisions
```

## Credits and inspiration

The product shape (customer / partner / admin roles on one backend,
hyperlocal matching by distance and availability, separate flows for service
bookings and product delivery) is inspired by **ServiceHub** by Bheda Jenish
and Rushi Joshi. ServiceHub is a design reference only: all code, design and
branding in this repository are written from scratch.

Fonts: Plus Jakarta Sans and Inter (Google Fonts, OFL). Icons: Phosphor
(MIT).
