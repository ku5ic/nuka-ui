# Token Architecture

## Two-layer system

### Layer 1: Primitive tokens

- Live in `:root`
- No `--vault-` prefix
- Raw scale values only — no semantic meaning
- Examples: `--color-accent-500`, `--space-4`, `--radius-md`
- Color format: `oklch()` only

### Layer 2: Semantic tokens

- Live in `:root, [data-theme="light"]` and `[data-theme="dark"]`
- Always prefixed with `--vault-`
- Always reference primitives via `var()` where possible
- Express purpose, not appearance
- Examples: `--vault-accent-bg`, `--vault-text-base`, `--vault-border-focus`

## Naming convention

```
--vault-<category>-<role>
--vault-<category>-<role>-<modifier>
```

Categories: `bg`, `text`, `border`, `accent`, `danger`, `success`, `warning`, `info`
Roles: `base`, `subtle`, `muted`, `emphasis`, `inverse`, `disabled`
Modifiers: `hover`, `active`, `focus`, `subtle`

## Current semantic token categories

### Surfaces

`--vault-bg-base`, `--vault-bg-subtle`, `--vault-bg-muted`, `--vault-bg-emphasis`

### Borders

`--vault-border-base`, `--vault-border-strong`, `--vault-border-focus`

### Text

`--vault-text-base`, `--vault-text-muted`, `--vault-text-subtle`, `--vault-text-inverse`, `--vault-text-disabled`

### Accent

`--vault-accent-bg`, `--vault-accent-bg-hover`, `--vault-accent-bg-active`, `--vault-accent-bg-subtle`, `--vault-accent-border`, `--vault-accent-text`

### Feedback (danger, success, warning, info)

Each has: `-bg`, `-text`, `-border`, `-base`

## Rules

- Components reference only semantic tokens
- Semantic tokens reference only primitives
- Component-level tokens are added only when semantic tokens are insufficient
- Dark mode feedback tokens are hardcoded `oklch()` values — primitives are light-first
- Color tokens use `oklch()` exclusively for perceptual uniformity and wide-gamut support
