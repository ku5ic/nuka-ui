"use client";

import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface AppShellMainProps extends React.HTMLAttributes<HTMLElement> {
  ref?: React.Ref<HTMLElement> | undefined;
  padded?: boolean;
}

function AppShellMain({
  ref,
  padded = true,
  className,
  ...props
}: AppShellMainProps) {
  return (
    <main
      ref={ref}
      className={cn(
        "flex-1 overflow-y-auto",
        padded && "p-(--space-6) lg:p-(--space-8)",
        className,
      )}
      data-slot="main"
      {...props}
    />
  );
}

AppShellMain.displayName = "AppShellMain";

export { AppShellMain };
