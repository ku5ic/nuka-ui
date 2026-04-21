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
      family: {
        heading: "[font-family:var(--nuka-font-heading)]",
        body: "[font-family:var(--nuka-font-body)]",
        ui: "[font-family:var(--nuka-font-ui)]",
        code: "[font-family:var(--nuka-font-code)]",
      },
      // Kbd is a non-interactive inline presentation element (keyboard shortcut
      // rendering), not a pointer target. WCAG 2.5.8 does not apply.
      size: {
        // eslint-disable-next-line nuka/no-sub-touch-target-sizes
        sm: "min-h-5 px-(--space-1) text-[length:var(--font-size-xs)] leading-(--line-height-normal)",
        md: "min-h-6 px-(--space-2) text-[length:var(--font-size-sm)] leading-(--line-height-normal)",
        lg: "min-h-8 px-(--space-3) text-[length:var(--font-size-md)] leading-(--line-height-normal)",
      },
    },
    defaultVariants: {
      family: "code",
      size: "md",
    },
  },
);

export type KbdVariantProps = VariantProps<typeof kbdVariants>;
