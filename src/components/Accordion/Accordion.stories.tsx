import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@nuka/components/Accordion";
import { Text } from "@nuka/components/Text";
import { Stack } from "@nuka/components/Stack";

const meta = {
  title: "Navigation/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["single", "multiple"],
    },
    collapsible: { control: "boolean" },
    headingLevel: {
      control: "select",
      options: ["h2", "h3", "h4"],
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: {
    type: "single",
    collapsible: true,
  },
  parameters: {
    docs: {
      source: {
        code: `
<Accordion type="single" collapsible className="w-96">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      <Text size="sm" color="muted">
        Yes. It adheres to the WAI-ARIA Accordion pattern with full keyboard
        navigation.
      </Text>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it animated?</AccordionTrigger>
    <AccordionContent>
      <Text size="sm" color="muted">
        Yes. It uses CSS grid-rows transitions for smooth height animation
        without JavaScript measurement.
      </Text>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>Can I customize it?</AccordionTrigger>
    <AccordionContent>
      <Text size="sm" color="muted">
        Yes. All components accept className for additional styling.
      </Text>
    </AccordionContent>
  </AccordionItem>
</Accordion>
        `.trim(),
      },
    },
  },
  render: (args) => (
    <Accordion {...args} className="w-96">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          <Text size="sm" color="muted">
            Yes. It adheres to the WAI-ARIA Accordion pattern with full keyboard
            navigation.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          <Text size="sm" color="muted">
            Yes. It uses CSS grid-rows transitions for smooth height animation
            without JavaScript measurement.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Can I customize it?</AccordionTrigger>
        <AccordionContent>
          <Text size="sm" color="muted">
            Yes. All components accept className for additional styling.
          </Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  args: {
    type: "multiple",
  },
  parameters: {
    docs: {
      source: {
        code: `
<Accordion type="multiple" className="w-96">
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>
      <Text size="sm" color="muted">
        Multiple items can be open at the same time.
      </Text>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Section 2</AccordionTrigger>
    <AccordionContent>
      <Text size="sm" color="muted">
        Open this alongside Section 1.
      </Text>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>Section 3</AccordionTrigger>
    <AccordionContent>
      <Text size="sm" color="muted">
        All three can be expanded simultaneously.
      </Text>
    </AccordionContent>
  </AccordionItem>
</Accordion>
        `.trim(),
      },
    },
  },
  render: (args) => (
    <Accordion {...args} className="w-96">
      <AccordionItem value="item-1">
        <AccordionTrigger>Section 1</AccordionTrigger>
        <AccordionContent>
          <Text size="sm" color="muted">
            Multiple items can be open at the same time.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Section 2</AccordionTrigger>
        <AccordionContent>
          <Text size="sm" color="muted">
            Open this alongside Section 1.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Section 3</AccordionTrigger>
        <AccordionContent>
          <Text size="sm" color="muted">
            All three can be expanded simultaneously.
          </Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const NonCollapsible: Story = {
  name: "Single (non-collapsible)",
  args: {
    type: "single",
    collapsible: false,
    defaultValue: "item-1",
  },
  parameters: {
    docs: {
      source: {
        code: `
<Accordion type="single" collapsible={false} defaultValue="item-1" className="w-96">
  <AccordionItem value="item-1">
    <AccordionTrigger>Always one open</AccordionTrigger>
    <AccordionContent>
      <Text size="sm" color="muted">
        When collapsible is false, clicking the open item does not close it.
        One item always stays open.
      </Text>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Click to switch</AccordionTrigger>
    <AccordionContent>
      <Text size="sm" color="muted">
        Clicking another item switches which one is open.
      </Text>
    </AccordionContent>
  </AccordionItem>
</Accordion>
        `.trim(),
      },
    },
  },
  render: (args) => (
    <Accordion {...args} className="w-96">
      <AccordionItem value="item-1">
        <AccordionTrigger>Always one open</AccordionTrigger>
        <AccordionContent>
          <Text size="sm" color="muted">
            When collapsible is false, clicking the open item does not close it.
            One item always stays open.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Click to switch</AccordionTrigger>
        <AccordionContent>
          <Text size="sm" color="muted">
            Clicking another item switches which one is open.
          </Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const WithDisabledItem: Story = {
  name: "Disabled Item",
  args: { type: "single" },
  parameters: {
    docs: {
      source: {
        code: `
<Accordion type="single" collapsible className="w-96">
  <AccordionItem value="item-1">
    <AccordionTrigger>Enabled item</AccordionTrigger>
    <AccordionContent>
      <Text size="sm" color="muted">
        This item works normally.
      </Text>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2" disabled>
    <AccordionTrigger>Disabled item</AccordionTrigger>
    <AccordionContent>
      <Text size="sm" color="muted">
        This content is not reachable.
      </Text>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>Another enabled item</AccordionTrigger>
    <AccordionContent>
      <Text size="sm" color="muted">
        This item also works normally.
      </Text>
    </AccordionContent>
  </AccordionItem>
</Accordion>
        `.trim(),
      },
    },
  },
  render: () => (
    <Accordion type="single" collapsible className="w-96">
      <AccordionItem value="item-1">
        <AccordionTrigger>Enabled item</AccordionTrigger>
        <AccordionContent>
          <Text size="sm" color="muted">
            This item works normally.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger>Disabled item</AccordionTrigger>
        <AccordionContent>
          <Text size="sm" color="muted">
            This content is not reachable.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Another enabled item</AccordionTrigger>
        <AccordionContent>
          <Text size="sm" color="muted">
            This item also works normally.
          </Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Controlled: Story = {
  args: { type: "single" },
  parameters: {
    docs: {
      source: {
        code: `
function Example() {
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <Stack direction="column" gap="sm" className="w-96">
      <Text size="sm" color="muted">
        Open: {value ?? "none"}
      </Text>
      <Accordion
        type="single"
        collapsible
        value={value ?? ""}
        onValueChange={(v) => setValue(v || undefined)}
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>
            <Text size="sm" color="muted">
              Controlled content 1
            </Text>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>
            <Text size="sm" color="muted">
              Controlled content 2
            </Text>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Stack>
  );
}
        `.trim(),
      },
    },
  },
  render: function ControlledAccordion() {
    const [value, setValue] = useState<string | undefined>(undefined);
    return (
      <Stack direction="column" gap="sm" className="w-96">
        <Text size="sm" color="muted">
          Open: {value ?? "none"}
        </Text>
        <Accordion
          type="single"
          collapsible
          value={value ?? ""}
          onValueChange={(v) => setValue(v || undefined)}
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Section 1</AccordionTrigger>
            <AccordionContent>
              <Text size="sm" color="muted">
                Controlled content 1
              </Text>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Section 2</AccordionTrigger>
            <AccordionContent>
              <Text size="sm" color="muted">
                Controlled content 2
              </Text>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Stack>
    );
  },
};

export const FAQ: Story = {
  name: "Pattern: FAQ",
  args: { type: "single" },
  parameters: {
    docs: {
      source: {
        code: `
<div className="w-[480px]">
  <Stack direction="column" gap="md">
    <Text as="p" weight="bold" size="lg">
      Frequently Asked Questions
    </Text>
    <Accordion type="single" collapsible>
      <AccordionItem value="shipping">
        <AccordionTrigger>How long does shipping take?</AccordionTrigger>
        <AccordionContent>
          <Text size="sm" color="muted">
            Standard shipping takes 5-7 business days. Express shipping is
            available for 2-3 business day delivery.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="returns">
        <AccordionTrigger>What is your return policy?</AccordionTrigger>
        <AccordionContent>
          <Text size="sm" color="muted">
            We accept returns within 30 days of purchase. Items must be
            unused and in their original packaging.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="payment">
        <AccordionTrigger>
          What payment methods do you accept?
        </AccordionTrigger>
        <AccordionContent>
          <Text size="sm" color="muted">
            We accept all major credit cards, PayPal, and Apple Pay.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="support">
        <AccordionTrigger>How can I contact support?</AccordionTrigger>
        <AccordionContent>
          <Text size="sm" color="muted">
            You can reach our support team at support@example.com or through
            the chat widget on our website.
          </Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </Stack>
</div>
        `.trim(),
      },
    },
  },
  render: () => (
    <div className="w-[480px]">
      <Stack direction="column" gap="md">
        <Text as="p" weight="bold" size="lg">
          Frequently Asked Questions
        </Text>
        <Accordion type="single" collapsible>
          <AccordionItem value="shipping">
            <AccordionTrigger>How long does shipping take?</AccordionTrigger>
            <AccordionContent>
              <Text size="sm" color="muted">
                Standard shipping takes 5-7 business days. Express shipping is
                available for 2-3 business day delivery.
              </Text>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="returns">
            <AccordionTrigger>What is your return policy?</AccordionTrigger>
            <AccordionContent>
              <Text size="sm" color="muted">
                We accept returns within 30 days of purchase. Items must be
                unused and in their original packaging.
              </Text>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="payment">
            <AccordionTrigger>
              What payment methods do you accept?
            </AccordionTrigger>
            <AccordionContent>
              <Text size="sm" color="muted">
                We accept all major credit cards, PayPal, and Apple Pay.
              </Text>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="support">
            <AccordionTrigger>How can I contact support?</AccordionTrigger>
            <AccordionContent>
              <Text size="sm" color="muted">
                You can reach our support team at support@example.com or through
                the chat widget on our website.
              </Text>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Stack>
    </div>
  ),
};
