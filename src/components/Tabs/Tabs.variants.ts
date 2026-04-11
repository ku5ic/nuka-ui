import { cva, type VariantProps } from "@nuka/utils/variants";

export const tabsListVariants = cva(
  ["flex shrink-0", "focus-visible:outline-none"],
  {
    variants: {
      variant: {
        underline: ["border-b border-(--nuka-border-base)", "gap-(--space-4)"],
        pill: [
          "bg-(--nuka-bg-muted)",
          "rounded-(--radius-lg)",
          "p-(--space-1)",
          "gap-(--space-1)",
        ],
        boxed: [
          "border border-(--nuka-border-base)",
          "rounded-(--radius-lg)",
          "p-(--space-1)",
          "gap-(--space-1)",
        ],
      },
    },
    defaultVariants: {
      variant: "underline",
    },
  },
);

export type TabsListVariantProps = VariantProps<typeof tabsListVariants>;
