import type { Meta, StoryObj } from "@storybook/react";
import { Heading } from "@nuka/components/Heading";
import { Text } from "@nuka/components/Text";
import { Stack } from "@nuka/components/Stack";

const meta = {
  title: "Typography/Heading",
  component: Heading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
    },
    size: {
      control: "select",
      options: ["xl", "2xl", "3xl", "4xl"],
    },
    weight: {
      control: "select",
      options: [
        "thin",
        "extralight",
        "light",
        "regular",
        "medium",
        "semibold",
        "bold",
        "extrabold",
        "black",
      ],
    },
    color: {
      control: "select",
      options: [
        "base",
        "muted",
        "subtle",
        "inverse",
        "disabled",
        "accent",
        "danger",
        "success",
        "warning",
      ],
    },
    truncate: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Default Heading",
  },
};

export const AllLevels: Story = {
  name: "All Levels (h1-h6)",
  parameters: {
    docs: {
      source: {
        code: `
<Stack gap="md">
  <Heading as="h1" size="4xl">
    h1: Page title (4xl)
  </Heading>
  <Heading as="h2" size="3xl">
    h2: Section heading (3xl)
  </Heading>
  <Heading as="h3" size="2xl">
    h3: Subsection heading (2xl)
  </Heading>
  <Heading as="h4" size="xl">
    h4: Group heading (xl)
  </Heading>
  <Heading as="h5" size="xl" weight="semibold">
    h5: Detail heading (xl, semibold)
  </Heading>
  <Heading as="h6" size="xl" weight="medium">
    h6: Fine heading (xl, medium)
  </Heading>
  <div className="mt-(--space-2) pt-(--space-3) border-t border-(--nuka-border-base)">
    <Text size="xl" weight="bold">
      Text size="xl" weight="bold": for comparison
    </Text>
    <Text size="xl" className="mt-(--space-1)">
      Text size="xl": body text at same font size
    </Text>
  </div>
</Stack>
        `.trim(),
      },
    },
  },
  render: () => (
    <Stack gap="md">
      <Heading as="h1" size="4xl">
        h1: Page title (4xl)
      </Heading>
      <Heading as="h2" size="3xl">
        h2: Section heading (3xl)
      </Heading>
      <Heading as="h3" size="2xl">
        h3: Subsection heading (2xl)
      </Heading>
      <Heading as="h4" size="xl">
        h4: Group heading (xl)
      </Heading>
      <Heading as="h5" size="xl" weight="semibold">
        h5: Detail heading (xl, semibold)
      </Heading>
      <Heading as="h6" size="xl" weight="medium">
        h6: Fine heading (xl, medium)
      </Heading>
      <div className="mt-(--space-2) pt-(--space-3) border-t border-(--nuka-border-base)">
        <Text size="xl" weight="bold">
          Text size=&quot;xl&quot; weight=&quot;bold&quot;: for comparison
        </Text>
        <Text size="xl" className="mt-(--space-1)">
          Text size=&quot;xl&quot;: body text at same font size
        </Text>
      </div>
    </Stack>
  ),
};

export const AllSizes: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Stack gap="md">
  <Heading as="h3" size="xl">
    xl: 1.25rem
  </Heading>
  <Heading as="h3" size="2xl">
    2xl: 1.5rem
  </Heading>
  <Heading as="h3" size="3xl">
    3xl: 1.875rem (default)
  </Heading>
  <Heading as="h3" size="4xl">
    4xl: 2.25rem
  </Heading>
</Stack>
        `.trim(),
      },
    },
  },
  render: () => (
    <Stack gap="md">
      <Heading as="h3" size="xl">
        xl: 1.25rem
      </Heading>
      <Heading as="h3" size="2xl">
        2xl: 1.5rem
      </Heading>
      <Heading as="h3" size="3xl">
        3xl: 1.875rem (default)
      </Heading>
      <Heading as="h3" size="4xl">
        4xl: 2.25rem
      </Heading>
    </Stack>
  ),
};

export const AllWeights: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Heading exposes the full nine-value weight scale per the typography contract. **Rendering requires a font that supports the requested weight.** The default heading family resolves to the system serif stack (ui-serif / New York / Georgia / Cambria), which ships with only 4-5 hinted weights; thin, extralight, light, and extrabold may render identically or be synthesized. To demonstrate the full scale visibly, this story uses family=\"body\" which resolves to the system sans stack (SF Pro / Segoe UI / etc.) and typically carries all 9 weights. See docs/TYPOGRAPHY.md for the rendering caveat.",
      },
      source: {
        code: `
<Stack className="gap-3">
  <Heading family="body" weight="thin">Thin (100)</Heading>
  <Heading family="body" weight="extralight">Extralight (200)</Heading>
  <Heading family="body" weight="light">Light (300)</Heading>
  <Heading family="body" weight="regular">Regular (400)</Heading>
  <Heading family="body" weight="medium">Medium (500)</Heading>
  <Heading family="body" weight="semibold">Semibold (600)</Heading>
  <Heading family="body" weight="bold">Bold (700): default</Heading>
  <Heading family="body" weight="extrabold">Extrabold (800)</Heading>
  <Heading family="body" weight="black">Black (900)</Heading>
</Stack>
        `.trim(),
      },
    },
  },
  render: () => (
    <Stack className="gap-3">
      <Heading family="body" weight="thin">
        Thin (100)
      </Heading>
      <Heading family="body" weight="extralight">
        Extralight (200)
      </Heading>
      <Heading family="body" weight="light">
        Light (300)
      </Heading>
      <Heading family="body" weight="regular">
        Regular (400)
      </Heading>
      <Heading family="body" weight="medium">
        Medium (500)
      </Heading>
      <Heading family="body" weight="semibold">
        Semibold (600)
      </Heading>
      <Heading family="body" weight="bold">
        Bold (700): default
      </Heading>
      <Heading family="body" weight="extrabold">
        Extrabold (800)
      </Heading>
      <Heading family="body" weight="black">
        Black (900)
      </Heading>
    </Stack>
  ),
};

export const AllWeightsDefaultFamily: Story = {
  name: "All Weights (default serif family)",
  parameters: {
    docs: {
      description: {
        story:
          "The same nine-value weight scale rendered with the **default** Heading family (serif). System serif fonts typically ship with fewer hinted weights, so several of these will look identical or near-identical. This is documented behavior, not a bug: the CSS output is correct (each Heading emits a distinct `font-[number:var(--font-weight-<name>)]` class); the visible result depends on the loaded font supporting that weight.",
      },
      source: {
        code: `
<Stack className="gap-3">
  <Heading weight="thin">Thin (100)</Heading>
  <Heading weight="extralight">Extralight (200)</Heading>
  <Heading weight="light">Light (300)</Heading>
  <Heading weight="regular">Regular (400)</Heading>
  <Heading weight="medium">Medium (500)</Heading>
  <Heading weight="semibold">Semibold (600)</Heading>
  <Heading weight="bold">Bold (700): default</Heading>
  <Heading weight="extrabold">Extrabold (800)</Heading>
  <Heading weight="black">Black (900)</Heading>
</Stack>
        `.trim(),
      },
    },
  },
  render: () => (
    <Stack className="gap-3">
      <Heading weight="thin">Thin (100)</Heading>
      <Heading weight="extralight">Extralight (200)</Heading>
      <Heading weight="light">Light (300)</Heading>
      <Heading weight="regular">Regular (400)</Heading>
      <Heading weight="medium">Medium (500)</Heading>
      <Heading weight="semibold">Semibold (600)</Heading>
      <Heading weight="bold">Bold (700): default</Heading>
      <Heading weight="extrabold">Extrabold (800)</Heading>
      <Heading weight="black">Black (900)</Heading>
    </Stack>
  ),
};

export const AllColors: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Stack className="gap-3">
  <Heading size="2xl" color="base">
    base: Default heading color
  </Heading>
  <Heading size="2xl" color="muted">
    muted: Secondary heading
  </Heading>
  <Heading size="2xl" color="subtle">
    subtle: Tertiary heading
  </Heading>
  <div className="p-(--space-3) bg-(--nuka-bg-emphasis) rounded-(--radius-md)">
    <Heading size="2xl" color="inverse">
      inverse: On dark background
    </Heading>
  </div>
  <Heading size="2xl" color="disabled">
    disabled: Disabled state
  </Heading>
  <Heading size="2xl" color="accent">
    accent: Accent color
  </Heading>
  <div className="mt-(--space-2) p-(--space-4) bg-(--nuka-danger-bg) border-l-3 border-(--nuka-danger-border) rounded-(--radius-md)">
    <Heading as="h3" size="xl" color="danger">
      Something went wrong
    </Heading>
    <Text color="danger" size="sm" className="mt-(--space-1)">
      The import failed. Check the file format and try again.
    </Text>
  </div>
  <div className="p-(--space-4) bg-(--nuka-success-bg) border-l-3 border-(--nuka-success-border) rounded-(--radius-md)">
    <Heading as="h3" size="xl" color="success">
      Deployment complete
    </Heading>
    <Text color="success" size="sm" className="mt-(--space-1)">
      All services are running on the latest version.
    </Text>
  </div>
  <div className="p-(--space-4) bg-(--nuka-warning-bg) border-l-3 border-(--nuka-warning-border) rounded-(--radius-md)">
    <Heading as="h3" size="xl" color="warning">
      API rate limit approaching
    </Heading>
    <Text color="warning" size="sm" className="mt-(--space-1)">
      You have used 85% of your monthly quota.
    </Text>
  </div>
</Stack>
        `.trim(),
      },
    },
  },
  render: () => (
    <Stack className="gap-3">
      <Heading size="2xl" color="base">
        base: Default heading color
      </Heading>
      <Heading size="2xl" color="muted">
        muted: Secondary heading
      </Heading>
      <Heading size="2xl" color="subtle">
        subtle: Tertiary heading
      </Heading>
      <div className="p-(--space-3) bg-(--nuka-bg-emphasis) rounded-(--radius-md)">
        <Heading size="2xl" color="inverse">
          inverse: On dark background
        </Heading>
      </div>
      <Heading size="2xl" color="disabled">
        disabled: Disabled state
      </Heading>
      <Heading size="2xl" color="accent">
        accent: Accent color
      </Heading>

      {/* Feedback colors with realistic context */}
      <div className="mt-(--space-2) p-(--space-4) bg-(--nuka-danger-bg) border-l-3 border-(--nuka-danger-border) rounded-(--radius-md)">
        <Heading as="h3" size="xl" color="danger">
          Something went wrong
        </Heading>
        <Text color="danger" size="sm" className="mt-(--space-1)">
          The import failed. Check the file format and try again.
        </Text>
      </div>
      <div className="p-(--space-4) bg-(--nuka-success-bg) border-l-3 border-(--nuka-success-border) rounded-(--radius-md)">
        <Heading as="h3" size="xl" color="success">
          Deployment complete
        </Heading>
        <Text color="success" size="sm" className="mt-(--space-1)">
          All services are running on the latest version.
        </Text>
      </div>
      <div className="p-(--space-4) bg-(--nuka-warning-bg) border-l-3 border-(--nuka-warning-border) rounded-(--radius-md)">
        <Heading as="h3" size="xl" color="warning">
          API rate limit approaching
        </Heading>
        <Text color="warning" size="sm" className="mt-(--space-1)">
          You have used 85% of your monthly quota.
        </Text>
      </div>
    </Stack>
  ),
};

export const TruncateStory: Story = {
  name: "Truncate",
  parameters: {
    docs: {
      source: {
        code: `
<div className="w-64">
  <Heading truncate>
    This is a very long heading that should be truncated with an ellipsis
  </Heading>
</div>
        `.trim(),
      },
    },
  },
  render: () => (
    <div className="w-64">
      <Heading truncate>
        This is a very long heading that should be truncated with an ellipsis
      </Heading>
    </div>
  ),
};

export const PageHeader: Story = {
  name: "Pattern: Page Header",
  parameters: {
    docs: {
      source: {
        code: `
<Stack gap="xl" className="max-w-xl">
  <div>
    <Heading as="h1" size="4xl">
      Dashboard
    </Heading>
    <Text color="muted" className="mt-(--space-1)">
      Overview of your project metrics and recent activity.
    </Text>
  </div>

  <div>
    <Heading as="h2">Recent Activity</Heading>
    <Text className="mt-(--space-2)">
      Your team pushed 12 commits across 3 repositories this week. Two pull
      requests are awaiting review.
    </Text>
  </div>

  <div>
    <Heading as="h3" size="2xl">
      Open Issues
    </Heading>
    <Text className="mt-(--space-2)">
      There are 7 open issues, 3 of which are marked as high priority.
    </Text>
  </div>

  <div>
    <Heading as="h4" size="xl" weight="semibold">
      Deployment Status
    </Heading>
    <Text size="sm" color="muted" className="mt-(--space-1)">
      Last deployed 2 hours ago. All health checks passing.
    </Text>
  </div>
</Stack>
        `.trim(),
      },
    },
  },
  render: () => (
    <Stack gap="xl" className="max-w-xl">
      {/* Page title: h1 at largest size */}
      <div>
        <Heading as="h1" size="4xl">
          Dashboard
        </Heading>
        <Text color="muted" className="mt-(--space-1)">
          Overview of your project metrics and recent activity.
        </Text>
      </div>

      {/* Section: h2 at default size */}
      <div>
        <Heading as="h2">Recent Activity</Heading>
        <Text className="mt-(--space-2)">
          Your team pushed 12 commits across 3 repositories this week. Two pull
          requests are awaiting review.
        </Text>
      </div>

      {/* Subsection: h3 at smaller size, independent of level */}
      <div>
        <Heading as="h3" size="2xl">
          Open Issues
        </Heading>
        <Text className="mt-(--space-2)">
          There are 7 open issues, 3 of which are marked as high priority.
        </Text>
      </div>

      {/* Group heading: h4 at smallest heading size, lighter weight */}
      <div>
        <Heading as="h4" size="xl" weight="semibold">
          Deployment Status
        </Heading>
        <Text size="sm" color="muted" className="mt-(--space-1)">
          Last deployed 2 hours ago. All health checks passing.
        </Text>
      </div>
    </Stack>
  ),
};

export const ResponsiveSize: Story = {
  name: "Responsive Size",
  render: () => (
    <Stack gap="md">
      <Heading size={{ base: "xl", md: "3xl", xl: "4xl" }}>
        Scales across breakpoints
      </Heading>
      <Text color="muted">
        This heading is xl on mobile, 3xl at md, and 4xl at xl.
      </Text>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Heading size={{ base: "xl", md: "3xl", xl: "4xl" }}>
  Scales across breakpoints
</Heading>
        `.trim(),
      },
    },
  },
};

export const FontFamily: Story = {
  name: "Font Family",
  render: () => (
    <Stack gap="md">
      <Heading size="2xl" family="heading">
        Serif heading (default token)
      </Heading>
      <Heading size="2xl" family="body">
        Sans heading
      </Heading>
      <Heading size="2xl" family="code">
        Mono heading
      </Heading>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Heading family="heading">Serif heading (default token)</Heading>
<Heading family="body">Sans heading</Heading>
<Heading family="code">Mono heading</Heading>
        `.trim(),
      },
    },
  },
};
