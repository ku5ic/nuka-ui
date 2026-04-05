import type { Meta, StoryObj } from "@storybook/react";
import { Grid } from "@nuka/components/Grid";

const Cell = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: "1rem",
      background: "var(--nuka-bg-muted)",
      border: "1px solid var(--nuka-border-base)",
      borderRadius: "0.375rem",
      textAlign: "center",
    }}
  >
    {children}
  </div>
);

const meta = {
  title: "Components/Grid",
  component: Grid,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    cols: {
      control: "select",
      options: [1, 2, 3, 4, 6, 12],
    },
    gap: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl", "2xl"],
    },
    colGap: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl", "2xl"],
    },
    rowGap: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl", "2xl"],
    },
    asChild: {
      control: false,
    },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TwoColumn: Story = {
  args: {
    cols: 2,
    gap: "md",
    children: (
      <>
        <Cell>Column 1</Cell>
        <Cell>Column 2</Cell>
        <Cell>Column 3</Cell>
        <Cell>Column 4</Cell>
      </>
    ),
  },
};

export const ThreeColumn: Story = {
  args: {
    cols: 3,
    gap: "md",
    children: (
      <>
        <Cell>One</Cell>
        <Cell>Two</Cell>
        <Cell>Three</Cell>
        <Cell>Four</Cell>
        <Cell>Five</Cell>
        <Cell>Six</Cell>
      </>
    ),
  },
};

export const ResponsiveCols: Story = {
  name: "Responsive Columns",
  render: () => (
    <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap="md">
      <Cell>One</Cell>
      <Cell>Two</Cell>
      <Cell>Three</Cell>
      <Cell>Four</Cell>
      <Cell>Five</Cell>
      <Cell>Six</Cell>
    </Grid>
  ),
};

export const WithGap: Story = {
  name: "Gap Scale",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {(["none", "xs", "sm", "md", "lg", "xl", "2xl"] as const).map((g) => (
        <div key={g}>
          <div style={{ marginBottom: "0.25rem", fontSize: "0.75rem" }}>
            gap=&quot;{g}&quot;
          </div>
          <Grid cols={3} gap={g}>
            <Cell>A</Cell>
            <Cell>B</Cell>
            <Cell>C</Cell>
          </Grid>
        </div>
      ))}
    </div>
  ),
};

export const AsymmetricGap: Story = {
  name: "Asymmetric Gap (colGap + rowGap)",
  render: () => (
    <Grid cols={3} colGap="xl" rowGap="xs">
      <Cell>1</Cell>
      <Cell>2</Cell>
      <Cell>3</Cell>
      <Cell>4</Cell>
      <Cell>5</Cell>
      <Cell>6</Cell>
    </Grid>
  ),
};

export const CardGrid: Story = {
  name: "Pattern: Card Grid",
  render: () => (
    <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap="lg">
      {["Dashboard", "Analytics", "Reports", "Settings", "Users", "Billing"].map(
        (title) => (
          <div
            key={title}
            style={{
              padding: "1.5rem",
              background: "var(--nuka-bg-base)",
              border: "1px solid var(--nuka-border-base)",
              borderRadius: "0.5rem",
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: "0.5rem" }}>
              {title}
            </div>
            <div
              style={{ fontSize: "0.875rem", color: "var(--nuka-text-muted)" }}
            >
              Manage your {title.toLowerCase()} settings and preferences.
            </div>
          </div>
        ),
      )}
    </Grid>
  ),
};
