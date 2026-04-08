import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from "@nuka/components/Stack";

// Story-only placeholder: demonstrates layout structure, not a nuka-ui component
const Box = ({ children }: { children: React.ReactNode }) => (
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
  title: "Layout/Stack",
  component: Stack,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: ["row", "column", "row-reverse", "column-reverse"],
    },
    gap: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl", "2xl"],
    },
    align: {
      control: "select",
      options: ["start", "center", "end", "stretch", "baseline"],
    },
    justify: {
      control: "select",
      options: ["start", "center", "end", "between", "around", "evenly"],
    },
    wrap: {
      control: "select",
      options: ["wrap", "nowrap", "wrap-reverse"],
    },
    asChild: {
      control: false,
    },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  args: {
    direction: "column",
    gap: "md",
    children: (
      <>
        <Box>First</Box>
        <Box>Second</Box>
        <Box>Third</Box>
      </>
    ),
  },
  parameters: {
    docs: {
      source: {
        code: `
<Stack direction="column" gap="md">
  <div>First</div>
  <div>Second</div>
  <div>Third</div>
</Stack>
        `.trim(),
      },
    },
  },
};

export const Horizontal: Story = {
  args: {
    direction: "row",
    gap: "md",
    children: (
      <>
        <Box>First</Box>
        <Box>Second</Box>
        <Box>Third</Box>
      </>
    ),
  },
  parameters: {
    docs: {
      source: {
        code: `
<Stack direction="row" gap="md">
  <div>First</div>
  <div>Second</div>
  <div>Third</div>
</Stack>
        `.trim(),
      },
    },
  },
};

export const Responsive: Story = {
  name: "Responsive Direction",
  render: () => (
    <Stack direction={{ base: "column", md: "row" }} gap="md">
      <Box>First</Box>
      <Box>Second</Box>
      <Box>Third</Box>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Stack direction={{ base: "column", md: "row" }} gap="md">
  <div>First</div>
  <div>Second</div>
  <div>Third</div>
</Stack>
        `.trim(),
      },
    },
  },
};

export const Gap: Story = {
  name: "Gap Scale",
  render: () => (
    <Stack direction="column" gap="lg">
      {(["none", "xs", "sm", "md", "lg", "xl", "2xl"] as const).map((g) => (
        <div key={g}>
          <div style={{ marginBottom: "0.25rem", fontSize: "0.75rem" }}>
            gap=&quot;{g}&quot;
          </div>
          <Stack direction="row" gap={g}>
            <Box>A</Box>
            <Box>B</Box>
            <Box>C</Box>
          </Stack>
        </div>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Stack direction="row" gap="md">
  <div>A</div>
  <div>B</div>
  <div>C</div>
</Stack>
        `.trim(),
      },
    },
  },
};

export const Alignment: Story = {
  name: "Align Values",
  render: () => (
    <Stack direction="column" gap="lg">
      {(["start", "center", "end", "stretch", "baseline"] as const).map((a) => (
        <div key={a}>
          <div style={{ marginBottom: "0.25rem", fontSize: "0.75rem" }}>
            align=&quot;{a}&quot;
          </div>
          <Stack
            direction="row"
            gap="sm"
            align={a}
            style={{ height: "5rem", background: "var(--nuka-bg-subtle)" }}
          >
            <Box>Short</Box>
            <Box>Taller item</Box>
            <Box>A</Box>
          </Stack>
        </div>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Stack direction="row" gap="sm" align="center">
  <div>Short</div>
  <div>Taller item</div>
  <div>A</div>
</Stack>
        `.trim(),
      },
    },
  },
};

export const Justification: Story = {
  name: "Justify Values",
  render: () => (
    <Stack direction="column" gap="lg">
      {(["start", "center", "end", "between", "around", "evenly"] as const).map(
        (j) => (
          <div key={j}>
            <div style={{ marginBottom: "0.25rem", fontSize: "0.75rem" }}>
              justify=&quot;{j}&quot;
            </div>
            <Stack
              direction="row"
              gap="sm"
              justify={j}
              style={{ background: "var(--nuka-bg-subtle)" }}
            >
              <Box>A</Box>
              <Box>B</Box>
              <Box>C</Box>
            </Stack>
          </div>
        ),
      )}
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Stack direction="row" gap="sm" justify="between">
  <div>A</div>
  <div>B</div>
  <div>C</div>
</Stack>
        `.trim(),
      },
    },
  },
};

export const AsChild: Story = {
  name: "AsChild (nav element)",
  render: () => (
    <Stack asChild direction="row" gap="md" align="center">
      <nav>
        <Box>Home</Box>
        <Box>About</Box>
        <Box>Contact</Box>
      </nav>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Stack asChild direction="row" gap="md" align="center">
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </nav>
</Stack>
        `.trim(),
      },
    },
  },
};

export const NavBar: Story = {
  name: "Pattern: Navigation Bar",
  render: () => (
    <Stack
      direction="row"
      justify="between"
      align="center"
      gap="md"
      style={{
        width: "100%",
        minWidth: "40rem",
        padding: "0.75rem 1rem",
        background: "var(--nuka-bg-base)",
        border: "1px solid var(--nuka-border-base)",
        borderRadius: "0.5rem",
      }}
    >
      <div style={{ fontWeight: 600 }}>Logo</div>
      <Stack direction="row" gap="sm">
        <Box>Home</Box>
        <Box>About</Box>
        <Box>Contact</Box>
      </Stack>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Stack direction="row" justify="between" align="center" gap="md">
  <Text weight="semibold">Logo</Text>
  <Stack direction="row" gap="sm">
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </Stack>
</Stack>
        `.trim(),
      },
    },
  },
};
