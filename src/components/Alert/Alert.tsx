import * as React from "react";
import {
  cva,
  intentCompoundVariants,
  type VariantProps,
} from "@nuka/utils/variants";
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

    compoundVariants: intentCompoundVariants({
      secondaryDefault: [
        "bg-(--nuka-accent-bg-subtle)",
        "text-(--nuka-accent-text)",
        "border-(--nuka-accent-border)",
      ],
    }),

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
