import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@nuka/components/Collapsible";
import { Button } from "@nuka/components/Button";
import { Text } from "@nuka/components/Text";
import { Stack } from "@nuka/components/Stack";

const meta = {
  title: "Navigation/Collapsible",
  component: Collapsible,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    open: { control: "boolean" },
    defaultOpen: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Collapsible {...args} className="w-80">
      <CollapsibleTrigger asChild>
        <Button variant="secondary" className="w-full justify-between">
          Toggle content
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-(--space-2)">
        <Text size="sm" color="muted">
          This content can be expanded or collapsed. It animates smoothly
          using CSS grid-rows transitions.
        </Text>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const DefaultOpen: Story = {
  args: {
    defaultOpen: true,
  },
  render: (args) => (
    <Collapsible {...args} className="w-80">
      <CollapsibleTrigger asChild>
        <Button variant="secondary" className="w-full justify-between">
          Toggle content
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-(--space-2)">
        <Text size="sm" color="muted">
          This section starts open by default.
        </Text>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <Collapsible {...args} className="w-80">
      <CollapsibleTrigger asChild>
        <Button variant="secondary" className="w-full justify-between">
          Disabled toggle
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-(--space-2)">
        <Text size="sm" color="muted">
          This content cannot be toggled.
        </Text>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const Controlled: Story = {
  render: function ControlledCollapsible() {
    const [open, setOpen] = useState(false);
    return (
      <Stack direction="column" gap="sm" className="w-80">
        <Text size="sm" color="muted">
          Open: {String(open)}
        </Text>
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="secondary" className="w-full justify-between">
              Controlled toggle
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-(--space-2)">
            <Text size="sm" color="muted">
              Controlled by external state.
            </Text>
          </CollapsibleContent>
        </Collapsible>
      </Stack>
    );
  },
};

export const SettingsPanel: Story = {
  name: "Pattern: Settings Panel",
  render: () => (
    <div className="w-80 rounded-(--radius-lg) border border-(--nuka-border-base)">
      <Collapsible defaultOpen>
        <div className="flex items-center justify-between p-(--space-4)">
          <Text weight="semibold">Advanced Settings</Text>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              Toggle
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="border-t border-(--nuka-border-base) p-(--space-4)">
            <Stack direction="column" gap="sm">
              <Text size="sm" color="muted">Cache TTL: 3600s</Text>
              <Text size="sm" color="muted">Max retries: 3</Text>
              <Text size="sm" color="muted">Timeout: 30s</Text>
            </Stack>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
};
