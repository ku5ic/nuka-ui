import {
  cva,
  intentCompoundVariants,
  type VariantProps,
} from "@nuka/utils/variants";

export const tagVariants = cva(
  [
    "inline-flex items-center",
    "font-medium leading-none whitespace-nowrap",
    "rounded-(--radius-md)",
    "border",
  ],
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
        sm: "gap-(--space-1) px-(--space-2) py-(--space-1) text-xs",
        md: "gap-(--space-1) px-(--space-3) py-(--space-1) text-xs",
        lg: "gap-(--space-2) px-(--space-3) py-(--space-2) text-sm",
      },
    },

    compoundVariants: intentCompoundVariants(),

    defaultVariants: {
      variant: "secondary",
      intent: "default",
      size: "md",
    },
  },
);

export type TagVariantProps = VariantProps<typeof tagVariants>;
