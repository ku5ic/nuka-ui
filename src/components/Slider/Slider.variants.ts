import { cva, type VariantProps } from "@nuka/utils/variants";

export const sliderWrapperVariants = cva(["relative flex items-center w-full"], {
  variants: {
    size: {
      sm: "min-h-[24px]",
      md: "min-h-[24px]",
      lg: "min-h-[24px]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const sliderTrackVariants = cva(
  ["relative w-full rounded-full", "bg-(--nuka-border-base)"],
  {
    variants: {
      size: {
        sm: "h-1",
        md: "h-1.5",
        lg: "h-2",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const sliderFillVariants = cva(
  [
    "absolute left-0 top-0 h-full rounded-full",
    "transition-[width] duration-75",
  ],
  {
    variants: {
      intent: {
        default: "bg-(--nuka-accent-bg)",
        danger: "bg-(--nuka-danger-base)",
        success: "bg-(--nuka-success-base)",
        warning: "bg-(--nuka-warning-base)",
      },
    },
    defaultVariants: {
      intent: "default",
    },
  },
);

export const sliderThumbVariants = cva(
  [
    "absolute top-1/2 -translate-y-1/2",
    "rounded-full",
    "border-2 border-(--nuka-bg-base)",
    "shadow-sm",
    "transition-[left] duration-75",
    "pointer-events-none",
  ],
  {
    variants: {
      intent: {
        default: "bg-(--nuka-accent-bg)",
        danger: "bg-(--nuka-danger-base)",
        success: "bg-(--nuka-success-base)",
        warning: "bg-(--nuka-warning-base)",
      },
      size: {
        sm: "w-6 h-6",
        md: "w-[18px] h-[18px]",
        lg: "w-[22px] h-[22px]",
      },
    },
    defaultVariants: {
      intent: "default",
      size: "md",
    },
  },
);

export const sliderValueVariants = cva(
  ["tabular-nums text-(--nuka-text-muted)", "ml-(--space-3)", "select-none"],
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type SliderVariantProps = VariantProps<typeof sliderFillVariants> &
  VariantProps<typeof sliderThumbVariants>;
