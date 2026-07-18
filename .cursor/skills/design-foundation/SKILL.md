---
name: design-foundation
description: DriveScore design foundation — typography, spacing, radius, shadows, z-index, motion, and UI polish. Use whenever building or styling UI, setting type, spacing layouts, or adding motion. Prefer apps/web token CSS over inventing values.
---

# Design Foundation (DriveScore)

Layer 1 + 2 of the token architecture for everything that isn't a color decision: type, space, radius, elevation, motion, and component-level specs.

```
primitives (px, scales, curves) → semantics (roles) → components (specs)
```

## DriveScore quick map

**Implemented in code:** `apps/web/src/app/globals.css`  
**Font:** Euclid Circular B via `next/font/local` → `--font-euclid` / `font-sans`  
**Weights shipped:** 400, 500, 600, 700 (WOFF2). Do not use Light (300) for body.

| Need | Use |
|------|-----|
| Font | `font-sans` (never hardcode a family) |
| Body emphasis | `font-medium` (500), not bold |
| Headings | `font-semibold` (600); Bold (700) only for display sizes |
| Spacing | `p-4`, `gap-6`, `px-16`… (mapped to `--space-*`) or `var(--space-*)` |
| Radius | `rounded-md`, `rounded-xl`… or `var(--radius-*)` |
| Shadows | `shadow-md`… or `var(--shadow-*)` |
| Colors | See `design-colors` skill — semantic tokens only |

## Key rules

- **Typography:** sentence case everywhere; body text ≥14px, labels ≥12px (11px only for utility captions); Medium (500) for emphasis — not Bold; Semibold (600) for headings, Bold (700) only for display sizes; `text-wrap: balance` on headings; never Light (300) for body.
- **Spacing/sizing:** always use scale tokens (`--space-*`) — no magic numbers.
- **Animation:** only animate `transform` and `opacity`; ease-out for enter/exit, ease-in-out for on-screen movement; respect `prefers-reduced-motion`; don't animate things users see 100+ times a day.
- **Polish:** `font-variant-numeric: tabular-nums` for dynamic numbers; never change font weight on hover; prefer `box-shadow: 0 0 0 1px …` over `border`; `pointer-events: none; user-select: none` on decorative elements.

## References

- [references/quick-map.md](references/quick-map.md) — start here for web work.
- [references/primitives.md](references/primitives.md) — full foundation values (type scale, spacing, radius, shadows, motion).
- [references/semantics.md](references/semantics.md) — typography usage map and per-component specs.

Color tokens live in the companion `design-colors` skill — consult that for any color decision.
