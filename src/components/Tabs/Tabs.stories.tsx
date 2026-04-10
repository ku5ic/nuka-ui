import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@nuka/components/Tabs";
import { Text } from "@nuka/components/Text";
import { Stack } from "@nuka/components/Stack";
import { Input } from "@nuka/components/Input";
import { Label } from "@nuka/components/Label";
import { Button } from "@nuka/components/Button";

const meta = {
  title: "Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
    <TabsTrigger value="notifications">Notifications</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <Text>Manage your account settings and preferences.</Text>
  </TabsContent>
  <TabsContent value="password">
    <Text>Change your password and security settings.</Text>
  </TabsContent>
  <TabsContent value="notifications">
    <Text>Configure how you receive notifications.</Text>
  </TabsContent>
</Tabs>
        `.trim(),
      },
    },
  },
  render: () => (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Text>Manage your account settings and preferences.</Text>
      </TabsContent>
      <TabsContent value="password">
        <Text>Change your password and security settings.</Text>
      </TabsContent>
      <TabsContent value="notifications">
        <Text>Configure how you receive notifications.</Text>
      </TabsContent>
    </Tabs>
  ),
};

export const Underline: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Tabs defaultValue="tab-1">
  <TabsList variant="underline">
    <TabsTrigger value="tab-1">Overview</TabsTrigger>
    <TabsTrigger value="tab-2">Analytics</TabsTrigger>
    <TabsTrigger value="tab-3">Reports</TabsTrigger>
  </TabsList>
  <TabsContent value="tab-1">
    <Text>Overview content</Text>
  </TabsContent>
  <TabsContent value="tab-2">
    <Text>Analytics content</Text>
  </TabsContent>
  <TabsContent value="tab-3">
    <Text>Reports content</Text>
  </TabsContent>
</Tabs>
        `.trim(),
      },
    },
  },
  render: () => (
    <Tabs defaultValue="tab-1">
      <TabsList variant="underline">
        <TabsTrigger value="tab-1">Overview</TabsTrigger>
        <TabsTrigger value="tab-2">Analytics</TabsTrigger>
        <TabsTrigger value="tab-3">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1">
        <Text>Overview content</Text>
      </TabsContent>
      <TabsContent value="tab-2">
        <Text>Analytics content</Text>
      </TabsContent>
      <TabsContent value="tab-3">
        <Text>Reports content</Text>
      </TabsContent>
    </Tabs>
  ),
};

export const Pill: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Tabs defaultValue="tab-1">
  <TabsList variant="pill">
    <TabsTrigger value="tab-1">Overview</TabsTrigger>
    <TabsTrigger value="tab-2">Analytics</TabsTrigger>
    <TabsTrigger value="tab-3">Reports</TabsTrigger>
  </TabsList>
  <TabsContent value="tab-1">
    <Text>Overview content</Text>
  </TabsContent>
  <TabsContent value="tab-2">
    <Text>Analytics content</Text>
  </TabsContent>
  <TabsContent value="tab-3">
    <Text>Reports content</Text>
  </TabsContent>
</Tabs>
        `.trim(),
      },
    },
  },
  render: () => (
    <Tabs defaultValue="tab-1">
      <TabsList variant="pill">
        <TabsTrigger value="tab-1">Overview</TabsTrigger>
        <TabsTrigger value="tab-2">Analytics</TabsTrigger>
        <TabsTrigger value="tab-3">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1">
        <Text>Overview content</Text>
      </TabsContent>
      <TabsContent value="tab-2">
        <Text>Analytics content</Text>
      </TabsContent>
      <TabsContent value="tab-3">
        <Text>Reports content</Text>
      </TabsContent>
    </Tabs>
  ),
};

export const Boxed: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Tabs defaultValue="tab-1">
  <TabsList variant="boxed">
    <TabsTrigger value="tab-1">Overview</TabsTrigger>
    <TabsTrigger value="tab-2">Analytics</TabsTrigger>
    <TabsTrigger value="tab-3">Reports</TabsTrigger>
  </TabsList>
  <TabsContent value="tab-1">
    <Text>Overview content</Text>
  </TabsContent>
  <TabsContent value="tab-2">
    <Text>Analytics content</Text>
  </TabsContent>
  <TabsContent value="tab-3">
    <Text>Reports content</Text>
  </TabsContent>
</Tabs>
        `.trim(),
      },
    },
  },
  render: () => (
    <Tabs defaultValue="tab-1">
      <TabsList variant="boxed">
        <TabsTrigger value="tab-1">Overview</TabsTrigger>
        <TabsTrigger value="tab-2">Analytics</TabsTrigger>
        <TabsTrigger value="tab-3">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1">
        <Text>Overview content</Text>
      </TabsContent>
      <TabsContent value="tab-2">
        <Text>Analytics content</Text>
      </TabsContent>
      <TabsContent value="tab-3">
        <Text>Reports content</Text>
      </TabsContent>
    </Tabs>
  ),
};

export const AllVariants: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Stack direction="column" gap="2xl">
  <Stack direction="column" gap="xs">
    <Text size="sm" weight="semibold">underline</Text>
    <Tabs defaultValue="tab-1">
      <TabsList variant="underline">
        <TabsTrigger value="tab-1">Overview</TabsTrigger>
        <TabsTrigger value="tab-2">Analytics</TabsTrigger>
        <TabsTrigger value="tab-3">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1"><Text>Overview content</Text></TabsContent>
      <TabsContent value="tab-2"><Text>Analytics content</Text></TabsContent>
      <TabsContent value="tab-3"><Text>Reports content</Text></TabsContent>
    </Tabs>
  </Stack>
  <Stack direction="column" gap="xs">
    <Text size="sm" weight="semibold">pill</Text>
    <Tabs defaultValue="tab-1">
      <TabsList variant="pill">
        <TabsTrigger value="tab-1">Overview</TabsTrigger>
        <TabsTrigger value="tab-2">Analytics</TabsTrigger>
        <TabsTrigger value="tab-3">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1"><Text>Overview content</Text></TabsContent>
      <TabsContent value="tab-2"><Text>Analytics content</Text></TabsContent>
      <TabsContent value="tab-3"><Text>Reports content</Text></TabsContent>
    </Tabs>
  </Stack>
  <Stack direction="column" gap="xs">
    <Text size="sm" weight="semibold">boxed</Text>
    <Tabs defaultValue="tab-1">
      <TabsList variant="boxed">
        <TabsTrigger value="tab-1">Overview</TabsTrigger>
        <TabsTrigger value="tab-2">Analytics</TabsTrigger>
        <TabsTrigger value="tab-3">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1"><Text>Overview content</Text></TabsContent>
      <TabsContent value="tab-2"><Text>Analytics content</Text></TabsContent>
      <TabsContent value="tab-3"><Text>Reports content</Text></TabsContent>
    </Tabs>
  </Stack>
</Stack>
        `.trim(),
      },
    },
  },
  render: () => (
    <Stack direction="column" gap="2xl">
      {(["underline", "pill", "boxed"] as const).map((variant) => (
        <Stack key={variant} direction="column" gap="xs">
          <Text size="sm" weight="semibold">
            {variant}
          </Text>
          <Tabs defaultValue="tab-1">
            <TabsList variant={variant}>
              <TabsTrigger value="tab-1">Overview</TabsTrigger>
              <TabsTrigger value="tab-2">Analytics</TabsTrigger>
              <TabsTrigger value="tab-3">Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="tab-1">
              <Text>Overview content</Text>
            </TabsContent>
            <TabsContent value="tab-2">
              <Text>Analytics content</Text>
            </TabsContent>
            <TabsContent value="tab-3">
              <Text>Reports content</Text>
            </TabsContent>
          </Tabs>
        </Stack>
      ))}
    </Stack>
  ),
};

export const Vertical: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Tabs defaultValue="tab-1" orientation="vertical">
  <TabsList>
    <TabsTrigger value="tab-1">General</TabsTrigger>
    <TabsTrigger value="tab-2">Security</TabsTrigger>
    <TabsTrigger value="tab-3">Billing</TabsTrigger>
  </TabsList>
  <TabsContent value="tab-1">
    <Text>General settings content</Text>
  </TabsContent>
  <TabsContent value="tab-2">
    <Text>Security settings content</Text>
  </TabsContent>
  <TabsContent value="tab-3">
    <Text>Billing settings content</Text>
  </TabsContent>
</Tabs>
        `.trim(),
      },
    },
  },
  render: () => (
    <Tabs defaultValue="tab-1" orientation="vertical">
      <TabsList>
        <TabsTrigger value="tab-1">General</TabsTrigger>
        <TabsTrigger value="tab-2">Security</TabsTrigger>
        <TabsTrigger value="tab-3">Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1">
        <Text>General settings content</Text>
      </TabsContent>
      <TabsContent value="tab-2">
        <Text>Security settings content</Text>
      </TabsContent>
      <TabsContent value="tab-3">
        <Text>Billing settings content</Text>
      </TabsContent>
    </Tabs>
  ),
};

export const ManualActivation: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Tabs defaultValue="tab-1" activationMode="manual">
  <TabsList>
    <TabsTrigger value="tab-1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab-2">Tab 2</TabsTrigger>
    <TabsTrigger value="tab-3">Tab 3</TabsTrigger>
  </TabsList>
  <TabsContent value="tab-1">
    <Text>
      Use arrow keys to move focus, then press Enter or Space to activate.
    </Text>
  </TabsContent>
  <TabsContent value="tab-2">
    <Text>Panel 2 content</Text>
  </TabsContent>
  <TabsContent value="tab-3">
    <Text>Panel 3 content</Text>
  </TabsContent>
</Tabs>
        `.trim(),
      },
    },
  },
  render: () => (
    <Tabs defaultValue="tab-1" activationMode="manual">
      <TabsList>
        <TabsTrigger value="tab-1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab-2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab-3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1">
        <Text>
          Use arrow keys to move focus, then press Enter or Space to activate.
        </Text>
      </TabsContent>
      <TabsContent value="tab-2">
        <Text>Panel 2 content</Text>
      </TabsContent>
      <TabsContent value="tab-3">
        <Text>Panel 3 content</Text>
      </TabsContent>
    </Tabs>
  ),
};

function ControlledExample() {
  const [value, setValue] = useState("tab-1");

  return (
    <Stack direction="column" gap="md">
      <Text size="sm">
        Active tab: <strong>{value}</strong>
      </Text>
      <Tabs value={value} onValueChange={setValue}>
        <TabsList>
          <TabsTrigger value="tab-1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab-2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab-3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab-1">
          <Text>Panel 1</Text>
        </TabsContent>
        <TabsContent value="tab-2">
          <Text>Panel 2</Text>
        </TabsContent>
        <TabsContent value="tab-3">
          <Text>Panel 3</Text>
        </TabsContent>
      </Tabs>
    </Stack>
  );
}

export const Controlled: Story = {
  parameters: {
    docs: {
      source: {
        code: `
function Example() {
  const [value, setValue] = useState("tab-1");

  return (
    <Stack direction="column" gap="md">
      <Text size="sm">
        Active tab: <strong>{value}</strong>
      </Text>
      <Tabs value={value} onValueChange={setValue}>
        <TabsList>
          <TabsTrigger value="tab-1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab-2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab-3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab-1">
          <Text>Panel 1</Text>
        </TabsContent>
        <TabsContent value="tab-2">
          <Text>Panel 2</Text>
        </TabsContent>
        <TabsContent value="tab-3">
          <Text>Panel 3</Text>
        </TabsContent>
      </Tabs>
    </Stack>
  );
}
        `.trim(),
      },
    },
  },
  render: () => <ControlledExample />,
};

export const DisabledTab: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Tabs defaultValue="tab-1">
  <TabsList>
    <TabsTrigger value="tab-1">Active</TabsTrigger>
    <TabsTrigger value="tab-2" disabled>
      Disabled
    </TabsTrigger>
    <TabsTrigger value="tab-3">Also Active</TabsTrigger>
  </TabsList>
  <TabsContent value="tab-1">
    <Text>First panel content</Text>
  </TabsContent>
  <TabsContent value="tab-2">
    <Text>This panel cannot be reached via the disabled tab.</Text>
  </TabsContent>
  <TabsContent value="tab-3">
    <Text>Third panel content</Text>
  </TabsContent>
</Tabs>
        `.trim(),
      },
    },
  },
  render: () => (
    <Tabs defaultValue="tab-1">
      <TabsList>
        <TabsTrigger value="tab-1">Active</TabsTrigger>
        <TabsTrigger value="tab-2" disabled>
          Disabled
        </TabsTrigger>
        <TabsTrigger value="tab-3">Also Active</TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1">
        <Text>First panel content</Text>
      </TabsContent>
      <TabsContent value="tab-2">
        <Text>This panel cannot be reached via the disabled tab.</Text>
      </TabsContent>
      <TabsContent value="tab-3">
        <Text>Third panel content</Text>
      </TabsContent>
    </Tabs>
  ),
};

export const SettingsPage: Story = {
  name: "Pattern: Settings Page",
  parameters: {
    docs: {
      source: {
        code: `
<Tabs defaultValue="profile" className="w-full max-w-lg">
  <TabsList>
    <TabsTrigger value="profile">Profile</TabsTrigger>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="notifications">Notifications</TabsTrigger>
  </TabsList>
  <TabsContent value="profile">
    <Stack direction="column" gap="md">
      <Stack direction="column" gap="xs">
        <Label htmlFor="name">Name</Label>
        <Input id="name" defaultValue="Jane Doe" />
      </Stack>
      <Stack direction="column" gap="xs">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" defaultValue="jane@example.com" />
      </Stack>
      <Button className="self-start">Save changes</Button>
    </Stack>
  </TabsContent>
  <TabsContent value="account">
    <Stack direction="column" gap="md">
      <Stack direction="column" gap="xs">
        <Label htmlFor="username">Username</Label>
        <Input id="username" defaultValue="janedoe" />
      </Stack>
      <Button className="self-start" variant="outline" intent="danger">
        Delete account
      </Button>
    </Stack>
  </TabsContent>
  <TabsContent value="notifications">
    <Stack direction="column" gap="md">
      <Text>
        Configure your notification preferences here. Form state is
        preserved when switching tabs thanks to the hidden attribute.
      </Text>
    </Stack>
  </TabsContent>
</Tabs>
        `.trim(),
      },
    },
  },
  render: () => (
    <Tabs defaultValue="profile" className="w-full max-w-lg">
      <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <Stack direction="column" gap="md">
          <Stack direction="column" gap="xs">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="Jane Doe" />
          </Stack>
          <Stack direction="column" gap="xs">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="jane@example.com" />
          </Stack>
          <Button className="self-start">Save changes</Button>
        </Stack>
      </TabsContent>
      <TabsContent value="account">
        <Stack direction="column" gap="md">
          <Stack direction="column" gap="xs">
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue="janedoe" />
          </Stack>
          <Button className="self-start" variant="outline" intent="danger">
            Delete account
          </Button>
        </Stack>
      </TabsContent>
      <TabsContent value="notifications">
        <Stack direction="column" gap="md">
          <Text>
            Configure your notification preferences here. Form state is
            preserved when switching tabs thanks to the hidden attribute.
          </Text>
        </Stack>
      </TabsContent>
    </Tabs>
  ),
};
