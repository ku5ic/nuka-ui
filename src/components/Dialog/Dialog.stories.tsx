import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@nuka/components/Dialog";
import { Button } from "@nuka/components/Button";
import { Input } from "@nuka/components/Input";
import { Label } from "@nuka/components/Label";
import { Stack } from "@nuka/components/Stack";
import { Text } from "@nuka/components/Text";

const meta: Meta = {
  title: "Navigation/Dialog",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Dialog>
  <DialogTrigger asChild>
    <Button>Open dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogTitle>Dialog title</DialogTitle>
    <DialogDescription>
      This is a basic dialog with a title and description.
    </DialogDescription>
  </DialogContent>
</Dialog>
        `.trim(),
      },
    },
  },
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Dialog title</DialogTitle>
        <DialogDescription>
          This is a basic dialog with a title and description.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  ),
};

export const WithForm: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Dialog>
  <DialogTrigger asChild>
    <Button>Edit profile</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogTitle>Edit profile</DialogTitle>
    <DialogDescription>
      Make changes to your profile here.
    </DialogDescription>
    <Stack direction="column" gap="md" className="mt-(--space-4)">
      <Stack direction="column" gap="xs">
        <Label htmlFor="dialog-name">Name</Label>
        <Input id="dialog-name" defaultValue="Jane Doe" />
      </Stack>
      <Stack direction="column" gap="xs">
        <Label htmlFor="dialog-email">Email</Label>
        <Input
          id="dialog-email"
          type="email"
          defaultValue="jane@example.com"
        />
      </Stack>
      <Stack direction="row" gap="sm" className="justify-end">
        <DialogClose asChild>
          <Button variant="ghost">Cancel</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button>Save changes</Button>
        </DialogClose>
      </Stack>
    </Stack>
  </DialogContent>
</Dialog>
        `.trim(),
      },
    },
  },
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here.
        </DialogDescription>
        <Stack direction="column" gap="md" className="mt-(--space-4)">
          <Stack direction="column" gap="xs">
            <Label htmlFor="dialog-name">Name</Label>
            <Input id="dialog-name" defaultValue="Jane Doe" />
          </Stack>
          <Stack direction="column" gap="xs">
            <Label htmlFor="dialog-email">Email</Label>
            <Input
              id="dialog-email"
              type="email"
              defaultValue="jane@example.com"
            />
          </Stack>
          <Stack direction="row" gap="sm" className="justify-end">
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button>Save changes</Button>
            </DialogClose>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  ),
};

export const WithScroll: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Dialog>
  <DialogTrigger asChild>
    <Button>Terms of service</Button>
  </DialogTrigger>
  <DialogContent className="max-h-[80vh] overflow-y-auto">
    <DialogTitle>Terms of service</DialogTitle>
    <DialogDescription>
      Please review the following terms carefully.
    </DialogDescription>
    <Stack direction="column" gap="sm" className="mt-(--space-4)">
      <Text size="sm">
        1. Acceptance. By accessing or using the Service, you agree to be
        bound by these Terms. If you do not agree, do not use the Service.
      </Text>
      <Text size="sm">
        2. Eligibility. You must be at least 18 years old and capable of
        forming a binding contract to use the Service.
      </Text>
      <Text size="sm">
        3. Account Registration. You are responsible for maintaining the
        confidentiality of your account credentials and for all activity
        under your account.
      </Text>
      <Text size="sm">
        4. Acceptable Use. You agree not to use the Service for any unlawful
        purpose or in a way that could damage, disable, or impair the
        Service.
      </Text>
      <Text size="sm">
        5. Intellectual Property. All content, features, and functionality
        of the Service are owned by us and protected by copyright,
        trademark, and other intellectual property laws.
      </Text>
      <Text size="sm">
        6. User Content. You retain ownership of content you submit. By
        posting content, you grant us a non-exclusive license to use,
        display, and distribute it within the Service.
      </Text>
      <Text size="sm">
        7. Privacy. Your use of the Service is subject to our Privacy
        Policy, which describes how we collect, use, and share your
        information.
      </Text>
      <Text size="sm">
        8. Termination. We may suspend or terminate your access at any time
        for conduct that violates these Terms or is harmful to the Service
        or other users.
      </Text>
      <Text size="sm">
        9. Disclaimers. The Service is provided as-is without warranties of
        any kind, either express or implied, including merchantability and
        fitness for a particular purpose.
      </Text>
      <Text size="sm">
        10. Limitation of Liability. In no event shall we be liable for
        indirect, incidental, special, or consequential damages arising from
        your use of the Service.
      </Text>
      <Text size="sm">
        11. Indemnification. You agree to indemnify and hold us harmless
        from any claims, damages, or expenses arising from your use of the
        Service or violation of these Terms.
      </Text>
      <Text size="sm">
        12. Modifications. We reserve the right to modify these Terms at any
        time. Continued use after changes constitutes acceptance of the
        revised Terms.
      </Text>
      <Text size="sm">
        13. Governing Law. These Terms are governed by the laws of the
        applicable jurisdiction, without regard to conflict of law
        principles.
      </Text>
      <Text size="sm">
        14. Dispute Resolution. Any disputes shall be resolved through
        binding arbitration in accordance with the rules of the applicable
        arbitration association.
      </Text>
      <Text size="sm">
        15. Severability. If any provision of these Terms is found invalid
        or unenforceable, the remaining provisions shall continue in full
        force and effect.
      </Text>
      <Text size="sm">
        16. Entire Agreement. These Terms constitute the entire agreement
        between you and us regarding the Service, superseding all prior
        agreements.
      </Text>
      <Text size="sm">
        17. Contact. For questions about these Terms, please contact us at
        legal@example.com.
      </Text>
    </Stack>
    <Stack direction="row" gap="sm" className="justify-end mt-(--space-4)">
      <DialogClose asChild>
        <Button variant="ghost">Decline</Button>
      </DialogClose>
      <DialogClose asChild>
        <Button>Accept</Button>
      </DialogClose>
    </Stack>
  </DialogContent>
</Dialog>
        `.trim(),
      },
    },
  },
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Terms of service</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogTitle>Terms of service</DialogTitle>
        <DialogDescription>
          Please review the following terms carefully.
        </DialogDescription>
        <Stack direction="column" gap="sm" className="mt-(--space-4)">
          <Text size="sm">
            1. Acceptance. By accessing or using the Service, you agree to be
            bound by these Terms. If you do not agree, do not use the Service.
          </Text>
          <Text size="sm">
            2. Eligibility. You must be at least 18 years old and capable of
            forming a binding contract to use the Service.
          </Text>
          <Text size="sm">
            3. Account Registration. You are responsible for maintaining the
            confidentiality of your account credentials and for all activity
            under your account.
          </Text>
          <Text size="sm">
            4. Acceptable Use. You agree not to use the Service for any unlawful
            purpose or in a way that could damage, disable, or impair the
            Service.
          </Text>
          <Text size="sm">
            5. Intellectual Property. All content, features, and functionality
            of the Service are owned by us and protected by copyright,
            trademark, and other intellectual property laws.
          </Text>
          <Text size="sm">
            6. User Content. You retain ownership of content you submit. By
            posting content, you grant us a non-exclusive license to use,
            display, and distribute it within the Service.
          </Text>
          <Text size="sm">
            7. Privacy. Your use of the Service is subject to our Privacy
            Policy, which describes how we collect, use, and share your
            information.
          </Text>
          <Text size="sm">
            8. Termination. We may suspend or terminate your access at any time
            for conduct that violates these Terms or is harmful to the Service
            or other users.
          </Text>
          <Text size="sm">
            9. Disclaimers. The Service is provided as-is without warranties of
            any kind, either express or implied, including merchantability and
            fitness for a particular purpose.
          </Text>
          <Text size="sm">
            10. Limitation of Liability. In no event shall we be liable for
            indirect, incidental, special, or consequential damages arising from
            your use of the Service.
          </Text>
          <Text size="sm">
            11. Indemnification. You agree to indemnify and hold us harmless
            from any claims, damages, or expenses arising from your use of the
            Service or violation of these Terms.
          </Text>
          <Text size="sm">
            12. Modifications. We reserve the right to modify these Terms at any
            time. Continued use after changes constitutes acceptance of the
            revised Terms.
          </Text>
          <Text size="sm">
            13. Governing Law. These Terms are governed by the laws of the
            applicable jurisdiction, without regard to conflict of law
            principles.
          </Text>
          <Text size="sm">
            14. Dispute Resolution. Any disputes shall be resolved through
            binding arbitration in accordance with the rules of the applicable
            arbitration association.
          </Text>
          <Text size="sm">
            15. Severability. If any provision of these Terms is found invalid
            or unenforceable, the remaining provisions shall continue in full
            force and effect.
          </Text>
          <Text size="sm">
            16. Entire Agreement. These Terms constitute the entire agreement
            between you and us regarding the Service, superseding all prior
            agreements.
          </Text>
          <Text size="sm">
            17. Contact. For questions about these Terms, please contact us at
            legal@example.com.
          </Text>
        </Stack>
        <Stack direction="row" gap="sm" className="justify-end mt-(--space-4)">
          <DialogClose asChild>
            <Button variant="ghost">Decline</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Accept</Button>
          </DialogClose>
        </Stack>
      </DialogContent>
    </Dialog>
  ),
};

export const Confirmation: Story = {
  name: "Pattern: Confirmation",
  parameters: {
    docs: {
      source: {
        code: `
<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline" intent="danger">
      Delete account
    </Button>
  </DialogTrigger>
  <DialogContent>
    <DialogTitle>Are you sure?</DialogTitle>
    <DialogDescription>
      This action cannot be undone. Your account and all associated data
      will be permanently deleted.
    </DialogDescription>
    <Stack direction="row" gap="sm" className="justify-end mt-(--space-4)">
      <DialogClose asChild>
        <Button variant="ghost">Cancel</Button>
      </DialogClose>
      <DialogClose asChild>
        <Button variant="primary" intent="danger">
          Delete account
        </Button>
      </DialogClose>
    </Stack>
  </DialogContent>
</Dialog>
        `.trim(),
      },
    },
  },
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" intent="danger">
          Delete account
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. Your account and all associated data
          will be permanently deleted.
        </DialogDescription>
        <Stack direction="row" gap="sm" className="justify-end mt-(--space-4)">
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="primary" intent="danger">
              Delete account
            </Button>
          </DialogClose>
        </Stack>
      </DialogContent>
    </Dialog>
  ),
};

function ControlledExample() {
  const [open, setOpen] = useState(false);

  return (
    <Stack direction="column" gap="md">
      <Text size="sm">
        Dialog is: <strong>{open ? "open" : "closed"}</strong>
      </Text>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Open controlled</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Controlled dialog</DialogTitle>
          <DialogDescription>
            This dialog is controlled via external state.
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </Stack>
  );
}

export const Controlled: Story = {
  parameters: {
    docs: {
      source: {
        code: `
function Example() {
  const [open, setOpen] = useState(false);

  return (
    <Stack direction="column" gap="md">
      <Text size="sm">
        Dialog is: <strong>{open ? "open" : "closed"}</strong>
      </Text>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Open controlled</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Controlled dialog</DialogTitle>
          <DialogDescription>
            This dialog is controlled via external state.
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </Stack>
  );
}
        `.trim(),
      },
    },
  },
  render: () => <ControlledExample />,
};
