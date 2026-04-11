import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface AppShellBodyProps
  extends React.HTMLAttributes<HTMLDivElement> {}

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

export { AppShellBody };
