import type { Meta, StoryObj } from "@storybook/react";
import { FormField } from "@nuka/components/FormField";
import { Label } from "@nuka/components/Label";
import { Input } from "@nuka/components/Input";
import { Textarea } from "@nuka/components/Textarea";
import { Stack } from "@nuka/components/Stack";

const meta = {
  title: "Forms/Structure/FormField",
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
    <div className="w-80">
      <FormField {...args}>
        <Label>Email</Label>
        <Input placeholder="you@example.com" />
      </FormField>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<FormField>
  <Label>Email</Label>
  <Input placeholder="you@example.com" />
</FormField>
        `.trim(),
      },
    },
  },
};

export const WithHint: Story = {
  args: {
    hint: "We'll never share your email with anyone.",
  },
  render: (args) => (
    <div className="w-80">
      <FormField {...args}>
        <Label>Email</Label>
        <Input placeholder="you@example.com" />
      </FormField>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<FormField hint="We'll never share your email with anyone.">
  <Label>Email</Label>
  <Input placeholder="you@example.com" />
</FormField>
        `.trim(),
      },
    },
  },
};

export const WithError: Story = {
  args: {
    error: "Please enter a valid email address.",
  },
  render: (args) => (
    <div className="w-80">
      <FormField {...args}>
        <Label>Email</Label>
        <Input intent="danger" placeholder="you@example.com" />
      </FormField>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<FormField error="Please enter a valid email address.">
  <Label>Email</Label>
  <Input intent="danger" placeholder="you@example.com" />
</FormField>
        `.trim(),
      },
    },
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
  render: (args) => (
    <div className="w-80">
      <FormField {...args}>
        <Label>Email</Label>
        <Input placeholder="you@example.com" />
      </FormField>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<FormField required>
  <Label>Email</Label>
  <Input placeholder="you@example.com" />
</FormField>
        `.trim(),
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <div className="w-80">
      <FormField {...args}>
        <Label>Email</Label>
        <Input placeholder="you@example.com" disabled />
      </FormField>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<FormField disabled>
  <Label>Email</Label>
  <Input placeholder="you@example.com" disabled />
</FormField>
        `.trim(),
      },
    },
  },
};

export const AllStates: Story = {
  name: "All States",
  render: () => (
    <Stack gap="lg" className="w-80">
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
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Stack gap="lg" className="w-80">
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
</Stack>
        `.trim(),
      },
    },
  },
};

export const WithTextarea: Story = {
  name: "Pattern: With Textarea",
  render: () => (
    <div className="w-80">
      <FormField hint="Max 500 characters." required>
        <Label>Message</Label>
        <Textarea placeholder="Type your message..." rows={4} />
      </FormField>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<FormField hint="Max 500 characters." required>
  <Label>Message</Label>
  <Textarea placeholder="Type your message..." rows={4} />
</FormField>
        `.trim(),
      },
    },
  },
};

export const LoginForm: Story = {
  name: "Pattern: Login Form",
  render: () => (
    <Stack gap="md" className="w-80">
      <FormField required>
        <Label>Email address</Label>
        <Input type="email" placeholder="you@example.com" />
      </FormField>

      <FormField required error="Password must be at least 8 characters.">
        <Label>Password</Label>
        <Input type="password" intent="danger" placeholder="Enter password" />
      </FormField>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Stack gap="md" className="w-80">
  <FormField required>
    <Label>Email address</Label>
    <Input type="email" placeholder="you@example.com" />
  </FormField>

  <FormField required error="Password must be at least 8 characters.">
    <Label>Password</Label>
    <Input type="password" intent="danger" placeholder="Enter password" />
  </FormField>
</Stack>
        `.trim(),
      },
    },
  },
};
