import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
  CardFooter,
} from "@nuka/components/Card";
import { Button } from "@nuka/components/Button";
import { Text } from "@nuka/components/Text";
import { Stack } from "@nuka/components/Stack";

const meta = {
  title: "Navigation/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["outlined", "elevated", "filled"],
    },
    asChild: {
      control: false,
    },
  },
  args: {
    variant: "outlined",
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const CardTemplate = (args: React.ComponentProps<typeof Card>) => (
  <Card {...args} style={{ width: 360 }}>
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
      <CardDescription>Card description goes here.</CardDescription>
    </CardHeader>
    <CardBody>
      <Text>Card body content goes here.</Text>
    </CardBody>
    <CardFooter>
      <Button variant="ghost">Cancel</Button>
      <Button>Save</Button>
    </CardFooter>
  </Card>
);

export const Outlined: Story = {
  args: {
    variant: "outlined",
  },
  render: CardTemplate,
};

export const Elevated: Story = {
  args: {
    variant: "elevated",
  },
  render: CardTemplate,
};

export const Filled: Story = {
  args: {
    variant: "filled",
  },
  render: CardTemplate,
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
      <Card variant="outlined" style={{ width: 280 }}>
        <CardHeader>
          <CardTitle>Outlined</CardTitle>
          <CardDescription>Border style</CardDescription>
        </CardHeader>
        <CardBody>
          <Text>Content</Text>
        </CardBody>
      </Card>
      <Card variant="elevated" style={{ width: 280 }}>
        <CardHeader>
          <CardTitle>Elevated</CardTitle>
          <CardDescription>Shadow style</CardDescription>
        </CardHeader>
        <CardBody>
          <Text>Content</Text>
        </CardBody>
      </Card>
      <Card variant="filled" style={{ width: 280 }}>
        <CardHeader>
          <CardTitle>Filled</CardTitle>
          <CardDescription>Muted background</CardDescription>
        </CardHeader>
        <CardBody>
          <Text>Content</Text>
        </CardBody>
      </Card>
    </div>
  ),
};

export const WithoutHeader: Story = {
  render: () => (
    <Card style={{ width: 360 }}>
      <CardBody>
        <Text>A card with body content only, no header or footer.</Text>
      </CardBody>
    </Card>
  ),
};

export const WithoutFooter: Story = {
  render: () => (
    <Card style={{ width: 360 }}>
      <CardHeader>
        <CardTitle>No Footer</CardTitle>
        <CardDescription>This card has no footer section.</CardDescription>
      </CardHeader>
      <CardBody>
        <Text>Body content only.</Text>
      </CardBody>
    </Card>
  ),
};

export const AsChild: Story = {
  name: "asChild",
  render: () => (
    <Card asChild variant="outlined">
      <article style={{ width: 360 }}>
        <CardHeader>
          <CardTitle>Article Card</CardTitle>
          <CardDescription>
            Rendered as an article element via asChild.
          </CardDescription>
        </CardHeader>
        <CardBody>
          <Text>Semantic HTML when you need it.</Text>
        </CardBody>
      </article>
    </Card>
  ),
};

export const ProductCard: Story = {
  name: "Pattern: Product Card",
  render: () => (
    <Card variant="outlined" style={{ width: 320 }}>
      <CardBody>
        <Stack direction="column" gap="md">
          <div
            style={{
              height: 160,
              borderRadius: "var(--radius-md)",
              background: "var(--nuka-bg-muted)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text color="subtle">Image placeholder</Text>
          </div>
          <Stack direction="column" gap="xs">
            <Text weight="semibold">Wireless Headphones</Text>
            <Text size="sm" color="muted">
              Premium noise-cancelling headphones with 30-hour battery life.
            </Text>
          </Stack>
          <Stack direction="row" justify="between" align="center">
            <Text weight="bold" size="lg">
              $299
            </Text>
            <Button size="sm">Add to Cart</Button>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Card variant="outlined">
  <CardBody>
    <Stack direction="column" gap="md">
      <img src="..." alt="Product" />
      <Stack direction="column" gap="xs">
        <Text weight="semibold">Wireless Headphones</Text>
        <Text size="sm" color="muted">Description...</Text>
      </Stack>
      <Stack direction="row" justify="between" align="center">
        <Text weight="bold" size="lg">$299</Text>
        <Button size="sm">Add to Cart</Button>
      </Stack>
    </Stack>
  </CardBody>
</Card>
        `.trim(),
      },
    },
  },
};
