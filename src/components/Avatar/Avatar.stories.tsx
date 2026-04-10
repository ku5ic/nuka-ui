import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "@nuka/components/Avatar";
import { Stack } from "@nuka/components/Stack";
import { Text } from "@nuka/components/Text";

const meta = {
  title: "Display/Avatar",
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
    <Stack direction="row" align="end" gap="md">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Stack key={size} align="center" gap="xs">
          <Avatar size={size} name="Jane Smith" />
          <Text size="xs" color="muted">
            {size}
          </Text>
        </Stack>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Stack direction="row" align="end" gap="md">
  <Stack align="center" gap="xs">
    <Avatar size="xs" name="Jane Smith" />
    <Text size="xs" color="muted">xs</Text>
  </Stack>
  <Stack align="center" gap="xs">
    <Avatar size="sm" name="Jane Smith" />
    <Text size="xs" color="muted">sm</Text>
  </Stack>
  <Stack align="center" gap="xs">
    <Avatar size="md" name="Jane Smith" />
    <Text size="xs" color="muted">md</Text>
  </Stack>
  <Stack align="center" gap="xs">
    <Avatar size="lg" name="Jane Smith" />
    <Text size="xs" color="muted">lg</Text>
  </Stack>
  <Stack align="center" gap="xs">
    <Avatar size="xl" name="Jane Smith" />
    <Text size="xs" color="muted">xl</Text>
  </Stack>
</Stack>
        `.trim(),
      },
    },
  },
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
    <Stack direction="row" align="center" gap="sm">
      <Avatar name="Jane Smith" size="lg" />
      <Stack gap="none">
        <Text size="sm" weight="medium">
          Jane Smith
        </Text>
        <Text size="xs" color="muted">
          Product Designer
        </Text>
      </Stack>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Stack direction="row" align="center" gap="sm">
  <Avatar name="Jane Smith" size="lg" />
  <Stack gap="none">
    <Text size="sm" weight="medium">Jane Smith</Text>
    <Text size="xs" color="muted">Product Designer</Text>
  </Stack>
</Stack>
        `.trim(),
      },
    },
  },
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
      <Stack direction="row" align="center">
        {users.map((user, i) => (
          <div
            key={user.name}
            className="relative"
            style={{
              marginLeft: i === 0 ? 0 : "-0.5rem",
              zIndex: users.length - i,
            }}
          >
            <Avatar
              name={user.name}
              {...(user.src ? { src: user.src, alt: user.name } : {})}
              size="sm"
              className="ring-2 ring-(--nuka-bg-base)"
            />
          </div>
        ))}
      </Stack>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
<Stack direction="row" align="center">
  <Avatar name="Alice Brown" src="https://i.pravatar.cc/150?u=alice" alt="Alice Brown" size="sm" className="ring-2 ring-(--nuka-bg-base)" />
  <div className="relative" style={{ marginLeft: "-0.5rem", zIndex: 4 }}>
    <Avatar name="Bob Chen" src="https://i.pravatar.cc/150?u=bob" alt="Bob Chen" size="sm" className="ring-2 ring-(--nuka-bg-base)" />
  </div>
  <div className="relative" style={{ marginLeft: "-0.5rem", zIndex: 3 }}>
    <Avatar name="Carol Davis" size="sm" className="ring-2 ring-(--nuka-bg-base)" />
  </div>
  <div className="relative" style={{ marginLeft: "-0.5rem", zIndex: 2 }}>
    <Avatar name="Dan Evans" src="https://i.pravatar.cc/150?u=dan" alt="Dan Evans" size="sm" className="ring-2 ring-(--nuka-bg-base)" />
  </div>
  <div className="relative" style={{ marginLeft: "-0.5rem", zIndex: 1 }}>
    <Avatar name="Eve Foster" size="sm" className="ring-2 ring-(--nuka-bg-base)" />
  </div>
</Stack>
        `.trim(),
      },
    },
  },
};
