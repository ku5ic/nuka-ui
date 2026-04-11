import * as React from "react";
import { composeRefs } from "@nuka/utils/slot";
import { MenuItemBase } from "@nuka/components/Menu/MenuItemBase";
import type { MenuItemBaseProps } from "@nuka/components/Menu/MenuItemBase";
import { MenuCheckboxItemBase } from "@nuka/components/Menu/MenuCheckboxItemBase";
import type { MenuCheckboxItemBaseProps } from "@nuka/components/Menu/MenuCheckboxItemBase";
import { MenuRadioItemBase } from "@nuka/components/Menu/MenuRadioItemBase";
import type { MenuRadioItemBaseProps } from "@nuka/components/Menu/MenuRadioItemBase";

export interface MenuItemContextValue {
  getItemProps: (index: number) => {
    tabIndex: number;
    ref: (el: HTMLElement | null) => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
  };
  indexRef: React.RefObject<number>;
  close: () => void;
  onArrowLeft?: (() => void) | undefined;
  onArrowRight?: (() => void) | undefined;
}

const MenuItemContext = React.createContext<MenuItemContextValue | undefined>(
  undefined,
);

function useMenuItemContext(): MenuItemContextValue {
  const ctx = React.useContext(MenuItemContext);
  if (ctx === undefined) {
    throw new Error("Menu item must be used within a MenuContent component");
  }
  return ctx;
}

export function useAutoFocusFirstItem(
  open: boolean,
  focusItem: (index: number) => void,
  itemsRef: React.RefObject<(HTMLElement | null)[]>,
  itemIndexRef: React.RefObject<number>,
): void {
  React.useEffect(() => {
    if (open) {
      itemIndexRef.current = 0;
      const frame = requestAnimationFrame(() => {
        const items = itemsRef.current;
        for (let i = 0; i < items.length; i++) {
          if (items[i]) {
            focusItem(i);
            break;
          }
        }
      });
      return () => cancelAnimationFrame(frame);
    }
    itemsRef.current = [];
    return undefined;
  }, [open, focusItem, itemsRef, itemIndexRef]);
}

function createMenuItemKeyHandler(
  itemCtx: MenuItemContextValue,
  navProps: ReturnType<MenuItemContextValue["getItemProps"]>,
  onKeyDown: ((e: React.KeyboardEvent<HTMLDivElement>) => void) | undefined,
) {
  return (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft" && itemCtx.onArrowLeft) {
      e.preventDefault();
      itemCtx.onArrowLeft();
      return;
    }
    if (e.key === "ArrowRight" && itemCtx.onArrowRight) {
      e.preventDefault();
      itemCtx.onArrowRight();
      return;
    }
    navProps.onKeyDown(e);
    onKeyDown?.(e);
  };
}

export interface MenuItemWithNavProps extends Omit<
  MenuItemBaseProps,
  "onClose"
> {}

const MenuItemWithNav = React.forwardRef<HTMLDivElement, MenuItemWithNavProps>(
  ({ onKeyDown, ...props }, ref) => {
    const itemCtx = useMenuItemContext();
    const index = itemCtx.indexRef.current++;
    const navProps = itemCtx.getItemProps(index);
    const composedRef = composeRefs(ref, navProps.ref);

    return (
      <MenuItemBase
        ref={composedRef}
        tabIndex={navProps.tabIndex}
        onKeyDown={createMenuItemKeyHandler(itemCtx, navProps, onKeyDown)}
        onClose={itemCtx.close}
        {...props}
      />
    );
  },
);

MenuItemWithNav.displayName = "MenuItemWithNav";

export interface MenuCheckboxItemWithNavProps extends Omit<
  MenuCheckboxItemBaseProps,
  "onClose"
> {}

const MenuCheckboxItemWithNav = React.forwardRef<
  HTMLDivElement,
  MenuCheckboxItemWithNavProps
>(({ onKeyDown, ...props }, ref) => {
  const itemCtx = useMenuItemContext();
  const index = itemCtx.indexRef.current++;
  const navProps = itemCtx.getItemProps(index);
  const composedRef = composeRefs(ref, navProps.ref);

  return (
    <MenuCheckboxItemBase
      ref={composedRef}
      tabIndex={navProps.tabIndex}
      onKeyDown={createMenuItemKeyHandler(itemCtx, navProps, onKeyDown)}
      onClose={itemCtx.close}
      {...props}
    />
  );
});

MenuCheckboxItemWithNav.displayName = "MenuCheckboxItemWithNav";

export interface MenuRadioItemWithNavProps extends Omit<
  MenuRadioItemBaseProps,
  "onClose"
> {}

const MenuRadioItemWithNav = React.forwardRef<
  HTMLDivElement,
  MenuRadioItemWithNavProps
>(({ onKeyDown, ...props }, ref) => {
  const itemCtx = useMenuItemContext();
  const index = itemCtx.indexRef.current++;
  const navProps = itemCtx.getItemProps(index);
  const composedRef = composeRefs(ref, navProps.ref);

  return (
    <MenuRadioItemBase
      ref={composedRef}
      tabIndex={navProps.tabIndex}
      onKeyDown={createMenuItemKeyHandler(itemCtx, navProps, onKeyDown)}
      onClose={itemCtx.close}
      {...props}
    />
  );
});

MenuRadioItemWithNav.displayName = "MenuRadioItemWithNav";

export {
  MenuItemContext,
  useMenuItemContext,
  MenuItemWithNav,
  MenuCheckboxItemWithNav,
  MenuRadioItemWithNav,
};
