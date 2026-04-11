import { cva, type VariantProps } from "@nuka/utils/variants";

export const timelineItemMarkerVariants = cva(
  [
    "flex items-center justify-center",
    "w-8 h-8 rounded-full",
    "border-2",
    "shrink-0 z-10",
    "bg-(--nuka-bg-base)",
  ],
  {
    variants: {
      intent: {
        default: "border-(--nuka-accent-bg) text-(--nuka-accent-text)",
        success: "border-(--nuka-success-base) text-(--nuka-success-text)",
        danger: "border-(--nuka-danger-base) text-(--nuka-danger-text)",
        warning: "border-(--nuka-warning-base) text-(--nuka-warning-text)",
      },
    },
    defaultVariants: {
      intent: "default",
    },
  },
);

export type TimelineItemMarkerVariantProps = VariantProps<
  typeof timelineItemMarkerVariants
>;
