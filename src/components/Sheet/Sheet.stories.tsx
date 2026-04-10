import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@nuka/components/Sheet";
import { Button } from "@nuka/components/Button";
import { Stack } from "@nuka/components/Stack";
import { Text } from "@nuka/components/Text";

const meta: Meta = {
  title: "Navigation/Sheet",
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
<Sheet>
  <SheetTrigger asChild>
    <Button>Open sheet</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetTitle>Sheet title</SheetTitle>
    <SheetDescription>
      This sheet slides in from the right by default.
    </SheetDescription>
  </SheetContent>
</Sheet>
        `.trim(),
      },
    },
  },
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle>Sheet title</SheetTitle>
        <SheetDescription>
          This sheet slides in from the right by default.
        </SheetDescription>
      </SheetContent>
    </Sheet>
  ),
};

export const Left: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Sheet>
  <SheetTrigger asChild>
    <Button>Open left</Button>
  </SheetTrigger>
  <SheetContent side="left">
    <SheetTitle>Left sheet</SheetTitle>
    <SheetDescription>This sheet slides in from the left.</SheetDescription>
  </SheetContent>
</Sheet>
        `.trim(),
      },
    },
  },
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open left</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetTitle>Left sheet</SheetTitle>
        <SheetDescription>This sheet slides in from the left.</SheetDescription>
      </SheetContent>
    </Sheet>
  ),
};

export const Top: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Sheet>
  <SheetTrigger asChild>
    <Button>Open top</Button>
  </SheetTrigger>
  <SheetContent side="top">
    <SheetTitle>Top sheet</SheetTitle>
    <SheetDescription>This sheet slides in from the top.</SheetDescription>
  </SheetContent>
</Sheet>
        `.trim(),
      },
    },
  },
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open top</Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetTitle>Top sheet</SheetTitle>
        <SheetDescription>This sheet slides in from the top.</SheetDescription>
      </SheetContent>
    </Sheet>
  ),
};

export const Bottom: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Sheet>
  <SheetTrigger asChild>
    <Button>Open bottom</Button>
  </SheetTrigger>
  <SheetContent side="bottom">
    <SheetTitle>Bottom sheet</SheetTitle>
    <SheetDescription>
      This sheet slides in from the bottom.
    </SheetDescription>
  </SheetContent>
</Sheet>
        `.trim(),
      },
    },
  },
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open bottom</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetTitle>Bottom sheet</SheetTitle>
        <SheetDescription>
          This sheet slides in from the bottom.
        </SheetDescription>
      </SheetContent>
    </Sheet>
  ),
};

export const AllSides: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Stack direction="row" gap="sm">
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline">top</Button>
    </SheetTrigger>
    <SheetContent side="top">
      <SheetTitle>top sheet</SheetTitle>
      <SheetDescription>This sheet slides in from the top.</SheetDescription>
    </SheetContent>
  </Sheet>
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline">right</Button>
    </SheetTrigger>
    <SheetContent side="right">
      <SheetTitle>right sheet</SheetTitle>
      <SheetDescription>This sheet slides in from the right.</SheetDescription>
    </SheetContent>
  </Sheet>
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline">bottom</Button>
    </SheetTrigger>
    <SheetContent side="bottom">
      <SheetTitle>bottom sheet</SheetTitle>
      <SheetDescription>This sheet slides in from the bottom.</SheetDescription>
    </SheetContent>
  </Sheet>
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline">left</Button>
    </SheetTrigger>
    <SheetContent side="left">
      <SheetTitle>left sheet</SheetTitle>
      <SheetDescription>This sheet slides in from the left.</SheetDescription>
    </SheetContent>
  </Sheet>
</Stack>
        `.trim(),
      },
    },
  },
  render: () => (
    <Stack direction="row" gap="sm">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="outline">{side}</Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetTitle>{side} sheet</SheetTitle>
            <SheetDescription>
              This sheet slides in from the {side}.
            </SheetDescription>
          </SheetContent>
        </Sheet>
      ))}
    </Stack>
  ),
};

export const Navigation: Story = {
  name: "Pattern: Mobile Navigation",
  parameters: {
    docs: {
      source: {
        code: `
<Sheet>
  <SheetTrigger asChild>
    <Button variant="ghost">Menu</Button>
  </SheetTrigger>
  <SheetContent side="left">
    <SheetTitle>Navigation</SheetTitle>
    <Stack direction="column" gap="xs" className="mt-(--space-4)">
      <SheetClose asChild>
        <Button variant="ghost" className="justify-start w-full">Home</Button>
      </SheetClose>
      <SheetClose asChild>
        <Button variant="ghost" className="justify-start w-full">Dashboard</Button>
      </SheetClose>
      <SheetClose asChild>
        <Button variant="ghost" className="justify-start w-full">Projects</Button>
      </SheetClose>
      <SheetClose asChild>
        <Button variant="ghost" className="justify-start w-full">Team</Button>
      </SheetClose>
      <SheetClose asChild>
        <Button variant="ghost" className="justify-start w-full">Settings</Button>
      </SheetClose>
    </Stack>
  </SheetContent>
</Sheet>
        `.trim(),
      },
    },
  },
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">Menu</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetTitle>Navigation</SheetTitle>
        <Stack direction="column" gap="xs" className="mt-(--space-4)">
          {["Home", "Dashboard", "Projects", "Team", "Settings"].map((item) => (
            <SheetClose key={item} asChild>
              <Button variant="ghost" className="justify-start w-full">
                {item}
              </Button>
            </SheetClose>
          ))}
        </Stack>
      </SheetContent>
    </Sheet>
  ),
};

function ControlledExample() {
  const [open, setOpen] = useState(false);

  return (
    <Stack direction="column" gap="md">
      <Text size="sm">
        Sheet is: <strong>{open ? "open" : "closed"}</strong>
      </Text>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button>Open controlled</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle>Controlled sheet</SheetTitle>
          <SheetDescription>
            This sheet is controlled via external state.
          </SheetDescription>
        </SheetContent>
      </Sheet>
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
        Sheet is: <strong>{open ? "open" : "closed"}</strong>
      </Text>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button>Open controlled</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle>Controlled sheet</SheetTitle>
          <SheetDescription>
            This sheet is controlled via external state.
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </Stack>
  );
}
        `.trim(),
      },
    },
  },
  render: () => <ControlledExample />,
};
