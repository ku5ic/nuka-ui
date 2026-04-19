import { cva, type VariantProps } from "@nuka/utils/variants";

// Spinner is a non-interactive loading indicator, not a touch target. Size
// classes here set the visual glyph dimensions; the 24x24 WCAG minimum does
// not apply.
export const spinnerVariants = cva(
  ["inline-flex items-center justify-center", "shrink-0"],
  {
    variants: {
      size: {
        // eslint-disable-next-line nuka/no-sub-touch-target-sizes
        sm: "size-4",
        md: "size-6",
        lg: "size-8",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const spinnerColorVariants = cva([], {
  variants: {
    color: {
      default: "stroke-(--nuka-accent-bg)",
      muted: "stroke-(--nuka-text-muted)",
      inverse: "stroke-(--nuka-text-inverse)",
    },
  },
  defaultVariants: {
    color: "default",
  },
});

export type SpinnerVariantProps = VariantProps<typeof spinnerVariants> &
  VariantProps<typeof spinnerColorVariants>;
