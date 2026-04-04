import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Banner } from "@nuka/components/Banner";

const meta = {
  title: "Components/Banner",
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
        <button type="button" onClick={() => setVisible(true)} style={{ fontSize: 14 }}>
          Show banner again
        </button>
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
    action: (
      <button
        type="button"
        style={{
          fontSize: 13,
          fontWeight: 500,
          textDecoration: "underline",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        Learn more
      </button>
    ),
  },
};

export const WithActionAndDismiss: Story = {
  name: "With Action and Dismiss",
  args: { "aria-label": "Update notice" },
  render: function ActionDismissBanner() {
    const [visible, setVisible] = React.useState(true);
    if (!visible) {
      return (
        <button type="button" onClick={() => setVisible(true)} style={{ fontSize: 14 }}>
          Show banner again
        </button>
      );
    }
    return (
      <Banner
        aria-label="Update notice"
        intent="success"
        action={
          <button
            type="button"
            style={{
              fontSize: 13,
              fontWeight: 500,
              textDecoration: "underline",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            View changelog
          </button>
        }
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
        <button type="button" onClick={() => setVisible(true)} style={{ fontSize: 14 }}>
          Show banner again
        </button>
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
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            type="button"
            style={{
              fontSize: 13,
              fontWeight: 600,
              padding: "0.25rem 0.75rem",
              borderRadius: "0.25rem",
              border: "1px solid currentColor",
              background: "none",
              cursor: "pointer",
            }}
          >
            Decline
          </button>
          <button
            type="button"
            style={{
              fontSize: 13,
              fontWeight: 600,
              padding: "0.25rem 0.75rem",
              borderRadius: "0.25rem",
              border: "1px solid transparent",
              background: "currentColor",
              color: "white",
              cursor: "pointer",
            }}
          >
            Accept
          </button>
        </div>
      }
    >
      We use cookies to improve your experience. By continuing, you agree to our
      cookie policy.
    </Banner>
  ),
};
