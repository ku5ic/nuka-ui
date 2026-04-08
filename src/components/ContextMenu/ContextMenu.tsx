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
  MenuItemBase,
  MenuCheckboxItemBase,
  MenuRadioGroupBase,
  MenuRadioItemBase,
  MenuSeparatorBase,
  MenuLabelBase,
} from "@nuka/components/Menu/MenuItemBase";
import type {
  MenuItemBaseProps,
  MenuCheckboxItemBaseProps,
  MenuRadioGroupBaseProps,
  MenuRadioItemBaseProps,
} from "@nuka/components/Menu/MenuItemBase";
import { menuContentVariants } from "@nuka/components/Menu/menuItemVariants";

// ContextMenu (root)

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

// ContextMenuTrigger

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

// ContextMenuContent

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

  React.useEffect(() => {
    if (ctx.open) {
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
  }, [ctx.open, focusItem, itemsRef]);

  if (!ctx.open) return null;

  itemIndexRef.current = 0;

  const floatingProps = ctx.getFloatingProps(props);

  return (
    <Portal>
      <ContextMenuItemContext
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
      </ContextMenuItemContext>
    </Portal>
  );
});

ContextMenuContent.displayName = "ContextMenuContent";

// Internal context for item index tracking

interface ContextMenuItemContextValue {
  getItemProps: (index: number) => {
    tabIndex: number;
    ref: (el: HTMLElement | null) => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
  };
  indexRef: React.RefObject<number>;
  close: () => void;
}

const ContextMenuItemContext = React.createContext<
  ContextMenuItemContextValue | undefined
>(undefined);

function useContextMenuItemContext(): ContextMenuItemContextValue {
  const ctx = React.useContext(ContextMenuItemContext);
  if (ctx === undefined) {
    throw new Error(
      "Menu item must be used within a ContextMenuContent component",
    );
  }
  return ctx;
}

function useContextMenuContextInternal() {
  const ctx = React.useContext(ContextMenuContext);
  if (ctx === undefined) {
    throw new Error(
      "useContextMenuContext must be used within a <ContextMenu> component",
    );
  }
  return ctx;
}

// ContextMenuItem

export interface ContextMenuItemProps extends Omit<
  MenuItemBaseProps,
  "onClose"
> {}

const ContextMenuItem = React.forwardRef<HTMLDivElement, ContextMenuItemProps>(
  ({ onKeyDown, ...props }, ref) => {
    const itemCtx = useContextMenuItemContext();
    const index = itemCtx.indexRef.current++;
    const navProps = itemCtx.getItemProps(index);
    const composedRef = composeRefs(ref, navProps.ref);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      navProps.onKeyDown(e);
      onKeyDown?.(e);
    };

    return (
      <MenuItemBase
        ref={composedRef}
        tabIndex={navProps.tabIndex}
        onKeyDown={handleKeyDown}
        onClose={itemCtx.close}
        {...props}
      />
    );
  },
);

ContextMenuItem.displayName = "ContextMenuItem";

// ContextMenuCheckboxItem

export interface ContextMenuCheckboxItemProps extends Omit<
  MenuCheckboxItemBaseProps,
  "onClose"
> {}

const ContextMenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  ContextMenuCheckboxItemProps
>(({ onKeyDown, ...props }, ref) => {
  const itemCtx = useContextMenuItemContext();
  const index = itemCtx.indexRef.current++;
  const navProps = itemCtx.getItemProps(index);
  const composedRef = composeRefs(ref, navProps.ref);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    navProps.onKeyDown(e);
    onKeyDown?.(e);
  };

  return (
    <MenuCheckboxItemBase
      ref={composedRef}
      tabIndex={navProps.tabIndex}
      onKeyDown={handleKeyDown}
      onClose={itemCtx.close}
      {...props}
    />
  );
});

ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem";

// ContextMenuRadioGroup

export interface ContextMenuRadioGroupProps extends MenuRadioGroupBaseProps {}

const ContextMenuRadioGroup = React.forwardRef<
  HTMLDivElement,
  ContextMenuRadioGroupProps
>((props, ref) => <MenuRadioGroupBase ref={ref} {...props} />);

ContextMenuRadioGroup.displayName = "ContextMenuRadioGroup";

// ContextMenuRadioItem

export interface ContextMenuRadioItemProps extends Omit<
  MenuRadioItemBaseProps,
  "onClose"
> {}

const ContextMenuRadioItem = React.forwardRef<
  HTMLDivElement,
  ContextMenuRadioItemProps
>(({ onKeyDown, ...props }, ref) => {
  const itemCtx = useContextMenuItemContext();
  const index = itemCtx.indexRef.current++;
  const navProps = itemCtx.getItemProps(index);
  const composedRef = composeRefs(ref, navProps.ref);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    navProps.onKeyDown(e);
    onKeyDown?.(e);
  };

  return (
    <MenuRadioItemBase
      ref={composedRef}
      tabIndex={navProps.tabIndex}
      onKeyDown={handleKeyDown}
      onClose={itemCtx.close}
      {...props}
    />
  );
});

ContextMenuRadioItem.displayName = "ContextMenuRadioItem";

// ContextMenuSeparator

export interface ContextMenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

const ContextMenuSeparator = React.forwardRef<
  HTMLDivElement,
  ContextMenuSeparatorProps
>((props, ref) => <MenuSeparatorBase ref={ref} {...props} />);

ContextMenuSeparator.displayName = "ContextMenuSeparator";

// ContextMenuLabel

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
