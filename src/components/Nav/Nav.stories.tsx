import type { Meta, StoryObj } from "@storybook/react";
import {
  Nav,
  NavList,
  NavItem,
  NavLink,
  NavTrigger,
  NavSubmenu,
} from "@nuka/components/Nav";
import { Text } from "@nuka/components/Text";

const meta = {
  title: "Navigation/Nav",
  component: Nav,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: 150 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    "aria-label": {
      control: "text",
      description: "Accessible label for the navigation landmark",
    },
  },
} satisfies Meta<typeof Nav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Nav>
      <NavList>
        <NavItem>
          <NavLink href="#">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">About</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Contact</NavLink>
        </NavItem>
      </NavList>
    </Nav>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Nav>
  <NavList>
    <NavItem>
      <NavLink href="#">Home</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="#">About</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="#">Contact</NavLink>
    </NavItem>
  </NavList>
</Nav>
        `.trim(),
      },
    },
  },
};

export const WithSubmenus: Story = {
  render: () => (
    <Nav>
      <NavList>
        <NavItem>
          <NavLink href="#">Home</NavLink>
        </NavItem>
        <NavItem hasSubmenu>
          <NavTrigger>Products</NavTrigger>
          <NavSubmenu>
            <NavItem>
              <NavLink href="#">Analytics</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Automation</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Integrations</NavLink>
            </NavItem>
          </NavSubmenu>
        </NavItem>
        <NavItem hasSubmenu>
          <NavTrigger>Resources</NavTrigger>
          <NavSubmenu>
            <NavItem>
              <NavLink href="#">Documentation</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Blog</NavLink>
            </NavItem>
          </NavSubmenu>
        </NavItem>
        <NavItem>
          <NavLink href="#">Pricing</NavLink>
        </NavItem>
      </NavList>
    </Nav>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Nav>
  <NavList>
    <NavItem>
      <NavLink href="#">Home</NavLink>
    </NavItem>
    <NavItem hasSubmenu>
      <NavTrigger>Products</NavTrigger>
      <NavSubmenu>
        <NavItem>
          <NavLink href="#">Analytics</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Automation</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Integrations</NavLink>
        </NavItem>
      </NavSubmenu>
    </NavItem>
    <NavItem hasSubmenu>
      <NavTrigger>Resources</NavTrigger>
      <NavSubmenu>
        <NavItem>
          <NavLink href="#">Documentation</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Blog</NavLink>
        </NavItem>
      </NavSubmenu>
    </NavItem>
    <NavItem>
      <NavLink href="#">Pricing</NavLink>
    </NavItem>
  </NavList>
</Nav>
        `.trim(),
      },
    },
  },
};

export const WithActiveLink: Story = {
  render: () => (
    <Nav>
      <NavList>
        <NavItem>
          <NavLink href="#">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" active>
            About
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Contact</NavLink>
        </NavItem>
      </NavList>
    </Nav>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Nav>
  <NavList>
    <NavItem>
      <NavLink href="#">Home</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="#" active>About</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="#">Contact</NavLink>
    </NavItem>
  </NavList>
</Nav>
        `.trim(),
      },
    },
  },
};

export const AlignEnd: Story = {
  render: () => (
    <div className="flex justify-end">
      <Nav>
        <NavList>
          <NavItem hasSubmenu>
            <NavTrigger>Account</NavTrigger>
            <NavSubmenu align="end">
              <NavItem>
                <NavLink href="#">Profile</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Settings</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Sign out</NavLink>
              </NavItem>
            </NavSubmenu>
          </NavItem>
        </NavList>
      </Nav>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Nav>
  <NavList>
    <NavItem hasSubmenu>
      <NavTrigger>Account</NavTrigger>
      <NavSubmenu align="end">
        <NavItem>
          <NavLink href="#">Profile</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Settings</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Sign out</NavLink>
        </NavItem>
      </NavSubmenu>
    </NavItem>
  </NavList>
</Nav>
        `.trim(),
      },
    },
  },
};

export const AsChild: Story = {
  render: () => (
    <Nav>
      <NavList>
        <NavItem>
          <NavLink asChild>
            <a href="#">Custom Link Element</a>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavTrigger asChild>
            <button type="button">Custom Trigger</button>
          </NavTrigger>
        </NavItem>
      </NavList>
    </Nav>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Nav>
  <NavList>
    <NavItem>
      <NavLink asChild>
        <a href="#">Custom Link Element</a>
      </NavLink>
    </NavItem>
    <NavItem>
      <NavTrigger asChild>
        <button type="button">Custom Trigger</button>
      </NavTrigger>
    </NavItem>
  </NavList>
</Nav>
        `.trim(),
      },
    },
  },
};

export const BrandSiteHeader: Story = {
  name: "Pattern: Brand Site Header",
  render: () => (
    <header className="flex items-center justify-between border-b border-(--nuka-border-base) px-(--space-6) py-(--space-3)">
      <div className="flex items-center gap-(--space-6)">
        <Text size="lg" weight="bold">
          Acme Inc
        </Text>
        <Nav aria-label="Primary navigation">
          <NavList>
            <NavItem hasSubmenu>
              <NavTrigger>Products</NavTrigger>
              <NavSubmenu>
                <NavItem>
                  <NavLink href="#">
                    <div className="px-(--space-2) py-(--space-1)">
                      <Text size="sm" weight="medium">
                        Analytics
                      </Text>
                      <Text size="xs" className="text-(--nuka-text-muted)">
                        Track performance metrics
                      </Text>
                    </div>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">
                    <div className="px-(--space-2) py-(--space-1)">
                      <Text size="sm" weight="medium">
                        Automation
                      </Text>
                      <Text size="xs" className="text-(--nuka-text-muted)">
                        Streamline your workflow
                      </Text>
                    </div>
                  </NavLink>
                </NavItem>
              </NavSubmenu>
            </NavItem>
            <NavItem>
              <NavLink href="#" active>
                Pricing
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Docs</NavLink>
            </NavItem>
          </NavList>
        </Nav>
      </div>
      <Nav aria-label="User navigation">
        <NavList>
          <NavItem hasSubmenu>
            <NavTrigger>Account</NavTrigger>
            <NavSubmenu align="end">
              <NavItem>
                <NavLink href="#">Profile</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Settings</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Sign out</NavLink>
              </NavItem>
            </NavSubmenu>
          </NavItem>
        </NavList>
      </Nav>
    </header>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<header className="flex items-center justify-between border-b border-(--nuka-border-base) px-(--space-6) py-(--space-3)">
  <div className="flex items-center gap-(--space-6)">
    <Text size="lg" weight="bold">Acme Inc</Text>
    <Nav aria-label="Primary navigation">
      <NavList>
        <NavItem hasSubmenu>
          <NavTrigger>Products</NavTrigger>
          <NavSubmenu>
            <NavItem>
              <NavLink href="#">
                <div className="px-(--space-2) py-(--space-1)">
                  <Text size="sm" weight="medium">Analytics</Text>
                  <Text size="xs" className="text-(--nuka-text-muted)">Track performance metrics</Text>
                </div>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">
                <div className="px-(--space-2) py-(--space-1)">
                  <Text size="sm" weight="medium">Automation</Text>
                  <Text size="xs" className="text-(--nuka-text-muted)">Streamline your workflow</Text>
                </div>
              </NavLink>
            </NavItem>
          </NavSubmenu>
        </NavItem>
        <NavItem>
          <NavLink href="#" active>Pricing</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Docs</NavLink>
        </NavItem>
      </NavList>
    </Nav>
  </div>
  <Nav aria-label="User navigation">
    <NavList>
      <NavItem hasSubmenu>
        <NavTrigger>Account</NavTrigger>
        <NavSubmenu align="end">
          <NavItem>
            <NavLink href="#">Profile</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Settings</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Sign out</NavLink>
          </NavItem>
        </NavSubmenu>
      </NavItem>
    </NavList>
  </Nav>
</header>
        `.trim(),
      },
    },
  },
};
