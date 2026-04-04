import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@nuka/components/Button";

const meta = {
  title: "Components/Button",
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
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "flex-end" }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const IntentDanger: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
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
    </div>
  ),
};

export const IntentSuccess: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
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
    </div>
  ),
};

export const IntentWarning: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
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
    </div>
  ),
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
};
