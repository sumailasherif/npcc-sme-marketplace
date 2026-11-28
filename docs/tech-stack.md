# Bazar — tech stack

_Last updated: 28 Nov 2026_

This document lists every technology Bazar uses today, what each one does, and
why it was chosen. It also lists the technology planned for the real app, so
it's clear what is **built**, what is only **shown in the designs**, and what
is **planned**.

---

## 1. Where the project is now

Bazar is at the **design-prototype stage**. On 27 Nov 2026 the first build
(Next.js + Supabase) was set aside. It is still saved on the git branch
`backup/old-build-2026-11-27`. Since then, screens are designed one at a time
as **plain HTML pages** in the `site/` folder. Once a screen is approved, it
gets rebuilt in the real app framework (section 5).

**Product decision:** Bazar is a **mobile-first web app that people install
from the browser (a PWA)**. There is no Play Store or App Store. One codebase
covers phone, tablet and laptop.

| Screen | File | What it is |
|---|---|---|
| Landing page | `site/business.html` | Explains Bazar to businesses, partners and judges |
| Sign in / Sign up | `site/auth.html` | One screen with Login and Sign up tabs, for customers and businesses |
| App Home | `site/index.html` | Buyers' home: location, search, categories, nearby shops, products, AI assistant |
| Resell dashboard | `site/resell.html` | Second-hand selling with escrow (work in progress) |
| Preview tool | `site/preview.html` | Shows any screen at phone, tablet and laptop size side by side |

---

## 2. What the prototype uses today

| Technology | Used for | Why |
|---|---|---|
| **HTML5** | The structure of every screen | Opens in any browser, needs no build step, and is easy to change while the design is still moving |
| **CSS3** (custom properties, grid, flexbox, media queries) | All styling and the phone/tablet/laptop layouts | Colours, sizes and spacing live in variables in one file, so a brand change is a one-line edit |
| **Vanilla JavaScript** (no framework) | Menus, pop-ups, the AI chat demo, the sign-in tabs, the 3D text cube on sign-in | Enough for a prototype; nothing to install or learn first |
| **Native `<dialog>` element** | The Bazar Assist side panel and the location picker on Home | Built into browsers: focus handling, Esc to close and a backdrop for free |
| **Google Fonts — Inter** (with the optical-size axis) | The only font on the site | Big text automatically uses the tighter "Inter Display" cut and small text the normal cut, so headlines look like the chosen reference while body text stays readable |
| **Inline SVG icons** | Every icon and the language flags | Sharp at any size, recolour with CSS, no icon library to download |
| **Tailwind CSS (CDN script)** | Styling of `auth.html` only | Quick to try layouts. Temporary: the CDN version isn't meant for real sites, and this page should move to `brand.css` like the others (see section 6) |
| **MapLibre GL JS + OpenFreeMap** | The Map screen and the location picker's mini map | Free, no API key, commercial use allowed, vector maps that can be styled to the brand |
| **OSRM public server** | Road distance, driving time and route line on the Map screen | Free, no key. Light use only: the real app should run its own or use a paid service |
| **Browser camera (`getUserMedia`)** | Live camera with a Capture button (dashboard bill scan, Resell listing photos) | Built into browsers; falls back to the phone's own camera or file picker |
| **Tesseract.js** | Reads the text in photos of bills | Free, runs on the device, nothing is uploaded |
| **PDF.js** | Reads text from uploaded PDFs; scanned PDFs are read like photos | Free, runs on the device |
| **jsPDF + AutoTable** | Creates invoice PDFs and the business statement PDF | Free, runs on the device, branded lime/black layout |
| **Browser `localStorage`** | Remembers the chosen language, a closed intro strip, saved "Edit text" changes and the sign-in role | Simple per-device memory for a prototype. Real accounts and data will live in the database later |
| **Python's built-in web server** (`python -m http.server 5500`) | Serves `site/` at http://127.0.0.1:5500 | Already on the computer. Chrome blocks some features on `file://` pages |
| **Git** | Version history; `fresh-start` is the working branch, the old build is on `backup/old-build-2026-11-27` | Every step can be undone; nothing is ever lost |

### Our own small tools

| File | What it does | Why |
|---|---|---|
| `site/brand.css` | Colours, font, screen sizes, text sizes, shared buttons | One source of truth for the brand; every page links it |
| `site/app.css` | The app's top bar and bottom tab bar, shared by app screens | Every app screen gets the same navigation |
| `site/i18n.js` | Translates every text on a page into **English, Français or Kreol Morisien** when a flag is picked, including chat replies and button labels added later; shows EN / FR / KR beside the flag | Bazar must work in all three languages people use in Mauritius. Translations live in one file as `T("English", "French", "Kreol")` rows |
| `site/edit-text.js` | The **Edit text** button: outlines every text with its name, lets you type over it, and saves a copy of the page | Lets the owner rewrite wording directly on the design. Edits are kept per language. Draft tool only, not part of the real app |
| `site/preview.html` | Shows a screen in phone, tablet and laptop frames | Checks all three sizes at once |
| `site/doc-tools.js` | Shared camera window, file picker, bill reader (photo + PDF), invoice reader, invoice PDF and statement PDF | One tested toolkit used by the dashboard and Resell |

---

## 3. Design system

| Item | Value | Why |
|---|---|---|
| **Colours** | Lime `#D4F53C`, black `#0E0E0C`, cream `#F4F0E6`, card `#FBF8F1`, readable green `#496100`. No pure white. | A distinctive brand that doesn't look like every other marketplace. Lime is always a fill with black text, because lime text on cream can't be read |
| **Font** | Inter (Inter Display for big text), weight 600 headlines with tight letter spacing | Modern, very readable on phones, free, and supports French accents |
| **Screen sizes** | Phone 0–767px (designed at 390), tablet 768–1279px (820), laptop 1280px+ (1440) | Matches the most common devices in each group; phone styles come first |
| **Text sizes** (phone / tablet / laptop) | Hero 40/60/84, h1 28/34/44, h2 22/26/30, h3 18/20/22, body 14/15/15 | Text grows with the screen instead of one size everywhere |
| **Navigation** | Bottom tab bar on phone and tablet; top menu on laptop | Thumb-friendly on phones, usual website menu on big screens |
| **Tap targets** | At least 44px | Apple and Google's minimum for easy tapping |
| **Phone safe areas** | `viewport-fit=cover` + `env(safe-area-inset-*)` | The app isn't hidden by the notch or home bar once installed |

---

## 4. Services shown in the designs, not connected yet

These appear on the screens to show how Bazar will work. **None of them is
wired up in the prototype.**

| Service | Where it appears | Plan |
|---|---|---|
| **Google sign-in** | "Continue with Google" on `auth.html` | Through Supabase Auth |
| **Resend** (email) | 6-digit email verification code on sign-up | Sends sign-up codes and order emails. The word "Resend" should not be shown to users |
| **Juice / MyT Money** | Payment status on invoices | Cash on delivery first; mobile payments later |
| **WhatsApp** | Sharing receipts, reminders, "WhatsApp-ready shops" | Click-to-chat links first (no API needed) |
| **Delivery partner** | Delivery fees in the AI demo | To be chosen; the designs currently name a real company, which should be replaced until there is an agreement |
| **AI assistant** (Bazar Assist) | Chat panel on Home and the landing demo | Answers are scripted in the prototype; the real AI is in section 5 |

---

## 5. Planned stack for the real app

From the project brief (`docs/spec.md`), plus the PWA decision.

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js** (App Router) + TypeScript + React | Shop and product pages are built on the server, so they load fast on mobile data and show link previews on WhatsApp and Facebook. One project holds both the info pages and the app |
| Styling | **Tailwind CSS + shadcn/ui**, themed with the colours and sizes in `brand.css` | Consistent components, fast to build, same tokens as the prototype |
| Server logic | Next.js Route Handlers and Server Actions | Frontend and backend in one codebase |
| Database, auth, files | **Supabase**: Postgres + PostGIS, Auth (phone code + email + Google), Storage, Realtime | One managed backend; PostGIS powers "shops near you"; the same backend can serve a native app later |
| Validation | **Zod** | Same rules on forms and on the server |
| AI | **OpenCode API** (OpenAI-compatible), called only from the server | The API key never reaches the browser; the provider can be swapped by changing settings |
| Maps | **Leaflet + OpenStreetMap** | Free; no Google Maps fees |
| Languages | **next-intl** with `en`, `fr`, `mfe` files | Carries over the translations from `site/i18n.js` |
| Invoices | **@react-pdf/renderer** on the server | Clean PDF invoices without AI |
| Email | **Resend** | Sign-up codes and order emails |
| Install on phone | **PWA**: web app manifest + service worker (Serwist) | Home-screen icon, full screen, offline pages and notifications, all without the app stores |
| Tests | **Vitest** (unit) + **Playwright** (end-to-end) | Catch problems before demos |
| Hosting | **Vercel** (web) + **Supabase** (backend), free tiers | A live link for NPCC judges at no cost |

### How the prototype carries over

| Prototype | Becomes |
|---|---|
| `brand.css` variables | Tailwind theme |
| `app.css` top bar + tab bar | Shared React layout for app screens |
| Each `site/*.html` screen | A Next.js page |
| `i18n.js` translation rows | next-intl message files (`en.json`, `fr.json`, `mfe.json`) |
| Scripted AI answers | Real AI calls from the server |
| `localStorage` | Supabase accounts and database |

---

## 6. Known gaps to fix

1. **`auth.html` uses the Tailwind CDN.** Restyle it with `brand.css` so all screens share one style system.
2. **Language menu is copied into each page.** Home, Sign in, Landing and Resell each have their own copy of the flag menu. In the real app it becomes one shared component.
3. **Real businesses and their photos** (Bookcourt, Chelsea's Cup N Cake, Le Fournil and others) appear as if they're on Bazar. Replace them with made-up shops, or show them as "Not on Bazar yet" with facts only. Check that every photo can legally be used and list its source.
4. **The French and Kreol translations** need checking by native speakers before launch.
5. **`edit-text.js` and `preview.html`** are design tools only and must not ship in the real app.
