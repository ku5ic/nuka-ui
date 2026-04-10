import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@nuka/components/Input";
import { Label } from "@nuka/components/Label";
import { Stack } from "@nuka/components/Stack";
import { Text } from "@nuka/components/Text";

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
  parameters: {
    docs: {
      source: {
        code: `
<Stack gap="md" className="w-80">
  <Stack gap="xs">
    <Label htmlFor="default-input">Default</Label>
    <Input id="default-input" intent="default" placeholder="Default intent" />
  </Stack>
  <Stack gap="xs">
    <Label htmlFor="danger-input">Danger</Label>
    <Input id="danger-input" intent="danger" placeholder="Danger intent" />
  </Stack>
  <Stack gap="xs">
    <Label htmlFor="success-input">Success</Label>
    <Input id="success-input" intent="success" placeholder="Success intent" />
  </Stack>
  <Stack gap="xs">
    <Label htmlFor="warning-input">Warning</Label>
    <Input id="warning-input" intent="warning" placeholder="Warning intent" />
  </Stack>
</Stack>
        `.trim(),
      },
    },
  },
  render: () => (
    <Stack gap="md" className="w-80">
      <Stack gap="xs">
        <Label htmlFor="default-input">Default</Label>
        <Input
          id="default-input"
          intent="default"
          placeholder="Default intent"
        />
      </Stack>
      <Stack gap="xs">
        <Label htmlFor="danger-input">Danger</Label>
        <Input id="danger-input" intent="danger" placeholder="Danger intent" />
      </Stack>
      <Stack gap="xs">
        <Label htmlFor="success-input">Success</Label>
        <Input
          id="success-input"
          intent="success"
          placeholder="Success intent"
        />
      </Stack>
      <Stack gap="xs">
        <Label htmlFor="warning-input">Warning</Label>
        <Input
          id="warning-input"
          intent="warning"
          placeholder="Warning intent"
        />
      </Stack>
    </Stack>
  ),
};

export const AllSizes: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Stack gap="md" className="w-80">
  <Stack gap="xs">
    <Label htmlFor="sm-input">Small</Label>
    <Input id="sm-input" size="sm" placeholder="Small input" />
  </Stack>
  <Stack gap="xs">
    <Label htmlFor="md-input">Medium</Label>
    <Input id="md-input" size="md" placeholder="Medium input" />
  </Stack>
  <Stack gap="xs">
    <Label htmlFor="lg-input">Large</Label>
    <Input id="lg-input" size="lg" placeholder="Large input" />
  </Stack>
</Stack>
        `.trim(),
      },
    },
  },
  render: () => (
    <Stack gap="md" className="w-80">
      <Stack gap="xs">
        <Label htmlFor="sm-input">Small</Label>
        <Input id="sm-input" size="sm" placeholder="Small input" />
      </Stack>
      <Stack gap="xs">
        <Label htmlFor="md-input">Medium</Label>
        <Input id="md-input" size="md" placeholder="Medium input" />
      </Stack>
      <Stack gap="xs">
        <Label htmlFor="lg-input">Large</Label>
        <Input id="lg-input" size="lg" placeholder="Large input" />
      </Stack>
    </Stack>
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
  parameters: {
    docs: {
      source: {
        code: `
<Stack gap="xs" className="w-80">
  <Label htmlFor="error-input" required>Email address</Label>
  <Input
    id="error-input"
    intent="danger"
    placeholder="you@example.com"
    aria-required="true"
    aria-describedby="error-message"
  />
  <Text id="error-message" size="sm" className="text-(--nuka-danger-text)">
    Please enter a valid email address.
  </Text>
</Stack>
        `.trim(),
      },
    },
  },
  render: () => (
    <Stack gap="xs" className="w-80">
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
      <Text id="error-message" size="sm" className="text-(--nuka-danger-text)">
        Please enter a valid email address.
      </Text>
    </Stack>
  ),
};

export const FormRow: Story = {
  name: "Pattern: Form Row",
  parameters: {
    docs: {
      source: {
        code: `
<Stack gap="xs" className="w-80">
  <Label htmlFor="name-input">Full name</Label>
  <Input id="name-input" placeholder="Jane Doe" />
  <Text size="xs" color="muted">Enter your first and last name.</Text>
</Stack>
        `.trim(),
      },
    },
  },
  render: () => (
    <Stack gap="xs" className="w-80">
      <Label htmlFor="name-input">Full name</Label>
      <Input id="name-input" placeholder="Jane Doe" />
      <Text size="xs" color="muted">
        Enter your first and last name.
      </Text>
    </Stack>
  ),
};
