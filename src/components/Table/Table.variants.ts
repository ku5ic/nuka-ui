import { cva, type VariantProps } from "@nuka/utils/variants";

export const tableVariants = cva(["overflow-x-auto"], {
  variants: {
    variant: {
      default: "",
      bordered: ["border border-(--nuka-border-base)", "rounded-(--radius-lg)"],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type TableVariantProps = VariantProps<typeof tableVariants>;
