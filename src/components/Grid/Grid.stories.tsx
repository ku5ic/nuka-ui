import type { Meta, StoryObj } from "@storybook/react";
import { Grid } from "@nuka/components/Grid";
import { Card, CardBody } from "@nuka/components/Card";
import { Heading } from "@nuka/components/Heading";
import { Text } from "@nuka/components/Text";

// Story-only placeholder: demonstrates layout structure, not a nuka-ui component
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
  title: "Layout/Grid",
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
  parameters: {
    docs: {
      source: {
        code: `
<Grid cols={2} gap="md">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
  <div>Column 4</div>
</Grid>
        `.trim(),
      },
    },
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
  parameters: {
    docs: {
      source: {
        code: `
<Grid cols={3} gap="md">
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
  <div>Four</div>
  <div>Five</div>
  <div>Six</div>
</Grid>
        `.trim(),
      },
    },
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
  parameters: {
    docs: {
      source: {
        code: `
<Grid cols={{ base: 1, sm: 2, lg: 3 }} gap="md">
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
  <div>Four</div>
  <div>Five</div>
  <div>Six</div>
</Grid>
        `.trim(),
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: `
<Grid cols={3} gap="md">
  <div>A</div>
  <div>B</div>
  <div>C</div>
</Grid>
        `.trim(),
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: `
<Grid cols={3} colGap="xl" rowGap="xs">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</Grid>
        `.trim(),
      },
    },
  },
};

export const CardGrid: Story = {
  name: "Pattern: Card Grid",
  render: () => (
    <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap="lg">
      {[
        "Dashboard",
        "Analytics",
        "Reports",
        "Settings",
        "Users",
        "Billing",
      ].map((title) => (
        <Card key={title}>
          <CardBody>
            <Heading as="h3" size="xl">
              {title}
            </Heading>
            <Text color="muted">
              Manage your {title.toLowerCase()} settings and preferences.
            </Text>
          </CardBody>
        </Card>
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Grid cols={{ base: 1, sm: 2, lg: 3 }} gap="lg">
  <Card>
    <Heading size="xl">Dashboard</Heading>
    <Text color="muted">Manage your dashboard settings.</Text>
  </Card>
  <Card>
    <Heading size="xl">Analytics</Heading>
    <Text color="muted">Manage your analytics settings.</Text>
  </Card>
  {/* ... */}
</Grid>
        `.trim(),
      },
    },
  },
};
