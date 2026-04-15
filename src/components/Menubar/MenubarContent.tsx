"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { composeRefs } from "@nuka/utils/slot";
import { Portal } from "@nuka/utils/portal";
import { useMenuNavigation } from "@nuka/hooks/use-menu-navigation";
import {
  useMenubarContext,
  useMenubarMenuContext,
} from "@nuka/components/Menubar/Menubar.context";
import { menuContentVariants } from "@nuka/components/Menu/menuItemVariants";
import {
  MenuItemContext,
  useAutoFocusFirstItem,
} from "@nuka/components/Menu/MenuContentBase";

export interface MenubarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const MenubarContent = React.forwardRef<HTMLDivElement, MenubarContentProps>(
  ({ className, children, ...props }, ref) => {
    const bar = useMenubarContext();
    const menu = useMenubarMenuContext();
    const contentRef = React.useRef<HTMLDivElement>(null);
    const composedRef = composeRefs(ref, contentRef, menu.refs.setFloating);

    const handleEscape = React.useCallback(() => {
      menu.onOpenChange(false);
      bar.triggerRefs.current.get(menu.value)?.focus();
    }, [menu, bar]);

    const handleTab = React.useCallback(() => {
      menu.onOpenChange(false);
    }, [menu]);

    const { getItemProps, focusItem, itemsRef, resetTypeAhead } =
      useMenuNavigation({
        onEscape: handleEscape,
        onTab: handleTab,
      });

    const itemIndexRef = React.useRef(0);

    React.useEffect(() => {
      if (!menu.open) resetTypeAhead();
    }, [menu.open, resetTypeAhead]);

    const handleArrowToAdjacentMenu = React.useCallback(
      (direction: -1 | 1) => {
        const values = bar.menuValues.current;
        const currentIndex = values.indexOf(menu.value);
        if (currentIndex === -1) return;
        const nextIndex =
          (currentIndex + direction + values.length) % values.length;
        const nextValue = values[nextIndex];
        if (nextValue !== undefined) {
          bar.openMenu(nextValue);
          bar.triggerRefs.current.get(nextValue)?.focus();
        }
      },
      [bar, menu.value],
    );

    useAutoFocusFirstItem(menu.open, focusItem, itemsRef, itemIndexRef);

    if (!menu.open) return null;

    itemIndexRef.current = 0;

    const floatingProps = menu.getFloatingProps(props);

    return (
      <Portal>
        <MenuItemContext
          value={{
            getItemProps,
            indexRef: itemIndexRef,
            close: () => menu.onOpenChange(false),
            onArrowLeft: () => handleArrowToAdjacentMenu(-1),
            onArrowRight: () => handleArrowToAdjacentMenu(1),
          }}
        >
          <div
            ref={composedRef}
            style={menu.floatingStyles}
            data-state="open"
            {...floatingProps}
            className={cn(menuContentVariants(), className)}
          >
            {children}
          </div>
        </MenuItemContext>
      </Portal>
    );
  },
);

MenubarContent.displayName = "MenubarContent";

export { MenubarContent };
