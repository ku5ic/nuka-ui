"use client";

import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Text } from "@nuka/components/Text";
import type { TextVariantProps } from "@nuka/components/Text/Text.variants";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
  illustration?: React.ReactNode;
  icon?: React.ReactNode;
  heading: string;
  description?: string;
  action?: React.ReactNode;
  headingWeight?: TextVariantProps["weight"];
  descriptionWeight?: TextVariantProps["weight"];
}

function EmptyState({
  ref,
  className,
  illustration,
  icon,
  heading,
  description,
  action,
  headingWeight,
  descriptionWeight,
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
      data-slot="root"
      {...props}
    >
      {visual && (
        <div
          className="flex items-center justify-center text-(--nuka-text-muted)"
          data-slot="visual"
        >
          {visual}
        </div>
      )}
      <div className="flex flex-col gap-(--space-2) max-w-sm">
        <Text
          as="p"
          size="md"
          weight={headingWeight ?? "semibold"}
          data-slot="heading"
        >
          {heading}
        </Text>
        {description != null && (
          <Text
            as="p"
            size="sm"
            color="muted"
            data-slot="description"
            {...(descriptionWeight !== undefined
              ? { weight: descriptionWeight }
              : {})}
          >
            {description}
          </Text>
        )}
      </div>
      {action && <div data-slot="action">{action}</div>}
      {children}
    </div>
  );
}

EmptyState.displayName = "EmptyState";

export { EmptyState };
