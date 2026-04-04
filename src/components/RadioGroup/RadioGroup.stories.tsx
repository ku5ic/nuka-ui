import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "@vault/components/RadioGroup/RadioGroup";
import { Radio } from "@vault/components/RadioGroup/Radio";
import { FormField } from "@vault/components/FormField";
import { Label } from "@vault/components/Label";

const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["vertical", "horizontal"],
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "fruit",
    "aria-label": "Fruit",
    children: undefined,
  },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="apple">Apple</Radio>
      <Radio value="banana">Banana</Radio>
      <Radio value="cherry">Cherry</Radio>
    </RadioGroup>
  ),
};

export const WithDefault: Story = {
  args: { name: "fruit", children: null },
  render: () => (
    <RadioGroup name="fruit" defaultValue="banana" aria-label="Fruit">
      <Radio value="apple">Apple</Radio>
      <Radio value="banana">Banana</Radio>
      <Radio value="cherry">Cherry</Radio>
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  args: { name: "fruit", children: null },
  render: () => (
    <RadioGroup name="fruit" orientation="horizontal" aria-label="Fruit">
      <Radio value="apple">Apple</Radio>
      <Radio value="banana">Banana</Radio>
      <Radio value="cherry">Cherry</Radio>
    </RadioGroup>
  ),
};

export const AllSizes: Story = {
  args: { name: "size", children: null },
  render: () => (
    <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
      <RadioGroup name="sm" defaultValue="a" aria-label="Small">
        <Radio value="a" size="sm">Small A</Radio>
        <Radio value="b" size="sm">Small B</Radio>
      </RadioGroup>
      <RadioGroup name="md" defaultValue="a" aria-label="Medium">
        <Radio value="a" size="md">Medium A</Radio>
        <Radio value="b" size="md">Medium B</Radio>
      </RadioGroup>
      <RadioGroup name="lg" defaultValue="a" aria-label="Large">
        <Radio value="a" size="lg">Large A</Radio>
        <Radio value="b" size="lg">Large B</Radio>
      </RadioGroup>
    </div>
  ),
};

export const Disabled: Story = {
  args: { name: "fruit", children: null },
  render: () => (
    <RadioGroup name="fruit" defaultValue="banana" disabled aria-label="Fruit">
      <Radio value="apple">Apple</Radio>
      <Radio value="banana">Banana</Radio>
      <Radio value="cherry">Cherry</Radio>
    </RadioGroup>
  ),
};

export const DisabledOption: Story = {
  name: "Disabled Option",
  args: { name: "fruit", children: null },
  render: () => (
    <RadioGroup name="fruit" aria-label="Fruit">
      <Radio value="apple">Apple</Radio>
      <Radio value="banana" disabled>Banana (sold out)</Radio>
      <Radio value="cherry">Cherry</Radio>
    </RadioGroup>
  ),
};

export const InFormField: Story = {
  name: "Pattern: In FormField",
  args: { name: "plan", children: null },
  render: () => (
    <FormField id="plan" error="Please select a plan" required>
      <Label>Select a plan</Label>
      <RadioGroup name="plan" aria-label="Plan">
        <Radio value="free">Free</Radio>
        <Radio value="pro">Pro</Radio>
        <Radio value="enterprise">Enterprise</Radio>
      </RadioGroup>
    </FormField>
  ),
};

export const PaymentMethod: Story = {
  name: "Pattern: Payment Method",
  args: { name: "payment", children: null },
  render: () => (
    <div style={{ maxWidth: "20rem" }}>
      <FormField id="payment">
        <Label>Payment method</Label>
        <RadioGroup name="payment" defaultValue="card" aria-label="Payment method">
          <Radio value="card">Credit or debit card</Radio>
          <Radio value="paypal">PayPal</Radio>
          <Radio value="bank">Bank transfer</Radio>
          <Radio value="crypto">Cryptocurrency</Radio>
        </RadioGroup>
      </FormField>
    </div>
  ),
};
