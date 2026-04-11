import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { DismissButton } from "@nuka/utils/dismiss-button";
import {
  alertVariants,
  type AlertVariantProps,
} from "@nuka/components/Alert/Alert.variants";

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
