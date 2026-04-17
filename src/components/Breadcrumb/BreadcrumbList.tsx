"use client";

import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface BreadcrumbListProps extends React.OlHTMLAttributes<HTMLOListElement> {
  ref?: React.Ref<HTMLOListElement> | undefined;
}

function BreadcrumbList({ ref, className, ...props }: BreadcrumbListProps) {
  return (
    <ol
      ref={ref}
      role="list"
      className={cn(
        "flex items-center gap-(--space-1.5)",
        "flex-wrap",
        "list-none",
        "text-sm text-(--nuka-text-muted)",
        className,
      )}
      {...props}
    />
  );
}

BreadcrumbList.displayName = "BreadcrumbList";

export { BreadcrumbList };
