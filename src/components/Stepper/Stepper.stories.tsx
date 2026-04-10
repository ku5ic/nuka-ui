import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Stepper,
  StepperItem,
  StepperIndicator,
  StepperContent,
  StepperTitle,
  StepperDescription,
} from "@nuka/components/Stepper";
import { Text } from "@nuka/components/Text";

const meta = {
  title: "Navigation/Stepper",
  component: Stepper,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  name: "Horizontal",
  args: { currentStep: 1 },
  parameters: {
    docs: {
      source: {
        code: `
<div className="w-[600px]">
  <Stepper currentStep={1}>
    <StepperItem step={0}>
      <StepperIndicator />
      <StepperContent>
        <StepperTitle>Account</StepperTitle>
        <StepperDescription>Create your account</StepperDescription>
      </StepperContent>
    </StepperItem>
    <StepperItem step={1}>
      <StepperIndicator />
      <StepperContent>
        <StepperTitle>Profile</StepperTitle>
        <StepperDescription>Set up your profile</StepperDescription>
      </StepperContent>
    </StepperItem>
    <StepperItem step={2}>
      <StepperIndicator />
      <StepperContent>
        <StepperTitle>Review</StepperTitle>
        <StepperDescription>Confirm details</StepperDescription>
      </StepperContent>
    </StepperItem>
  </Stepper>
</div>
        `.trim(),
      },
    },
  },
  render: () => (
    <div className="w-[600px]">
      <Stepper currentStep={1}>
        <StepperItem step={0}>
          <StepperIndicator />
          <StepperContent>
            <StepperTitle>Account</StepperTitle>
            <StepperDescription>Create your account</StepperDescription>
          </StepperContent>
        </StepperItem>
        <StepperItem step={1}>
          <StepperIndicator />
          <StepperContent>
            <StepperTitle>Profile</StepperTitle>
            <StepperDescription>Set up your profile</StepperDescription>
          </StepperContent>
        </StepperItem>
        <StepperItem step={2}>
          <StepperIndicator />
          <StepperContent>
            <StepperTitle>Review</StepperTitle>
            <StepperDescription>Confirm details</StepperDescription>
          </StepperContent>
        </StepperItem>
      </Stepper>
    </div>
  ),
};

export const Vertical: Story = {
  name: "Vertical",
  args: { currentStep: 1 },
  parameters: {
    docs: {
      source: {
        code: `
<div className="w-[300px]">
  <Stepper currentStep={1} orientation="vertical">
    <StepperItem step={0}>
      <StepperIndicator />
      <StepperContent>
        <StepperTitle>Account</StepperTitle>
        <StepperDescription>Create your account</StepperDescription>
      </StepperContent>
    </StepperItem>
    <StepperItem step={1}>
      <StepperIndicator />
      <StepperContent>
        <StepperTitle>Profile</StepperTitle>
        <StepperDescription>Set up your profile</StepperDescription>
      </StepperContent>
    </StepperItem>
    <StepperItem step={2}>
      <StepperIndicator />
      <StepperContent>
        <StepperTitle>Review</StepperTitle>
        <StepperDescription>Confirm details</StepperDescription>
      </StepperContent>
    </StepperItem>
  </Stepper>
</div>
        `.trim(),
      },
    },
  },
  render: () => (
    <div className="w-[300px]">
      <Stepper currentStep={1} orientation="vertical">
        <StepperItem step={0}>
          <StepperIndicator />
          <StepperContent>
            <StepperTitle>Account</StepperTitle>
            <StepperDescription>Create your account</StepperDescription>
          </StepperContent>
        </StepperItem>
        <StepperItem step={1}>
          <StepperIndicator />
          <StepperContent>
            <StepperTitle>Profile</StepperTitle>
            <StepperDescription>Set up your profile</StepperDescription>
          </StepperContent>
        </StepperItem>
        <StepperItem step={2}>
          <StepperIndicator />
          <StepperContent>
            <StepperTitle>Review</StepperTitle>
            <StepperDescription>Confirm details</StepperDescription>
          </StepperContent>
        </StepperItem>
      </Stepper>
    </div>
  ),
};

export const AllCompleted: Story = {
  name: "All Completed",
  args: { currentStep: 3 },
  parameters: {
    docs: {
      source: {
        code: `
<div className="w-[600px]">
  <Stepper currentStep={3}>
    <StepperItem step={0}>
      <StepperIndicator />
      <StepperContent>
        <StepperTitle>Account</StepperTitle>
      </StepperContent>
    </StepperItem>
    <StepperItem step={1}>
      <StepperIndicator />
      <StepperContent>
        <StepperTitle>Profile</StepperTitle>
      </StepperContent>
    </StepperItem>
    <StepperItem step={2}>
      <StepperIndicator />
      <StepperContent>
        <StepperTitle>Review</StepperTitle>
      </StepperContent>
    </StepperItem>
  </Stepper>
</div>
        `.trim(),
      },
    },
  },
  render: () => (
    <div className="w-[600px]">
      <Stepper currentStep={3}>
        <StepperItem step={0}>
          <StepperIndicator />
          <StepperContent>
            <StepperTitle>Account</StepperTitle>
          </StepperContent>
        </StepperItem>
        <StepperItem step={1}>
          <StepperIndicator />
          <StepperContent>
            <StepperTitle>Profile</StepperTitle>
          </StepperContent>
        </StepperItem>
        <StepperItem step={2}>
          <StepperIndicator />
          <StepperContent>
            <StepperTitle>Review</StepperTitle>
          </StepperContent>
        </StepperItem>
      </Stepper>
    </div>
  ),
};

export const ErrorState: Story = {
  name: "Error State",
  args: { currentStep: 2 },
  parameters: {
    docs: {
      source: {
        code: `
<div className="w-[600px]">
  <Stepper currentStep={2}>
    <StepperItem step={0}>
      <StepperIndicator />
      <StepperContent>
        <StepperTitle>Account</StepperTitle>
      </StepperContent>
    </StepperItem>
    <StepperItem step={1} state="error">
      <StepperIndicator />
      <StepperContent>
        <StepperTitle>Payment</StepperTitle>
        <StepperDescription>Card declined</StepperDescription>
      </StepperContent>
    </StepperItem>
    <StepperItem step={2}>
      <StepperIndicator />
      <StepperContent>
        <StepperTitle>Review</StepperTitle>
      </StepperContent>
    </StepperItem>
  </Stepper>
</div>
        `.trim(),
      },
    },
  },
  render: () => (
    <div className="w-[600px]">
      <Stepper currentStep={2}>
        <StepperItem step={0}>
          <StepperIndicator />
          <StepperContent>
            <StepperTitle>Account</StepperTitle>
          </StepperContent>
        </StepperItem>
        <StepperItem step={1} state="error">
          <StepperIndicator />
          <StepperContent>
            <StepperTitle>Payment</StepperTitle>
            <StepperDescription>Card declined</StepperDescription>
          </StepperContent>
        </StepperItem>
        <StepperItem step={2}>
          <StepperIndicator />
          <StepperContent>
            <StepperTitle>Review</StepperTitle>
          </StepperContent>
        </StepperItem>
      </Stepper>
    </div>
  ),
};

export const Interactive: Story = {
  name: "Interactive",
  args: { currentStep: 2 },
  parameters: {
    docs: {
      source: {
        code: `
function Example() {
  const [step, setStep] = React.useState(2);

  return (
    <div className="w-[600px]">
      <Stepper currentStep={step} onStepClick={setStep}>
        <StepperItem step={0}>
          <StepperIndicator />
          <StepperContent>
            <StepperTitle>Account</StepperTitle>
          </StepperContent>
        </StepperItem>
        <StepperItem step={1}>
          <StepperIndicator />
          <StepperContent>
            <StepperTitle>Profile</StepperTitle>
          </StepperContent>
        </StepperItem>
        <StepperItem step={2}>
          <StepperIndicator />
          <StepperContent>
            <StepperTitle>Review</StepperTitle>
          </StepperContent>
        </StepperItem>
      </Stepper>
      <Text size="sm" color="muted" align="center" className="mt-(--space-6)">
        Current step: {step}. Click a completed step to go back.
      </Text>
    </div>
  );
}
        `.trim(),
      },
    },
  },
  render: function InteractiveStory() {
    const [step, setStep] = React.useState(2);

    return (
      <div className="w-[600px]">
        <Stepper currentStep={step} onStepClick={setStep}>
          <StepperItem step={0}>
            <StepperIndicator />
            <StepperContent>
              <StepperTitle>Account</StepperTitle>
            </StepperContent>
          </StepperItem>
          <StepperItem step={1}>
            <StepperIndicator />
            <StepperContent>
              <StepperTitle>Profile</StepperTitle>
            </StepperContent>
          </StepperItem>
          <StepperItem step={2}>
            <StepperIndicator />
            <StepperContent>
              <StepperTitle>Review</StepperTitle>
            </StepperContent>
          </StepperItem>
        </Stepper>
        <Text size="sm" color="muted" align="center" className="mt-(--space-6)">
          Current step: {step}. Click a completed step to go back.
        </Text>
      </div>
    );
  },
};

export const FirstStep: Story = {
  name: "First Step",
  args: { currentStep: 0 },
  parameters: {
    docs: {
      source: {
        code: `
<div className="w-[600px]">
  <Stepper currentStep={0}>
    <StepperItem step={0}>
      <StepperIndicator />
      <StepperContent>
        <StepperTitle>Account</StepperTitle>
      </StepperContent>
    </StepperItem>
    <StepperItem step={1}>
      <StepperIndicator />
      <StepperContent>
        <StepperTitle>Profile</StepperTitle>
      </StepperContent>
    </StepperItem>
    <StepperItem step={2}>
      <StepperIndicator />
      <StepperContent>
        <StepperTitle>Review</StepperTitle>
      </StepperContent>
    </StepperItem>
  </Stepper>
</div>
        `.trim(),
      },
    },
  },
  render: () => (
    <div className="w-[600px]">
      <Stepper currentStep={0}>
        <StepperItem step={0}>
          <StepperIndicator />
          <StepperContent>
            <StepperTitle>Account</StepperTitle>
          </StepperContent>
        </StepperItem>
        <StepperItem step={1}>
          <StepperIndicator />
          <StepperContent>
            <StepperTitle>Profile</StepperTitle>
          </StepperContent>
        </StepperItem>
        <StepperItem step={2}>
          <StepperIndicator />
          <StepperContent>
            <StepperTitle>Review</StepperTitle>
          </StepperContent>
        </StepperItem>
      </Stepper>
    </div>
  ),
};

export const CheckoutFlow: Story = {
  name: "Pattern: Checkout Flow",
  args: { currentStep: 1 },
  parameters: {
    docs: {
      source: {
        code: `
function Example() {
  const [step, setStep] = React.useState(1);

  return (
    <div className="w-[700px]">
      <Stepper currentStep={step} onStepClick={setStep}>
        <StepperItem step={0}>
          <StepperIndicator />
          <StepperContent>
            <StepperTitle>Cart</StepperTitle>
            <StepperDescription>Review items</StepperDescription>
          </StepperContent>
        </StepperItem>
        <StepperItem step={1}>
          <StepperIndicator />
          <StepperContent>
            <StepperTitle>Shipping</StepperTitle>
            <StepperDescription>Delivery address</StepperDescription>
          </StepperContent>
        </StepperItem>
        <StepperItem step={2}>
          <StepperIndicator />
          <StepperContent>
            <StepperTitle>Payment</StepperTitle>
            <StepperDescription>Add payment method</StepperDescription>
          </StepperContent>
        </StepperItem>
        <StepperItem step={3}>
          <StepperIndicator />
          <StepperContent>
            <StepperTitle>Confirmation</StepperTitle>
            <StepperDescription>Place order</StepperDescription>
          </StepperContent>
        </StepperItem>
      </Stepper>
    </div>
  );
}
        `.trim(),
      },
    },
  },
  render: function CheckoutFlowStory() {
    const [step, setStep] = React.useState(1);

    return (
      <div className="w-[700px]">
        <Stepper currentStep={step} onStepClick={setStep}>
          <StepperItem step={0}>
            <StepperIndicator />
            <StepperContent>
              <StepperTitle>Cart</StepperTitle>
              <StepperDescription>Review items</StepperDescription>
            </StepperContent>
          </StepperItem>
          <StepperItem step={1}>
            <StepperIndicator />
            <StepperContent>
              <StepperTitle>Shipping</StepperTitle>
              <StepperDescription>Delivery address</StepperDescription>
            </StepperContent>
          </StepperItem>
          <StepperItem step={2}>
            <StepperIndicator />
            <StepperContent>
              <StepperTitle>Payment</StepperTitle>
              <StepperDescription>Add payment method</StepperDescription>
            </StepperContent>
          </StepperItem>
          <StepperItem step={3}>
            <StepperIndicator />
            <StepperContent>
              <StepperTitle>Confirmation</StepperTitle>
              <StepperDescription>Place order</StepperDescription>
            </StepperContent>
          </StepperItem>
        </Stepper>
      </div>
    );
  },
};

export const VerticalOnboarding: Story = {
  name: "Pattern: Vertical Onboarding",
  args: { currentStep: 2 },
  parameters: {
    docs: {
      source: {
        code: `
<div className="w-[360px]">
  <Stepper currentStep={2} orientation="vertical">
    <StepperItem step={0}>
      <StepperIndicator />
      <StepperContent>
        <StepperTitle>Create account</StepperTitle>
        <StepperDescription>Sign up with your email</StepperDescription>
      </StepperContent>
    </StepperItem>
    <StepperItem step={1}>
      <StepperIndicator />
      <StepperContent>
        <StepperTitle>Verify email</StepperTitle>
        <StepperDescription>Check your inbox</StepperDescription>
      </StepperContent>
    </StepperItem>
    <StepperItem step={2}>
      <StepperIndicator />
      <StepperContent>
        <StepperTitle>Set up workspace</StepperTitle>
        <StepperDescription>Configure your team settings</StepperDescription>
      </StepperContent>
    </StepperItem>
    <StepperItem step={3}>
      <StepperIndicator />
      <StepperContent>
        <StepperTitle>Invite team</StepperTitle>
        <StepperDescription>Add your colleagues</StepperDescription>
      </StepperContent>
    </StepperItem>
  </Stepper>
</div>
        `.trim(),
      },
    },
  },
  render: () => (
    <div className="w-[360px]">
      <Stepper currentStep={2} orientation="vertical">
        <StepperItem step={0}>
          <StepperIndicator />
          <StepperContent>
            <StepperTitle>Create account</StepperTitle>
            <StepperDescription>Sign up with your email</StepperDescription>
          </StepperContent>
        </StepperItem>
        <StepperItem step={1}>
          <StepperIndicator />
          <StepperContent>
            <StepperTitle>Verify email</StepperTitle>
            <StepperDescription>Check your inbox</StepperDescription>
          </StepperContent>
        </StepperItem>
        <StepperItem step={2}>
          <StepperIndicator />
          <StepperContent>
            <StepperTitle>Set up workspace</StepperTitle>
            <StepperDescription>
              Configure your team settings
            </StepperDescription>
          </StepperContent>
        </StepperItem>
        <StepperItem step={3}>
          <StepperIndicator />
          <StepperContent>
            <StepperTitle>Invite team</StepperTitle>
            <StepperDescription>Add your colleagues</StepperDescription>
          </StepperContent>
        </StepperItem>
      </Stepper>
    </div>
  ),
};
