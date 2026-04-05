# Story Conventions

## File location

Co-located with the component: `src/components/<Name>/<Name>.stories.tsx`

## Meta structure

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { ComponentName } from "@nuka/components/ComponentName";

const meta = {
  title: "Folder/ComponentName", // e.g. "Actions/Button", "Display/Badge", "Forms/Inputs/Input"
  component: ComponentName,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost", "link"],
    },
    intent: {
      control: "select",
      options: ["default", "danger", "success", "warning"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: {
      control: "boolean",
    },
    asChild: {
      control: false,
    },
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;
```

## Sidebar taxonomy

Story titles use a semantic folder structure. See `docs/COMPONENTS.md` for the canonical mapping.

| Folder            | Components                                                          |
| ----------------- | ------------------------------------------------------------------- |
| `Actions`         | Button                                                              |
| `Typography`      | Heading, Text, Code, Kbd                                            |
| `Forms/Inputs`    | Input, Textarea, Select, Checkbox, Radio, Switch, Slider            |
| `Forms/Structure` | Label, FormField                                                    |
| `Feedback`        | Alert, Toast, Banner, Progress, Skeleton, Spinner, Tooltip, Popover |
| `Display`         | Badge, Tag, Avatar, Icon, Divider, EmptyState, Timeline             |
| `Layout`          | Stack, Grid, Container                                              |

## Story types required

### Individual variant stories

One per variant, using `args`:

```tsx
export const Primary: Story = {
  args: {
    variant: "primary",
    intent: "default",
    size: "md",
    children: "ComponentName",
  },
};
```

### Intent stories

One per non-default intent, using `render` to show all variants:

```tsx
export const IntentDanger: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <ComponentName variant="primary" intent="danger">
        Primary
      </ComponentName>
      <ComponentName variant="secondary" intent="danger">
        Secondary
      </ComponentName>
      <ComponentName variant="outline" intent="danger">
        Outline
      </ComponentName>
      <ComponentName variant="ghost" intent="danger">
        Ghost
      </ComponentName>
      <ComponentName variant="link" intent="danger">
        Link
      </ComponentName>
    </div>
  ),
};
```

### AllVariants

```tsx
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <ComponentName variant="primary">Primary</ComponentName>
      <ComponentName variant="secondary">Secondary</ComponentName>
      <ComponentName variant="outline">Outline</ComponentName>
      <ComponentName variant="ghost">Ghost</ComponentName>
      <ComponentName variant="link">Link</ComponentName>
    </div>
  ),
};
```

### AllSizes

Always use `alignItems: 'flex-end'` so size differences are visually comparable:

```tsx
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "flex-end" }}>
      <ComponentName size="sm">Small</ComponentName>
      <ComponentName size="md">Medium</ComponentName>
      <ComponentName size="lg">Large</ComponentName>
    </div>
  ),
};
```

### Pattern stories

Named descriptively with `name` property:

```tsx
export const ConfirmationDialog: Story = {
  name: "Pattern: Confirmation Dialog",
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <ComponentName variant="ghost">Cancel</ComponentName>
      <ComponentName variant="ghost" intent="danger">
        Delete
      </ComponentName>
    </div>
  ),
};
```

## Rules

- Always `satisfies Meta<typeof Component>` — never type annotation
- `asChild` always `control: false`
- Inline styles only for story layout — never for component styling
- No lorem ipsum — use meaningful label text
- Accessibility panel must show no violations for each story
