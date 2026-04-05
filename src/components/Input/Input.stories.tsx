import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@nuka/components/Input";
import { Label } from "@nuka/components/Label";

const meta = {
  title: "Forms/Inputs/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
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
    readOnly: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const AllIntents: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "20rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
        <Label htmlFor="default-input">Default</Label>
        <Input id="default-input" intent="default" placeholder="Default intent" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
        <Label htmlFor="danger-input">Danger</Label>
        <Input id="danger-input" intent="danger" placeholder="Danger intent" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
        <Label htmlFor="success-input">Success</Label>
        <Input id="success-input" intent="success" placeholder="Success intent" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
        <Label htmlFor="warning-input">Warning</Label>
        <Input id="warning-input" intent="warning" placeholder="Warning intent" />
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "20rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
        <Label htmlFor="sm-input">Small</Label>
        <Input id="sm-input" size="sm" placeholder="Small input" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
        <Label htmlFor="md-input">Medium</Label>
        <Input id="md-input" size="md" placeholder="Medium input" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
        <Label htmlFor="lg-input">Large</Label>
        <Input id="lg-input" size="lg" placeholder="Large input" />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    value: "Read-only value",
    readOnly: true,
  },
};

export const WithError: Story = {
  name: "Pattern: With Error",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem", width: "20rem" }}>
      <Label htmlFor="error-input" required>
        Email address
      </Label>
      <Input
        id="error-input"
        intent="danger"
        placeholder="you@example.com"
        aria-required="true"
        aria-describedby="error-message"
      />
      <p
        id="error-message"
        style={{ fontSize: "0.875rem", color: "var(--nuka-danger-text)", margin: 0 }}
      >
        Please enter a valid email address.
      </p>
    </div>
  ),
};

export const FormRow: Story = {
  name: "Pattern: Form Row",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem", width: "20rem" }}>
      <Label htmlFor="name-input">Full name</Label>
      <Input id="name-input" placeholder="Jane Doe" />
      <p style={{ fontSize: "0.75rem", color: "var(--nuka-text-muted)", margin: 0 }}>
        Enter your first and last name.
      </p>
    </div>
  ),
};
