import { cva, type VariantProps } from "@nuka/utils/variants";

export const chipVariants = cva(
  [
    "inline-flex items-center",
    "font-medium leading-none whitespace-nowrap",
    "rounded-full",
    "border",
    "transition-colors duration-150",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    "focus-visible:outline-(--nuka-border-focus)",
    "disabled:pointer-events-none disabled:opacity-50",
    "cursor-pointer select-none",
  ],
  {
    variants: {
      variant: {
        solid: ["border-transparent"],
        subtle: [],
        outline: ["bg-transparent"],
      },
      intent: {
        default: "",
        danger: "",
        success: "",
        warning: "",
      },
      size: {
        sm: "px-(--space-2) py-(--space-1) text-xs",
        md: "px-(--space-3) py-(--space-1) text-xs",
        lg: "px-(--space-3) py-(--space-2) text-sm",
      },
      selected: {
        true: "",
        false: "",
      },
    },

    compoundVariants: [
      {
        variant: "solid",
        intent: "default",
        selected: false,
        className: [
          "bg-(--nuka-bg-muted)",
          "text-(--nuka-text-base)",
          "hover:bg-(--nuka-bg-subtle)",
        ],
      },
      {
        variant: "solid",
        intent: "default",
        selected: true,
        className: [
          "bg-(--nuka-accent-bg)",
          "text-(--nuka-accent-fg)",
          "hover:bg-(--nuka-accent-bg-hover)",
        ],
      },
      {
        variant: "solid",
        intent: "danger",
        selected: false,
        className: [
          "bg-(--nuka-danger-bg)",
          "text-(--nuka-danger-text)",
          "hover:brightness-95",
        ],
      },
      {
        variant: "solid",
        intent: "danger",
        selected: true,
        className: [
          "bg-(--nuka-danger-base)",
          "text-(--nuka-danger-fg)",
          "hover:brightness-90",
        ],
      },
      {
        variant: "solid",
        intent: "success",
        selected: false,
        className: [
          "bg-(--nuka-success-bg)",
          "text-(--nuka-success-text)",
          "hover:brightness-95",
        ],
      },
      {
        variant: "solid",
        intent: "success",
        selected: true,
        className: [
          "bg-(--nuka-success-base)",
          "text-(--nuka-success-fg)",
          "hover:brightness-90",
        ],
      },
      {
        variant: "solid",
        intent: "warning",
        selected: false,
        className: [
          "bg-(--nuka-warning-bg)",
          "text-(--nuka-warning-text)",
          "hover:brightness-95",
        ],
      },
      {
        variant: "solid",
        intent: "warning",
        selected: true,
        className: [
          "bg-(--nuka-warning-base)",
          "text-(--nuka-warning-fg)",
          "hover:brightness-90",
        ],
      },

      {
        variant: "subtle",
        intent: "default",
        selected: false,
        className: [
          "bg-(--nuka-bg-muted)",
          "text-(--nuka-text-base)",
          "border-(--nuka-border-base)",
          "hover:bg-(--nuka-bg-subtle)",
        ],
      },
      {
        variant: "subtle",
        intent: "default",
        selected: true,
        className: [
          "bg-(--nuka-accent-bg-subtle)",
          "text-(--nuka-accent-text)",
          "border-(--nuka-accent-border)",
          "hover:brightness-95",
        ],
      },
      {
        variant: "subtle",
        intent: "danger",
        selected: false,
        className: [
          "bg-(--nuka-danger-bg)",
          "text-(--nuka-danger-text)",
          "border-(--nuka-danger-border)",
          "hover:brightness-95",
        ],
      },
      {
        variant: "subtle",
        intent: "danger",
        selected: true,
        className: [
          "bg-(--nuka-danger-bg)",
          "text-(--nuka-danger-text)",
          "border-(--nuka-danger-base)",
          "hover:brightness-90",
        ],
      },
      {
        variant: "subtle",
        intent: "success",
        selected: false,
        className: [
          "bg-(--nuka-success-bg)",
          "text-(--nuka-success-text)",
          "border-(--nuka-success-border)",
          "hover:brightness-95",
        ],
      },
      {
        variant: "subtle",
        intent: "success",
        selected: true,
        className: [
          "bg-(--nuka-success-bg)",
          "text-(--nuka-success-text)",
          "border-(--nuka-success-base)",
          "hover:brightness-90",
        ],
      },
      {
        variant: "subtle",
        intent: "warning",
        selected: false,
        className: [
          "bg-(--nuka-warning-bg)",
          "text-(--nuka-warning-text)",
          "border-(--nuka-warning-border)",
          "hover:brightness-95",
        ],
      },
      {
        variant: "subtle",
        intent: "warning",
        selected: true,
        className: [
          "bg-(--nuka-warning-bg)",
          "text-(--nuka-warning-text)",
          "border-(--nuka-warning-base)",
          "hover:brightness-90",
        ],
      },

      {
        variant: "outline",
        intent: "default",
        selected: false,
        className: [
          "border-(--nuka-border-base)",
          "text-(--nuka-text-base)",
          "hover:bg-(--nuka-bg-muted)",
        ],
      },
      {
        variant: "outline",
        intent: "default",
        selected: true,
        className: [
          "border-(--nuka-accent-border)",
          "text-(--nuka-accent-text)",
          "hover:bg-(--nuka-accent-bg-subtle)",
        ],
      },
      {
        variant: "outline",
        intent: "danger",
        selected: false,
        className: [
          "border-(--nuka-danger-border)",
          "text-(--nuka-danger-text)",
          "hover:bg-(--nuka-danger-bg)",
        ],
      },
      {
        variant: "outline",
        intent: "danger",
        selected: true,
        className: [
          "border-(--nuka-danger-base)",
          "text-(--nuka-danger-text)",
          "bg-(--nuka-danger-bg)",
        ],
      },
      {
        variant: "outline",
        intent: "success",
        selected: false,
        className: [
          "border-(--nuka-success-border)",
          "text-(--nuka-success-text)",
          "hover:bg-(--nuka-success-bg)",
        ],
      },
      {
        variant: "outline",
        intent: "success",
        selected: true,
        className: [
          "border-(--nuka-success-base)",
          "text-(--nuka-success-text)",
          "bg-(--nuka-success-bg)",
        ],
      },
      {
        variant: "outline",
        intent: "warning",
        selected: false,
        className: [
          "border-(--nuka-warning-border)",
          "text-(--nuka-warning-text)",
          "hover:bg-(--nuka-warning-bg)",
        ],
      },
      {
        variant: "outline",
        intent: "warning",
        selected: true,
        className: [
          "border-(--nuka-warning-base)",
          "text-(--nuka-warning-text)",
          "bg-(--nuka-warning-bg)",
        ],
      },
    ],

    defaultVariants: {
      variant: "solid",
      intent: "default",
      size: "md",
      selected: false,
    },
  },
);

export type ChipVariantProps = VariantProps<typeof chipVariants>;
