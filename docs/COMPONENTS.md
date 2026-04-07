# Component Inventory

This document defines the full component scope for nuka-ui.

---

## Actions

| Component | Status | Notes                                                           |
| --------- | ------ | --------------------------------------------------------------- |
| `Button`  | Done   | Actions and form submissions. 5 variants x 4 intents x 3 sizes. |

---

## Typography

| Component | Status | Notes                                               |
| --------- | ------ | --------------------------------------------------- |
| `Heading` | Done   | `h1`-`h6` via `as` prop. Semantic size scale.       |
| `Text`    | Done   | Typography component. size, weight, color variants. |
| `Code`    | Done   | Inline code. Monospace, subtle background.          |
| `Kbd`     | Done   | Keyboard shortcut display.                          |

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

---

## Layout

| Component   | Status | Notes                                                   |
| ----------- | ------ | ------------------------------------------------------- |
| `Stack`     | Done   | Flex container. `direction`, `gap`, `align`, `justify`. |
| `Grid`      | Done   | Grid container. `cols`, `gap`.                          |
| `Container` | Done   | Max-width centered wrapper. `size` variants.            |

---

## Navigation (planned)

| Component          | Status | Notes                                                                                 |
| ------------------ | ------ | ------------------------------------------------------------------------------------- |
| `Card`             | Done   | Surface container. Header/body/footer slots.                                          |
| `Collapsible`      | Done   | Generic expand/collapse primitive. Base for `Accordion`.                              |
| `Accordion`        | Done   | Expand/collapse group with keyboard navigation. Builds on `Collapsible`.              |
| `Tabs`             | -      | Tab group with keyboard navigation.                                                   |
| `Dialog` / `Modal` | -      | Modal dialog with focus trapping.                                                     |
| `Sheet`            | -      | Slide-in panel. Dialog variant.                                                       |
| `DropdownMenu`     | -      | Dropdown with keyboard navigation.                                                    |
| `ContextMenu`      | -      | Right-click menu. Shares keyboard nav logic with `DropdownMenu`.                      |
| `Menubar`          | -      | Horizontal application menu. Composes `DropdownMenu`. Complex keyboard nav.           |
| `NavigationMenu`   | -      | Site-level navigation with submenus.                                                  |
| `Breadcrumb`       | -      | Navigation trail.                                                                     |
| `Pagination`       | -      | Page navigation.                                                                      |
| `Stepper`          | -      | Multi-step flow indicator. No Radix primitive, fully custom.                          |
| `Sidebar`          | -      | App navigation panel. Collapsible. Sheet-based drawer on mobile. Needs `Sheet` first. |

---

## Composites (planned)

| Component     | Status | Notes                                                                                |
| ------------- | ------ | ------------------------------------------------------------------------------------ |
| `AppShell`    | -      | Top-level layout: sidebar + header + main. Composes `Sidebar`, `Stack`, `Container`. |
| `Table`       | -      | Sortable, accessible. `thead`/`tbody`/`tfoot`.                                       |
| `DataTable`   | -      | Table + pagination + filtering.                                                      |
| `CommandMenu` | -      | Keyboard-first search/action palette.                                                |
| `DatePicker`  | -      | Popover + calendar.                                                                  |
| `Combobox`    | -      | Custom searchable select.                                                            |

---

## Rules for every component

- WCAG 2.2 AA: hard requirement, verified at token and component level
- `React.forwardRef`: mandatory on all DOM-rendering components
- `variant` + `intent`: applied where the component carries semantic meaning
- `asChild`: included where polymorphism is genuinely useful
- Full test coverage: rendering, variants, intent, attributes, ref, asChild
- Storybook stories: one per variant, one per intent, AllVariants, AllSizes, at least one pattern story
- TypeScript strict: no `any`, no suppressed errors

---

## Internal Utilities

Not exported from the public package. Shared implementation primitives used by components.

| Utility                | Location                              | Used by                                                    |
| ---------------------- | ------------------------------------- | ---------------------------------------------------------- |
| `useControllableState` | `src/utils/use-controllable-state.ts` | Switch, Slider, RadioGroup, Tooltip, Popover, Select       |
| `useFormFieldProps`    | `src/utils/use-form-field-props.ts`   | Input, Textarea, Slider, Switch, RadioGroup, SelectTrigger |
| `DismissButton`        | `src/utils/dismiss-button.tsx`        | Alert, Banner, Tag, Toast                                  |
| `Portal`               | `src/utils/portal.tsx`                | Tooltip, Popover                                           |
| `Slot`, `composeRefs`  | `src/utils/slot.tsx`                  | Button, Badge, and all asChild components                  |
| `cn`                   | `src/utils/cn.ts`                     | All components                                             |
| `navigateItems`        | `src/utils/navigate-items.ts`         | Planned: DropdownMenu, ContextMenu, Menubar                |
