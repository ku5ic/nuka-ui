---
"@nuka-ui/core": patch
---

Update tabbable to 6.5.0, which nuka-ui's focus trap (`use-focus-trap`) relies on for tabbable/focusable element detection. This adds support for `<area href>` image map hotspots and fixes `visibility: collapse` elements being incorrectly treated as focusable, both used by Dialog, Sheet, and other focus-trapping components. Also updates dev dependencies (storybook, tailwindcss, testing-library/vitest, eslint tooling, typescript-eslint, @types/node, @types/react, prettier) to their latest patch/minor versions. No public API changes.
