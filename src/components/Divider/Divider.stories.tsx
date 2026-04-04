import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "@nuka/components/Divider";

const meta = {
  title: "Components/Divider",
  component: Divider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    label: {
      control: "text",
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: "24rem" }}>
        <Story />
      </div>
    ),
  ],
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", height: "2rem" }}>
      <span>Left</span>
      <Divider {...args} />
      <span>Right</span>
    </div>
  ),
};

export const WithLabel: Story = {
  args: {
    label: "or",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "24rem" }}>
        <Story />
      </div>
    ),
  ],
};

export const Small: Story = {
  args: {
    size: "sm",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "24rem" }}>
        <Story />
      </div>
    ),
  ],
};

export const Medium: Story = {
  args: {
    size: "md",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "24rem" }}>
        <Story />
      </div>
    ),
  ],
};

export const Large: Story = {
  args: {
    size: "lg",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "24rem" }}>
        <Story />
      </div>
    ),
  ],
};

export const AllOrientations: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "2rem", alignItems: "stretch" }}>
      <div style={{ width: "16rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <span style={{ fontSize: "0.875rem", color: "var(--nuka-text-muted)" }}>Horizontal</span>
        <Divider />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ fontSize: "0.875rem", color: "var(--nuka-text-muted)" }}>Vertical</span>
        <Divider orientation="vertical" />
        <span style={{ fontSize: "0.875rem", color: "var(--nuka-text-muted)" }}>between</span>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ width: "24rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <span style={{ fontSize: "0.75rem", color: "var(--nuka-text-muted)" }}>sm (1px)</span>
        <Divider size="sm" style={{ marginTop: "0.5rem" }} />
      </div>
      <div>
        <span style={{ fontSize: "0.75rem", color: "var(--nuka-text-muted)" }}>md (1px, default)</span>
        <Divider size="md" style={{ marginTop: "0.5rem" }} />
      </div>
      <div>
        <span style={{ fontSize: "0.75rem", color: "var(--nuka-text-muted)" }}>lg (2px)</span>
        <Divider size="lg" style={{ marginTop: "0.5rem" }} />
      </div>
    </div>
  ),
};

export const PatternSectionSeparator: Story = {
  name: "Pattern: Section separator",
  render: () => (
    <div
      style={{
        maxWidth: "24rem",
        padding: "1.5rem",
        border: "1px solid var(--nuka-border-base)",
        borderRadius: "var(--radius-lg)",
        backgroundColor: "var(--nuka-bg-base)",
      }}
    >
      <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 600 }}>Account settings</h3>
      <p style={{ margin: "0.5rem 0 0", fontSize: "0.875rem", color: "var(--nuka-text-muted)" }}>
        Manage your profile and preferences.
      </p>
      <Divider style={{ margin: "1rem 0" }} />
      <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 600 }}>Danger zone</h3>
      <p style={{ margin: "0.5rem 0 0", fontSize: "0.875rem", color: "var(--nuka-text-muted)" }}>
        Irreversible actions like account deletion.
      </p>
    </div>
  ),
};

export const PatternLabeledDivider: Story = {
  name: "Pattern: Labeled divider",
  render: () => (
    <div style={{ maxWidth: "20rem" }}>
      <button
        type="button"
        style={{
          width: "100%",
          padding: "0.625rem 1rem",
          fontSize: "0.875rem",
          fontWeight: 500,
          border: "1px solid var(--nuka-border-base)",
          borderRadius: "var(--radius-md)",
          backgroundColor: "var(--nuka-bg-base)",
          cursor: "pointer",
        }}
      >
        Continue with Google
      </button>
      <Divider label="or" style={{ margin: "1.25rem 0" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <input
          type="email"
          placeholder="Email"
          style={{
            width: "100%",
            padding: "0.625rem 0.75rem",
            fontSize: "0.875rem",
            border: "1px solid var(--nuka-border-base)",
            borderRadius: "var(--radius-md)",
            backgroundColor: "var(--nuka-bg-base)",
            boxSizing: "border-box",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          style={{
            width: "100%",
            padding: "0.625rem 0.75rem",
            fontSize: "0.875rem",
            border: "1px solid var(--nuka-border-base)",
            borderRadius: "var(--radius-md)",
            backgroundColor: "var(--nuka-bg-base)",
            boxSizing: "border-box",
          }}
        />
      </div>
    </div>
  ),
};

export const PatternVerticalInNav: Story = {
  name: "Pattern: Vertical in nav",
  render: () => (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0.5rem 1rem",
        border: "1px solid var(--nuka-border-base)",
        borderRadius: "var(--radius-md)",
        backgroundColor: "var(--nuka-bg-base)",
        fontSize: "0.875rem",
      }}
    >
      <span style={{ fontWeight: 500 }}>Home</span>
      <span>Projects</span>
      <Divider orientation="vertical" style={{ height: "1.25rem" }} />
      <span style={{ color: "var(--nuka-text-muted)" }}>Settings</span>
      <span style={{ color: "var(--nuka-text-muted)" }}>Help</span>
    </nav>
  ),
};
