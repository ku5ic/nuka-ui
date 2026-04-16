"use client";
import * as React from "react";
import {
  useFloating,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  offset,
  flip,
  shift,
  autoUpdate,
} from "@floating-ui/react";
import type { Placement } from "@floating-ui/react";
import { cn } from "@nuka/utils/cn";
import {
  NavigationMenuItemContext,
  useNavigationMenuContext,
} from "@nuka/components/NavigationMenu/NavigationMenu.context";

export interface NavigationMenuItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  ref?: React.Ref<HTMLLIElement> | undefined;
  value: string;
  placement?: Placement;
}

function NavigationMenuItem({
  ref,
  value,
  placement = "bottom-start",
  className,
  children,
  ...props
}: NavigationMenuItemProps) {
  const rootCtx = useNavigationMenuContext();
  const open = rootCtx.activeValue === value;
  const contentId = React.useId();

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      if (next) {
        rootCtx.openMenu(value);
      } else {
        rootCtx.closeMenu();
        const itemEl = rootCtx.itemRefs.current.get(value);
        if (itemEl) {
          itemEl.tabIndex = 0;
          rootCtx.setRovingValue(value);
          itemEl.focus();
        }
      }
    },
    [rootCtx, value],
  );

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: handleOpenChange,
    placement,
    middleware: [offset(4), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "dialog" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const itemContextValue = React.useMemo(
    () => ({
      value,
      open,
      onOpenChange: handleOpenChange,
      contentId,
      refs,
      floatingStyles,
      getReferenceProps,
      getFloatingProps,
    }),
    [
      value,
      open,
      handleOpenChange,
      contentId,
      refs,
      floatingStyles,
      getReferenceProps,
      getFloatingProps,
    ],
  );

  return (
    <NavigationMenuItemContext value={itemContextValue}>
      <li
        ref={ref}
        role="none"
        className={cn("relative", className)}
        {...props}
      >
        {children}
      </li>
    </NavigationMenuItemContext>
  );
}

NavigationMenuItem.displayName = "NavigationMenuItem";

export { NavigationMenuItem };
