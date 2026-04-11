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
import { Slot, composeRefs } from "@nuka/utils/slot";
import { Portal } from "@nuka/utils/portal";
import { useFocusFirstInteractive } from "@nuka/utils/use-focus-first-interactive";
import { Icon } from "@nuka/components/Icon";
import {
  NavigationMenuContext,
  NavigationMenuItemContext,
  NavigationMenuContentContext,
  useNavigationMenuContext,
  useNavigationMenuItemContext,
  useIsInsideContent,
} from "@nuka/components/NavigationMenu/NavigationMenu.context";

export interface NavigationMenuProps extends React.HTMLAttributes<HTMLElement> {
  "aria-label"?: string;
}

const NavigationMenu = React.forwardRef<HTMLElement, NavigationMenuProps>(
  (
    {
      className,
      children,
      "aria-label": ariaLabel = "Main navigation",
      ...props
    },
    ref,
  ) => {
    const [activeValue, setActiveValue] = React.useState<string | null>(null);
    const itemRefs = React.useRef(new Map<string, HTMLElement>());
    const itemValues = React.useRef<string[]>([]);
    const itemLabels = React.useRef(new Map<string, string>());
    const [rovingValue, setRovingValue] = React.useState<string | null>(null);

    const openMenu = React.useCallback((value: string) => {
      setActiveValue(value);
    }, []);

    const closeMenu = React.useCallback(() => {
      setActiveValue(null);
    }, []);

    const registerItem = React.useCallback(
      (value: string, el: HTMLElement | null) => {
        if (el) {
          itemRefs.current.set(value, el);
          if (!itemValues.current.includes(value)) {
            itemValues.current.push(value);
            setRovingValue((prev) => prev ?? value);
          }
        } else {
          itemRefs.current.delete(value);
          itemValues.current = itemValues.current.filter((v) => v !== value);
        }
      },
      [],
    );

    const contextValue = React.useMemo(
      () => ({
        activeValue,
        openMenu,
        closeMenu,
        registerItem,
        itemValues,
        itemRefs,
        itemLabels,
        rovingValue,
        setRovingValue,
      }),
      [activeValue, openMenu, closeMenu, registerItem, rovingValue],
    );

    return (
      <NavigationMenuContext value={contextValue}>
        <nav
          ref={ref}
          aria-label={ariaLabel}
          className={cn("relative", className)}
          {...props}
        >
          {children}
        </nav>
      </NavigationMenuContext>
    );
  },
);

NavigationMenu.displayName = "NavigationMenu";

export interface NavigationMenuListProps extends React.HTMLAttributes<HTMLUListElement> {}

const NavigationMenuList = React.forwardRef<
  HTMLUListElement,
  NavigationMenuListProps
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex items-center gap-(--space-1)", "list-none", className)}
    {...props}
  />
));

NavigationMenuList.displayName = "NavigationMenuList";

export interface NavigationMenuItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  value: string;
  placement?: Placement;
}

const NavigationMenuItem = React.forwardRef<
  HTMLLIElement,
  NavigationMenuItemProps
>(
  (
    { value, placement = "bottom-start", className, children, ...props },
    ref,
  ) => {
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
  },
);

NavigationMenuItem.displayName = "NavigationMenuItem";

export interface NavigationMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

function navigateToAdjacentItem(
  rootCtx: ReturnType<typeof useNavigationMenuContext>,
  currentValue: string,
  direction: -1 | 1,
): HTMLElement | undefined {
  const values = rootCtx.itemValues.current;
  const currentIndex = values.indexOf(currentValue);
  if (currentIndex === -1) return undefined;
  const nextIndex = (currentIndex + direction + values.length) % values.length;
  const nextValue = values[nextIndex];
  if (nextValue === undefined) return undefined;
  const nextEl = rootCtx.itemRefs.current.get(nextValue);
  if (nextEl) {
    const currentEl = rootCtx.itemRefs.current.get(currentValue);
    if (currentEl) currentEl.tabIndex = -1;
    nextEl.tabIndex = 0;
    rootCtx.setRovingValue(nextValue);
    nextEl.focus();
  }
  return nextEl;
}

const NavigationMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  NavigationMenuTriggerProps
>(({ className, children, onClick, onKeyDown, ...props }, ref) => {
  const rootCtx = useNavigationMenuContext();
  const itemCtx = useNavigationMenuItemContext();
  const composedRef = composeRefs(
    ref,
    itemCtx.refs.setReference,
    (el: HTMLButtonElement | null) => {
      rootCtx.registerItem(itemCtx.value, el);
      if (el) {
        rootCtx.itemLabels.current.set(
          itemCtx.value,
          el.textContent.trim() || itemCtx.value,
        );
      } else {
        rootCtx.itemLabels.current.delete(itemCtx.value);
      }
    },
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    itemCtx.onOpenChange(!itemCtx.open);
    onClick?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;

    switch (e.key) {
      case "ArrowRight": {
        e.preventDefault();
        if (itemCtx.open) {
          itemCtx.onOpenChange(false);
        }
        navigateToAdjacentItem(rootCtx, itemCtx.value, 1);
        break;
      }
      case "ArrowLeft": {
        e.preventDefault();
        if (itemCtx.open) {
          itemCtx.onOpenChange(false);
        }
        navigateToAdjacentItem(rootCtx, itemCtx.value, -1);
        break;
      }
      case "ArrowDown": {
        if (!itemCtx.open) {
          e.preventDefault();
          itemCtx.onOpenChange(true);
        }
        break;
      }
    }
  };

  const triggerProps = itemCtx.getReferenceProps({
    ...props,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
  });

  return (
    <button
      ref={composedRef}
      type="button"
      aria-haspopup="dialog"
      aria-expanded={itemCtx.open}
      aria-controls={itemCtx.contentId}
      className={cn(
        "inline-flex items-center gap-(--space-1)",
        "rounded-(--radius-md) px-(--space-3) py-(--space-2)",
        "text-sm font-medium",
        "text-(--nuka-text-base)",
        "select-none",
        "hover:bg-(--nuka-bg-muted)",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        "focus-visible:outline-(--nuka-border-focus)",
        "data-[state=open]:bg-(--nuka-bg-muted)",
        className,
      )}
      data-state={itemCtx.open ? "open" : "closed"}
      // Safe: Floating UI getReferenceProps() returns Record<string, unknown>;
      // values are standard DOM event handlers.
      {...(triggerProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      tabIndex={itemCtx.value === rootCtx.rovingValue ? 0 : -1}
    >
      {children}
      <Icon
        size="sm"
        className={cn(
          "transition-transform duration-200",
          itemCtx.open && "rotate-180",
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </Icon>
    </button>
  );
});

NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

export interface NavigationMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const NavigationMenuContent = React.forwardRef<
  HTMLDivElement,
  NavigationMenuContentProps
>(({ className, children, ...props }, ref) => {
  const rootCtx = useNavigationMenuContext();
  const itemCtx = useNavigationMenuItemContext();
  const contentRef = React.useRef<HTMLDivElement>(null);
  const composedRef = composeRefs(ref, contentRef, itemCtx.refs.setFloating);

  useFocusFirstInteractive(contentRef, itemCtx.open);

  if (!itemCtx.open) return null;

  const floatingProps = itemCtx.getFloatingProps(props);

  return (
    <Portal>
      <NavigationMenuContentContext value={true}>
        <div
          ref={composedRef}
          id={itemCtx.contentId}
          role="dialog"
          aria-label={
            rootCtx.itemLabels.current.get(itemCtx.value) ?? itemCtx.value
          }
          tabIndex={-1}
          style={itemCtx.floatingStyles}
          // Safe: Floating UI getFloatingProps() returns Record<string, unknown>;
          // values are standard DOM attributes and event handlers.
          {...(floatingProps as React.HTMLAttributes<HTMLDivElement>)}
          className={cn(
            "z-(--nuka-z-dropdown) min-w-48",
            "rounded-(--radius-md) border border-(--nuka-border-base)",
            "bg-(--nuka-bg-base) shadow-md",
            "p-(--space-4)",
            "focus-visible:outline-none",
            className,
          )}
        >
          {children}
        </div>
      </NavigationMenuContentContext>
    </Portal>
  );
});

NavigationMenuContent.displayName = "NavigationMenuContent";

export interface NavigationMenuLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
  active?: boolean;
}

const NavigationMenuLink = React.forwardRef<
  HTMLAnchorElement,
  NavigationMenuLinkProps
>(
  (
    { asChild = false, active = false, className, onKeyDown, ...props },
    ref,
  ) => {
    const rootCtx = useNavigationMenuContext();
    const itemCtx = useNavigationMenuItemContext();
    const insideContent = useIsInsideContent();
    const Comp = asChild ? Slot : "a";

    const composedRef = composeRefs(
      ref,
      insideContent
        ? undefined
        : (el: HTMLAnchorElement | null) => {
            rootCtx.registerItem(itemCtx.value, el);
          },
    );

    const handleKeyDown = insideContent
      ? onKeyDown
      : (e: React.KeyboardEvent<HTMLAnchorElement>) => {
          onKeyDown?.(e);
          if (e.defaultPrevented) return;

          switch (e.key) {
            case "ArrowRight": {
              e.preventDefault();
              navigateToAdjacentItem(rootCtx, itemCtx.value, 1);
              break;
            }
            case "ArrowLeft": {
              e.preventDefault();
              navigateToAdjacentItem(rootCtx, itemCtx.value, -1);
              break;
            }
            case "Escape": {
              e.preventDefault();
              if (rootCtx.activeValue !== null) {
                rootCtx.closeMenu();
              }
              break;
            }
          }
        };

    const menubarProps = insideContent
      ? {}
      : {
          tabIndex: itemCtx.value === rootCtx.rovingValue ? 0 : -1,
        };

    return (
      <Comp
        ref={composedRef}
        aria-current={active ? "page" : undefined}
        className={cn(
          "inline-flex items-center",
          "rounded-(--radius-md) px-(--space-3) py-(--space-2)",
          "text-sm font-medium",
          "text-(--nuka-text-base)",
          "select-none",
          "hover:bg-(--nuka-bg-muted)",
          "focus-visible:outline-2 focus-visible:outline-offset-2",
          "focus-visible:outline-(--nuka-border-focus)",
          active && "text-(--nuka-accent-text)",
          className,
        )}
        {...menubarProps}
        onKeyDown={handleKeyDown}
        {...props}
      />
    );
  },
);

NavigationMenuLink.displayName = "NavigationMenuLink";

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
};
