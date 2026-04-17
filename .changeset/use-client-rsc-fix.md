---
"@nuka-ui/core": patch
---

Fix Next.js App Router regression introduced in 1.1.2.

Consumers rendering `<BreadcrumbLink asChild><Link /></BreadcrumbLink>` (or
any other nuka-ui component that accepts a `ref` or `asChild`) from a Server
Component were getting "Refs cannot be used in Server Components, nor passed
to Client Components." This release adds `"use client";` to every component
source file that accepts `ref`, accepts `asChild`, uses `Slot` or
`composeRefs`, imports from `@nuka/hooks/*`, imports from
`@floating-ui/react`, or calls a React hook.

The 1.1.0 release notes describing certain components as "server-safe"
(Stack, Grid, Container, Heading, Text, Nav, and others) overstated what
was guaranteed. Those components are server-safe in the sense that their
purely structural rendering can run on the server, but in practice
consumers attach refs or pass Client Component children to almost any
component, which crosses the RSC boundary. Every nuka-ui component now
carries `"use client";` where ref or asChild behavior makes that boundary
crossing possible, so no consumer needs to add their own client wrapper to
opt in.

To prevent this regression from recurring, the repo now ships a custom
ESLint rule, `nuka/require-use-client`, that enforces the directive on
every component source whose props or imports require it. The rule runs at
`error` severity in CI and in editor.

A new build-output test suite (`npm run test:dist`) runs against the built
`dist/` after every CI build. It derives the expected directive list from
`src/**/*.tsx` line 1 at test time and asserts that every directive
survives Vite's ESM and CJS output. A Vite or Rollup regression that
strips directives would pass lint but fail this suite.

Pagination accessibility fixes:

- `PaginationPrevious` and `PaginationNext` no longer render a
  `<span role="link">` with `aria-disabled` inside Button styling when
  disabled. The disabled state now renders a native `<button disabled>`,
  which assistive tech announces correctly and which the synthetic event
  system blocks from invoking handlers.
- `aria-label` on `PaginationPrevious` and `PaginationNext` is now
  overridable via prop. The previous behavior hardcoded the label and
  silently dropped any consumer override.
- `PaginationPrevious` and `PaginationNext` now document the
  `asChild` icon-injection constraint in JSDoc on the prop.

Other fixes:

- `BreadcrumbSeparator` class string had a missing close paren on
  `text-(--nuka-text-subtle`, which silently produced no color. Fixed.
