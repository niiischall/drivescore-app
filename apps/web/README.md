# DriveScore Web (`apps/web`)

Next.js app for DriveScore — E20 compatibility score tool for Indian car owners.

Currently ships the **marketing landing page** and a **Resend-backed waitlist** (confirmation email + contact segment). Scoring form and reports are still ahead of this surface.

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4
- [TanStack Query](https://tanstack.com/query) for client mutations
- [Resend](https://resend.com) for waitlist contacts + confirmation email
- PostHog (client analytics via `/pulse` proxy; server HogQL for visitor count)
- Vercel Analytics + Speed Insights

## Getting started

```bash
pnpm install
cp .env.example .env.local
# fill env vars (see below)
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy from [`.env.example`](.env.example):

| Variable | Required for | Notes |
| -------- | ------------ | ----- |
| `NEXT_PUBLIC_SITE_URL` | SEO / OG / sitemap | Production canonical URL, e.g. `https://drivescore.club` |
| `NEXT_PUBLIC_POSTHOG_KEY` | Client analytics | Optional in local; skip if unused |
| `POSTHOG_PERSONAL_API_KEY` | Visitor marquee | With `POSTHOG_PROJECT_ID`; falls back to static count |
| `POSTHOG_PROJECT_ID` | Visitor marquee | |
| `POSTHOG_HOST` | Visitor marquee | Defaults to `https://us.posthog.com` |
| `RESEND_API_KEY` | Waitlist | Resend API key |
| `RESEND_AUDIENCE_ID` | Waitlist | Resend **Segment** ID (Audiences → Segments) |
| `RESEND_FROM_EMAIL` | Waitlist | Verified sender, e.g. `DriveScore <hello@drivescore.club>` |

Full waitlist / DNS setup: [`docs/06-waitlist-and-email.md`](../../docs/06-waitlist-and-email.md).

## Waitlist (Resend)

Hero form → `useJoinWaitlist` (React Query) → `POST /api/waitlist` → upsert Resend Segment contact + send confirmation email → success UI + PostHog `waitlist_joined`.

| File | Role |
| ---- | ---- |
| `src/components/landing/sections/hero.tsx` | Form UI |
| `src/hooks/use-join-waitlist.ts` | Mutation hook |
| `src/lib/waitlist-api.ts` | Client fetch |
| `src/app/api/waitlist/route.ts` | API route |
| `src/lib/waitlist.ts` | Validate + Resend calls |
| `src/components/providers/query-provider.tsx` | QueryClient provider |

After changing env vars, restart `pnpm dev`. Mirror Resend vars in Vercel for production.

## Landing page structure

Components live under `src/components/landing/`:

- Header, hero (waitlist), visitor marquee, quick actions
- Problem, sample score, method, confidence, FAQ
- Footer, sticky CTA

Design / product notes: [`docs/01-landing-page.md`](../../docs/01-landing-page.md).

## Scripts

```bash
pnpm dev      # development server
pnpm build    # production build
pnpm start    # serve production build
pnpm lint     # ESLint
```

## Related docs

- Repo overview: [`../../README.md`](../../README.md)
- Spec index: [`../../docs/README.md`](../../docs/README.md)
- Waitlist & email: [`../../docs/06-waitlist-and-email.md`](../../docs/06-waitlist-and-email.md)
