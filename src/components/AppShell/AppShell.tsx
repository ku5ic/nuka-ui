import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
}

function AppShell({ ref, className, ...props }: AppShellProps) {
  return (
    <div
      ref={ref}
      className={cn("flex h-svh flex-col", className)}
      {...props}
    />
  );
}

AppShell.displayName = "AppShell";

export { AppShell };
