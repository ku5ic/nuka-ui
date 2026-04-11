import { cva, type VariantProps } from "@nuka/utils/variants";

export const headingVariants = cva(
  ["font-[number:var(--font-weight-bold)]", "text-(--nuka-text-base)"],
  {
    variants: {
      size: {
        xl: "text-[length:var(--font-size-xl)] leading-(--line-height-snug)",
        "2xl":
          "text-[length:var(--font-size-2xl)] leading-(--line-height-snug)",
        "3xl":
          "text-[length:var(--font-size-3xl)] leading-(--line-height-snug)",
        "4xl":
          "text-[length:var(--font-size-4xl)] leading-(--line-height-tight)",
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
      truncate: {
        true: "truncate",
        false: "",
      },
    },
    defaultVariants: {
      // Default size is 3xl: matches the default element (h2) typographic convention.
      // The two are intentionally decoupled: size controls visuals, as controls semantics.
      size: "3xl",
      weight: "bold",
      color: "base",
      truncate: false,
    },
  },
);

export type HeadingVariantProps = VariantProps<typeof headingVariants>;
