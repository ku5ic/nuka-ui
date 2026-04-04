# Component Inventory

This document defines the full component scope for vault-ui, organized by complexity tier and recommended build order.

---

## Tier 1 — Primitives

No Radix dependency. Pure HTML + CVA + tokens. Build these first.

| Component | Status  | Notes                                                           |
| --------- | ------- | --------------------------------------------------------------- |
| `Button`  | ✅ Done | Actions and form submissions. 5 variants × 4 intents × 3 sizes. |
| `Badge`   | ✅ Done | Inline label. variant + intent. No interactive states.          |
| `Tag`     | ✅ Done | Dismissible Badge variant. Adds close button.                   |
| `Text`    | ✅ Done | Typography component. size, weight, color variants.             |
| `Heading` | ✅ Done | `h1`–`h6` via `as` prop. Semantic size scale.                   |
| `Divider` | ✅ Done | Horizontal/vertical separator. Optional label.                  |
| `Spinner` | ✅ Done | Loading indicator. Size variants. Accessible.                   |
| `Avatar`  | ✅ Done | Image with fallback initials. Size variants.                    |
| `Icon`    | ✅ Done | Wrapper for icon libraries. Size + color tokens.                |
| `Kbd`     | ✅ Done | Keyboard shortcut display.                                      |
| `Code`    | ✅ Done | Inline code. Monospace, subtle background.                      |

---

## Tier 2 — Form primitives

All require `Label` association and correct ARIA. Build as a group.

| Component              | Status  | Notes                                                                  |
| ---------------------- | ------- | ---------------------------------------------------------------------- |
| `Label`                | ✅ Done | Associates with form controls. Required indicator.                     |
| `Input`                | ✅ Done | Text input. Intent for validation state. Size variants.                |
| `Textarea`             | ✅ Done | Multi-line input. Same API as Input.                                   |
| `Select`               | ✅ Done | Custom select with keyboard navigation. Styled to match Input.         |
| `Checkbox`             | ✅ Done | Custom checkbox. Intent for validation.                                |
| `Radio` / `RadioGroup` | ✅ Done | Custom radio group.                                                    |
| `Switch`               | ✅ Done | Custom toggle switch.                                                  |
| `Slider`               | ✅ Done | Custom range slider.                                                   |
| `FormField`            | ✅ Done | Layout wrapper — Label + control + error message. No styling opinions. |

---

## Tier 3 — Feedback & display

Mostly simple. High visual value for the showcase.

| Component           | Status  | Notes                                                  |
| ------------------- | ------- | ------------------------------------------------------ |
| `Alert`             | ✅ Done | Inline feedback. variant + intent. Dismissible option. |
| `Toast` / `Toaster` | —       | Custom toast with programmatic API.                    |
| `Progress`          | ✅ Done | Linear progress bar. Intent for status.                |
| `Skeleton`          | ✅ Done | Loading placeholder. Matches shapes of real content.   |
| `Tooltip`           | ✅ Done | Custom tooltip with positioning.                       |
| `Popover`           | ✅ Done | Custom popover with positioning.                       |

---

## Tier 4 — Layout & navigation

More complex. Composition patterns. Build after Tier 1–3 are solid.

| Component          | Status | Notes                                        |
| ------------------ | ------ | -------------------------------------------- |
| `Card`             | —      | Surface container. Header/body/footer slots. |
| `Tabs`             | —      | Custom tabs with keyboard navigation.        |
| `Accordion`        | —      | Custom accordion with keyboard navigation.   |
| `Dialog` / `Modal` | —      | Custom modal dialog with focus trapping.     |
| `Sheet`            | —      | Slide-in panel. Dialog variant.              |
| `DropdownMenu`     | —      | Custom dropdown with keyboard navigation.    |
| `NavigationMenu`   | —      | Custom navigation menu.                      |
| `Breadcrumb`       | —      | Navigation trail.                            |
| `Pagination`       | —      | Page navigation.                             |

---

## Tier 5 — Composites

Built from Tier 1–4 components. Highest complexity, highest value for the showcase.

| Component     | Status | Notes                                          |
| ------------- | ------ | ---------------------------------------------- |
| `Table`       | —      | Sortable, accessible. `thead`/`tbody`/`tfoot`. |
| `DataTable`   | —      | Table + pagination + filtering.                |
| `CommandMenu` | —      | Keyboard-first search/action palette.          |
| `DatePicker`  | —      | Popover + calendar.                            |
| `Combobox`    | —      | Custom searchable select.                      |

---

## Recommended build order

For the showcase goal — depth and quality over breadth.

**Phase 1** — proves the system works across component types:
`Badge`, `Text`, `Alert`, `Input`, `Label`, `FormField`

**Phase 2** — proves composability:
`Card`, `Dialog`, `Toast`, `Tooltip`, `Select`

**Phase 3** — proves scale:
`Table`, `Tabs`, `CommandMenu`

Tier 5 is optional. Two or three well-executed composites demonstrate more than a full list of shallow ones.

---

## Rules for every component

- WCAG 2.2 AA — hard requirement, verified at token and component level
- `React.forwardRef` — mandatory on all DOM-rendering components
- `variant` + `intent` — applied where the component carries semantic meaning
- `asChild` — included where polymorphism is genuinely useful
- Full test coverage — rendering, variants, intent, attributes, ref, asChild
- Storybook stories — one per variant, one per intent, AllVariants, AllSizes, at least one pattern story
- TypeScript strict — no `any`, no suppressed errors
