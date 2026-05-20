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
  const itemsRef = React.useRef(new Map<string, HTMLElement>());
  const itemValuesRef = React.useRef<string[]>([]);
  const itemLabelsRef = React.useRef(new Map<string, string>());
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
        itemsRef.current.set(value, el);
        if (!itemValuesRef.current.includes(value)) {
          itemValuesRef.current.push(value);
          setRovingValue((prev) => prev ?? value);
        }
      } else {
        itemsRef.current.delete(value);
        itemValuesRef.current = itemValuesRef.current.filter(
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
      registerItem,
      itemValues: itemValuesRef,
      itemRefs: itemsRef,
      itemLabels: itemLabelsRef,
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
