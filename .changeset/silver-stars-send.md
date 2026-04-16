---
"@nuka-ui/core": patch
---

All DOM-rendering components migrated from `React.forwardRef` to the React 19 ref-as-prop pattern. Refs are accepted as typed props on each component's `Props` interface.

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
