import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@nuka/components/Badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "subtle", "outline"],
    },
    intent: {
      control: "select",
      options: ["default", "danger", "success", "warning"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    asChild: {
      control: false,
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Solid: Story = {
  args: {
    variant: "solid",
    intent: "default",
    size: "md",
    children: "Badge",
  },
};

export const Subtle: Story = {
  args: {
    variant: "subtle",
    intent: "default",
    size: "md",
    children: "Badge",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    intent: "default",
    size: "md",
    children: "Badge",
  },
};

export const DangerIntent: Story = {
  args: {
    variant: "solid",
    intent: "danger",
    size: "md",
    children: "Danger",
  },
};

export const SuccessIntent: Story = {
  args: {
    variant: "solid",
    intent: "success",
    size: "md",
    children: "Success",
  },
};

export const WarningIntent: Story = {
  args: {
    variant: "solid",
    intent: "warning",
    size: "md",
    children: "Warning",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, auto)",
        gap: "0.75rem",
        alignItems: "center",
      }}
    >
      {/* Header row */}
      <span />
      <span style={{ fontSize: "0.75rem", color: "#666" }}>Default</span>
      <span style={{ fontSize: "0.75rem", color: "#666" }}>Danger</span>
      <span style={{ fontSize: "0.75rem", color: "#666" }}>Success</span>
      <span style={{ fontSize: "0.75rem", color: "#666" }}>Warning</span>

      {/* Solid */}
      <span style={{ fontSize: "0.75rem", color: "#666" }}>Solid</span>
      <Badge variant="solid" intent="default">
        Default
      </Badge>
      <Badge variant="solid" intent="danger">
        Danger
      </Badge>
      <Badge variant="solid" intent="success">
        Success
      </Badge>
      <Badge variant="solid" intent="warning">
        Warning
      </Badge>

      {/* Subtle */}
      <span style={{ fontSize: "0.75rem", color: "#666" }}>Subtle</span>
      <Badge variant="subtle" intent="default">
        Default
      </Badge>
      <Badge variant="subtle" intent="danger">
        Danger
      </Badge>
      <Badge variant="subtle" intent="success">
        Success
      </Badge>
      <Badge variant="subtle" intent="warning">
        Warning
      </Badge>

      {/* Outline */}
      <span style={{ fontSize: "0.75rem", color: "#666" }}>Outline</span>
      <Badge variant="outline" intent="default">
        Default
      </Badge>
      <Badge variant="outline" intent="danger">
        Danger
      </Badge>
      <Badge variant="outline" intent="success">
        Success
      </Badge>
      <Badge variant="outline" intent="warning">
        Warning
      </Badge>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

export const WithIcon: Story = {
  name: "Pattern: With Icon",
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
      <Badge variant="solid" intent="success">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          style={{ marginRight: "0.25rem" }}
        >
          <path
            d="M10 3L4.5 8.5L2 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Verified
      </Badge>
      <Badge variant="subtle" intent="danger">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          style={{ marginRight: "0.25rem" }}
        >
          <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        Error
      </Badge>
    </div>
  ),
};

export const AsChild: Story = {
  name: "Pattern: As Child",
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
      <Badge asChild variant="subtle" intent="default">
        <abbr title="Work in Progress">WIP</abbr>
      </Badge>
      <Badge asChild variant="outline" intent="success">
        <a href="#stable" style={{ textDecoration: "none" }}>
          v2.0 Stable
        </a>
      </Badge>
    </div>
  ),
};
