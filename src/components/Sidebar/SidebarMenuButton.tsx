"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Slot } from "@nuka/utils/slot";
import { useSidebarContext } from "@nuka/components/Sidebar/Sidebar.context";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@nuka/components/Tooltip";

export interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: React.Ref<HTMLButtonElement> | undefined;
  asChild?: boolean;
  tooltip?: string;
}

function SidebarMenuButton({
  ref,
  asChild = false,
  tooltip,
  className,
  children,
  ...props
}: SidebarMenuButtonProps) {
  const { expanded, isMobile } = useSidebarContext();
  const showTooltip = !expanded && !isMobile && tooltip !== undefined;

  const Comp = asChild ? Slot : "button";

  const button = (
    <Comp
      ref={ref}
      className={cn(
        "flex w-full items-center gap-(--space-3)",
        "rounded-(--radius-md) px-(--space-3) py-(--space-2)",
        "text-sm text-(--nuka-text-base)",
        "hover:bg-(--nuka-bg-muted)",
        "transition-colors duration-150",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        "focus-visible:outline-(--nuka-border-focus)",
        !expanded && !isMobile && "justify-center px-(--space-2)",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );

  if (showTooltip) {
    return (
      <Tooltip side="right" delay={200}>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    );
  }

  return button;
}

SidebarMenuButton.displayName = "SidebarMenuButton";

export { SidebarMenuButton };
