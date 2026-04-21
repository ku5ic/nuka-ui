import { cva, type VariantProps } from "@nuka/utils/variants";

// Icon is a non-interactive visual glyph. It is not a pointer target; the
// WCAG 2.5.8 24x24 minimum does not apply.
export const iconVariants = cva(
  ["inline-flex", "items-center", "justify-center", "shrink-0"],
  {
    variants: {
      size: {
        // eslint-disable-next-line nuka/no-sub-touch-target-sizes
        sm: "size-4",
        md: "size-6",
        lg: "size-8",
        xl: "size-10",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export const iconColorVariants = cva([], {
  variants: {
    color: {
      inherit: "",
      base: "text-(--nuka-text-base)",
      muted: "text-(--nuka-text-muted)",
      subtle: "text-(--nuka-text-subtle)",
      inverse: "text-(--nuka-text-inverse)",
      disabled: "text-(--nuka-text-disabled)",
    },
  },
  defaultVariants: { color: "inherit" },
});

export type IconVariantProps = VariantProps<typeof iconVariants> &
  VariantProps<typeof iconColorVariants>;
