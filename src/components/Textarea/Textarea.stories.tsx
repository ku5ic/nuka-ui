import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "@vault/components/Textarea";
import { Label } from "@vault/components/Label";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
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
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
    rows: 4,
  },
};

export const AllIntents: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "20rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
        <Label htmlFor="default-textarea">Default</Label>
        <Textarea id="default-textarea" intent="default" placeholder="Default intent" rows={3} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
        <Label htmlFor="danger-textarea">Danger</Label>
        <Textarea id="danger-textarea" intent="danger" placeholder="Danger intent" rows={3} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
        <Label htmlFor="success-textarea">Success</Label>
        <Textarea id="success-textarea" intent="success" placeholder="Success intent" rows={3} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
        <Label htmlFor="warning-textarea">Warning</Label>
        <Textarea id="warning-textarea" intent="warning" placeholder="Warning intent" rows={3} />
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "20rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
        <Label htmlFor="sm-textarea">Small</Label>
        <Textarea id="sm-textarea" size="sm" placeholder="Small textarea" rows={3} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
        <Label htmlFor="md-textarea">Medium</Label>
        <Textarea id="md-textarea" size="md" placeholder="Medium textarea" rows={3} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
        <Label htmlFor="lg-textarea">Large</Label>
        <Textarea id="lg-textarea" size="lg" placeholder="Large textarea" rows={3} />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled textarea",
    disabled: true,
    rows: 4,
  },
};

export const ReadOnly: Story = {
  args: {
    value: "This content is read-only and cannot be edited.",
    readOnly: true,
    rows: 4,
  },
};

export const WithError: Story = {
  name: "Pattern: With Error",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem", width: "20rem" }}>
      <Label htmlFor="error-textarea" required>
        Description
      </Label>
      <Textarea
        id="error-textarea"
        intent="danger"
        placeholder="Describe the issue..."
        rows={4}
        aria-required="true"
        aria-describedby="textarea-error"
      />
      <p
        id="textarea-error"
        style={{ fontSize: "0.875rem", color: "var(--vault-danger-text)", margin: 0 }}
      >
        Description must be at least 20 characters.
      </p>
    </div>
  ),
};

export const MessageField: Story = {
  name: "Pattern: Message Field",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem", width: "24rem" }}>
      <Label htmlFor="message-textarea">Leave a comment</Label>
      <Textarea
        id="message-textarea"
        placeholder="Write your thoughts..."
        rows={5}
      />
      <p style={{ fontSize: "0.75rem", color: "var(--vault-text-muted)", margin: 0 }}>
        Markdown is supported. Be kind and constructive.
      </p>
    </div>
  ),
};
