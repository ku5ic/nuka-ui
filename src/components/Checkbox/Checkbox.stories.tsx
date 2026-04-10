import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "@nuka/components/Checkbox";
import { FormField } from "@nuka/components/FormField";
import { Label } from "@nuka/components/Label";
import { Stack } from "@nuka/components/Stack";

const meta = {
  title: "Forms/Inputs/Checkbox",
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
  parameters: {
    docs: {
      source: {
        code: `
<Stack direction="row" gap="lg" align="center">
  <Checkbox defaultChecked intent="default">Default</Checkbox>
  <Checkbox defaultChecked intent="danger">Danger</Checkbox>
  <Checkbox defaultChecked intent="success">Success</Checkbox>
  <Checkbox defaultChecked intent="warning">Warning</Checkbox>
</Stack>
        `.trim(),
      },
    },
  },
  render: () => (
    <Stack direction="row" gap="lg" align="center">
      <Checkbox defaultChecked intent="default">
        Default
      </Checkbox>
      <Checkbox defaultChecked intent="danger">
        Danger
      </Checkbox>
      <Checkbox defaultChecked intent="success">
        Success
      </Checkbox>
      <Checkbox defaultChecked intent="warning">
        Warning
      </Checkbox>
    </Stack>
  ),
};

export const AllSizes: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Stack direction="row" gap="lg" align="end">
  <Checkbox defaultChecked size="sm">Small</Checkbox>
  <Checkbox defaultChecked size="md">Medium</Checkbox>
  <Checkbox defaultChecked size="lg">Large</Checkbox>
</Stack>
        `.trim(),
      },
    },
  },
  render: () => (
    <Stack direction="row" gap="lg" align="end">
      <Checkbox defaultChecked size="sm">
        Small
      </Checkbox>
      <Checkbox defaultChecked size="md">
        Medium
      </Checkbox>
      <Checkbox defaultChecked size="lg">
        Large
      </Checkbox>
    </Stack>
  ),
};

export const Disabled: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Stack direction="row" gap="lg" align="center">
  <Checkbox disabled>Unchecked disabled</Checkbox>
  <Checkbox disabled defaultChecked>Checked disabled</Checkbox>
</Stack>
        `.trim(),
      },
    },
  },
  render: () => (
    <Stack direction="row" gap="lg" align="center">
      <Checkbox disabled>Unchecked disabled</Checkbox>
      <Checkbox disabled defaultChecked>
        Checked disabled
      </Checkbox>
    </Stack>
  ),
};

export const InFormField: Story = {
  name: "Pattern: In FormField",
  parameters: {
    docs: {
      source: {
        code: `
<FormField id="newsletter" error="You must subscribe to continue">
  <Checkbox intent="danger">Subscribe to newsletter</Checkbox>
</FormField>
        `.trim(),
      },
    },
  },
  render: () => (
    <FormField id="newsletter" error="You must subscribe to continue">
      <Checkbox intent="danger">Subscribe to newsletter</Checkbox>
    </FormField>
  ),
};

export const TermsAcceptance: Story = {
  name: "Pattern: Terms Acceptance",
  parameters: {
    docs: {
      source: {
        code: `
<div className="max-w-sm">
  <FormField id="terms" required>
    <Stack gap="sm">
      <Checkbox>I agree to the Terms of Service and Privacy Policy</Checkbox>
      <Checkbox>I want to receive marketing emails (optional)</Checkbox>
      <Label htmlFor="terms" className="sr-only">Terms agreement</Label>
    </Stack>
  </FormField>
</div>
        `.trim(),
      },
    },
  },
  render: () => (
    <div className="max-w-sm">
      <FormField id="terms" required>
        <Stack gap="sm">
          <Checkbox>
            I agree to the Terms of Service and Privacy Policy
          </Checkbox>
          <Checkbox>I want to receive marketing emails (optional)</Checkbox>
          <Label htmlFor="terms" className="sr-only">
            Terms agreement
          </Label>
        </Stack>
      </FormField>
    </div>
  ),
};
