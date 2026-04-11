import { cva, type VariantProps } from "@nuka/utils/variants";

export const spinnerVariants = cva(
  ["inline-flex items-center justify-center", "shrink-0"],
  {
    variants: {
      size: {
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
