import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "@nuka/components/Switch";
import { Stack } from "@nuka/components/Stack";
import { Text } from "@nuka/components/Text";
import { FormField } from "@nuka/components/FormField";
import { Label } from "@nuka/components/Label";

const meta = {
  title: "Forms/Inputs/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: {
      control: "boolean",
    },
    checked: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "aria-label": "Toggle",
  },
};

export const On: Story = {
  args: {
    defaultChecked: true,
    "aria-label": "Toggle",
  },
};

export const WithLabel: Story = {
  args: {
    children: "Dark mode",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-end" }}>
      <Switch size="sm">Small</Switch>
      <Switch size="md">Medium</Switch>
      <Switch size="lg">Large</Switch>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
      <Switch disabled>Off disabled</Switch>
      <Switch disabled defaultChecked>On disabled</Switch>
    </div>
  ),
};

export const InFormField: Story = {
  name: "Pattern: In FormField",
  render: () => (
    <FormField id="notifications" hint="We'll send you push notifications">
      <Label htmlFor="notifications">Enable notifications</Label>
      <Switch />
    </FormField>
  ),
};

export const NotificationsPanel: Story = {
  name: "Pattern: Notifications Panel",
  render: () => (
    <Stack gap="md" style={{ width: "24rem" }}>
      <Stack direction="row" justify="between" align="center">
        <div>
          <Text weight="medium">Email notifications</Text>
          <Text size="sm" color="muted">
            Receive email updates about your account
          </Text>
        </div>
        <Switch defaultChecked aria-label="Email notifications" />
      </Stack>
      <Stack direction="row" justify="between" align="center">
        <div>
          <Text weight="medium">Push notifications</Text>
          <Text size="sm" color="muted">
            Get push notifications on your device
          </Text>
        </div>
        <Switch aria-label="Push notifications" />
      </Stack>
      <Stack direction="row" justify="between" align="center">
        <div>
          <Text weight="medium">SMS notifications</Text>
          <Text size="sm" color="muted">
            Receive text messages for critical alerts
          </Text>
        </div>
        <Switch aria-label="SMS notifications" />
      </Stack>
      <Stack direction="row" justify="between" align="center">
        <div>
          <Text weight="medium">Marketing emails</Text>
          <Text size="sm" color="muted">
            Receive news and promotional offers
          </Text>
        </div>
        <Switch disabled aria-label="Marketing emails" />
      </Stack>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Stack gap="md">
  <Stack direction="row" justify="between" align="center">
    <div>
      <Text weight="medium">Email notifications</Text>
      <Text size="sm" color="muted">
        Receive email updates about your account
      </Text>
    </div>
    <Switch defaultChecked aria-label="Email notifications" />
  </Stack>
  {/* ...more rows */}
</Stack>
        `.trim(),
      },
    },
  },
};
