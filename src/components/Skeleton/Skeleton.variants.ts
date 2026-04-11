import { cva } from "@nuka/utils/variants";

export const skeletonVariants = cva(["animate-pulse bg-(--nuka-bg-muted)"], {
  variants: {
    shape: {
      rect: "rounded-(--radius-md)",
      circle: "rounded-full aspect-square",
      text: "rounded-(--radius-sm) h-[1em]",
    },
  },
  defaultVariants: {
    shape: "rect",
  },
});
