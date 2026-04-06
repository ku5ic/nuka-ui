import type { Meta, StoryObj } from "@storybook/react";
import { Timeline, TimelineItem } from "@nuka/components/Timeline";

const meta = {
  title: "Display/Timeline",
  component: Timeline,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story-only placeholder: inline SVG icons for demonstration, not nuka-ui components
const CheckIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const AlertIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export const Default: Story = {
  render: () => (
    <Timeline aria-label="Recent events" style={{ width: 400 }}>
      <TimelineItem
        title="Project created"
        timestamp="March 28, 2026"
        description="Initial repository setup and configuration."
      />
      <TimelineItem
        title="First commit"
        timestamp="March 29, 2026"
        description="Added Button and Badge components."
      />
      <TimelineItem
        title="CI/CD configured"
        timestamp="April 1, 2026"
        description="GitHub Actions pipeline for tests and linting."
      />
      <TimelineItem
        title="v1.0.0 released"
        timestamp="April 4, 2026"
        description="First stable release published to npm."
      />
    </Timeline>
  ),
};

export const IntentMixed: Story = {
  name: "Intent: Mixed",
  render: () => (
    <Timeline aria-label="Build status" style={{ width: 400 }}>
      <TimelineItem
        title="Build started"
        timestamp="10:00 AM"
        intent="default"
      />
      <TimelineItem
        title="Tests passed"
        timestamp="10:02 AM"
        intent="success"
        description="All 613 tests passing."
      />
      <TimelineItem
        title="Lint warning"
        timestamp="10:03 AM"
        intent="warning"
        description="3 non-critical warnings detected."
      />
      <TimelineItem
        title="Deploy failed"
        timestamp="10:05 AM"
        intent="danger"
        description="Container health check timed out."
      />
    </Timeline>
  ),
};

export const WithIcons: Story = {
  name: "With Icons",
  render: () => (
    <Timeline aria-label="Process" style={{ width: 400 }}>
      <TimelineItem
        title="Completed"
        timestamp="Step 1"
        description="Requirements gathered."
        intent="success"
        icon={<CheckIcon />}
      />
      <TimelineItem
        title="In progress"
        timestamp="Step 2"
        description="Implementation underway."
        intent="warning"
        icon={<ClockIcon />}
      />
      <TimelineItem
        title="Blocked"
        timestamp="Step 3"
        description="Waiting on external dependency."
        intent="danger"
        icon={<AlertIcon />}
      />
    </Timeline>
  ),
};

export const Minimal: Story = {
  name: "Minimal",
  render: () => (
    <Timeline aria-label="Steps" style={{ width: 300 }}>
      <TimelineItem title="Step one" />
      <TimelineItem title="Step two" />
      <TimelineItem title="Step three" />
    </Timeline>
  ),
};

export const SingleItem: Story = {
  name: "Single Item",
  render: () => (
    <Timeline aria-label="Event" style={{ width: 400 }}>
      <TimelineItem
        title="Account created"
        timestamp="April 4, 2026"
        description="Welcome to the platform."
        intent="success"
        icon={<CheckIcon />}
      />
    </Timeline>
  ),
};

export const OrderStatus: Story = {
  name: "Pattern: Order Status",
  render: () => (
    <Timeline aria-label="Order tracking" style={{ width: 400 }}>
      <TimelineItem
        title="Order placed"
        timestamp="April 1, 2026, 9:15 AM"
        description="Order #12345 confirmed."
        intent="success"
        icon={<CheckIcon />}
      />
      <TimelineItem
        title="Processing"
        timestamp="April 1, 2026, 11:30 AM"
        description="Payment verified. Preparing for shipment."
        intent="success"
        icon={<CheckIcon />}
      />
      <TimelineItem
        title="Shipped"
        timestamp="April 2, 2026, 2:00 PM"
        description="Package handed to carrier. Tracking: 1Z999AA10123456784."
        intent="success"
        icon={<CheckIcon />}
      />
      <TimelineItem
        title="Delivered"
        timestamp="Estimated: April 4, 2026"
        description="In transit to destination."
        intent="warning"
        icon={<ClockIcon />}
      />
    </Timeline>
  ),
};

export const ActivityLog: Story = {
  name: "Pattern: Activity Log",
  render: () => (
    <Timeline aria-label="Audit log" style={{ width: 440 }}>
      <TimelineItem
        title="User login"
        timestamp="2026-04-04 14:32:01"
        description="admin@example.com signed in from 192.168.1.10."
      />
      <TimelineItem
        title="Permission changed"
        timestamp="2026-04-04 14:33:15"
        description='Role "editor" granted to user jdoe@example.com.'
        intent="warning"
      />
      <TimelineItem
        title="Deployment triggered"
        timestamp="2026-04-04 14:45:00"
        description="Production deploy initiated by CI pipeline."
        intent="success"
      />
      <TimelineItem
        title="Error: rate limit exceeded"
        timestamp="2026-04-04 15:01:22"
        description="API endpoint /api/v1/data returned 429."
        intent="danger"
      />
    </Timeline>
  ),
};

export const OnboardingSteps: Story = {
  name: "Pattern: Onboarding Steps",
  render: () => (
    <Timeline aria-label="Onboarding progress" style={{ width: 400 }}>
      <TimelineItem
        title="Create account"
        description="Account created successfully."
        intent="success"
        icon={<CheckIcon />}
      />
      <TimelineItem
        title="Verify email"
        description="Email verified."
        intent="success"
        icon={<CheckIcon />}
      />
      <TimelineItem
        title="Set up profile"
        description="Upload a photo and add your bio."
        intent="warning"
        icon={<ClockIcon />}
      />
      <TimelineItem
        title="Invite teammates"
        description="Share your workspace with others."
      />
    </Timeline>
  ),
};
