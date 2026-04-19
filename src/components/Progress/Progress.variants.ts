import { cva, type VariantProps } from "@nuka/utils/variants";

// Progress is a non-interactive status indicator (role="progressbar"), not a
// pointer target. The 24x24 WCAG 2.5.8 minimum does not apply.
export const progressTrackVariants = cva(
  ["w-full overflow-hidden rounded-full bg-(--nuka-bg-muted)"],
  {
    variants: {
      size: {
        // eslint-disable-next-line nuka/no-sub-touch-target-sizes
        sm: "h-1.5",
        // eslint-disable-next-line nuka/no-sub-touch-target-sizes
        md: "h-2.5",
        // eslint-disable-next-line nuka/no-sub-touch-target-sizes
        lg: "h-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const progressFillVariants = cva(
  ["h-full rounded-full transition-[width] duration-300"],
  {
    variants: {
      intent: {
        default: "",
        danger: "",
        success: "",
        warning: "",
      },
    },
    compoundVariants: [
      {
        intent: "default",
        className: "bg-(--nuka-accent-bg)",
      },
      {
        intent: "danger",
        className: "bg-(--nuka-danger-base)",
      },
      {
        intent: "success",
        className: "bg-(--nuka-success-base)",
      },
      {
        intent: "warning",
        className: "bg-(--nuka-warning-base)",
      },
    ],
    defaultVariants: {
      intent: "default",
    },
  },
);

export type ProgressTrackVariantProps = VariantProps<
  typeof progressTrackVariants
>;
export type ProgressFillVariantProps = VariantProps<
  typeof progressFillVariants
>;
export type ProgressVariantProps = ProgressTrackVariantProps &
  ProgressFillVariantProps;
