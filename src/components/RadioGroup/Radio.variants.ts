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
      size: {
        sm: "size-4",
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
