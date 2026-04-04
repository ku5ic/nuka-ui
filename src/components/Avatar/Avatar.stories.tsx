import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "@nuka/components/Avatar";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    ref: { control: false },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    shape: {
      control: "select",
      options: ["circle", "square"],
    },
    src: { control: "text" },
    alt: { control: "text" },
    name: { control: "text" },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "https://i.pravatar.cc/150?u=nuka-ui",
    alt: "User avatar",
    size: "md",
    shape: "circle",
  },
};

export const Initials: Story = {
  args: {
    name: "Jane Smith",
    size: "md",
  },
};

export const IconFallback: Story = {
  args: {
    size: "md",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "1rem" }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <div
          key={size}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <Avatar size={size} name="Jane Smith" />
          <span
            style={{
              fontSize: "0.75rem",
              color: "var(--nuka-text-muted)",
            }}
          >
            {size}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const ShapeSquare: Story = {
  args: {
    name: "Jane Smith",
    shape: "square",
    size: "md",
  },
};

export const BrokenImage: Story = {
  args: {
    src: "https://example.com/does-not-exist.jpg",
    name: "Jane Smith",
    size: "md",
  },
};

export const PatternUserProfile: Story = {
  name: "Pattern: User Profile",
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <Avatar name="Jane Smith" size="lg" />
      <div style={{ display: "flex", flexDirection: "column", gap: "0.125rem" }}>
        <span
          style={{
            fontSize: "var(--font-size-sm)",
            fontWeight: 500,
            color: "var(--nuka-text-base)",
          }}
        >
          Jane Smith
        </span>
        <span
          style={{
            fontSize: "var(--font-size-xs)",
            color: "var(--nuka-text-muted)",
          }}
        >
          Product Designer
        </span>
      </div>
    </div>
  ),
};

export const PatternAvatarStack: Story = {
  name: "Pattern: Avatar Stack",
  render: () => {
    const users = [
      { name: "Alice Brown", src: "https://i.pravatar.cc/150?u=alice" },
      { name: "Bob Chen", src: "https://i.pravatar.cc/150?u=bob" },
      { name: "Carol Davis" },
      { name: "Dan Evans", src: "https://i.pravatar.cc/150?u=dan" },
      { name: "Eve Foster" },
    ];

    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {users.map((user, i) => (
          <div
            key={user.name}
            style={{
              marginLeft: i === 0 ? 0 : "-0.5rem",
              position: "relative",
              zIndex: users.length - i,
            }}
          >
            <Avatar
              name={user.name}
              {...(user.src ? { src: user.src, alt: user.name } : {})}
              size="sm"
              style={{
                boxShadow: "0 0 0 2px var(--nuka-bg-base)",
              }}
            />
          </div>
        ))}
      </div>
    );
  },
};
