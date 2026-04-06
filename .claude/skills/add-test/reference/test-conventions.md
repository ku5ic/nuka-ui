# Test Conventions

## Setup

- Framework: Vitest + Testing Library
- `globals: false`: always import test utilities explicitly
- Cleanup: automatic via `afterEach` in `src/test-setup.ts`
- Jest-dom matchers extended in `src/test-setup.ts`

## Imports

```tsx
import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ComponentName } from "./ComponentName";
```

## Query rules

Always use `getByRole` with `{ name: '...' }`. Never use bare `getByRole('button')`.

```tsx
// correct
screen.getByRole("button", { name: "Submit" });

// wrong: fails when multiple buttons are in DOM
screen.getByRole("button");
```

## Structure

```tsx
describe('ComponentName', () => {
  describe('rendering', () => { ... })
  describe('variants', () => { ... })
  describe('intent', () => { ... })
  describe('className override', () => { ... })
  describe('native attributes', () => { ... })
  describe('ref forwarding', () => { ... })
  describe('asChild', () => { ... }) // if applicable
})
```

## Variant tests

Assert on class names that are directly applied by CVA. Use the exact class string from the component definition.

```tsx
it("applies primary variant classes by default", () => {
  render(<ComponentName>Label</ComponentName>);
  expect(screen.getByRole("button", { name: "Label" }).className).toContain(
    "bg-(--nuka-accent-bg)",
  );
});
```

## Intent tests

Test both individual intents and at least one compound combination:

```tsx
it("applies danger intent classes when specified", () => {
  render(<ComponentName intent="danger">Label</ComponentName>);
  expect(screen.getByRole("button", { name: "Label" }).className).toContain(
    "bg-(--nuka-danger-base)",
  );
});

it("applies compound variant and intent classes", () => {
  render(
    <ComponentName variant="ghost" intent="danger">
      Label
    </ComponentName>,
  );
  const el = screen.getByRole("button", { name: "Label" });
  expect(el.className).toContain("text-(--nuka-danger-text)");
  expect(el.className).toContain("hover:bg-(--nuka-danger-bg)");
});
```

## Ref forwarding

```tsx
it("forwards ref to the element", () => {
  const ref = React.createRef<HTMLButtonElement>();
  render(<ComponentName ref={ref}>Label</ComponentName>);
  expect(ref.current).toBeInstanceOf(HTMLButtonElement);
});
```

## asChild

```tsx
it("renders as child element when asChild is true", () => {
  render(
    <ComponentName asChild>
      <a href="/test">Label</a>
    </ComponentName>,
  );
  const link = screen.getByRole("link", { name: "Label" });
  expect(link).toBeInTheDocument();
  expect(link.tagName).toBe("A");
});
```

## What not to test

- That Tailwind classes produce the correct visual output: that is Storybook's job
- Internal implementation details
- CVA internals
