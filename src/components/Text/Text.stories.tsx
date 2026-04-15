import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "@nuka/components/Text";
import { Stack } from "@nuka/components/Stack";
import { Card, CardBody } from "@nuka/components/Card";

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
      options: [
        "p",
        "span",
        "label",
        "li",
        "time",
        "abbr",
        "figcaption",
        "div",
      ],
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
  parameters: {
    docs: {
      source: {
        code: `
<Stack className="gap-3">
  <Text size="xs">xs: Extra small (0.75rem)</Text>
  <Text size="sm">sm: Small (0.875rem)</Text>
  <Text size="md">md: Medium (1rem), default</Text>
  <Text size="lg">lg: Large (1.125rem)</Text>
  <Text size="xl">xl: Extra large (1.25rem)</Text>
</Stack>
        `.trim(),
      },
    },
  },
  render: () => (
    <Stack className="gap-3">
      <Text size="xs">xs: Extra small (0.75rem)</Text>
      <Text size="sm">sm: Small (0.875rem)</Text>
      <Text size="md">md: Medium (1rem), default</Text>
      <Text size="lg">lg: Large (1.125rem)</Text>
      <Text size="xl">xl: Extra large (1.25rem)</Text>
    </Stack>
  ),
};

export const AllWeights: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Stack className="gap-3">
  <Text weight="regular">Regular (400), default</Text>
  <Text weight="medium">Medium (500)</Text>
  <Text weight="semibold">Semibold (600)</Text>
  <Text weight="bold">Bold (700)</Text>
</Stack>
        `.trim(),
      },
    },
  },
  render: () => (
    <Stack className="gap-3">
      <Text weight="regular">Regular (400), default</Text>
      <Text weight="medium">Medium (500)</Text>
      <Text weight="semibold">Semibold (600)</Text>
      <Text weight="bold">Bold (700)</Text>
    </Stack>
  ),
};

export const AllColors: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Stack className="gap-3">
  <Text color="base">base: Default text color</Text>
  <Text color="muted">muted: Secondary text</Text>
  <Text color="subtle">subtle: Tertiary text</Text>
  <div className="p-(--space-3) bg-(--nuka-bg-emphasis) rounded-(--radius-md)">
    <Text color="inverse">inverse: On dark background</Text>
  </div>
  <Text color="disabled">disabled: Disabled state</Text>
  <Text color="accent">accent: Accent color</Text>
  <Text color="danger">danger: Error/destructive</Text>
  <Text color="success">success: Success state</Text>
  <Text color="warning">warning: Warning state</Text>
</Stack>
        `.trim(),
      },
    },
  },
  render: () => (
    <Stack className="gap-3">
      <Text color="base">base: Default text color</Text>
      <Text color="muted">muted: Secondary text</Text>
      <Text color="subtle">subtle: Tertiary text</Text>
      <div className="p-(--space-3) bg-(--nuka-bg-emphasis) rounded-(--radius-md)">
        <Text color="inverse">inverse: On dark background</Text>
      </div>
      <Text color="disabled">disabled: Disabled state</Text>
      <Text color="accent">accent: Accent color</Text>
      <Text color="danger">danger: Error/destructive</Text>
      <Text color="success">success: Success state</Text>
      <Text color="warning">warning: Warning state</Text>
    </Stack>
  ),
};

export const AllAlignments: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Stack className="gap-3 w-80">
  <Text align="left">Left-aligned text (default)</Text>
  <Text align="center">Center-aligned text</Text>
  <Text align="right">Right-aligned text</Text>
</Stack>
        `.trim(),
      },
    },
  },
  render: () => (
    <Stack className="gap-3 w-80">
      <Text align="left">Left-aligned text (default)</Text>
      <Text align="center">Center-aligned text</Text>
      <Text align="right">Right-aligned text</Text>
    </Stack>
  ),
};

export const Truncate: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<div className="w-48">
  <Text truncate>
    This is a very long piece of text that should be truncated with an
    ellipsis when it overflows its container.
  </Text>
</div>
        `.trim(),
      },
    },
  },
  render: () => (
    <div className="w-48">
      <Text truncate>
        This is a very long piece of text that should be truncated with an
        ellipsis when it overflows its container.
      </Text>
    </div>
  ),
};

export const PolymorphicAs: Story = {
  name: "Polymorphic (as prop)",
  parameters: {
    docs: {
      source: {
        code: `
<Stack className="gap-3">
  <Text>Default renders as &lt;p&gt;</Text>
  <Text as="span" color="muted">
    as="span": inline element
  </Text>
  <Text as="label" weight="medium">
    as="label": form label
  </Text>
  <ul className="list-disc pl-5">
    <Text as="li">as="li": list item</Text>
    <Text as="li" color="muted">
      as="li": another list item
    </Text>
  </ul>
  <Text as="time" size="sm" color="muted">
    as="time": 2026-04-04
  </Text>
</Stack>
        `.trim(),
      },
    },
  },
  render: () => (
    <Stack className="gap-3">
      <Text>Default renders as &lt;p&gt;</Text>
      <Text as="span" color="muted">
        as=&quot;span&quot;: inline element
      </Text>
      <Text as="label" weight="medium">
        as=&quot;label&quot;: form label
      </Text>
      <ul className="list-disc pl-5">
        <Text as="li">as=&quot;li&quot;: list item</Text>
        <Text as="li" color="muted">
          as=&quot;li&quot;: another list item
        </Text>
      </ul>
      <Text as="time" size="sm" color="muted">
        as=&quot;time&quot;: 2026-04-04
      </Text>
    </Stack>
  ),
};

export const RealWorldExample: Story = {
  name: "Pattern: Card Body",
  parameters: {
    docs: {
      source: {
        code: `
<Card className="max-w-sm">
  <CardBody>
    <Text size="lg" weight="semibold">
      Project update
    </Text>
    <Text color="muted" size="sm" className="mt-(--space-1)">
      April 4, 2026
    </Text>
    <Text className="mt-(--space-3)">
      The nuka-ui component library now includes Button, Badge, Tag, and Text
      primitives. The token system is fully operational with light and dark
      theme support.
    </Text>
    <Text color="muted" size="sm" className="mt-(--space-3)">
      Updated by the development team.
    </Text>
  </CardBody>
</Card>
        `.trim(),
      },
    },
  },
  render: () => (
    <Card className="max-w-sm">
      <CardBody>
        <Text size="lg" weight="semibold">
          Project update
        </Text>
        <Text color="muted" size="sm" className="mt-(--space-1)">
          April 4, 2026
        </Text>
        <Text className="mt-(--space-3)">
          The nuka-ui component library now includes Button, Badge, Tag, and
          Text primitives. The token system is fully operational with light and
          dark theme support.
        </Text>
        <Text color="muted" size="sm" className="mt-(--space-3)">
          Updated by the development team.
        </Text>
      </CardBody>
    </Card>
  ),
};

export const ResponsiveSize: Story = {
  name: "Responsive Size",
  render: () => (
    <Stack gap="md">
      <Text size={{ base: "sm", md: "lg", xl: "xl" }}>
        This text scales from sm to lg at md breakpoint, and xl at xl
        breakpoint.
      </Text>
      <Text
        size={{ base: "xs", md: "md" }}
        align={{ base: "left", md: "center" }}
        color="muted"
      >
        Smaller responsive text with responsive alignment.
      </Text>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Text size={{ base: "sm", md: "lg", xl: "xl" }}>
  This text scales from sm to lg at md breakpoint, and xl at xl breakpoint.
</Text>
<Text
  size={{ base: "xs", md: "md" }}
  align={{ base: "left", md: "center" }}
  color="muted"
>
  Smaller responsive text with responsive alignment.
</Text>
        `.trim(),
      },
    },
  },
};

export const FontFamily: Story = {
  name: "Font Family",
  render: () => (
    <Stack gap="md">
      <Text family="body">Body family (sans)</Text>
      <Text family="heading">Heading family (serif)</Text>
      <Text family="ui">UI family (sans)</Text>
      <Text family="code">Code family (mono)</Text>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Text family="body">Body family (sans)</Text>
<Text family="heading">Heading family (serif)</Text>
<Text family="ui">UI family (sans)</Text>
<Text family="code">Code family (mono)</Text>
        `.trim(),
      },
    },
  },
};
