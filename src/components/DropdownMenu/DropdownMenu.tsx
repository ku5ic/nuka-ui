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
import { DropdownMenuContext } from "@nuka/components/DropdownMenu/DropdownMenu.context";
import type { DropdownMenuContextValue } from "@nuka/components/DropdownMenu/DropdownMenu.context";
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
    [
      currentOpen,
      handleOpenChange,
      refs,
      floatingStyles,
      getReferenceProps,
      getFloatingProps,
    ],
  );

  return (
    <DropdownMenuContext value={contextValue}>{children}</DropdownMenuContext>
  );
}

DropdownMenu.displayName = "DropdownMenu";

export interface DropdownMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuTriggerProps
>(({ asChild = false, children, ...props }, ref) => {
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
      // Safe: Floating UI's getReferenceProps() returns Record<string, unknown>;
      // values are standard DOM event handlers (onClick, onKeyDown, etc.).
      {...(triggerProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </Comp>
  );
});

DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

export interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  DropdownMenuContentProps
>(({ className, children, ...props }, ref) => {
  const ctx = useDropdownMenuContextInternal();
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

DropdownMenuContent.displayName = "DropdownMenuContent";

function useDropdownMenuContextInternal() {
  const ctx = React.useContext(DropdownMenuContext);
  if (ctx === undefined) {
    throw new Error(
      "useDropdownMenuContext must be used within a <DropdownMenu> component",
    );
  }
  return ctx;
}

export type DropdownMenuItemProps = MenuItemWithNavProps;

const DropdownMenuItem = React.forwardRef<
  HTMLDivElement,
  DropdownMenuItemProps
>((props, ref) => <MenuItemWithNav ref={ref} {...props} />);

DropdownMenuItem.displayName = "DropdownMenuItem";

export type DropdownMenuCheckboxItemProps = MenuCheckboxItemWithNavProps;

const DropdownMenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  DropdownMenuCheckboxItemProps
>((props, ref) => <MenuCheckboxItemWithNav ref={ref} {...props} />);

DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

export interface DropdownMenuRadioGroupProps extends MenuRadioGroupBaseProps {}

const DropdownMenuRadioGroup = React.forwardRef<
  HTMLDivElement,
  DropdownMenuRadioGroupProps
>((props, ref) => <MenuRadioGroupBase ref={ref} {...props} />);

DropdownMenuRadioGroup.displayName = "DropdownMenuRadioGroup";

export type DropdownMenuRadioItemProps = MenuRadioItemWithNavProps;

const DropdownMenuRadioItem = React.forwardRef<
  HTMLDivElement,
  DropdownMenuRadioItemProps
>((props, ref) => <MenuRadioItemWithNav ref={ref} {...props} />);

DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

export interface DropdownMenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  DropdownMenuSeparatorProps
>((props, ref) => <MenuSeparatorBase ref={ref} {...props} />);

DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

export interface DropdownMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

const DropdownMenuLabel = React.forwardRef<
  HTMLDivElement,
  DropdownMenuLabelProps
>((props, ref) => <MenuLabelBase ref={ref} {...props} />);

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
