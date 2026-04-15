import type { Meta, StoryObj } from "@storybook/react";
import { SkipLink } from "@nuka/components/SkipLink";
import { Stack } from "@nuka/components/Stack";
import { Text } from "@nuka/components/Text";

const meta = {
  title: "Accessibility/SkipLink",
  component: SkipLink,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    targetId: {
      control: "text",
    },
  },
} satisfies Meta<typeof SkipLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <div className="p-(--space-8)">
      <SkipLink {...args} />
      <Stack gap="md">
        <Text color="muted" size="sm">
          Press Tab to reveal the skip link in the top-left corner.
        </Text>
        <nav className="flex gap-(--space-4) border-b border-(--nuka-border-base) pb-(--space-3)">
          <Text size="sm" weight="medium">
            Home
          </Text>
          <Text size="sm" weight="medium">
            About
          </Text>
          <Text size="sm" weight="medium">
            Contact
          </Text>
        </nav>
        <main id="main-content">
          <Text>Main content starts here.</Text>
        </main>
      </Stack>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<SkipLink />
<nav>...</nav>
<main id="main-content">...</main>
        `.trim(),
      },
    },
  },
};

export const CustomTarget: Story = {
  name: "Custom Target",
  render: () => (
    <div className="p-(--space-8)">
      <SkipLink targetId="content-area">Skip to content</SkipLink>
      <Stack gap="md">
        <Text color="muted" size="sm">
          Press Tab to reveal. Links to #content-area.
        </Text>
        <div id="content-area">
          <Text>Content area starts here.</Text>
        </div>
      </Stack>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<SkipLink targetId="content-area">Skip to content</SkipLink>
<div id="content-area">...</div>
        `.trim(),
      },
    },
  },
};

export const PageLayout: Story = {
  name: "Pattern: Page Layout",
  render: () => (
    <div>
      <SkipLink />
      <header className="flex items-center justify-between border-b border-(--nuka-border-base) px-(--space-6) py-(--space-3)">
        <Text size="lg" weight="bold">
          App
        </Text>
        <nav className="flex gap-(--space-4)">
          <a href="#" className="text-sm text-(--nuka-text-base)">
            Home
          </a>
          <a href="#" className="text-sm text-(--nuka-text-base)">
            Docs
          </a>
          <a href="#" className="text-sm text-(--nuka-text-base)">
            Blog
          </a>
        </nav>
      </header>
      <main id="main-content" className="p-(--space-6)">
        <Text>
          Keyboard users who Tab into the page see the skip link first, before
          the navigation. Pressing Enter jumps focus directly to this content.
        </Text>
      </main>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<SkipLink />
<header>
  <nav>...</nav>
</header>
<main id="main-content">
  Main content here.
</main>
        `.trim(),
      },
    },
  },
};
