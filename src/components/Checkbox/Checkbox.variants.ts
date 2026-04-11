import {
  cva,
  selectionIndicatorIntentVariants,
  type VariantProps,
} from "@nuka/utils/variants";

export const checkboxWrapperVariants = cva(
  ["inline-flex items-center gap-(--space-2)", "cursor-pointer", "select-none"],
  {
    variants: {
      size: {
        sm: "min-h-6 min-w-6 text-xs",
        md: "min-h-6 min-w-6 text-sm",
        lg: "min-h-6 min-w-6 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const checkboxIndicatorVariants = cva(
  [
    "inline-flex items-center justify-center shrink-0",
    "rounded-(--radius-sm)",
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

export const checkboxVariants = checkboxIndicatorVariants;

export type CheckboxVariantProps = VariantProps<
  typeof checkboxIndicatorVariants
>;
