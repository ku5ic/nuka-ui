import {
  cva,
  selectionIndicatorIntentVariants,
  type VariantProps,
} from "@nuka/utils/variants";

export const radioIndicatorVariants = cva(
  [
    "inline-flex items-center justify-center shrink-0",
    "rounded-full",
    "border",
    "bg-(--nuka-input-bg)",
    "text-(--nuka-text-inverse)",
    "transition-colors duration-150",
    "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2",
    "peer-focus-visible:outline-(--nuka-border-focus)",
    "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
    "peer-checked:*:block",
  ],
  {
    variants: {
      intent: {
        default: "",
        danger: "",
        success: "",
        warning: "",
      },
      // Indicator sits inside the label wrapper in Radio.tsx, which provides
      // the 24x24 touch target via min-h-6 min-w-6.
      size: {
        // eslint-disable-next-line nuka/no-sub-touch-target-sizes
        sm: "size-4",
        // eslint-disable-next-line nuka/no-sub-touch-target-sizes
        md: "size-5",
        lg: "size-6",
      },
    },
    compoundVariants: selectionIndicatorIntentVariants,
    defaultVariants: {
      intent: "default",
      size: "md",
    },
  },
);

export const radioVariants = radioIndicatorVariants;

export type RadioVariantProps = VariantProps<typeof radioIndicatorVariants>;
