import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  illustration?: React.ReactNode;
  icon?: React.ReactNode;
  heading: string;
  description?: string;
  action?: React.ReactNode;
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    { className, illustration, icon, heading, description, action, children, ...props },
    ref,
  ) => {
    const visual = illustration ?? icon ?? null;

    return (
      <div
        ref={ref}
        role="status"
        className={cn(
          "flex flex-col items-center justify-center text-center",
          "gap-[var(--space-4)]",
          "py-[var(--space-12)] px-[var(--space-6)]",
          className,
        )}
        {...props}
      >
        {visual && (
          <div className="flex items-center justify-center text-[var(--nuka-text-muted)]">
            {visual}
          </div>
        )}
        <div className="flex flex-col gap-[var(--space-2)] max-w-sm">
          <p className="text-base font-semibold text-[var(--nuka-text-base)]">
            {heading}
          </p>
          {description != null && (
            <p className="text-sm text-[var(--nuka-text-muted)]">
              {description}
            </p>
          )}
        </div>
        {action && <div>{action}</div>}
        {children}
      </div>
    );
  },
);

EmptyState.displayName = "EmptyState";

export { EmptyState };
