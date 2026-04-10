import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
} from "@nuka/components/Sidebar";
import { Icon } from "@nuka/components/Icon";

const meta = {
  title: "Navigation/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Sidebar>;

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

const ShieldIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const ClipboardIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
  </svg>
);

const ActivityIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

function SidebarLayout({
  defaultExpanded = true,
}: {
  defaultExpanded?: boolean;
}) {
  return (
    <SidebarProvider defaultExpanded={defaultExpanded}>
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
      <SidebarInset>
        <header className="flex items-center gap-3 p-(--space-4) border-b border-(--nuka-border-base)">
          <SidebarTrigger />
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </header>
        <main className="p-(--space-6)">
          <p>Main content area. Resize the browser to see mobile behavior.</p>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export const Expanded: Story = {
  name: "Desktop Expanded",
  render: () => <SidebarLayout />,
  parameters: {
    docs: {
      source: {
        code: `
<SidebarProvider defaultExpanded>
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
              <Icon size="sm"><HomeIcon /></Icon>
              <span>Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Analytics">
              <Icon size="sm"><BarChartIcon /></Icon>
              <span>Analytics</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Inbox">
              <Icon size="sm"><InboxIcon /></Icon>
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
              <Icon size="sm"><UsersIcon /></Icon>
              <span>Team</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Icon size="sm"><SettingsIcon /></Icon>
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
            <Icon size="sm"><UsersIcon /></Icon>
            <span>John Doe</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
  <SidebarInset>
    <header className="flex items-center gap-3 p-(--space-4) border-b border-(--nuka-border-base)">
      <SidebarTrigger />
      <h1 className="text-lg font-semibold">Dashboard</h1>
    </header>
    <main className="p-(--space-6)">
      <p>Main content area. Resize the browser to see mobile behavior.</p>
    </main>
  </SidebarInset>
</SidebarProvider>
        `.trim(),
      },
    },
  },
};

export const Collapsed: Story = {
  name: "Desktop Collapsed",
  render: () => <SidebarLayout defaultExpanded={false} />,
  parameters: {
    docs: {
      source: {
        code: `
<SidebarProvider defaultExpanded={false}>
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
              <Icon size="sm"><HomeIcon /></Icon>
              <span>Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Analytics">
              <Icon size="sm"><BarChartIcon /></Icon>
              <span>Analytics</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Inbox">
              <Icon size="sm"><InboxIcon /></Icon>
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
              <Icon size="sm"><UsersIcon /></Icon>
              <span>Team</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Icon size="sm"><SettingsIcon /></Icon>
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
            <Icon size="sm"><UsersIcon /></Icon>
            <span>John Doe</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
  <SidebarInset>
    <header className="flex items-center gap-3 p-(--space-4) border-b border-(--nuka-border-base)">
      <SidebarTrigger />
      <h1 className="text-lg font-semibold">Dashboard</h1>
    </header>
    <main className="p-(--space-6)">
      <p>Main content area. Resize the browser to see mobile behavior.</p>
    </main>
  </SidebarInset>
</SidebarProvider>
        `.trim(),
      },
    },
  },
};

export const WithLinks: Story = {
  name: "With Links (asChild)",
  render: () => (
    <SidebarProvider defaultExpanded>
      <Sidebar>
        <SidebarHeader>
          <span className="font-semibold">App</span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Home">
                <a href="#home">
                  <Icon size="sm">
                    <HomeIcon />
                  </Icon>
                  <span>Home</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Settings">
                <a href="#settings">
                  <Icon size="sm">
                    <SettingsIcon />
                  </Icon>
                  <span>Settings</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center gap-3 p-(--space-4) border-b border-(--nuka-border-base)">
          <SidebarTrigger />
          <h1 className="text-lg font-semibold">Home</h1>
        </header>
        <main className="p-(--space-6)">
          <p>Menu buttons rendered as links via asChild.</p>
        </main>
      </SidebarInset>
    </SidebarProvider>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<SidebarProvider defaultExpanded>
  <Sidebar>
    <SidebarHeader>
      <span className="font-semibold">App</span>
    </SidebarHeader>
    <SidebarContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="Home">
            <a href="#home">
              <Icon size="sm"><HomeIcon /></Icon>
              <span>Home</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="Settings">
            <a href="#settings">
              <Icon size="sm"><SettingsIcon /></Icon>
              <span>Settings</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarContent>
  </Sidebar>
  <SidebarInset>
    <header className="flex items-center gap-3 p-(--space-4) border-b border-(--nuka-border-base)">
      <SidebarTrigger />
      <h1 className="text-lg font-semibold">Home</h1>
    </header>
    <main className="p-(--space-6)">
      <p>Menu buttons rendered as links via asChild.</p>
    </main>
  </SidebarInset>
</SidebarProvider>
        `.trim(),
      },
    },
  },
};

export const AdminDashboard: Story = {
  name: "Pattern: Admin Dashboard",
  render: () => (
    <SidebarProvider defaultExpanded>
      <Sidebar>
        <SidebarHeader>
          <span className="font-semibold text-base flex items-center gap-2">
            <Icon size="md">
              <ShieldIcon />
            </Icon>
            <span>Admin Portal</span>
          </span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Users">
                  <Icon size="sm">
                    <UsersIcon />
                  </Icon>
                  <span>Users</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Roles">
                  <Icon size="sm">
                    <ClipboardIcon />
                  </Icon>
                  <span>Roles</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Audit Log">
                  <Icon size="sm">
                    <ClipboardIcon />
                  </Icon>
                  <span>Audit Log</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>System</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Monitoring">
                  <Icon size="sm">
                    <ActivityIcon />
                  </Icon>
                  <span>Monitoring</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Configuration">
                  <Icon size="sm">
                    <SettingsIcon />
                  </Icon>
                  <span>Configuration</span>
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
                <span>Admin User</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center gap-3 p-(--space-4) border-b border-(--nuka-border-base)">
          <SidebarTrigger />
          <h1 className="text-lg font-semibold">Administration</h1>
        </header>
        <main className="p-(--space-6)">
          <p>System overview and administration panel.</p>
        </main>
      </SidebarInset>
    </SidebarProvider>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<SidebarProvider defaultExpanded>
  <Sidebar>
    <SidebarHeader>
      <span className="font-semibold text-base flex items-center gap-2">
        <Icon size="md"><ShieldIcon /></Icon>
        <span>Admin Portal</span>
      </span>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Administration</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Users">
              <Icon size="sm"><UsersIcon /></Icon>
              <span>Users</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Roles">
              <Icon size="sm"><ClipboardIcon /></Icon>
              <span>Roles</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Audit Log">
              <Icon size="sm"><ClipboardIcon /></Icon>
              <span>Audit Log</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>System</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Monitoring">
              <Icon size="sm"><ActivityIcon /></Icon>
              <span>Monitoring</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Configuration">
              <Icon size="sm"><SettingsIcon /></Icon>
              <span>Configuration</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Profile">
            <Icon size="sm"><UsersIcon /></Icon>
            <span>Admin User</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
  <SidebarInset>
    <header className="flex items-center gap-3 p-(--space-4) border-b border-(--nuka-border-base)">
      <SidebarTrigger />
      <h1 className="text-lg font-semibold">Administration</h1>
    </header>
    <main className="p-(--space-6)">
      <p>System overview and administration panel.</p>
    </main>
  </SidebarInset>
</SidebarProvider>
        `.trim(),
      },
    },
  },
};
