"use client";
import { createContext, use } from "react";

export interface SidebarContextValue {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  isMobile: boolean;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

function useSidebarContext(): SidebarContextValue {
  const context = use(SidebarContext);
  if (context === null) {
    throw new Error(
      "Sidebar compound components must be used within <SidebarProvider>",
    );
  }
  return context;
}

export { SidebarContext, useSidebarContext };
