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
import { Icon } from "@nuka/components/Icon";
import {
  NavigationMenuContext,
  NavigationMenuItemContext,
  useNavigationMenuContext,
  useNavigationMenuItemContext,
} from "@nuka/components/NavigationMenu/NavigationMenuContext";

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
    const triggerRefs = React.useRef(new Map<string, HTMLButtonElement>());
    const triggerValues = React.useRef<string[]>([]);
    const triggerLabels = React.useRef(new Map<string, string>());

    const openMenu = React.useCallback((value: string) => {
      setActiveValue(value);
    }, []);

    const closeMenu = React.useCallback(() => {
      setActiveValue(null);
    }, []);

    const registerTrigger = React.useCallback(
      (value: string, el: HTMLButtonElement | null) => {
        if (el) {
          triggerRefs.current.set(value, el);
          if (!triggerValues.current.includes(value)) {
            triggerValues.current.push(value);
          }
        } else {
          triggerRefs.current.delete(value);
          triggerValues.current = triggerValues.current.filter(
            (v) => v !== value,
          );
        }
      },
      [],
    );

    const contextValue = React.useMemo(
      () => ({
        activeValue,
        openMenu,
        closeMenu,
        registerTrigger,
        triggerValues,
        triggerRefs,
        triggerLabels,
      }),
      [activeValue, openMenu, closeMenu, registerTrigger],
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
    role="menubar"
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

    const handleOpenChange = React.useCallback(
      (next: boolean) => {
        if (next) {
          rootCtx.openMenu(value);
        } else {
          rootCtx.closeMenu();
          rootCtx.triggerRefs.current.get(value)?.focus();
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
      rootCtx.registerTrigger(itemCtx.value, el);
      if (el) {
        rootCtx.triggerLabels.current.set(
          itemCtx.value,
          el.textContent.trim() || itemCtx.value,
        );
      } else {
        rootCtx.triggerLabels.current.delete(itemCtx.value);
      }
    },
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    itemCtx.onOpenChange(!itemCtx.open);
    onClick?.(e);
  };

  const getAdjacentTrigger = (
    direction: -1 | 1,
  ): HTMLButtonElement | undefined => {
    const values = rootCtx.triggerValues.current;
    const currentIndex = values.indexOf(itemCtx.value);
    if (currentIndex === -1) return undefined;
    const nextIndex =
      (currentIndex + direction + values.length) % values.length;
    const nextValue = values[nextIndex];
    if (nextValue === undefined) return undefined;
    return rootCtx.triggerRefs.current.get(nextValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;

    switch (e.key) {
      case "ArrowRight": {
        e.preventDefault();
        const next = getAdjacentTrigger(1);
        if (next) {
          if (itemCtx.open) {
            itemCtx.onOpenChange(false);
          }
          next.focus();
        }
        break;
      }
      case "ArrowLeft": {
        e.preventDefault();
        const prev = getAdjacentTrigger(-1);
        if (prev) {
          if (itemCtx.open) {
            itemCtx.onOpenChange(false);
          }
          prev.focus();
        }
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
      role="menuitem"
      aria-haspopup="dialog"
      aria-expanded={itemCtx.open}
      className={cn(
        "inline-flex items-center gap-(--space-1)",
        "rounded-(--radius-md) px-(--space-3) py-(--space-2)",
        "text-sm font-medium",
        "text-(--nuka-text-base)",
        "outline-none select-none",
        "hover:bg-(--nuka-bg-muted)",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        "focus-visible:outline-(--nuka-border-focus)",
        "data-[state=open]:bg-(--nuka-bg-muted)",
        className,
      )}
      data-state={itemCtx.open ? "open" : "closed"}
      {...(triggerProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
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

  React.useEffect(() => {
    if (itemCtx.open) {
      const frame = requestAnimationFrame(() => {
        const focusable = contentRef.current?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable) {
          focusable.focus();
        } else {
          contentRef.current?.focus();
        }
      });
      return () => cancelAnimationFrame(frame);
    }
    return undefined;
  }, [itemCtx.open]);

  if (!itemCtx.open) return null;

  const floatingProps = itemCtx.getFloatingProps(props);

  return (
    <Portal>
      <div
        ref={composedRef}
        role="dialog"
        aria-label={
          rootCtx.triggerLabels.current.get(itemCtx.value) ?? itemCtx.value
        }
        tabIndex={-1}
        style={itemCtx.floatingStyles}
        {...(floatingProps as React.HTMLAttributes<HTMLDivElement>)}
        className={cn(
          "z-50 min-w-48",
          "rounded-(--radius-md) border border-(--nuka-border-base)",
          "bg-(--nuka-bg-base) shadow-md",
          "p-(--space-4)",
          "focus:outline-none",
          className,
        )}
      >
        {children}
      </div>
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
>(({ asChild = false, active = false, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      role="menuitem"
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex items-center",
        "rounded-(--radius-md) px-(--space-3) py-(--space-2)",
        "text-sm font-medium",
        "text-(--nuka-text-base)",
        "outline-none select-none",
        "hover:bg-(--nuka-bg-muted)",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        "focus-visible:outline-(--nuka-border-focus)",
        active && "text-(--nuka-accent-text)",
        className,
      )}
      {...props}
    />
  );
});

NavigationMenuLink.displayName = "NavigationMenuLink";

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
};
