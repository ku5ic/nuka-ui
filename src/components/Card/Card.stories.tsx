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
  <Card {...args} className="w-[360px]">
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
  parameters: {
    docs: {
      source: {
        code: `
<Card variant="outlined">
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
        `.trim(),
      },
    },
  },
};

export const Elevated: Story = {
  args: {
    variant: "elevated",
  },
  render: CardTemplate,
  parameters: {
    docs: {
      source: {
        code: `
<Card variant="elevated">
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
        `.trim(),
      },
    },
  },
};

export const Filled: Story = {
  args: {
    variant: "filled",
  },
  render: CardTemplate,
  parameters: {
    docs: {
      source: {
        code: `
<Card variant="filled">
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
        `.trim(),
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <Stack direction="row" gap="xl" align="start">
      <Card variant="outlined" className="w-[280px]">
        <CardHeader>
          <CardTitle>Outlined</CardTitle>
          <CardDescription>Border style</CardDescription>
        </CardHeader>
        <CardBody>
          <Text>Content</Text>
        </CardBody>
      </Card>
      <Card variant="elevated" className="w-[280px]">
        <CardHeader>
          <CardTitle>Elevated</CardTitle>
          <CardDescription>Shadow style</CardDescription>
        </CardHeader>
        <CardBody>
          <Text>Content</Text>
        </CardBody>
      </Card>
      <Card variant="filled" className="w-[280px]">
        <CardHeader>
          <CardTitle>Filled</CardTitle>
          <CardDescription>Muted background</CardDescription>
        </CardHeader>
        <CardBody>
          <Text>Content</Text>
        </CardBody>
      </Card>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Stack direction="row" gap="xl" align="start">
  <Card variant="outlined">
    <CardHeader>
      <CardTitle>Outlined</CardTitle>
      <CardDescription>Border style</CardDescription>
    </CardHeader>
    <CardBody>
      <Text>Content</Text>
    </CardBody>
  </Card>
  <Card variant="elevated">
    <CardHeader>
      <CardTitle>Elevated</CardTitle>
      <CardDescription>Shadow style</CardDescription>
    </CardHeader>
    <CardBody>
      <Text>Content</Text>
    </CardBody>
  </Card>
  <Card variant="filled">
    <CardHeader>
      <CardTitle>Filled</CardTitle>
      <CardDescription>Muted background</CardDescription>
    </CardHeader>
    <CardBody>
      <Text>Content</Text>
    </CardBody>
  </Card>
</Stack>
        `.trim(),
      },
    },
  },
};

export const PaddingVariants: Story = {
  name: "CardBody padding",
  render: () => (
    <Stack direction="row" gap="xl" align="start">
      <Card variant="outlined" className="w-[220px]">
        <CardBody padding="none">
          <Text size="sm">padding=&quot;none&quot;</Text>
        </CardBody>
      </Card>
      <Card variant="outlined" className="w-[220px]">
        <CardBody padding="sm">
          <Text size="sm">padding=&quot;sm&quot;</Text>
        </CardBody>
      </Card>
      <Card variant="outlined" className="w-[220px]">
        <CardBody padding="md">
          <Text size="sm">padding=&quot;md&quot; (default)</Text>
        </CardBody>
      </Card>
      <Card variant="outlined" className="w-[220px]">
        <CardBody padding="lg">
          <Text size="sm">padding=&quot;lg&quot;</Text>
        </CardBody>
      </Card>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Card variant="outlined">
  <CardBody padding="none">...</CardBody>
</Card>
<Card variant="outlined">
  <CardBody padding="sm">...</CardBody>
</Card>
<Card variant="outlined">
  <CardBody padding="md">...</CardBody>
</Card>
<Card variant="outlined">
  <CardBody padding="lg">...</CardBody>
</Card>
        `.trim(),
      },
    },
  },
};

export const WithoutHeader: Story = {
  render: () => (
    <Card className="w-[360px]">
      <CardBody>
        <Text>A card with body content only, no header or footer.</Text>
      </CardBody>
    </Card>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Card>
  <CardBody>
    <Text>A card with body content only, no header or footer.</Text>
  </CardBody>
</Card>
        `.trim(),
      },
    },
  },
};

export const WithoutFooter: Story = {
  render: () => (
    <Card className="w-[360px]">
      <CardHeader>
        <CardTitle>No Footer</CardTitle>
        <CardDescription>This card has no footer section.</CardDescription>
      </CardHeader>
      <CardBody>
        <Text>Body content only.</Text>
      </CardBody>
    </Card>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Card>
  <CardHeader>
    <CardTitle>No Footer</CardTitle>
    <CardDescription>This card has no footer section.</CardDescription>
  </CardHeader>
  <CardBody>
    <Text>Body content only.</Text>
  </CardBody>
</Card>
        `.trim(),
      },
    },
  },
};

export const AsChild: Story = {
  name: "asChild",
  render: () => (
    <Card asChild variant="outlined">
      <article className="w-[360px]">
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
  parameters: {
    docs: {
      source: {
        code: `
<Card asChild variant="outlined">
  <article>
    <CardHeader>
      <CardTitle>Article Card</CardTitle>
      <CardDescription>Rendered as an article element via asChild.</CardDescription>
    </CardHeader>
    <CardBody>
      <Text>Semantic HTML when you need it.</Text>
    </CardBody>
  </article>
</Card>
        `.trim(),
      },
    },
  },
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
