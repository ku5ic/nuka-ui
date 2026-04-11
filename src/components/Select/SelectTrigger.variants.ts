import { cva, type VariantProps } from "@nuka/utils/variants";

export const selectTriggerVariants = cva(
  [
    "w-full",
    "inline-flex items-center justify-between",
    "rounded-(--radius-md)",
    "border",
    "bg-(--nuka-input-bg)",
    "text-(--nuka-text-base)",
    "text-left",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--nuka-border-focus)",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "transition-colors duration-150",
  ],
  {
    variants: {
      intent: {
        default:
          "border-(--nuka-input-border) hover:border-(--nuka-input-border-hover)",
        danger: "border-(--nuka-danger-border)",
        success: "border-(--nuka-success-border)",
        warning: "border-(--nuka-warning-border)",
      },
      size: {
        sm: "px-(--space-3) py-(--space-2) text-xs",
        md: "px-(--space-4) py-(--space-3) text-sm",
        lg: "px-(--space-6) py-(--space-4) text-base",
      },
    },
    defaultVariants: {
      intent: "default",
      size: "md",
    },
  },
);

export type SelectTriggerVariantProps = VariantProps<
  typeof selectTriggerVariants
>;
