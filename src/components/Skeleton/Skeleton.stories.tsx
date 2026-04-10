import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "@nuka/components/Skeleton";
import { Stack } from "@nuka/components/Stack";
import { Card, CardBody } from "@nuka/components/Card";

const meta = {
  title: "Feedback/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    shape: {
      control: "select",
      options: ["rect", "circle", "text"],
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RectDefault: Story = {
  name: "Rect (Default)",
  args: {
    className: "w-64 h-32",
  },
};

export const Circle: Story = {
  args: {
    shape: "circle",
    style: { width: 64, height: 64 },
  },
};

export const Text: Story = {
  render: () => (
    <Stack gap="sm" className="w-[300px]">
      <Skeleton shape="text" className="w-full text-base" />
      <Skeleton shape="text" className="w-4/5 text-base" />
      <Skeleton shape="text" className="w-3/5 text-base" />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Stack gap="sm" className="w-[300px]">
  <Skeleton shape="text" className="w-full text-base" />
  <Skeleton shape="text" className="w-4/5 text-base" />
  <Skeleton shape="text" className="w-3/5 text-base" />
</Stack>
        `.trim(),
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <Stack gap="md">
      <Skeleton className="w-16 h-16" />
      <Skeleton className="w-32 h-8" />
      <Skeleton className="w-64 h-48" />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Stack gap="md">
  <Skeleton className="w-16 h-16" />
  <Skeleton className="w-32 h-8" />
  <Skeleton className="w-64 h-48" />
</Stack>
        `.trim(),
      },
    },
  },
};

export const ArticleCard: Story = {
  name: "Pattern: Article Card",
  render: () => (
    <Card className="w-80">
      <CardBody>
        <Stack gap="md">
          <Skeleton className="w-full h-40" />
          <Stack direction="row" align="center" className="gap-3">
            <Skeleton shape="circle" className="size-10" />
            <Stack gap="none" className="flex-1 gap-1.5">
              <Skeleton shape="text" className="w-24 text-sm" />
              <Skeleton shape="text" className="w-16 text-xs" />
            </Stack>
          </Stack>
          <Stack gap="none" className="gap-1.5">
            <Skeleton shape="text" className="w-full text-base" />
            <Skeleton shape="text" className="w-full text-base" />
            <Skeleton shape="text" className="w-3/4 text-base" />
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Card className="w-80">
  <CardBody>
    <Stack gap="md">
      <Skeleton className="w-full h-40" />
      <Stack direction="row" align="center" className="gap-3">
        <Skeleton shape="circle" className="size-10" />
        <Stack gap="none" className="flex-1 gap-1.5">
          <Skeleton shape="text" className="w-24 text-sm" />
          <Skeleton shape="text" className="w-16 text-xs" />
        </Stack>
      </Stack>
      <Stack gap="none" className="gap-1.5">
        <Skeleton shape="text" className="w-full text-base" />
        <Skeleton shape="text" className="w-full text-base" />
        <Skeleton shape="text" className="w-3/4 text-base" />
      </Stack>
    </Stack>
  </CardBody>
</Card>
        `.trim(),
      },
    },
  },
};

export const TableRows: Story = {
  name: "Pattern: Table Rows",
  render: () => (
    <Stack gap="md" className="w-[500px]">
      {Array.from({ length: 4 }, (_, row) => (
        <div
          key={row}
          className="grid gap-3"
          style={{ gridTemplateColumns: "1fr 1.5fr 1fr" }}
        >
          <Skeleton shape="text" className="text-sm" />
          <Skeleton shape="text" className="text-sm" />
          <Skeleton shape="text" className="text-sm" />
        </div>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Stack gap="md" className="w-[500px]">
  <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 1.5fr 1fr" }}>
    <Skeleton shape="text" className="text-sm" />
    <Skeleton shape="text" className="text-sm" />
    <Skeleton shape="text" className="text-sm" />
  </div>
  <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 1.5fr 1fr" }}>
    <Skeleton shape="text" className="text-sm" />
    <Skeleton shape="text" className="text-sm" />
    <Skeleton shape="text" className="text-sm" />
  </div>
  <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 1.5fr 1fr" }}>
    <Skeleton shape="text" className="text-sm" />
    <Skeleton shape="text" className="text-sm" />
    <Skeleton shape="text" className="text-sm" />
  </div>
</Stack>
        `.trim(),
      },
    },
  },
};
