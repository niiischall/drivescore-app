# DriveScore colors — quick map

Use semantic tokens in UI. Full tables: `semantics.md`. Palette values: `primitives.md`.

## Source of truth

`apps/web/src/app/globals.css`

## Most-used semantics

| Role | Token | Tailwind |
|------|-------|----------|
| Page bg | `--color-surface` | `bg-surface` |
| Raised surface | `--color-surface-raised` | `bg-surface-raised` |
| Main text | `--color-text-primary` | `text-text-primary` |
| Body text | `--color-text-default` | `text-text-default` |
| Subtext | `--color-text-secondary` | `text-text-secondary` |
| Brand text | `--color-text-brand` | `text-text-brand` |
| CTA | `--color-primary` | `bg-primary` / `text-primary` |
| On CTA | `--color-on-primary` | `text-on-primary` |
| Border | `--color-border` | `border-border` |
| Error text | `--color-error-text` | `text-error-text` |
| Success text | `--color-success-text` | `text-success-text` |

## Do not use

- Primitives: `--purple-600`, `--grey-100`, …
- Hardcoded hex in components
- Tailwind palette classes: `bg-zinc-50`, `text-purple-600`, `bg-gray-100`, …

## Dark mode

Set `data-theme="dark"` on `<html>` (or a scoped root). Remap is already defined in CSS.
