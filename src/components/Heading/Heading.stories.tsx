import type { Meta, StoryObj } from "@storybook/react";
import { Heading } from "@vault/components/Heading";
import { Text } from "@vault/components/Text";

const meta = {
  title: "Components/Heading",
  component: Heading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
    },
    size: {
      control: "select",
      options: ["xl", "2xl", "3xl", "4xl"],
    },
    weight: {
      control: "select",
      options: ["regular", "medium", "semibold", "bold"],
    },
    color: {
      control: "select",
      options: [
        "base",
        "muted",
        "subtle",
        "inverse",
        "disabled",
        "accent",
        "danger",
        "success",
        "warning",
      ],
    },
    truncate: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Default Heading",
  },
};

export const AllLevels: Story = {
  name: "All Levels (h1–h6)",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Heading as="h1" size="4xl">
        h1 — Page title (4xl)
      </Heading>
      <Heading as="h2" size="3xl">
        h2 — Section heading (3xl)
      </Heading>
      <Heading as="h3" size="2xl">
        h3 — Subsection heading (2xl)
      </Heading>
      <Heading as="h4" size="xl">
        h4 — Group heading (xl)
      </Heading>
      <Heading as="h5" size="xl" weight="semibold">
        h5 — Detail heading (xl, semibold)
      </Heading>
      <Heading as="h6" size="xl" weight="medium">
        h6 — Fine heading (xl, medium)
      </Heading>
      <div
        style={{
          marginTop: "0.5rem",
          paddingTop: "0.75rem",
          borderTop: "1px solid var(--vault-border-base)",
        }}
      >
        <Text size="xl" weight="bold">
          Text size=&quot;xl&quot; weight=&quot;bold&quot; — for comparison
        </Text>
        <Text size="xl" style={{ marginTop: "0.25rem" }}>
          Text size=&quot;xl&quot; — body text at same font size
        </Text>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Heading as="h3" size="xl">
        xl — 1.25rem
      </Heading>
      <Heading as="h3" size="2xl">
        2xl — 1.5rem
      </Heading>
      <Heading as="h3" size="3xl">
        3xl — 1.875rem (default)
      </Heading>
      <Heading as="h3" size="4xl">
        4xl — 2.25rem
      </Heading>
    </div>
  ),
};

export const AllWeights: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <Heading weight="regular">Regular (400)</Heading>
      <Heading weight="medium">Medium (500)</Heading>
      <Heading weight="semibold">Semibold (600)</Heading>
      <Heading weight="bold">Bold (700) — default</Heading>
    </div>
  ),
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <Heading size="2xl" color="base">
        base — Default heading color
      </Heading>
      <Heading size="2xl" color="muted">
        muted — Secondary heading
      </Heading>
      <Heading size="2xl" color="subtle">
        subtle — Tertiary heading
      </Heading>
      <div
        style={{
          backgroundColor: "var(--vault-bg-emphasis)",
          padding: "0.75rem 1rem",
          borderRadius: "var(--radius-md)",
        }}
      >
        <Heading size="2xl" color="inverse">
          inverse — On dark background
        </Heading>
      </div>
      <Heading size="2xl" color="disabled">
        disabled — Disabled state
      </Heading>
      <Heading size="2xl" color="accent">
        accent — Accent color
      </Heading>

      {/* Feedback colors with realistic context */}
      <div
        style={{
          marginTop: "0.5rem",
          padding: "1rem",
          backgroundColor: "var(--vault-danger-bg)",
          borderLeft: "3px solid var(--vault-danger-border)",
          borderRadius: "var(--radius-md)",
        }}
      >
        <Heading as="h3" size="xl" color="danger">
          Something went wrong
        </Heading>
        <Text color="danger" size="sm" style={{ marginTop: "0.25rem" }}>
          The import failed. Check the file format and try again.
        </Text>
      </div>
      <div
        style={{
          padding: "1rem",
          backgroundColor: "var(--vault-success-bg)",
          borderLeft: "3px solid var(--vault-success-border)",
          borderRadius: "var(--radius-md)",
        }}
      >
        <Heading as="h3" size="xl" color="success">
          Deployment complete
        </Heading>
        <Text color="success" size="sm" style={{ marginTop: "0.25rem" }}>
          All services are running on the latest version.
        </Text>
      </div>
      <div
        style={{
          padding: "1rem",
          backgroundColor: "var(--vault-warning-bg)",
          borderLeft: "3px solid var(--vault-warning-border)",
          borderRadius: "var(--radius-md)",
        }}
      >
        <Heading as="h3" size="xl" color="warning">
          API rate limit approaching
        </Heading>
        <Text color="warning" size="sm" style={{ marginTop: "0.25rem" }}>
          You have used 85% of your monthly quota.
        </Text>
      </div>
    </div>
  ),
};

export const TruncateStory: Story = {
  name: "Truncate",
  render: () => (
    <div style={{ width: "16rem" }}>
      <Heading truncate>
        This is a very long heading that should be truncated with an ellipsis
      </Heading>
    </div>
  ),
};

export const PageHeader: Story = {
  name: "Pattern: Page Header",
  render: () => (
    <div
      style={{
        maxWidth: "36rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      {/* Page title — h1 at largest size */}
      <div>
        <Heading as="h1" size="4xl">
          Dashboard
        </Heading>
        <Text color="muted" style={{ marginTop: "0.25rem" }}>
          Overview of your project metrics and recent activity.
        </Text>
      </div>

      {/* Section — h2 at default size */}
      <div>
        <Heading as="h2">Recent Activity</Heading>
        <Text style={{ marginTop: "0.5rem" }}>
          Your team pushed 12 commits across 3 repositories this week. Two pull
          requests are awaiting review.
        </Text>
      </div>

      {/* Subsection — h3 at smaller size, independent of level */}
      <div>
        <Heading as="h3" size="2xl">
          Open Issues
        </Heading>
        <Text style={{ marginTop: "0.5rem" }}>
          There are 7 open issues, 3 of which are marked as high priority.
        </Text>
      </div>

      {/* Group heading — h4 at smallest heading size, lighter weight */}
      <div>
        <Heading as="h4" size="xl" weight="semibold">
          Deployment Status
        </Heading>
        <Text size="sm" color="muted" style={{ marginTop: "0.25rem" }}>
          Last deployed 2 hours ago. All health checks passing.
        </Text>
      </div>
    </div>
  ),
};
