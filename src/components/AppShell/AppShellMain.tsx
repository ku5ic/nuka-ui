import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface AppShellMainProps extends React.HTMLAttributes<HTMLElement> {
  padded?: boolean;
}

const AppShellMain = React.forwardRef<HTMLElement, AppShellMainProps>(
  ({ padded = true, className, ...props }, ref) => (
    <main
      ref={ref}
      className={cn(
        "flex-1 overflow-y-auto",
        padded && "p-(--space-6) lg:p-(--space-8)",
        className,
      )}
      {...props}
    />
  ),
);

AppShellMain.displayName = "AppShellMain";

export { AppShellMain };
