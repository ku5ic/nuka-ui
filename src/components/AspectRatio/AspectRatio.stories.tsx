import type { Meta, StoryObj } from "@storybook/react";
import { AspectRatio } from "@nuka/components/AspectRatio";
import { Grid } from "@nuka/components/Grid";
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
      options: ["1/1", "16/9", "9/16", "4/3", "3/4", "21/9"],
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
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {(["16/9", "4/3", "1/1", "3/4", "9/16", "21/9"] as const).map((ratio) => (
        <div key={ratio} style={{ maxWidth: 320 }}>
          <div
            style={{
              marginBottom: "0.25rem",
              fontSize: "0.75rem",
              color: "var(--nuka-text-muted)",
            }}
          >
            ratio=&quot;{ratio}&quot;
          </div>
          <AspectRatio ratio={ratio}>
            <Fill label={ratio} />
          </AspectRatio>
        </div>
      ))}
    </div>
  ),
};

export const CustomRatio: Story = {
  name: "Custom Ratio (number)",
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <div
        style={{
          marginBottom: "0.25rem",
          fontSize: "0.75rem",
          color: "var(--nuka-text-muted)",
        }}
      >
        ratio={"{2.35}"} (cinescope)
      </div>
      <AspectRatio ratio={2.35}>
        <Fill label="2.35" />
      </AspectRatio>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: "<AspectRatio ratio={2.35}>...</AspectRatio>",
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

const labelStyle = {
  fontSize: "0.75rem",
  color: "var(--nuka-text-muted)",
  marginBottom: "0.5rem",
};

export const MismatchedRatios: Story = {
  name: "Mismatched Ratios",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <div style={labelStyle}>
          Portrait image (3/4) in landscape box (16/9)
        </div>
        <AspectRatio ratio="16/9" className="max-w-xl rounded-md">
          <img
            src={PORTRAIT_IMG}
            alt="Tall waterfall surrounded by green cliffs"
            className="object-cover w-full h-full"
          />
        </AspectRatio>
      </div>
      <div>
        <div style={labelStyle}>Landscape image (16/9) in square box (1/1)</div>
        <AspectRatio ratio="1/1" className="max-w-xs rounded-md">
          <img
            src={LANDSCAPE_IMG}
            alt="Snow-capped mountain range with forest valley"
            className="object-cover w-full h-full"
          />
        </AspectRatio>
      </div>
      <div>
        <div style={labelStyle}>
          Landscape image (16/9) in portrait box (9/16)
        </div>
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
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates object-cover behavior when the image intrinsic ratio does not match the box ratio. The image fills without distortion and clips to center in all cases. No special handling is required beyond object-cover w-full h-full on the img element.",
      },
      source: {
        code: `
{/* Portrait image in landscape box */}
<AspectRatio ratio="16/9" className="max-w-xl rounded-md">
  <img
    src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600&h=900&fit=crop"
    alt="Tall waterfall surrounded by green cliffs"
    className="object-cover w-full h-full"
  />
</AspectRatio>

{/* Landscape image in square box */}
<AspectRatio ratio="1/1" className="max-w-xs rounded-md">
  <img
    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&h=500&fit=crop"
    alt="Snow-capped mountain range with forest valley"
    className="object-cover w-full h-full"
  />
</AspectRatio>

{/* Landscape image in portrait box */}
<AspectRatio ratio="9/16" style={{ maxWidth: 200 }} className="rounded-md">
  <img
    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&h=500&fit=crop"
    alt="Snow-capped mountain range with forest valley"
    className="object-cover w-full h-full"
  />
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
