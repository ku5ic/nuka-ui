import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "@nuka/components/Tag";

const noop = () => undefined;

const meta = {
  title: "Components/Tag",
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
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
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
    </div>
  ),
};

export const IntentSuccess: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
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
    </div>
  ),
};

export const IntentWarning: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
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
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
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
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "0.75rem",
        alignItems: "flex-end",
      }}
    >
      <Tag size="sm" onDismiss={noop}>
        Small
      </Tag>
      <Tag size="md" onDismiss={noop}>
        Medium
      </Tag>
      <Tag size="lg" onDismiss={noop}>
        Large
      </Tag>
    </div>
  ),
};

export const Dismissible: Story = {
  name: "Dismissible",
  render: function DismissibleStory() {
    const [visible, setVisible] = React.useState(true);

    if (!visible) {
      return (
        <button
          type="button"
          onClick={() => setVisible(true)}
          style={{ fontSize: "0.875rem" }}
        >
          Reset
        </button>
      );
    }

    return (
      <Tag onDismiss={() => setVisible(false)} dismissLabel="Remove React">
        React
      </Tag>
    );
  },
};

export const Static: Story = {
  name: "Static",
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
      <Tag>React</Tag>
      <Tag>TypeScript</Tag>
      <Tag>Tailwind</Tag>
    </div>
  ),
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
        <button
          type="button"
          onClick={() =>
            setTags(["React", "TypeScript", "Tailwind", "Storybook"])
          }
          style={{ fontSize: "0.875rem" }}
        >
          Reset filters
        </button>
      );
    }

    return (
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
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
      </div>
    );
  },
};
