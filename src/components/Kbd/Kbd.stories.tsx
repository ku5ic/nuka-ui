import type { Meta, StoryObj } from "@storybook/react";
import { Kbd } from "@nuka/components/Kbd";
import { Text } from "@nuka/components/Text";

const meta = {
  title: "Typography/Kbd",
  component: Kbd,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Enter",
    size: "md",
  },
};

export const SizeSm: Story = {
  name: "Size: sm",
  args: {
    children: "Esc",
    size: "sm",
  },
};

export const SizeMd: Story = {
  name: "Size: md",
  args: {
    children: "Tab",
    size: "md",
  },
};

export const SizeLg: Story = {
  name: "Size: lg",
  args: {
    children: "Space",
    size: "lg",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <Kbd size="sm">Esc</Kbd>
        <span style={{ fontSize: "0.75rem", color: "var(--nuka-text-muted)" }}>
          sm
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <Kbd size="md">Tab</Kbd>
        <span style={{ fontSize: "0.75rem", color: "var(--nuka-text-muted)" }}>
          md
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <Kbd size="lg">Enter</Kbd>
        <span style={{ fontSize: "0.75rem", color: "var(--nuka-text-muted)" }}>
          lg
        </span>
      </div>
    </div>
  ),
};

export const PatternKeyboardShortcut: Story = {
  name: "Pattern: Keyboard Shortcut",
  render: () => (
    <kbd
      style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}
    >
      <Kbd>Ctrl</Kbd>
      <span style={{ color: "var(--nuka-text-muted)" }}>+</span>
      <Kbd>K</Kbd>
    </kbd>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Compound shortcuts use a wrapping `<kbd>` element containing individual `<Kbd>` components, following the HTML spec for keyboard input semantics.",
      },
    },
  },
};

export const PatternInlineInText: Story = {
  name: "Pattern: Inline in Text",
  render: () => (
    <Text as="p" size="sm" style={{ maxWidth: "28rem" }}>
      Press <Kbd size="sm">Ctrl</Kbd>
      <Text as="span" color="muted">
        +
      </Text>
      <Kbd size="sm">K</Kbd> to open the command palette, or press{" "}
      <Kbd size="sm">Esc</Kbd> to close it.
    </Text>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Text as="p" size="sm">
  Press <Kbd size="sm">Ctrl</Kbd>
  <Text as="span" color="muted">+</Text>
  <Kbd size="sm">K</Kbd> to open the command palette, or press{" "}
  <Kbd size="sm">Esc</Kbd> to close it.
</Text>
        `.trim(),
      },
      description: {
        story:
          'Key labels rendered inline within body copy. Use `size="sm"` for inline usage to match surrounding text proportions.',
      },
    },
  },
};
