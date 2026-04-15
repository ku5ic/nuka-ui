import { cva, type VariantProps } from "@nuka/utils/variants";

export const textVariants = cva([], {
  variants: {
    weight: {
      regular: "font-[number:var(--font-weight-regular)]",
      medium: "font-[number:var(--font-weight-medium)]",
      semibold: "font-[number:var(--font-weight-semibold)]",
      bold: "font-[number:var(--font-weight-bold)]",
    },
    color: {
      base: "text-(--nuka-text-base)",
      muted: "text-(--nuka-text-muted)",
      subtle: "text-(--nuka-text-subtle)",
      inverse: "text-(--nuka-text-inverse)",
      disabled: "text-(--nuka-text-disabled)",
      accent: "text-(--nuka-accent-text)",
      danger: "text-(--nuka-danger-text)",
      success: "text-(--nuka-success-text)",
      warning: "text-(--nuka-warning-text)",
    },
    truncate: {
      true: "truncate",
      false: "",
    },
  },
  defaultVariants: {
    weight: "regular",
    color: "base",
    truncate: false,
  },
});

export type TextVariantProps = VariantProps<typeof textVariants>;
