"use client";
import * as React from "react";
import type { useFloating, useInteractions } from "@floating-ui/react";

export interface NavigationMenuContextValue {
  activeValue: string | null;
  openMenu: (value: string) => void;
  closeMenu: () => void;
  registerItem: (value: string, el: HTMLElement | null) => void;
  itemValues: React.RefObject<string[]>;
  itemRefs: React.RefObject<Map<string, HTMLElement>>;
  itemLabels: React.RefObject<Map<string, string>>;
  rovingValue: string | null;
  setRovingValue: (value: string | null) => void;
}

const NavigationMenuContext =
  React.createContext<NavigationMenuContextValue | null>(null);

export function useNavigationMenuContext(): NavigationMenuContextValue {
  const context = React.useContext(NavigationMenuContext);
  if (context === null) {
    throw new Error(
      "NavigationMenu compound components must be used within <NavigationMenu>",
    );
  }
  return context;
}

export interface NavigationMenuItemContextValue {
  value: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contentId: string;
  refs: ReturnType<typeof useFloating>["refs"];
  floatingStyles: React.CSSProperties;
  getReferenceProps: ReturnType<typeof useInteractions>["getReferenceProps"];
  getFloatingProps: ReturnType<typeof useInteractions>["getFloatingProps"];
}

const NavigationMenuItemContext =
  React.createContext<NavigationMenuItemContextValue | null>(null);

export function useNavigationMenuItemContext(): NavigationMenuItemContextValue {
  const context = React.useContext(NavigationMenuItemContext);
  if (context === null) {
    throw new Error(
      "NavigationMenuItem compound components must be used within <NavigationMenuItem>",
    );
  }
  return context;
}

const NavigationMenuContentContext = React.createContext(false);

export function useIsInsideContent(): boolean {
  return React.useContext(NavigationMenuContentContext);
}

export {
  NavigationMenuContext,
  NavigationMenuItemContext,
  NavigationMenuContentContext,
};
