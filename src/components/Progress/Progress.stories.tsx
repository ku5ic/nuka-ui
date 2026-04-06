import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "@nuka/components/Progress";
import { Text } from "@nuka/components/Text";
import { Stack } from "@nuka/components/Stack";

const meta = {
  title: "Feedback/Progress",
  component: Progress,
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
    value: {
      control: { type: "range", min: 0, max: 100 },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 60,
  },
};

export const Determinate: Story = {
  args: {
    value: 45,
    label: "Loading content",
  },
};

export const Indeterminate: Story = {
  args: {
    label: "Loading...",
  },
};

export const IntentDanger: Story = {
  name: "Intent: Danger",
  args: {
    value: 75,
    intent: "danger",
  },
};

export const IntentSuccess: Story = {
  name: "Intent: Success",
  args: {
    value: 75,
    intent: "success",
  },
};

export const IntentWarning: Story = {
  name: "Intent: Warning",
  args: {
    value: 75,
    intent: "warning",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>
        <p style={{ fontSize: "0.75rem", marginBottom: "0.25rem" }}>Small</p>
        <Progress size="sm" value={60} />
      </div>
      <div>
        <p style={{ fontSize: "0.75rem", marginBottom: "0.25rem" }}>Medium</p>
        <Progress size="md" value={60} />
      </div>
      <div>
        <p style={{ fontSize: "0.75rem", marginBottom: "0.25rem" }}>Large</p>
        <Progress size="lg" value={60} />
      </div>
    </div>
  ),
};

export const FileUpload: Story = {
  name: "Pattern: File Upload",
  render: () => (
    <Stack gap="md">
      <div>
        <Stack direction="row" justify="between" style={{ marginBottom: "0.25rem" }}>
          <Text size="sm">report.pdf</Text>
          <Text size="sm">100%</Text>
        </Stack>
        <Progress value={100} intent="success" />
      </div>
      <div>
        <Stack direction="row" justify="between" style={{ marginBottom: "0.25rem" }}>
          <Text size="sm">photo.jpg</Text>
          <Text size="sm">67%</Text>
        </Stack>
        <Progress value={67} />
      </div>
      <div>
        <Stack direction="row" justify="between" style={{ marginBottom: "0.25rem" }}>
          <Text size="sm">archive.zip</Text>
          <Text size="sm">23%</Text>
        </Stack>
        <Progress value={23} />
      </div>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Stack gap="md">
  <div>
    <Stack direction="row" justify="between">
      <Text size="sm">report.pdf</Text>
      <Text size="sm">100%</Text>
    </Stack>
    <Progress value={100} intent="success" />
  </div>
  {/* ...more files */}
</Stack>
        `.trim(),
      },
    },
  },
};

export const StepProgress: Story = {
  name: "Pattern: Step Progress",
  render: () => (
    <Stack gap="md">
      <div>
        <Stack direction="row" justify="between" style={{ marginBottom: "0.25rem" }}>
          <Text size="sm">Step 1: Upload</Text>
          <Text size="sm">Complete</Text>
        </Stack>
        <Progress value={100} intent="success" size="sm" />
      </div>
      <div>
        <Stack direction="row" justify="between" style={{ marginBottom: "0.25rem" }}>
          <Text size="sm">Step 2: Processing</Text>
          <Text size="sm">45%</Text>
        </Stack>
        <Progress value={45} size="sm" />
      </div>
      <div>
        <Stack direction="row" justify="between" style={{ marginBottom: "0.25rem" }}>
          <Text size="sm">Step 3: Publish</Text>
          <Text size="sm">Not started</Text>
        </Stack>
        <Progress value={0} size="sm" />
      </div>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Stack gap="md">
  <div>
    <Stack direction="row" justify="between">
      <Text size="sm">Step 1: Upload</Text>
      <Text size="sm">Complete</Text>
    </Stack>
    <Progress value={100} intent="success" size="sm" />
  </div>
  {/* ...more steps */}
</Stack>
        `.trim(),
      },
    },
  },
};
