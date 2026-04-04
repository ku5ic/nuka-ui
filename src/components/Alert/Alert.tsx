import * as React from "react";
import { cva, type VariantProps } from "@vault/utils/variants";
import { cn } from "@vault/utils/cn";

const alertVariants = cva(
  [
    "flex items-start gap-[var(--space-3)]",
    "rounded-[var(--radius-md)]",
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
        sm: "px-[var(--space-3)] py-[var(--space-2)] text-xs",
        md: "px-[var(--space-4)] py-[var(--space-3)] text-sm",
        lg: "px-[var(--space-6)] py-[var(--space-4)] text-base",
      },
    },

    compoundVariants: [
      // primary
      {
        variant: "primary",
        intent: "default",
        className: [
          "bg-[var(--vault-accent-bg)]",
          "text-[var(--vault-text-inverse)]",
        ],
      },
      {
        variant: "primary",
        intent: "danger",
        className: [
          "bg-[var(--vault-danger-base)]",
          "text-[var(--vault-text-inverse)]",
        ],
      },
      {
        variant: "primary",
        intent: "success",
        className: [
          "bg-[var(--vault-success-base)]",
          "text-[var(--vault-text-inverse)]",
        ],
      },
      {
        variant: "primary",
        intent: "warning",
        className: [
          "bg-[var(--vault-warning-base)]",
          "text-[var(--vault-text-inverse)]",
        ],
      },

      // secondary
      {
        variant: "secondary",
        intent: "default",
        className: [
          "bg-[var(--vault-accent-bg-subtle)]",
          "text-[var(--vault-accent-text)]",
          "border-[var(--vault-accent-border)]",
        ],
      },
      {
        variant: "secondary",
        intent: "danger",
        className: [
          "bg-[var(--vault-danger-bg)]",
          "text-[var(--vault-danger-text)]",
          "border-[var(--vault-danger-border)]",
        ],
      },
      {
        variant: "secondary",
        intent: "success",
        className: [
          "bg-[var(--vault-success-bg)]",
          "text-[var(--vault-success-text)]",
          "border-[var(--vault-success-border)]",
        ],
      },
      {
        variant: "secondary",
        intent: "warning",
        className: [
          "bg-[var(--vault-warning-bg)]",
          "text-[var(--vault-warning-text)]",
          "border-[var(--vault-warning-border)]",
        ],
      },

      // outline
      {
        variant: "outline",
        intent: "default",
        className: [
          "border-[var(--vault-accent-border)]",
          "text-[var(--vault-accent-text)]",
        ],
      },
      {
        variant: "outline",
        intent: "danger",
        className: [
          "border-[var(--vault-danger-border)]",
          "text-[var(--vault-danger-text)]",
        ],
      },
      {
        variant: "outline",
        intent: "success",
        className: [
          "border-[var(--vault-success-border)]",
          "text-[var(--vault-success-text)]",
        ],
      },
      {
        variant: "outline",
        intent: "warning",
        className: [
          "border-[var(--vault-warning-border)]",
          "text-[var(--vault-warning-text)]",
        ],
      },

      // ghost
      {
        variant: "ghost",
        intent: "default",
        className: ["text-[var(--vault-text-base)]"],
      },
      {
        variant: "ghost",
        intent: "danger",
        className: ["text-[var(--vault-danger-text)]"],
      },
      {
        variant: "ghost",
        intent: "success",
        className: ["text-[var(--vault-success-text)]"],
      },
      {
        variant: "ghost",
        intent: "warning",
        className: ["text-[var(--vault-warning-text)]"],
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
  extends React.HTMLAttributes<HTMLDivElement>,
    AlertVariantProps {
  onDismiss?: () => void;
  icon?: React.ReactNode;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, intent, size, onDismiss, icon, children, ...props }, ref) => {
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
          <button
            type="button"
            aria-label="Dismiss"
            onClick={onDismiss}
            className="ml-auto self-start shrink-0 inline-flex items-center justify-center rounded-[var(--radius-sm)] p-[var(--space-1)] opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    );
  },
);

Alert.displayName = "Alert";

export { Alert, alertVariants };
