import type { Meta, StoryObj } from "@storybook/react";
import { Eyebrow } from "@nuka/components/Eyebrow";
import { Heading } from "@nuka/components/Heading";
import { Stack } from "@nuka/components/Stack";
import { Text } from "@nuka/components/Text";

const meta = {
  title: "Typography/Eyebrow",
  component: Eyebrow,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    as: {
      control: "select",
      options: ["p", "span"],
    },
    color: {
      control: "select",
      options: ["base", "muted", "accent"],
    },
  },
} satisfies Meta<typeof Eyebrow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Category",
  },
  parameters: {
    docs: {
      source: {
        code: "<Eyebrow>Category</Eyebrow>",
      },
    },
  },
};

export const Colors: Story = {
  render: () => (
    <Stack gap="md">
      <Eyebrow color="muted">Muted (default)</Eyebrow>
      <Eyebrow color="base">Base</Eyebrow>
      <Eyebrow color="accent">Accent</Eyebrow>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Eyebrow color="muted">Muted (default)</Eyebrow>
<Eyebrow color="base">Base</Eyebrow>
<Eyebrow color="accent">Accent</Eyebrow>
        `.trim(),
      },
    },
  },
};

export const AsSpan: Story = {
  name: "As Span",
  render: () => (
    <Text>
      <Eyebrow as="span">Inline eyebrow</Eyebrow> followed by body text.
    </Text>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Text>
  <Eyebrow as="span">Inline eyebrow</Eyebrow> followed by body text.
</Text>
        `.trim(),
      },
    },
  },
};

export const PageHeader: Story = {
  name: "Pattern: Page Header",
  render: () => (
    <Stack gap="sm" className="max-w-lg">
      <Eyebrow color="accent">Announcing v2.0</Eyebrow>
      <Heading as="h1" size={{ base: "2xl", md: "4xl" }}>
        The next generation of nuka-ui
      </Heading>
      <Text color="muted" size="lg">
        A complete rewrite with responsive props, font family tokens, and
        server-safe components.
      </Text>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Eyebrow color="accent">Announcing v2.0</Eyebrow>
<Heading as="h1" size={{ base: "2xl", md: "4xl" }}>
  The next generation of nuka-ui
</Heading>
<Text color="muted" size="lg">
  A complete rewrite with responsive props, font family tokens,
  and server-safe components.
</Text>
        `.trim(),
      },
    },
  },
};
