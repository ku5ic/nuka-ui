---
"@nuka-ui/core": minor
---

### New components

- **Eyebrow**: Uppercase label text for hierarchical content emphasis. Color variants: base, muted, accent.
- **VisuallyHidden**: Screen-reader-only text wrapper. Polymorphic `as` prop for headings and structural elements.
- **Section**: Semantic section with `spacing`, `background`, and `divider` variants. Polymorphic `as` prop.
- **SplitLayout**: Two-column grid layout with configurable sidebar width and responsive stacking.
- **ScrollArea**: Custom scrollbar container with `orientation`, `maxHeight`, and `maxWidth` props. CSS-only scrollbar styling via `--nuka-scroll-thumb` and `--nuka-scroll-track` tokens.
- **NumberInput**: Number input with increment/decrement controls, min/max clamping, customizable button labels, and FormField integration.
- **FileInput**: Drag-and-drop file upload zone with file list, file size display, dismissible file entries, and FormField integration.
- **Nav**: Horizontal navigation with CSS-driven submenu support. Compound API: Nav, NavList, NavItem, NavLink, NavTrigger, NavSubmenu.

### New tokens

- `--nuka-scroll-thumb` and `--nuka-scroll-track` for scrollbar theming (light and dark)

### Documentation

- ADR-036 through ADR-047 documenting all architectural decisions for 1.1.0
- Updated COMPONENTS.md, README.md, and customization.md with all new components
- RSC compatibility section in README listing server-safe vs client-required components
- Typography, layout, forms, navigation, and accessibility usage examples in README
- Typography font family tokens and responsive props sections in customization guide
