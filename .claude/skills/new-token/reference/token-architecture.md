# Token Architecture

## Two-layer system

### Layer 1: Primitive tokens

- Live in `:root`
- No `--nuka-` prefix
- Raw scale values only — no semantic meaning
- Examples: `--color-accent-500`, `--space-4`, `--radius-md`
- Color format: `oklch()` only

### Layer 2: Semantic tokens

- Live in `:root, [data-theme="light"]` and `[data-theme="dark"]`
- Always prefixed with `--nuka-`
- Always reference primitives via `var()` where possible
- Express purpose, not appearance
- Examples: `--nuka-accent-bg`, `--nuka-text-base`, `--nuka-border-focus`

## Naming convention

```
--nuka-<category>-<role>
--nuka-<category>-<role>-<modifier>
```

Categories: `bg`, `text`, `border`, `accent`, `danger`, `success`, `warning`, `info`
Roles: `base`, `subtle`, `muted`, `emphasis`, `inverse`, `disabled`
Modifiers: `hover`, `active`, `focus`, `subtle`

## Current semantic token categories

### Surfaces

`--nuka-bg-base`, `--nuka-bg-subtle`, `--nuka-bg-muted`, `--nuka-bg-emphasis`

### Borders

`--nuka-border-base`, `--nuka-border-strong`, `--nuka-border-focus`

### Text

`--nuka-text-base`, `--nuka-text-muted`, `--nuka-text-subtle`, `--nuka-text-inverse`, `--nuka-text-disabled`

### Accent

`--nuka-accent-bg`, `--nuka-accent-bg-hover`, `--nuka-accent-bg-active`, `--nuka-accent-bg-subtle`, `--nuka-accent-border`, `--nuka-accent-text`

### Feedback (danger, success, warning, info)

Each has: `-bg`, `-text`, `-border`, `-base`

## Rules

- Components reference only semantic tokens
- Semantic tokens reference only primitives
- Component-level tokens are added only when semantic tokens are insufficient
- Dark mode feedback tokens are hardcoded `oklch()` values — primitives are light-first
- Color tokens use `oklch()` exclusively for perceptual uniformity and wide-gamut support
