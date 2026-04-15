# nuka-ui

A production-grade React component library built on Tailwind v4. Composable, accessible, and designed from the ground up with the kind of API and architectural rigor that scales to more components, more developers, more products, and more edge cases.

[![npm](https://img.shields.io/npm/v/@nuka-ui/core)](https://www.npmjs.com/package/@nuka-ui/core)
[![license](https://img.shields.io/npm/l/@nuka-ui/core)](./LICENSE)
[![storybook](https://img.shields.io/badge/storybook-live-ff4785)](https://ku5ic.github.io/nuka-ui)
[![stackblitz](https://img.shields.io/badge/stackblitz-try_it-1389fd)](https://stackblitz.com/github/ku5ic/nuka-ui)
[![typescript](https://img.shields.io/badge/TypeScript-strict-3178c6)](./tsconfig.json)
[![wcag](https://img.shields.io/badge/WCAG_2.2-AA-00857C)](./docs/DECISIONS.md)

---

## Why nuka-ui

Most component libraries make one of two mistakes: they either expose too much (every Tailwind class, every CSS variable, infinite flexibility with no guardrails) or too little (hardcoded styles, no theming, take it or leave it).

nuka-ui takes a different position. It is opinionated about the things that should be consistent (accessibility, token structure, API shape) and flexible about the things that should be customizable (color, spacing, radius, theming). Every decision has been made deliberately and documented. Nothing is accidental.

**What this project demonstrates:**

- Component API design that separates concerns correctly from the start, not after a painful refactor
- A two-layer CSS token architecture that makes theming predictable and safe
- WCAG 2.2 AA compliance treated as a constraint, not an afterthought
- TypeScript strict mode with `exactOptionalPropertyTypes` and `noUncheckedIndexedAccess`, the flags most projects turn off
- A testing discipline that covers behavior, not implementation, with full coverage of the variant system
- Storybook stories that document real-world usage patterns alongside isolated component states

---

## Stack

| Concern       | Tool                     |
| ------------- | ------------------------ |
| Framework     | React 19                 |
| Language      | TypeScript 6 (strict)    |
| Styling       | Tailwind v4              |
| Positioning   | Floating UI              |
| Variants      | class-variance-authority |
| Testing       | Vitest + Testing Library |
| Documentation | Storybook 10             |
| Build         | Vite 8                   |

---

## Installation

```bash
npm install @nuka-ui/core
```

Import the stylesheet once at your application entry point:

```tsx
import "@nuka-ui/core/styles";
```

If your project does not need dark mode or runtime theme switching, import the
light-theme-only stylesheet instead. It scopes all tokens to `:root` and omits the
`[data-theme]` selectors entirely:

```tsx
import "@nuka-ui/core/styles/root";
```

Add `data-theme` to your root element:

```html
<html data-theme="light"></html>
```

> **No ThemeProvider required.** nuka-ui does not ship a ThemeProvider component or
> useTheme hook. This is intentional. Theming is a single DOM attribute (`data-theme`),
> not a React context. If you are coming from Radix, MUI, or similar libraries, this is
> a deliberate simplification, not a missing feature.

Toggle the theme by mutating the attribute directly:

```ts
document.documentElement.dataset.theme = "dark";
```

---

## Usage

### Basic

```tsx
import { Button } from "@nuka-ui/core";

export function SaveButton() {
  return <Button variant="primary">Save changes</Button>;
}
```

### Variant and intent

Every component exposes two independent style axes:

- `variant` controls **visual weight**: how much attention the component demands
- `intent` controls **semantic meaning**: what the action communicates

```tsx
// Visual weight only
<Button variant="primary">Save</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="ghost">Skip</Button>

// Semantic meaning only
<Button intent="danger">Delete account</Button>
<Button intent="success">Confirm order</Button>
<Button intent="warning">Proceed anyway</Button>

// Combined
<Button variant="ghost" intent="danger">Remove item</Button>
<Button variant="outline" intent="success">Mark as complete</Button>
```

This composability means you never need `variant="ghost-danger"` or `variant="outline-success"`. The matrix is clean, predictable, and fully typed.

### Sizes

```tsx
<Button size="sm">Compact</Button>
<Button size="md">Default</Button>
<Button size="lg">Prominent</Button>
```

### Polymorphism via `asChild`

Render as any element or component while preserving all styles and behavior. Built on a first-party `Slot` utility.

```tsx
import { Link } from "react-router-dom";
import { Button } from "@nuka-ui/core";

// Renders as <a> with full Button styles
<Button asChild variant="primary">
  <Link to="/dashboard">Go to dashboard</Link>
</Button>;
```

### Ref forwarding

All components forward refs to their underlying DOM element.

```tsx
const ref = useRef<HTMLButtonElement>(null)

<Button ref={ref} onClick={() => ref.current?.focus()}>
  Focus me
</Button>
```

---

## Theming

nuka-ui uses a two-layer CSS custom property system.

**Primitive tokens** define the raw scale: color steps, spacing, radius, typography. They have no semantic meaning and no `--nuka-` prefix.

**Semantic tokens** define purpose. They reference primitives and carry the `--nuka-` prefix. These are the tokens components actually use.

```
--color-accent-500        <- primitive (raw oklch value)
--nuka-accent-bg          <- semantic (references the primitive)
bg-(--nuka-accent-bg)     <- component (references the semantic token)
```

This indirection means you can retheme the entire library by overriding semantic tokens, without touching a single component file.

### Customizing the theme

```css
/* Override semantic tokens on your theme root */
[data-theme="light"] {
  --nuka-accent-bg: oklch(44% 0.043 257);
  --nuka-accent-bg-hover: oklch(37.2% 0.044 257);
  --nuka-accent-bg-active: oklch(27.9% 0.041 257);
  --nuka-accent-text: oklch(44% 0.043 257);
}

[data-theme="dark"] {
  --nuka-accent-bg: oklch(44% 0.043 257);
  --nuka-accent-bg-hover: oklch(70.4% 0.04 257);
  --nuka-accent-text: oklch(86.9% 0.022 257);
}
```

### Nested themes

Because theming is attribute-based, multiple themes can coexist on the same page:

```html
<div data-theme="light">
  <button>Light button</button>

  <div data-theme="dark">
    <button>Dark button</button>
  </div>
</div>
```

### Full token reference

See [`src/styles/tokens.css`](./src/styles/tokens.css) for all primitive and semantic tokens with inline documentation.

---

## Accessibility

WCAG 2.2 AA compliance is a hard constraint, not a goal. It is verified at the token level (contrast ratios calculated and documented), the component level (correct semantic HTML, keyboard navigation, focus management), and the Storybook level (accessibility panel must show zero violations on every story).

**What this means in practice:**

- All text color tokens are verified at 4.5:1 minimum contrast ratio against their intended backgrounds
- The primary accent color achieves 7.74:1 on white (AAA)
- Focus indicators meet WCAG 2.2's updated 2.4.11 requirements
- Interactive target sizes meet 2.5.8 (24x24px minimum)
- `asChild` correctly delegates accessible names to child elements
- Disabled states use the native `disabled` attribute, not just visual opacity
- Intent-specific foreground tokens (`--nuka-danger-fg`, `--nuka-success-fg`, `--nuka-warning-fg`) ensure filled surfaces pass contrast in both light and dark themes

---

## Components

### Actions

| Component | Description                                                     |
| --------- | --------------------------------------------------------------- |
| `Button`  | Actions and form submissions. 5 variants x 4 intents x 3 sizes. |

### Typography

| Component | Description                                                |
| --------- | ---------------------------------------------------------- |
| `Heading` | `h1`-`h6` via `as` prop. Semantic size scale.              |
| `Text`    | Typography component. Size, weight, color variants.        |
| `Code`    | Inline code. Monospace, subtle background.                 |
| `Kbd`     | Keyboard shortcut display.                                 |
| `Eyebrow` | Uppercase label text. Color variants: base, muted, accent. |

### Forms

| Component     | Description                                                    |
| ------------- | -------------------------------------------------------------- |
| `Input`       | Text input. Intent for validation state. Size variants.        |
| `Textarea`    | Multi-line input. Same API as Input.                           |
| `Select`      | Custom select with keyboard navigation. Styled to match Input. |
| `Checkbox`    | Custom checkbox. Intent for validation.                        |
| `RadioGroup`  | Custom radio group.                                            |
| `Switch`      | Custom toggle switch.                                          |
| `Slider`      | Custom range slider.                                           |
| `NumberInput` | Number input with increment/decrement controls.                |
| `FileInput`   | Drag-and-drop file upload zone with file list.                 |
| `Label`       | Associates with form controls. Required indicator.             |
| `FormField`   | Layout wrapper: Label + control + error message.               |

### Feedback

| Component  | Description                                            |
| ---------- | ------------------------------------------------------ |
| `Alert`    | Inline feedback. variant + intent. Dismissible option. |
| `Toast`    | Programmatic toast notifications via `Toaster`.        |
| `Banner`   | Full-width informational strip. Dismissible.           |
| `Progress` | Linear progress bar. Intent for status.                |
| `Skeleton` | Loading placeholder. Matches shapes of real content.   |
| `Spinner`  | Loading indicator. Size variants. Accessible.          |
| `Tooltip`  | Positioned tooltip with Floating UI.                   |
| `Popover`  | Positioned popover with Floating UI.                   |

### Display

| Component    | Description                                                   |
| ------------ | ------------------------------------------------------------- |
| `Badge`      | Inline label. variant + intent. No interactive states.        |
| `Tag`        | Dismissible Badge variant. Adds close button.                 |
| `Avatar`     | Image with fallback initials. Size variants.                  |
| `Icon`       | Wrapper for icon libraries. Size + color tokens.              |
| `Divider`    | Horizontal/vertical separator. Optional label.                |
| `EmptyState` | Blank slate. Illustration slot, heading, description, action. |
| `Timeline`   | Vertical event sequence. Display-only.                        |
| `ScrollArea` | Custom scrollbar container. Orientation and max dimensions.   |

### Layout

| Component     | Description                                                      |
| ------------- | ---------------------------------------------------------------- |
| `Stack`       | Flex container. `direction`, `gap`, `align`, `justify`.          |
| `Grid`        | Grid container. `cols`, `gap`.                                   |
| `Container`   | Max-width centered wrapper. `size` variants.                     |
| `AspectRatio` | Fixed aspect ratio wrapper. Named and numeric ratios.            |
| `Section`     | Semantic section with spacing, background, and divider variants. |
| `SplitLayout` | Two-column grid with sidebar width and responsive stacking.      |

### Accessibility

| Component        | Description                                     |
| ---------------- | ----------------------------------------------- |
| `VisuallyHidden` | Screen-reader-only text. Polymorphic `as` prop. |

### Navigation

| Component        | Description                                                             |
| ---------------- | ----------------------------------------------------------------------- |
| `Card`           | Surface container. Header/body/footer slots. Elevated, outlined, flat.  |
| `Collapsible`    | Generic expand/collapse primitive. CSS grid-rows animation.             |
| `Accordion`      | Expand/collapse group with keyboard navigation.                         |
| `Tabs`           | Tab group with keyboard navigation. Three visual variants.              |
| `Dialog`         | Modal dialog with focus trapping and scroll lock.                       |
| `Sheet`          | Slide-in panel. Dialog variant for side drawers.                        |
| `DropdownMenu`   | Dropdown with keyboard navigation and type-ahead.                       |
| `ContextMenu`    | Right-click menu. Cursor-position placement via Floating UI.            |
| `Menubar`        | Horizontal application menu. Cross-menu keyboard coordination.          |
| `NavigationMenu` | Site-level navigation with floating sub-panels. `role="dialog"` panels. |
| `Breadcrumb`     | Navigation trail. `<nav><ol>` with `aria-current="page"`.               |
| `Pagination`     | Page navigation. Compound API with `asChild` links.                     |
| `Stepper`        | Multi-step flow indicator. State inference from `currentStep`.          |
| `Sidebar`        | App navigation panel. Collapsible. Sheet-based drawer on mobile.        |
| `Nav`            | Horizontal nav with CSS-driven submenu support.                         |

### Composites

| Component     | Description                                            |
| ------------- | ------------------------------------------------------ |
| `AppShell`    | Top-level layout: sidebar + header + main.             |
| `Table`       | Sortable, accessible. `thead`/`tbody`/`tfoot`.         |
| `DataTable`   | Table with pagination and filtering.                   |
| `CommandMenu` | Keyboard-first search and action palette.              |
| `DatePicker`  | Popover calendar. Text input with keyboard navigation. |
| `Combobox`    | Searchable select with keyboard navigation.            |

### Typography patterns

```tsx
import { Eyebrow, Heading, Text } from "@nuka-ui/core";

<Eyebrow color="accent">Case study</Eyebrow>
<Heading as="h2" size="3xl">Scaling the design system</Heading>
<Text color="muted">How we shipped faster with fewer regressions.</Text>
```

### Layout patterns

```tsx
import { Section, SplitLayout } from "@nuka-ui/core";

<Section spacing="lg" background="subtle">
  <SplitLayout sideWidth="md" sidebar="left" gap="lg">
    <aside>Sidebar content</aside>
    <main>Main content</main>
  </SplitLayout>
</Section>;
```

### Accessible hidden content

`VisuallyHidden` renders content that is invisible but accessible to screen readers. Use it for icon-only buttons and other cases where visual context is sufficient but a text label is needed for assistive technology.

```tsx
import { VisuallyHidden } from "@nuka-ui/core";

<button>
  <SearchIcon />
  <VisuallyHidden>Search</VisuallyHidden>
</button>;
```

### Form controls

```tsx
import { FormField, Label, NumberInput, FileInput } from "@nuka-ui/core";

<FormField id="quantity" hint="Between 1 and 99">
  <Label>Quantity</Label>
  <NumberInput min={1} max={99} defaultValue={1} />
</FormField>

<FormField id="documents">
  <Label>Upload files</Label>
  <FileInput multiple accept=".pdf,.doc" />
</FormField>
```

### Navigation

```tsx
import {
  Nav,
  NavList,
  NavItem,
  NavLink,
  NavTrigger,
  NavSubmenu,
} from "@nuka-ui/core";

<Nav>
  <NavList>
    <NavItem>
      <NavLink href="/" active>
        Home
      </NavLink>
    </NavItem>
    <NavItem>
      <NavTrigger>Products</NavTrigger>
      <NavSubmenu>
        <NavItem>
          <NavLink href="/widgets">Widgets</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/tools">Tools</NavLink>
        </NavItem>
      </NavSubmenu>
    </NavItem>
  </NavList>
</Nav>;
```

### RSC compatibility

Components without interactive state ship without a `"use client"` directive and work in React Server Components (Next.js App Router, etc.) without modification:

**Server-safe:** Alert, AppShell, AspectRatio, Badge, Banner, Breadcrumb, Button, Card, Code, Container, Divider, EmptyState, Eyebrow, Grid, Heading, Icon, Kbd, Nav, Pagination, ScrollArea, Section, Skeleton, Spinner, SplitLayout, Stack, Tag, Text, Textarea, Timeline, VisuallyHidden

**Client-required (`"use client"`):** Accordion, Avatar, Checkbox, Collapsible, Combobox, CommandMenu, ContextMenu, DataTable, DatePicker, Dialog, DropdownMenu, FileInput, FormField, Input, Label, Menubar, NavigationMenu, NumberInput, Popover, Progress, RadioGroup, Select, Sheet, Sidebar, Slider, Stepper, Switch, Table, Tabs, Toast/Toaster, Tooltip

Client-required components include the `"use client"` directive in their compiled output. In Next.js App Router, import them from any server or client component without additional configuration.

---

## Architecture

The key decisions that shaped this library are documented in [`docs/DECISIONS.md`](./docs/DECISIONS.md). Reading it gives you a clear picture of not just what was built, but why: which tradeoffs were accepted, which alternatives were considered, and which decisions are explicitly deferred.

For the full component inventory and build status, see [`docs/COMPONENTS.md`](./docs/COMPONENTS.md). For customization options, limitations, and the correct approach for each use case, see [`docs/CUSTOMIZATION.md`](./docs/CUSTOMIZATION.md).

Short version:

- **Variant + intent**: over flat variants, `ghost` + `danger` is cleaner than `ghost-danger` and scales to any combination
- **Two-layer tokens**: primitives for scale, semantics for purpose, components touch only semantics
- **`data-theme` attribute**: enables nested themes and avoids class pollution
- **No third-party UI primitives**: `Slot`, `composeRefs`, focus trap, scroll lock, and all ARIA patterns are first-party
- **No component-level tokens by default**: added only when semantic tokens are genuinely insufficient
- **`"use client"` in compiled output**: interactive components include the directive; server-safe components omit it

---

## Development

```bash
# Install dependencies
npm install

# Start Storybook
npm run dev

# Run tests
npm run test:watch

# Type check
npm run typecheck

# Lint
npm run lint

# Format
npm run format

# Build
npm run build
```

---

## License

MIT © [Sinisa Kusic](https://github.com/ku5ic)
