# DriveScore — Landing Page Architecture

Status: **landing UI implemented** in `apps/web` (waitlist CTA); original “Check your car” form flow still planned  
Related: `03-multi-stage-form.md`, `04-ai-report-and-monetization.md`, `06-waitlist-and-email.md`

## Purpose
Convert an anxious Indian car owner (worried about E20's effect on their vehicle) into someone who starts the compatibility check. The long-term page leads with the tool itself — the calculator/form *is* the hero. **Pre-launch ship:** the hero collects a waitlist email (Resend confirmation) instead of starting the multi-stage form. See `06-waitlist-and-email.md`.

## Implemented surface (`apps/web`)

Code: `apps/web/src/components/landing/`.

Current section order roughly matches the draft below, with these deltas:

| Draft | Shipped |
| ----- | ------- |
| Primary CTA “Check your car” | “Join the waitlist” → `POST /api/waitlist` (React Query `useJoinWaitlist`) |
| Micro-copy “no signup required” | Waitlist email + confirmation; “Free first check · No spam” |
| Trust / social proof | Visitor marquee (PostHog unique `$pageview` persons when server keys set) |
| Visual identity (cream/green draft) | Dark starfield landing tokens in `landing.css` + design-system semantic colors |

SEO / discoverability also live in app: metadata, `sitemap.ts`, `robots.ts`, `/llms.txt`, JSON-LD.

## Visual identity (shared with the in-app scoring tool)
- Colors: Ink `#1B1F1D` (background), Panel `#242A27`, Paper `#F4F1E8` (text), Ethanol `#7FB238` (primary accent / "compatible"), Amber `#D99A3D` (caution), Danger `#C1503F` (risk)
- Typography: condensed uppercase display type for headlines (dashboard/pump signage feel), plain body face, monospace for all numeric/data display (scores, weights, percentages)
- Signature motif: horizontal fuel-blend gauge (E0–E10–E15–**E20**–E25) used in the hero, echoing the score gauge shown later in the results screen

## Section-by-section structure

### 1. Hero
- Eyebrow: rubric version + "built for Indian roads" framing
- Headline: names the anxiety directly (e.g. "Will E20 hurt your car?")
- Subhead: one line — what the tool does (a score, not a verdict)
- Blend-gauge signature visual, animates/locks onto E20 on load
- Primary CTA: "Check your car" → begins the multi-stage form
- Secondary CTA: "See how scoring works" → anchor link to Section 3
- Micro-copy: "Free · takes under a minute · no signup required"

### 2. The Problem
- 3 short callouts styled as dashboard/warning readouts (not generic icon cards):
  1. Mileage impact (ethanol's lower energy density)
  2. Corrosion / seal risk (older fuel systems not built for ethanol)
  3. Warranty ambiguity (some OEMs haven't published a stance)
- Job: establish this is a real, specific problem before asking for any input

### 3. How Scoring Works
- The 10 rubric parameters (see `02-scoring-engine-rubric.md`), each shown with its **actual weight** (e.g. 25%, 15%, 12%...) instead of arbitrary step numbers — the weight itself carries meaning
- Grouped by tier: Ground Truth → Material Durability → Calibration/Driveability → Usage Context
- Job: build trust in the method before asking someone to trust the output

### 4. Confidence & Transparency
- Explains the "low confidence" flag shown when OEM hasn't declared an official E20 stance for a vehicle
- Explains rubric versioning (v0.1 → v0.2 → future), and that scores may be re-evaluated as better data becomes available
- Job: differentiate from a black-box score; this section is what earns trust for the paid AI report later

### 5. FAQ
Placed after Confidence & Transparency, before the final CTA. Minimum question set:
- Does using E20 void my warranty?
- Is this official government or OEM data?
- Why does my score keep changing? (ties into rubric versioning)
- What if my exact model isn't listed?
- How accurate is the score?
- Is my vehicle/personal data safe?
- What should I do if my car scores "Not Recommended"?

### 6. Final CTA
- Repeat primary action ("Check your car")
- Footer disclaimer: heuristic estimate, not an OEM certification
- Footer links: privacy policy, methodology, contact

## Full page order (final)
1. Hero
2. The Problem
3. How Scoring Works
4. Confidence & Transparency
5. FAQ
6. Final CTA + footer

## Open items for build phase
- Swap waitlist hero CTA for “Check your car” when the multi-stage form ships (`03`)
- Trust bar / social proof: visitor marquee is live; replace or augment with “X cars checked” once scoring launches
- Confirm whether FAQ needs Hindi/regional-language support at launch or post-launch
- Mobile-first: landing is mobile-first; keep testing as form flows land
