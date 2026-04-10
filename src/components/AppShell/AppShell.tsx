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

export interface AppShellBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

const AppShellBody = React.forwardRef<HTMLDivElement, AppShellBodyProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-1 h-full overflow-hidden", className)}
      {...props}
    />
  ),
);

AppShellBody.displayName = "AppShellBody";

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

export { AppShell, AppShellHeader, AppShellBody, AppShellMain };
