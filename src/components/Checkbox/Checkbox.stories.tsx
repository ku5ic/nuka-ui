import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "@nuka/components/Checkbox";
import { FormField } from "@nuka/components/FormField";
import { Label } from "@nuka/components/Label";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
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
    checked: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "aria-label": "Accept",
  },
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
    "aria-label": "Accept",
  },
};

export const WithLabel: Story = {
  args: {
    children: "I agree to the terms and conditions",
  },
};

export const AllIntents: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
      <Checkbox defaultChecked intent="default">Default</Checkbox>
      <Checkbox defaultChecked intent="danger">Danger</Checkbox>
      <Checkbox defaultChecked intent="success">Success</Checkbox>
      <Checkbox defaultChecked intent="warning">Warning</Checkbox>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-end" }}>
      <Checkbox defaultChecked size="sm">Small</Checkbox>
      <Checkbox defaultChecked size="md">Medium</Checkbox>
      <Checkbox defaultChecked size="lg">Large</Checkbox>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
      <Checkbox disabled>Unchecked disabled</Checkbox>
      <Checkbox disabled defaultChecked>Checked disabled</Checkbox>
    </div>
  ),
};

export const InFormField: Story = {
  name: "Pattern: In FormField",
  render: () => (
    <FormField id="newsletter" error="You must subscribe to continue">
      <Checkbox intent="danger">Subscribe to newsletter</Checkbox>
    </FormField>
  ),
};

export const TermsAcceptance: Story = {
  name: "Pattern: Terms Acceptance",
  render: () => (
    <div style={{ maxWidth: "24rem" }}>
      <FormField id="terms" required>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <Checkbox>
            I agree to the Terms of Service and Privacy Policy
          </Checkbox>
          <Checkbox>
            I want to receive marketing emails (optional)
          </Checkbox>
          <Label htmlFor="terms" className="sr-only">
            Terms agreement
          </Label>
        </div>
      </FormField>
    </div>
  ),
};
