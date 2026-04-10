import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@nuka/components/Badge";
import { Stack } from "@nuka/components/Stack";
import { Text } from "@nuka/components/Text";

const meta = {
  title: "Display/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "subtle", "outline"],
    },
    intent: {
      control: "select",
      options: ["default", "danger", "success", "warning"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    asChild: {
      control: false,
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Solid: Story = {
  args: {
    variant: "solid",
    intent: "default",
    size: "md",
    children: "Badge",
  },
};

export const Subtle: Story = {
  args: {
    variant: "subtle",
    intent: "default",
    size: "md",
    children: "Badge",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    intent: "default",
    size: "md",
    children: "Badge",
  },
};

export const DangerIntent: Story = {
  args: {
    variant: "solid",
    intent: "danger",
    size: "md",
    children: "Danger",
  },
};

export const SuccessIntent: Story = {
  args: {
    variant: "solid",
    intent: "success",
    size: "md",
    children: "Success",
  },
};

export const WarningIntent: Story = {
  args: {
    variant: "solid",
    intent: "warning",
    size: "md",
    children: "Warning",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div
      className="grid items-center gap-3"
      style={{ gridTemplateColumns: "repeat(5, auto)" }}
    >
      <span />
      <Text size="xs" color="muted">
        Default
      </Text>
      <Text size="xs" color="muted">
        Danger
      </Text>
      <Text size="xs" color="muted">
        Success
      </Text>
      <Text size="xs" color="muted">
        Warning
      </Text>

      <Text size="xs" color="muted">
        Solid
      </Text>
      <Badge variant="solid" intent="default">
        Default
      </Badge>
      <Badge variant="solid" intent="danger">
        Danger
      </Badge>
      <Badge variant="solid" intent="success">
        Success
      </Badge>
      <Badge variant="solid" intent="warning">
        Warning
      </Badge>

      <Text size="xs" color="muted">
        Subtle
      </Text>
      <Badge variant="subtle" intent="default">
        Default
      </Badge>
      <Badge variant="subtle" intent="danger">
        Danger
      </Badge>
      <Badge variant="subtle" intent="success">
        Success
      </Badge>
      <Badge variant="subtle" intent="warning">
        Warning
      </Badge>

      <Text size="xs" color="muted">
        Outline
      </Text>
      <Badge variant="outline" intent="default">
        Default
      </Badge>
      <Badge variant="outline" intent="danger">
        Danger
      </Badge>
      <Badge variant="outline" intent="success">
        Success
      </Badge>
      <Badge variant="outline" intent="warning">
        Warning
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Badge variant="solid" intent="default">Default</Badge>
<Badge variant="solid" intent="danger">Danger</Badge>
<Badge variant="solid" intent="success">Success</Badge>
<Badge variant="solid" intent="warning">Warning</Badge>
<Badge variant="subtle" intent="default">Default</Badge>
<Badge variant="subtle" intent="danger">Danger</Badge>
<Badge variant="subtle" intent="success">Success</Badge>
<Badge variant="subtle" intent="warning">Warning</Badge>
<Badge variant="outline" intent="default">Default</Badge>
<Badge variant="outline" intent="danger">Danger</Badge>
<Badge variant="outline" intent="success">Success</Badge>
<Badge variant="outline" intent="warning">Warning</Badge>
        `.trim(),
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <Stack direction="row" align="center" gap="sm">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Stack direction="row" align="center" gap="sm">
  <Badge size="sm">Small</Badge>
  <Badge size="md">Medium</Badge>
  <Badge size="lg">Large</Badge>
</Stack>
        `.trim(),
      },
    },
  },
};

export const WithIcon: Story = {
  name: "Pattern: With Icon",
  render: () => (
    <Stack direction="row" align="center" gap="sm">
      <Badge variant="solid" intent="success">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className="mr-(--space-1)"
        >
          <path
            d="M10 3L4.5 8.5L2 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Verified
      </Badge>
      <Badge variant="subtle" intent="danger">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className="mr-(--space-1)"
        >
          <circle
            cx="6"
            cy="6"
            r="4.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
        Error
      </Badge>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Stack direction="row" align="center" gap="sm">
  <Badge variant="solid" intent="success">
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mr-(--space-1)">
      <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    Verified
  </Badge>
  <Badge variant="subtle" intent="danger">
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mr-(--space-1)">
      <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
    Error
  </Badge>
</Stack>
        `.trim(),
      },
    },
  },
};

export const AsChild: Story = {
  name: "Pattern: As Child",
  render: () => (
    <Stack direction="row" align="center" gap="sm">
      <Badge asChild variant="subtle" intent="default">
        <abbr title="Work in Progress">WIP</abbr>
      </Badge>
      <Badge asChild variant="outline" intent="success">
        <a href="#stable" className="no-underline">
          v2.0 Stable
        </a>
      </Badge>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Stack direction="row" align="center" gap="sm">
  <Badge asChild variant="subtle" intent="default">
    <abbr title="Work in Progress">WIP</abbr>
  </Badge>
  <Badge asChild variant="outline" intent="success">
    <a href="#stable" className="no-underline">v2.0 Stable</a>
  </Badge>
</Stack>
        `.trim(),
      },
    },
  },
};
