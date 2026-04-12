# Changelog

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
