# DriveScore — Scoring Engine Rubric (v0.2)

Status: v0.2 draft (research-validated, pre-build)
Related: `01-landing-page.md` (Section 3), `03-multi-stage-form.md`

## Overview
0–100 score → 3 confidence bands. Score reflects E20 (20% ethanol-blended petrol) compatibility risk for a specific vehicle. Two distinct risk axes are being scored together:
- **Material durability risk** (can E20 physically damage the vehicle — leaks, corrosion)
- **Calibration/driveability risk** (efficiency/performance impact — rarely a safety issue)

Material durability should be weighted more heavily than calibration, since it's the axis that causes actual damage.

## Confidence bands
| Score range | Band |
|---|---|
| 75–100 | Likely Compatible |
| 40–74 | Use With Caution |
| 0–39 | Not Recommended |

**Low-confidence flag:** shown whenever the OEM has not published an explicit E20 stance for the vehicle (Marker 1 unresolved). Independent of the score/band — a vehicle can score well but still carry a low-confidence flag if it's inferred rather than OEM-confirmed.

## The 10 markers

### Tier 1 — Ground truth (~40%)
1. **OEM explicit E20 declaration** (~25%) — direct manufacturer confirmation for the specific model/model-year/VIN. Highest predictive power; near-dispositive when present. Checked silently against an OEM compatibility table; never asked as a user question (optional owner's-manual confirmation can boost confidence only).
2. **Manufacture date vs regulatory cutoffs** (~15%) — India's two-tier cutoff: ~April 2023 (E20 material-compliant), ~April 2025 (E20-tuned/engine-compliant). Strongest proxy when Marker 1 is unavailable. *(Exact cutoff dates need primary-source verification against MoRTH/SIAM/PIB before production use.)*

### Tier 2 — Material durability / damage risk (~35%)
3. **Fuel-system elastomer/seal material** (~15%) — ethanol-resistant (FKM/Viton, PTFE, specific HNBR) vs non-resistant (NBR/Buna-N, natural rubber, cork). The single biggest damage-risk factor.
4. **Fuel tank & fuel-line metal corrosion resistance** (~12%) — stainless steel/HDPE/coated aluminum vs terne-coated steel/uncoated aluminum/zinc/brass/copper.
5. **Fuel pump ethanol compatibility & flow capacity** (~8%) — tolerance to ethanol's lower lubricity/higher corrosivity, and capacity for ~6–7% higher volumetric flow.

### Tier 3 — Calibration / driveability (~20%)
6. **Fuel injection architecture** (~7%) — tolerance ranking: FFV > MPFI > GDI > carbureted.
7. **ECU closed-loop fuel-trim authority** (~6%) — adaptive calibration; whether trim range can absorb E20's ~6–7% enrichment need.
8. **O2/lambda sensor type** (~4%) — narrowband (sufficient for E20 within trim limits) vs wideband/dedicated ethanol-content sensor (needed for full flex-fuel range).
9. **Knock sensor & adaptive ignition timing** (~3%) — ability to exploit ethanol's higher octane (RON ~108–109) for partial efficiency recovery.

### Tier 4 — Context modifier (~5%)
10. **Usage/age composite** (~5%) — vehicle age & mileage (seal wear), storage/phase-separation risk (long idle periods), cold-start climate exposure.

## Data source per marker (backend derivation vs user input)
| Marker | Source |
|---|---|
| 1. OEM declaration | Backend lookup (OEM compatibility table) + optional user confirmation |
| 2. Manufacture date | RC/VAHAN lookup; manual month+year picker fallback |
| 3–5. Material durability | Backend rules engine (manufacture date + variant + BS-emission era) — inference, not direct lookup |
| 6. Injection architecture | Backend rules engine (variant/engine family — generally resolvable) |
| 7–9. ECU/O2/knock | Backend rules engine (emission-standard era) — lowest confidence tier, since granular per-variant data isn't publicly available in India |
| 10. Usage composite | User input (km bucket, usage/storage pattern) + auto-derived (age from manufacture date, climate from RTO/state) |

**Important limitation:** No Indian consumer database publishes per-variant fuel-system component data (elastomer type, pump rating, sensor type). Markers 3–9 must be produced by a documented, versioned rules engine based on manufacture-date/era + variant, not treated as ground-truth lookups. This is why the confidence rating matters as much as the score itself.

## Versioning policy
- Rubric changes (weight/marker changes) increment version (v0.1 → v0.2 → ...)
- Score displayed with its rubric version explicitly in UI
- Cached reports generated under an older rubric version are tagged with that version rather than silently recalculated — avoids surprise re-scoring and uncontrolled regeneration cost

## Known open gaps (carry into v0.3 planning)
- Exact regulatory cutoff dates/gazette references unverified — confirm against MoRTH/BIS/SIAM primary sources before production launch
- Tier 3 markers (7–9) have the lowest confidence of the set; consider whether to expose marker-level confidence, not just an overall confidence flag
- OEM compatibility table needs a sourcing/maintenance plan (who updates it, how often)
