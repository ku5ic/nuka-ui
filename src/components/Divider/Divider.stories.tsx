import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "@nuka/components/Divider";
import { Button } from "@nuka/components/Button";
import { Card, CardBody } from "@nuka/components/Card";
import { Heading } from "@nuka/components/Heading";
import { Input } from "@nuka/components/Input";
import { Stack } from "@nuka/components/Stack";
import { Text } from "@nuka/components/Text";

const meta = {
  title: "Display/Divider",
  component: Divider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    label: {
      control: "text",
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  decorators: [
    (Story) => (
      <Stack className="w-96">
        <Story />
      </Stack>
    ),
  ],
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
  render: (args) => (
    <Stack direction="row" align="center" gap="md" className="h-8">
      <Text size="sm">Left</Text>
      <Divider {...args} />
      <Text size="sm">Right</Text>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Stack direction="row" align="center" gap="md" className="h-8">
  <Text size="sm">Left</Text>
  <Divider orientation="vertical" />
  <Text size="sm">Right</Text>
</Stack>
        `.trim(),
      },
    },
  },
};

export const WithLabel: Story = {
  args: {
    label: "or",
  },
  decorators: [
    (Story) => (
      <Stack className="w-96">
        <Story />
      </Stack>
    ),
  ],
};

export const Small: Story = {
  args: {
    size: "sm",
  },
  decorators: [
    (Story) => (
      <Stack className="w-96">
        <Story />
      </Stack>
    ),
  ],
};

export const Medium: Story = {
  args: {
    size: "md",
  },
  decorators: [
    (Story) => (
      <Stack className="w-96">
        <Story />
      </Stack>
    ),
  ],
};

export const Large: Story = {
  args: {
    size: "lg",
  },
  decorators: [
    (Story) => (
      <Stack className="w-96">
        <Story />
      </Stack>
    ),
  ],
};

export const AllOrientations: Story = {
  render: () => (
    <Stack direction="row" gap="lg" className="items-stretch">
      <Stack gap="sm" className="w-64">
        <Text size="sm" color="muted">
          Horizontal
        </Text>
        <Divider />
      </Stack>
      <Stack direction="row" align="center" gap="md">
        <Text size="sm" color="muted">
          Vertical
        </Text>
        <Divider orientation="vertical" />
        <Text size="sm" color="muted">
          between
        </Text>
      </Stack>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Stack direction="row" gap="lg" className="items-stretch">
  <Stack gap="sm" className="w-64">
    <Text size="sm" color="muted">Horizontal</Text>
    <Divider />
  </Stack>
  <Stack direction="row" align="center" gap="md">
    <Text size="sm" color="muted">Vertical</Text>
    <Divider orientation="vertical" />
    <Text size="sm" color="muted">between</Text>
  </Stack>
</Stack>
        `.trim(),
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <Stack gap="lg" className="w-96">
      <Stack gap="xs">
        <Text size="xs" color="muted">
          sm (1px)
        </Text>
        <Divider size="sm" />
      </Stack>
      <Stack gap="xs">
        <Text size="xs" color="muted">
          md (1px, default)
        </Text>
        <Divider size="md" />
      </Stack>
      <Stack gap="xs">
        <Text size="xs" color="muted">
          lg (2px)
        </Text>
        <Divider size="lg" />
      </Stack>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Stack gap="lg" className="w-96">
  <Stack gap="xs">
    <Text size="xs" color="muted">sm (1px)</Text>
    <Divider size="sm" />
  </Stack>
  <Stack gap="xs">
    <Text size="xs" color="muted">md (1px, default)</Text>
    <Divider size="md" />
  </Stack>
  <Stack gap="xs">
    <Text size="xs" color="muted">lg (2px)</Text>
    <Divider size="lg" />
  </Stack>
</Stack>
        `.trim(),
      },
    },
  },
};

export const PatternSectionSeparator: Story = {
  name: "Pattern: Section separator",
  render: () => (
    <Card className="max-w-sm">
      <CardBody>
        <Stack gap="sm">
          <Heading as="h3" size="xl" weight="semibold">
            Account settings
          </Heading>
          <Text size="sm" color="muted">
            Manage your profile and preferences.
          </Text>
        </Stack>
        <Divider className="my-(--space-4)" />
        <Stack gap="sm">
          <Heading as="h3" size="xl" weight="semibold">
            Danger zone
          </Heading>
          <Text size="sm" color="muted">
            Irreversible actions like account deletion.
          </Text>
        </Stack>
      </CardBody>
    </Card>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Heading as="h3" size="xl" weight="semibold">Account settings</Heading>
<Text size="sm" color="muted">Manage your profile and preferences.</Text>

<Divider />

<Heading as="h3" size="xl" weight="semibold">Danger zone</Heading>
<Text size="sm" color="muted">Irreversible actions like account deletion.</Text>
        `.trim(),
      },
    },
  },
};

export const PatternLabeledDivider: Story = {
  name: "Pattern: Labeled divider",
  render: () => (
    <Stack className="max-w-xs">
      <Button variant="outline" className="w-full">
        Continue with Google
      </Button>
      <Divider label="or" className="my-(--space-4)" />
      <Stack gap="sm">
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
      </Stack>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Stack className="max-w-xs">
  <Button variant="outline" className="w-full">Continue with Google</Button>
  <Divider label="or" className="my-(--space-4)" />
  <Stack gap="sm">
    <Input type="email" placeholder="Email" />
    <Input type="password" placeholder="Password" />
  </Stack>
</Stack>
        `.trim(),
      },
    },
  },
};

export const PatternVerticalInNav: Story = {
  name: "Pattern: Vertical in nav",
  render: () => (
    <Card asChild>
      <nav>
        <CardBody>
          <Stack direction="row" align="center" gap="sm">
            <Text as="span" size="sm" weight="medium">
              Home
            </Text>
            <Text as="span" size="sm">
              Projects
            </Text>
            <Divider orientation="vertical" className="h-5" />
            <Text as="span" size="sm" color="muted">
              Settings
            </Text>
            <Text as="span" size="sm" color="muted">
              Help
            </Text>
          </Stack>
        </CardBody>
      </nav>
    </Card>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Card asChild>
  <nav>
    <CardBody>
      <Stack direction="row" align="center" gap="sm">
        <Text as="span" size="sm" weight="medium">Home</Text>
        <Text as="span" size="sm">Projects</Text>
        <Divider orientation="vertical" className="h-5" />
        <Text as="span" size="sm" color="muted">Settings</Text>
        <Text as="span" size="sm" color="muted">Help</Text>
      </Stack>
    </CardBody>
  </nav>
</Card>
        `.trim(),
      },
    },
  },
};

export const ResponsiveOrientation: Story = {
  name: "Responsive Orientation",
  render: () => (
    <Stack
      direction={{ base: "column", md: "row" }}
      gap="md"
      align={{ base: "stretch", md: "center" }}
    >
      <Text>First section</Text>
      <Divider orientation={{ base: "horizontal", md: "vertical" }} />
      <Text>Second section</Text>
      <Divider orientation={{ base: "horizontal", md: "vertical" }} />
      <Text>Third section</Text>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Stack direction={{ base: "column", md: "row" }} gap="md" align={{ base: "stretch", md: "center" }}>
  <Text>First section</Text>
  <Divider orientation={{ base: "horizontal", md: "vertical" }} />
  <Text>Second section</Text>
</Stack>
        `.trim(),
      },
    },
  },
};
