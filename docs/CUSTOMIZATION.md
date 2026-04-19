# Customization

nuka-ui is an opinionated library. It has strong opinions about accessibility, token structure, component API shape, and TypeScript correctness. Within those constraints it is designed to be practical to customize for real product work.

This guide covers every supported customization path, when to use each one, and where the hard boundaries are.

---

## The customization model

nuka-ui separates two concerns that are often conflated:

- **Theming** - changing colors, spacing, radius, and typography system-wide via CSS custom properties
- **Styling overrides** - adjusting individual component instances via `className`

These are different operations with different scopes. Theming affects everything in the tree. Styling overrides affect one instance. Neither requires touching library source.

A third path - **wrapping** - exists for cases where you need new named variants or intents that carry compound logic. This is always a build step in your codebase, not a library extension point.

---

## 1. Token overrides

The primary customization mechanism. All components reference semantic CSS tokens with the `--nuka-` prefix. Override those tokens and the components follow.

### How the token system works

nuka-ui uses a two-layer architecture:

```
--color-accent-500          <- primitive (raw oklch value, no prefix)
    |
    v
--nuka-accent-bg            <- semantic (references primitive, --nuka- prefix)
    |
    v
bg-(--nuka-accent-bg)  <- component (Tailwind class referencing semantic token)
```

Components only ever reference semantic tokens. Primitives are internal. This means you can retheme the library by overriding `--nuka-*` tokens without touching any component file.

### Changing the accent color

The accent color drives the `default` intent across primary, secondary, outline, ghost, and link variants on every component that uses the variant + intent pattern.

Example: switching the default slate accent to a vivid blue:

```css
[data-theme="light"] {
  --nuka-accent-bg: oklch(44% 0.19 264);
  --nuka-accent-bg-hover: oklch(37% 0.19 264);
  --nuka-accent-bg-active: oklch(28% 0.18 264);
  --nuka-accent-bg-subtle: oklch(96% 0.03 264);
  --nuka-accent-border: oklch(70% 0.1 264);
  --nuka-accent-text: oklch(44% 0.19 264);
}

[data-theme="dark"] {
  --nuka-accent-bg: oklch(55% 0.19 264);
  --nuka-accent-bg-hover: oklch(65% 0.18 264);
  --nuka-accent-bg-active: oklch(72% 0.16 264);
  --nuka-accent-bg-subtle: oklch(20% 0.06 264);
  --nuka-accent-border: oklch(55% 0.19 264);
  --nuka-accent-text: oklch(80% 0.12 264);
}
```

**Contrast is your responsibility.** nuka-ui ships with a verified accessible default (7.74:1 on white, WCAG AAA). When you override accent tokens, verify that your values maintain at least 4.5:1 for normal text and 3:1 for large text and UI components against the backgrounds they appear on.

### Changing feedback colors

Each intent (danger, success, warning) has five tokens: background, text, border, base, and foreground. The base token is used for filled/primary visual weight. The foreground (`-fg`) token is the text color on filled surfaces. The others are used for subtle, secondary, and outline treatments.

```css
[data-theme="light"] {
  --nuka-danger-bg: oklch(95% 0.06 15);
  --nuka-danger-text: oklch(42% 0.2 15);
  --nuka-danger-border: oklch(75% 0.14 15);
  --nuka-danger-base: oklch(56% 0.22 15);
  --nuka-danger-fg: oklch(100% 0 0);
}
```

The same five-token pattern applies to `--nuka-success-*` and `--nuka-warning-*`. The `--nuka-warning-fg` uses dark text (neutral-900) because amber hues cannot pass 4.5:1 contrast with white.

### Changing dark theme surfaces

Dark theme surfaces use a separate set of primitives: `--color-neutral-dark-*`. These live on `:root` alongside other primitives, not inside `[data-theme="dark"]`. Override them on `:root` to retheme the dark surface hierarchy without affecting light mode.

| Primitive                             | Default                | Role                             |
| ------------------------------------- | ---------------------- | -------------------------------- |
| `--color-neutral-dark-base`           | `oklch(30% 0.012 257)` | Page background                  |
| `--color-neutral-dark-subtle`         | `oklch(36% 0.014 257)` | Subtle surface (cards, sidebars) |
| `--color-neutral-dark-muted`          | `oklch(38% 0.016 257)` | Muted/filled surface             |
| `--color-neutral-dark-border`         | `oklch(46% 0.016 257)` | Default border                   |
| `--color-neutral-dark-input`          | `oklch(26% 0.012 257)` | Input background                 |
| `--color-neutral-dark-input-readonly` | `oklch(27% 0.012 257)` | Readonly input background        |

Example: shifting the dark surface stack to a warmer tone:

```css
:root {
  --color-neutral-dark-base: oklch(28% 0.015 45);
  --color-neutral-dark-subtle: oklch(34% 0.017 45);
  --color-neutral-dark-muted: oklch(36% 0.019 45);
  --color-neutral-dark-border: oklch(44% 0.019 45);
  --color-neutral-dark-input: oklch(24% 0.015 45);
  --color-neutral-dark-input-readonly: oklch(25% 0.015 45);
}
```

These primitives are on `:root`, not `[data-theme="dark"]`. The dark semantic tokens reference them via `var()`, so the override propagates automatically when the dark theme is active. Light theme tokens do not reference these primitives, so overriding them has zero effect on light mode.

This is different from accent token overrides, which are set on `[data-theme]` selectors because they affect both themes.

### Changing spacing and radius

```css
:root {
  --radius-sm: 0.125rem;
  --radius-md: 0.25rem;
  --radius-lg: 0.375rem;
  --radius-full: 9999px;

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-24: 6rem;
  --space-32: 8rem;
}
```

Spacing and radius primitives live on `:root` without a `--nuka-` prefix. Components reference them directly. Overriding them on `:root` affects all components globally.

### Nested themes

Because theming is anchored to a `data-theme` attribute, you can nest different themes on the same page. This works with any valid CSS selector scoping:

```html
<html data-theme="light">
  <header>Light header</header>

  <aside data-theme="dark">Dark sidebar</aside>
</html>
```

Components inside the `data-theme="dark"` element pick up dark tokens automatically. No JavaScript required.

### Surface-level token overrides

When a dark block sits inside a light page (a hero, a footer, a CTA panel), interactive
elements inside that block need a focus ring with enough contrast against the dark
background. Setting per-instance styles on every button, input, and link would be
tedious and error-prone.

Mark the container with `data-surface="inverse"`:

```html
<div data-surface="inverse" class="bg-(--nuka-bg-emphasis) p-6">
  <button>Tab into me</button>
</div>
```

Every interactive nuka component inside picks up the inverse focus-ring value
automatically. `<Section background="emphasis">` emits `data-surface="inverse"`
for you, so the wrapper is only needed when you build a custom dark surface
outside the Section component.

See [THEMING.md](./THEMING.md#surface-level-token-overrides) for the full list of
accepted values and the cascade semantics, and [ADR-050](./DECISIONS.md) for the
design decision.

### Changing scrollbar appearance

`ScrollArea` uses two semantic tokens for custom scrollbar styling:

```css
:root,
[data-theme="light"] {
  --nuka-scroll-thumb: var(--color-neutral-400);
  --nuka-scroll-track: var(--color-neutral-100);
}

[data-theme="dark"] {
  --nuka-scroll-thumb: var(--color-neutral-dark-border);
  --nuka-scroll-track: var(--color-neutral-dark-subtle);
}
```

These control both the WebKit `::-webkit-scrollbar` pseudo-elements and the standard `scrollbar-color` property.

### Full token reference

See [`src/styles/tokens.css`](../src/styles/tokens.css) for the complete list of primitives and semantic tokens with inline documentation.

---

## 2. className overrides

Every nuka-ui component accepts a `className` prop. It is merged last, after CVA resolves the variant and intent classes, using `tailwind-merge`. This means your classes win on any conflict.

```tsx
// Add spacing without touching anything else
<Button variant="primary" className="mt-4 w-full">
  Submit
</Button>

// Override a specific visual property for a one-off case
<Badge variant="solid" intent="default" className="bg-purple-600 text-white">
  Custom
</Badge>
```

### What this is good for

- Layout adjustments: margins, widths, flex properties
- One-off visual overrides that do not belong in a theme
- Utility classes that do not conflict with CVA output

### What this is not good for

- Systematic changes that should apply everywhere - use token overrides instead
- Creating a named reusable variant - use wrapping instead (see section 4)
- Overriding base structural classes that affect layout and accessibility behavior

### How className merges

Under the hood, `cn()` runs `tailwind-merge` after `clsx`. Conflicting Tailwind utilities resolve in your favor:

```tsx
// CVA outputs: bg-(--nuka-accent-bg) text-(--nuka-text-inverse)
// Your className: bg-purple-600
// Result: bg-purple-600 text-(--nuka-text-inverse)
// bg-(--nuka-accent-bg) is dropped by tailwind-merge
<Button className="bg-purple-600">Label</Button>
```

This works reliably for standard Tailwind utilities. Arbitrary value classes like `bg-(--nuka-accent-bg)` and `bg-purple-600` are recognized as the same property group and merged correctly.

---

## 3. asChild and polymorphism

The `asChild` prop is available on most nuka-ui components. It renders the component's styles onto its child element instead of the component's default element. The child takes over as the rendered DOM node.

### Rendering as a router link

```tsx
import { Link } from "react-router-dom";
import { Button } from "@nuka-ui/core";

<Button asChild variant="primary">
  <Link to="/dashboard">Go to dashboard</Link>
</Button>;
```

The DOM renders a single `<a>` element with all Button styles applied. No wrapper element in between.

### Rendering as a Next.js link

```tsx
import Link from "next/link";
import { Button } from "@nuka-ui/core";

<Button asChild variant="outline">
  <Link href="/settings">Settings</Link>
</Button>;
```

### What gets merged onto the child

- `className` - concatenated, both sets of classes are preserved
- `style` - shallow merged, child wins on conflicts
- Event handlers - both fire, component handler fires first
- `ref` - composed, both refs receive the element
- All other props - child wins on conflicts

### Constraints

`asChild` requires exactly one React element as its child. Passing a string, fragment, or multiple children throws in development.

Accessibility behavior is your responsibility when using `asChild`. If you render a Button as a `<div>`, you lose the native `button` role, keyboard activation, and disabled state handling. The component cannot enforce semantics on an arbitrary element.

### Disabled links

The `disabled` attribute is invalid on `<a>` elements and has no native effect. When using `asChild` to render a Button as a link, disabled state requires three attributes on the anchor element:

- `aria-disabled="true"` communicates the disabled state to assistive technology
- `tabIndex={-1}` removes the element from the tab order
- `pointer-events-none` prevents click activation

All three are required. Missing any one leaves a gap in either keyboard, pointer, or assistive technology interaction.

```tsx
<Button asChild variant="primary">
  <a
    href="/dashboard"
    aria-disabled="true"
    tabIndex={-1}
    className="pointer-events-none"
  >
    Go to dashboard
  </a>
</Button>
```

nuka-ui applies visual disabled styling when it detects `aria-disabled="true"` on the rendered element. The interaction prevention is your responsibility because the library cannot intercept native anchor behavior from the outside.

---

## 4. Wrapping components

The correct pattern for creating named, reusable component variants with specific prop defaults. This is how you extend the component API without touching the library.

### Named variant shortcuts

When your product uses a specific combination repeatedly, encode it in a wrapper:

```tsx
import { Button, type ButtonProps } from "@nuka-ui/core";

type BrandButtonProps = Omit<ButtonProps, "variant" | "intent">;

export function BrandButton({ children, ...props }: BrandButtonProps) {
  return (
    <Button variant="primary" intent="default" {...props}>
      {children}
    </Button>
  );
}
```

The wrapper encodes the convention. Consumers cannot accidentally pass the wrong variant.

### Destructive actions

```tsx
import { Button, type ButtonProps } from "@nuka-ui/core";

type DestructiveButtonProps = Omit<ButtonProps, "intent">;

export function DestructiveButton({ children, ...props }: DestructiveButtonProps) {
  return (
    <Button intent="danger" {...props}>
      {children}
    </Button>
  );
}

// Consumers still control visual weight
<DestructiveButton variant="primary">Delete account</DestructiveButton>
<DestructiveButton variant="ghost">Remove item</DestructiveButton>
```

### Product-specific badge variants

```tsx
import { Badge, type BadgeProps } from "@nuka-ui/core";

type StatusBadgeProps = Omit<BadgeProps, "variant" | "intent"> & {
  status: "active" | "pending" | "archived";
};

const statusMap: Record<
  StatusBadgeProps["status"],
  { intent: BadgeProps["intent"] }
> = {
  active: { intent: "success" },
  pending: { intent: "warning" },
  archived: { intent: "default" },
};

export function StatusBadge({ status, ...props }: StatusBadgeProps) {
  const { intent } = statusMap[status];
  return <Badge variant="subtle" intent={intent} {...props} />;
}
```

### Adding visual logic not in the base component

If you need custom CSS that goes beyond what `className` can achieve cleanly, wrap and add it:

```tsx
import { Button, type ButtonProps, cn } from "@nuka-ui/core";

type GradientButtonProps = Omit<ButtonProps, "variant">;

export function GradientButton({ className, ...props }: GradientButtonProps) {
  return (
    <Button
      variant="primary"
      className={cn(
        "bg-linear-to-r from-violet-600 to-indigo-600 border-none",
        className,
      )}
      {...props}
    />
  );
}
```

The wrapper inherits all other Button behavior: size prop, intent prop, asChild, ref forwarding, disabled state, accessibility.

---

## 5. Form library integration

nuka-ui form controls are standard HTML inputs. They work with any form library that operates on refs and native form elements. This section shows the pattern for React Hook Form (RHF), but the same approach applies to Formik or other libraries.

### Uncontrolled fields with register()

`Input` and `Textarea` render native `<input>` and `<textarea>` elements. RHF's `register()` works directly:

```tsx
import { useForm } from "react-hook-form";
import { Input, Textarea, FormField, Button } from "@nuka-ui/core";

interface ContactForm {
  name: string;
  message: string;
}

function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>();

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <FormField label="Name" error={errors.name?.message}>
        <Input
          {...register("name", { required: "Name is required" })}
          intent={errors.name ? "danger" : "default"}
        />
      </FormField>

      <FormField label="Message" error={errors.message?.message}>
        <Textarea
          {...register("message", { required: "Message is required" })}
          intent={errors.message ? "danger" : "default"}
        />
      </FormField>

      <Button type="submit" variant="primary">
        Send
      </Button>
    </form>
  );
}
```

The key patterns:

- `formState.errors.field?.message` drives `intent="danger"` on the control
- The error message string is passed to `FormField` as the `error` prop
- `register()` spreads directly onto the input, providing `ref`, `onChange`, `onBlur`, and `name`

### Controlled fields with Controller

`Select` and `Checkbox` are controlled components. Use RHF's `Controller` to bridge them:

```tsx
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Checkbox,
  FormField,
  Button,
} from "@nuka-ui/core";

interface SettingsForm {
  role: string;
  terms: boolean;
}

function SettingsPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsForm>();

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <FormField label="Role" error={errors.role?.message}>
        <Controller
          name="role"
          control={control}
          rules={{ required: "Role is required" }}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger intent={errors.role ? "danger" : "default"} />
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </FormField>

      <Controller
        name="terms"
        control={control}
        rules={{ required: "You must accept the terms" }}
        render={({ field }) => (
          <Checkbox
            checked={field.value}
            onCheckedChange={field.onChange}
            intent={errors.terms ? "danger" : "default"}
          >
            I accept the terms
          </Checkbox>
        )}
      />

      <Button type="submit" variant="primary">
        Save
      </Button>
    </form>
  );
}
```

React Hook Form is not a dependency of nuka-ui. These examples are illustrative. The patterns work with any version of RHF that supports `register()` and `Controller`.

---

## 6. Typography and font families

nuka-ui exposes four semantic font family tokens:

| Token                 | Default                    | Purpose                      |
| --------------------- | -------------------------- | ---------------------------- |
| `--nuka-font-heading` | `var(--font-family-serif)` | Heading component            |
| `--nuka-font-body`    | `var(--font-family-sans)`  | Text, Eyebrow                |
| `--nuka-font-ui`      | `var(--font-family-sans)`  | Button, Label, form controls |
| `--nuka-font-code`    | `var(--font-family-mono)`  | Code, Kbd                    |

Override them on `:root` or `[data-theme]` to change typography globally:

```css
:root {
  --nuka-font-heading: "Inter", sans-serif;
  --nuka-font-body: "Inter", sans-serif;
  --nuka-font-ui: "Inter", sans-serif;
}
```

The `Heading` component accepts a `family` prop to override the token per instance:

```tsx
<Heading family="sans">Sans-serif heading</Heading>
```

When `family` is not provided, the component uses `font-[family-name:var(--nuka-font-heading)]`. The prop overrides the CSS variable with the selected primitive (`--font-family-sans`, `--font-family-serif`, `--font-family-mono`).

---

## 7. Responsive props

Layout primitives (Stack, Grid, Container, Section, SplitLayout) and typography components (Heading, Text) accept responsive prop values via the `Responsive<T>` type:

```tsx
// Scalar: applies at all breakpoints
<Stack direction="row" gap="md" />

// Object: per-breakpoint control
<Stack direction={{ base: "column", md: "row" }} gap={{ base: "sm", lg: "lg" }} />
```

The `base` key is the mobile-first default (no breakpoint prefix). Breakpoints follow Tailwind v4 defaults: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px).

Only the breakpoints you specify are emitted as classes. Unspecified breakpoints inherit from the nearest smaller breakpoint via CSS cascade.

Not all props on all components are responsive. Check the TypeScript type: if a prop accepts `Responsive<T>`, it supports per-breakpoint values. If it accepts `T` directly, it does not.

---

## 8. Limitations

These are deliberate constraints, not gaps.

### You cannot add a new `variant` or `intent` value

`variant` and `intent` prop types are closed enums. Passing `variant="brand"` or `intent="info"` is a TypeScript error. The CVA instance that resolves compound variants is built at library compile time and is not extensible at runtime.

Note: `--nuka-info-*` tokens (base, bg, text, border, fg) are defined in `tokens.css` for both light and dark themes. The CSS layer is ready for an `info` intent, but no component CVA maps to it yet. If you need info styling today, you have three options: remap an existing intent via token overrides (for example, remap `--nuka-warning-*` to info colors if warning is unused in your product), reference the `--nuka-info-*` tokens directly via `className`, or build your own CVA instance outside the library using the same pattern.

### className cannot override base structural classes reliably

`tailwind-merge` resolves conflicting utility classes but it cannot know which classes are structural vs. visual in context. If you remove a layout class that is part of a component's core structure (for example, `inline-flex` on Button), you may break internal alignment. These classes are intentional and their removal has side effects.

Use `className` for additive overrides and clearly visual property changes. Do not use it to restructure a component's internal layout.

### Token overrides do not affect structure

Tokens control color, spacing scale, radius, and typography scale. They do not control structural layout decisions like `inline-flex`, `items-center`, or `border`. Those are intentional class choices baked into the component. CSS variable overrides cannot change them.

If you need structural changes to a component, the correct path is to not use that component and build your own from scratch.

### asChild does not enforce accessibility

When you use `asChild` to render a Button as a `<div>` or a custom component, nuka-ui cannot enforce `role="button"`, keyboard activation, or `aria-disabled`. You are responsible for ensuring the rendered output meets WCAG requirements. The component passes its props to the child but it cannot compensate for what the child does not provide natively.

### No runtime theme switching API

nuka-ui does not ship a `ThemeProvider` or `useTheme` hook. Switching themes is a DOM operation: set the `data-theme` attribute on the appropriate container element. How and when you do that is outside the library's scope.

---

## Choosing the right approach

| Goal                                                    | Approach                                                                               |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Change the accent color across the product              | Token override on `[data-theme]`                                                       |
| Support dark mode                                       | Token override on `[data-theme="dark"]`                                                |
| Isolate a dark section within a light page              | Nested `data-theme` attribute                                                          |
| Change border radius globally                           | Override `--radius-*` primitives on `:root`                                            |
| Change spacing scale globally                           | Override `--space-*` primitives on `:root`                                             |
| Adjust margin or width on one instance                  | `className` prop                                                                       |
| Override a background color on one instance             | `className` prop                                                                       |
| Render a Button as a router link                        | `asChild` with Link as child                                                           |
| Create a `PrimaryButton` shortcut for your product      | Wrap with fixed `variant` and `intent`                                                 |
| Create a `StatusBadge` mapping domain values to intents | Wrap with a status-to-intent map                                                       |
| Add a new `brand` variant with compound logic           | Not supported - wrap or build from scratch                                             |
| Add an `info` intent to all components                  | Not supported - remap an existing intent via tokens, or build from scratch             |
| Restructure a component's internal layout               | Not supported - build your own                                                         |
| Change heading/body/UI font family globally             | Token override: `--nuka-font-heading`, `--nuka-font-body`, `--nuka-font-ui` on `:root` |
| Change font family on one heading instance              | `family` prop on `Heading`                                                             |
| Responsive direction/gap/cols on layout components      | `Responsive<T>` object: `direction={{ base: "column", md: "row" }}`                    |
| Customize scrollbar colors                              | Token override: `--nuka-scroll-thumb`, `--nuka-scroll-track`                           |
| Add semantic spacing and background to a page section   | `Section` component with `spacing` and `background` props                              |
| Create a two-column layout with sidebar                 | `SplitLayout` component with `sideWidth` and `sidebar` props                           |
| Hide content visually but keep it accessible            | `VisuallyHidden` component                                                             |
| Add a scrollable container with custom scrollbar        | `ScrollArea` component with `orientation` and `maxHeight`/`maxWidth`                   |
