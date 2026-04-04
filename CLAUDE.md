# CLAUDE.md

Context and instructions for Claude Code when working in this repository.

## Project

vault-ui is a React component library built on Tailwind v4. It abstracts Tailwind utility classes behind a composable component API, customizable via CSS variables and props.

**Stack:** React 19, TypeScript 6 (strict), Tailwind v4, Radix UI, CVA, Storybook 10, Vitest 4, Testing Library  
**Package:** `vault-ui` on npm  
**Repo:** github.com/ku5ic/vault-ui

## Commands

```bash
npm run dev           # Storybook at localhost:6006
npm run test:watch    # Vitest in watch mode
npm run lint          # ESLint
npm run typecheck     # tsc --noEmit
npm run build         # Vite build + tsc declaration emit
```

## Architecture

### Path alias

`@vault/*` maps to `src/*`. Use it everywhere. No relative imports.

### Token system

Two-layer CSS custom property architecture:

- **Primitive tokens** — raw scale values, no prefix (`--color-accent-500`, `--space-4`)
- **Semantic tokens** — purpose-driven, `--vault-` prefixed, reference primitives (`--vault-accent-bg`)

Components reference only semantic tokens. Never use raw Tailwind color utilities — always `bg-[var(--vault-accent-bg)]`, never `bg-blue-500`.

Theming uses `data-theme` attribute, not classes. Token definitions live in `src/styles/tokens.css`.

### Component API pattern

Every component exposes two props for semantic styling:

- `variant` — visual weight: `primary`, `secondary`, `outline`, `ghost`, `link`
- `intent` — semantic color: `default`, `danger`, `success`, `warning`

All variant × intent combinations must be valid. CVA `compoundVariants` handles class composition. `src/components/Button/Button.tsx` is the reference implementation.

### CVA conventions

Defined in `src/utils/variants.ts`:

- `cva` instance named `<component>Variants` — e.g. `buttonVariants`
- Exported type named `<Component>VariantProps` — e.g. `ButtonVariantProps`
- Base classes in an array, one concern per string
- `intent` variant entries are empty strings — all color work lives in `compoundVariants`

### Component structure

Every component lives in `src/components/<Name>/`:

Name.tsx # Implementation
Name.test.tsx # Vitest + Testing Library
Name.stories.tsx # Storybook stories
index.ts # Public exports

Add exports to `src/index.ts` when adding a new component.

## Code standards

### TypeScript

- Strict mode including `exactOptionalPropertyTypes` and `noUncheckedIndexedAccess`
- Always use type imports: `import type { Foo } from './Foo'`
- `React.forwardRef` is mandatory on all components that render DOM elements
- Export `ComponentProps` and `ComponentVariantProps` types alongside every component

### Testing

- `globals: false` — import `describe`, `it`, `expect` explicitly from `vitest`
- Always use `getByRole` with `{ name: '...' }` — never bare `getByRole('button')`
- Test behavior, not implementation. Assert class names only when testing the variant system.
- Cleanup is handled automatically via `afterEach` in `src/test-setup.ts`

### Accessibility

WCAG 2.2 AA is a hard requirement. Minimum contrast ratios:

- 4.5:1 for normal text
- 3:1 for large text and UI components

Verify contrast for every new color token before adding it.

### Storybook

- Stories are co-located with components
- Every component needs: one story per variant, one per intent, an `AllVariants` render story, and at least one real-world pattern story
- `asChild` always gets `control: false` in `argTypes`

## Key decisions

Full reasoning is in `docs/DECISIONS.md`. Summary:

- **variant + intent over flat variants** — avoids combinatorial explosion, cleaner consumer API
- **Two-layer tokens** — primitives for scale, semantic for meaning, components only reference semantic
- **`data-theme` attribute** — enables nested themes, no class pollution
- **No component-level tokens by default** — added per component only when semantic tokens are insufficient
- **No relative imports** — `@vault/*` alias everywhere for consistency and refactor safety

## Component inventory

The full component scope, build order, and per-component status is tracked in `docs/COMPONENTS.md`. Update the status column there when components are completed.
