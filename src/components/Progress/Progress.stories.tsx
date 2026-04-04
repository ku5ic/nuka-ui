import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "@nuka/components/Progress";

const meta = {
  title: "Components/Progress",
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
    label: "Loading…",
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
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", marginBottom: "0.25rem" }}>
          <span>report.pdf</span>
          <span>100%</span>
        </div>
        <Progress value={100} intent="success" />
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", marginBottom: "0.25rem" }}>
          <span>photo.jpg</span>
          <span>67%</span>
        </div>
        <Progress value={67} />
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", marginBottom: "0.25rem" }}>
          <span>archive.zip</span>
          <span>23%</span>
        </div>
        <Progress value={23} />
      </div>
    </div>
  ),
};

export const StepProgress: Story = {
  name: "Pattern: Step Progress",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", marginBottom: "0.25rem" }}>
          <span>Step 1: Upload</span>
          <span>Complete</span>
        </div>
        <Progress value={100} intent="success" size="sm" />
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", marginBottom: "0.25rem" }}>
          <span>Step 2: Processing</span>
          <span>45%</span>
        </div>
        <Progress value={45} size="sm" />
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", marginBottom: "0.25rem" }}>
          <span>Step 3: Publish</span>
          <span>Not started</span>
        </div>
        <Progress value={0} size="sm" />
      </div>
    </div>
  ),
};
