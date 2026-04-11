import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface AppShellHeaderProps extends React.HTMLAttributes<HTMLElement> {
  border?: boolean;
}

const AppShellHeader = React.forwardRef<HTMLElement, AppShellHeaderProps>(
  ({ border = true, className, ...props }, ref) => (
    <header
      ref={ref}
      className={cn(
        "sticky top-0 z-(--nuka-z-header)",
        "flex items-center gap-(--space-3)",
        "px-(--space-4) py-(--space-3)",
        "bg-(--nuka-bg-base)",
        border && "border-b border-(--nuka-border-base)",
        className,
      )}
      {...props}
    />
  ),
);

AppShellHeader.displayName = "AppShellHeader";

export { AppShellHeader };
