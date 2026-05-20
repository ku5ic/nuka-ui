"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { MenubarContext } from "@nuka/components/Menubar/Menubar.context";
import type { MenubarContextValue } from "@nuka/components/Menubar/Menubar.context";

export interface MenubarProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
}

function Menubar({ ref, className, children, ...props }: MenubarProps) {
  const [openValue, setOpenValue] = React.useState<string | null>(null);
  const triggersRef = React.useRef(new Map<string, HTMLButtonElement>());
  const menuValuesRef = React.useRef<string[]>([]);

  const registerTrigger = React.useCallback(
    (value: string, el: HTMLButtonElement | null) => {
      if (el) {
        triggersRef.current.set(value, el);
      } else {
        triggersRef.current.delete(value);
      }
    },
    [],
  );

  const registerMenu = React.useCallback((value: string) => {
    if (!menuValuesRef.current.includes(value)) {
      menuValuesRef.current.push(value);
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
      triggerRefs: triggersRef,
      registerTrigger,
      menuValues: menuValuesRef,
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
        data-slot="root"
        {...props}
      >
        {children}
      </div>
    </MenubarContext>
  );
}

Menubar.displayName = "Menubar";

export { Menubar };
