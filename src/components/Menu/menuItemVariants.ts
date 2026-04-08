import { cva } from "@nuka/utils/variants";
import type { VariantProps } from "@nuka/utils/variants";

const menuItemVariants = cva(
  [
    "flex w-full items-center gap-(--space-2)",
    "rounded-(--radius-sm) px-(--space-2) py-(--space-1.5)",
    "text-sm cursor-default select-none outline-none",
    "transition-colors",
  ],
  {
    variants: {
      intent: {
        default: "",
        danger: "",
      },
    },
    compoundVariants: [
      {
        intent: "default",
        className: [
          "text-(--nuka-text-base)",
          "focus:bg-(--nuka-bg-muted)",
        ],
      },
      {
        intent: "danger",
        className: [
          "text-(--nuka-danger-text)",
          "focus:bg-(--nuka-danger-bg)",
        ],
      },
    ],
    defaultVariants: {
      intent: "default",
    },
  },
);

type MenuItemVariantProps = VariantProps<typeof menuItemVariants>;

const menuCheckboxItemVariants = cva(
  [
    "flex w-full items-center gap-(--space-2)",
    "rounded-(--radius-sm) px-(--space-2) py-(--space-1.5)",
    "text-sm cursor-default select-none outline-none",
    "transition-colors",
    "text-(--nuka-text-base)",
    "focus:bg-(--nuka-bg-muted)",
  ],
);

const menuRadioItemVariants = cva(
  [
    "flex w-full items-center gap-(--space-2)",
    "rounded-(--radius-sm) px-(--space-2) py-(--space-1.5)",
    "text-sm cursor-default select-none outline-none",
    "transition-colors",
    "text-(--nuka-text-base)",
    "focus:bg-(--nuka-bg-muted)",
  ],
);

const menuSeparatorVariants = cva(
  [
    "h-px my-(--space-1) mx-(--space-2)",
    "bg-(--nuka-border-base)",
  ],
);

const menuLabelVariants = cva(
  [
    "px-(--space-2) py-(--space-1.5)",
    "text-xs font-semibold",
    "text-(--nuka-text-muted)",
    "select-none",
  ],
);

const menuContentVariants = cva(
  [
    "z-50 min-w-48 overflow-hidden",
    "rounded-(--radius-md) border border-(--nuka-border-base)",
    "bg-(--nuka-bg-base) shadow-md",
    "p-(--space-1)",
    "focus:outline-none",
  ],
);

export {
  menuItemVariants,
  menuCheckboxItemVariants,
  menuRadioItemVariants,
  menuSeparatorVariants,
  menuLabelVariants,
  menuContentVariants,
};
export type { MenuItemVariantProps };
