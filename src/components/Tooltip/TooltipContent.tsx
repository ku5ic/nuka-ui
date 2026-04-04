import * as React from "react";
import * as ReactDOM from "react-dom";
import { cn } from "@nuka/utils/cn";
import { useTooltipContext } from "@nuka/components/Tooltip/TooltipContext";

export interface TooltipContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

function TooltipContent({ className, ...props }: TooltipContentProps) {
  const ctx = useTooltipContext();

  if (typeof document === "undefined") return null;
  if (!ctx.open) return null;

  const floatingProps = ctx.getFloatingProps(props);

  return ReactDOM.createPortal(
    <div
      ref={ctx.refs.setFloating}
      style={ctx.floatingStyles}
      {...(floatingProps as React.HTMLAttributes<HTMLDivElement>)}
      className={cn(
        "z-50 max-w-xs rounded-[var(--radius-md)] px-[var(--space-2)] py-[var(--space-1)]",
        "text-xs bg-[var(--nuka-bg-emphasis)] text-[var(--nuka-text-inverse)]",
        "shadow-md pointer-events-none",
        className,
      )}
    />,
    document.body,
  );
}

TooltipContent.displayName = "TooltipContent";

export { TooltipContent };
