import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Portal } from "@nuka/utils/portal";
import { composeRefs } from "@nuka/utils/slot";
import { useFocusFirstInteractive } from "@nuka/utils/use-focus-first-interactive";
import { usePopoverContext } from "@nuka/components/Popover/PopoverContext";

export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  (
    {
      className,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      ...props
    },
    ref,
  ) => {
    const ctx = usePopoverContext();
    const contentRef = React.useRef<HTMLDivElement>(null);
    const composedRef = composeRefs(ref, contentRef, ctx.refs.setFloating);

    React.useEffect(() => {
      if (
        ctx.open &&
        process.env.NODE_ENV !== "production" &&
        !ariaLabel &&
        !ariaLabelledBy
      ) {
        console.error(
          'Popover: PopoverContent has role="dialog" but no accessible name. ' +
            "Provide an aria-label or aria-labelledby prop.",
        );
      }
    }, [ctx.open, ariaLabel, ariaLabelledBy]);

    useFocusFirstInteractive(contentRef, ctx.open);

    if (!ctx.open) return null;

    const floatingProps = ctx.getFloatingProps(props);

    return (
      <Portal>
        <div
          ref={composedRef}
          style={ctx.floatingStyles}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          tabIndex={-1}
          // Safe: Floating UI getFloatingProps() returns Record<string, unknown>;
          // values are standard DOM attributes and event handlers.
          {...(floatingProps as React.HTMLAttributes<HTMLDivElement>)}
          className={cn(
            "z-(--nuka-z-dropdown) rounded-(--radius-md) border border-(--nuka-border-base)",
            "bg-(--nuka-bg-base) shadow-md p-(--space-4)",
            "focus-visible:outline-none",
            className,
          )}
        />
      </Portal>
    );
  },
);

PopoverContent.displayName = "PopoverContent";

export { PopoverContent };
