import { cva, type VariantProps } from "@nuka/utils/variants";

export const eyebrowVariants = cva(
  [
    "text-[length:var(--font-size-xs)]",
    "font-[number:var(--font-weight-semibold)]",
    "tracking-widest",
    "uppercase",
    "[font-family:var(--nuka-font-ui)]",
  ],
  {
    variants: {
      color: {
        base: "text-(--nuka-text-base)",
        muted: "text-(--nuka-text-muted)",
        accent: "text-(--nuka-accent-text)",
      },
    },
    defaultVariants: {
      color: "muted",
    },
  },
);

export type EyebrowVariantProps = VariantProps<typeof eyebrowVariants>;
