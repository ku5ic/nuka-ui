import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@nuka/components/Button";
import { Stack } from "@nuka/components/Stack";

const meta = {
  title: "Actions/Button",
  component: Button,
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
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    intent: "default",
    size: "md",
    children: "Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    intent: "default",
    size: "md",
    children: "Button",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    intent: "default",
    size: "md",
    children: "Button",
  },
};

export const Ghost: Story = {
  args: { variant: "ghost", intent: "default", size: "md", children: "Button" },
};

export const Link: Story = {
  args: { variant: "link", intent: "default", size: "md", children: "Button" },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    intent: "default",
    size: "md",
    children: "Button",
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <Stack direction="row" align="center" gap="md">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Stack direction="row" align="center" gap="md">
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="link">Link</Button>
</Stack>
        `.trim(),
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <Stack direction="row" align="end" gap="md">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Stack direction="row" align="end" gap="md">
  <Button size="sm">Small</Button>
  <Button size="md">Medium</Button>
  <Button size="lg">Large</Button>
</Stack>
        `.trim(),
      },
    },
  },
};

export const IntentDanger: Story = {
  render: () => (
    <Stack direction="row" align="center" gap="md">
      <Button variant="primary" intent="danger">
        Primary
      </Button>
      <Button variant="secondary" intent="danger">
        Secondary
      </Button>
      <Button variant="outline" intent="danger">
        Outline
      </Button>
      <Button variant="ghost" intent="danger">
        Ghost
      </Button>
      <Button variant="link" intent="danger">
        Link
      </Button>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Stack direction="row" align="center" gap="md">
  <Button variant="primary" intent="danger">Primary</Button>
  <Button variant="secondary" intent="danger">Secondary</Button>
  <Button variant="outline" intent="danger">Outline</Button>
  <Button variant="ghost" intent="danger">Ghost</Button>
  <Button variant="link" intent="danger">Link</Button>
</Stack>
        `.trim(),
      },
    },
  },
};

export const IntentSuccess: Story = {
  render: () => (
    <Stack direction="row" align="center" gap="md">
      <Button variant="primary" intent="success">
        Primary
      </Button>
      <Button variant="secondary" intent="success">
        Secondary
      </Button>
      <Button variant="outline" intent="success">
        Outline
      </Button>
      <Button variant="ghost" intent="success">
        Ghost
      </Button>
      <Button variant="link" intent="success">
        Link
      </Button>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Stack direction="row" align="center" gap="md">
  <Button variant="primary" intent="success">Primary</Button>
  <Button variant="secondary" intent="success">Secondary</Button>
  <Button variant="outline" intent="success">Outline</Button>
  <Button variant="ghost" intent="success">Ghost</Button>
  <Button variant="link" intent="success">Link</Button>
</Stack>
        `.trim(),
      },
    },
  },
};

export const IntentWarning: Story = {
  render: () => (
    <Stack direction="row" align="center" gap="md">
      <Button variant="primary" intent="warning">
        Primary
      </Button>
      <Button variant="secondary" intent="warning">
        Secondary
      </Button>
      <Button variant="outline" intent="warning">
        Outline
      </Button>
      <Button variant="ghost" intent="warning">
        Ghost
      </Button>
      <Button variant="link" intent="warning">
        Link
      </Button>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Stack direction="row" align="center" gap="md">
  <Button variant="primary" intent="warning">Primary</Button>
  <Button variant="secondary" intent="warning">Secondary</Button>
  <Button variant="outline" intent="warning">Outline</Button>
  <Button variant="ghost" intent="warning">Ghost</Button>
  <Button variant="link" intent="warning">Link</Button>
</Stack>
        `.trim(),
      },
    },
  },
};

export const ConfirmationDialog: Story = {
  name: "Pattern: Confirmation Dialog",
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <Button variant="ghost">Cancel</Button>
      <Button variant="ghost" intent="danger">
        Delete
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Button variant="ghost">Cancel</Button>
<Button variant="ghost" intent="danger">Delete</Button>
        `.trim(),
      },
    },
  },
};
