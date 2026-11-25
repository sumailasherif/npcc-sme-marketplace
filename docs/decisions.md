# Decisions log

Short records of technical choices that are not spelled out in
[spec.md](spec.md), or that adjust it. Newest first.

## 2026-11-25 — AI provider: OpenCode instead of Claude API

Sherif chose OpenCode as the AI provider, replacing the spec's "Claude API".
The app talks to it through the OpenAI-compatible chat format, set by three
server-only variables: `AI_BASE_URL`, `AI_API_KEY`, `AI_MODEL`. Because the
format is standard, the provider can be changed later by editing these values
only, with no code changes.

**Which OpenCode plan.** OpenCode's docs say the **Go subscription** is meant
for coding agents, and "apps that don't send a session ID can't use Go
models"; such apps should use the **pay-as-you-go Console API** (paid from the
account balance). Bazar is a normal web app, not a coding agent, so the
default `AI_BASE_URL` is the pay-as-you-go endpoint
`https://opencode.ai/inference/openai/v1`. We do not disguise app traffic as
coding-agent traffic.

**Still to confirm before M2:** the exact model ID, that the chosen model
accepts images (photo-to-listing) and returns JSON, and that the account has
a balance or allowance. Guardrails from the spec are unchanged: server-only,
opt-in, Zod-validated, merchant reviews every output.

## 2026-11-25 — M0 setup choices

**Tailwind v4: tokens live in CSS, not `tailwind.config`.**
Tailwind v4 (the current version) defines the theme with `@theme` in
`src/app/globals.css`. The spec's "design tokens in Tailwind config" is met
there, with the spec's token names (`teal-500`, `text-h1`, `rounded-card`,
`shadow-e2` ...). `design/tokens.json` holds the same values for Figma, and a
unit test fails if the two files disagree. Approved by Sherif with the M0 plan.

**Cache Components turned off.**
Next.js 16 enables "Cache Components" in new projects. It requires every
cookie read to sit inside a `<Suspense>` boundary. Almost every page reads
the login or language cookie, so for the MVP we render per request instead.
We can turn it on later for public shop pages if speed needs it.

**Language in a cookie, not the URL.**
next-intl runs "without i18n routing". The language is stored in the
`NEXT_LOCALE` cookie, so the shared shop link stays exactly `/s/{slug}` as
the spec says, rather than `/en/s/{slug}`.

**Prices always "Rs 1,250".**
`formatPrice` uses the same format in every language, as the spec says, even
though French usually writes `1 250`. Dates use `25 Nov 2026` in Mauritius
time.

**Supabase keys: publishable and secret.**
Supabase now issues a "publishable" key (replacing "anon") and a "secret"
key (replacing "service_role"). The variables are
`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` and `SUPABASE_SECRET_KEY`; the old
keys also work in them. The secret key is only read in files marked
`server-only`, so the build fails if browser code imports it.

**Session refresh in `src/proxy.ts`.**
Next.js 16 renamed Middleware to Proxy. It refreshes Supabase auth cookies on
each request and does nothing until Supabase is configured.

**shadcn/ui on Base UI, Phosphor icons.**
The current shadcn CLI builds on Base UI primitives and uses the `cn` package
for class merging. `cn` is told about our custom tokens so `text-h1` and
`text-white` don't cancel each other out. Icons switched from Lucide to
Phosphor as the spec says.

**Kreol text needs a native check.**
`src/messages/mfe.json` is a first draft. A native Kreol speaker should
review it before testing with merchants (spec: "checked by native
speakers"). The same applies to French.
