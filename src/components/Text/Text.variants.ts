import { cva, type VariantProps } from "@nuka/utils/variants";

export const textVariants = cva([], {
  variants: {
    size: {
      xs: "text-[length:var(--font-size-xs)] leading-(--line-height-normal)",
      sm: "text-[length:var(--font-size-sm)] leading-(--line-height-normal)",
      md: "text-[length:var(--font-size-md)] leading-(--line-height-normal)",
      lg: "text-[length:var(--font-size-lg)] leading-(--line-height-snug)",
      xl: "text-[length:var(--font-size-xl)] leading-(--line-height-snug)",
    },
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
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    truncate: {
      true: "truncate",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
    weight: "regular",
    color: "base",
    align: "left",
    truncate: false,
  },
});

export type TextVariantProps = VariantProps<typeof textVariants>;
