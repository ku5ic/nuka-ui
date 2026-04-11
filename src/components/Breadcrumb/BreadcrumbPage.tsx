import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface BreadcrumbPageProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      aria-current="page"
      className={cn("text-(--nuka-text-base)", "font-medium", className)}
      {...props}
    />
  ),
);

BreadcrumbPage.displayName = "BreadcrumbPage";

export { BreadcrumbPage };
