import {
  cva,
  intentCompoundVariants,
  type VariantProps,
} from "@nuka/utils/variants";

export const calloutVariants = cva(
  ["flex flex-col gap-(--space-2)", "rounded-(--radius-md)", "border"],
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
        sm: "px-(--space-3) py-(--space-2) text-sm",
        md: "px-(--space-4) py-(--space-3) text-base",
        lg: "px-(--space-6) py-(--space-4) text-lg",
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

export type CalloutVariantProps = VariantProps<typeof calloutVariants>;
