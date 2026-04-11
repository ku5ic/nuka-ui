import {
  cva,
  intentCompoundVariants,
  type VariantProps,
} from "@nuka/utils/variants";

export const alertVariants = cva(
  ["flex items-start gap-(--space-3)", "rounded-(--radius-md)", "border"],
  {
    variants: {
      variant: {
        primary: ["border-transparent"],
        secondary: [],
        outline: ["bg-transparent"],
        ghost: ["bg-transparent", "border-transparent"],
      },
      intent: {
        default: "",
        danger: "",
        success: "",
        warning: "",
      },
      size: {
        sm: "px-(--space-3) py-(--space-2) text-xs",
        md: "px-(--space-4) py-(--space-3) text-sm",
        lg: "px-(--space-6) py-(--space-4) text-base",
      },
    },

    compoundVariants: intentCompoundVariants({
      secondaryDefault: [
        "bg-(--nuka-accent-bg-subtle)",
        "text-(--nuka-accent-text)",
        "border-(--nuka-accent-border)",
      ],
    }),

    defaultVariants: {
      variant: "secondary",
      intent: "default",
      size: "md",
    },
  },
);

export type AlertVariantProps = VariantProps<typeof alertVariants>;
