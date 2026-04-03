# vault-ui

A production-grade React component library built on Tailwind v4. Composable, accessible, and designed from the ground up with the kind of API and architectural rigour that scales — not just to more components, but to more developers, more products, and more edge cases.

[![npm](https://img.shields.io/npm/v/vault-ui)](https://www.npmjs.com/package/vault-ui)
[![license](https://img.shields.io/npm/l/vault-ui)](./LICENSE)
[![storybook](https://img.shields.io/badge/storybook-live-ff4785)](https://ku5ic.github.io/vault-ui)
[![typescript](https://img.shields.io/badge/TypeScript-strict-3178c6)](./tsconfig.json)
[![wcag](https://img.shields.io/badge/WCAG_2.2-AA-00857C)](./docs/DECISIONS.md)

---

## Why vault-ui

Most component libraries make one of two mistakes: they either expose too much (every Tailwind class, every CSS variable, infinite flexibility with no guardrails) or too little (hardcoded styles, no theming, take it or leave it).

vault-ui takes a different position. It is opinionated about the things that should be consistent — accessibility, token structure, API shape — and flexible about the things that should be customisable — color, spacing, radius, theming. Every decision has been made deliberately and documented. Nothing is accidental.

**What this project demonstrates:**

- Component API design that separates concerns correctly from the start, not after a painful refactor
- A two-layer CSS token architecture that makes theming predictable and safe
- WCAG 2.2 AA compliance treated as a constraint, not an afterthought
- TypeScript strict mode with `exactOptionalPropertyTypes` and `noUncheckedIndexedAccess` — the flags most projects turn off
- A testing discipline that covers behavior, not implementation, with full coverage of the variant system
- Storybook stories that document real-world usage patterns alongside isolated component states

---

## Stack

| Concern       | Tool                     |
| ------------- | ------------------------ |
| Framework     | React 19                 |
| Language      | TypeScript 6 (strict)    |
| Styling       | Tailwind v4              |
| Primitives    | Radix UI                 |
| Variants      | class-variance-authority |
| Testing       | Vitest + Testing Library |
| Documentation | Storybook 10             |
| Build         | Vite 8                   |

---

## Installation

```bash
npm install vault-ui
```

Import the stylesheet once at your application entry point:

```tsx
import "vault-ui/styles";
```

Add `data-theme` to your root element:

```html
<html data-theme="light"></html>
```

---

## Usage

### Basic

```tsx
import { Button } from "vault-ui";

export function SaveButton() {
  return <Button variant="primary">Save changes</Button>;
}
```

### Variant and intent

Every component exposes two independent style axes:

- `variant` controls **visual weight** — how much attention the component demands
- `intent` controls **semantic meaning** — what the action communicates

```tsx
// Visual weight only
<Button variant="primary">Save</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="ghost">Skip</Button>

// Semantic meaning only
<Button intent="danger">Delete account</Button>
<Button intent="success">Confirm order</Button>
<Button intent="warning">Proceed anyway</Button>

// Combined — the real power
<Button variant="ghost" intent="danger">Remove item</Button>
<Button variant="outline" intent="success">Mark as complete</Button>
```

This composability means you never need `variant="ghost-danger"` or `variant="outline-success"`. The matrix is clean, predictable, and fully typed.

### Sizes

```tsx
<Button size="sm">Compact</Button>
<Button size="md">Default</Button>
<Button size="lg">Prominent</Button>
```

### Polymorphism via `asChild`

Render as any element or component while preserving all styles and behaviour. Built on Radix UI's `Slot` primitive.

```tsx
import { Link } from "react-router-dom";
import { Button } from "vault-ui";

// Renders as <a> with full Button styles
<Button asChild variant="primary">
  <Link to="/dashboard">Go to dashboard</Link>
</Button>;
```

### Ref forwarding

All components forward refs to their underlying DOM element.

```tsx
const ref = useRef<HTMLButtonElement>(null)

<Button ref={ref} onClick={() => ref.current?.focus()}>
  Focus me
</Button>
```

---

## Theming

vault-ui uses a two-layer CSS custom property system.

**Primitive tokens** define the raw scale — color steps, spacing, radius, typography. They have no semantic meaning and no `--vault-` prefix.

**Semantic tokens** define purpose. They reference primitives and carry the `--vault-` prefix. These are the tokens components actually use.

```
--color-accent-500        ← primitive (raw oklch value)
--vault-accent-bg         ← semantic (references the primitive)
bg-[var(--vault-accent-bg)]  ← component (references the semantic token)
```

This indirection means you can retheme the entire library by overriding semantic tokens — without touching a single component file.

### Customising the theme

```css
/* Override semantic tokens on your theme root */
[data-theme="light"] {
  --vault-accent-bg: oklch(44% 0.043 257);
  --vault-accent-bg-hover: oklch(37.2% 0.044 257);
  --vault-accent-bg-active: oklch(27.9% 0.041 257);
  --vault-accent-text: oklch(44% 0.043 257);
}

[data-theme="dark"] {
  --vault-accent-bg: oklch(44% 0.043 257);
  --vault-accent-bg-hover: oklch(70.4% 0.04 257);
  --vault-accent-text: oklch(86.9% 0.022 257);
}
```

### Nested themes

Because theming is attribute-based, multiple themes can coexist on the same page:

```html
<div data-theme="light">
  <button>Light button</button>

  <div data-theme="dark">
    <button>Dark button</button>
  </div>
</div>
```

### Full token reference

See [`src/styles/tokens.css`](./src/styles/tokens.css) for all primitive and semantic tokens with inline documentation.

---

## Accessibility

WCAG 2.2 AA compliance is a hard constraint, not a goal. It is verified at the token level (contrast ratios calculated and documented), the component level (correct semantic HTML, keyboard navigation, focus management), and the Storybook level (accessibility panel must show zero violations on every story).

**What this means in practice:**

- All text color tokens are verified at 4.5:1 minimum contrast ratio against their intended backgrounds
- The primary accent color (`#43546a`) achieves 7.74:1 on white — AAA
- Focus indicators meet WCAG 2.2's updated 2.4.11 requirements
- Interactive target sizes meet 2.5.8 (24×24px minimum)
- `asChild` correctly delegates accessible names to child elements
- Disabled states use the native `disabled` attribute, not just visual opacity

---

## Components

| Component | Status    | Description                                                     |
| --------- | --------- | --------------------------------------------------------------- |
| `Button`  | ✅ Stable | Actions and form submissions. 5 variants × 4 intents × 3 sizes. |

More components are in development. Each ships only when it meets the same bar as `Button` — full test coverage, Storybook stories, accessibility verified.

---

## Button API

```tsx
import { Button, type ButtonProps } from "vault-ui";
```

| Prop        | Type                                                         | Default     | Description                                        |
| ----------- | ------------------------------------------------------------ | ----------- | -------------------------------------------------- |
| `variant`   | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'link'` | `'primary'` | Visual weight                                      |
| `intent`    | `'default' \| 'danger' \| 'success' \| 'warning'`            | `'default'` | Semantic color                                     |
| `size`      | `'sm' \| 'md' \| 'lg'`                                       | `'md'`      | Size scale                                         |
| `asChild`   | `boolean`                                                    | `false`     | Render as child element via Radix Slot             |
| `disabled`  | `boolean`                                                    | `false`     | Disabled state                                     |
| `className` | `string`                                                     | —           | Merged with component classes via `tailwind-merge` |
| `ref`       | `React.Ref<HTMLButtonElement>`                               | —           | Forwarded to the root element                      |

Extends all native `HTMLButtonElement` attributes.

### Variant × Intent matrix

|             | `default`                       | `danger`                    | `success`                    | `warning`                    |
| ----------- | ------------------------------- | --------------------------- | ---------------------------- | ---------------------------- |
| `primary`   | Filled accent                   | Filled red                  | Filled green                 | Filled amber                 |
| `secondary` | Muted bg + border               | Danger tint                 | Success tint                 | Warning tint                 |
| `outline`   | Transparent + accent border     | Transparent + danger border | Transparent + success border | Transparent + warning border |
| `ghost`     | Transparent, accent hover       | Transparent, danger hover   | Transparent, success hover   | Transparent, warning hover   |
| `link`      | Accent text, underline on hover | Danger text                 | Success text                 | Warning text                 |

---

## Architecture

The key decisions that shaped this library are documented in [`docs/DECISIONS.md`](./docs/DECISIONS.md). Reading it gives you a clear picture of not just what was built, but why — which tradeoffs were accepted, which alternatives were considered, and which decisions are explicitly deferred.

Short version:

- **Variant + intent** over flat variants — `ghost` + `danger` is cleaner than `ghost-danger` and scales to any combination
- **Two-layer tokens** — primitives for scale, semantics for purpose, components touch only semantics
- **`data-theme` attribute** — enables nested themes and avoids class pollution
- **No component-level tokens by default** — added only when semantic tokens are genuinely insufficient

---

## Development

```bash
# Install dependencies
npm install

# Start Storybook
npm run dev

# Run tests
npm run test:watch

# Type check
npm run typecheck

# Lint
npm run lint

# Build
npm run build
```

---

## License

MIT © [Sinisa Kusic](https://github.com/ku5ic)
