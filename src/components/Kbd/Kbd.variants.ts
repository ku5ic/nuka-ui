import { cva, type VariantProps } from "@nuka/utils/variants";

export const kbdVariants = cva(
  [
    "inline-flex items-center justify-center",
    "font-mono",
    "rounded-(--radius-sm)",
    "border border-(--nuka-border-base)",
    "bg-(--nuka-bg-subtle)",
    "text-(--nuka-text-base)",
  ],
  {
    variants: {
      size: {
        sm: "min-h-5 px-(--space-1) text-[length:var(--font-size-xs)] leading-(--line-height-normal)",
        md: "min-h-6 px-(--space-2) text-[length:var(--font-size-sm)] leading-(--line-height-normal)",
        lg: "min-h-8 px-(--space-3) text-[length:var(--font-size-md)] leading-(--line-height-normal)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type KbdVariantProps = VariantProps<typeof kbdVariants>;
