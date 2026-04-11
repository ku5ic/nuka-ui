import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface PaginationContentProps extends React.HTMLAttributes<HTMLUListElement> {}

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  PaginationContentProps
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex items-center gap-(--space-1)", "list-none", className)}
    {...props}
  />
));

PaginationContent.displayName = "PaginationContent";

export { PaginationContent };
