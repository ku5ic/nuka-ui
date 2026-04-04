import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "@nuka/components/Switch";
import { FormField } from "@nuka/components/FormField";
import { Label } from "@nuka/components/Label";

const meta = {
  title: "Components/Switch",
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
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "24rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontWeight: 500 }}>Email notifications</div>
          <div style={{ fontSize: "0.875rem", color: "var(--nuka-text-muted)" }}>
            Receive email updates about your account
          </div>
        </div>
        <Switch defaultChecked aria-label="Email notifications" />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontWeight: 500 }}>Push notifications</div>
          <div style={{ fontSize: "0.875rem", color: "var(--nuka-text-muted)" }}>
            Get push notifications on your device
          </div>
        </div>
        <Switch aria-label="Push notifications" />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontWeight: 500 }}>SMS notifications</div>
          <div style={{ fontSize: "0.875rem", color: "var(--nuka-text-muted)" }}>
            Receive text messages for critical alerts
          </div>
        </div>
        <Switch aria-label="SMS notifications" />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontWeight: 500 }}>Marketing emails</div>
          <div style={{ fontSize: "0.875rem", color: "var(--nuka-text-muted)" }}>
            Receive news and promotional offers
          </div>
        </div>
        <Switch disabled aria-label="Marketing emails" />
      </div>
    </div>
  ),
};
