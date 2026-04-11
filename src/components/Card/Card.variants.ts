import { cva, type VariantProps } from "@nuka/utils/variants";

export const cardVariants = cva(
  ["rounded-(--radius-lg)", "text-(--nuka-text-base)"],
  {
    variants: {
      variant: {
        outlined: [
          "bg-(--nuka-bg-base)",
          "border",
          "border-(--nuka-border-base)",
        ],
        elevated: ["bg-(--nuka-bg-base)", "shadow-(--nuka-shadow-card)"],
        filled: ["bg-(--nuka-bg-muted)"],
      },
    },
    defaultVariants: {
      variant: "outlined",
    },
  },
);

export type CardVariantProps = VariantProps<typeof cardVariants>;
