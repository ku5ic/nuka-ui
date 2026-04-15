import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Chip } from "@nuka/components/Chip";
import { Stack } from "@nuka/components/Stack";
import { Text } from "@nuka/components/Text";

const meta = {
  title: "Actions/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "subtle", "outline"],
    },
    intent: {
      control: "select",
      options: ["default", "danger", "success", "warning"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    selected: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Chip",
  },
};

export const Selected: Story = {
  args: {
    children: "Selected",
    selected: true,
  },
};

export const Solid: Story = {
  args: {
    variant: "solid",
    children: "Solid",
  },
};

export const Subtle: Story = {
  args: {
    variant: "subtle",
    children: "Subtle",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
};

export const DangerIntent: Story = {
  args: {
    intent: "danger",
    selected: true,
    children: "Danger",
  },
};

export const SuccessIntent: Story = {
  args: {
    intent: "success",
    selected: true,
    children: "Success",
  },
};

export const WarningIntent: Story = {
  args: {
    intent: "warning",
    selected: true,
    children: "Warning",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div
      className="grid items-center gap-3"
      style={{ gridTemplateColumns: "repeat(5, auto)" }}
    >
      <span />
      <Text size="xs" color="muted">
        Default
      </Text>
      <Text size="xs" color="muted">
        Danger
      </Text>
      <Text size="xs" color="muted">
        Success
      </Text>
      <Text size="xs" color="muted">
        Warning
      </Text>

      <Text size="xs" color="muted">
        Solid
      </Text>
      <Chip variant="solid">Default</Chip>
      <Chip variant="solid" intent="danger">
        Danger
      </Chip>
      <Chip variant="solid" intent="success">
        Success
      </Chip>
      <Chip variant="solid" intent="warning">
        Warning
      </Chip>

      <Text size="xs" color="muted">
        Solid (selected)
      </Text>
      <Chip variant="solid" selected>
        Default
      </Chip>
      <Chip variant="solid" intent="danger" selected>
        Danger
      </Chip>
      <Chip variant="solid" intent="success" selected>
        Success
      </Chip>
      <Chip variant="solid" intent="warning" selected>
        Warning
      </Chip>

      <Text size="xs" color="muted">
        Subtle
      </Text>
      <Chip variant="subtle">Default</Chip>
      <Chip variant="subtle" intent="danger">
        Danger
      </Chip>
      <Chip variant="subtle" intent="success">
        Success
      </Chip>
      <Chip variant="subtle" intent="warning">
        Warning
      </Chip>

      <Text size="xs" color="muted">
        Subtle (selected)
      </Text>
      <Chip variant="subtle" selected>
        Default
      </Chip>
      <Chip variant="subtle" intent="danger" selected>
        Danger
      </Chip>
      <Chip variant="subtle" intent="success" selected>
        Success
      </Chip>
      <Chip variant="subtle" intent="warning" selected>
        Warning
      </Chip>

      <Text size="xs" color="muted">
        Outline
      </Text>
      <Chip variant="outline">Default</Chip>
      <Chip variant="outline" intent="danger">
        Danger
      </Chip>
      <Chip variant="outline" intent="success">
        Success
      </Chip>
      <Chip variant="outline" intent="warning">
        Warning
      </Chip>

      <Text size="xs" color="muted">
        Outline (selected)
      </Text>
      <Chip variant="outline" selected>
        Default
      </Chip>
      <Chip variant="outline" intent="danger" selected>
        Danger
      </Chip>
      <Chip variant="outline" intent="success" selected>
        Success
      </Chip>
      <Chip variant="outline" intent="warning" selected>
        Warning
      </Chip>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Chip variant="solid">Default</Chip>
<Chip variant="solid" selected>Selected</Chip>
<Chip variant="subtle" intent="danger">Danger</Chip>
<Chip variant="outline" intent="success" selected>Active</Chip>
        `.trim(),
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <Stack direction="row" align="center" gap="sm">
      <Chip size="sm">Small</Chip>
      <Chip size="md">Medium</Chip>
      <Chip size="lg">Large</Chip>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Chip size="sm">Small</Chip>
<Chip size="md">Medium</Chip>
<Chip size="lg">Large</Chip>
        `.trim(),
      },
    },
  },
};

export const FilterGroup: Story = {
  name: "Pattern: Filter Group",
  render: function FilterGroupStory() {
    const categories = ["All", "Design", "Engineering", "Marketing", "Sales"];
    const [active, setActive] = React.useState("All");

    return (
      <Stack direction="row" gap="xs" wrap="wrap">
        {categories.map((cat) => (
          <Chip
            key={cat}
            selected={active === cat}
            onClick={() => setActive(cat)}
          >
            {cat}
          </Chip>
        ))}
      </Stack>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
const [active, setActive] = React.useState("All");
// ...
<Stack direction="row" gap="xs" wrap="wrap">
  {categories.map((cat) => (
    <Chip key={cat} selected={active === cat} onClick={() => setActive(cat)}>
      {cat}
    </Chip>
  ))}
</Stack>
        `.trim(),
      },
    },
  },
};

export const MultiSelect: Story = {
  name: "Pattern: Multi-Select Tags",
  render: function MultiSelectStory() {
    const tags = ["React", "TypeScript", "Tailwind", "Vitest", "Storybook"];
    const [selected, setSelected] = React.useState<Set<string>>(
      new Set(["React", "Tailwind"]),
    );

    const toggle = (tag: string) => {
      setSelected((prev) => {
        const next = new Set(prev);
        if (next.has(tag)) {
          next.delete(tag);
        } else {
          next.add(tag);
        }
        return next;
      });
    };

    return (
      <Stack gap="sm">
        <Stack direction="row" gap="xs" wrap="wrap">
          {tags.map((tag) => (
            <Chip
              key={tag}
              variant="outline"
              selected={selected.has(tag)}
              onClick={() => toggle(tag)}
            >
              {tag}
            </Chip>
          ))}
        </Stack>
        <Text size="xs" color="muted">
          Selected: {Array.from(selected).join(", ") || "none"}
        </Text>
      </Stack>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
const [selected, setSelected] = React.useState(new Set(["React", "Tailwind"]));
// ...
<Stack direction="row" gap="xs" wrap="wrap">
  {tags.map((tag) => (
    <Chip
      key={tag}
      variant="outline"
      selected={selected.has(tag)}
      onClick={() => toggle(tag)}
    >
      {tag}
    </Chip>
  ))}
</Stack>
        `.trim(),
      },
    },
  },
};
