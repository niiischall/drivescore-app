# DriveScore 🚗⛽

> **Will E20 hurt your car? Get a score, not a rumor.**

DriveScore is an E20 (20% ethanol-blended petrol) compatibility score tool for Indian car owners. It combines a transparent, research-backed scoring rubric with AI-generated explanations to turn ethanol-blend anxiety into a clear, personalized answer.

---

## Why DriveScore?

India's rollout of E20 fuel has left millions of car owners with the same unanswered questions: Will it damage my fuel system? Will my mileage drop? Is my warranty safe? The answers are scattered across OEM statements, forums, and news reports — and they differ car by car.

DriveScore answers one specific question:

> **"How compatible is _my_ car with E20?"**

Every vehicle gets a 0–100 compatibility score with an explicit confidence rating — a heuristic estimate built on a documented, versioned rubric, not a black box.

---

## How it Works

```
Landing Page → Multi-Stage Form → Scoring Engine → AI Report
```

1. **Identify your vehicle** — registration number triggers an RC/VAHAN lookup (make, model, manufacture date); manual fallback if it fails
2. **Confirm the details** — variant/trim selection keys the rules engine; optional flex-fuel confirmation boosts confidence
3. **Usage & context** — kilometres driven and storage pattern; age and climate are auto-derived
4. **Get your score** — 0–100 score, confidence band, and a short explanation (free); a paid AI deep report breaks down all 10 markers for your specific car

## The Scoring Rubric

Ten weighted markers across four tiers:

| Tier                          | Focus                                                          | Weight |
| ----------------------------- | -------------------------------------------------------------- | ------ |
| 1. Ground Truth               | OEM E20 declaration, manufacture date vs regulatory cutoffs    | ~40%   |
| 2. Material Durability        | Elastomers/seals, tank & line corrosion, fuel pump             | ~35%   |
| 3. Calibration / Driveability | Injection architecture, ECU fuel trim, O2 sensor, knock sensor | ~20%   |
| 4. Context                    | Usage/age composite                                            | ~5%    |

Scores map to three bands: **Likely Compatible** (75–100) · **Use With Caution** (40–74) · **Not Recommended** (0–39), plus a low-confidence flag when no official OEM stance exists.

Full spec: [`docs/02-scoring-engine-rubric.md`](docs/02-scoring-engine-rubric.md)

---

## Guiding Principles

- **AI explains. It doesn't calculate.** Every score comes from the deterministic rubric; the LLM only narrates it.
- Only ask users what only _they_ can know — technical markers are derived by a backend rules engine.
- Confidence is a first-class output, not fine print.
- Build trust through transparency: visible weights, versioned rubric, explicit limitations.

---

## Documentation

Design specs live in [`docs/`](docs/):

1. [`01-landing-page.md`](docs/01-landing-page.md) — page structure, visual identity, content per section
2. [`02-scoring-engine-rubric.md`](docs/02-scoring-engine-rubric.md) — the 10-marker rubric, weights, confidence bands, data sourcing
3. [`03-multi-stage-form.md`](docs/03-multi-stage-form.md) — the 4-stage intake form and field-to-marker mapping
4. [`04-ai-report-and-monetization.md`](docs/04-ai-report-and-monetization.md) — free/paid split, subscription model, report-caching architecture
5. [`05-system-architecture.md`](docs/05-system-architecture.md) — component overview, request flow, data model, regeneration policy

---

## Getting Started

```bash
cd apps/web
pnpm install
cp .env.example .env.local
pnpm dev
```

---

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- PostgreSQL
- Prisma
- OpenAI API
- PostHog (product analytics, proxied first-party)

Monorepo layout: `apps/web` (Next.js app) + `packages/` (`scoring-engine`, `ai`, `cars`, `database`, `types`, `ui`, `config`).

---

## Status

🚧 DriveScore is currently under active development. The design docs are v1 research-backed drafts — open items are listed at the bottom of each file.

---

## Vision

Start with the E20 question every Indian petrol-car owner is asking today, and grow into the trusted compatibility and ownership-health companion for the vehicle's whole life.

---

Built with ❤️ by [Nischal Nikit](https://github.com/niiischall) to help people run their cars with confidence.
