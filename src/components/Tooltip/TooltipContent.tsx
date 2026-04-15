"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Portal } from "@nuka/utils/portal";
import { composeRefs } from "@nuka/utils/slot";
import { useTooltipContext } from "@nuka/components/Tooltip/Tooltip.context";

export interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, ...props }, ref) => {
    const ctx = useTooltipContext();

    if (!ctx.open) return null;

    const floatingProps = ctx.getFloatingProps(props);

    return (
      <Portal>
        <div
          ref={composeRefs(ref, ctx.refs.setFloating)}
          role="tooltip"
          style={ctx.floatingStyles}
          // Safe: Floating UI getFloatingProps() returns Record<string, unknown>;
          // values are standard DOM attributes and event handlers.
          {...(floatingProps as React.HTMLAttributes<HTMLDivElement>)}
          className={cn(
            "z-(--nuka-z-dropdown) max-w-xs rounded-(--radius-md) px-(--space-2) py-(--space-1)",
            "text-xs bg-(--nuka-bg-emphasis) text-(--nuka-text-inverse)",
            "shadow-md pointer-events-none",
            className,
          )}
        />
      </Portal>
    );
  },
);

TooltipContent.displayName = "TooltipContent";

export { TooltipContent };
