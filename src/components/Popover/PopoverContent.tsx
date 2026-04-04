import * as React from "react";
import * as ReactDOM from "react-dom";
import { cn } from "@vault/utils/cn";
import { composeRefs } from "@vault/utils/slot";
import { usePopoverContext } from "@vault/components/Popover/PopoverContext";

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
        "z-50 rounded-[var(--radius-md)] border border-[var(--vault-border-base)]",
        "bg-[var(--vault-bg-base)] shadow-md p-[var(--space-4)]",
        "focus:outline-none",
        className,
      )}
    />,
    document.body,
  );
}

PopoverContent.displayName = "PopoverContent";

export { PopoverContent };
