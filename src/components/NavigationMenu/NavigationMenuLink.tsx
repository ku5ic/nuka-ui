"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Slot, composeRefs } from "@nuka/utils/slot";
import {
  useNavigationMenuContext,
  useNavigationMenuItemContext,
  useIsInsideContent,
} from "@nuka/components/NavigationMenu/NavigationMenu.context";
import { navigateToAdjacentItem } from "@nuka/components/NavigationMenu/NavigationMenu.utils";

export interface NavigationMenuLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  ref?: React.Ref<HTMLAnchorElement> | undefined;
  asChild?: boolean;
  active?: boolean;
}

function NavigationMenuLink({
  ref,
  asChild = false,
  active = false,
  className,
  onKeyDown,
  ...props
}: NavigationMenuLinkProps) {
  const rootCtx = useNavigationMenuContext();
  const itemCtx = useNavigationMenuItemContext();
  const insideContent = useIsInsideContent();
  const Comp = asChild ? Slot : "a";

  const composedRef = composeRefs(
    ref,
    insideContent
      ? undefined
      : (el: HTMLAnchorElement | null) => {
          rootCtx.registerItem(itemCtx.value, el);
        },
  );

  const handleKeyDown = insideContent
    ? onKeyDown
    : (e: React.KeyboardEvent<HTMLAnchorElement>) => {
        onKeyDown?.(e);
        if (e.defaultPrevented) return;

        switch (e.key) {
          case "ArrowRight": {
            e.preventDefault();
            navigateToAdjacentItem(rootCtx, itemCtx.value, 1);
            break;
          }
          case "ArrowLeft": {
            e.preventDefault();
            navigateToAdjacentItem(rootCtx, itemCtx.value, -1);
            break;
          }
          case "Escape": {
            e.preventDefault();
            if (rootCtx.activeValue !== null) {
              rootCtx.closeMenu();
            }
            break;
          }
        }
      };

  const menubarProps = insideContent
    ? {}
    : {
        tabIndex: itemCtx.value === rootCtx.rovingValue ? 0 : -1,
      };

  return (
    <Comp
      ref={composedRef}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex items-center",
        "rounded-(--radius-md) px-(--space-3) py-(--space-2)",
        "text-sm font-medium",
        "text-(--nuka-text-base)",
        "select-none",
        "hover:bg-(--nuka-bg-muted)",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        "focus-visible:outline-(--nuka-border-focus)",
        active && "text-(--nuka-accent-text)",
        className,
      )}
      {...menubarProps}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
}

NavigationMenuLink.displayName = "NavigationMenuLink";

export { NavigationMenuLink };
