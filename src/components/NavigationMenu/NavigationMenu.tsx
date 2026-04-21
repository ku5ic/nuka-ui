"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { NavigationMenuContext } from "@nuka/components/NavigationMenu/NavigationMenu.context";

export interface NavigationMenuProps extends React.HTMLAttributes<HTMLElement> {
  ref?: React.Ref<HTMLElement> | undefined;
  "aria-label"?: string;
}

function NavigationMenu({
  ref,
  className,
  children,
  "aria-label": ariaLabel = "Main navigation",
  ...props
}: NavigationMenuProps) {
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
        data-slot="root"
        {...props}
      >
        {children}
      </nav>
    </NavigationMenuContext>
  );
}

NavigationMenu.displayName = "NavigationMenu";

export { NavigationMenu };
