import type { Meta, StoryObj } from "@storybook/react";
import { VisuallyHidden } from "@nuka/components/VisuallyHidden";
import { Button } from "@nuka/components/Button";
import { Icon } from "@nuka/components/Icon";
import { Stack } from "@nuka/components/Stack";
import { Text } from "@nuka/components/Text";

const meta = {
  title: "Accessibility/VisuallyHidden",
  component: VisuallyHidden,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    as: {
      control: "select",
      options: ["span", "p", "div", "h1", "h2", "h3", "h4", "h5", "h6"],
    },
  },
} satisfies Meta<typeof VisuallyHidden>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "This text is only visible to screen readers",
  },
  parameters: {
    docs: {
      source: {
        code: `
<VisuallyHidden>This text is only visible to screen readers</VisuallyHidden>
        `.trim(),
      },
    },
  },
};

export const AsHeading: Story = {
  name: "As Heading",
  render: () => (
    <Stack gap="sm">
      <VisuallyHidden as="h2">Section title for screen readers</VisuallyHidden>
      <Text color="muted" size="sm">
        The h2 above is visually hidden but present in the document outline.
      </Text>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<VisuallyHidden as="h2">Section title for screen readers</VisuallyHidden>
        `.trim(),
      },
    },
  },
};

export const WithIconButton: Story = {
  name: "Pattern: Icon Button",
  render: () => (
    <Button variant="ghost" aria-label="Close dialog">
      <Icon size="sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </Icon>
      <VisuallyHidden>Close dialog</VisuallyHidden>
    </Button>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Button variant="ghost" aria-label="Close dialog">
  <Icon size="sm"><XIcon /></Icon>
  <VisuallyHidden>Close dialog</VisuallyHidden>
</Button>
        `.trim(),
      },
    },
  },
};
