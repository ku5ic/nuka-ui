"use client";
import * as React from "react";
import type { useFloating, useInteractions } from "@floating-ui/react";

export interface MenubarContextValue {
  openValue: string | null;
  openMenu: (value: string) => void;
  closeMenu: () => void;
  triggerRefs: React.RefObject<Map<string, HTMLButtonElement>>;
  registerTrigger: (value: string, el: HTMLButtonElement | null) => void;
  menuValues: React.RefObject<string[]>;
  registerMenu: (value: string) => void;
}

const MenubarContext = React.createContext<MenubarContextValue | undefined>(
  undefined,
);

function useMenubarContext(): MenubarContextValue {
  const context = React.useContext(MenubarContext);
  if (context === undefined) {
    throw new Error(
      "useMenubarContext must be used within a <Menubar> component",
    );
  }
  return context;
}

export interface MenubarMenuContextValue {
  value: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  refs: ReturnType<typeof useFloating>["refs"];
  floatingStyles: React.CSSProperties;
  getReferenceProps: ReturnType<typeof useInteractions>["getReferenceProps"];
  getFloatingProps: ReturnType<typeof useInteractions>["getFloatingProps"];
}

const MenubarMenuContext = React.createContext<
  MenubarMenuContextValue | undefined
>(undefined);

function useMenubarMenuContext(): MenubarMenuContextValue {
  const context = React.useContext(MenubarMenuContext);
  if (context === undefined) {
    throw new Error(
      "useMenubarMenuContext must be used within a <MenubarMenu> component",
    );
  }
  return context;
}

export {
  MenubarContext,
  useMenubarContext,
  MenubarMenuContext,
  useMenubarMenuContext,
};
