import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "@nuka/components/Slider";
import { Stack } from "@nuka/components/Stack";
import { FormField } from "@nuka/components/FormField";
import { Label } from "@nuka/components/Label";
import { Text } from "@nuka/components/Text";

const meta = {
  title: "Forms/Inputs/Slider",
  component: Slider,
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
    disabled: {
      control: "boolean",
    },
    showValue: {
      control: "boolean",
    },
  },
  decorators: [
    (Story) => (
      <Stack style={{ width: 320 }}>
        <Story />
      </Stack>
    ),
  ],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "aria-label": "Value",
  },
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: 40,
    "aria-label": "Value",
  },
};

export const Controlled: Story = {
  render: function ControlledSlider() {
    const [value, setValue] = React.useState(50);
    return (
      <Slider
        value={value}
        onValueChange={setValue}
        showValue
        aria-label="Volume"
      />
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
function Example() {
  const [value, setValue] = React.useState(50);
  return (
    <Slider
      value={value}
      onValueChange={setValue}
      showValue
      aria-label="Volume"
    />
  );
}
        `.trim(),
      },
    },
  },
};

export const AllIntents: Story = {
  render: () => (
    <div className="flex flex-col gap-(--space-6) w-80">
      {(["default", "danger", "success", "warning"] as const).map((intent) => (
        <div key={intent} className="flex flex-col gap-(--space-1)">
          <Text size="sm" color="muted">
            {intent}
          </Text>
          <Slider
            intent={intent}
            defaultValue={60}
            aria-label={`${intent} slider`}
          />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<div className="flex flex-col gap-(--space-6) w-80">
  <div className="flex flex-col gap-(--space-1)">
    <Text size="sm" color="muted">default</Text>
    <Slider intent="default" defaultValue={60} aria-label="default slider" />
  </div>
  <div className="flex flex-col gap-(--space-1)">
    <Text size="sm" color="muted">danger</Text>
    <Slider intent="danger" defaultValue={60} aria-label="danger slider" />
  </div>
  <div className="flex flex-col gap-(--space-1)">
    <Text size="sm" color="muted">success</Text>
    <Slider intent="success" defaultValue={60} aria-label="success slider" />
  </div>
  <div className="flex flex-col gap-(--space-1)">
    <Text size="sm" color="muted">warning</Text>
    <Slider intent="warning" defaultValue={60} aria-label="warning slider" />
  </div>
</div>
        `.trim(),
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-(--space-6) w-80">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-(--space-1)">
          <Text size="sm" color="muted">
            {size}
          </Text>
          <Slider size={size} defaultValue={50} aria-label={`${size} slider`} />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<div className="flex flex-col gap-(--space-6) w-80">
  <div className="flex flex-col gap-(--space-1)">
    <Text size="sm" color="muted">sm</Text>
    <Slider size="sm" defaultValue={50} aria-label="sm slider" />
  </div>
  <div className="flex flex-col gap-(--space-1)">
    <Text size="sm" color="muted">md</Text>
    <Slider size="md" defaultValue={50} aria-label="md slider" />
  </div>
  <div className="flex flex-col gap-(--space-1)">
    <Text size="sm" color="muted">lg</Text>
    <Slider size="lg" defaultValue={50} aria-label="lg slider" />
  </div>
</div>
        `.trim(),
      },
    },
  },
};

export const WithSteps: Story = {
  render: function SteppedSlider() {
    const [value, setValue] = React.useState(50);
    return (
      <div className="flex flex-col gap-(--space-2)">
        <Slider
          value={value}
          onValueChange={setValue}
          step={10}
          showValue
          aria-label="Stepped value"
        />
        <Text size="xs" color="muted">
          Step: 10
        </Text>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
function Example() {
  const [value, setValue] = React.useState(50);
  return (
    <div className="flex flex-col gap-(--space-2)">
      <Slider
        value={value}
        onValueChange={setValue}
        step={10}
        showValue
        aria-label="Stepped value"
      />
      <Text size="xs" color="muted">Step: 10</Text>
    </div>
  );
}
        `.trim(),
      },
    },
  },
};

export const MinMax: Story = {
  args: {
    min: -50,
    max: 50,
    defaultValue: 0,
    showValue: true,
    "aria-label": "Temperature",
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: 40,
    disabled: true,
    "aria-label": "Disabled slider",
  },
};

export const InFormField: Story = {
  render: () => (
    <FormField id="brightness" hint="Adjust brightness" error="Value too high">
      <Label>Brightness</Label>
      <Slider defaultValue={80} />
    </FormField>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<FormField id="brightness" hint="Adjust brightness" error="Value too high">
  <Label>Brightness</Label>
  <Slider defaultValue={80} />
</FormField>
        `.trim(),
      },
    },
  },
};

export const VolumeControl: Story = {
  render: function VolumeControlSlider() {
    const [value, setValue] = React.useState(50);
    return (
      <div className="flex flex-col gap-(--space-2) w-80">
        <div className="flex items-center justify-between">
          <Label htmlFor="volume">Volume</Label>
          <Text size="sm" color="muted">
            {value}%
          </Text>
        </div>
        <div className="flex items-center gap-(--space-3)">
          <Text size="xs" color="muted">
            0
          </Text>
          <Slider
            id="volume"
            value={value}
            onValueChange={setValue}
            aria-label="Volume"
          />
          <Text size="xs" color="muted">
            100
          </Text>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
function Example() {
  const [value, setValue] = React.useState(50);
  return (
    <div className="flex flex-col gap-(--space-2) w-80">
      <div className="flex items-center justify-between">
        <Label htmlFor="volume">Volume</Label>
        <Text size="sm" color="muted">{value}%</Text>
      </div>
      <div className="flex items-center gap-(--space-3)">
        <Text size="xs" color="muted">0</Text>
        <Slider
          id="volume"
          value={value}
          onValueChange={setValue}
          aria-label="Volume"
        />
        <Text size="xs" color="muted">100</Text>
      </div>
    </div>
  );
}
        `.trim(),
      },
    },
  },
};
