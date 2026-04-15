import { cva, type VariantProps } from "@nuka/utils/variants";

export const sectionVariants = cva([], {
  variants: {
    spacing: {
      none: "py-0",
      sm: "py-(--space-8) md:py-(--space-10)",
      md: "py-(--space-10) md:py-(--space-16)",
      lg: "py-(--space-16) md:py-(--space-24)",
      xl: "py-(--space-24) md:py-(--space-32)",
    },
    background: {
      base: "bg-(--nuka-bg-base)",
      subtle: "bg-(--nuka-bg-subtle)",
      muted: "bg-(--nuka-bg-muted)",
      emphasis: "bg-(--nuka-bg-emphasis) text-(--nuka-text-inverse)",
    },
    divider: {
      true: "border-t border-(--nuka-border-base)",
      false: "",
    },
  },
  defaultVariants: {
    spacing: "md",
    divider: false,
  },
});

export type SectionVariantProps = VariantProps<typeof sectionVariants>;
