import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  AppShell,
  AppShellHeader,
  AppShellBody,
  AppShellMain,
} from "@nuka/components/AppShell";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarFooter,
} from "@nuka/components/Sidebar";
import { Heading } from "@nuka/components/Heading";
import { Text } from "@nuka/components/Text";
import { Stack } from "@nuka/components/Stack";
import { Icon } from "@nuka/components/Icon";
import { Card, CardBody } from "@nuka/components/Card";

const meta = {
  title: "Composites/AppShell",
  component: AppShell,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AppShell>;

export default meta;
type Story = StoryObj<typeof meta>;

const HomeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const SettingsIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

const UsersIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87" />
    <path d="M16 3.13a4 4 0 010 7.75" />
  </svg>
);

const BarChartIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="20" x2="12" y2="10" />
    <line x1="18" y1="20" x2="18" y2="4" />
    <line x1="6" y1="20" x2="6" y2="16" />
  </svg>
);

const InboxIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" />
  </svg>
);

function SidebarNav() {
  return (
    <Sidebar>
      <SidebarHeader>
        <span className="font-semibold text-base flex items-center gap-2">
          <Icon size="md">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10" />
            </svg>
          </Icon>
          <span>Acme</span>
        </span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Dashboard">
                <Icon size="sm">
                  <HomeIcon />
                </Icon>
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Analytics">
                <Icon size="sm">
                  <BarChartIcon />
                </Icon>
                <span>Analytics</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Inbox">
                <Icon size="sm">
                  <InboxIcon />
                </Icon>
                <span>Inbox</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Manage</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Team">
                <Icon size="sm">
                  <UsersIcon />
                </Icon>
                <span>Team</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Settings">
                <Icon size="sm">
                  <SettingsIcon />
                </Icon>
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Profile">
              <Icon size="sm">
                <UsersIcon />
              </Icon>
              <span>John Doe</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export const Default: Story = {
  name: "Default (No Sidebar)",
  parameters: {
    docs: {
      source: {
        code: `
<AppShell>
  <AppShellHeader>
    <span className="font-semibold">Acme</span>
  </AppShellHeader>
  <AppShellBody>
    <AppShellMain>
      <Heading as="h1" size="xl">Dashboard</Heading>
      <Text color="muted">Basic shell without sidebar.</Text>
    </AppShellMain>
  </AppShellBody>
</AppShell>
        `.trim(),
      },
    },
  },
  render: () => (
    <AppShell>
      <AppShellHeader>
        <span className="font-semibold">Acme</span>
      </AppShellHeader>
      <AppShellBody>
        <AppShellMain>
          <Stack direction="column" gap="sm">
            <Heading as="h1" size="xl">
              Dashboard
            </Heading>
            <Text color="muted">Basic shell without sidebar.</Text>
          </Stack>
        </AppShellMain>
      </AppShellBody>
    </AppShell>
  ),
};

export const WithSidebar: Story = {
  name: "With Sidebar",
  parameters: {
    docs: {
      source: {
        code: `
<AppShell>
  <AppShellHeader>
    <span className="font-semibold">Acme Dashboard</span>
  </AppShellHeader>
  <AppShellBody>
    <SidebarProvider defaultExpanded>
      <Sidebar>
        <SidebarHeader>...</SidebarHeader>
        <SidebarContent>...</SidebarContent>
        <SidebarFooter>...</SidebarFooter>
      </Sidebar>
      <AppShellMain>
        <Heading as="h1" size="xl">Dashboard</Heading>
        <Text color="muted">
          AppShellMain replaces SidebarInset as the flex-1 content area.
        </Text>
      </AppShellMain>
    </SidebarProvider>
  </AppShellBody>
</AppShell>
        `.trim(),
      },
    },
  },
  render: () => (
    <AppShell>
      <AppShellHeader>
        <span className="font-semibold">Acme Dashboard</span>
      </AppShellHeader>
      <AppShellBody>
        <SidebarProvider defaultExpanded>
          <SidebarNav />
          <AppShellMain>
            <Stack direction="column" gap="sm">
              <Heading as="h1" size="xl">
                Dashboard
              </Heading>
              <Text color="muted">
                AppShellMain replaces SidebarInset as the flex-1 content area.
                SidebarProvider nests inside AppShellBody, keeping AppShell and
                Sidebar fully decoupled.
              </Text>
            </Stack>
          </AppShellMain>
        </SidebarProvider>
      </AppShellBody>
    </AppShell>
  ),
};

function CollapsibleSidebarLayout() {
  return (
    <AppShell>
      <AppShellHeader>
        <SidebarTrigger />
        <span className="font-semibold">Acme Dashboard</span>
      </AppShellHeader>
      <AppShellBody>
        <SidebarNav />
        <AppShellMain>
          <Stack direction="column" gap="sm">
            <Heading as="h1" size="xl">
              Dashboard
            </Heading>
            <Text color="muted">
              Click the trigger in the header to collapse/expand the sidebar. On
              mobile viewports, the sidebar renders as a sheet overlay.
            </Text>
          </Stack>
        </AppShellMain>
      </AppShellBody>
    </AppShell>
  );
}

export const WithCollapsibleSidebar: Story = {
  name: "With Collapsible Sidebar",
  parameters: {
    docs: {
      source: {
        code: `
<SidebarProvider defaultExpanded>
  <AppShell>
    <AppShellHeader>
      <SidebarTrigger />
      <span className="font-semibold">Acme Dashboard</span>
    </AppShellHeader>
    <AppShellBody>
      <Sidebar>
        <SidebarHeader>...</SidebarHeader>
        <SidebarContent>...</SidebarContent>
        <SidebarFooter>...</SidebarFooter>
      </Sidebar>
      <AppShellMain>
        <Heading as="h1" size="xl">Dashboard</Heading>
        <Text color="muted">
          Click the trigger to collapse/expand the sidebar.
        </Text>
      </AppShellMain>
    </AppShellBody>
  </AppShell>
</SidebarProvider>
        `.trim(),
      },
    },
  },
  render: () => (
    <SidebarProvider defaultExpanded>
      <CollapsibleSidebarLayout />
    </SidebarProvider>
  ),
};

export const NoBorder: Story = {
  name: "No Border on Header",
  parameters: {
    docs: {
      source: {
        code: `
<AppShell>
  <AppShellHeader border={false}>
    <span className="font-semibold">Acme</span>
  </AppShellHeader>
  <AppShellBody>
    <AppShellMain>
      <Heading as="h1" size="xl">Dashboard</Heading>
      <Text color="muted">Header with border disabled.</Text>
    </AppShellMain>
  </AppShellBody>
</AppShell>
        `.trim(),
      },
    },
  },
  render: () => (
    <AppShell>
      <AppShellHeader border={false}>
        <span className="font-semibold">Acme</span>
      </AppShellHeader>
      <AppShellBody>
        <AppShellMain>
          <Stack direction="column" gap="sm">
            <Heading as="h1" size="xl">
              Dashboard
            </Heading>
            <Text color="muted">Header with border disabled.</Text>
          </Stack>
        </AppShellMain>
      </AppShellBody>
    </AppShell>
  ),
};

export const NoPadding: Story = {
  name: "No Padding on Main",
  parameters: {
    docs: {
      source: {
        code: `
<AppShell>
  <AppShellHeader>
    <span className="font-semibold">Acme</span>
  </AppShellHeader>
  <AppShellBody>
    <AppShellMain padded={false}>
      <div className="bg-(--nuka-bg-muted) p-(--space-6)">
        <Heading as="h1" size="xl">Full Bleed Content</Heading>
        <Text color="muted">
          Main area with padded=false. Consumers control their own padding.
        </Text>
      </div>
    </AppShellMain>
  </AppShellBody>
</AppShell>
        `.trim(),
      },
    },
  },
  render: () => (
    <AppShell>
      <AppShellHeader>
        <span className="font-semibold">Acme</span>
      </AppShellHeader>
      <AppShellBody>
        <AppShellMain padded={false}>
          <div className="bg-(--nuka-bg-muted) p-(--space-6)">
            <Stack direction="column" gap="sm">
              <Heading as="h1" size="xl">
                Full Bleed Content
              </Heading>
              <Text color="muted">
                Main area with padded=false. Consumers control their own
                padding.
              </Text>
            </Stack>
          </div>
        </AppShellMain>
      </AppShellBody>
    </AppShell>
  ),
};

function ScrollableLayout() {
  return (
    <AppShell>
      <AppShellHeader>
        <SidebarTrigger />
        <span className="font-semibold">Acme</span>
      </AppShellHeader>
      <AppShellBody>
        <SidebarNav />
        <AppShellMain>
          <Stack direction="column" gap="sm">
            <Heading as="h1" size="xl">
              Scrollable Dashboard
            </Heading>
            <Text color="muted">
              The header stays sticky. The sidebar stays fixed. Only this main
              area scrolls.
            </Text>
          </Stack>
          <Stack direction="column" gap="md" className="mt-(--space-6)">
            {Array.from({ length: 50 }, (_, i) => (
              <Card key={i}>
                <CardBody>
                  <Stack direction="column" gap="xs">
                    <Text weight="medium">Item {i + 1}</Text>
                    <Text size="sm" color="muted">
                      Placeholder content to demonstrate scroll containment
                      within AppShellMain.
                    </Text>
                  </Stack>
                </CardBody>
              </Card>
            ))}
          </Stack>
        </AppShellMain>
      </AppShellBody>
    </AppShell>
  );
}

export const ScrollableContent: Story = {
  name: "Scrollable Content",
  parameters: {
    docs: {
      source: {
        code: `
<SidebarProvider defaultExpanded>
  <AppShell>
    <AppShellHeader>
      <SidebarTrigger />
      <span className="font-semibold">Acme</span>
    </AppShellHeader>
    <AppShellBody>
      <Sidebar>...</Sidebar>
      <AppShellMain>
        <Heading as="h1" size="xl">Scrollable Dashboard</Heading>
        <Text color="muted">Only this main area scrolls.</Text>
        {/* content items */}
      </AppShellMain>
    </AppShellBody>
  </AppShell>
</SidebarProvider>
        `.trim(),
      },
    },
  },
  render: () => (
    <SidebarProvider defaultExpanded>
      <ScrollableLayout />
    </SidebarProvider>
  ),
};
