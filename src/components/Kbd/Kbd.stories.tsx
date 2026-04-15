import type { Meta, StoryObj } from "@storybook/react";
import { Kbd } from "@nuka/components/Kbd";
import { Stack } from "@nuka/components/Stack";
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
    <Stack direction="row" align="center" gap="xl">
      <Stack direction="column" align="center" gap="xs">
        <Kbd size="sm">Esc</Kbd>
        <Text size="xs" color="muted">
          sm
        </Text>
      </Stack>
      <Stack direction="column" align="center" gap="xs">
        <Kbd size="md">Tab</Kbd>
        <Text size="xs" color="muted">
          md
        </Text>
      </Stack>
      <Stack direction="column" align="center" gap="xs">
        <Kbd size="lg">Enter</Kbd>
        <Text size="xs" color="muted">
          lg
        </Text>
      </Stack>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Stack direction="row" align="center" gap="xl">
  <Stack direction="column" align="center" gap="xs">
    <Kbd size="sm">Esc</Kbd>
    <Text size="xs" color="muted">sm</Text>
  </Stack>
  <Stack direction="column" align="center" gap="xs">
    <Kbd size="md">Tab</Kbd>
    <Text size="xs" color="muted">md</Text>
  </Stack>
  <Stack direction="column" align="center" gap="xs">
    <Kbd size="lg">Enter</Kbd>
    <Text size="xs" color="muted">lg</Text>
  </Stack>
</Stack>
        `.trim(),
      },
    },
  },
};

export const PatternKeyboardShortcut: Story = {
  name: "Pattern: Keyboard Shortcut",
  render: () => (
    <kbd className="inline-flex items-center gap-(--space-1)">
      <Kbd>Ctrl</Kbd>
      <span className="text-(--nuka-text-muted)">+</span>
      <Kbd>K</Kbd>
    </kbd>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<kbd className="inline-flex items-center gap-(--space-1)">
  <Kbd>Ctrl</Kbd>
  <span className="text-(--nuka-text-muted)">+</span>
  <Kbd>K</Kbd>
</kbd>
        `.trim(),
      },
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

export const FontFamily: Story = {
  name: "Font Family",
  render: () => (
    <Stack direction="row" gap="md" align="center">
      <Stack gap="xs" align="center">
        <Text size="xs" color="muted">
          Default (mono)
        </Text>
        <Kbd>Shift</Kbd>
      </Stack>
      <Stack gap="xs" align="center">
        <Text size="xs" color="muted">
          Sans override
        </Text>
        <Kbd family="body">Shift</Kbd>
      </Stack>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Kbd>Shift</Kbd>
<Kbd family="body">Shift</Kbd>
        `.trim(),
      },
    },
  },
};
