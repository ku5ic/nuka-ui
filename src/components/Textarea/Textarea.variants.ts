import { cva, type VariantProps } from "@nuka/utils/variants";
import { fieldBaseClasses } from "@nuka/utils/field-base";

export const textareaVariants = cva([...fieldBaseClasses, "resize-y"], {
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
});

export type TextareaVariantProps = VariantProps<typeof textareaVariants>;
