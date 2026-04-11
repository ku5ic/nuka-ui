import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { composeRefs } from "@nuka/utils/slot";
import { useMenuNavigation } from "@nuka/hooks/use-menu-navigation";
import { Portal } from "@nuka/utils/portal";
import { useContextMenuContext } from "@nuka/components/ContextMenu/ContextMenu.context";
import { menuContentVariants } from "@nuka/components/Menu/menuItemVariants";
import {
  MenuItemContext,
  useAutoFocusFirstItem,
} from "@nuka/components/Menu/MenuContentBase";

export interface ContextMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const ContextMenuContent = React.forwardRef<
  HTMLDivElement,
  ContextMenuContentProps
>(({ className, children, ...props }, ref) => {
  const ctx = useContextMenuContext();
  const contentRef = React.useRef<HTMLDivElement>(null);
  const composedRef = composeRefs(ref, contentRef, ctx.refs.setFloating);

  const { getItemProps, focusItem, itemsRef } = useMenuNavigation({
    onEscape: () => ctx.onOpenChange(false),
    onTab: () => ctx.onOpenChange(false),
  });

  const itemIndexRef = React.useRef(0);

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
});

ContextMenuContent.displayName = "ContextMenuContent";

export { ContextMenuContent };
