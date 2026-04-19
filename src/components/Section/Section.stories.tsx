import type { Meta, StoryObj } from "@storybook/react";
import { Section } from "@nuka/components/Section";
import { Button } from "@nuka/components/Button";
import { Container } from "@nuka/components/Container";
import { Eyebrow } from "@nuka/components/Eyebrow";
import { Heading } from "@nuka/components/Heading";
import { Stack } from "@nuka/components/Stack";
import { Text } from "@nuka/components/Text";

const meta = {
  title: "Layout/Section",
  component: Section,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    as: {
      control: "select",
      options: [
        "section",
        "div",
        "article",
        "aside",
        "main",
        "header",
        "footer",
      ],
    },
    spacing: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl"],
    },
    background: {
      control: "select",
      options: ["base", "subtle", "muted", "emphasis"],
    },
    divider: {
      control: "boolean",
    },
    asChild: {
      control: false,
    },
  },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <Section>
        <Container>
          <Heading size="2xl">Default section</Heading>
          <Text color="muted" className="mt-(--space-2)">
            Medium spacing, no background, no divider.
          </Text>
        </Container>
      </Section>
    ),
  },
  parameters: {
    docs: {
      source: {
        code: `
<Section>
  <Container>
    <Heading size="2xl">Default section</Heading>
    <Text color="muted">Medium spacing, no background, no divider.</Text>
  </Container>
</Section>
        `.trim(),
      },
    },
  },
};

export const Backgrounds: Story = {
  render: () => (
    <Stack gap="none">
      <Section background="base">
        <Container>
          <Text weight="medium">base</Text>
        </Container>
      </Section>
      <Section background="subtle">
        <Container>
          <Text weight="medium">subtle</Text>
        </Container>
      </Section>
      <Section background="muted">
        <Container>
          <Text weight="medium">muted</Text>
        </Container>
      </Section>
      <Section background="emphasis">
        <Container>
          <Text weight="medium" color="inverse">
            emphasis (inverse text)
          </Text>
        </Container>
      </Section>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Section background="base">
  <Container><Text>base</Text></Container>
</Section>

<Section background="subtle">
  <Container><Text>subtle</Text></Container>
</Section>

<Section background="muted">
  <Container><Text>muted</Text></Container>
</Section>

<Section background="emphasis">
  <Container><Text color="inverse">emphasis (inverse text)</Text></Container>
</Section>
        `.trim(),
      },
    },
  },
};

export const Spacing: Story = {
  render: () => (
    <Stack gap="none">
      {(["none", "sm", "md", "lg", "xl"] as const).map((s) => (
        <Section key={s} spacing={s} background="subtle" divider>
          <Container>
            <Text size="sm" color="muted">
              spacing=&quot;{s}&quot;
            </Text>
          </Container>
        </Section>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Section spacing="none">
  <Container><Text>spacing="none"</Text></Container>
</Section>

<Section spacing="sm">
  <Container><Text>spacing="sm"</Text></Container>
</Section>

<Section spacing="md">
  <Container><Text>spacing="md"</Text></Container>
</Section>

<Section spacing="lg">
  <Container><Text>spacing="lg"</Text></Container>
</Section>

<Section spacing="xl">
  <Container><Text>spacing="xl"</Text></Container>
</Section>
        `.trim(),
      },
    },
  },
};

export const WithDivider: Story = {
  name: "With Divider",
  render: () => (
    <Stack gap="none">
      <Section divider>
        <Container>
          <Text>First section with top border</Text>
        </Container>
      </Section>
      <Section divider>
        <Container>
          <Text>Second section with top border</Text>
        </Container>
      </Section>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Section divider>
  <Container><Text>First section with top border</Text></Container>
</Section>

<Section divider>
  <Container><Text>Second section with top border</Text></Container>
</Section>
        `.trim(),
      },
    },
  },
};

export const WithLandmark: Story = {
  name: "Pattern: Landmark Section",
  render: () => (
    <Section as="main" spacing="lg">
      <Container>
        <Stack gap="sm">
          <Heading as="h1" size={{ base: "2xl", md: "4xl" }}>
            Main content area
          </Heading>
          <Text color="muted" size="lg">
            Using as=&quot;main&quot; for the primary landmark.
          </Text>
        </Stack>
      </Container>
    </Section>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Section as="main" spacing="lg">
  <Container>
    <Heading as="h1" size={{ base: "2xl", md: "4xl" }}>
      Main content area
    </Heading>
    <Text color="muted" size="lg">
      Using as="main" for the primary landmark.
    </Text>
  </Container>
</Section>
        `.trim(),
      },
    },
  },
};

export const PageLayout: Story = {
  name: "Pattern: Page Layout",
  render: () => (
    <Stack gap="none">
      <Section background="emphasis" spacing="xl">
        <Container>
          <Stack gap="sm" className="max-w-2xl">
            <Eyebrow color="accent">New Release</Eyebrow>
            <Heading as="h1" size={{ base: "2xl", md: "4xl" }} color="inverse">
              Ship faster with nuka-ui
            </Heading>
            <Text color="inverse" size="lg">
              A composable component library built on Tailwind v4 with
              responsive props and semantic tokens.
            </Text>
          </Stack>
        </Container>
      </Section>
      <Section background="subtle" divider>
        <Container>
          <Heading size="2xl">Features</Heading>
          <Text color="muted" className="mt-(--space-2)">
            Everything you need to build production interfaces.
          </Text>
        </Container>
      </Section>
      <Section divider>
        <Container>
          <Heading size="2xl">Get started</Heading>
          <Text color="muted" className="mt-(--space-2)">
            Install the package and import your first component.
          </Text>
        </Container>
      </Section>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Section background="emphasis" spacing="xl">
  <Container>
    <Eyebrow color="accent">New Release</Eyebrow>
    <Heading as="h1" size={{ base: "2xl", md: "4xl" }} color="inverse">
      Ship faster with nuka-ui
    </Heading>
    <Text color="inverse" size="lg">
      A composable component library built on Tailwind v4.
    </Text>
  </Container>
</Section>
<Section background="subtle" divider>
  <Container>
    <Heading size="2xl">Features</Heading>
    <Text color="muted">Content goes here.</Text>
  </Container>
</Section>
<Section divider>
  <Container>
    <Heading size="2xl">Get started</Heading>
    <Text color="muted">Content goes here.</Text>
  </Container>
</Section>
        `.trim(),
      },
    },
  },
};

export const EmphasisWithFocusableContent: Story = {
  name: "Emphasis with focusable content",
  render: () => (
    <Section background="emphasis" spacing="lg">
      <Container>
        <Stack gap="md" align="start">
          <Heading size="2xl" color="inverse">
            Ship faster with nuka-ui
          </Heading>
          <Text color="inverse">
            Tab into the button. The focus ring adapts to the inverse surface
            via the data-surface attribute emitted by
            background=&quot;emphasis&quot;.
          </Text>
          <Button variant="primary">Get started</Button>
        </Stack>
      </Container>
    </Section>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Section background="emphasis" spacing="lg">
  <Container>
    <Heading size="2xl" color="inverse">Ship faster with nuka-ui</Heading>
    <Text color="inverse">Tab into the button.</Text>
    <Button variant="primary">Get started</Button>
  </Container>
</Section>
        `.trim(),
      },
    },
  },
};
