# DriveScore foundation — quick map

Use this for day-to-day UI work. Full tables live in `primitives.md` / `semantics.md`.

## Font

- **Family:** Euclid Circular B → `font-sans` / `var(--font-euclid)`
- **Files:** `apps/web/src/app/fonts/*.woff2`
- **Weights:** 400 Regular, 500 Medium, 600 Semibold, 700 Bold
- **Rules:** no Light for body; Medium for emphasis; Semibold for headings; Bold only for display

## Spacing (`--space-*`)

| Token | Value | Typical use |
|-------|-------|-------------|
| `space-1`–`2` | 4–8px | Micro gaps, icon padding |
| `space-3`–`4` | 12–16px | Form gaps, standard padding |
| `space-6`–`8` | 24–32px | Card / section gaps |
| `space-16`–`20` | 64–80px | Page / hero sections |

Tailwind spacing utilities (`p-4`, `gap-6`, …) are bridged to these tokens in `globals.css`.

## Radius / elevation

- Radius: `--radius-sm` … `--radius-full` → `rounded-sm` … `rounded-full`
- Shadows: `--shadow-sm` … `--shadow-xl`, plus `--shadow-border` as a border alternative

## Motion

- Animate only `transform` and `opacity`
- Respect `prefers-reduced-motion` (global reduce rule is in `globals.css`)
