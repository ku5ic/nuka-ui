# CLAUDE.md

Context and instructions for Claude Code when working in this repository.

## Project

nuka-ui is a React component library built on Tailwind v4. It abstracts Tailwind utility classes behind a composable component API, customizable via CSS variables and props.

**Stack:** React 19, TypeScript 6 (strict), Tailwind v4, CVA, Storybook 10, Vitest 4, Testing Library  
**Package:** `@nuka-ui/core` on npm  
**Repo:** github.com/ku5ic/nuka-ui

## Commands

```bash
npm run dev           # Storybook at localhost:6006
npm run test:watch    # Vitest in watch mode
npm run lint          # ESLint
npm run format:check  # Prettier
npm run typecheck     # tsc --noEmit
npm run build         # Vite build + tsc declaration emit
```

## Architecture

### Path alias

`@nuka/*` maps to `src/*`. Use it everywhere. No relative imports.

### Token system

Two-layer CSS custom property architecture:

- **Primitive tokens**: raw scale values, no prefix (`--color-accent-500`, `--space-4`)
- **Semantic tokens**: purpose-driven, `--nuka-` prefixed, reference primitives (`--nuka-accent-bg`)

Components reference only semantic tokens. Never use raw Tailwind color utilities: always `bg-(--nuka-accent-bg)`, never `bg-blue-500`.

Theming uses `data-theme` attribute, not classes. Token definitions live in `src/styles/tokens.css`.

### Component API pattern

Every component exposes two props for semantic styling:

- `variant`: visual weight: `primary`, `secondary`, `outline`, `ghost`, `link`
- `intent`: semantic color: `default`, `danger`, `success`, `warning`

All variant x intent combinations must be valid. CVA `compoundVariants` handles class composition. `src/components/Button/Button.tsx` is the reference implementation.

### CVA conventions

- `cva` instance named `<component>Variants`: e.g. `buttonVariants`
- Exported type named `<Component>VariantProps`: e.g. `ButtonVariantProps`
- Base classes in an array, one concern per string
- `intent` variant entries are empty strings: all color work lives in `compoundVariants`
- CVA definitions live in the component's own `<Component>.variants.ts` file, not inlined in the component file
- `src/utils/variants.ts` is reserved for shared CVA base utilities only (helpers used across multiple components)

### Component structure

Every component lives in `src/components/<n>/`. Required layout:

```
Name/
  Name.tsx             # Component implementation, no CVA calls, no large type blocks
  Name.variants.ts     # CVA definitions and VariantProps type (required if component uses CVA)
  Name.types.ts        # Props interfaces and supporting types (see threshold below)
  Name.utils.ts        # Helper functions (see threshold below)
  Name.context.tsx     # Context definition, provider, and consumer hook (if component needs context)
  Name.test.tsx        # Vitest + Testing Library
  Name.stories.tsx     # Storybook stories
  index.ts             # Re-exports only, no implementation code
```

Optional files are created when their content meets the thresholds below. They must not exist as empty stubs.

**Variants file:** Required for any component that uses `cva(...)`. No exceptions. The variants file exports the CVA result and its inferred `VariantProps` type. The component file imports from `./<n>.variants` using the `@nuka/*` alias.

**Types file:** Required when the combined line count of all exported interfaces, type aliases, and union types in a component file exceeds 40 lines. Types shared between a parent and its sub-components (shared context value types, shared size unions) must always live in the types file regardless of line count.

**Utils file:** Required when any of the following is true:

- A helper function exceeds 15 lines
- A helper function is used by more than one file in the component directory
- A helper function contains logic unrelated to rendering (ID generation, string manipulation, DOM measurement, event delegation)

Single-expression inline helpers are not subject to this rule.

**Context file:** Required when the component needs a React context. Contains the context definition, provider component, and consumer hook. Component-local contexts always co-locate here regardless of whether they are shared across the codebase or internal to the component only.

**Compound components:** Each independently usable sub-component lives in its own file named after the sub-component (`CardHeader.tsx`, `CardContent.tsx`, etc.). A single file that defines multiple independently usable sub-components is a violation. Exception: a tightly coupled parent/child pair where the child has no independent use may coexist in the parent file. The `index.ts` re-exports all sub-components.

**index.ts discipline:** `index.ts` contains re-export syntax only. No component definitions, CVA calls, helper functions, context definitions, or type definitions. Any implementation code in `index.ts` is a violation.

**File size limits:**

- Soft limit: 200 lines. Files exceeding this require a comment at the top explaining why they cannot be split. Absence of the comment is a violation.
- Hard limit: 300 lines. No exceptions. Files over 300 lines must be split regardless of any comment.

Add exports to `src/index.ts` when adding a new component.

## Component reuse rules

These rules apply to all new and modified components.

### Internal SVGs must use Icon

Any SVG that is structural chrome internal to a component (dismiss X, dropdown chevron,
avatar fallback, step indicator, breadcrumb separator) must be wrapped in `<Icon>`. Icon
enforces `aria-hidden`, controls sizing via design tokens, and ensures consistent behavior.

Exception: SVGs that are the animated element itself (e.g. Spinner) or that come from
consumer-supplied prop slots (e.g. Alert `icon` prop, EmptyState `illustration` prop).
Also exempt: SVGs tightly coupled to CSS selector targeting (e.g. Checkbox checkmark
toggled via `peer-checked:*:block`).

### Text rendered by compound component internals must use Text or Heading

Any user-visible text rendered as part of a component's own structure (titles, descriptions,
labels that are part of the component's own layout) must use `Text` or `Heading`. This ensures
typography token changes propagate correctly.

### Controlled/uncontrolled state uses useControllableState

Any component with a controlled/uncontrolled prop pair must use `useControllableState`
from `@nuka/hooks/use-controllable-state`.

### Form controls use useFormFieldProps

Any component that integrates with `FormField` context must use `useFormFieldProps`
from `@nuka/hooks/use-form-field-props`.

### Dismissible components use DismissButton

Any component that renders a dismiss/close button must use `DismissButton`
from `@nuka/utils/dismiss-button`.

### Components that render into a portal use Portal

Any component that renders content outside its DOM position must use `Portal`
from `@nuka/utils/portal`.

### src/ directory conventions

- `src/utils/` - pure, framework-agnostic helper functions with no React dependency
- `src/hooks/` - standalone custom hooks; no provider components; hooks that read a shared context live here only if that context is defined in `src/context/`
- `src/context/` - shared infrastructure contexts consumed across unrelated components; each context owns its provider and consumer hook in the same file
- `src/components/<n>/Name.context.tsx` - component-local context; always co-located with the component that owns it

Hooks must never live in `src/utils/`. Context definitions must never live in `src/utils/` or `src/hooks/`.

## Code standards

### TypeScript

- Strict mode including `exactOptionalPropertyTypes` and `noUncheckedIndexedAccess`
- Always use type imports: `import type { Foo } from './Foo'`
- React 19 ref-as-prop: every DOM-rendering component accepts `ref?: React.Ref<ElementType> | undefined` in its props interface and destructures `ref` in the function signature. No component uses `React.forwardRef`.
- Export `ComponentProps` types alongside every component
- Export `ComponentVariantProps` types alongside every component that has a `.variants.ts` file

### Testing

- `globals: false`: import `describe`, `it`, `expect` explicitly from `vitest`
- Always use `getByRole` with `{ name: '...' }`: never bare `getByRole('button')`
- Test behavior, not implementation. Assert class names only when testing the variant system.
- Cleanup is handled automatically via `afterEach` in `src/test-setup.ts`

### Accessibility

WCAG 2.2 AA is a hard requirement. Minimum contrast ratios:

- 4.5:1 for normal text
- 3:1 for large text and UI components

Verify contrast for every new color token before adding it.

Interactive primitives must present a 24x24 CSS px touch target at every size variant per WCAG 2.5.8. Enforced by `tests/a11y/touch-targets.test.tsx` and the `nuka/no-sub-touch-target-sizes` ESLint rule. See `docs/ACCESSIBILITY.md`.

### Storybook

- Stories are co-located with components
- Every component needs: one story per variant, one per intent, an `AllVariants` render story, and at least one real-world pattern story
- `asChild` always gets `control: false` in `argTypes`

## Key decisions

Full reasoning is in `docs/DECISIONS.md`. Summary:

- **variant + intent over flat variants**: avoids combinatorial explosion, cleaner consumer API
- **Two-layer tokens**: primitives for scale, semantic for meaning, components only reference semantic
- **`data-theme` attribute**: enables nested themes, no class pollution
- **No component-level tokens by default**: added per component only when semantic tokens are insufficient
- **No relative imports**: `@nuka/*` alias everywhere for consistency and refactor safety
- **Per-component variants files**: CVA definitions are never inlined in the component file; they live in `<n>.variants.ts` to keep component files focused on rendering logic
- **Hooks in src/hooks/, not src/utils/**: hooks have lifecycle semantics distinct from pure utilities; mixing them obscures what each file is
- **Context co-location**: component-local context lives in `<n>.context.tsx`; shared infrastructure context lives in `src/context/`

## Component inventory

The full component scope, build order, and per-component status is tracked in `docs/COMPONENTS.md`. Update the status column there when components are completed.
