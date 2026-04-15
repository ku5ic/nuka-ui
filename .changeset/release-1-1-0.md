---
"@nuka-ui/core": minor
---

### React Server Components compatibility

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
