"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { composeRefs } from "@nuka/utils/slot";
import { useMenuNavigation } from "@nuka/hooks/use-menu-navigation";
import { Portal } from "@nuka/utils/portal";
import { menuContentVariants } from "@nuka/components/Menu/menuItemVariants";
import {
  MenuItemContext,
  useAutoFocusFirstItem,
} from "@nuka/components/Menu/MenuContentBase";
import { useDropdownMenuContext } from "@nuka/components/DropdownMenu/DropdownMenu.context";

export interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
}

function DropdownMenuContent({
  ref,
  className,
  children,
  ...props
}: DropdownMenuContentProps) {
  const ctx = useDropdownMenuContext();
  const contentRef = React.useRef<HTMLDivElement>(null);
  const composedRef = composeRefs(ref, contentRef, ctx.refs.setFloating);

  const { getItemProps, focusItem, itemsRef, resetTypeAhead } =
    useMenuNavigation({
      onEscape: () => ctx.onOpenChange(false),
      onTab: () => ctx.onOpenChange(false),
    });

  const itemIndexRef = React.useRef(0);

  React.useEffect(() => {
    if (!ctx.open) resetTypeAhead();
  }, [ctx.open, resetTypeAhead]);

  useAutoFocusFirstItem(ctx.open, focusItem, itemsRef, itemIndexRef);

  if (!ctx.open) return null;

  itemIndexRef.current = 0;

  const floatingProps = ctx.getFloatingProps(props);

  return (
    <Portal>
      <MenuItemContext
        value={{
          getItemProps,
          indexRef: itemIndexRef,
          close: () => ctx.onOpenChange(false),
        }}
      >
        <div
          ref={composedRef}
          style={ctx.floatingStyles}
          data-state="open"
          {...floatingProps}
          className={cn(menuContentVariants(), className)}
        >
          {children}
        </div>
      </MenuItemContext>
    </Portal>
  );
}

DropdownMenuContent.displayName = "DropdownMenuContent";

export { DropdownMenuContent };
