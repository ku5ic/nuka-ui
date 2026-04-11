import { cva, type VariantProps } from "@nuka/utils/variants";

export const bannerVariants = cva(
  [
    "w-full flex items-start gap-(--space-3)",
    "border-l-4",
    "px-(--space-4) py-(--space-3)",
    "text-sm",
  ],
  {
    variants: {
      intent: {
        default:
          "bg-(--nuka-accent-bg-subtle) border-(--nuka-accent-bg) text-(--nuka-text-base)",
        success:
          "bg-(--nuka-success-bg) border-(--nuka-success-base) text-(--nuka-success-text)",
        danger:
          "bg-(--nuka-danger-bg) border-(--nuka-danger-base) text-(--nuka-danger-text)",
        warning:
          "bg-(--nuka-warning-bg) border-(--nuka-warning-base) text-(--nuka-warning-text)",
      },
    },
    defaultVariants: {
      intent: "default",
    },
  },
);

export type BannerVariantProps = VariantProps<typeof bannerVariants>;
