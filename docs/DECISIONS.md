# Architecture Decisions

This document records significant architectural decisions made during the development of nuka-ui, including context, reasoning, and tradeoffs.

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

- **Primitive tokens** — raw scale values, no `--nuka-` prefix (e.g. `--color-accent-500`, `--space-4`)
- **Semantic tokens** — purpose-driven, `--nuka-` prefixed, reference primitives (e.g. `--nuka-accent-bg: var(--color-accent-500)`)

Components reference only semantic tokens. Consumers can remap semantic tokens without touching primitives.

### Consequences

- Theming is done by overriding `--nuka-*` tokens on `[data-theme]`
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

---

## ADR-008: Divider — no variant/intent, no asChild, conditional element rendering

**Date:** 2026-04-04
**Status:** Accepted

### Context

Divider is a visual separator used to divide sections of content. It renders as either a horizontal rule or a vertical line, and optionally displays a centered text label. Its design requirements differ significantly from interactive or semantically-colored components like Button or Badge.

### Decisions

**1. No `variant` or `intent` props**

Divider is structural chrome — it carries no semantic color meaning. Adding `intent` (danger, success, warning) to a line separator would be API noise with no valid use case. Its color comes from `--nuka-border-base`, a single neutral token. If a consumer needs a colored divider, `className` is the correct escape hatch.

**2. Conditional root element (`<hr>` vs `<div>`)**

The root element varies based on props:

- Horizontal without label: `<hr>` — has implicit `role="separator"` and `aria-orientation="horizontal"`, no redundant ARIA attributes needed
- Vertical without label: `<div role="separator" aria-orientation="vertical">` — `<hr>` does not support vertical orientation in practice
- Horizontal with label: `<div role="separator" aria-orientation="horizontal">` — the labeled layout is a flex container, not a semantic rule

The ref type is `HTMLElement`, the correct common supertype for `HTMLHRElement` and `HTMLDivElement`. This is the same pattern used by Text (ADR-007).

**3. Vertical + label is explicitly unsupported**

A vertically-oriented divider with centered label text is visually problematic (requires 90° text rotation) and semantically unclear. Rather than implementing a half-broken feature, the component logs a `console.warn` in development and renders the vertical divider without the label. This is graceful degradation — no crash, clear feedback to the developer.

**4. No `asChild`**

Divider is not a polymorphic component. There is no valid use case for rendering a separator as another element. `asChild` would add Radix as a dependency for zero benefit.

### Consequences

- Divider is the first component to intentionally omit variant/intent, establishing that the pattern is opt-in per component, not mandatory
- The conditional element rendering adds internal complexity but produces correct accessibility semantics for each configuration
- Consumers who need a styled divider beyond the size variants use `className` directly

---

## ADR-009: Remove Radix UI — first-party Slot and composeRefs

**Date:** 2026-04-04
**Status:** Accepted

### Context

The project used `@radix-ui/react-slot` (and its transitive dependency `@radix-ui/react-compose-refs`) to implement the `asChild` composition pattern on Button and Badge. This was the only Radix package in `dependencies`.

### Decision

Removed all Radix UI dependencies. Implemented `Slot` and `composeRefs` from scratch in `src/utils/slot.tsx`. The public API (`asChild` prop on components) is unchanged.

`Slot` merges props, refs, event handlers, className, and style from the Slot element onto its single child element. `composeRefs` composes multiple refs (function refs and ref objects) into a single ref callback.

### Reasoning

nuka-ui is a portfolio project that demonstrates platform-level frontend engineering. Using a third-party primitive for composition — even a small, well-scoped one — obscures understanding of a well-known pattern. The `Slot` contract is stable and the implementation is non-trivial enough to be worth owning: ref composition, event handler merging, className concatenation, and style merging each require deliberate handling.

### Consequences

- No external UI primitive dependencies remain. All composition behavior is owned, tested, and visible in the repository.
- Future components that need `asChild` import from `@nuka/utils/slot` — no external dependency decision required.
- `composeRefs` is available for any component that needs to compose a forwarded ref with an internal ref.
- The implementation must be maintained internally — any edge cases in Slot behavior are our responsibility.

### Alternatives considered

**Keeping `@radix-ui/react-slot` as a sanctioned carve-out** — rejected. Inconsistent with the no-third-party-UI-primitives policy. If we carve out Slot, the boundary becomes subjective.

**Dropping `asChild` entirely** — rejected. The `asChild` pattern is a genuine composition tool that strengthens the component API. Removing it would force consumers into less ergonomic patterns (wrapper elements, manual className forwarding) without good reason.

---

## ADR-010: Avatar image loading strategy — layered fallback with `key` remount

**Date:** 2026-04-04
**Status:** Accepted

### Context

Avatar needs image loading state management to avoid flash-of-broken-image. When an `<img>` element fails to load, the browser briefly renders a broken image icon before `onError` fires — this is visible to the user and disrupts layout. Radix UI's Avatar primitive handles this natively, but nuka-ui has adopted a no-third-party-UI-primitives policy (ADR-009).

### Decision

Implemented image loading state in React (`loaded`, `errored`) using `onLoad`/`onError` handlers. The fallback layer (initials or icon) is always rendered as the visible base layer. The `<img>` element is layered on top with `opacity-0` initially, revealed via `opacity-100` on successful load. On error, the `<img>` is removed from the DOM entirely, leaving the fallback visible.

`key={src}` on the `<img>` element forces a clean DOM remount when `src` changes, ensuring no stale image is displayed. The parent component detects the `src` change via a previous-value ref and resets `loaded`/`errored` state synchronously during render. This is simpler and more reliable than a `useEffect` with cleanup that manually resets state variables.

### Consequences

- No flash of broken image. The fallback is always visible until the image has fully loaded.
- Load state is fully owned and visible — no hidden browser behavior.
- The `key` + ref approach is simpler than a `useEffect` with cleanup but means the `<img>` element remounts on every `src` change — acceptable for an avatar where `src` changes are infrequent.
- The three-tier fallback resolution (image → initials → icon) is explicit and testable.

### Alternatives considered

**`onError` only** — rejected. The broken image icon is visible during the network round-trip before `onError` fires. This is the flash-of-broken-image problem the layered approach solves.

**Radix Avatar primitive** — rejected. Violates the no-third-party-UI-primitives policy (ADR-009). The load state management is straightforward enough to own.

**`useEffect` with cleanup for `src` changes** — rejected. More code, more edge cases (stale closures, race conditions between effect cleanup and state updates). `key={src}` achieves the same reset with zero additional code.

---

## ADR-011: Icon — decorative-by-default accessibility contract and cloneElement child enforcement

**Date:** 2026-04-04
**Status:** Accepted

### Context

Icon is a sizing and accessibility wrapper for SVG-based icons from any library. It needs to handle two accessibility modes (decorative and labelled) and ensure child SVGs are always correctly hidden from the accessibility tree regardless of what the consumer passes.

### Decisions

**1. Decorative by default**

Without a `label` prop, Icon renders with `aria-hidden="true"` on the wrapper. This is the correct default because the vast majority of icon usage is decorative — icons placed alongside visible text that already conveys meaning. Requiring consumers to opt into `aria-hidden` on every decorative icon would be error-prone and would lead to accessibility violations when forgotten. The `label` prop switches to labelled mode (`role="img"` + `aria-label`), which is the minority case for standalone icons.

**2. `React.cloneElement` to inject `aria-hidden` onto child SVGs**

The child SVG must always have `aria-hidden="true"` — the accessible name lives on the wrapper, not on the SVG. Rather than requiring consumers to remember to pass `aria-hidden={true}` to every icon library component, Icon enforces this by cloning the child element and injecting `aria-hidden="true"`, `width="100%"`, and `height="100%"`. This is defensive and correct: the wrapper owns the accessibility contract, not the consumer.

**3. `children: React.ReactElement` constraint**

`React.cloneElement` only works on a single React element. The type is `React.ReactElement` (not `React.ReactNode`) to enforce this at the type level. In development, a runtime warning fires if `children` is not a valid element. This trades flexibility (no string children, no fragments) for safety — Icon's purpose is to wrap a single SVG element, and accepting anything else would be a misuse.

**4. No `variant` or `intent`**

Icon has no semantic color role — it is a utility wrapper. Its `color` prop maps directly to `--nuka-text-*` tokens with `"inherit"` as the default, meaning the icon inherits `currentColor` from its parent. This is the correct default for inline icons where the parent text color should flow through.

**5. Dual CVA instances (`iconVariants` + `iconColorVariants`)**

Following the Spinner precedent (ADR not previously recorded — Spinner uses `spinnerVariants` + `spinnerColorVariants`). Separating size and color into distinct CVA instances keeps each concern isolated and composable. The `color` prop conflicts with the native HTML `color` attribute on `HTMLSpanElement`, resolved via `Omit<React.HTMLAttributes<HTMLSpanElement>, "color">` — same pattern as Spinner.

### Consequences

- Icons are accessible by default with zero consumer effort for the common decorative case.
- The `cloneElement` approach requires that icon library components forward arbitrary props to their root SVG — all major libraries (Lucide, Heroicons, Phosphor) do this.
- `children: React.ReactElement` prevents passing strings, numbers, or fragments — this is intentional.
- The `color="inherit"` default means Icon is transparent to parent color context, which is the desired behavior for inline icons.

---

## ADR-012: Kbd — no variant/intent, no asChild, `<kbd>` element, composition model

**Date:** 2026-04-04
**Status:** Accepted

### Context

Kbd is a display-only primitive that renders keyboard key labels. Its design requirements differ fundamentally from interactive or semantically-colored components.

### Decisions

**1. `<kbd>` element — non-negotiable**

The HTML `<kbd>` element is semantically defined as keyboard input. It is the correct and only valid element for this component. No `<span>`, `<code>`, or other element is appropriate as the root.

**2. No `variant` or `intent` props**

Kbd is structural chrome. It carries no semantic color meaning — `intent="danger"` on a key label has no valid use case. A single visual treatment using `--nuka-bg-subtle`, `--nuka-border-base`, and `--nuka-text-base` is correct. Consumers who need custom color use `className`.

**3. No `asChild`**

`<kbd>` is the semantic. There is no valid element to substitute for it. Including `asChild` would add complexity for zero benefit and would encourage incorrect usage.

**4. `size` as the only variant axis**

Three sizes (`sm`, `md`, `lg`) cover the real use cases: tooltips (small), body copy (medium), and command palettes (large). No other variant axis is meaningful for a key label.

**5. Individual `<kbd>` composition model**

The HTML spec describes keyboard shortcuts as nested `<kbd>` elements: a wrapping `<kbd>` containing individual `<kbd>` children. `Kbd` renders a single key. Consumers compose sequences themselves. No `KbdGroup` or `keys` prop — that is a separate concern.

### Consequences

- Kbd is the second component (after Divider) to intentionally omit variant/intent, reinforcing that the pattern is opt-in per component
- No `asChild` means no Slot import and no Radix-adjacent complexity
- The composition model follows the HTML spec and is documented in the "Pattern: Keyboard Shortcut" story
- `<kbd>` has no implicit ARIA role; no `role` attribute is added — this is correct per the spec

---

## ADR-013: Select — composable combobox pattern, `hidden` attribute, and Storybook a11y inconclusive

**Date:** 2026-04-04
**Status:** Accepted

### Context

Select is the most complex Tier 2 component. It requires a custom dropdown with keyboard navigation, styled to match `Input`, using the ARIA combobox pattern (`role="combobox"` + `role="listbox"`). A native `<select>` cannot be reliably styled to match across browsers.

### Decisions

**1. Composable multi-component API**

Select is composed of five parts: `Select` (root context provider), `SelectTrigger` (combobox button), `SelectContent` (listbox container), `SelectItem` (option), and `SelectSeparator` (visual divider). Consumers compose them declaratively. This matches the pattern used by Radix Select and shadcn/ui, giving consumers control over content without forcing them to pass an array of option objects as props.

**2. `hidden` attribute on listbox instead of conditional rendering**

The listbox `<div role="listbox">` is always in the DOM with `hidden={!open}`. This ensures `aria-controls` on the trigger always resolves to a valid element. Conditional rendering (`{open && <div>}`) would leave `aria-controls` pointing to a non-existent element when closed — valid per ARIA 1.2 but flagged by axe-core. The `hidden` attribute removes the element from the accessibility tree while keeping it in the DOM, solving both concerns. It also allows `SelectItem` components to register their labels on mount, so the trigger can display the selected option's label without the listbox being visible.

**3. Registry version counter for synchronous label display**

`SelectItem` registers its value, label, and ref via `useLayoutEffect` on mount. The option registry is a `Map` stored in a ref for stable identity. A `registryVersion` state counter increments on each registration, included as a `useMemo` dependency for the context value. This forces context consumers (notably `SelectTrigger`) to re-render when options register, enabling the trigger to display the selected option's label immediately after mount.

**4. `aria-label` fallback for combobox accessible name**

`role="combobox"` has `nameFrom: author` — text content does not contribute to the accessible name. When no `aria-labelledby` is present (i.e., outside a `FormField`), the trigger derives `aria-label` from the selected option label, the `placeholder` prop, or a fallback `"Select"`. Inside `FormField`, `aria-labelledby` from the `Label` takes precedence and `aria-label` is omitted.

**5. Known Storybook a11y panel inconclusive**

The Storybook accessibility panel reports `aria-controls` as "inconclusive" on Select stories. This is a tooling limitation: axe-core runs in the parent frame and cannot resolve element IDs inside the story iframe. Console inspection confirms the DOM is correct — `aria-controls` on the trigger matches `id` on the listbox, which is present in the DOM with `hidden=""`. The IDs match. This is not a WCAG violation.

### Consequences

- The composable API requires five imports for full usage but matches industry convention and is self-documenting
- The `hidden` attribute approach means option elements exist in the DOM when closed, but are excluded from the accessibility tree
- The registry pattern adds a render cycle on mount but ensures labels are always available to the trigger
- No third-party UI primitive dependencies — all keyboard navigation, type-ahead, and ARIA semantics are owned

---

## ADR-014: Tier 3 Batch 1 — Alert, Progress, and Skeleton design decisions

**Date:** 2026-04-04
**Status:** Accepted

### Context

Alert, Progress, and Skeleton are the first Tier 3 (feedback & display) components. Each has distinct design requirements that diverge from the interactive component patterns established in Tiers 1–2.

### Decisions

**1. Alert — controlled-only dismiss, no internal state**

Alert accepts an optional `onDismiss?: () => void` prop. When provided, a dismiss button renders. There is no internal `open`/`isOpen` state — the consumer owns visibility entirely. This is consistent with React's controlled component pattern and avoids the complexity of dual controlled/uncontrolled modes for a simple presentational component. The dismiss button is a plain `<button>` element with ghost styling, not a `Button` component — this avoids circular import risk and over-engineering for a single icon button.

**2. Progress — two CVA instances (track vs. fill)**

Progress uses `progressTrackVariants` for the outer track (owns `size`) and `progressFillVariants` for the inner fill (owns `intent`). This separation exists because `size` and `intent` apply to different DOM elements. Combining them in a single CVA instance would require passing the full variant set to both elements, with unused variants on each. The two-instance approach keeps each CVA focused on the element it styles.

**3. Skeleton — no variant/intent, no size prop, hardcoded `aria-hidden`**

Skeleton is a purely structural component with no semantic color meaning. It has a `shape` prop (`rect`, `circle`, `text`) but no `variant`, `intent`, or `size`. Consumers control dimensions via `className` or `style` — this is intentional because skeleton dimensions must match the content they replace, which varies per usage. `aria-hidden="true"` is hardcoded and not overridable via props. Skeleton is purely visual decoration; screen reader announcements for loading state belong to the parent context (e.g., `aria-busy` on a container), never on the skeleton itself. Allowing consumers to remove `aria-hidden` would create an accessibility antipattern.

**4. Progress indeterminate mode — CSS animation with reduced-motion support**

When `value` is `undefined`, Progress enters indeterminate mode with a CSS animation (`nuka-progress-indeterminate` keyframe). `aria-valuenow` is genuinely omitted (not set to `undefined` as a string) per the ARIA progressbar specification. `@media (prefers-reduced-motion: reduce)` disables the animation — no JavaScript prop needed.

### Consequences

- Alert's controlled-only pattern is simpler to implement and test; consumers who need uncontrolled dismiss wrap it in their own state
- The two-CVA-instance approach for Progress establishes a pattern for future components with multi-element styling (e.g., Slider already uses this)
- Skeleton's lack of variant/intent reinforces that the pattern is opt-in per component, not mandatory — joining Divider (ADR-008) and Kbd (ADR-012) in this category
- Reduced-motion handling via CSS `@media` query is consistent across Progress and Skeleton, with no per-component JavaScript required

---

## ADR-015: `@floating-ui/react` as sanctioned external dependency

**Date:** 2026-04-04
**Status:** Accepted

### Context

Tooltip and Popover require floating position logic: scroll observation, overflow boundary detection, flip/shift/arrow middleware, cross-browser measurement, and real-time repositioning on scroll/resize. This is the same class of problem that motivated ADR-009's removal of Radix UI — but the scope and nature of the dependency are fundamentally different.

### Decision

`@floating-ui/react` is added to `dependencies` as the only deliberate exception to the no-third-party-UI-primitives policy established in ADR-009.

### Reasoning

The distinction from Radix UI is categorical, not a matter of degree:

- **Radix UI** imposes a full component API — it owns rendering, ARIA semantics, keyboard navigation, and state management. Using it means delegating the entire component contract to a third party.
- **Floating UI** provides a positioning primitive. It computes `{ x, y }` coordinates and exposes hooks for interaction detection (`useHover`, `useClick`, `useDismiss`). It does not render any DOM elements, impose any component structure, or manage accessible names/roles beyond what the consumer explicitly configures.

Rolling floating position logic first-party would produce a worse implementation with real edge cases around:
- `ResizeObserver` and `IntersectionObserver` cross-browser behavior
- Scroll container detection across shadow DOM boundaries
- Overflow boundary calculation with nested scrolling contexts
- Sub-pixel measurement rounding errors

These are positioning math problems, not component design problems. Owning them adds maintenance burden without demonstrating any component architecture skill.

### Consequences

- `@floating-ui/react` is the sole external UI-adjacent dependency. This exception is narrow and deliberate.
- Future floating components (DropdownMenu, Dialog popover mode, DatePicker) reuse this dependency — no additional dependency decisions required.
- The library is used as a primitive: all ARIA semantics, focus management, and component structure remain first-party.
- If `@floating-ui/react` is ever abandoned, the migration surface is limited to positioning logic — no component APIs would need rewriting.

### Alternatives considered

**First-party positioning engine** — rejected. The implementation complexity is high, the edge cases are browser-specific, and the result would be strictly worse than Floating UI's battle-tested solution. This is not a learning opportunity; it is a solved problem.

**CSS Anchor Positioning (`anchor()`)** — not yet viable. Browser support is insufficient (no Firefox, no Safari stable as of early 2026). Revisit when baseline support reaches 90%+.

---

## ADR-016: Tooltip and Popover compound component design

**Date:** 2026-04-04
**Status:** Accepted

### Context

Tooltip and Popover are the first floating UI components in nuka-ui. They share positioning infrastructure (`@floating-ui/react`) but have distinct interaction models, ARIA patterns, and focus management requirements.

### Decisions

**1. Compound component pattern (Root + Trigger + Content)**

Both components use the same compound structure:

```tsx
<Tooltip>
  <TooltipTrigger>...</TooltipTrigger>
  <TooltipContent>...</TooltipContent>
</Tooltip>
```

The Root component (`Tooltip`, `Popover`) is a context provider that owns state and Floating UI configuration. It renders no DOM element. Trigger and Content are separate components that consume context.

This pattern was chosen over a single-prop wrapper (`<Tooltip content="...">`) because:
- It allows arbitrary trigger elements via `asChild` — tooltips on icon buttons, links, or custom components
- It gives consumers full control over content rendering — Popover content can contain forms, lists, or any interactive elements
- It aligns with the compound pattern established by `Select` (ADR-013) and anticipated by Tier 4 components (Dialog, DropdownMenu, Tabs)

**2. Tooltip interaction model: hover + focus, non-interactive content**

- Opens on hover (with configurable delay, default 600ms) and focus (immediate, no delay)
- Closes on mouseleave, blur, and Escape
- Content has `role="tooltip"` and `pointer-events-none` — tooltips are never interactive
- Trigger uses `aria-describedby` pointing to the tooltip's `id`
- `side` prop on the Root controls placement (`top`, `right`, `bottom`, `left`)

The delay applies only to hover-open, not focus-open. Focus-triggered tooltips must be immediate per WCAG 1.4.13 (Content on Hover or Focus) — the user has already made an explicit action.

**3. Popover interaction model: click, interactive content**

- Opens on click, closes on Escape and outside click
- Content has `role="dialog"` — Popover panels are interactive regions
- Focus moves into the panel on open (first focusable child, or the panel itself via `tabIndex={-1}`)
- Focus returns to the trigger on close (handled natively by Floating UI's `useDismiss`)
- Trigger uses `aria-expanded` and `aria-controls`
- No focus trap — that belongs to Dialog (Tier 4), not Popover

**4. Portal rendering for both**

Both render content via `ReactDOM.createPortal(…, document.body)` to escape stacking contexts. Content is conditionally rendered (`{open && <portal>}`), not hidden with `hidden` attribute — unlike Select (ADR-013), there is no registry pattern that requires options to be in the DOM when closed.

SSR safety: both Content components guard with `typeof document === 'undefined'`.

**5. No variant/intent on either component**

Tooltip and Popover are structural chrome — they carry no semantic color meaning. Tooltip has a single dark surface style; Popover has a single bordered surface style. This follows the precedent set by Divider (ADR-008), Kbd (ADR-012), and Skeleton (ADR-014).

### Consequences

- The compound pattern adds import count (3 per component) but is self-documenting and matches industry convention (Radix, shadcn/ui, Ark UI)
- Tooltip and Popover establish the Floating UI integration pattern for all future floating components
- The clear separation between Tooltip (non-interactive, `role="tooltip"`) and Popover (interactive, `role="dialog"`) prevents misuse — consumers cannot accidentally put interactive content in a tooltip
- `side` on Tooltip Root (not Content) keeps placement configuration where it belongs — at the `useFloating` call site

---

## ADR-017: Toast — singleton store, no provider, queue design, and action slot

**Date:** 2026-04-04
**Status:** Accepted

### Context

Toast is a programmatic notification system. Unlike other nuka-ui components, it is invoked imperatively (`toast('message')`) rather than declaratively. This requires a state management pattern that works outside the React render tree.

### Decisions

**1. Module-level singleton store instead of Context/Provider**

The store is a plain TypeScript module (`toastStore.ts`) with no React dependency. State lives in a module-level `let state: ToastItem[]` variable. React subscribes via `useSyncExternalStore(store.subscribe, store.getSnapshot)`. This means `toast()` works from event handlers, async callbacks, and non-React code without any provider in the component tree. A Context-based approach would require `<ToastProvider>` wrapping the app, which adds ceremony for no benefit — toast state is inherently global (one notification queue per page).

**2. `useSyncExternalStore` over `useState` + `useEffect`**

`useSyncExternalStore` is React's sanctioned API for reading external mutable state. It handles concurrent mode tearing, server-side rendering (via `getServerSnapshot`), and automatic re-rendering. Using `useState` + `useEffect` to sync external state is fragile and prone to tearing in React 18+ concurrent features.

**3. Queue with max 5 visible toasts**

More than 5 simultaneous toasts overwhelm the user. New toasts beyond the limit are queued (`visible: false`) and promoted FIFO as visible toasts dismiss. The queue is transparent to the consumer — `toast()` always accepts calls regardless of current count. Auto-dismiss timers start when a toast becomes visible, not when it's queued.

**4. `dismissing` flag for exit animation**

When `toast.dismiss(id)` is called, the toast is marked `dismissing: true` (triggering `data-state="closed"` CSS animation) but remains in the DOM for 300ms — the exit animation duration. After 300ms, `remove(id)` filters it from state. This decouples animation timing from React rendering.

**5. `duration: Infinity` for persistent toasts**

`Infinity` is a valid JavaScript number that naturally passes `if (duration === Infinity) return` checks without special-casing string sentinels or nullable types. The timer simply never starts.

**6. `__reset()` — dev/test only, not part of public API**

`toastStore.__reset()` clears all toasts synchronously. It is exported from `toastStore.ts` but intentionally not re-exported from `src/index.ts`. The double-underscore prefix is a conventional signal that this is internal. It is necessary for Storybook story isolation and test `beforeEach` cleanup.

**7. `action` slot on `ToastItem`**

`ToastItem.action` is an optional `{ label: string; onClick: () => void }` that renders an inline action button (e.g., "Undo") in the toast. This is a common real-world pattern that cannot be achieved with message strings alone. The action button dismisses the toast after executing the callback. The slot is minimal — a single label and callback — rather than accepting arbitrary React nodes, which would complicate the store's serializable-friendly shape.

### Consequences

- No `<ToastProvider>` needed — consumers render `<Toaster />` once, call `toast()` anywhere
- The singleton pattern means only one toast queue per JavaScript context — multiple `<Toaster />` instances would render duplicate toasts (documented, not prevented)
- `__reset()` must be called in test/story setup to avoid state leaking between tests
- The `action` slot is additive and does not affect consumers who don't use it
- CSS keyframes for enter/exit animation live in `src/styles/index.css`, following the Spinner pattern — a `@media (prefers-reduced-motion: reduce)` override disables all `data-state` animations globally
