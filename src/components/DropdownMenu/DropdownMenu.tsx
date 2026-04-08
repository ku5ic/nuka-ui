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
import { useControllableState } from "@nuka/utils/use-controllable-state";
import { useMenuNavigation } from "@nuka/utils/use-menu-navigation";
import { Portal } from "@nuka/utils/portal";
import { Slot, composeRefs } from "@nuka/utils/slot";
import { DropdownMenuContext } from "@nuka/components/DropdownMenu/DropdownMenuContext";
import type { DropdownMenuContextValue } from "@nuka/components/DropdownMenu/DropdownMenuContext";
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

// DropdownMenu (root)

export interface DropdownMenuProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function DropdownMenu({
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
}: DropdownMenuProps) {
  const [currentOpen, handleOpenChange] = useControllableState(
    controlledOpen,
    defaultOpen,
    onOpenChange,
  );

  const { refs, floatingStyles, context } = useFloating({
    open: currentOpen,
    onOpenChange: handleOpenChange,
    placement: "bottom-start" as Placement,
    middleware: [offset(4), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "menu" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const contextValue: DropdownMenuContextValue = React.useMemo(
    () => ({
      open: currentOpen,
      onOpenChange: handleOpenChange,
      refs,
      floatingStyles,
      getReferenceProps,
      getFloatingProps,
    }),
    [currentOpen, handleOpenChange, refs, floatingStyles, getReferenceProps, getFloatingProps],
  );

  return <DropdownMenuContext value={contextValue}>{children}</DropdownMenuContext>;
}

DropdownMenu.displayName = "DropdownMenu";

// DropdownMenuTrigger

export interface DropdownMenuTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  ({ asChild = false, children, ...props }, ref) => {
    const ctx = useDropdownMenuContextInternal();
    const composedRef = composeRefs(ref, ctx.refs.setReference);
    const Comp = asChild ? Slot : "button";
    const triggerProps = ctx.getReferenceProps(props);

    return (
      <Comp
        ref={composedRef}
        type={asChild ? undefined : "button"}
        aria-haspopup="menu"
        aria-expanded={ctx.open}
        {...(triggerProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </Comp>
    );
  },
);

DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

// DropdownMenuContent

export interface DropdownMenuContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ className, children, ...props }, ref) => {
    const ctx = useDropdownMenuContextInternal();
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
        <DropdownMenuItemContext value={{ getItemProps, indexRef: itemIndexRef, close: () => ctx.onOpenChange(false) }}>
          <div
            ref={composedRef}
            style={ctx.floatingStyles}
            data-state="open"
            {...floatingProps}
            className={cn(menuContentVariants(), className)}
          >
            {children}
          </div>
        </DropdownMenuItemContext>
      </Portal>
    );
  },
);

DropdownMenuContent.displayName = "DropdownMenuContent";

// Internal context for item index tracking

interface DropdownMenuItemContextValue {
  getItemProps: (index: number) => {
    tabIndex: number;
    ref: (el: HTMLElement | null) => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
  };
  indexRef: React.RefObject<number>;
  close: () => void;
}

const DropdownMenuItemContext = React.createContext<DropdownMenuItemContextValue | undefined>(
  undefined,
);

function useDropdownMenuItemContext(): DropdownMenuItemContextValue {
  const ctx = React.useContext(DropdownMenuItemContext);
  if (ctx === undefined) {
    throw new Error(
      "Menu item must be used within a MenuContent component",
    );
  }
  return ctx;
}

function useDropdownMenuContextInternal() {
  const ctx = React.useContext(
    DropdownMenuContext,
  );
  if (ctx === undefined) {
    throw new Error(
      "useDropdownMenuContext must be used within a <DropdownMenu> component",
    );
  }
  return ctx;
}

// DropdownMenuItem

export interface DropdownMenuItemProps
  extends Omit<MenuItemBaseProps, "onClose"> {}

const DropdownMenuItem = React.forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  ({ onKeyDown, ...props }, ref) => {
    const itemCtx = useDropdownMenuItemContext();
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

DropdownMenuItem.displayName = "DropdownMenuItem";

// DropdownMenuCheckboxItem

export interface DropdownMenuCheckboxItemProps
  extends Omit<MenuCheckboxItemBaseProps, "onClose"> {}

const DropdownMenuCheckboxItem = React.forwardRef<HTMLDivElement, DropdownMenuCheckboxItemProps>(
  ({ onKeyDown, ...props }, ref) => {
    const itemCtx = useDropdownMenuItemContext();
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
  },
);

DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

// DropdownMenuRadioGroup

export interface DropdownMenuRadioGroupProps extends MenuRadioGroupBaseProps {}

const DropdownMenuRadioGroup = React.forwardRef<HTMLDivElement, DropdownMenuRadioGroupProps>(
  (props, ref) => <MenuRadioGroupBase ref={ref} {...props} />,
);

DropdownMenuRadioGroup.displayName = "DropdownMenuRadioGroup";

// DropdownMenuRadioItem

export interface DropdownMenuRadioItemProps
  extends Omit<MenuRadioItemBaseProps, "onClose"> {}

const DropdownMenuRadioItem = React.forwardRef<HTMLDivElement, DropdownMenuRadioItemProps>(
  ({ onKeyDown, ...props }, ref) => {
    const itemCtx = useDropdownMenuItemContext();
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
  },
);

DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

// DropdownMenuSeparator

export interface DropdownMenuSeparatorProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const DropdownMenuSeparator = React.forwardRef<HTMLDivElement, DropdownMenuSeparatorProps>(
  (props, ref) => <MenuSeparatorBase ref={ref} {...props} />,
);

DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

// DropdownMenuLabel

export interface DropdownMenuLabelProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const DropdownMenuLabel = React.forwardRef<HTMLDivElement, DropdownMenuLabelProps>(
  (props, ref) => <MenuLabelBase ref={ref} {...props} />,
);

DropdownMenuLabel.displayName = "DropdownMenuLabel";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
};
