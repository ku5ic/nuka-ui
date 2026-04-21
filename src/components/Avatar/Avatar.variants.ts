import { cva, type VariantProps } from "@nuka/utils/variants";

export const avatarVariants = cva(
  [
    "relative inline-flex items-center justify-center",
    "shrink-0 overflow-hidden",
    "border border-(--nuka-border-base)",
    "bg-(--nuka-bg-muted)",
    "text-(--nuka-text-muted)",
    "font-[number:var(--font-weight-medium)]",
  ],
  {
    variants: {
      size: {
        xs: "size-6 text-[length:var(--font-size-xs)]",
        sm: "size-8 text-[length:var(--font-size-xs)]",
        md: "size-10 text-[length:var(--font-size-sm)]",
        lg: "size-12 text-[length:var(--font-size-md)]",
        xl: "size-16 text-[length:var(--font-size-lg)]",
      },
      shape: {
        circle: "rounded-(--radius-full)",
        square: "rounded-(--radius-md)",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
    },
  },
);

export type AvatarVariantProps = VariantProps<typeof avatarVariants>;
