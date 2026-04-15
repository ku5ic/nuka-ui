import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea } from "@nuka/components/ScrollArea";
import { Stack } from "@nuka/components/Stack";
import { Text } from "@nuka/components/Text";
import { Heading } from "@nuka/components/Heading";
import { Card, CardHeader, CardBody } from "@nuka/components/Card";
import { Divider } from "@nuka/components/Divider";

const meta = {
  title: "Layout/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["vertical", "horizontal", "both"],
    },
    maxHeight: { control: "text" },
    maxWidth: { control: "text" },
  },
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const Paragraphs = ({ count = 12 }: { count?: number }) =>
  Array.from({ length: count }, (_, i) => (
    <Text key={i}>
      Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing
      elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </Text>
  ));

const HorizontalItems = ({ count = 10 }: { count?: number }) =>
  Array.from({ length: count }, (_, i) => (
    <Card key={i} className="w-[150px] shrink-0">
      <CardBody>
        <Text>Item {i + 1}</Text>
      </CardBody>
    </Card>
  ));

const MenuItems = ({ count = 20 }: { count?: number }) =>
  Array.from({ length: count }, (_, i) => (
    <div key={i}>
      <div className="px-4 py-2">
        <Text size="sm">Menu item {i + 1}</Text>
      </div>
      {i < count - 1 && <Divider />}
    </div>
  ));

export const Default: Story = {
  args: {
    maxHeight: "200px",
    children: (
      <Stack direction="column" gap="sm">
        <Paragraphs />
      </Stack>
    ),
  },
};

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
    maxWidth: "400px",
    children: (
      <Stack direction="row" gap="md" className="w-max">
        <HorizontalItems />
      </Stack>
    ),
  },
};

export const Both: Story = {
  args: {
    orientation: "both",
    maxHeight: "200px",
    maxWidth: "400px",
    children: (
      <div className="w-[800px]">
        <Stack direction="column" gap="sm">
          <Paragraphs />
        </Stack>
      </div>
    ),
  },
};

export const WithMaxHeight: Story = {
  name: "With maxHeight",
  args: {
    maxHeight: "300px",
    children: (
      <Stack direction="column" gap="sm">
        <Paragraphs />
      </Stack>
    ),
  },
};

export const InSidebar: Story = {
  name: "Pattern: Sidebar Navigation",
  args: {
    className: "flex-1",
    "aria-label": "Sidebar navigation",
    children: (
      <Stack direction="column" gap="none">
        <MenuItems />
      </Stack>
    ),
  },
  decorators: [
    (Story) => (
      <Card className="w-[260px] h-[400px] flex flex-col">
        <CardHeader>
          <Heading as="h3" size="xl">
            Navigation
          </Heading>
        </CardHeader>
        <Story />
      </Card>
    ),
  ],
};
