# DriveScore — Waitlist & Confirmation Email (Resend)

Status: **implemented** in `apps/web`  
Related: `01-landing-page.md`, `05-system-architecture.md`

## Purpose

Capture launch interest from the landing page hero, store the contact in Resend, and send a single opt-in confirmation email (“You’re on the waitlist”). No double opt-in click link in v1.

## Flow

```mermaid
sequenceDiagram
  participant User
  participant Hero as HeroSection
  participant Hook as useJoinWaitlist
  participant API as POST_api_waitlist
  participant Resend

  User->>Hero: Submit email
  Hero->>Hook: mutate email
  Hook->>API: JSON email
  API->>API: Validate + normalize
  API->>Resend: Upsert contact into Segment
  API->>Resend: Send confirmation email
  Resend-->>User: Inbox confirmation
  API-->>Hook: 200 ok
  Hook->>Hook: PostHog waitlist_joined
  Hook-->>Hero: Success UI
```

## Implementation map

| Piece | Path |
| ----- | ---- |
| Hero form | `apps/web/src/components/landing/sections/hero.tsx` |
| React Query mutation | `apps/web/src/hooks/use-join-waitlist.ts` |
| Client fetch helper | `apps/web/src/lib/waitlist-api.ts` |
| Query provider | `apps/web/src/components/providers/query-provider.tsx` |
| API route | `apps/web/src/app/api/waitlist/route.ts` |
| Resend helpers | `apps/web/src/lib/waitlist.ts` |

## Behavior

1. Client validates email via HTML `required` + `type="email"`, then posts to `/api/waitlist`.
2. Server normalizes (trim + lowercase) and validates with a strict regex; `400` on invalid.
3. Contact is upserted into a Resend **Segment** (env `RESEND_AUDIENCE_ID` — Resend renamed Audiences → Segments).
4. Already-subscribed contacts are treated as success (idempotent join).
5. Confirmation email is sent from `RESEND_FROM_EMAIL` (plain text + simple HTML).
6. On success, client shows the joined UI and captures PostHog event `waitlist_joined` (email domain only).

## Environment variables

Set in `apps/web/.env.local` (see `apps/web/.env.example`):

| Variable | Purpose |
| -------- | ------- |
| `RESEND_API_KEY` | Resend API key |
| `RESEND_AUDIENCE_ID` | Segment ID for the Waitlist segment |
| `RESEND_FROM_EMAIL` | Verified sender, e.g. `DriveScore <hello@drivescore.club>` |

Also required for analytics / site URL elsewhere:

| Variable | Purpose |
| -------- | ------- |
| `NEXT_PUBLIC_POSTHOG_KEY` | Client PostHog |
| `NEXT_PUBLIC_SITE_URL` | Canonical / OG / sitemap base URL |
| `POSTHOG_PERSONAL_API_KEY` / `POSTHOG_PROJECT_ID` / `POSTHOG_HOST` | Server visitor count (optional; falls back to static count) |

## Resend + domain setup (production)

1. Create API key in Resend → `RESEND_API_KEY`.
2. Create a Segment named **Waitlist** → `RESEND_AUDIENCE_ID`.
3. Add and verify sending domain (e.g. `drivescore.club`) in Resend.
4. Add Resend DNS at the registrar (Porkbun for DriveScore):
   - TXT `resend._domainkey` (DKIM)
   - MX `send` → Resend/Amazon SES host (priority 10)
   - TXT `send` (SPF for sending subdomain)
   - Optional TXT `_dmarc`
5. Keep **root** MX/SPF for mailbox forwarding (e.g. Porkbun `fwd1`/`fwd2`) so `hello@` can still receive replies.
6. Set `RESEND_FROM_EMAIL=DriveScore <hello@drivescore.club>` and restart the app.
7. Mirror the same env vars in Vercel (or host) for production.

Local-only shortcut before domain verify: `RESEND_FROM_EMAIL=DriveScore <onboarding@resend.dev>` (delivers only to your Resend account email).

## Email content

Template: `apps/web/src/lib/waitlist-email.ts`  
Hero image (absolute URL): `{NEXT_PUBLIC_SITE_URL}/illustrations/car-suv-india-hero-light.png` — same asset as the light-theme landing hero

Landing page theme art: `car-suv-india-hero-light.png` (light) / `car-suv-india-hero.png` (dark), swapped via `data-theme` in CSS.

- Subject: waitlist confirmed + E20 positioning
- HTML: ~640px light marketing layout — brand header, hero car, product pillars (free check, 10 markers, confidence, AI explains), stats strip, CTA
- Plain-text alternative with the same beats
- Images require a publicly reachable `NEXT_PUBLIC_SITE_URL` (localhost URLs will break the image in the inbox)

## Out of scope (later)

- Double opt-in token links
- Admin UI / CSV export beyond Resend dashboard
- Welcome drip sequences
- Rate limiting (e.g. Upstash) if abused
