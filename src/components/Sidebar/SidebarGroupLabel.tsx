"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Text } from "@nuka/components/Text";
import { useSidebarContext } from "@nuka/components/Sidebar/Sidebar.context";

export interface SidebarGroupLabelProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "color"
> {}

const SidebarGroupLabel = React.forwardRef<HTMLElement, SidebarGroupLabelProps>(
  ({ className, ...props }, ref) => {
    const { expanded, isMobile } = useSidebarContext();
    const isVisible = expanded || isMobile;

    if (!isVisible) return null;

    return (
      <Text
        ref={ref}
        as="span"
        size="xs"
        weight="semibold"
        color="muted"
        className={cn("block px-(--space-3) py-(--space-1)", className)}
        {...props}
      />
    );
  },
);

SidebarGroupLabel.displayName = "SidebarGroupLabel";

export { SidebarGroupLabel };
