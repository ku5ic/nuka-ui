import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "@nuka/components/Text";

const meta = {
  title: "Typography/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
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
    align: {
      control: "select",
      options: ["left", "center", "right"],
    },
    truncate: {
      control: "boolean",
    },
    as: {
      control: "select",
      options: ["p", "span", "label", "li", "time", "abbr", "figcaption", "div"],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Body copy goes here",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <Text size="xs">xs: Extra small (0.75rem)</Text>
      <Text size="sm">sm: Small (0.875rem)</Text>
      <Text size="md">md: Medium (1rem), default</Text>
      <Text size="lg">lg: Large (1.125rem)</Text>
      <Text size="xl">xl: Extra large (1.25rem)</Text>
    </div>
  ),
};

export const AllWeights: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <Text weight="regular">Regular (400), default</Text>
      <Text weight="medium">Medium (500)</Text>
      <Text weight="semibold">Semibold (600)</Text>
      <Text weight="bold">Bold (700)</Text>
    </div>
  ),
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <Text color="base">base: Default text color</Text>
      <Text color="muted">muted: Secondary text</Text>
      <Text color="subtle">subtle: Tertiary text</Text>
      <div
        style={{
          backgroundColor: "var(--nuka-bg-emphasis)",
          padding: "0.5rem 0.75rem",
          borderRadius: "var(--radius-md)",
        }}
      >
        <Text color="inverse">inverse: On dark background</Text>
      </div>
      <Text color="disabled">disabled: Disabled state</Text>
      <Text color="accent">accent: Accent color</Text>
      <Text color="danger">danger: Error/destructive</Text>
      <Text color="success">success: Success state</Text>
      <Text color="warning">warning: Warning state</Text>
    </div>
  ),
};

export const AllAlignments: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        width: "20rem",
      }}
    >
      <Text align="left">Left-aligned text (default)</Text>
      <Text align="center">Center-aligned text</Text>
      <Text align="right">Right-aligned text</Text>
    </div>
  ),
};

export const Truncate: Story = {
  render: () => (
    <div style={{ width: "12rem" }}>
      <Text truncate>
        This is a very long piece of text that should be truncated with an
        ellipsis when it overflows its container.
      </Text>
    </div>
  ),
};

export const PolymorphicAs: Story = {
  name: "Polymorphic (as prop)",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <Text>Default renders as &lt;p&gt;</Text>
      <Text as="span" color="muted">
        as=&quot;span&quot;: inline element
      </Text>
      <Text as="label" weight="medium">
        as=&quot;label&quot;: form label
      </Text>
      <ul style={{ listStyle: "disc", paddingLeft: "1.25rem" }}>
        <Text as="li">as=&quot;li&quot;: list item</Text>
        <Text as="li" color="muted">
          as=&quot;li&quot;: another list item
        </Text>
      </ul>
      <Text as="time" size="sm" color="muted">
        as=&quot;time&quot;: 2026-04-04
      </Text>
    </div>
  ),
};

export const RealWorldExample: Story = {
  name: "Pattern: Card Body",
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
      <Text size="lg" weight="semibold">
        Project update
      </Text>
      <Text color="muted" size="sm" style={{ marginTop: "0.25rem" }}>
        April 4, 2026
      </Text>
      <Text style={{ marginTop: "0.75rem" }}>
        The nuka-ui component library now includes Button, Badge, Tag, and Text
        primitives. The token system is fully operational with light and dark
        theme support.
      </Text>
      <Text color="muted" size="sm" style={{ marginTop: "0.75rem" }}>
        Updated by the development team.
      </Text>
    </div>
  ),
};
