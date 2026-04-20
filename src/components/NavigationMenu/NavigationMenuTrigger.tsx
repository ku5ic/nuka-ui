"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { composeRefs } from "@nuka/utils/slot";
import { Icon } from "@nuka/components/Icon";
import {
  useNavigationMenuContext,
  useNavigationMenuItemContext,
} from "@nuka/components/NavigationMenu/NavigationMenu.context";
import { navigateToAdjacentItem } from "@nuka/components/NavigationMenu/NavigationMenu.utils";

export interface NavigationMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: React.Ref<HTMLButtonElement> | undefined;
}

function NavigationMenuTrigger({
  ref,
  className,
  children,
  onClick,
  onKeyDown,
  ...props
}: NavigationMenuTriggerProps) {
  const rootCtx = useNavigationMenuContext();
  const itemCtx = useNavigationMenuItemContext();
  const composedRef = composeRefs(
    ref,
    itemCtx.refs.setReference,
    (el: HTMLButtonElement | null) => {
      rootCtx.registerItem(itemCtx.value, el);
      if (el) {
        rootCtx.itemLabels.current.set(
          itemCtx.value,
          el.textContent.trim() || itemCtx.value,
        );
      } else {
        rootCtx.itemLabels.current.delete(itemCtx.value);
      }
    },
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    itemCtx.onOpenChange(!itemCtx.open);
    onClick?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;

    switch (e.key) {
      case "ArrowRight": {
        e.preventDefault();
        if (itemCtx.open) {
          itemCtx.onOpenChange(false);
        }
        navigateToAdjacentItem(rootCtx, itemCtx.value, 1);
        break;
      }
      case "ArrowLeft": {
        e.preventDefault();
        if (itemCtx.open) {
          itemCtx.onOpenChange(false);
        }
        navigateToAdjacentItem(rootCtx, itemCtx.value, -1);
        break;
      }
      case "ArrowDown": {
        if (!itemCtx.open) {
          e.preventDefault();
          itemCtx.onOpenChange(true);
        }
        break;
      }
    }
  };

  const triggerProps = itemCtx.getReferenceProps({
    ...props,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
  });

  return (
    <button
      ref={composedRef}
      type="button"
      aria-haspopup="dialog"
      aria-expanded={itemCtx.open}
      aria-controls={itemCtx.contentId}
      className={cn(
        "inline-flex items-center gap-(--space-1)",
        "rounded-(--radius-md) px-(--space-3) py-(--space-2)",
        "text-sm font-[number:var(--font-weight-medium)]",
        "text-(--nuka-text-base)",
        "select-none",
        "hover:bg-(--nuka-bg-muted)",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        "focus-visible:outline-(--nuka-border-focus)",
        "data-[state=open]:bg-(--nuka-bg-muted)",
        className,
      )}
      data-slot="trigger"
      data-state={itemCtx.open ? "open" : "closed"}
      // Safe: Floating UI getReferenceProps() returns Record<string, unknown>;
      // values are standard DOM event handlers.
      {...(triggerProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      tabIndex={itemCtx.value === rootCtx.rovingValue ? 0 : -1}
    >
      {children}
      <Icon
        size="sm"
        className={cn(
          "transition-transform duration-200",
          itemCtx.open && "rotate-180",
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </Icon>
    </button>
  );
}

NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

export { NavigationMenuTrigger };
