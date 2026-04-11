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
      size: {
        sm: "h-6 w-10",
        md: "h-5 w-9",
        lg: "h-6 w-11",
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
        md: "size-4",
        lg: "size-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type SwitchVariantProps = VariantProps<typeof switchVariants>;
