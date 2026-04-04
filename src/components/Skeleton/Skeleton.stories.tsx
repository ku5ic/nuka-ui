import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "@vault/components/Skeleton";

const meta = {
  title: "Components/Skeleton",
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
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: 300 }}>
      <Skeleton shape="text" className="w-full" style={{ fontSize: "1rem" }} />
      <Skeleton shape="text" className="w-4/5" style={{ fontSize: "1rem" }} />
      <Skeleton shape="text" className="w-3/5" style={{ fontSize: "1rem" }} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Skeleton className="w-16 h-16" />
      <Skeleton className="w-32 h-8" />
      <Skeleton className="w-64 h-48" />
    </div>
  ),
};

export const ArticleCard: Story = {
  name: "Pattern: Article Card",
  render: () => (
    <div
      style={{
        width: 320,
        padding: "1rem",
        border: "1px solid #e5e7eb",
        borderRadius: "0.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}
    >
      <Skeleton className="w-full h-40" />
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <Skeleton shape="circle" style={{ width: 40, height: 40 }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.375rem" }}>
          <Skeleton shape="text" className="w-24" style={{ fontSize: "0.875rem" }} />
          <Skeleton shape="text" className="w-16" style={{ fontSize: "0.75rem" }} />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
        <Skeleton shape="text" className="w-full" style={{ fontSize: "1rem" }} />
        <Skeleton shape="text" className="w-full" style={{ fontSize: "1rem" }} />
        <Skeleton shape="text" className="w-3/4" style={{ fontSize: "1rem" }} />
      </div>
    </div>
  ),
};

export const TableRows: Story = {
  name: "Pattern: Table Rows",
  render: () => (
    <div style={{ width: 500, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {Array.from({ length: 4 }, (_, row) => (
        <div
          key={row}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.5fr 1fr",
            gap: "0.75rem",
          }}
        >
          <Skeleton shape="text" style={{ fontSize: "0.875rem" }} />
          <Skeleton shape="text" style={{ fontSize: "0.875rem" }} />
          <Skeleton shape="text" style={{ fontSize: "0.875rem" }} />
        </div>
      ))}
    </div>
  ),
};
