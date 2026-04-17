# Component Inventory

This document defines the full component scope for nuka-ui.

---

## Actions

| Component | Status | Notes                                                           |
| --------- | ------ | --------------------------------------------------------------- |
| `Button`  | Done   | Actions and form submissions. 5 variants x 4 intents x 3 sizes. |
| `Chip`    | Done   | Toggle/filter pill. `selected` state with `aria-pressed`.       |

---

## Typography

| Component | Status | Notes                                                   |
| --------- | ------ | ------------------------------------------------------- |
| `Heading` | Done   | `h1`-`h6` via `as` prop. Semantic size scale.           |
| `Text`    | Done   | Typography component. size, weight, color variants.     |
| `Code`    | Done   | Inline code. Monospace, subtle background.              |
| `Kbd`     | Done   | Keyboard shortcut display.                              |
| `Eyebrow` | Done   | Uppercase label. `color` variants: base, muted, accent. |

---

## Forms

### Inputs

| Component              | Status | Notes                                                          |
| ---------------------- | ------ | -------------------------------------------------------------- |
| `Input`                | Done   | Text input. Intent for validation state. Size variants.        |
| `Textarea`             | Done   | Multi-line input. Same API as Input.                           |
| `Select`               | Done   | Custom select with keyboard navigation. Styled to match Input. |
| `Checkbox`             | Done   | Custom checkbox. Intent for validation.                        |
| `Radio` / `RadioGroup` | Done   | Custom radio group.                                            |
| `Switch`               | Done   | Custom toggle switch.                                          |
| `Slider`               | Done   | Custom range slider.                                           |
| `NumberInput`          | Done   | Number input with increment/decrement. Min/max clamping.       |
| `FileInput`            | Done   | Drag-and-drop file upload zone. File list with remove.         |

### Structure

| Component   | Status | Notes                                                                 |
| ----------- | ------ | --------------------------------------------------------------------- |
| `Label`     | Done   | Associates with form controls. Required indicator.                    |
| `FormField` | Done   | Layout wrapper: Label + control + error message. No styling opinions. |

---

## Feedback

| Component           | Status | Notes                                                               |
| ------------------- | ------ | ------------------------------------------------------------------- |
| `Alert`             | Done   | Inline feedback. variant + intent. Dismissible option.              |
| `Toast` / `Toaster` | Done   | Custom toast with programmatic API.                                 |
| `Banner`            | Done   | Full-width informational strip. Dismissible. Distinct from `Alert`. |
| `Progress`          | Done   | Linear progress bar. Intent for status.                             |
| `Skeleton`          | Done   | Loading placeholder. Matches shapes of real content.                |
| `Spinner`           | Done   | Loading indicator. Size variants. Accessible.                       |
| `Tooltip`           | Done   | Custom tooltip with positioning.                                    |
| `Popover`           | Done   | Custom popover with positioning.                                    |

---

## Display

| Component    | Status | Notes                                                         |
| ------------ | ------ | ------------------------------------------------------------- |
| `Badge`      | Done   | Inline label. variant + intent. No interactive states.        |
| `Tag`        | Done   | Dismissible Badge variant. Adds close button.                 |
| `Avatar`     | Done   | Image with fallback initials. Size variants.                  |
| `Icon`       | Done   | Wrapper for icon libraries. Size + color tokens.              |
| `Divider`    | Done   | Horizontal/vertical separator. Optional label.                |
| `EmptyState` | Done   | Blank slate. Illustration slot, heading, description, action. |
| `Timeline`   | Done   | Vertical event sequence. Display-only.                        |
| `ScrollArea` | Done   | Custom scrollbar container. Orientation, maxHeight/maxWidth.  |

---

## Layout

| Component     | Status | Notes                                                        |
| ------------- | ------ | ------------------------------------------------------------ |
| `Stack`       | Done   | Flex container. `direction`, `gap`, `align`, `justify`.      |
| `Grid`        | Done   | Grid container. `cols`, `gap`.                               |
| `Container`   | Done   | Max-width centered wrapper. `size` variants.                 |
| `AspectRatio` | Done   | Fixed aspect ratio wrapper. Named and numeric ratios.        |
| `Section`     | Done   | Semantic section with spacing, background, divider variants. |
| `SplitLayout` | Done   | Two-column grid. Sidebar width, responsive stacking.         |

---

## Accessibility Utilities

| Component        | Status | Notes                                                     |
| ---------------- | ------ | --------------------------------------------------------- |
| `VisuallyHidden` | Done   | Screen-reader-only text. Polymorphic `as` prop.           |
| `SkipLink`       | Done   | Skip-to-content link. Visible on focus, hidden otherwise. |

---

## Navigation

| Component        | Status | Notes                                                                                 |
| ---------------- | ------ | ------------------------------------------------------------------------------------- |
| `Card`           | Done   | Surface container. Header/body/footer slots.                                          |
| `Collapsible`    | Done   | Generic expand/collapse primitive. Base for `Accordion`.                              |
| `Accordion`      | Done   | Expand/collapse group with keyboard navigation. Builds on `Collapsible`.              |
| `Tabs`           | Done   | Tab group with keyboard navigation.                                                   |
| `Dialog`         | Done   | Modal dialog with focus trapping.                                                     |
| `Sheet`          | Done   | Slide-in panel. Dialog variant.                                                       |
| `DropdownMenu`   | Done   | Dropdown with keyboard navigation.                                                    |
| `ContextMenu`    | Done   | Right-click menu. Shares keyboard nav logic with `DropdownMenu`.                      |
| `Menubar`        | Done   | Horizontal application menu. Composes `DropdownMenu`. Complex keyboard nav.           |
| `NavigationMenu` | Done   | Site-level navigation with floating sub-panels. `role="dialog"` on content.           |
| `Breadcrumb`     | Done   | Navigation trail. `<nav><ol>` with `aria-current="page"`.                             |
| `Pagination`     | Done   | Page navigation. Compound API with links. Uses `Button` with `asChild`.               |
| `Stepper`        | Done   | Multi-step flow indicator. No Radix primitive, fully custom.                          |
| `Sidebar`        | Done   | App navigation panel. Collapsible. Sheet-based drawer on mobile. Needs `Sheet` first. |
| `Nav`            | Done   | Horizontal nav with submenu support. CSS hover/focus-within.                          |

---

## Composites

| Component     | Status | Notes                                                                                |
| ------------- | ------ | ------------------------------------------------------------------------------------ |
| `AppShell`    | Done   | Top-level layout: sidebar + header + main. Composes `Sidebar`, `Stack`, `Container`. |
| `Table`       | Done   | Sortable, accessible. `thead`/`tbody`/`tfoot`.                                       |
| `DataTable`   | Done   | Table + pagination + filtering.                                                      |
| `CommandMenu` | Done   | Keyboard-first search/action palette.                                                |
| `DatePicker`  | Done   | Popover + calendar.                                                                  |
| `Combobox`    | Done   | Custom searchable select.                                                            |

---

## Rules for every component

- WCAG 2.2 AA: hard requirement, verified at token and component level
- React 19 ref-as-prop: `ref` accepted as a typed prop, no `React.forwardRef`
- `variant` + `intent`: applied where the component carries semantic meaning
- `asChild`: included where polymorphism is genuinely useful
- Full test coverage: rendering, variants, intent, attributes, ref, asChild
- Storybook stories: one per variant, one per intent, AllVariants, AllSizes, at least one pattern story
- TypeScript strict: no `any`, no suppressed errors

---

## Internal Utilities

Shared implementation primitives used by components. Most are internal; `cn` and the `Responsive`, `Breakpoint`, and `GapScale` types are part of the public API.

| Utility                                         | Location                                   | Used by                                                                                                                                         |
| ----------------------------------------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `useControllableState`                          | `src/hooks/use-controllable-state.ts`      | Switch, Slider, RadioGroup, Tooltip, Popover, Select, Tabs, Accordion, Collapsible, DropdownMenu, Sidebar, Dialog, Sheet, NumberInput, Combobox |
| `useFormFieldProps`                             | `src/hooks/use-form-field-props.ts`        | Input, Textarea, Slider, Switch, RadioGroup, SelectTrigger, NumberInput, FileInput                                                              |
| `DismissButton`                                 | `src/utils/dismiss-button.tsx`             | Alert, Banner, Tag, Toast, FileInput                                                                                                            |
| `Portal`                                        | `src/utils/portal.tsx`                     | Tooltip, Popover, DropdownMenu, ContextMenu, NavigationMenu, Menubar, Dialog, Sheet, Toaster                                                    |
| `Slot`, `composeRefs`                           | `src/utils/slot.tsx`                       | Button, Badge, and all asChild components                                                                                                       |
| `cn`                                            | `src/utils/cn.ts`                          | All components                                                                                                                                  |
| `useFocusTrap`                                  | `src/hooks/use-focus-trap.ts`              | Dialog, Sheet                                                                                                                                   |
| `useScrollLock`                                 | `src/hooks/use-scroll-lock.ts`             | Dialog, Sheet                                                                                                                                   |
| `useMenuNavigation`                             | `src/hooks/use-menu-navigation.ts`         | DropdownMenu, ContextMenu, Menubar                                                                                                              |
| `createModalPrimitive`                          | `src/utils/modal-primitive.tsx`            | Dialog, Sheet                                                                                                                                   |
| `Responsive`, `resolveResponsiveClasses`        | `src/utils/responsive.ts`                  | Stack, Grid, SplitLayout, Heading, Text, AspectRatio, Divider                                                                                   |
| `useMediaQuery`                                 | `src/hooks/use-media-query.ts`             | Sidebar                                                                                                                                         |
| `useFocusFirstInteractive`                      | `src/hooks/use-focus-first-interactive.ts` | Popover, NavigationMenu                                                                                                                         |
| `useEscapeKey`                                  | `src/hooks/use-escape-key.ts`              | CommandMenu, Dialog, Sheet                                                                                                                      |
| `useOptionRegistry`                             | `src/hooks/use-option-registry.ts`         | Select, Combobox                                                                                                                                |
| `getRovingIndex`                                | `src/utils/roving-index.ts`                | RadioGroup, Tabs, Accordion, Select, Combobox, CommandMenu                                                                                      |
| `cva`, `VariantProps`, `intentCompoundVariants` | `src/utils/variants.ts`                    | All components with variant/intent                                                                                                              |
