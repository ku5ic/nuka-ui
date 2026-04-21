import type { Meta, StoryObj } from "@storybook/react";
import { Callout } from "@nuka/components/Callout";
import { Stack } from "@nuka/components/Stack";
import { Text } from "@nuka/components/Text";

const meta = {
  title: "Display/Callout",
  component: Callout,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
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
    asChild: {
      control: false,
    },
  },
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

const quote =
  "Design systems are the shared vocabulary between product and engineering.";

export const Primary: Story = {
  args: {
    variant: "primary",
    children: quote,
    citation: "Jane Doe, Head of Design",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: quote,
    citation: "Jane Doe, Head of Design",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: quote,
    citation: "Jane Doe, Head of Design",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: quote,
    citation: "Jane Doe, Head of Design",
  },
};

const variants = ["primary", "secondary", "outline", "ghost"] as const;
const intents = ["default", "danger", "success", "warning"] as const;

export const IntentDanger: Story = {
  name: "Intent: Danger",
  parameters: {
    docs: {
      source: {
        code: `
<Stack gap="sm" className="w-[480px]">
  <Callout variant="primary" intent="danger">Design systems are the shared vocabulary between product and engineering.</Callout>
  <Callout variant="secondary" intent="danger">Design systems are the shared vocabulary between product and engineering.</Callout>
  <Callout variant="outline" intent="danger">Design systems are the shared vocabulary between product and engineering.</Callout>
  <Callout variant="ghost" intent="danger">Design systems are the shared vocabulary between product and engineering.</Callout>
</Stack>
        `.trim(),
      },
    },
  },
  render: () => (
    <Stack gap="sm" className="w-[480px]">
      {variants.map((variant) => (
        <Callout key={variant} variant={variant} intent="danger">
          {quote}
        </Callout>
      ))}
    </Stack>
  ),
};

export const IntentSuccess: Story = {
  name: "Intent: Success",
  parameters: {
    docs: {
      source: {
        code: `
<Stack gap="sm" className="w-[480px]">
  <Callout variant="primary" intent="success">Design systems are the shared vocabulary between product and engineering.</Callout>
  <Callout variant="secondary" intent="success">Design systems are the shared vocabulary between product and engineering.</Callout>
  <Callout variant="outline" intent="success">Design systems are the shared vocabulary between product and engineering.</Callout>
  <Callout variant="ghost" intent="success">Design systems are the shared vocabulary between product and engineering.</Callout>
</Stack>
        `.trim(),
      },
    },
  },
  render: () => (
    <Stack gap="sm" className="w-[480px]">
      {variants.map((variant) => (
        <Callout key={variant} variant={variant} intent="success">
          {quote}
        </Callout>
      ))}
    </Stack>
  ),
};

export const IntentWarning: Story = {
  name: "Intent: Warning",
  parameters: {
    docs: {
      source: {
        code: `
<Stack gap="sm" className="w-[480px]">
  <Callout variant="primary" intent="warning">Design systems are the shared vocabulary between product and engineering.</Callout>
  <Callout variant="secondary" intent="warning">Design systems are the shared vocabulary between product and engineering.</Callout>
  <Callout variant="outline" intent="warning">Design systems are the shared vocabulary between product and engineering.</Callout>
  <Callout variant="ghost" intent="warning">Design systems are the shared vocabulary between product and engineering.</Callout>
</Stack>
        `.trim(),
      },
    },
  },
  render: () => (
    <Stack gap="sm" className="w-[480px]">
      {variants.map((variant) => (
        <Callout key={variant} variant={variant} intent="warning">
          {quote}
        </Callout>
      ))}
    </Stack>
  ),
};

export const AllVariants: Story = {
  name: "All Variants",
  parameters: {
    docs: {
      source: {
        code: `
<div className="grid grid-cols-2 gap-3 w-[880px]">
  <Callout variant="primary" intent="default">primary / default</Callout>
  <Callout variant="primary" intent="danger">primary / danger</Callout>
  <Callout variant="primary" intent="success">primary / success</Callout>
  <Callout variant="primary" intent="warning">primary / warning</Callout>
  <Callout variant="secondary" intent="default">secondary / default</Callout>
  <Callout variant="secondary" intent="danger">secondary / danger</Callout>
  <Callout variant="secondary" intent="success">secondary / success</Callout>
  <Callout variant="secondary" intent="warning">secondary / warning</Callout>
  <Callout variant="outline" intent="default">outline / default</Callout>
  <Callout variant="outline" intent="danger">outline / danger</Callout>
  <Callout variant="outline" intent="success">outline / success</Callout>
  <Callout variant="outline" intent="warning">outline / warning</Callout>
  <Callout variant="ghost" intent="default">ghost / default</Callout>
  <Callout variant="ghost" intent="danger">ghost / danger</Callout>
  <Callout variant="ghost" intent="success">ghost / success</Callout>
  <Callout variant="ghost" intent="warning">ghost / warning</Callout>
</div>
        `.trim(),
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-2 gap-3 w-[880px]">
      {variants.map((variant) =>
        intents.map((intent) => (
          <Callout
            key={`${variant}-${intent}`}
            variant={variant}
            intent={intent}
          >
            {variant} / {intent}
          </Callout>
        )),
      )}
    </div>
  ),
};

export const AllSizes: Story = {
  name: "All Sizes",
  parameters: {
    docs: {
      source: {
        code: `
<Stack gap="sm" className="w-[480px]">
  <Callout size="sm">Small callout size.</Callout>
  <Callout size="md">Medium callout size (default).</Callout>
  <Callout size="lg">Large callout size.</Callout>
</Stack>
        `.trim(),
      },
    },
  },
  render: () => (
    <Stack gap="sm" className="w-[480px]">
      <Callout size="sm">Small callout size.</Callout>
      <Callout size="md">Medium callout size (default).</Callout>
      <Callout size="lg">Large callout size.</Callout>
    </Stack>
  ),
};

export const WithCitation: Story = {
  name: "With Citation",
  parameters: {
    docs: {
      source: {
        code: `
<Callout
  variant="primary"
  intent="success"
  citation="Jane Doe, CEO, ExampleCo"
  className="w-[520px]"
>
  Design systems are the shared vocabulary between product and engineering.
</Callout>
        `.trim(),
      },
    },
  },
  render: () => (
    <Callout
      variant="primary"
      intent="success"
      citation="Jane Doe, CEO, ExampleCo"
      className="w-[520px]"
    >
      {quote}
    </Callout>
  ),
};

export const AsChildFigure: Story = {
  name: "Pattern: asChild with figure + figcaption",
  parameters: {
    docs: {
      source: {
        code: `
<Callout asChild variant="secondary" className="w-[520px]">
  <figure>
    <blockquote cite="https://example.com/source">
      Design systems are the shared vocabulary between product and engineering.
    </blockquote>
    <figcaption className="mt-2 text-sm">
      <cite>Jane Doe, Design Systems in Practice</cite>
    </figcaption>
  </figure>
</Callout>
        `.trim(),
      },
    },
  },
  render: () => (
    <Callout asChild variant="secondary" className="w-[520px]">
      <figure>
        <blockquote cite="https://example.com/source">{quote}</blockquote>
        <figcaption className="mt-2 text-sm">
          <cite>Jane Doe, Design Systems in Practice</cite>
        </figcaption>
      </figure>
    </Callout>
  ),
};

export const EditorialAside: Story = {
  name: "Pattern: Editorial aside",
  parameters: {
    docs: {
      source: {
        code: `
<div className="w-[520px]">
  <Text as="p">
    The token system separates primitive values from semantic roles. This
    lets teams retune one layer without breaking the other.
  </Text>
  <Callout variant="ghost" intent="warning" size="sm" className="my-4">
    Note: renaming a primitive token is a breaking change for any consumer
    referencing it directly. Prefer introducing a new token alias first.
  </Callout>
  <Text as="p">
    Semantic tokens are the stable surface. Primitives can move under them.
  </Text>
</div>
        `.trim(),
      },
    },
  },
  render: () => (
    <div className="w-[520px]">
      <Text as="p">
        The token system separates primitive values from semantic roles. This
        lets teams retune one layer without breaking the other.
      </Text>
      <Callout variant="ghost" intent="warning" size="sm" className="my-4">
        Note: renaming a primitive token is a breaking change for any consumer
        referencing it directly. Prefer introducing a new token alias first.
      </Callout>
      <Text as="p">
        Semantic tokens are the stable surface. Primitives can move under them.
      </Text>
    </div>
  ),
};

export const PullQuote: Story = {
  name: "Pattern: Marketing pull-quote",
  parameters: {
    docs: {
      source: {
        code: `
<Callout
  variant="primary"
  intent="default"
  size="lg"
  citation="Jane Doe, Head of Design, ExampleCo"
  className="w-[640px]"
>
  Design systems are the shared vocabulary between product and engineering.
</Callout>
        `.trim(),
      },
    },
  },
  render: () => (
    <Callout
      variant="primary"
      intent="default"
      size="lg"
      citation="Jane Doe, Head of Design, ExampleCo"
      className="w-[640px]"
    >
      {quote}
    </Callout>
  ),
};
