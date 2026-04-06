import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { useSelect } from "@nuka/components/Select/SelectContext";

export interface SelectContentProps {
  className?: string;
  children: React.ReactNode;
}

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children }, ref) => {
    const ctx = useSelect();

    return (
      <div
        ref={ref}
        id={ctx.listboxId}
        role="listbox"
        hidden={!ctx.open}
        className={cn(
          "absolute left-0 w-full",
          "z-10",
          "bg-(--nuka-bg-base)",
          "border border-(--nuka-border-base)",
          "rounded-(--radius-md)",
          "shadow-md",
          "py-(--space-1)",
          "mt-(--space-1)",
          "max-h-60 overflow-y-auto",
          className,
        )}
      >
        {children}
      </div>
    );
  },
);

SelectContent.displayName = "SelectContent";

export { SelectContent };
