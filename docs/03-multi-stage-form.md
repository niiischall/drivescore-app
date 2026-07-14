# DriveScore — Multi-Stage Intake Form

Status: v1 draft (research-backed, pre-build)
Related: `02-scoring-engine-rubric.md`, `04-ai-report-and-monetization.md`

## Design principle
Only ask the user things only *they* know. Technical vehicle-spec markers (fuel system materials, injector type, ECU/sensor capability) should never be asked directly — users can't reasonably know them. Those are derived from a backend vehicle-spec lookup/rules engine once make+model+year+variant is known.

Legend: **[U]** = user-input required · **[A]** = auto-derived from backend lookup · **[F]** = fallback manual field, shown only if the primary lookup fails.

## Stage 1 — Identify Your Vehicle
- Registration number **[U]** → triggers RC/VAHAN lookup
- Auto-fetched on submit: make, model, manufacture month/year, fuel type, RTO/state **[A]**
- Escape hatch: "I don't have my registration number / it's a brand-new car" → routes to manual identity path

→ Feeds Marker 2 (manufacture date) directly; establishes vehicle identity for Marker 1.

## Stage 2 — Confirm & Complete Vehicle Details
- Confirm fetched make + model + manufacture year (read-only, editable) **[A]**
- **Variant/trim selector [U]** — the one identity field VAHAN can't supply; keys the Markers 3–9 rules engine
- Fuel type confirm (petrol / CNG / diesel / flex) **[A/U]**
- Optional: "Is your car a factory flex-fuel / E20-badged variant?" Yes/No/Not sure **[U, optional]** — boosts confidence on Markers 3, 5, 6
- Fallback path (if Stage 1 lookup failed): make **[F]** → model **[F]** → manufacture month+year picker **[F]** → variant **[F]**

→ Feeds Markers 1, 2, 3–9 (via variant → rules engine).

## Stage 3 — Usage & Context
- Kilometres driven — bucketed dropdown (e.g. 0–10k, 10k–20k, ...) **[U]**
- Usage/storage pattern — single-select: daily/covered parking · daily/open parking · occasional use or long-term storage **[U]**
- Vehicle age **[A]** — auto-derived from manufacture date, not asked
- Climate **[A]** — auto-derived from RTO/state, not asked

→ Feeds Marker 10 (usage/age composite) — only 2 user inputs needed; age and climate are free.

## Stage 4 — Optional Confidence Boosters (skippable)
- "Does your owner's manual or fuel-filler flap state E20 compatibility?" Yes/No/Not sure **[U, optional]**
- Backend silently checks OEM E20-declaration table by model + model-year **[A]** → surfaced as a confidence badge, not asked as a question

→ Boosts Marker 1 confidence without gating the flow.

## Result screen
- E20 Compatibility Score (0–100) + confidence band
- Confidence rating (reflects how much of Tiers 2–3 was inferred from era/date vs confirmed from variant/flex-fuel input)
- This is the free tier — see `04-ai-report-and-monetization.md` for what unlocks the paid deep report

## UX rules
- Step progress indicator ("Step 2 of 4") throughout
- Easy/low-friction fields first (registration number), effortful/optional fields last (confidence boosters)
- Every optional field must have an explicit skip — uncertainty should never block progression
- 1–4 visible inputs per screen max; auto-populate wherever a lookup exists
- Manufacture date fallback field: month + year picker only (no day-level picker — irrelevant precision, adds friction)
- Note: registration date ≠ manufacture date in India (registration often lags manufacture by weeks/months) — always prefer manufacture date for Marker 2; treat registration date as a penalized fallback proxy only

## Open items for build phase
- Choice of RC-lookup API vendor (e.g. Surepass, Signzy, Zoop, Gridlines) — coverage varies by state, needs evaluation
- Threshold: if RC-lookup success rate falls below ~70–80% of submissions, prioritize improving the manual fallback cascade
- Need to build and maintain the OEM E20-declaration table (Marker 1 backend source)
- Need to define/version the Markers 3–9 rules engine logic explicitly (era + variant → inferred material/calibration profile)
