import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "@nuka/components/Tag";
import { Button } from "@nuka/components/Button";
import { Stack } from "@nuka/components/Stack";

const noop = () => undefined;

const meta = {
  title: "Display/Tag",
  component: Tag,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    onDismiss: noop,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost"],
    },
    intent: {
      control: "select",
      options: ["default", "danger", "success", "warning"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    onDismiss: {
      control: false,
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    intent: "default",
    size: "md",
    children: "Tag",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    intent: "default",
    size: "md",
    children: "Tag",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    intent: "default",
    size: "md",
    children: "Tag",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    intent: "default",
    size: "md",
    children: "Tag",
  },
};

export const IntentDanger: Story = {
  render: () => (
    <Stack direction="row" gap="sm" align="center">
      <Tag variant="primary" intent="danger" onDismiss={noop}>
        Primary
      </Tag>
      <Tag variant="secondary" intent="danger" onDismiss={noop}>
        Secondary
      </Tag>
      <Tag variant="outline" intent="danger" onDismiss={noop}>
        Outline
      </Tag>
      <Tag variant="ghost" intent="danger" onDismiss={noop}>
        Ghost
      </Tag>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Stack direction="row" gap="sm" align="center">
  <Tag variant="primary" intent="danger" onDismiss={() => {}}>Primary</Tag>
  <Tag variant="secondary" intent="danger" onDismiss={() => {}}>Secondary</Tag>
  <Tag variant="outline" intent="danger" onDismiss={() => {}}>Outline</Tag>
  <Tag variant="ghost" intent="danger" onDismiss={() => {}}>Ghost</Tag>
</Stack>
        `.trim(),
      },
    },
  },
};

export const IntentSuccess: Story = {
  render: () => (
    <Stack direction="row" gap="sm" align="center">
      <Tag variant="primary" intent="success" onDismiss={noop}>
        Primary
      </Tag>
      <Tag variant="secondary" intent="success" onDismiss={noop}>
        Secondary
      </Tag>
      <Tag variant="outline" intent="success" onDismiss={noop}>
        Outline
      </Tag>
      <Tag variant="ghost" intent="success" onDismiss={noop}>
        Ghost
      </Tag>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Stack direction="row" gap="sm" align="center">
  <Tag variant="primary" intent="success" onDismiss={() => {}}>Primary</Tag>
  <Tag variant="secondary" intent="success" onDismiss={() => {}}>Secondary</Tag>
  <Tag variant="outline" intent="success" onDismiss={() => {}}>Outline</Tag>
  <Tag variant="ghost" intent="success" onDismiss={() => {}}>Ghost</Tag>
</Stack>
        `.trim(),
      },
    },
  },
};

export const IntentWarning: Story = {
  render: () => (
    <Stack direction="row" gap="sm" align="center">
      <Tag variant="primary" intent="warning" onDismiss={noop}>
        Primary
      </Tag>
      <Tag variant="secondary" intent="warning" onDismiss={noop}>
        Secondary
      </Tag>
      <Tag variant="outline" intent="warning" onDismiss={noop}>
        Outline
      </Tag>
      <Tag variant="ghost" intent="warning" onDismiss={noop}>
        Ghost
      </Tag>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Stack direction="row" gap="sm" align="center">
  <Tag variant="primary" intent="warning" onDismiss={() => {}}>Primary</Tag>
  <Tag variant="secondary" intent="warning" onDismiss={() => {}}>Secondary</Tag>
  <Tag variant="outline" intent="warning" onDismiss={() => {}}>Outline</Tag>
  <Tag variant="ghost" intent="warning" onDismiss={() => {}}>Ghost</Tag>
</Stack>
        `.trim(),
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <Stack direction="row" gap="sm" align="center">
      <Tag variant="primary" onDismiss={noop}>
        Primary
      </Tag>
      <Tag variant="secondary" onDismiss={noop}>
        Secondary
      </Tag>
      <Tag variant="outline" onDismiss={noop}>
        Outline
      </Tag>
      <Tag variant="ghost" onDismiss={noop}>
        Ghost
      </Tag>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Stack direction="row" gap="sm" align="center">
  <Tag variant="primary" onDismiss={() => {}}>Primary</Tag>
  <Tag variant="secondary" onDismiss={() => {}}>Secondary</Tag>
  <Tag variant="outline" onDismiss={() => {}}>Outline</Tag>
  <Tag variant="ghost" onDismiss={() => {}}>Ghost</Tag>
</Stack>
        `.trim(),
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <Stack direction="row" gap="sm" align="end">
      <Tag size="sm" onDismiss={noop}>
        Small
      </Tag>
      <Tag size="md" onDismiss={noop}>
        Medium
      </Tag>
      <Tag size="lg" onDismiss={noop}>
        Large
      </Tag>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Stack direction="row" gap="sm" align="end">
  <Tag size="sm" onDismiss={() => {}}>Small</Tag>
  <Tag size="md" onDismiss={() => {}}>Medium</Tag>
  <Tag size="lg" onDismiss={() => {}}>Large</Tag>
</Stack>
        `.trim(),
      },
    },
  },
};

export const Dismissible: Story = {
  name: "Dismissible",
  render: function DismissibleStory() {
    const [visible, setVisible] = React.useState(true);

    if (!visible) {
      return (
        <Button variant="ghost" size="sm" onClick={() => setVisible(true)}>
          Reset
        </Button>
      );
    }

    return (
      <Tag onDismiss={() => setVisible(false)} dismissLabel="Remove React">
        React
      </Tag>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
function Example() {
  const [visible, setVisible] = React.useState(true);
  if (!visible) {
    return (
      <Button variant="ghost" size="sm" onClick={() => setVisible(true)}>
        Reset
      </Button>
    );
  }
  return (
    <Tag onDismiss={() => setVisible(false)} dismissLabel="Remove React">
      React
    </Tag>
  );
}
        `.trim(),
      },
    },
  },
};

export const Static: Story = {
  name: "Static",
  render: () => (
    <Stack direction="row" gap="sm" align="center">
      <Tag>React</Tag>
      <Tag>TypeScript</Tag>
      <Tag>Tailwind</Tag>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Stack direction="row" gap="sm" align="center">
  <Tag>React</Tag>
  <Tag>TypeScript</Tag>
  <Tag>Tailwind</Tag>
</Stack>
        `.trim(),
      },
    },
  },
};

export const FilterTags: Story = {
  name: "Pattern: Filter Tags",
  render: function FilterTagsStory() {
    const [tags, setTags] = React.useState([
      "React",
      "TypeScript",
      "Tailwind",
      "Storybook",
    ]);

    const removeTag = (tag: string) => {
      setTags((prev) => prev.filter((t) => t !== tag));
    };

    if (tags.length === 0) {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            setTags(["React", "TypeScript", "Tailwind", "Storybook"])
          }
        >
          Reset filters
        </Button>
      );
    }

    return (
      <Stack direction="row" gap="xs" className="flex-wrap">
        {tags.map((tag) => (
          <Tag
            key={tag}
            variant="secondary"
            onDismiss={() => removeTag(tag)}
            dismissLabel={`Remove ${tag}`}
          >
            {tag}
          </Tag>
        ))}
      </Stack>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
function Example() {
  const [tags, setTags] = React.useState([
    "React",
    "TypeScript",
    "Tailwind",
    "Storybook",
  ]);

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  if (tags.length === 0) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setTags(["React", "TypeScript", "Tailwind", "Storybook"])}
      >
        Reset filters
      </Button>
    );
  }

  return (
    <Stack direction="row" gap="xs" className="flex-wrap">
      {tags.map((tag) => (
        <Tag
          key={tag}
          variant="secondary"
          onDismiss={() => removeTag(tag)}
          dismissLabel={\`Remove \${tag}\`}
        >
          {tag}
        </Tag>
      ))}
    </Stack>
  );
}
        `.trim(),
      },
    },
  },
};
