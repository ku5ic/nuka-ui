import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { NumberInput } from "@nuka/components/NumberInput";
import { Stack } from "@nuka/components/Stack";
import { FormField } from "@nuka/components/FormField";
import { Label } from "@nuka/components/Label";
import { Text } from "@nuka/components/Text";

const meta = {
  title: "Forms/Inputs/NumberInput",
  component: NumberInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    intent: {
      control: "select",
      options: ["default", "danger", "success", "warning"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    showControls: { control: "boolean" },
  },
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 0,
    "aria-label": "Quantity",
  },
};

export const WithMinMax: Story = {
  args: {
    defaultValue: 5,
    min: 0,
    max: 10,
    "aria-label": "Rating",
  },
};

export const WithStep: Story = {
  args: {
    defaultValue: 0,
    step: 5,
    min: 0,
    max: 100,
    "aria-label": "Percentage",
  },
};

export const Controlled: Story = {
  render: function ControlledNumberInput() {
    const [value, setValue] = React.useState(10);
    return (
      <Stack direction="column" gap="sm">
        <NumberInput
          value={value}
          onValueChange={setValue}
          min={0}
          max={99}
          aria-label="Quantity"
        />
        <Text size="sm" color="muted">
          Value: {value}
        </Text>
      </Stack>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
const [value, setValue] = React.useState(10);
// ...
<NumberInput
  value={value}
  onValueChange={setValue}
  min={0}
  max={99}
  aria-label="Quantity"
/>
        `.trim(),
      },
    },
  },
};

export const Intents: Story = {
  render: () => (
    <Stack direction="column" gap="md">
      {(["default", "danger", "success", "warning"] as const).map((intent) => (
        <Stack key={intent} direction="row" gap="sm" align="center">
          <Text size="sm" color="muted" className="w-16">
            {intent}
          </Text>
          <NumberInput
            intent={intent}
            defaultValue={5}
            aria-label={`${intent} input`}
          />
        </Stack>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<NumberInput intent="default" defaultValue={5} aria-label="..." />
<NumberInput intent="danger" defaultValue={5} aria-label="..." />
{/* ...success, warning */}
        `.trim(),
      },
    },
  },
};

export const NoControls: Story = {
  args: {
    defaultValue: 42,
    showControls: false,
    "aria-label": "Plain number",
  },
  parameters: {
    docs: {
      source: {
        code: `
<NumberInput defaultValue={42} showControls={false} aria-label="Plain number" />
        `.trim(),
      },
    },
  },
};

export const InFormField: Story = {
  args: {
    defaultValue: 1,
    min: 1,
    max: 10,
  },
  decorators: [
    (Story) => (
      <FormField id="seats" hint="Between 1 and 10">
        <Label>Seats</Label>
        <Story />
      </FormField>
    ),
  ],
  parameters: {
    docs: {
      source: {
        code: `
<FormField id="seats" hint="Between 1 and 10">
  <Label>Seats</Label>
  <NumberInput defaultValue={1} min={1} max={10} />
</FormField>
        `.trim(),
      },
    },
  },
};
