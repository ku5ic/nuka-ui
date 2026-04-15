import { cva, type VariantProps } from "@nuka/utils/variants";

export const headingVariants = cva(
  ["font-[number:var(--font-weight-bold)]", "text-(--nuka-text-base)"],
  {
    variants: {
      family: {
        heading: "[font-family:var(--nuka-font-heading)]",
        body: "[font-family:var(--nuka-font-body)]",
        ui: "[font-family:var(--nuka-font-ui)]",
        code: "[font-family:var(--nuka-font-code)]",
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
      family: "heading",
      weight: "bold",
      color: "base",
      truncate: false,
    },
  },
);

export type HeadingVariantProps = VariantProps<typeof headingVariants>;
