"use client";

import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface AppShellBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
}

function AppShellBody({ ref, className, ...props }: AppShellBodyProps) {
  return (
    <div
      ref={ref}
      className={cn("flex flex-1 h-full overflow-hidden", className)}
      {...props}
    />
  );
}

AppShellBody.displayName = "AppShellBody";

export { AppShellBody };
