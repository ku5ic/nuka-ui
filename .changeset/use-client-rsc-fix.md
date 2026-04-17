---
"@nuka-ui/core": patch
---

## Fixed

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
