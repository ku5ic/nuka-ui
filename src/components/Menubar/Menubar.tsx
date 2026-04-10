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
import { cn } from "@nuka/utils/cn";
import { useMenuNavigation } from "@nuka/utils/use-menu-navigation";
import { Portal } from "@nuka/utils/portal";
import { composeRefs } from "@nuka/utils/slot";
import {
  MenubarContext,
  MenubarMenuContext,
  useMenubarContext,
  useMenubarMenuContext,
} from "@nuka/components/Menubar/MenubarContext";
import type {
  MenubarContextValue,
  MenubarMenuContextValue,
} from "@nuka/components/Menubar/MenubarContext";
import {
  MenuRadioGroupBase,
  MenuSeparatorBase,
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

export interface MenubarProps extends React.HTMLAttributes<HTMLDivElement> {}

const Menubar = React.forwardRef<HTMLDivElement, MenubarProps>(
  ({ className, children, ...props }, ref) => {
    const [openValue, setOpenValue] = React.useState<string | null>(null);
    const triggerRefs = React.useRef(new Map<string, HTMLButtonElement>());
    const menuValues = React.useRef<string[]>([]);

    const registerTrigger = React.useCallback(
      (value: string, el: HTMLButtonElement | null) => {
        if (el) {
          triggerRefs.current.set(value, el);
        } else {
          triggerRefs.current.delete(value);
        }
      },
      [],
    );

    const registerMenu = React.useCallback((value: string) => {
      if (!menuValues.current.includes(value)) {
        menuValues.current.push(value);
      }
    }, []);

    const openMenu = React.useCallback((value: string) => {
      setOpenValue(value);
    }, []);

    const closeMenu = React.useCallback(() => {
      setOpenValue(null);
    }, []);

    const contextValue: MenubarContextValue = React.useMemo(
      () => ({
        openValue,
        openMenu,
        closeMenu,
        triggerRefs,
        registerTrigger,
        menuValues,
        registerMenu,
      }),
      [openValue, openMenu, closeMenu, registerTrigger, registerMenu],
    );

    return (
      <MenubarContext value={contextValue}>
        <div
          ref={ref}
          role="menubar"
          className={cn(
            "inline-flex items-center gap-(--space-1)",
            "rounded-(--radius-md) border border-(--nuka-border-base)",
            "bg-(--nuka-bg-base) p-(--space-1)",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </MenubarContext>
    );
  },
);

Menubar.displayName = "Menubar";

export interface MenubarMenuProps {
  value: string;
  children: React.ReactNode;
}

function MenubarMenu({ value, children }: MenubarMenuProps) {
  const bar = useMenubarContext();

  React.useEffect(() => {
    bar.registerMenu(value);
  }, [bar, value]);

  const open = bar.openValue === value;

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      if (next) {
        bar.openMenu(value);
      } else {
        bar.closeMenu();
      }
    },
    [bar, value],
  );

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: handleOpenChange,
    placement: "bottom-start",
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

  const menuContextValue: MenubarMenuContextValue = React.useMemo(
    () => ({
      value,
      open,
      onOpenChange: handleOpenChange,
      refs,
      floatingStyles,
      getReferenceProps,
      getFloatingProps,
    }),
    [
      value,
      open,
      handleOpenChange,
      refs,
      floatingStyles,
      getReferenceProps,
      getFloatingProps,
    ],
  );

  return (
    <MenubarMenuContext value={menuContextValue}>{children}</MenubarMenuContext>
  );
}

MenubarMenu.displayName = "MenubarMenu";

export interface MenubarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const MenubarTrigger = React.forwardRef<HTMLButtonElement, MenubarTriggerProps>(
  ({ className, children, onKeyDown, ...props }, ref) => {
    const bar = useMenubarContext();
    const menu = useMenubarMenuContext();
    const composedRef = composeRefs(
      ref,
      menu.refs.setReference,
      (el: HTMLButtonElement | null) => {
        bar.registerTrigger(menu.value, el);
      },
    );

    const getAdjacentValue = (direction: -1 | 1): string | undefined => {
      const values = bar.menuValues.current;
      const currentIndex = values.indexOf(menu.value);
      if (currentIndex === -1) return undefined;
      const nextIndex =
        (currentIndex + direction + values.length) % values.length;
      return values[nextIndex];
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      onKeyDown?.(e);

      if (e.key === "ArrowRight") {
        e.preventDefault();
        const nextValue = getAdjacentValue(1);
        if (nextValue !== undefined) {
          if (menu.open) {
            bar.openMenu(nextValue);
          }
          bar.triggerRefs.current.get(nextValue)?.focus();
        }
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prevValue = getAdjacentValue(-1);
        if (prevValue !== undefined) {
          if (menu.open) {
            bar.openMenu(prevValue);
          }
          bar.triggerRefs.current.get(prevValue)?.focus();
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (!menu.open) {
          bar.openMenu(menu.value);
        }
      }
    };

    const triggerProps = menu.getReferenceProps({
      ...props,
      onKeyDown: handleKeyDown,
    });

    return (
      <button
        ref={composedRef}
        type="button"
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded={menu.open}
        className={cn(
          "inline-flex items-center justify-center",
          "rounded-(--radius-sm) px-(--space-3) py-(--space-1.5)",
          "text-sm font-medium",
          "text-(--nuka-text-base)",
          "select-none cursor-default",
          "hover:bg-(--nuka-bg-muted)",
          "focus-visible:bg-(--nuka-bg-muted)",
          "focus-visible:outline-2 focus-visible:outline-offset-2",
          "focus-visible:outline-(--nuka-border-focus)",
          "data-[state=open]:bg-(--nuka-bg-muted)",
          className,
        )}
        data-state={menu.open ? "open" : "closed"}
        // Safe: Floating UI getReferenceProps() returns Record<string, unknown>;
        // values are standard DOM event handlers.
        {...(triggerProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  },
);

MenubarTrigger.displayName = "MenubarTrigger";

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

    const { getItemProps, focusItem, itemsRef } = useMenuNavigation({
      onEscape: handleEscape,
      onTab: handleTab,
    });

    const itemIndexRef = React.useRef(0);

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

export type MenubarItemProps = MenuItemWithNavProps;

const MenubarItem = React.forwardRef<HTMLDivElement, MenubarItemProps>(
  (props, ref) => <MenuItemWithNav ref={ref} {...props} />,
);

MenubarItem.displayName = "MenubarItem";

export type MenubarCheckboxItemProps = MenuCheckboxItemWithNavProps;

const MenubarCheckboxItem = React.forwardRef<
  HTMLDivElement,
  MenubarCheckboxItemProps
>((props, ref) => <MenuCheckboxItemWithNav ref={ref} {...props} />);

MenubarCheckboxItem.displayName = "MenubarCheckboxItem";

export interface MenubarRadioGroupProps extends MenuRadioGroupBaseProps {}

const MenubarRadioGroup = React.forwardRef<
  HTMLDivElement,
  MenubarRadioGroupProps
>((props, ref) => <MenuRadioGroupBase ref={ref} {...props} />);

MenubarRadioGroup.displayName = "MenubarRadioGroup";

export type MenubarRadioItemProps = MenuRadioItemWithNavProps;

const MenubarRadioItem = React.forwardRef<
  HTMLDivElement,
  MenubarRadioItemProps
>((props, ref) => <MenuRadioItemWithNav ref={ref} {...props} />);

MenubarRadioItem.displayName = "MenubarRadioItem";

export interface MenubarSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

const MenubarSeparator = React.forwardRef<
  HTMLDivElement,
  MenubarSeparatorProps
>((props, ref) => <MenuSeparatorBase ref={ref} {...props} />);

MenubarSeparator.displayName = "MenubarSeparator";

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
};
