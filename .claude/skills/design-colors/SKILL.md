---
name: design-colors
description: DriveScore color tokens — primitives → semantic tokens with light/dark mappings. Use whenever writing or reviewing component CSS, choosing colors, or implementing dark mode. Components must only use semantic tokens, never raw palette values or hardcoded hex/Tailwind palette classes.
---

# Design Colors (DriveScore)

Two-layer color token architecture:

```
primitives → semantics → component CSS
--purple-600 → --color-primary → .btn-primary { background: var(--color-primary) }
```

## DriveScore quick map

**Implemented in code:** `apps/web/src/app/globals.css` (`:root` + `[data-theme="dark"]` + Tailwind `@theme inline`)

| Need | CSS / Tailwind |
|------|----------------|
| Page background | `bg-surface` / `var(--color-surface)` |
| Body / default text | `text-text-default` / `var(--color-text-default)` |
| Subtext / helpers | `text-text-secondary` / `var(--color-text-secondary)` |
| Headings / main values | `text-text-primary` / `var(--color-text-primary)` |
| Brand / links | `text-text-brand` / `var(--color-text-brand)` |
| CTA fill | `bg-primary` / `var(--color-primary)` |
| Borders | `border-border` / `var(--color-border)` |
| Error / success / warning | `text-error-text`, `bg-success-subtle`, etc. |

Dark theme: set `data-theme="dark"` on a parent (usually `<html>`). Semantic tokens remap automatically.

## Rules

1. **Components reference ONLY semantic tokens** (`--color-primary`, `--color-text-error`) — never primitives (`--purple-600`, `--grey-200`), never hardcoded hex, never Tailwind palette classes like `bg-zinc-50` or `bg-purple-600`.
2. **New color need?** Register a semantic token first in `globals.css` (light + dark), then use it in the component.
3. **Dark theme is automatic** — semantic tokens remap under `[data-theme="dark"]`.

## References

- [references/quick-map.md](references/quick-map.md) — start here for web work.
- [references/semantics.md](references/semantics.md) — full semantic token tables and light/dark mappings.
- [references/primitives.md](references/primitives.md) — raw palette hex values. Only consult when adding a semantic token or debugging a value.
