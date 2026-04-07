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
          {Array.from({ length: 20 }, (_, i) => (
            <Text key={i} size="sm">
              Section {i + 1}: Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </Text>
          ))}
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
  render: () => <ControlledExample />,
};
