import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Text } from "@nuka/components/Text";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
  illustration?: React.ReactNode;
  icon?: React.ReactNode;
  heading: string;
  description?: string;
  action?: React.ReactNode;
}

function EmptyState({
  ref,
  className,
  illustration,
  icon,
  heading,
  description,
  action,
  children,
  ...props
}: EmptyStateProps) {
  const visual = illustration ?? icon ?? null;

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center text-center",
        "gap-(--space-4)",
        "py-(--space-12) px-(--space-6)",
        className,
      )}
      {...props}
    >
      {visual && (
        <div className="flex items-center justify-center text-(--nuka-text-muted)">
          {visual}
        </div>
      )}
      <div className="flex flex-col gap-(--space-2) max-w-sm">
        <Text as="p" size="md" weight="semibold">
          {heading}
        </Text>
        {description != null && (
          <Text as="p" size="sm" color="muted">
            {description}
          </Text>
        )}
      </div>
      {action && <div>{action}</div>}
      {children}
    </div>
  );
}

EmptyState.displayName = "EmptyState";

export { EmptyState };
