import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "@nuka/components/Container";
import { Stack } from "@nuka/components/Stack";
import { Heading } from "@nuka/components/Heading";
import { Text } from "@nuka/components/Text";

// Story-only placeholder — demonstrates layout structure, not a nuka-ui component
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
  title: "Layout/Container",
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
  parameters: {
    docs: {
      source: {
        code: `
{/* padded (default) */}
<Container size="md">
  <p>Content with responsive horizontal padding</p>
</Container>

{/* padded={false} */}
<Container size="md" padded={false}>
  <p>Content without horizontal padding</p>
</Container>
        `.trim(),
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: `
{/* centered (default) */}
<Container size="md">
  <p>Centered content</p>
</Container>

{/* centered={false} */}
<Container size="md" centered={false}>
  <p>Left-aligned content</p>
</Container>
        `.trim(),
      },
    },
  },
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
            <Text size="lg" weight="bold">App Name</Text>
            {/* TODO: replace nav spans with nav link component once implemented */}
            <Stack direction="row" gap="md">
              <span>Home</span>
              <span>About</span>
              <span>Contact</span>
            </Stack>
          </Stack>
        </header>
        <main>
          <Stack direction="column" gap="md">
            <Heading as="h1" size="3xl">
              Welcome to the app
            </Heading>
            <Text color="muted">
              This is a typical page layout using Container and Stack together.
            </Text>
            <Placeholder label="Main content area" />
            <Placeholder label="Additional content" />
          </Stack>
        </main>
        <footer
          style={{
            padding: "1rem 0",
            borderTop: "1px solid var(--nuka-border-base)",
          }}
        >
          <Text size="sm" color="muted">Footer content</Text>
        </footer>
      </Stack>
    </Container>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Container size="lg">
  <Stack direction="column" gap="lg">
    <header>
      <Stack direction="row" justify="between" align="center">
        <Text size="lg" weight="bold">App Name</Text>
        <Stack direction="row" gap="md">
          <a href="/">Home</a>
          <a href="/about">About</a>
        </Stack>
      </Stack>
    </header>
    <main>
      <Heading as="h1" size="3xl">Welcome to the app</Heading>
      <Text color="muted">Page description text.</Text>
    </main>
    <footer>
      <Text size="sm" color="muted">Footer content</Text>
    </footer>
  </Stack>
</Container>
        `.trim(),
      },
    },
  },
};
