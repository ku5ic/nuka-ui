"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { composeRefs } from "@nuka/utils/slot";
import {
  useMenubarContext,
  useMenubarMenuContext,
} from "@nuka/components/Menubar/Menubar.context";

export interface MenubarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: React.Ref<HTMLButtonElement> | undefined;
}

function MenubarTrigger({
  ref,
  className,
  children,
  onKeyDown,
  ...props
}: MenubarTriggerProps) {
  const bar = useMenubarContext();
  const menu = useMenubarMenuContext();
  const composedRef = composeRefs(
    ref,
    menu.refs.setReference,
    (el: HTMLButtonElement | null) => {
      bar.registerTrigger(menu.value, el);
    },
  );

  const getAdjacentValue = (direction: -1 | 1): string | undefined => {
    const values = bar.menuValues.current;
    const currentIndex = values.indexOf(menu.value);
    if (currentIndex === -1) return undefined;
    const nextIndex =
      (currentIndex + direction + values.length) % values.length;
    return values[nextIndex];
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(e);

    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextValue = getAdjacentValue(1);
      if (nextValue !== undefined) {
        if (menu.open) {
          bar.openMenu(nextValue);
        }
        bar.triggerRefs.current.get(nextValue)?.focus();
      }
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevValue = getAdjacentValue(-1);
      if (prevValue !== undefined) {
        if (menu.open) {
          bar.openMenu(prevValue);
        }
        bar.triggerRefs.current.get(prevValue)?.focus();
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!menu.open) {
        bar.openMenu(menu.value);
      }
    }
  };

  const triggerProps = menu.getReferenceProps({
    ...props,
    onKeyDown: handleKeyDown,
  });

  return (
    <button
      ref={composedRef}
      type="button"
      role="menuitem"
      aria-haspopup="menu"
      aria-expanded={menu.open}
      className={cn(
        "inline-flex items-center justify-center",
        "rounded-(--radius-sm) px-(--space-3) py-(--space-1.5)",
        "text-sm font-[number:var(--font-weight-medium)]",
        "text-(--nuka-text-base)",
        "select-none cursor-default",
        "hover:bg-(--nuka-bg-muted)",
        "focus-visible:bg-(--nuka-bg-muted)",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        "focus-visible:outline-(--nuka-border-focus)",
        "data-[state=open]:bg-(--nuka-bg-muted)",
        className,
      )}
      data-slot="trigger"
      data-state={menu.open ? "open" : "closed"}
      // Safe: Floating UI getReferenceProps() returns Record<string, unknown>;
      // values are standard DOM event handlers.
      {...triggerProps}
    >
      {children}
    </button>
  );
}

MenubarTrigger.displayName = "MenubarTrigger";

export { MenubarTrigger };
