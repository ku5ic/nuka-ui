"use client";

import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Text } from "@nuka/components/Text";

export interface BreadcrumbSeparatorProps extends React.LiHTMLAttributes<HTMLLIElement> {
  ref?: React.Ref<HTMLLIElement> | undefined;
}

function BreadcrumbSeparator({
  ref,
  className,
  children,
  ...props
}: BreadcrumbSeparatorProps) {
  return (
    <li
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={cn(
        "flex items-center px-(--space-1) text-(--nuka-text-subtle)",
        className,
      )}
      data-slot="separator"
      {...props}
    >
      {children ?? (
        <Text as="span" size="sm" color="subtle">
          /
        </Text>
      )}
    </li>
  );
}

BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export { BreadcrumbSeparator };
