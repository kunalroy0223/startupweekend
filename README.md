# Techstars Startup Weekend Siliguri 2027 — website

Production Next.js site for **startupweekend.sbs**. Five pages: Home, Schedule, FAQs, Tickets, Contact.

## What was built

| Area | Notes |
| --- | --- |
| **Opening sequence** | Recreates `Logo_reveal_animation.mp4`: light bloom, drifting letters, the *official* logo assembling from glitching slices, light sweep, green particle trail, "2027" ignition, then shutters open onto the hero. It plays once per browsing session, has a Skip button and Esc, is skipped for `prefers-reduced-motion`, never shows without JS, and has a CSS failsafe. |
| **Hero** | "The Idea": a topographic WebGL form (three.js shader) that bulges toward the cursor, tilts with it and swells as you scroll. Draggable "group chat" fragments get pulled into it on scroll. Kinetic type with depth parallax. Lite CSS fallback for reduced motion, Save-Data, low-end or no-WebGL devices. All facts are real HTML. |
| **Home** | Editorial About with scroll-lit copy; The Journey (one horizontal pinned track on desktop, stacked slabs on touch); masonry highlights wall with lightbox and video viewer; AI Edition with an interactive generative "token field", organic area blobs and a prompt-log of starting points; role rows; benefits on a self-drawing thread; partner logos on white plates; a "54" finale. |
| **Schedule** | Three distinct days: speech bubbles (Fri), building blocks on blueprint paper (Sat), a printed receipt (Sun). |
| **FAQs** | Accessible accordion (answers server-rendered and crawlable), jump index, deep links, "The short version" direct-answer block for answer engines. |
| **Tickets** | Tilting ticket object with a COMING SOON stamp, inclusions, a disabled "Registration coming soon" button. No checkout or payment UI. |
| **Contact** | Letter-style form posting to a real server endpoint (Resend), tracked contact links, venue card with Google Maps directions. |
| **SEO / AEO / GEO** | Per-page titles and descriptions from the brief, canonicals, `sitemap.xml`, `robots.txt`, OG image, manifest. JSON-LD: Organization, WebSite, Place, Event (price only, no "on sale" availability), BreadcrumbList per page, FAQPage. |

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 · GSAP + ScrollTrigger · Lenis · Framer Motion · three.js.

## Project structure

```
app/                  routes, layout, metadata, sitemap/robots/OG, /api/contact
components/
  animation/          Lenis provider, intro loader, cursor, reveals, marquee
  hero/               hero + WebGL scene (lazy-loaded) + fallback
  home/               homepage sections
  gallery/            masonry wall, placeholder art, lightbox
  forms/              contact form
  schedule/ faq/ tickets/ contact/ layout/ ui/ illustrations/ seo/
lib/
  site.ts             official event entity data (single source of truth)
  content.ts          approved copy from the Website Brief
  media.ts            previous-edition gallery slots  ← add real photos/videos here
  seo.ts              metadata + structured data
  contact.ts          shared form validation
hooks/                reduced motion, graphics tier, media queries
public/brand          logos (trimmed from the brand kit, otherwise unmodified)
public/partners       partner logos from the brand kit
public/media/highlights  put previous-edition media here
styles/globals.css    design tokens and global styles
```

## Run locally

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

`npm run typecheck` runs TypeScript.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | yes (prod) | Canonical origin. Default `https://startupweekend.sbs`. |
| `RESEND_API_KEY` | for the form | Resend API key (server-only). |
| `CONTACT_FROM_EMAIL` | for the form | Sender on a domain verified in Resend, e.g. `Startup Weekend Siliguri <website@startupweekend.sbs>`. |
| `CONTACT_TO_EMAIL` | no | Inbox for enquiries. Default `contact@startupweekend.sbs`. |
| `NEXT_PUBLIC_GSC_VERIFICATION` | no | Google Search Console meta-tag token. |
| `NEXT_PUBLIC_GA_ID` | no | GA4 measurement ID. Enables the analytics events below. |

## Contact form setup (Resend)

1. Create a Resend account and **add and verify the domain `startupweekend.sbs`** (Resend gives you DNS records to add at the registrar).
2. Create an API key with "Sending access".
3. Set `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` (and optionally `CONTACT_TO_EMAIL`) in Vercel → Project → Settings → Environment Variables, then redeploy.
4. Send a test message from `/contact` and confirm it arrives at `contact@startupweekend.sbs`. Replies go straight to the sender (`reply_to`).

Until the key is set, the endpoint returns `503 not_configured` and the form tells visitors the message was **not** sent and shows the email address and phone number instead. It never shows a fake success.

Protection built in: server-side validation, honeypot field, minimum fill time, same-origin check, per-IP rate limit (best effort per serverless instance), payload size limit, HTML escaping, no secrets in client code.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, **Add New → Project**, import the repo. The framework is detected as Next.js; keep the default build settings.
3. Add the environment variables above (Production and Preview).
4. Deploy, then in **Settings → Domains** add `startupweekend.sbs` (and `www.startupweekend.sbs` redirecting to it) and follow the DNS instructions.
5. After launch: verify in Google Search Console, submit `https://startupweekend.sbs/sitemap.xml`, and check structured data with Google's Rich Results Test.

## Analytics events

`lib/analytics.ts` sends these to GA4 / `dataLayer` when configured: `ticket_cta_click`, `gallery_open`, `video_play`, `faq_toggle`, `contact_email_click`, `contact_phone_click`, `directions_click`, `contact_form_submit`. Page views come from GA4 itself.

## Before launch: things only the organisers can supply

- **Previous-edition photos and videos.** None were in the project files, so the gallery shows clearly labelled abstract placeholders ("Archive photo · coming soon"). Add files to `public/media/highlights/` and set `src` / `video` / `alt` on each slot in `lib/media.ts`. YouTube embed URLs also work for `video`.
- **Social profile URLs.** Add them in `lib/site.ts` → `socials`. Until then the names render as plain text, not dead links.
- **Partner tiers.** The brief names Techstars and Google for Startups as global partners. The other brand-kit logos (Brex, GoDaddy Registry, TiE Siliguri, Inspiria) were placed into the Technology and Academic/Community tiers as a best guess. Confirm in `lib/content.ts` → `partnerTiers`. Techstars is shown as text because no standalone Techstars logo was supplied.
- **Registration.** When it opens, update `tickets` copy in `lib/content.ts`, swap the disabled button for the real link, and only then add availability to the Event schema in `lib/seo.ts`.
