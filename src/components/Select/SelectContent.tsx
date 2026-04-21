"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { useSelect } from "@nuka/components/Select/Select.context";

export interface SelectContentProps {
  ref?: React.Ref<HTMLDivElement> | undefined;
  className?: string;
  children: React.ReactNode;
}

// TODO: migrate to Portal + Floating UI positioning to avoid overflow/stacking
// context clipping (deferred from audit batch 2).
function SelectContent({ ref, className, children }: SelectContentProps) {
  const ctx = useSelect();

  return (
    <div
      ref={ref}
      id={ctx.listboxId}
      data-slot="content"
      role="listbox"
      hidden={!ctx.open}
      className={cn(
        "absolute left-0 w-full",
        "z-(--nuka-z-dropdown)",
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
}

SelectContent.displayName = "SelectContent";

export { SelectContent };
