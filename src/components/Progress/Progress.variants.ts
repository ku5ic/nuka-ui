import { cva, type VariantProps } from "@nuka/utils/variants";

export const progressTrackVariants = cva(
  ["w-full overflow-hidden rounded-full bg-(--nuka-bg-muted)"],
  {
    variants: {
      size: {
        sm: "h-1.5",
        md: "h-2.5",
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
