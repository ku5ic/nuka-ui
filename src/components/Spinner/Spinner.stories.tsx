import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "@nuka/components/Spinner";
import { Button } from "@nuka/components/Button";

const meta = {
  title: "Feedback/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    color: {
      control: "select",
      options: ["default", "muted", "inverse"],
    },
    label: {
      control: "text",
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SizeSm: Story = {
  name: "Size: sm",
  args: {
    size: "sm",
  },
};

export const SizeMd: Story = {
  name: "Size: md",
  args: {
    size: "md",
  },
};

export const SizeLg: Story = {
  name: "Size: lg",
  args: {
    size: "lg",
  },
};

export const ColorDefault: Story = {
  name: "Color: default",
  args: {
    color: "default",
  },
};

export const ColorMuted: Story = {
  name: "Color: muted",
  args: {
    color: "muted",
  },
};

export const ColorInverse: Story = {
  name: "Color: inverse",
  args: {
    color: "inverse",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: "1.5rem",
          borderRadius: "var(--radius-lg)",
          backgroundColor: "var(--nuka-bg-emphasis)",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <Spinner size="sm" />
        <span style={{ fontSize: "0.75rem", color: "var(--nuka-text-muted)" }}>sm (16px)</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <Spinner size="md" />
        <span style={{ fontSize: "0.75rem", color: "var(--nuka-text-muted)" }}>md (24px)</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <Spinner size="lg" />
        <span style={{ fontSize: "0.75rem", color: "var(--nuka-text-muted)" }}>lg (32px)</span>
      </div>
    </div>
  ),
};

export const WithLabel: Story = {
  args: {
    label: "Loading content",
  },
};

export const AriaHidden: Story = {
  name: "Aria Hidden (embedded)",
  args: {
    "aria-hidden": true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "When embedded inside another component (e.g. a Button), pass `aria-hidden={true}` to suppress the Spinner from the accessibility tree. The parent component should provide its own loading announcement.",
      },
    },
  },
};

export const PatternButtonLoading: Story = {
  name: "Pattern: Button Loading",
  render: () => (
    <Button variant="primary" disabled>
      <Spinner size="sm" color="inverse" aria-hidden={true} />
      Saving…
    </Button>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Button variant="primary" disabled>
  <Spinner size="sm" color="inverse" aria-hidden={true} />
  Saving…
</Button>
        `.trim(),
      },
    },
  },
};

export const PatternPageLoading: Story = {
  name: "Pattern: Page Loading",
  render: () => (
    /* TODO: replace outer div with <Card> once implemented */
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        height: "16rem",
        width: "24rem",
        border: "1px solid var(--nuka-border-base)",
        borderRadius: "var(--radius-lg)",
        backgroundColor: "var(--nuka-bg-base)",
      }}
    >
      <Spinner size="lg" label="Loading page" />
      <span
        style={{
          fontSize: "0.875rem",
          color: "var(--nuka-text-muted)",
        }}
      >
        Loading…
      </span>
    </div>
  ),
};
