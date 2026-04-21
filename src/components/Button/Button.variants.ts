import { cva, type VariantProps } from "@nuka/utils/variants";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-(--space-2)",
    "font-[number:var(--font-weight-medium)] leading-none whitespace-nowrap",
    "rounded-(--radius-md)",
    "border",
    "transition-colors duration-150",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    "focus-visible:outline-(--nuka-border-focus)",
    "disabled:pointer-events-none disabled:opacity-50",
    "cursor-pointer",
  ],
  {
    variants: {
      variant: {
        primary: ["border-transparent"],
        secondary: [],
        outline: ["bg-transparent"],
        ghost: ["bg-transparent", "border-transparent"],
        link: [
          "bg-transparent",
          "border-transparent",
          "underline-offset-4",
          "hover:underline",
          "rounded-none",
          "px-0 py-0",
        ],
      },
      intent: {
        default: "",
        danger: "",
        success: "",
        warning: "",
      },
      size: {
        sm: "px-(--space-3) py-(--space-2) text-xs",
        md: "px-(--space-4) py-(--space-3) text-sm",
        lg: "px-(--space-6) py-(--space-4) text-base",
      },
    },

    // Manual matrix: includes `link` variant (5th axis) and per-cell hover/active
    // states that intentCompoundVariants() does not cover. See ADR-001.
    compoundVariants: [
      {
        variant: "primary",
        intent: "default",
        className: [
          "bg-(--nuka-accent-bg)",
          "text-(--nuka-accent-fg)",
          "hover:bg-(--nuka-accent-bg-hover)",
          "active:bg-(--nuka-accent-bg-active)",
        ],
      },
      {
        variant: "primary",
        intent: "danger",
        className: [
          "bg-(--nuka-danger-base)",
          "text-(--nuka-danger-fg)",
          "hover:brightness-90",
          "active:brightness-80",
        ],
      },
      {
        variant: "primary",
        intent: "success",
        className: [
          "bg-(--nuka-success-base)",
          "text-(--nuka-success-fg)",
          "hover:brightness-90",
          "active:brightness-80",
        ],
      },
      {
        variant: "primary",
        intent: "warning",
        className: [
          "bg-(--nuka-warning-base)",
          "text-(--nuka-warning-fg)",
          "hover:brightness-90",
          "active:brightness-80",
        ],
      },

      {
        variant: "secondary",
        intent: "default",
        className: [
          "bg-(--nuka-bg-muted)",
          "text-(--nuka-text-base)",
          "border-(--nuka-border-base)",
          "hover:bg-(--nuka-bg-subtle)",
          "hover:border-(--nuka-border-strong)",
        ],
      },
      {
        variant: "secondary",
        intent: "danger",
        className: [
          "bg-(--nuka-danger-bg)",
          "text-(--nuka-danger-text)",
          "border-(--nuka-danger-border)",
          "hover:brightness-95",
        ],
      },
      {
        variant: "secondary",
        intent: "success",
        className: [
          "bg-(--nuka-success-bg)",
          "text-(--nuka-success-text)",
          "border-(--nuka-success-border)",
          "hover:brightness-95",
        ],
      },
      {
        variant: "secondary",
        intent: "warning",
        className: [
          "bg-(--nuka-warning-bg)",
          "text-(--nuka-warning-text)",
          "border-(--nuka-warning-border)",
          "hover:brightness-95",
        ],
      },

      {
        variant: "outline",
        intent: "default",
        className: [
          "border-(--nuka-accent-border)",
          "text-(--nuka-accent-text)",
          "hover:bg-(--nuka-accent-bg-subtle)",
        ],
      },
      {
        variant: "outline",
        intent: "danger",
        className: [
          "border-(--nuka-danger-border)",
          "text-(--nuka-danger-text)",
          "hover:bg-(--nuka-danger-bg)",
        ],
      },
      {
        variant: "outline",
        intent: "success",
        className: [
          "border-(--nuka-success-border)",
          "text-(--nuka-success-text)",
          "hover:bg-(--nuka-success-bg)",
        ],
      },
      {
        variant: "outline",
        intent: "warning",
        className: [
          "border-(--nuka-warning-border)",
          "text-(--nuka-warning-text)",
          "hover:bg-(--nuka-warning-bg)",
        ],
      },

      {
        variant: "ghost",
        intent: "default",
        className: ["text-(--nuka-text-base)", "hover:bg-(--nuka-bg-muted)"],
      },
      {
        variant: "ghost",
        intent: "danger",
        className: ["text-(--nuka-danger-text)", "hover:bg-(--nuka-danger-bg)"],
      },
      {
        variant: "ghost",
        intent: "success",
        className: [
          "text-(--nuka-success-text)",
          "hover:bg-(--nuka-success-bg)",
        ],
      },
      {
        variant: "ghost",
        intent: "warning",
        className: [
          "text-(--nuka-warning-text)",
          "hover:bg-(--nuka-warning-bg)",
        ],
      },

      {
        variant: "link",
        intent: "default",
        className: ["text-(--nuka-accent-text)"],
      },
      {
        variant: "link",
        intent: "danger",
        className: ["text-(--nuka-danger-text)"],
      },
      {
        variant: "link",
        intent: "success",
        className: ["text-(--nuka-success-text)"],
      },
      {
        variant: "link",
        intent: "warning",
        className: ["text-(--nuka-warning-text)"],
      },
    ],

    defaultVariants: {
      variant: "primary",
      intent: "default",
      size: "md",
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
