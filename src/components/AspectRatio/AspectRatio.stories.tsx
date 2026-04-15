import type { Meta, StoryObj } from "@storybook/react";
import { AspectRatio } from "@nuka/components/AspectRatio";
import { Grid } from "@nuka/components/Grid";
import { Stack } from "@nuka/components/Stack";
import { Text } from "@nuka/components/Text";
import { Skeleton } from "@nuka/components/Skeleton";

const Fill = ({ label }: { label?: string }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      background: "var(--nuka-bg-muted)",
      border: "1px solid var(--nuka-border-base)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "0.875rem",
      color: "var(--nuka-text-muted)",
    }}
  >
    {label ?? null}
  </div>
);

const meta = {
  title: "Layout/AspectRatio",
  component: AspectRatio,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    ratio: {
      control: "select",
      options: ["1/1", "16/9", "9/16", "4/3", "3/2", "2/1"],
    },
    asChild: {
      control: false,
    },
  },
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ratio: "16/9",
    className: "max-w-xl",
    children: <Fill label="16/9" />,
  },
  parameters: {
    docs: {
      source: {
        code: `
<AspectRatio ratio="16/9" className="max-w-xl">
  <img src="..." alt="..." className="object-cover w-full h-full" />
</AspectRatio>
        `.trim(),
      },
    },
  },
};

export const NamedPresets: Story = {
  name: "Named Presets",
  render: () => (
    <Stack gap="lg" className="max-w-xs">
      {(["16/9", "4/3", "1/1", "3/2", "9/16", "2/1"] as const).map((ratio) => (
        <Stack key={ratio} gap="xs">
          <Text size="xs" color="muted">
            ratio=&quot;{ratio}&quot;
          </Text>
          <AspectRatio ratio={ratio}>
            <Fill label={ratio} />
          </AspectRatio>
        </Stack>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<AspectRatio ratio="16/9"><img ... /></AspectRatio>
<AspectRatio ratio="4/3"><img ... /></AspectRatio>
<AspectRatio ratio="1/1"><img ... /></AspectRatio>
<AspectRatio ratio="3/2"><img ... /></AspectRatio>
<AspectRatio ratio="9/16"><img ... /></AspectRatio>
<AspectRatio ratio="2/1"><img ... /></AspectRatio>
        `.trim(),
      },
    },
  },
};

export const ResponsiveRatio: Story = {
  name: "Responsive Ratio",
  render: () => (
    <div className="max-w-lg">
      <AspectRatio ratio={{ base: "1/1", md: "16/9" }}>
        <Fill label="1/1 -> 16/9 at md" />
      </AspectRatio>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<AspectRatio ratio={{ base: "1/1", md: "16/9" }}>
  <img src="..." alt="..." className="object-cover w-full h-full" />
</AspectRatio>
        `.trim(),
      },
    },
  },
};

export const WithImage: Story = {
  name: "With Image",
  render: () => (
    <AspectRatio ratio="16/9" className="max-w-xl rounded-md">
      <img
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
        alt="Mountain landscape"
        className="object-cover w-full h-full"
      />
    </AspectRatio>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<AspectRatio ratio="16/9" className="max-w-xl rounded-md">
  <img
    src="..."
    alt="Mountain landscape"
    className="object-cover w-full h-full"
  />
</AspectRatio>
        `.trim(),
      },
    },
  },
};

const PORTRAIT_IMG =
  "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600&h=900&fit=crop";
const LANDSCAPE_IMG =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&h=500&fit=crop";

export const MismatchedRatios: Story = {
  name: "Mismatched Ratios",
  render: () => (
    <Stack gap="lg">
      <Stack gap="xs">
        <Text size="xs" color="muted">
          Portrait image in landscape box (16/9)
        </Text>
        <AspectRatio ratio="16/9" className="max-w-xl rounded-md">
          <img
            src={PORTRAIT_IMG}
            alt="Tall waterfall surrounded by green cliffs"
            className="object-cover w-full h-full"
          />
        </AspectRatio>
      </Stack>
      <Stack gap="xs">
        <Text size="xs" color="muted">
          Landscape image (16/9) in square box (1/1)
        </Text>
        <AspectRatio ratio="1/1" className="max-w-xs rounded-md">
          <img
            src={LANDSCAPE_IMG}
            alt="Snow-capped mountain range with forest valley"
            className="object-cover w-full h-full"
          />
        </AspectRatio>
      </Stack>
      <Stack gap="xs">
        <Text size="xs" color="muted">
          Landscape image (16/9) in portrait box (9/16)
        </Text>
        <AspectRatio
          ratio="9/16"
          style={{ maxWidth: 200 }}
          className="rounded-md"
        >
          <img
            src={LANDSCAPE_IMG}
            alt="Snow-capped mountain range with forest valley"
            className="object-cover w-full h-full"
          />
        </AspectRatio>
      </Stack>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<AspectRatio ratio="16/9" className="max-w-xl rounded-md">
  <img src="..." alt="Portrait in landscape" className="object-cover w-full h-full" />
</AspectRatio>

<AspectRatio ratio="1/1" className="max-w-xs rounded-md">
  <img src="..." alt="Landscape in square" className="object-cover w-full h-full" />
</AspectRatio>

<AspectRatio ratio="9/16" style={{ maxWidth: 200 }} className="rounded-md">
  <img src="..." alt="Landscape in portrait" className="object-cover w-full h-full" />
</AspectRatio>
        `.trim(),
      },
    },
  },
};

export const MediaGrid: Story = {
  name: "Pattern: Media Grid",
  render: () => (
    <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap="md">
      {Array.from({ length: 6 }, (_, i) => (
        <AspectRatio key={i} ratio="16/9" className="rounded-md">
          <Skeleton className="w-full h-full" />
        </AspectRatio>
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Grid cols={{ base: 1, sm: 2, lg: 3 }} gap="md">
  <AspectRatio ratio="16/9" className="rounded-md">
    <img src="..." alt="..." className="object-cover w-full h-full" />
  </AspectRatio>
</Grid>
        `.trim(),
      },
    },
  },
};
