"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { MenubarContext } from "@nuka/components/Menubar/Menubar.context";
import type { MenubarContextValue } from "@nuka/components/Menubar/Menubar.context";

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

export { Menubar };
