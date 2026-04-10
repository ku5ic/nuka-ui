import type { Meta, StoryObj } from "@storybook/react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@nuka/components/NavigationMenu";
import { Stack } from "@nuka/components/Stack";
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
            <Stack gap="xs" className="min-w-[200px]">
              <NavigationMenuLink href="/products/analytics">
                Analytics
              </NavigationMenuLink>
              <NavigationMenuLink href="/products/security">
                Security
              </NavigationMenuLink>
              <NavigationMenuLink href="/products/integrations">
                Integrations
              </NavigationMenuLink>
            </Stack>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem value="resources">
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <Stack gap="xs" className="min-w-[200px]">
              <NavigationMenuLink href="/docs">
                Documentation
              </NavigationMenuLink>
              <NavigationMenuLink href="/blog">Blog</NavigationMenuLink>
              <NavigationMenuLink href="/support">Support</NavigationMenuLink>
            </Stack>
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
  parameters: {
    docs: {
      source: {
        code: `
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem value="products">
      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
      <NavigationMenuContent>
        <Stack gap="xs" className="min-w-[200px]">
          <NavigationMenuLink href="/products/analytics">Analytics</NavigationMenuLink>
          <NavigationMenuLink href="/products/security">Security</NavigationMenuLink>
          <NavigationMenuLink href="/products/integrations">Integrations</NavigationMenuLink>
        </Stack>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem value="resources">
      <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
      <NavigationMenuContent>
        <Stack gap="xs" className="min-w-[200px]">
          <NavigationMenuLink href="/docs">Documentation</NavigationMenuLink>
          <NavigationMenuLink href="/blog">Blog</NavigationMenuLink>
          <NavigationMenuLink href="/support">Support</NavigationMenuLink>
        </Stack>
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
        `.trim(),
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: `
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
        `.trim(),
      },
    },
  },
};

export const SiteHeader: Story = {
  name: "Pattern: Site Header",
  render: () => (
    <div className="flex items-center justify-between px-6 py-3 border-b border-(--nuka-border-base)">
      <div className="flex items-center gap-8">
        <Text weight="bold" size="lg">
          Acme Inc
        </Text>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem value="features">
              <NavigationMenuTrigger>Features</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid grid-cols-2 gap-2 min-w-[320px]">
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
  parameters: {
    docs: {
      source: {
        code: `
<div className="flex items-center justify-between px-6 py-3 border-b border-(--nuka-border-base)">
  <div className="flex items-center gap-8">
    <Text weight="bold" size="lg">Acme Inc</Text>
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem value="features">
          <NavigationMenuTrigger>Features</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid grid-cols-2 gap-2 min-w-[320px]">
              <NavigationMenuLink href="/features/analytics">Analytics</NavigationMenuLink>
              <NavigationMenuLink href="/features/automation">Automation</NavigationMenuLink>
              <NavigationMenuLink href="/features/reporting">Reporting</NavigationMenuLink>
              <NavigationMenuLink href="/features/api">API Access</NavigationMenuLink>
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
        `.trim(),
      },
    },
  },
};
