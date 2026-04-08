import * as React from "react";
import { cva, type VariantProps } from "@nuka/utils/variants";
import { cn } from "@nuka/utils/cn";
import { DismissButton } from "@nuka/utils/dismiss-button";

const alertVariants = cva(
  ["flex items-start gap-(--space-3)", "rounded-(--radius-md)", "border"],
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
        sm: "px-(--space-3) py-(--space-2) text-xs",
        md: "px-(--space-4) py-(--space-3) text-sm",
        lg: "px-(--space-6) py-(--space-4) text-base",
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
          "bg-(--nuka-accent-bg-subtle)",
          "text-(--nuka-accent-text)",
          "border-(--nuka-accent-border)",
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

export type AlertVariantProps = VariantProps<typeof alertVariants>;

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>, AlertVariantProps {
  onDismiss?: () => void;
  icon?: React.ReactNode;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    { className, variant, intent, size, onDismiss, icon, children, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant, intent, size }), className)}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <div className="flex-1 min-w-0">{children}</div>
        {onDismiss != null && (
          <DismissButton
            onClick={onDismiss}
            className="ml-auto self-start shrink-0"
          />
        )}
      </div>
    );
  },
);

Alert.displayName = "Alert";

export { Alert, alertVariants };
