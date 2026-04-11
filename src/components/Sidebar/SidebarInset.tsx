import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { useSidebarContext } from "@nuka/components/Sidebar/Sidebar.context";

export interface SidebarInsetProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarInset = React.forwardRef<HTMLDivElement, SidebarInsetProps>(
  ({ className, ...props }, ref) => {
    const { isMobile } = useSidebarContext();

    return (
      <div
        ref={ref}
        className={cn(
          "flex-1 overflow-auto",
          !isMobile && "transition-[margin-left] duration-200 ease-in-out",
          !isMobile && "motion-reduce:transition-none",
          className,
        )}
        {...props}
      />
    );
  },
);

SidebarInset.displayName = "SidebarInset";

export { SidebarInset };
