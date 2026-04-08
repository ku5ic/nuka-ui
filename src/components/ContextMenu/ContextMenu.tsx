import * as React from "react";
import {
  useFloating,
  useDismiss,
  useRole,
  useInteractions,
  offset,
  flip,
  shift,
  autoUpdate,
} from "@floating-ui/react";
import { cn } from "@nuka/utils/cn";
import { useMenuNavigation } from "@nuka/utils/use-menu-navigation";
import { Portal } from "@nuka/utils/portal";
import { Slot, composeRefs } from "@nuka/utils/slot";
import { ContextMenuContext } from "@nuka/components/ContextMenu/ContextMenuContext";
import type { ContextMenuContextValue } from "@nuka/components/ContextMenu/ContextMenuContext";
import {
  MenuRadioGroupBase,
  MenuSeparatorBase,
  MenuLabelBase,
} from "@nuka/components/Menu/MenuItemBase";
import type { MenuRadioGroupBaseProps } from "@nuka/components/Menu/MenuItemBase";
import { menuContentVariants } from "@nuka/components/Menu/menuItemVariants";
import {
  MenuItemContext,
  useAutoFocusFirstItem,
  MenuItemWithNav,
  MenuCheckboxItemWithNav,
  MenuRadioItemWithNav,
} from "@nuka/components/Menu/MenuContentBase";
import type {
  MenuItemWithNavProps,
  MenuCheckboxItemWithNavProps,
  MenuRadioItemWithNavProps,
} from "@nuka/components/Menu/MenuContentBase";

export interface ContextMenuProps {
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}

function ContextMenu({ children, onOpenChange }: ContextMenuProps) {
  const [open, setOpen] = React.useState(false);

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      setOpen(next);
      onOpenChange?.(next);
    },
    [onOpenChange],
  );

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: handleOpenChange,
    placement: "bottom-start",
    middleware: [offset(0), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
    strategy: "fixed",
  });

  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "menu" });

  const { getFloatingProps } = useInteractions([dismiss, role]);

  const contextValue: ContextMenuContextValue = React.useMemo(
    () => ({
      open,
      onOpenChange: handleOpenChange,
      refs,
      floatingStyles,
      getFloatingProps,
    }),
    [open, handleOpenChange, refs, floatingStyles, getFloatingProps],
  );

  return (
    <ContextMenuContext value={contextValue}>{children}</ContextMenuContext>
  );
}

ContextMenu.displayName = "ContextMenu";

export interface ContextMenuTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const ContextMenuTrigger = React.forwardRef<
  HTMLDivElement,
  ContextMenuTriggerProps
>(({ asChild = false, children, onContextMenu, ...props }, ref) => {
  const ctx = useContextMenuContextInternal();
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

  return (
    <Comp
      ref={ref}
      onContextMenu={handleContextMenu}
      {...(props as React.HTMLAttributes<HTMLDivElement>)}
    >
      {children}
    </Comp>
  );
});

ContextMenuTrigger.displayName = "ContextMenuTrigger";

export interface ContextMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const ContextMenuContent = React.forwardRef<
  HTMLDivElement,
  ContextMenuContentProps
>(({ className, children, ...props }, ref) => {
  const ctx = useContextMenuContextInternal();
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

function useContextMenuContextInternal() {
  const ctx = React.useContext(ContextMenuContext);
  if (ctx === undefined) {
    throw new Error(
      "useContextMenuContext must be used within a <ContextMenu> component",
    );
  }
  return ctx;
}

export type ContextMenuItemProps = MenuItemWithNavProps;

const ContextMenuItem = React.forwardRef<HTMLDivElement, ContextMenuItemProps>(
  (props, ref) => <MenuItemWithNav ref={ref} {...props} />,
);

ContextMenuItem.displayName = "ContextMenuItem";

export type ContextMenuCheckboxItemProps = MenuCheckboxItemWithNavProps;

const ContextMenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  ContextMenuCheckboxItemProps
>((props, ref) => <MenuCheckboxItemWithNav ref={ref} {...props} />);

ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem";

export interface ContextMenuRadioGroupProps extends MenuRadioGroupBaseProps {}

const ContextMenuRadioGroup = React.forwardRef<
  HTMLDivElement,
  ContextMenuRadioGroupProps
>((props, ref) => <MenuRadioGroupBase ref={ref} {...props} />);

ContextMenuRadioGroup.displayName = "ContextMenuRadioGroup";

export type ContextMenuRadioItemProps = MenuRadioItemWithNavProps;

const ContextMenuRadioItem = React.forwardRef<
  HTMLDivElement,
  ContextMenuRadioItemProps
>((props, ref) => <MenuRadioItemWithNav ref={ref} {...props} />);

ContextMenuRadioItem.displayName = "ContextMenuRadioItem";

export interface ContextMenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

const ContextMenuSeparator = React.forwardRef<
  HTMLDivElement,
  ContextMenuSeparatorProps
>((props, ref) => <MenuSeparatorBase ref={ref} {...props} />);

ContextMenuSeparator.displayName = "ContextMenuSeparator";

export interface ContextMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

const ContextMenuLabel = React.forwardRef<
  HTMLDivElement,
  ContextMenuLabelProps
>((props, ref) => <MenuLabelBase ref={ref} {...props} />);

ContextMenuLabel.displayName = "ContextMenuLabel";

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuLabel,
};
