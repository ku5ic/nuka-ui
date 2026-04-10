import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "@nuka/components/Alert";
import { Input } from "@nuka/components/Input";
import { Label } from "@nuka/components/Label";
import { Stack } from "@nuka/components/Stack";

const meta = {
  title: "Feedback/Alert",
  component: Alert,
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
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "This is a primary alert.",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "This is a secondary alert.",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "This is an outline alert.",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "This is a ghost alert.",
  },
};

export const IntentDanger: Story = {
  name: "Intent: Danger",
  parameters: {
    docs: {
      source: {
        code: `
<Stack gap="sm" className="w-[400px]">
  <Alert variant="primary" intent="danger">Primary danger alert</Alert>
  <Alert variant="secondary" intent="danger">Secondary danger alert</Alert>
  <Alert variant="outline" intent="danger">Outline danger alert</Alert>
  <Alert variant="ghost" intent="danger">Ghost danger alert</Alert>
</Stack>
        `.trim(),
      },
    },
  },
  render: () => (
    <Stack gap="sm" className="w-[400px]">
      <Alert variant="primary" intent="danger">
        Primary danger alert
      </Alert>
      <Alert variant="secondary" intent="danger">
        Secondary danger alert
      </Alert>
      <Alert variant="outline" intent="danger">
        Outline danger alert
      </Alert>
      <Alert variant="ghost" intent="danger">
        Ghost danger alert
      </Alert>
    </Stack>
  ),
};

export const IntentSuccess: Story = {
  name: "Intent: Success",
  parameters: {
    docs: {
      source: {
        code: `
<Stack gap="sm" className="w-[400px]">
  <Alert variant="primary" intent="success">Primary success alert</Alert>
  <Alert variant="secondary" intent="success">Secondary success alert</Alert>
  <Alert variant="outline" intent="success">Outline success alert</Alert>
  <Alert variant="ghost" intent="success">Ghost success alert</Alert>
</Stack>
        `.trim(),
      },
    },
  },
  render: () => (
    <Stack gap="sm" className="w-[400px]">
      <Alert variant="primary" intent="success">
        Primary success alert
      </Alert>
      <Alert variant="secondary" intent="success">
        Secondary success alert
      </Alert>
      <Alert variant="outline" intent="success">
        Outline success alert
      </Alert>
      <Alert variant="ghost" intent="success">
        Ghost success alert
      </Alert>
    </Stack>
  ),
};

export const IntentWarning: Story = {
  name: "Intent: Warning",
  parameters: {
    docs: {
      source: {
        code: `
<Stack gap="sm" className="w-[400px]">
  <Alert variant="primary" intent="warning">Primary warning alert</Alert>
  <Alert variant="secondary" intent="warning">Secondary warning alert</Alert>
  <Alert variant="outline" intent="warning">Outline warning alert</Alert>
  <Alert variant="ghost" intent="warning">Ghost warning alert</Alert>
</Stack>
        `.trim(),
      },
    },
  },
  render: () => (
    <Stack gap="sm" className="w-[400px]">
      <Alert variant="primary" intent="warning">
        Primary warning alert
      </Alert>
      <Alert variant="secondary" intent="warning">
        Secondary warning alert
      </Alert>
      <Alert variant="outline" intent="warning">
        Outline warning alert
      </Alert>
      <Alert variant="ghost" intent="warning">
        Ghost warning alert
      </Alert>
    </Stack>
  ),
};

export const WithIcon: Story = {
  name: "With Icon",
  parameters: {
    docs: {
      source: {
        code: `
<Alert
  variant="secondary"
  intent="success"
  icon={
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  }
>
  Your changes have been saved successfully.
</Alert>
        `.trim(),
      },
    },
  },
  render: () => (
    <Alert
      variant="secondary"
      intent="success"
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      }
    >
      Your changes have been saved successfully.
    </Alert>
  ),
};

export const Dismissible: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Alert
  variant="secondary"
  intent="warning"
  onDismiss={() => {}}
>
  This alert can be dismissed.
</Alert>
        `.trim(),
      },
    },
  },
  render: () => (
    <Alert
      variant="secondary"
      intent="warning"
      onDismiss={() => {
        /* dismiss */
      }}
    >
      This alert can be dismissed.
    </Alert>
  ),
};

const variants = ["primary", "secondary", "outline", "ghost"] as const;
const intents = ["default", "danger", "success", "warning"] as const;

export const AllVariants: Story = {
  name: "All Variants",
  parameters: {
    docs: {
      source: {
        code: `
<div className="grid grid-cols-4 items-center gap-3 w-[800px]">
  <Alert variant="primary" intent="default">primary / default</Alert>
  <Alert variant="primary" intent="danger">primary / danger</Alert>
  <Alert variant="primary" intent="success">primary / success</Alert>
  <Alert variant="primary" intent="warning">primary / warning</Alert>
  <Alert variant="secondary" intent="default">secondary / default</Alert>
  <Alert variant="secondary" intent="danger">secondary / danger</Alert>
  <Alert variant="secondary" intent="success">secondary / success</Alert>
  <Alert variant="secondary" intent="warning">secondary / warning</Alert>
  <Alert variant="outline" intent="default">outline / default</Alert>
  <Alert variant="outline" intent="danger">outline / danger</Alert>
  <Alert variant="outline" intent="success">outline / success</Alert>
  <Alert variant="outline" intent="warning">outline / warning</Alert>
  <Alert variant="ghost" intent="default">ghost / default</Alert>
  <Alert variant="ghost" intent="danger">ghost / danger</Alert>
  <Alert variant="ghost" intent="success">ghost / success</Alert>
  <Alert variant="ghost" intent="warning">ghost / warning</Alert>
</div>
        `.trim(),
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-4 items-center gap-3 w-[800px]">
      {variants.map((variant) =>
        intents.map((intent) => (
          <Alert key={`${variant}-${intent}`} variant={variant} intent={intent}>
            {variant} / {intent}
          </Alert>
        )),
      )}
    </div>
  ),
};

export const InlineFormError: Story = {
  name: "Pattern: Inline Form Error",
  parameters: {
    docs: {
      source: {
        code: `
<Stack gap="sm" className="w-[320px]">
  <Label htmlFor="email">Email address</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
  <Alert variant="ghost" intent="danger" size="sm">
    Please enter a valid email address.
  </Alert>
</Stack>
        `.trim(),
      },
    },
  },
  render: () => (
    <Stack gap="sm" className="w-[320px]">
      <Label htmlFor="email">Email address</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
      <Alert variant="ghost" intent="danger" size="sm">
        Please enter a valid email address.
      </Alert>
    </Stack>
  ),
};

export const SystemBanner: Story = {
  name: "Pattern: System Banner",
  parameters: {
    docs: {
      source: {
        code: `
<div className="w-[600px]">
  <Alert
    variant="secondary"
    intent="warning"
    size="lg"
    icon={
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    }
    onDismiss={() => {}}
  >
    <strong>Scheduled maintenance:</strong> The system will be unavailable
    on April 5th from 2:00 AM to 4:00 AM UTC.
  </Alert>
</div>
        `.trim(),
      },
    },
  },
  render: () => (
    <div className="w-[600px]">
      <Alert
        variant="secondary"
        intent="warning"
        size="lg"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        }
        onDismiss={() => {
          /* dismiss */
        }}
      >
        <strong>Scheduled maintenance:</strong> The system will be unavailable
        on April 5th from 2:00 AM to 4:00 AM UTC.
      </Alert>
    </div>
  ),
};
