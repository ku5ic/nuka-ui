import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "@nuka/components/Spinner";
import { Button } from "@nuka/components/Button";
import { Card, CardBody } from "@nuka/components/Card";
import { Stack } from "@nuka/components/Stack";
import { Text } from "@nuka/components/Text";

const meta = {
  title: "Feedback/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    color: {
      control: "select",
      options: ["default", "muted", "inverse"],
    },
    label: {
      control: "text",
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SizeSm: Story = {
  name: "Size: sm",
  args: {
    size: "sm",
  },
};

export const SizeMd: Story = {
  name: "Size: md",
  args: {
    size: "md",
  },
};

export const SizeLg: Story = {
  name: "Size: lg",
  args: {
    size: "lg",
  },
};

export const ColorDefault: Story = {
  name: "Color: default",
  args: {
    color: "default",
  },
};

export const ColorMuted: Story = {
  name: "Color: muted",
  args: {
    color: "muted",
  },
};

export const ColorInverse: Story = {
  name: "Color: inverse",
  args: {
    color: "inverse",
  },
  decorators: [
    (Story) => (
      <div className="p-(--space-6) rounded-(--radius-lg) bg-(--nuka-bg-emphasis)">
        <Story />
      </div>
    ),
  ],
};

export const AllSizes: Story = {
  render: () => (
    <Stack direction="row" align="center" gap="lg">
      <Stack align="center" gap="sm">
        <Spinner size="sm" />
        <Text size="xs" color="muted">
          sm (16px)
        </Text>
      </Stack>
      <Stack align="center" gap="sm">
        <Spinner size="md" />
        <Text size="xs" color="muted">
          md (24px)
        </Text>
      </Stack>
      <Stack align="center" gap="sm">
        <Spinner size="lg" />
        <Text size="xs" color="muted">
          lg (32px)
        </Text>
      </Stack>
    </Stack>
  ),
};

export const WithLabel: Story = {
  args: {
    label: "Loading content",
  },
};

export const AriaHidden: Story = {
  name: "Aria Hidden (embedded)",
  args: {
    "aria-hidden": true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "When embedded inside another component (e.g. a Button), pass `aria-hidden={true}` to suppress the Spinner from the accessibility tree. The parent component should provide its own loading announcement.",
      },
    },
  },
};

export const PatternButtonLoading: Story = {
  name: "Pattern: Button Loading",
  render: () => (
    <Button variant="primary" disabled>
      <Spinner size="sm" color="inverse" aria-hidden={true} />
      Saving...
    </Button>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Button variant="primary" disabled>
  <Spinner size="sm" color="inverse" aria-hidden={true} />
  Saving...
</Button>
        `.trim(),
      },
    },
  },
};

export const PatternPageLoading: Story = {
  name: "Pattern: Page Loading",
  render: () => (
    <Card style={{ width: "24rem" }}>
      <CardBody>
        <Stack
          align="center"
          justify="center"
          gap="md"
          style={{ height: "14rem" }}
        >
          <Spinner size="lg" label="Loading page" />
          <Text size="sm" color="muted">
            Loading...
          </Text>
        </Stack>
      </CardBody>
    </Card>
  ),
};
