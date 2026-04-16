import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface PaginationContentProps extends React.HTMLAttributes<HTMLUListElement> {
  ref?: React.Ref<HTMLUListElement> | undefined;
}

function PaginationContent({
  ref,
  className,
  ...props
}: PaginationContentProps) {
  return (
    <ul
      ref={ref}
      className={cn(
        "flex items-center gap-(--space-1)",
        "list-none",
        className,
      )}
      {...props}
    />
  );
}

PaginationContent.displayName = "PaginationContent";

export { PaginationContent };
