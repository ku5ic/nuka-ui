import { cva, type VariantProps } from "@nuka/utils/variants";

export const eyebrowVariants = cva(
  [
    "text-[length:var(--font-size-xs)]",
    "tracking-widest",
    "uppercase",
    "[font-family:var(--nuka-font-ui)]",
  ],
  {
    variants: {
      weight: {
        thin: "font-[number:var(--font-weight-thin)]",
        extralight: "font-[number:var(--font-weight-extralight)]",
        light: "font-[number:var(--font-weight-light)]",
        regular: "font-[number:var(--font-weight-regular)]",
        medium: "font-[number:var(--font-weight-medium)]",
        semibold: "font-[number:var(--font-weight-semibold)]",
        bold: "font-[number:var(--font-weight-bold)]",
        extrabold: "font-[number:var(--font-weight-extrabold)]",
        black: "font-[number:var(--font-weight-black)]",
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
    },
    defaultVariants: {
      weight: "semibold",
      color: "muted",
    },
  },
);

export type EyebrowVariantProps = VariantProps<typeof eyebrowVariants>;
