import type { Meta, StoryObj } from "@storybook/react";
import { Code } from "@nuka/components/Code";
import { Stack } from "@nuka/components/Stack";
import { Text } from "@nuka/components/Text";

const meta = {
  title: "Typography/Code",
  component: Code,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["subtle", "outline", "ghost"],
    },
    intent: {
      control: "select",
      options: ["default", "danger", "success", "warning"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Subtle: Story = {
  args: {
    variant: "subtle",
    intent: "default",
    size: "md",
    children: "useState",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    intent: "default",
    size: "md",
    children: "useState",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    intent: "default",
    size: "md",
    children: "useState",
  },
};

export const IntentDanger: Story = {
  name: "Intent: Danger",
  parameters: {
    docs: {
      source: {
        code: `
<Stack direction="row" align="center" className="gap-3">
  <Code variant="subtle" intent="danger">undefined</Code>
  <Code variant="outline" intent="danger">undefined</Code>
  <Code variant="ghost" intent="danger">undefined</Code>
</Stack>
        `.trim(),
      },
    },
  },
  render: () => (
    <Stack direction="row" align="center" className="gap-3">
      <Code variant="subtle" intent="danger">
        undefined
      </Code>
      <Code variant="outline" intent="danger">
        undefined
      </Code>
      <Code variant="ghost" intent="danger">
        undefined
      </Code>
    </Stack>
  ),
};

export const IntentSuccess: Story = {
  name: "Intent: Success",
  parameters: {
    docs: {
      source: {
        code: `
<Stack direction="row" align="center" className="gap-3">
  <Code variant="subtle" intent="success">true</Code>
  <Code variant="outline" intent="success">true</Code>
  <Code variant="ghost" intent="success">true</Code>
</Stack>
        `.trim(),
      },
    },
  },
  render: () => (
    <Stack direction="row" align="center" className="gap-3">
      <Code variant="subtle" intent="success">
        true
      </Code>
      <Code variant="outline" intent="success">
        true
      </Code>
      <Code variant="ghost" intent="success">
        true
      </Code>
    </Stack>
  ),
};

export const IntentWarning: Story = {
  name: "Intent: Warning",
  parameters: {
    docs: {
      source: {
        code: `
<Stack direction="row" align="center" className="gap-3">
  <Code variant="subtle" intent="warning">deprecated</Code>
  <Code variant="outline" intent="warning">deprecated</Code>
  <Code variant="ghost" intent="warning">deprecated</Code>
</Stack>
        `.trim(),
      },
    },
  },
  render: () => (
    <Stack direction="row" align="center" className="gap-3">
      <Code variant="subtle" intent="warning">
        deprecated
      </Code>
      <Code variant="outline" intent="warning">
        deprecated
      </Code>
      <Code variant="ghost" intent="warning">
        deprecated
      </Code>
    </Stack>
  ),
};

export const AllVariants: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<div className="grid grid-cols-[repeat(5,auto)] items-center gap-3">
  <span />
  <Text size="xs" color="muted">Default</Text>
  <Text size="xs" color="muted">Danger</Text>
  <Text size="xs" color="muted">Success</Text>
  <Text size="xs" color="muted">Warning</Text>

  <Text size="xs" color="muted">Subtle</Text>
  <Code variant="subtle" intent="default">useState</Code>
  <Code variant="subtle" intent="danger">undefined</Code>
  <Code variant="subtle" intent="success">true</Code>
  <Code variant="subtle" intent="warning">deprecated</Code>

  <Text size="xs" color="muted">Outline</Text>
  <Code variant="outline" intent="default">useState</Code>
  <Code variant="outline" intent="danger">undefined</Code>
  <Code variant="outline" intent="success">true</Code>
  <Code variant="outline" intent="warning">deprecated</Code>

  <Text size="xs" color="muted">Ghost</Text>
  <Code variant="ghost" intent="default">useState</Code>
  <Code variant="ghost" intent="danger">undefined</Code>
  <Code variant="ghost" intent="success">true</Code>
  <Code variant="ghost" intent="warning">deprecated</Code>
</div>
        `.trim(),
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-[repeat(5,auto)] items-center gap-3">
      {/* Header row */}
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

      {/* Subtle */}
      <Text size="xs" color="muted">
        Subtle
      </Text>
      <Code variant="subtle" intent="default">
        useState
      </Code>
      <Code variant="subtle" intent="danger">
        undefined
      </Code>
      <Code variant="subtle" intent="success">
        true
      </Code>
      <Code variant="subtle" intent="warning">
        deprecated
      </Code>

      {/* Outline */}
      <Text size="xs" color="muted">
        Outline
      </Text>
      <Code variant="outline" intent="default">
        useState
      </Code>
      <Code variant="outline" intent="danger">
        undefined
      </Code>
      <Code variant="outline" intent="success">
        true
      </Code>
      <Code variant="outline" intent="warning">
        deprecated
      </Code>

      {/* Ghost */}
      <Text size="xs" color="muted">
        Ghost
      </Text>
      <Code variant="ghost" intent="default">
        useState
      </Code>
      <Code variant="ghost" intent="danger">
        undefined
      </Code>
      <Code variant="ghost" intent="success">
        true
      </Code>
      <Code variant="ghost" intent="warning">
        deprecated
      </Code>
    </div>
  ),
};

export const AllSizes: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Stack direction="row" align="end" className="gap-3">
  <Code size="sm">small</Code>
  <Code size="md">medium</Code>
  <Code size="lg">large</Code>
</Stack>
        `.trim(),
      },
    },
  },
  render: () => (
    <Stack direction="row" align="end" className="gap-3">
      <Code size="sm">small</Code>
      <Code size="md">medium</Code>
      <Code size="lg">large</Code>
    </Stack>
  ),
};

export const InlineInProse: Story = {
  name: "Pattern: Inline in Prose",
  parameters: {
    docs: {
      source: {
        code: `
<Text as="p" className="max-w-xl leading-relaxed">
  Call <Code>useState</Code> at the top level of your component to declare a
  state variable. The convention is to name state variables like{" "}
  <Code>something</Code> and <Code>setSomething</Code> using array
  destructuring. If the initial value is expensive to compute, pass a
  function to <Code>useState</Code> instead. It will only be called during
  the first render.
</Text>
        `.trim(),
      },
    },
  },
  render: () => (
    <Text as="p" className="max-w-xl leading-relaxed">
      Call <Code>useState</Code> at the top level of your component to declare a
      state variable. The convention is to name state variables like{" "}
      <Code>something</Code> and <Code>setSomething</Code> using array
      destructuring. If the initial value is expensive to compute, pass a
      function to <Code>useState</Code> instead. It will only be called during
      the first render.
    </Text>
  ),
};

export const IntentInContext: Story = {
  name: "Pattern: Intent in Context",
  parameters: {
    docs: {
      source: {
        code: `
<div className="grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2">
  <Code intent="danger">undefined</Code>
  <Text as="span" size="sm" color="muted">Variable has not been assigned a value</Text>

  <Code intent="danger">null</Code>
  <Text as="span" size="sm" color="muted">Intentional absence of any object value</Text>

  <Code intent="success">true</Code>
  <Text as="span" size="sm" color="muted">Assertion passed successfully</Text>

  <Code intent="warning">deprecated</Code>
  <Text as="span" size="sm" color="muted">This API will be removed in a future version</Text>
</div>
        `.trim(),
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2">
      <Code intent="danger">undefined</Code>
      <Text as="span" size="sm" color="muted">
        Variable has not been assigned a value
      </Text>

      <Code intent="danger">null</Code>
      <Text as="span" size="sm" color="muted">
        Intentional absence of any object value
      </Text>

      <Code intent="success">true</Code>
      <Text as="span" size="sm" color="muted">
        Assertion passed successfully
      </Text>

      <Code intent="warning">deprecated</Code>
      <Text as="span" size="sm" color="muted">
        This API will be removed in a future version
      </Text>
    </div>
  ),
};
