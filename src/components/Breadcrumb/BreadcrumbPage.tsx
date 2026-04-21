"use client";

import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface BreadcrumbPageProps extends React.HTMLAttributes<HTMLSpanElement> {
  ref?: React.Ref<HTMLSpanElement> | undefined;
}

function BreadcrumbPage({ ref, className, ...props }: BreadcrumbPageProps) {
  return (
    <span
      ref={ref}
      aria-current="page"
      className={cn(
        "text-(--nuka-text-base)",
        "font-[number:var(--font-weight-medium)]",
        className,
      )}
      data-slot="page"
      {...props}
    />
  );
}

BreadcrumbPage.displayName = "BreadcrumbPage";

export { BreadcrumbPage };
