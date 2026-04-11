import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {}

const AppShell = React.forwardRef<HTMLDivElement, AppShellProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex h-svh flex-col", className)}
      {...props}
    />
  ),
);

AppShell.displayName = "AppShell";

export { AppShell };
