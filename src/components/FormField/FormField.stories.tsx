import type { Meta, StoryObj } from "@storybook/react";
import { FormField } from "@nuka/components/FormField";
import { Label } from "@nuka/components/Label";
import { Input } from "@nuka/components/Input";
import { Textarea } from "@nuka/components/Textarea";

const meta = {
  title: "Components/FormField",
  component: FormField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    error: {
      control: "text",
    },
    hint: {
      control: "text",
    },
    required: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: "20rem" }}>
      <FormField {...args}>
        <Label>Email</Label>
        <Input placeholder="you@example.com" />
      </FormField>
    </div>
  ),
};

export const WithHint: Story = {
  args: {
    hint: "We'll never share your email with anyone.",
  },
  render: (args) => (
    <div style={{ width: "20rem" }}>
      <FormField {...args}>
        <Label>Email</Label>
        <Input placeholder="you@example.com" />
      </FormField>
    </div>
  ),
};

export const WithError: Story = {
  args: {
    error: "Please enter a valid email address.",
  },
  render: (args) => (
    <div style={{ width: "20rem" }}>
      <FormField {...args}>
        <Label>Email</Label>
        <Input intent="danger" placeholder="you@example.com" />
      </FormField>
    </div>
  ),
};

export const Required: Story = {
  args: {
    required: true,
  },
  render: (args) => (
    <div style={{ width: "20rem" }}>
      <FormField {...args}>
        <Label>Email</Label>
        <Input placeholder="you@example.com" />
      </FormField>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <div style={{ width: "20rem" }}>
      <FormField {...args}>
        <Label>Email</Label>
        <Input placeholder="you@example.com" disabled />
      </FormField>
    </div>
  ),
};

export const AllStates: Story = {
  name: "All States",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", width: "20rem" }}>
      <FormField>
        <Label>Default</Label>
        <Input placeholder="Default field" />
      </FormField>

      <FormField hint="This is a helpful hint.">
        <Label>With hint</Label>
        <Input placeholder="Field with hint" />
      </FormField>

      <FormField error="This field is required.">
        <Label>With error</Label>
        <Input intent="danger" placeholder="Field with error" />
      </FormField>

      <FormField required>
        <Label>Required</Label>
        <Input placeholder="Required field" />
      </FormField>
    </div>
  ),
};

export const WithTextarea: Story = {
  name: "Pattern: With Textarea",
  render: () => (
    <div style={{ width: "20rem" }}>
      <FormField hint="Max 500 characters." required>
        <Label>Message</Label>
        <Textarea placeholder="Type your message..." rows={4} />
      </FormField>
    </div>
  ),
};

export const LoginForm: Story = {
  name: "Pattern: Login Form",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "20rem" }}>
      <FormField required>
        <Label>Email address</Label>
        <Input type="email" placeholder="you@example.com" />
      </FormField>

      <FormField required error="Password must be at least 8 characters.">
        <Label>Password</Label>
        <Input type="password" intent="danger" placeholder="Enter password" />
      </FormField>
    </div>
  ),
};
