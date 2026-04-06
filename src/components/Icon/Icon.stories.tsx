import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "@nuka/components/Icon";
import { Button } from "@nuka/components/Button";
import { Text } from "@nuka/components/Text";

// Story-only placeholder: inline SVG icons for demonstration, not nuka-ui components
const MockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="9" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const meta = {
  title: "Display/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    ref: { control: false },
    children: { control: false },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
    color: {
      control: "select",
      options: ["inherit", "base", "muted", "subtle", "inverse", "disabled"],
    },
    label: { control: "text" },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <MockIcon />,
  },
};

export const SizeSm: Story = {
  name: "Size: sm",
  args: {
    size: "sm",
    children: <MockIcon />,
  },
};

export const SizeMd: Story = {
  name: "Size: md",
  args: {
    size: "md",
    children: <MockIcon />,
  },
};

export const SizeLg: Story = {
  name: "Size: lg",
  args: {
    size: "lg",
    children: <MockIcon />,
  },
};

export const SizeXl: Story = {
  name: "Size: xl",
  args: {
    size: "xl",
    children: <MockIcon />,
  },
};

export const AllSizes: Story = {
  args: { children: <MockIcon /> },
  render: () => (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "1.5rem" }}>
      {(
        [
          ["sm", "16px"],
          ["md", "24px"],
          ["lg", "32px"],
          ["xl", "40px"],
        ] as const
      ).map(([size, px]) => (
        <div
          key={size}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <Icon size={size}>
            <MockIcon />
          </Icon>
          <span
            style={{
              fontSize: "0.75rem",
              color: "var(--nuka-text-muted)",
            }}
          >
            {size} ({px})
          </span>
        </div>
      ))}
    </div>
  ),
};

export const ColorBase: Story = {
  name: "Color: base",
  args: {
    color: "base",
    children: <MockIcon />,
  },
};

export const ColorMuted: Story = {
  name: "Color: muted",
  args: {
    color: "muted",
    children: <MockIcon />,
  },
};

export const ColorSubtle: Story = {
  name: "Color: subtle",
  args: {
    color: "subtle",
    children: <MockIcon />,
  },
};

export const ColorDisabled: Story = {
  name: "Color: disabled",
  args: {
    color: "disabled",
    children: <MockIcon />,
  },
};

export const ColorInverse: Story = {
  name: "Color: inverse",
  args: {
    color: "inverse",
    children: <MockIcon />,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: "1.5rem",
          borderRadius: "var(--radius-lg)",
          backgroundColor: "var(--nuka-bg-emphasis)",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const Decorative: Story = {
  args: {
    children: <MockIcon />,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Without a `label` prop, Icon renders with `aria-hidden=\"true\"`. The icon is decorative and excluded from the accessibility tree. Use this when the icon is alongside visible text that already conveys the meaning.",
      },
    },
  },
};

export const Labelled: Story = {
  args: {
    label: "Close dialog",
    children: <CloseIcon />,
  },
  parameters: {
    docs: {
      description: {
        story:
          "With a `label` prop, Icon renders with `role=\"img\"` and `aria-label`. Use this when the icon is the sole content and must convey meaning to assistive technology.",
      },
    },
  },
};

export const PatternInlineWithText: Story = {
  name: "Pattern: Inline with Text",
  args: { children: <CheckIcon /> },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <Icon size="md" color="muted">
        <CheckIcon />
      </Icon>
      <Text size="sm" color="muted">
        Changes saved successfully
      </Text>
    </div>
  ),
};

export const PatternIconButton: Story = {
  name: "Pattern: Icon Button",
  args: { children: <CloseIcon /> },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <Button variant="ghost" intent="default" size="sm" aria-label="Close">
        <Icon size="md">
          <CloseIcon />
        </Icon>
      </Button>
      <Button variant="primary" intent="default" size="md">
        <Icon size="md" color="inverse">
          <CheckIcon />
        </Icon>
        Confirm
      </Button>
    </div>
  ),
};
