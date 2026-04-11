import { cva, type VariantProps } from "@nuka/utils/variants";

export const dividerVariants = cva([], {
  variants: {
    orientation: {
      horizontal: "w-full",
      vertical: "self-stretch",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  compoundVariants: [
    { orientation: "horizontal", size: "sm", className: "h-px" },
    { orientation: "horizontal", size: "md", className: "h-px" },
    { orientation: "horizontal", size: "lg", className: "h-0.5" },
    { orientation: "vertical", size: "sm", className: "w-px" },
    { orientation: "vertical", size: "md", className: "w-px" },
    { orientation: "vertical", size: "lg", className: "w-0.5" },
  ],
  defaultVariants: {
    orientation: "horizontal",
    size: "md",
  },
});

export type DividerVariantProps = VariantProps<typeof dividerVariants>;
