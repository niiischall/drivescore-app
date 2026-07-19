# DriveScore — V1 Specification Docs

Working name: **DriveScore** — an E20 (20% ethanol-blended petrol) compatibility score tool for Indian car owners.

These docs capture the research and decisions made before build, intended as reference/context files for agentic coding tools working on this repo.

## Flow overview
```
Landing Page (+ waitlist) → Multi-Stage Form → Scoring Engine → AI Report
   (01) + (06)                  (03)              (02)             (04)
```

## Files
1. **`01-landing-page.md`** — page section structure, visual identity, content per section (landing **implemented**; original CTA was “Check your car”, current ship is waitlist)
2. **`02-scoring-engine-rubric.md`** — the 10-marker E20 compatibility rubric, weights, confidence bands, data sourcing per marker
3. **`03-multi-stage-form.md`** — the 4-stage intake form, field-by-field mapping to rubric markers, user-input vs backend-derived split
4. **`04-ai-report-and-monetization.md`** — free/paid split, subscription model, report-caching architecture for cost control
5. **`05-system-architecture.md`** — component overview, end-to-end request flow, checks/reports data model, regeneration policy
6. **`06-waitlist-and-email.md`** — Resend waitlist + confirmation email (**implemented** in `apps/web`)

App runbook: [`apps/web/README.md`](../apps/web/README.md).

## Status
- **Implemented:** landing page UI in `apps/web`, waitlist API + Resend confirmation (`06`)
- **Draft / not yet built:** scoring form, rubric engine, AI report, subscriptions (`02`–`05` open items still apply)

Known open items are listed at the bottom of each file — several require product decisions (pricing point, cache-drift thresholds, RC-lookup vendor) rather than further research.

## Not yet covered (future docs)
- Payment/subscription state machine (trial vs active vs lapsed — flagged in `04` and `05` open items)
- OEM E20-declaration table sourcing/maintenance plan
- Markers 3–9 rules engine — exact logic spec (era + variant → inferred material/calibration profile)
- Backend/infra choices beyond current `apps/web` + Resend/PostHog
