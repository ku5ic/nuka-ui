import * as React from "react";
import { cva, type VariantProps } from "@nuka/utils/variants";
import { cn } from "@nuka/utils/cn";
import { DismissButton } from "@nuka/utils/dismiss-button";

const tagVariants = cva(
  [
    "inline-flex items-center",
    "font-medium leading-none whitespace-nowrap",
    "rounded-(--radius-md)",
    "border",
  ],
  {
    variants: {
      variant: {
        primary: ["border-transparent"],
        secondary: [],
        outline: ["bg-transparent"],
        ghost: ["bg-transparent", "border-transparent"],
      },
      intent: {
        default: "",
        danger: "",
        success: "",
        warning: "",
      },
      size: {
        sm: "gap-(--space-1) px-(--space-2) py-(--space-1) text-xs",
        md: "gap-(--space-1) px-(--space-3) py-(--space-1) text-xs",
        lg: "gap-(--space-2) px-(--space-3) py-(--space-2) text-sm",
      },
    },

    compoundVariants: [
      // primary
      {
        variant: "primary",
        intent: "default",
        className: ["bg-(--nuka-accent-bg)", "text-(--nuka-text-inverse)"],
      },
      {
        variant: "primary",
        intent: "danger",
        className: ["bg-(--nuka-danger-base)", "text-(--nuka-text-inverse)"],
      },
      {
        variant: "primary",
        intent: "success",
        className: ["bg-(--nuka-success-base)", "text-(--nuka-text-inverse)"],
      },
      {
        variant: "primary",
        intent: "warning",
        className: ["bg-(--nuka-warning-base)", "text-(--nuka-text-inverse)"],
      },

      // secondary
      {
        variant: "secondary",
        intent: "default",
        className: [
          "bg-(--nuka-bg-muted)",
          "text-(--nuka-text-base)",
          "border-(--nuka-border-base)",
        ],
      },
      {
        variant: "secondary",
        intent: "danger",
        className: [
          "bg-(--nuka-danger-bg)",
          "text-(--nuka-danger-text)",
          "border-(--nuka-danger-border)",
        ],
      },
      {
        variant: "secondary",
        intent: "success",
        className: [
          "bg-(--nuka-success-bg)",
          "text-(--nuka-success-text)",
          "border-(--nuka-success-border)",
        ],
      },
      {
        variant: "secondary",
        intent: "warning",
        className: [
          "bg-(--nuka-warning-bg)",
          "text-(--nuka-warning-text)",
          "border-(--nuka-warning-border)",
        ],
      },

      // outline
      {
        variant: "outline",
        intent: "default",
        className: [
          "border-(--nuka-accent-border)",
          "text-(--nuka-accent-text)",
        ],
      },
      {
        variant: "outline",
        intent: "danger",
        className: [
          "border-(--nuka-danger-border)",
          "text-(--nuka-danger-text)",
        ],
      },
      {
        variant: "outline",
        intent: "success",
        className: [
          "border-(--nuka-success-border)",
          "text-(--nuka-success-text)",
        ],
      },
      {
        variant: "outline",
        intent: "warning",
        className: [
          "border-(--nuka-warning-border)",
          "text-(--nuka-warning-text)",
        ],
      },

      // ghost
      {
        variant: "ghost",
        intent: "default",
        className: ["text-(--nuka-text-base)"],
      },
      {
        variant: "ghost",
        intent: "danger",
        className: ["text-(--nuka-danger-text)"],
      },
      {
        variant: "ghost",
        intent: "success",
        className: ["text-(--nuka-success-text)"],
      },
      {
        variant: "ghost",
        intent: "warning",
        className: ["text-(--nuka-warning-text)"],
      },
    ],

    defaultVariants: {
      variant: "secondary",
      intent: "default",
      size: "md",
    },
  },
);

export type TagVariantProps = VariantProps<typeof tagVariants>;

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>, TagVariantProps {
  onDismiss?: () => void;
  dismissLabel?: string;
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      className,
      variant,
      intent,
      size,
      onDismiss,
      dismissLabel = "Remove",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        className={cn(tagVariants({ variant, intent, size }), className)}
        {...props}
      >
        {children}
        {onDismiss !== undefined && (
          <DismissButton onClick={onDismiss} label={dismissLabel} />
        )}
      </span>
    );
  },
);

Tag.displayName = "Tag";

export { Tag, tagVariants };
