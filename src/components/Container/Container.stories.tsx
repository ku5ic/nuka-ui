import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "@nuka/components/Container";
import { Stack } from "@nuka/components/Stack";

const Placeholder = ({ label }: { label: string }) => (
  <div
    style={{
      padding: "1rem",
      background: "var(--nuka-bg-muted)",
      border: "1px solid var(--nuka-border-base)",
      borderRadius: "0.375rem",
    }}
  >
    {label}
  </div>
);

const meta = {
  title: "Components/Container",
  component: Container,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "2xl", "full"],
    },
    padded: {
      control: "boolean",
    },
    centered: {
      control: "boolean",
    },
    asChild: {
      control: false,
    },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SizeSm: Story = {
  name: "Size: sm",
  args: {
    size: "sm",
    children: <Placeholder label="max-w-screen-sm (640px)" />,
  },
};

export const SizeMd: Story = {
  name: "Size: md",
  args: {
    size: "md",
    children: <Placeholder label="max-w-screen-md (768px)" />,
  },
};

export const SizeLg: Story = {
  name: "Size: lg",
  args: {
    size: "lg",
    children: <Placeholder label="max-w-screen-lg (1024px)" />,
  },
};

export const SizeXl: Story = {
  name: "Size: xl (default)",
  args: {
    size: "xl",
    children: <Placeholder label="max-w-screen-xl (1280px)" />,
  },
};

export const Size2xl: Story = {
  name: "Size: 2xl",
  args: {
    size: "2xl",
    children: <Placeholder label="max-w-screen-2xl (1536px)" />,
  },
};

export const SizeFull: Story = {
  name: "Size: full",
  args: {
    size: "full",
    children: <Placeholder label="max-w-full" />,
  },
};

export const Padded: Story = {
  name: "Padded vs Unpadded",
  render: () => (
    <Stack direction="column" gap="lg">
      <Container size="md">
        <Placeholder label="padded (default) — resize browser to see px-4 → sm:px-6 → lg:px-8" />
      </Container>
      <Container size="md" padded={false}>
        <Placeholder label="padded={false} — no horizontal padding" />
      </Container>
    </Stack>
  ),
};

export const Centered: Story = {
  name: "Centered vs Uncentered",
  render: () => (
    <Stack direction="column" gap="lg">
      <Container size="md">
        <Placeholder label="centered (default) — mx-auto" />
      </Container>
      <Container size="md" centered={false}>
        <Placeholder label="centered={false} — left-aligned" />
      </Container>
    </Stack>
  ),
};

export const PageLayout: Story = {
  name: "Pattern: Page Layout",
  render: () => (
    <Container size="lg">
      <Stack direction="column" gap="lg">
        <header
          style={{
            padding: "1rem 0",
            borderBottom: "1px solid var(--nuka-border-base)",
          }}
        >
          <Stack direction="row" justify="between" align="center">
            <div style={{ fontWeight: 700, fontSize: "1.25rem" }}>App Name</div>
            <Stack direction="row" gap="md">
              <span>Home</span>
              <span>About</span>
              <span>Contact</span>
            </Stack>
          </Stack>
        </header>
        <main>
          <Stack direction="column" gap="md">
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>
              Welcome to the app
            </h1>
            <p style={{ color: "var(--nuka-text-muted)" }}>
              This is a typical page layout using Container and Stack together.
            </p>
            <Placeholder label="Main content area" />
            <Placeholder label="Additional content" />
          </Stack>
        </main>
        <footer
          style={{
            padding: "1rem 0",
            borderTop: "1px solid var(--nuka-border-base)",
            color: "var(--nuka-text-muted)",
            fontSize: "0.875rem",
          }}
        >
          Footer content
        </footer>
      </Stack>
    </Container>
  ),
};
