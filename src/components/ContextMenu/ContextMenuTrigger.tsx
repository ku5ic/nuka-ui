import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Slot, composeRefs } from "@nuka/utils/slot";
import { useContextMenuContext } from "@nuka/components/ContextMenu/ContextMenu.context";

export interface ContextMenuTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const ContextMenuTrigger = React.forwardRef<
  HTMLDivElement,
  ContextMenuTriggerProps
>(
  (
    {
      asChild = false,
      children,
      onContextMenu,
      onKeyDown,
      className,
      ...props
    },
    ref,
  ) => {
    const ctx = useContextMenuContext();
    const triggerRef = React.useRef<HTMLDivElement>(null);
    const composedTriggerRef = composeRefs(ref, triggerRef);
    const Comp = asChild ? Slot : "div";

    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      onContextMenu?.(e);

      ctx.refs.setReference({
        getBoundingClientRect: () => ({
          x: e.clientX,
          y: e.clientY,
          width: 0,
          height: 0,
          top: e.clientY,
          left: e.clientX,
          bottom: e.clientY,
          right: e.clientX,
          toJSON: () => ({}),
        }),
      });

      ctx.onOpenChange(true);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e);
      if (e.defaultPrevented) return;

      const isContextMenuKey =
        e.key === "ContextMenu" || (e.shiftKey && e.key === "F10");

      if (isContextMenuKey) {
        e.preventDefault();
        const rect = triggerRef.current?.getBoundingClientRect();
        if (rect) {
          ctx.refs.setReference({
            getBoundingClientRect: () => ({
              x: rect.x,
              y: rect.y + rect.height,
              width: 0,
              height: 0,
              top: rect.y + rect.height,
              left: rect.x,
              bottom: rect.y + rect.height,
              right: rect.x,
              toJSON: () => ({}),
            }),
          });
        }
        ctx.onOpenChange(true);
      }
    };

    return (
      <Comp
        ref={composedTriggerRef}
        tabIndex={0}
        onContextMenu={handleContextMenu}
        onKeyDown={handleKeyDown}
        className={cn(
          "rounded-(--radius-sm)",
          "focus-visible:outline-2 focus-visible:outline-offset-2",
          "focus-visible:outline-(--nuka-border-focus)",
          className,
        )}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        {children}
      </Comp>
    );
  },
);

ContextMenuTrigger.displayName = "ContextMenuTrigger";

export { ContextMenuTrigger };
