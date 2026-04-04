import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "@vault/components/Label";
import { Input } from "@vault/components/Input";

const meta = {
  title: "Components/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    required: {
      control: "boolean",
    },
    htmlFor: {
      control: "text",
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Email address",
    htmlFor: "email",
  },
};

export const Required: Story = {
  args: {
    children: "Email address",
    htmlFor: "email",
    required: true,
  },
};

export const WithInput: Story = {
  name: "Pattern: With Input",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem", width: "20rem" }}>
      <Label htmlFor="email-input" required>
        Email address
      </Label>
      <Input id="email-input" type="email" placeholder="you@example.com" aria-required="true" />
    </div>
  ),
};
