# DriveScore — AI Report Generation & Monetization

Status: v1 draft (pre-build)
Related: `02-scoring-engine-rubric.md`, `03-multi-stage-form.md`

## Flow position
User lands on landing page → onboards via multi-stage form → gets free score/band/summary → **this document covers what happens next**: the paid, generative-AI-authored deep report.

## Free vs paid split
**Free (templated, no LLM call — zero marginal cost)**
- 0–100 score + confidence band
- 1–2 line templated explanation built from rules-engine output (e.g. "Your car scores in the 'Use with Caution' range mainly due to its pre-2023 manufacture date and standard MPFI system.")
- Paywall preview: deep report's section titles shown, content blurred/locked (e.g. "Fuel System Risk," "What This Means for Your Warranty") — shows structure without content, stronger conversion than a plain "subscribe to see more" wall

**Paid (generative AI, deep report)**
- Marker-by-marker breakdown in plain language — why each of the 10 markers scored as it did for this specific vehicle
- Actionable guidance (e.g. fuel-line inspection recommendation, dealer follow-up prompts)
- Risk narrative tailored to the Stage 3 usage profile (mileage, storage pattern, climate)
- Comparison context ("cars of your make/year typically score X; yours scores Y because...")

## Pricing model
**Small subscription — unlimited *checks*, not unlimited *AI generation***
- Genuinely unlimited LLM generation per subscriber is a direct cost risk and must be avoided
- Framing to users: "unlimited checks" (true — scoring is free/cheap to run)
- Internal reality: fair-use soft cap on fresh AI report generations per subscriber per period (e.g. 10/month); further checks reuse cached reports or fall back to the free summary

## Caching architecture — the core cost control
**Cache key = vehicle fingerprint + usage-profile fingerprint, not just vehicle, and not per-user**
- Vehicle fingerprint: make + model + variant + manufacture month/year (drives Markers 1–9, which are vehicle-fixed)
- Usage fingerprint: usage bucket + storage pattern + climate (drives Marker 10, which is user-specific)
- Two subscribers with the identical vehicle and usage profile get the identical cached report — correct and desirable, not a bug
- Data model implication: separate `reports` table (keyed on fingerprint) from `checks` table (user + timestamp, references a report). Ten users checking the same car with similar usage share one stored report and one token spend.

### Regeneration triggers (the only events that should burn a fresh AI call)
- Rubric version change (e.g. v0.2 → v0.3): default to serving the old report tagged with its rubric version rather than auto-regenerating everything — regenerate only on next explicit access/request, to avoid a cost spike across the whole cached set
- OEM issues a new explicit declaration for that model: this is a genuine Marker 1 change (highest-weight marker) — this does warrant regeneration
- User's usage profile changes materially (odometer crosses a bucket boundary, moves states): default to still serving the cached report for minor drift; consider regenerating only the usage-narrative paragraph rather than the full report if the change is significant

### Explicitly NOT a regeneration trigger
- A different user with an identical fingerprint requesting the same vehicle
- Trivial/non-bucket-crossing usage drift

## Cost-control techniques (beyond caching)
- **Two-tier model use:** cheaper/smaller model for templated marker explanations; reserve a stronger model only for sections needing real synthesis (risk narrative, comparison context)
- **Output length cap:** ~600–900 tokens reads as "deep" if well-structured; no need for 3000+ token reports
- **Fair-use soft cap:** framed externally as "unlimited checks," enforced internally as a capped number of fresh generations per period

## Open items for build phase
- Decide exact fair-use cap number (e.g. 10 fresh reports/month) based on projected subscriber economics and model cost
- Decide subscription price point (not addressed here — pricing strategy is a separate business decision, not a token-cost architecture one)
- Build the stale-report UX: when rubric version changes, does the user see a passive version tag, or an active "refresh available" prompt? (Open question — leaning toward passive tag + on-demand refresh to avoid uncontrolled regeneration cost)
- Define the exact LLM prompt structure: what structured marker data + usage data gets passed in, and the output schema (section headers, tone, length per section)
- Decide payment/subscription state management: trial vs active vs lapsed, and how each state gates access to cached vs fresh reports
