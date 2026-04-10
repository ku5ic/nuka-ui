import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "@nuka/components/Label";
import { Input } from "@nuka/components/Input";
import { Stack } from "@nuka/components/Stack";

const meta = {
  title: "Forms/Structure/Label",
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
    <Stack gap="xs" className="w-(--size-xs)">
      <Label htmlFor="email-input" required>
        Email address
      </Label>
      <Input
        id="email-input"
        type="email"
        placeholder="you@example.com"
        aria-required="true"
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Stack gap="xs">
  <Label htmlFor="email-input" required>
    Email address
  </Label>
  <Input
    id="email-input"
    type="email"
    placeholder="you@example.com"
    aria-required="true"
  />
</Stack>
        `.trim(),
      },
    },
  },
};
