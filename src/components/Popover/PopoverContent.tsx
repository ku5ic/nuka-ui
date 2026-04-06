import * as React from "react";
import * as ReactDOM from "react-dom";
import { cn } from "@nuka/utils/cn";
import { composeRefs } from "@nuka/utils/slot";
import { usePopoverContext } from "@nuka/components/Popover/PopoverContext";

export interface PopoverContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

function PopoverContent({ className, ...props }: PopoverContentProps) {
  const ctx = usePopoverContext();
  const contentRef = React.useRef<HTMLDivElement>(null);
  const composedRef = composeRefs(contentRef, ctx.refs.setFloating);

  React.useEffect(() => {
    if (ctx.open) {
      const frame = requestAnimationFrame(() => {
        const focusable = contentRef.current?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable) {
          focusable.focus();
        } else {
          contentRef.current?.focus();
        }
      });
      return () => cancelAnimationFrame(frame);
    }
    return undefined;
  }, [ctx.open]);

  if (typeof document === "undefined") return null;
  if (!ctx.open) return null;

  const floatingProps = ctx.getFloatingProps(props);

  return ReactDOM.createPortal(
    <div
      ref={composedRef}
      style={ctx.floatingStyles}
      tabIndex={-1}
      {...(floatingProps as React.HTMLAttributes<HTMLDivElement>)}
      className={cn(
        "z-50 rounded-(--radius-md) border border-(--nuka-border-base)",
        "bg-(--nuka-bg-base) shadow-md p-(--space-4)",
        "focus:outline-none",
        className,
      )}
    />,
    document.body,
  );
}

PopoverContent.displayName = "PopoverContent";

export { PopoverContent };
