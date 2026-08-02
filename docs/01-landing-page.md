# DriveScore — Landing Page Architecture

Status: **landing UI implemented** in `apps/web` (waitlist CTA); original “Check your car” form flow still planned  
Related: `03-multi-stage-form.md`, `04-ai-report-and-monetization.md`, `06-waitlist-and-email.md`, **`07-sanity-cms.md`** (content source)

## Purpose
Convert an anxious Indian car owner (worried about E20's effect on their vehicle) into someone who starts the compatibility check. The long-term page leads with the tool itself — the calculator/form *is* the hero. **Pre-launch ship:** the hero collects a waitlist email (stubbed server-side — no confirmation email is sent) instead of starting the multi-stage form. See `06-waitlist-and-email.md`.

## Implemented surface (`apps/web`)

Code: `apps/web/src/components/landing/`.

**Content source:** section copy and FAQs are loaded from Sanity (`apps/web/src/sanity/`). Presentation (layout, CSS, motion) stays in React. Studio: `/studio`. Full CMS guide: [`07-sanity-cms.md`](07-sanity-cms.md).

The shipped page departs from the original draft in several ways:

| Draft | Shipped |
| ----- | ------- |
| Primary CTA “Check your car” | Modal heading now also reads “Check your car” → modal → `POST /api/waitlist` (React Query `useJoinWaitlist`; API is stubbed — logs the email, sends nothing). Modal entry points: hero (mobile only), sample score, sticky CTA (mobile pill / desktop header, both scroll-gated after hero) — plus an inline hero form on desktop |
| Micro-copy “no signup required” | Waitlist email capture; “Be first to check your car's E20 report” and “No spam · Unsubscribe anytime · Built for Indian cars” |
| Trust / social proof | **Not built.** Still an open item — see below |
| Hero subhead | Replaced by a list of benefit bullets (`hero.bullets`) |
| — | **New: Journey section** — an illustrated 4-step trail previewing the intake form |
| — | **New: Sample score section** — a worked example score card with marker bars |
| Visual identity (cream/green draft) | Purple-primary design system with light **and** dark themes — see below |

SEO / discoverability also live in app: metadata, `sitemap.ts`, `robots.ts`, `/llms.txt`, `/llms-full.txt`, JSON-LD (`WebApplication`, `FAQPage`, `WebSite`).

## Visual identity (shared with the in-app scoring tool)

Tokens live in `apps/web/src/app/globals.css`; landing-specific tokens in `components/landing/styles/landing.css`.

- **Themes:** light is the `:root` default, dark is `[data-theme="dark"]`, switched from `prefers-color-scheme` by `providers/theme-sync.tsx`. Both must be checked for any new section.
- **Primary:** purple `--purple-600` `#6841e6`, exposed as `--color-primary` / `--color-text-brand`. This replaced the earlier green-accent direction.
- **Score states only:** Ethanol `#7FB238` (`--color-score-compatible`), Caution `#D99A3D` (`--color-score-caution`), Risk `#C1503F` (`--color-score-risk`). These are reserved for score semantics — do not use them as general accents.
- **Paper** `#F4F1E8` (`--paper-100`) is a surface, not a text colour. The original Ink `#1B1F1D` is not in the codebase.
- Always reference semantic tokens (`--color-primary`, `--color-text-primary`, `--color-score-*`), never raw hexes — the raw palette is theme-swapped underneath.
- Typography: condensed uppercase display type for headlines (dashboard/pump signage feel), plain body face, tabular numerals for numeric/data display (scores, weights, percentages)
- Signature motif: horizontal fuel-blend gauge (E0–E10–E15–**E20**–E25) used in the hero, echoing the score gauge shown later in the results screen

## Section-by-section structure

Section copy comes from the `landingPage` singleton in Sanity unless noted — field names in brackets.

Not everything is in the CMS: the entire waitlist surface (modal, form, and the hero's desktop aside card), plus a handful of labels, aria-labels and the footer credit, are still hardcoded English in React. The full list is in [`07-sanity-cms.md`](07-sanity-cms.md#known-exceptions--copy-still-hardcoded-in-react) — check it before assuming a string is editable.

### 0. Header — `sections/header.tsx`
Brand mark plus a badge [`headerBadge`].

### 1. Hero — `sections/hero.tsx`
- Badge [`hero.badge`]: rubric version + "built for Indian roads" framing
- Headline [`hero.titleBefore` / `titleAccent` / `titleAfter`]: names the anxiety directly (e.g. "Will E20 hurt your car?"), with the accent span styled
- Benefit bullets [`hero.bullets`] — replaced the single-line subhead in the draft; each bullet supports bold segments
- Blend-gauge signature visual [`hero.gaugeLabel`, `hero.gaugeMandate`] — currently a static marker at 80%, not animated
- Post-submit state [`hero.joinedTitle`, `joinedBodyBefore`, `joinedBodyAfter`, `joinedMeta`]

**The hero CTA differs by breakpoint, and the two paths are mutually exclusive** (`landing.css` toggles `.landing-hero__cta` and `.landing-hero__aside` at 768px):

| | Mobile (<768px) | Desktop (≥768px) |
| --- | --- | --- |
| Rendered | Button [`hero.ctaLabel`] + micro-copy [`hero.ctaMicrocopy`] | Inline `WaitlistForm` in the aside card |
| Path | Opens the waitlist modal, `source: "hero"` | Submits directly, no modal |
| Events | `waitlist_cta_clicked` then `waitlist_submit_attempted` | `waitlist_submit_attempted` only |

Two consequences: `hero.ctaLabel` and `hero.ctaMicrocopy` are **invisible on desktop**, and `waitlist_cta_clicked{source:"hero"}` never fires there — so that event undercounts hero interest by however much of the traffic is desktop.

> **`{{methodVersion}}` placeholder.** Substitution happens only inside `ui/rich-inline.tsx`'s `RichInline` component, whose sole call site today is `confidence.pointers[].body`. Every other CMS string — including `hero.badge` — renders raw, so a placeholder there would print literally. `AccentTitle` does not substitute.

### 2. The Problem — `sections/problem.tsx`
- 3 short callouts [`problem.cards`] styled as dashboard/warning readouts (not generic icon cards):
  1. Mileage impact (ethanol's lower energy density)
  2. Corrosion / seal risk (older fuel systems not built for ethanol)
  3. Warranty ambiguity (some OEMs haven't published a stance)
- Cards are selectable; selection fires `landing_problem_card_selected`
- Job: establish this is a real, specific problem before asking for any input

### 3. Journey — `sections/journey.tsx`
Not in the original draft. Previews the intake form (`03-multi-stage-form.md`) as an illustrated trail, so visitors know what they're joining the waitlist for before the form exists.

- Steps [`journey.steps`] pinned onto `/illustrations/journey-trail.png`; pin and label positions are hardcoded in `journey-trail.ts`, so the step count is coupled to the artwork
- Selecting a step fires `landing_journey_step_selected`
- **Required content** — `sanity/lib/fetch.ts` throws if `journey.titleAccent` or `journey.steps` are missing

### 4. Sample Score — `sections/sample-score.tsx`
Not in the original draft. A worked example result card, so the promise is concrete before anyone has run a check.

- A fictional vehicle [`sampleScore.vehicleName`, `vehicleMeta`, `imagePath`] with a score and band [`scoreValue`, `scoreBand`]
- Marker bars [`sampleScore.markers`] with per-marker verdict, tone and bar width
- Confidence note [`sampleScore.confidenceNote`] and a CTA [`sampleScore.ctaLabel`] → waitlist modal, `source: "sample"`
- Must read as illustrative, not as a real score for that vehicle

### 5. How Scoring Works — `sections/method.tsx`
- The 10 rubric parameters (see `02-scoring-engine-rubric.md`), each shown with its **actual weight** (e.g. 25%, 15%, 12%...) instead of arbitrary step numbers — the weight itself carries meaning
- Grouped by tier [`method.slices`]: Ground Truth → Material Durability → Calibration/Driveability → Usage Context
- Weights are authored in Sanity as a display mirror of `docs/02` — see `07-sanity-cms.md` for the guardrails
- Marker list collapses behind a toggle [`showMarkersLabel` / `hideMarkersLabel`], firing `landing_markers_toggled`
- Job: build trust in the method before asking someone to trust the output

### 6. Confidence & Transparency — `sections/confidence.tsx`
- Pointers [`confidence.pointers`] explain the "low confidence" flag shown when an OEM hasn't declared an official E20 stance for a vehicle
- Explains rubric versioning (v0.1 → v0.2 → future), and that scores may be re-evaluated as better data becomes available. Pointer bodies are the **only** CMS strings rendered through `RichInline`, so they alone support `{{methodVersion}}` and `**bold**`
- Job: differentiate from a black-box score; this section is what earns trust for the paid AI report later

### 7. FAQ — `sections/faq.tsx`
Chrome from [`faq.*`]; questions from ordered `faqItem` documents, which also feed the `FAQPage` JSON-LD and `/llms-full.txt`. Toggling fires `landing_faq_toggled`. Minimum question set:

- Does using E20 void my warranty?
- Is this official government or OEM data?
- Why does my score keep changing? (ties into rubric versioning)
- What if my exact model isn't listed?
- How accurate is the score?
- Is my vehicle/personal data safe?
- What should I do if my car scores "Not Recommended"?

### 8. Footer — `sections/footer.tsx`
- Disclaimer [`siteSettings.footerDisclaimer`]: heuristic estimate, not an OEM certification
- Links [`footer.methodLinks`] — methodology/anchor links only. There are no `/privacy` or `/contact` routes; those pages were retired

### 9. Sticky CTA — `sections/sticky-cta.tsx` (mobile/tablet) + `sections/sticky-header.tsx` (desktop)
Two viewport-split variants of the same idea, both gated by the `useScrolledPast` hook (`hooks/use-scrolled-past.ts`, an `IntersectionObserver` on the hero section) — hidden until the user scrolls past the hero, then fades in:

- **Below 1024px:** floating bottom pill, CMS copy [`stickyCta.*`] → waitlist modal, `source: "sticky"`.
- **1024px and up:** sticky top header, hardcoded “Check your car” label → waitlist modal, `source: "header"`. Fills the gap left once the desktop hero's inline waitlist form scrolls out of view.

This is what replaced the draft's "Final CTA" section.

## Full page order (shipped)

1. Header
2. Hero
3. The Problem
4. Journey
5. Sample Score
6. How Scoring Works
7. Confidence & Transparency
8. FAQ
9. Footer
10. Sticky CTA — mobile pill or desktop header (overlay, scroll-gated after hero, not in flow)

Order is set in `components/landing/landing-page.tsx`, which also owns the waitlist modal and the `data-section` wrappers that drive `landing_section_viewed`.

## Open items for build phase

- Swap the waitlist CTAs for “Check your car” when the multi-stage form ships (`03`), and reconcile the Journey section with the real form
- **Trust bar / social proof: still unbuilt.** A visitor-count marquee was specced and a `marqueeSuffix` CMS field existed, but no implementation ever landed; both have been removed. Decide whether to build it (PostHog server-side unique persons) or wait for “X cars checked” once scoring launches
- Hero blend gauge is static — decide whether the "animates/locks onto E20 on load" behaviour is worth building
- Journey step positions are hardcoded against the trail artwork; changing the step count needs new art
- Confirm whether FAQ needs Hindi/regional-language support at launch or post-launch
- Mobile-first: landing is mobile-first; keep testing as form flows land
