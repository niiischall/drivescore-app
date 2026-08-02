# DriveScore Web (`apps/web`)

Next.js app for DriveScore — E20 compatibility score tool for Indian car owners.

Currently ships the **marketing landing page** and a **waitlist signup** (email is validated and logged server-side — no email/CRM provider is wired up yet). Scoring form and reports are still ahead of this surface.

> **Sanity CMS is required.** Landing copy and FAQ items load from Sanity — not from hardcoded TSX. Spec: [`docs/07-sanity-cms.md`](../../docs/07-sanity-cms.md). Studio: [`/studio`](http://localhost:3000/studio).

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4
- [Sanity](https://www.sanity.io) for landing + FAQ content (embedded Studio at `/studio`) — see [`docs/07-sanity-cms.md`](../../docs/07-sanity-cms.md)
- [TanStack Query](https://tanstack.com/query) for client mutations
- PostHog for client analytics, proxied first-party via `/pulse` (see `next.config.ts` rewrites)
- Vercel Analytics + Speed Insights
- Light / dark UI via `prefers-color-scheme` (`data-theme` on `<html>`, see `theme-sync.tsx`)

## Getting started

```bash
pnpm install
cp .env.example .env.local
# REQUIRED: NEXT_PUBLIC_SANITY_PROJECT_ID (+ published Sanity content)
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Edit content at [http://localhost:3000/studio](http://localhost:3000/studio).

## Environment variables

Copy from [`.env.example`](.env.example):

| Variable | Required for | Notes |
| -------- | ------------ | ----- |
| `NEXT_PUBLIC_SITE_URL` | SEO / OG / sitemap | Production canonical URL, e.g. `https://drivescore.club` |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Live CMS content | Required — marketing pages load from Sanity |
| `NEXT_PUBLIC_SANITY_DATASET` | CMS | Defaults to `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | CMS | Defaults to `2025-01-01` |
| `SANITY_API_READ_TOKEN` | Private/draft reads | Optional for published CDN reads |
| `SANITY_API_WRITE_TOKEN` | `pnpm migrate:sanity-copy` only | Editor+ token; not needed to run the app |
| `NEXT_PUBLIC_POSTHOG_KEY` | Client analytics | Optional in local; skip if unused. Analytics is client-only — there are no server-side PostHog vars |

`VERCEL_PROJECT_PRODUCTION_URL` is also read by `src/lib/site.ts` as a fallback when `NEXT_PUBLIC_SITE_URL` is unset. Vercel injects it automatically — don't set it by hand.

Full waitlist details: [`docs/06-waitlist-and-email.md`](../../docs/06-waitlist-and-email.md).

## Analytics (PostHog)

Client events via `src/lib/analytics.ts` (no-op if key unset):

| Event | When |
| ----- | ---- |
| `landing_page_viewed` | Landing mounts |
| `landing_section_viewed` | Section enters viewport (`section`) |
| `landing_problem_card_selected` | Problem card selected (`index`, `title`) |
| `landing_journey_step_selected` | Journey step selected (`index`, `title`, `active`, `source`: pin / card) |
| `landing_faq_toggled` | FAQ open/close (`index`, `question`, `open`) |
| `landing_markers_toggled` | Method “10 markers” expand (`open`) |
| `landing_footer_link_clicked` | Footer link (`group`, `label`, `href`) |
| `waitlist_cta_clicked` | Join CTA opens the modal (`source`: hero / sticky / sample / header). **Not fired by the desktop hero form**, which submits inline — see below |
| `waitlist_modal_closed` | Modal closed (`source`, `joined`) |
| `waitlist_submit_attempted` | Email submit (`source`, `email_domain`) |
| `waitlist_joined` | Successful join (`email_domain`) |
| `waitlist_submit_failed` | Join API error (`error`) |

## Waitlist (stubbed)

Join CTA → modal → `useJoinWaitlist` (React Query) → `POST /api/waitlist` (stub: validates + `console.log`s the email, no email/CRM provider) → success UI + PostHog events above.

**Two entry paths, split at 768px by `styles/landing.css`.** Below 768px the hero shows a button that opens the modal; at and above 768px the button is hidden and the hero aside renders an inline `WaitlistForm` that submits directly. Both hit the same hook and API. Consequence: `waitlist_cta_clicked{source:"hero"}` only fires on mobile, and `hero.ctaLabel` / `hero.ctaMicrocopy` are not rendered on desktop.

| File | Role |
| ---- | ---- |
| `src/components/landing/landing-page.tsx` | Modal state + the four CTA sources (`hero` / `sample` / `sticky` / `header`) |
| `src/components/landing/ui/waitlist-modal.tsx` | Modal shell |
| `src/components/landing/ui/waitlist-form.tsx` | Form UI + submit |
| `src/components/landing/sections/hero.tsx` | Inline hero variant of the form (desktop aside) |
| `src/components/landing/sections/sticky-cta.tsx` | Sticky bottom pill (mobile/tablet, CMS copy), scroll-gated |
| `src/components/landing/sections/sticky-header.tsx` | Sticky top header (desktop, “Check your car”), scroll-gated |
| `src/components/landing/hooks/use-scrolled-past.ts` | Shared scroll-past-hero visibility hook |
| `src/hooks/use-join-waitlist.ts` | Mutation hook |
| `src/lib/waitlist-api.ts` | Client fetch |
| `src/app/api/waitlist/route.ts` | API route |
| `src/lib/waitlist.ts` | Email validation/normalization |
| `src/components/providers/query-provider.tsx` | QueryClient provider |

After changing env vars, restart `pnpm dev`.

## Landing page structure

Components live under `src/components/landing/`. Render order (`landing-page.tsx`):

1. Header
2. Hero (waitlist CTA)
3. Problem
4. Journey
5. Sample score
6. Method
7. Confidence
8. FAQ
9. Footer
10. Sticky CTA (overlay) + waitlist modal

Section copy loads from Sanity, with exceptions — the waitlist modal/form, the hero's desktop aside card, and a few labels are still hardcoded (full list in [`docs/07-sanity-cms.md`](../../docs/07-sanity-cms.md)). `src/sanity/lib/fetch.ts` throws a named error if any required CMS array is missing.

Design / product notes: [`docs/01-landing-page.md`](../../docs/01-landing-page.md).

## Sanity CMS

**Full guide:** [`docs/07-sanity-cms.md`](../../docs/07-sanity-cms.md).

Marketing copy (landing sections + FAQ items) is authored in Sanity Studio. Do not put that copy back into React constants.

| Piece | Location |
| ----- | -------- |
| Schemas / structure / fetch | `src/sanity/` |
| Studio route | `src/app/studio/[[...tool]]/page.tsx` → `/studio` |
| Config | `sanity.config.ts`, `sanity.cli.ts` |

### Setup

1. Create a Sanity project + `production` dataset at [sanity.io/manage](https://www.sanity.io/manage).
2. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` (and preferably `SANITY_API_READ_TOKEN`) in `.env.local` / Vercel.
3. Add CORS origin for `http://localhost:3000` and your production host in the Sanity project.
4. Author and **publish** content in Studio at `/studio` (`siteSettings`, `landingPage`, FAQ items).

Published CMS content is cached for up to ~1 hour (`revalidate: 3600`).

`METHOD_VERSION` in `src/lib/method.ts` is the scoring-engine stamp and must stay in sync with [`docs/02-scoring-engine-rubric.md`](../../docs/02-scoring-engine-rubric.md).

The `{{methodVersion}}` placeholder is substituted only by the `RichInline` component in `ui/rich-inline.tsx`, whose one call site today is `confidence.pointers[].body`. In any other CMS field it renders literally.

The method section's tier shares and marker weights **are** authored in Sanity, as a display mirror of the rubric doc — see [`docs/07-sanity-cms.md`](../../docs/07-sanity-cms.md) for the guardrails (shares must total 100).

## Scripts

```bash
pnpm dev                   # development server
pnpm build                 # production build
pnpm start                 # serve production build
pnpm lint                  # ESLint
pnpm migrate:sanity-copy   # dry-run Sanity copy migration (add -- --apply to write)
```

## Related docs

- Repo overview: [`../../README.md`](../../README.md)
- Spec index: [`../../docs/README.md`](../../docs/README.md)
- Sanity CMS: [`../../docs/07-sanity-cms.md`](../../docs/07-sanity-cms.md)
- Waitlist & email: [`../../docs/06-waitlist-and-email.md`](../../docs/06-waitlist-and-email.md)
