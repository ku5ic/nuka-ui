"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { useControllableState } from "@nuka/hooks/use-controllable-state";
import { useMediaQuery } from "@nuka/hooks/use-media-query";
import { SidebarContext } from "@nuka/components/Sidebar/Sidebar.context";
import type { SidebarContextValue } from "@nuka/components/Sidebar/Sidebar.context";

export interface SidebarProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  mobileBreakpoint?: string;
}

function SidebarProvider({
  ref,
  expanded: controlledExpanded,
  defaultExpanded = true,
  onExpandedChange,
  mobileBreakpoint = "(max-width: 768px)",
  className,
  children,
  ...props
}: SidebarProviderProps) {
  const [currentExpanded, setExpanded] = useControllableState(
    controlledExpanded,
    defaultExpanded,
    onExpandedChange,
  );

  const isMobile = useMediaQuery(mobileBreakpoint);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const contextValue: SidebarContextValue = React.useMemo(
    () => ({
      expanded: currentExpanded,
      setExpanded,
      isMobile,
      mobileOpen,
      setMobileOpen,
    }),
    [currentExpanded, setExpanded, isMobile, mobileOpen],
  );

  return (
    <SidebarContext value={contextValue}>
      <div
        ref={ref}
        className={cn("flex min-h-svh w-full", className)}
        {...props}
      >
        {children}
      </div>
    </SidebarContext>
  );
}

SidebarProvider.displayName = "SidebarProvider";

export { SidebarProvider };
