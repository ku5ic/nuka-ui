import type { Meta, StoryObj } from "@storybook/react";
import { Code } from "@nuka/components/Code";
import { Text } from "@nuka/components/Text";

const meta = {
  title: "Components/Code",
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
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
      <Code variant="subtle" intent="danger">
        undefined
      </Code>
      <Code variant="outline" intent="danger">
        undefined
      </Code>
      <Code variant="ghost" intent="danger">
        undefined
      </Code>
    </div>
  ),
};

export const IntentSuccess: Story = {
  name: "Intent: Success",
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
      <Code variant="subtle" intent="success">
        true
      </Code>
      <Code variant="outline" intent="success">
        true
      </Code>
      <Code variant="ghost" intent="success">
        true
      </Code>
    </div>
  ),
};

export const IntentWarning: Story = {
  name: "Intent: Warning",
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
      <Code variant="subtle" intent="warning">
        deprecated
      </Code>
      <Code variant="outline" intent="warning">
        deprecated
      </Code>
      <Code variant="ghost" intent="warning">
        deprecated
      </Code>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, auto)",
        gap: "0.75rem",
        alignItems: "center",
      }}
    >
      {/* Header row */}
      <span />
      <span style={{ fontSize: "0.75rem", color: "#666" }}>Default</span>
      <span style={{ fontSize: "0.75rem", color: "#666" }}>Danger</span>
      <span style={{ fontSize: "0.75rem", color: "#666" }}>Success</span>
      <span style={{ fontSize: "0.75rem", color: "#666" }}>Warning</span>

      {/* Subtle */}
      <span style={{ fontSize: "0.75rem", color: "#666" }}>Subtle</span>
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
      <span style={{ fontSize: "0.75rem", color: "#666" }}>Outline</span>
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
      <span style={{ fontSize: "0.75rem", color: "#666" }}>Ghost</span>
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
  render: () => (
    <div
      style={{ display: "flex", gap: "0.75rem", alignItems: "flex-end" }}
    >
      <Code size="sm">small</Code>
      <Code size="md">medium</Code>
      <Code size="lg">large</Code>
    </div>
  ),
};

export const InlineInProse: Story = {
  name: "Pattern: Inline in Prose",
  render: () => (
    <Text as="p" style={{ maxWidth: "36rem", lineHeight: 1.6 }}>
      Call <Code>useState</Code> at the top level of your component to declare a
      state variable. The convention is to name state variables
      like <Code>something</Code> and <Code>setSomething</Code> using array
      destructuring. If the initial value is expensive to compute, pass a
      function to <Code>useState</Code> instead — it will only be called during
      the first render.
    </Text>
  ),
};

export const IntentInContext: Story = {
  name: "Pattern: Intent in Context",
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: "0.5rem 0.75rem",
        alignItems: "center",
      }}
    >
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
