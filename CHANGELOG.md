# Changelog

## 1.1.4

### Patch Changes

- 1e74c5b: Base: origin/main
  Range: main..release/1_1_4 (40 commits)
  - **Data-slot attribute system**: All components now emit `data-slot` attributes for targeted styling. Enables consumers to style component subparts without classname dependencies. Comprehensive coverage across form inputs, navigation, tables, modals, popovers, tooltips, menus, combobox, select, and all compound sub-components.
  - **Callout component**: New editorial component for emphasis and quotations.
  - **Expanded typography weight scale**: Text, Heading, Eyebrow, and Label now expose all nine weight values from the token system, enabling fine-grained typographic control.
  - **Color scale expansion**: Text and Eyebrow support the full semantic color palette (previously restricted subsets).
  - **Polymorphic layout elements**: Container, Grid, and Stack now accept `as` prop for HTML element substitution.
  - **Button fullWidth prop**: Explicit full-width layout control.
  - **CardBody padding prop**: Direct padding configuration.
  - **AspectRatio 4:5 ratio**: Portrait aspect ratio variant.
  - **TimelineItem titleAs prop**: Override default heading element.
  - **Data-surface cascade**: New theming primitive for nested surface styling and focus ring context.
  - **Tabbable focus management**: Added tabbable library dependency for robust keyboard navigation support.
  - **Touch-target validation ESLint rule**: Automated enforcement of WCAG 2.5.8 24x24px minimum touch targets via `no-sub-touch-target-sizes` rule.
  - **Responsive safelist generation**: Tailwind safelist auto-generation for complete responsive class coverage.
  - EmptyState and Card now forward weight prop to their typography sub-components, enabling cascading weight changes.
  - Font-weight Tailwind literals throughout the codebase replaced with tokenized CSS variables for consistency and maintainability.
  - Heading font-weight rendering now correctly applies under default serif family.
  - Switch size scale rebalanced to meet WCAG 2.5.8 touch target requirements and improve visual differentiation.
  - RadioGroup story names now scoped per instance to prevent collisions in documentation.
  - Contract tests added for data-slot attribute behavior (ADR-054).
  - Touch-target regression tests for WCAG 2.5.8 compliance.
  - Responsive safelist selector escaping improved for special characters.
  - Removed legacy Claude command markdowns from repository.
  - Typography documentation updated for Eyebrow color scale and Heading family rendering.

## 1.1.3

### Patch Changes

- 399bf74: ## Fixed

  ### React Server Components regression (Next.js App Router)

  1.1.2 shipped a partial-coverage `"use client";` policy: only components that called React hooks carried the directive. Components that used only refs, `Slot`, or `asChild` were treated as server-safe. In practice this broke under any consumer pattern that attached a ref from a Server Component, including `<BreadcrumbLink asChild><Link /></BreadcrumbLink>`, `react-hook-form`'s `register()`, and most animation library ref props. The error was "Refs cannot be used in Server Components, nor passed to Client Components."

  Every public component now ships with `"use client";` on line 1 of its compiled output. Consumers can import any component from a Server Component page or layout without adding their own client wrapper. See ADR-048 in `docs/DECISIONS.md` for the full reasoning.

  SEO is unaffected. Client Components are server-rendered to HTML on the initial response; the directive controls where hydration code ships, not where rendering happens.

  ### Pagination accessibility
  - `PaginationPrevious` and `PaginationNext` in their disabled state previously rendered a `<span role="link" aria-disabled="true">`. Assistive technology announces this inconsistently and the click handler had to be blocked in JavaScript. The disabled state now renders a native `<button disabled>`, which every assistive tech announces correctly and which the browser's synthetic event system blocks from dispatching click events.
  - `aria-label` on `PaginationPrevious` and `PaginationNext` is now overridable via prop. Previously the component hardcoded "Go to previous page" / "Go to next page" and silently dropped any consumer-provided value.
  - Both components now document the `asChild` icon-injection constraint in JSDoc. When `asChild` is true, the component clones the consumer's child element and injects the built-in chevron icon plus the text label; rich JSX children are replaced by the label fallback. Consumers needing custom icon or label arrangements should use `PaginationLink` directly.

  ### BreadcrumbSeparator color

  The class string on `BreadcrumbSeparator` had a missing close paren: `text-(--nuka-text-subtle` instead of `text-(--nuka-text-subtle)`. Tailwind silently produced no color rule. Fixed.

  ### Missing `--nuka-info-fg` token in root stylesheet

  `@nuka-ui/core/styles/root` (the light-only stylesheet) was missing `--nuka-info-fg`, which is referenced by any filled info surface and documented as a contrast-verified token in `docs/THEMING.md`. Consumers on the root-only export had components falling back to the CSS default on filled info surfaces. Added to `src/styles/root.css` with the same value used in the light theme of `tokens.css` (`var(--color-neutral-0)`, 4.69:1 AA on `--nuka-info-base`).

  ## Added

  ### `nuka/require-use-client` ESLint rule

  A custom ESLint plugin at `tools/eslint-plugin-nuka/` ships with the repo. The `nuka/require-use-client` rule flags any component source that requires the directive but omits it, and flags any source that includes the directive without needing it. Triggers: `ref` prop on a Props interface, `asChild` prop, destructured `ref` in a function parameter with JSX output, `Slot` or `composeRefs` import from `@nuka/utils/slot`, any `@nuka/hooks/*` import, `@floating-ui/react` import, calls to named React hooks, and calls to any identifier matching `/^use[A-Z]/`. Runs at `error` severity in CI and in editor.

  ### `npm run test:dist` build-output test suite

  A new test suite at `tests/dist/` runs against the built `dist/` after every build. It derives the expected `"use client";` directive list from `src/**/*.tsx` line 1 at test time, and asserts every directive survives Vite's ESM and CJS output. Also validates that every name exported from `src/index.ts` is present in both `dist/index.js` and `dist/index.cjs`, that `dist/index.d.ts` exists, and that every path in the package.json `exports` map resolves to an existing file. A Vite or Rollup regression that strips directives or drops exports passes lint but fails this suite.

  The suite has its own Vitest config (`vitest.dist.config.ts`, node environment) and a `pretest:dist` hook that runs `npm run build` automatically, so `npm run test:dist` always executes against a fresh build.

  ### `docs/DECISIONS.md` ADR-048

  Records the new policy: every component that accepts a ref, uses Slot, accepts asChild, or calls a hook must carry `"use client";`. Rule-enforced, not convention-enforced. ADR-045 retains its original text and gains an amendment block pointing to ADR-048.

  ### Sponsorship

  `SPONSORS.md` and `.github/FUNDING.yml` added. A sponsorship line is appended to the top of `README.md`.

  ## Changed

  ### Scripts reorganized

  `package.json` scripts are grouped by concern (build, quality, tests, release). Two behavior-affecting changes:
  - **`build-storybook` renamed to `build:storybook`.** If you have local automation, shell aliases, or CI workflows in a fork that invoke `npm run build-storybook`, update them.
  - **`test:dist` has a `pretest:dist` hook that runs `npm run build`.** `test:dist` always executes against a fresh build; you no longer need a separate manual build step.

  New scripts: `test:eslint-plugin` (runs the plugin's unit tests via `node --test`), `test:dist`, `test:all` (runs unit tests, plugin tests, and dist tests in sequence).

  ### CI workflows

  `.github/workflows/ci.yml` now runs `test:eslint-plugin` and `test:dist` (via its `pretest:dist` hook) in place of the standalone `build` step. `.github/workflows/release.yml` adds the same two steps before the final build. `.github/workflows/cd.yml` updates the storybook build step to `build:storybook`.

  ### Documentation reconciliation
  - `README.md`: the "RSC compatibility" section and its server-safe/client-required component lists are gone. Replaced with a short "React Server Components (Next.js App Router)" section stating the fully-client policy and the SEO reasoning.
  - `docs/CUSTOMIZATION.md`: nine code examples previously used `import ... from "nuka-ui"` (the package is `@nuka-ui/core`). Fixed. The `cn` import in the GradientButton example previously used a `"your-utils"` placeholder; it now imports from `@nuka-ui/core`. The Limitations section now lists `fg` alongside `base, bg, text, border` in the `--nuka-info-*` token group.
  - `docs/THEMING.md`: `--nuka-info-fg` rows added to both light and dark theme contrast tables. Light: 4.69:1 AA, white on filled info surface. Dark: marked "not verified" pending measurement.
  - `docs/COMPONENTS.md`: the Dialog row no longer lists `Modal` as an alternate name. There has never been a `Modal` export.

  ## Internal
  - `tsconfig.json` includes `vitest.dist.config.ts` and the `tests/` directory.
  - `vitest.config.ts` explicitly excludes `tests/**` so unit tests do not pick up build-output tests.
  - `eslint.config.ts` registers the `nuka` plugin and applies `nuka/require-use-client` to `src/components/**/*.tsx` and `src/utils/**/*.tsx`. The `tools/` directory is added to the ignore list.
  - `.gitignore`: the `dist` entry is now anchored to the repo root (`/dist`) so the `tools/eslint-plugin-nuka/` working tree is not accidentally excluded by the generic pattern.

## 1.1.2

### Patch Changes

- e90ea11: All DOM-rendering components migrated from `React.forwardRef` to the React 19 ref-as-prop pattern. Refs are accepted as typed props on each component's `Props` interface.

  Call sites are unchanged: `<Button ref={myRef} />` works exactly as before. No runtime behavior changes.

  Consumers extracting component ref types via React type utilities (for example `React.ElementRef`) should verify their usage against React 19 documentation.

  Menu items now apply a hover background color in addition to the existing focus styles, for both `default` and `danger` intents.
  - `useScrollLock`: internal state is lazily initialized and module-scoped, improving isolation across mount/unmount cycles and making the hook safe under SSR.
  - `Slot`: now preserves the child element's `key` when cloning, and uses `React.createElement` instead of `React.cloneElement` to avoid edge cases where props were lost.
  - Option registry logic extracted from `Select` and `Combobox` into a shared `useOptionRegistry` hook.
  - Keyboard roving-focus logic extracted into a pure `getRovingIndex` helper, now shared across Accordion, RadioGroup, Tabs, Select, Combobox, and CommandMenu.
  - `vite.config.ts`: ESM and CJS rollup output options deduplicated via a shared config object.
  - README, `docs/COMPONENTS.md`, and `docs/DECISIONS.md` updated to reflect the ref-as-prop pattern and the new shared utilities.
  - `CLAUDE.md` and the `.claude/` commands and skills updated to match.

## 1.1.1

### Patch Changes

- d3776bd: ### Stylesheet exports

  nuka-ui now ships three stylesheet exports:
  - `@nuka-ui/core/styles`: fully precompiled CSS. Works in any project regardless of styling approach. No Tailwind required.
  - `@nuka-ui/core/styles/root`: precompiled, light theme only. Tokens scoped to `:root`, no `[data-theme]` selectors.
  - `@nuka-ui/core/styles/tailwind`: `@source` directives for Tailwind v4 projects. Import alongside the precompiled stylesheet to register nuka-ui components with your Tailwind build.
    Tailwind v4 setup:

  ```css
  @import "@nuka-ui/core/styles";
  @import "@nuka-ui/core/styles/tailwind";
  @import "tailwindcss";
  ```

## 1.1.0

### Minor Changes

- 9305d58: ### React Server Components compatibility

  Server-safe components (`Stack`, `Grid`, `Container`, `Heading`, `Text`, `Nav`, and others) now render on the server in Next.js App Router without requiring `"use client"` on the consuming file. Interactive components carry their own `"use client"` boundary in the compiled output. Vite SPA consumers are unaffected.

  ### New components
  - **Eyebrow**: Uppercase label text for hierarchical content emphasis. Color variants: base, muted, accent.
  - **VisuallyHidden**: Screen-reader-only text wrapper. Polymorphic `as` prop for headings and structural elements.
  - **Section**: Semantic section with `spacing`, `background`, and `divider` variants. Polymorphic `as` prop.
  - **SplitLayout**: Two-column grid layout with configurable sidebar width and responsive stacking.
  - **ScrollArea**: Custom scrollbar container with `orientation`, `maxHeight`, and `maxWidth` props. CSS-only scrollbar styling via `--nuka-scroll-thumb` and `--nuka-scroll-track` tokens.
  - **NumberInput**: Number input with increment/decrement controls, min/max clamping, customizable button labels, and FormField integration.
  - **FileInput**: Drag-and-drop file upload zone with file list, file size display, dismissible file entries, and FormField integration.
  - **Nav**: Horizontal navigation with CSS-driven submenu support. Compound API: Nav, NavList, NavItem, NavLink, NavTrigger, NavSubmenu.
  - **Chip**: Toggle/filter pill with `selected` state via `aria-pressed`. Variants: solid, subtle, outline.
  - **SkipLink**: Skip-to-content accessibility link. Visible on focus, hidden otherwise. Configurable `targetId`.

  ### Responsive props

  Layout components (`Stack.direction`, `Stack.gap`, `Stack.align`, `Stack.justify`, `Stack.wrap`, `Grid.cols`, `Grid.gap`, `Grid.colGap`, `Grid.rowGap`, `SplitLayout.gap`), typography components (`Heading.size`, `Text.size`, `Text.align`), and display components (`Divider.orientation`, `AspectRatio.ratio`) now accept `Responsive<T>` for per-breakpoint control. Scalar usage is unchanged.

  ### Font family tokens

  Four semantic tokens added: `--nuka-font-heading`, `--nuka-font-body`, `--nuka-font-ui`, `--nuka-font-code`. A `family` prop is available on `Heading`, `Text`, `Code`, and `Kbd`.

  ### NavigationMenu

  Sub-panel content now renders inline in the DOM by default, making navigation links visible to crawlers and SSR. The `portal` prop opts into the previous portal behavior for application contexts that need z-index escape.

  ### Bug fixes
  - **RadioGroup**: `defaultValue` no longer prevents the group from being reachable by Tab. All radios stayed at `tabIndex=-1` when a default value was set.
  - **Combobox**: `aria-expanded` was hardcoded to `true`. It now reflects the actual open state.
  - **CommandMenu**: Added `role="dialog"`, `aria-modal`, and an accessible label. Screen readers now correctly announce the palette as a modal.
  - **Escape key**: Removed `stopPropagation` from the escape key handler. Nested modals can now close top-down with a single Escape press.
  - **NumberInput**: Clearing the input no longer leaves display and state out of sync. The displayed value updates immediately; the committed value clamps on blur.
  - **DatePicker**: Dates with non-zero time components no longer produce off-by-one results when compared against `min` and `max` boundaries.
  - **Menu typeahead**: The typeahead character buffer is now cleared when a menu closes. Reopening no longer carries stale characters from the previous session.
  - **Accordion**: Removed `undefined as unknown as string` cast in single-mode collapsible state. The value type is now correctly `string | undefined`.
  - **Accordion**: Disabled triggers now render `aria-disabled` alongside the native `disabled` attribute.
  - **ContextMenu**: `ContextMenuTrigger` now renders `aria-haspopup="menu"` and `aria-expanded` to match the ARIA pattern used by `DropdownMenu` and `Menubar`.
  - **Menu navigation**: Disabled items marked with `aria-disabled="true"` are no longer reachable via arrow key navigation.

  ### New tokens
  - `--nuka-scroll-thumb` and `--nuka-scroll-track` for scrollbar theming (light and dark)
  - `--space-24` and `--space-32` spacing primitives
  - `--font-family-sans`, `--font-family-serif`, `--font-family-mono` font family primitives

  ### Documentation
  - ADR-036 through ADR-047 documenting all architectural decisions for 1.1.0
  - Updated COMPONENTS.md, README.md, and CUSTOMIZATION.md with all new components including Chip and SkipLink
  - RSC compatibility section in README listing server-safe vs client-required components
  - Typography, layout, forms, navigation, and accessibility usage examples in README
  - Typography font family tokens and responsive props sections in customization guide

## 1.0.3

### Patch Changes

- f61e67d: Fix distributed stylesheets to restore dev and production compatibility

## 1.0.2

### Patch Changes

- fa4dde5: Pre-compile Tailwind utilities into dist/styles.css so consumers do not need to configure Tailwind to scan node_modules

## 1.0.1

### Patch Changes

- 5aea5dc: Fix declaration files leaking internal @nuka path aliases, breaking TypeScript in consumer projects

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-04-12

### Added

- 35+ accessible React components built on Tailwind v4
- Two-layer CSS custom property token system (primitives + semantic tokens)
- variant + intent API for composable visual styling across all components
- WCAG 2.2 AA compliance with verified contrast ratios at the token level
- Light and dark theme support via `data-theme` attribute
- Polymorphic rendering via `asChild` prop
- First-party Slot, composeRefs, focus trap, scroll lock, and portal utilities
- Floating UI integration for positioned components (Tooltip, Popover, DropdownMenu, ContextMenu, Menubar, NavigationMenu)
- Compound component pattern throughout: Select, Tabs, Dialog, Sheet, Accordion, Collapsible, Toast, Sidebar, and more
- Custom `useControllableState`, `useFormFieldProps`, `useMenuNavigation`, and `useFocusTrap` hooks
- Storybook documentation with per-variant, per-intent, and real-world pattern stories
- GitHub Actions CI pipeline: typecheck, lint, format check, test, build
- Changesets-based release workflow
