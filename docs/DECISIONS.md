# Architecture Decisions

This document records significant architectural decisions made during the development of vault-ui, including context, reasoning, and tradeoffs.

---

## ADR-001: Variant + Intent API for components

**Date:** 2026-04-03  
**Status:** Accepted

### Context

UI components that carry semantic meaning (danger, success, warning) need a way to express both visual weight and semantic color independently. The naive approach is flat variants: `variant="danger"`, `variant="ghost-danger"`, etc.

### Decision

Separate `variant` and `intent` into distinct props:

- `variant` — controls visual weight and shape (primary, secondary, outline, ghost, link)
- `intent` — controls semantic color (default, danger, success, warning)

All variant × intent combinations are valid. CVA `compoundVariants` handles the class composition.

### Consequences

- 25 explicit compound variant definitions per component that uses this pattern
- Cleaner consumer API — `<Button variant="ghost" intent="danger">` vs `<Button variant="ghost-danger">`
- Scales naturally to new intents or variants without breaking existing combinations
- Adding a new intent requires adding N compoundVariants where N is the number of variants

### Alternatives considered

**Flat variants** — simpler initially but causes combinatorial explosion as variants grow. `ghost-danger`, `outline-success`, `link-warning` become unwieldy and undiscoverable.

**CSS data attributes** — `<Button data-intent="danger">` — avoids prop pollution but loses TypeScript type safety and makes the API less explicit.

---

## ADR-002: Token architecture — primitives + semantic layer

**Date:** 2026-04-03  
**Status:** Accepted

### Context

CSS custom properties need to serve two masters: design system internals (consistent scale) and consumer theming (easy overrides). Flat token structures make theming hard. Deeply nested structures make maintenance hard.

### Decision

Two-layer token architecture:

- **Primitive tokens** — raw scale values, no `--vault-` prefix (e.g. `--color-accent-500`, `--space-4`)
- **Semantic tokens** — purpose-driven, `--vault-` prefixed, reference primitives (e.g. `--vault-accent-bg: var(--color-accent-500)`)

Components reference only semantic tokens. Consumers can remap semantic tokens without touching primitives.

### Consequences

- Theming is done by overriding `--vault-*` tokens on `[data-theme]`
- Primitives are stable — adding a new color to the scale doesn't affect existing components
- Component-level tokens are added only when semantic tokens are insufficient

### Alternatives considered

**Single layer** — all tokens flat. Simple but makes dark mode and theming require overriding every token individually.

**Three layers** (primitives → semantic → component) — more granular but premature for the current component count. Revisit when component-specific theming needs arise.

---

## ADR-003: `data-theme` attribute for theming

**Date:** 2026-04-03  
**Status:** Accepted

### Context

Theme switching requires a CSS selector anchor. Common approaches are class-based (`.dark`) or attribute-based (`data-theme="dark"`).

### Decision

Use `data-theme` attribute on a container element. Semantic tokens are scoped to `[data-theme="light"]` and `[data-theme="dark"]`.

### Consequences

- Multiple themes can coexist on the same page (nested `data-theme` attributes)
- No class pollution — themes don't interfere with utility class systems
- Explicit and readable in the DOM

### Alternatives considered

**Class-based (`.dark`)** — Tailwind's default approach. Works but collides with utility classes and makes nested themes awkward.

**`prefers-color-scheme` only** — automatic but gives consumers no control over manual theme switching.

---

## ADR-004: No component-level tokens by default

**Date:** 2026-04-03  
**Status:** Accepted

### Context

Some design systems define per-component tokens (`--button-bg`, `--button-text`, etc.) for maximum consumer flexibility.

### Decision

Components reference semantic tokens directly. Component-level tokens are added only when a component has styling needs that cannot be expressed through existing semantic tokens.

### Consequences

- Less token surface area to maintain and document
- Consumers who need per-component overrides use `className` prop or CSS targeting
- If component-level tokens are needed later, they are additive and non-breaking

### Alternatives considered

**Per-component tokens for everything** — maximum flexibility but significant maintenance overhead and cognitive load for consumers learning the token system.

---

## ADR-005: Flat variants deferred in favor of variant + intent

**Date:** 2026-04-03  
**Status:** Accepted

### Context

The initial Button implementation used flat variants including `danger` as a variant. During development it became clear this would not scale.

### Decision

Migrated to variant + intent before any other components were built. `danger`, `success`, and `warning` are intents, not variants. This was done early to avoid a breaking change later.

### Future consideration

If the need arises for `intent` to affect layout or shape (not just color), the prop contract remains stable — `intent` values can be extended additively.

---

## ADR-006: Badge variant naming, element choice, and focus ring

**Date:** 2026-04-04
**Status:** Accepted

### Context

Badge is a non-interactive display label. It uses the same variant + intent architecture as Button but needs different variant names and has no interactive states.

### Decisions

**1. `solid`/`subtle`/`outline` instead of `primary`/`secondary`/`ghost`**

Button's variant names describe action weight — "primary" means "the main action." Badge has no actions. Its variants describe visual appearance: `solid` is a filled background, `subtle` is a tinted background, `outline` is a bordered label. Using action-semantic names for a display-only element would be misleading.

**2. `<span>` as the default element**

A `<span>` has no implicit ARIA role, which is correct for a non-interactive inline label. A `<div>` would break inline flow. A `<button>` would imply interactivity that Badge does not have. When interactivity is needed, consumers use `asChild` to render an appropriate interactive element.

**3. No focus ring in base classes**

Badge is not interactive and should never receive focus. Adding focus ring classes would be incorrect — they would either never fire (wasted classes) or incorrectly suggest interactivity. When `asChild` wraps an interactive child (e.g. `<a>`), the child's own focus styles apply. Badge adds nothing.

### Consequences

- Badge variant names are decoupled from Button — each component uses names appropriate to its role
- Future non-interactive display components (Tag, Alert) can follow Badge's naming pattern
- `asChild` remains the escape hatch for interactive use cases without polluting Badge's base styles

---

## ADR-007: Text polymorphism — `as` prop with allow-list, not `asChild` or full generics

**Date:** 2026-04-04
**Status:** Accepted

### Context

Text is a typography primitive that renders different HTML elements depending on context: `<p>` for paragraphs, `<span>` for inline text, `<label>` for form labels, `<li>` for list items, `<time>` for timestamps. It needs a polymorphism mechanism.

### Decisions

**1. `as` prop instead of `asChild`**

`asChild` (Radix Slot) is designed for component composition — merging styles onto an arbitrary consumer component (e.g., rendering a Button as a router Link). Text's polymorphism is element-switching: the component author controls which HTML tag renders. The consumer isn't compositing an external component — they're selecting a semantic element. `as` is the correct pattern for this use case. `asChild` would add Radix as a dependency for a component that has no Radix-native behavior.

**2. Allow-list (`TextElement` union) instead of full generic polymorphism**

A fully generic `as` prop (`<Text<T> as={T}>`) provides exact HTML attribute inference for any element. This is powerful but adds significant type complexity: generic component signatures, conditional ref types, and complex type narrowing. For Text, the set of valid elements is small and well-known: `p`, `span`, `label`, `li`, `time`, `abbr`, `figcaption`, `div`. An explicit union type documents intent, keeps the type signature simple, and prevents misuse (e.g., `as="button"` which should use Button instead).

### Consequences

- `Text` has no Radix dependency — it is a pure HTML + CVA component
- The `TextElement` allow-list must be extended if new valid elements are identified (additive, non-breaking)
- Consumers who need to render Text styles on a custom component should use `className` directly with `textVariants()`
- If a future `TextLink` component is needed, it would be a separate component, not an `asChild` extension of Text
- The ref type is `HTMLElement` (common base) since the forwarded element varies — consumers who need a specific ref type should cast
