import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { useSidebarContext } from "@nuka/components/Sidebar/Sidebar.context";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@nuka/components/Sheet";

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {}

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ className, children, ...props }, ref) => {
    const { expanded, isMobile, mobileOpen, setMobileOpen } =
      useSidebarContext();

    if (isMobile) {
      return (
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          {/* w-72 (288px): layout-specific width, no matching design token */}
          <SheetContent side="left" className="w-72 p-0">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <SheetDescription className="sr-only">
              Main navigation menu
            </SheetDescription>
            <div className="flex h-full flex-col" {...props}>
              {children}
            </div>
          </SheetContent>
        </Sheet>
      );
    }

    return (
      <aside
        ref={ref}
        data-expanded={expanded ? "" : undefined}
        data-collapsed={!expanded ? "" : undefined}
        className={cn(
          "flex h-full flex-col",
          "border-r border-(--nuka-border-base)",
          "bg-(--nuka-bg-base)",
          "transition-[width] duration-200 ease-in-out",
          "motion-reduce:transition-none",
          "overflow-hidden shrink-0",
          // w-64 (256px) expanded, w-14 (56px) collapsed: layout-specific widths, no matching design tokens
          expanded ? "w-64" : "w-14",
          className,
        )}
        {...props}
      >
        {children}
      </aside>
    );
  },
);

Sidebar.displayName = "Sidebar";

export { Sidebar };
