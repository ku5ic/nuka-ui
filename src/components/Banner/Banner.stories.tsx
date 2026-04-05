import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Banner } from "@nuka/components/Banner";
import { Button } from "@nuka/components/Button";
import { Stack } from "@nuka/components/Stack";

const meta = {
  title: "Feedback/Banner",
  component: Banner,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    intent: {
      control: "select",
      options: ["default", "success", "danger", "warning"],
    },
  },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "aria-label": "Site announcement",
    children: "This is an informational banner.",
    intent: "default",
  },
};

export const IntentDanger: Story = {
  name: "Intent: Danger",
  args: {
    "aria-label": "Error notice",
    children: "A critical issue requires your attention.",
    intent: "danger",
  },
};

export const IntentSuccess: Story = {
  name: "Intent: Success",
  args: {
    "aria-label": "Success notice",
    children: "Your account has been verified successfully.",
    intent: "success",
  },
};

export const IntentWarning: Story = {
  name: "Intent: Warning",
  args: {
    "aria-label": "Warning notice",
    children: "Your trial expires in 3 days.",
    intent: "warning",
  },
};

export const Dismissible: Story = {
  name: "Dismissible",
  args: { "aria-label": "Dismissible notice" },
  render: function DismissibleBanner() {
    const [visible, setVisible] = React.useState(true);
    if (!visible) {
      return (
        <Button variant="ghost" size="sm" onClick={() => setVisible(true)}>
          Show banner again
        </Button>
      );
    }
    return (
      <Banner
        aria-label="Dismissible notice"
        intent="default"
        onDismiss={() => setVisible(false)}
      >
        This banner can be dismissed.
      </Banner>
    );
  },
};

export const WithAction: Story = {
  name: "With Action",
  args: {
    "aria-label": "Update notice",
    children: "A new version is available.",
    intent: "default",
    action: <Button variant="link" size="sm">Learn more</Button>,
  },
};

export const WithActionAndDismiss: Story = {
  name: "With Action and Dismiss",
  args: { "aria-label": "Update notice" },
  render: function ActionDismissBanner() {
    const [visible, setVisible] = React.useState(true);
    if (!visible) {
      return (
        <Button variant="ghost" size="sm" onClick={() => setVisible(true)}>
          Show banner again
        </Button>
      );
    }
    return (
      <Banner
        aria-label="Update notice"
        intent="success"
        action={<Button variant="link" size="sm">View changelog</Button>}
        onDismiss={() => setVisible(false)}
      >
        Deployment complete. All services are operational.
      </Banner>
    );
  },
};

export const MaintenanceNotice: Story = {
  name: "Pattern: Maintenance Notice",
  args: { "aria-label": "Scheduled maintenance" },
  render: function MaintenanceBanner() {
    const [visible, setVisible] = React.useState(true);
    if (!visible) {
      return (
        <Button variant="ghost" size="sm" onClick={() => setVisible(true)}>
          Show banner again
        </Button>
      );
    }
    return (
      <Banner
        aria-label="Scheduled maintenance"
        intent="warning"
        onDismiss={() => setVisible(false)}
      >
        <strong>Scheduled maintenance:</strong> The system will be unavailable on
        April 5th from 2:00 AM to 4:00 AM UTC.
      </Banner>
    );
  },
};

export const CookieConsent: Story = {
  name: "Pattern: Cookie Consent",
  args: { "aria-label": "Cookie consent" },
  render: () => (
    <Banner
      aria-label="Cookie consent"
      intent="default"
      action={
        <Stack direction="row" gap="xs">
          <Button variant="outline" size="sm">Decline</Button>
          <Button variant="primary" size="sm">Accept</Button>
        </Stack>
      }
    >
      We use cookies to improve your experience. By continuing, you agree to our
      cookie policy.
    </Banner>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Banner
  aria-label="Cookie consent"
  intent="default"
  action={
    <Stack direction="row" gap="xs">
      <Button variant="outline" size="sm">Decline</Button>
      <Button variant="primary" size="sm">Accept</Button>
    </Stack>
  }
>
  We use cookies to improve your experience.
</Banner>
        `.trim(),
      },
    },
  },
};
