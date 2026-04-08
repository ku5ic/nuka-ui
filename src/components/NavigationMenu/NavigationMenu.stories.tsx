import type { Meta, StoryObj } from "@storybook/react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@nuka/components/NavigationMenu";
import { Text } from "@nuka/components/Text";

const meta = {
  title: "Navigation/NavigationMenu",
  component: NavigationMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      story: {
        iframeHeight: 200,
      },
    },
  },
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem value="products">
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                minWidth: 200,
              }}
            >
              <NavigationMenuLink href="/products/analytics">
                Analytics
              </NavigationMenuLink>
              <NavigationMenuLink href="/products/security">
                Security
              </NavigationMenuLink>
              <NavigationMenuLink href="/products/integrations">
                Integrations
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem value="resources">
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                minWidth: 200,
              }}
            >
              <NavigationMenuLink href="/docs">
                Documentation
              </NavigationMenuLink>
              <NavigationMenuLink href="/blog">Blog</NavigationMenuLink>
              <NavigationMenuLink href="/support">Support</NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem value="about">
          <NavigationMenuLink href="/about">About</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem value="contact">
          <NavigationMenuLink href="/contact">Contact</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const WithActiveLink: Story = {
  name: "Active Link",
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem value="home">
          <NavigationMenuLink href="/">Home</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem value="products">
          <NavigationMenuLink href="/products" active>
            Products
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem value="about">
          <NavigationMenuLink href="/about">About</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const SiteHeader: Story = {
  name: "Pattern: Site Header",
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.75rem 1.5rem",
        borderBottom: "1px solid var(--nuka-border-base)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        <Text weight="bold" size="lg">
          Acme Inc
        </Text>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem value="features">
              <NavigationMenuTrigger>Features</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0.5rem",
                    minWidth: 320,
                  }}
                >
                  <NavigationMenuLink href="/features/analytics">
                    Analytics
                  </NavigationMenuLink>
                  <NavigationMenuLink href="/features/automation">
                    Automation
                  </NavigationMenuLink>
                  <NavigationMenuLink href="/features/reporting">
                    Reporting
                  </NavigationMenuLink>
                  <NavigationMenuLink href="/features/api">
                    API Access
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem value="pricing">
              <NavigationMenuLink href="/pricing">Pricing</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem value="docs">
              <NavigationMenuLink href="/docs">Docs</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  ),
};
