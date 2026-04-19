import { cva, type VariantProps } from "@nuka/utils/variants";

export const switchVariants = cva(
  [
    "inline-flex items-center shrink-0",
    "rounded-full",
    "border-2 border-transparent",
    "transition-colors duration-150",
    "cursor-pointer",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    "focus-visible:outline-(--nuka-border-focus)",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  {
    variants: {
      // sm stays at WCAG 2.5.8 minimum (24x40); md and lg step up in height,
      // width, and thumb size so the ramp is visually distinct. All sizes pass
      // the 24x24 touch-target minimum.
      size: {
        sm: "h-6 w-10",
        md: "h-7 w-12",
        lg: "h-8 w-14",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const switchThumbVariants = cva(
  [
    "block rounded-full",
    "bg-(--nuka-text-inverse)",
    "transition-transform duration-150",
    "pointer-events-none",
  ],
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type SwitchVariantProps = VariantProps<typeof switchVariants>;
