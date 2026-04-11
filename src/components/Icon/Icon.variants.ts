import { cva, type VariantProps } from "@nuka/utils/variants";

export const iconVariants = cva(
  ["inline-flex", "items-center", "justify-center", "shrink-0"],
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-6",
        lg: "size-8",
        xl: "size-10",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export const iconColorVariants = cva([], {
  variants: {
    color: {
      inherit: "",
      base: "text-(--nuka-text-base)",
      muted: "text-(--nuka-text-muted)",
      subtle: "text-(--nuka-text-subtle)",
      inverse: "text-(--nuka-text-inverse)",
      disabled: "text-(--nuka-text-disabled)",
    },
  },
  defaultVariants: { color: "inherit" },
});

export type IconVariantProps = VariantProps<typeof iconVariants> &
  VariantProps<typeof iconColorVariants>;
