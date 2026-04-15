import type { Meta, StoryObj } from "@storybook/react";
import { SplitLayout } from "@nuka/components/SplitLayout";
import { Container } from "@nuka/components/Container";
import { Heading } from "@nuka/components/Heading";
import { Section } from "@nuka/components/Section";
import { Stack } from "@nuka/components/Stack";
import { Text } from "@nuka/components/Text";

const Placeholder = ({
  label,
  height = "8rem",
}: {
  label: string;
  height?: string;
}) => (
  <div
    style={{
      height,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-md)",
      border: "1px dashed var(--nuka-border-base)",
      background: "var(--nuka-bg-subtle)",
      fontSize: "0.875rem",
      color: "var(--nuka-text-muted)",
    }}
  >
    {label}
  </div>
);

const meta = {
  title: "Layout/SplitLayout",
  component: SplitLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    sidebar: {
      control: "radio",
      options: ["left", "right"],
    },
    sideWidth: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
    stackBelow: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
    gap: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl"],
    },
    asChild: {
      control: false,
    },
  },
} satisfies Meta<typeof SplitLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    gap: "lg",
    children: [
      <Placeholder key="main" label="Main content" height="16rem" />,
      <Placeholder key="side" label="Sidebar" />,
    ],
  },
  parameters: {
    docs: {
      source: {
        code: `
<SplitLayout gap="lg">
  <main>Main content</main>
  <aside>Sidebar</aside>
</SplitLayout>
        `.trim(),
      },
    },
  },
};

export const LeftSidebar: Story = {
  name: "Left Sidebar",
  render: () => (
    <SplitLayout sidebar="left" gap="lg">
      <Placeholder label="Sidebar (left, 320px)" />
      <Placeholder label="Main content" height="16rem" />
    </SplitLayout>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<SplitLayout sidebar="left" gap="lg">
  <aside>Sidebar</aside>
  <main>Main content</main>
</SplitLayout>
        `.trim(),
      },
    },
  },
};

export const SideWidths: Story = {
  name: "Side Widths",
  render: () => (
    <Stack gap="lg">
      {(["sm", "md", "lg", "xl"] as const).map((w) => (
        <SplitLayout key={w} sideWidth={w} gap="md">
          <Placeholder label="Main" />
          <Placeholder label={`sideWidth="${w}"`} />
        </SplitLayout>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<SplitLayout sideWidth="sm" gap="md">...</SplitLayout>
<SplitLayout sideWidth="md" gap="md">...</SplitLayout>
<SplitLayout sideWidth="lg" gap="md">...</SplitLayout>
<SplitLayout sideWidth="xl" gap="md">...</SplitLayout>
        `.trim(),
      },
    },
  },
};

export const StackBreakpoints: Story = {
  name: "Stack Breakpoints",
  render: () => (
    <Stack gap="lg">
      {(["sm", "md", "lg", "xl"] as const).map((bp) => (
        <SplitLayout key={bp} stackBelow={bp} gap="md">
          <Placeholder label="Main" />
          <Placeholder label={`stackBelow="${bp}"`} />
        </SplitLayout>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<SplitLayout stackBelow="sm" gap="md">...</SplitLayout>
<SplitLayout stackBelow="md" gap="md">...</SplitLayout>
<SplitLayout stackBelow="lg" gap="md">...</SplitLayout>
<SplitLayout stackBelow="xl" gap="md">...</SplitLayout>
        `.trim(),
      },
    },
  },
};

export const BlogPost: Story = {
  name: "Pattern: Blog Post",
  render: () => (
    <Section spacing="lg">
      <Container>
        <SplitLayout gap="xl" sideWidth="sm">
          <Stack gap="md">
            <Heading as="h1" size={{ base: "2xl", md: "4xl" }}>
              Building a design system
            </Heading>
            <Text color="muted">
              A guide to creating reusable components with consistent tokens,
              responsive props, and accessible defaults. This article covers the
              foundational decisions that shape a component library.
            </Text>
            <Text color="muted">
              Starting with primitives like color, spacing, and typography, we
              build upward through layout components, feedback patterns, and
              composite widgets.
            </Text>
          </Stack>
          <Stack gap="md">
            <Heading as="h2" size="xl">
              Table of contents
            </Heading>
            <Stack gap="xs">
              <Text size="sm" color="muted">
                1. Token architecture
              </Text>
              <Text size="sm" color="muted">
                2. Component API design
              </Text>
              <Text size="sm" color="muted">
                3. Responsive props
              </Text>
              <Text size="sm" color="muted">
                4. Accessibility
              </Text>
            </Stack>
          </Stack>
        </SplitLayout>
      </Container>
    </Section>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<SplitLayout gap="xl" sideWidth="sm">
  <article>
    <Heading as="h1" size={{ base: "2xl", md: "4xl" }}>
      Building a design system
    </Heading>
    <Text color="muted">Article content...</Text>
  </article>
  <aside>
    <Heading as="h2" size="xl">Table of contents</Heading>
    <Text size="sm" color="muted">1. Token architecture</Text>
  </aside>
</SplitLayout>
        `.trim(),
      },
    },
  },
};
