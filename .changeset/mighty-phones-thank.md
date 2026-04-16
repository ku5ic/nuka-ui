---
"@nuka-ui/core": patch
---

### Stylesheet exports

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
