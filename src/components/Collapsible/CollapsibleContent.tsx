"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { useCollapsibleContext } from "@nuka/components/Collapsible/Collapsible.context";

export interface CollapsibleContentProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
}

function CollapsibleContent({
  ref,
  className,
  children,
  ...props
}: CollapsibleContentProps) {
  const { open, contentId, triggerId } = useCollapsibleContext();

  return (
    <div
      ref={ref}
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      aria-hidden={!open}
      data-slot="content"
      data-state={open ? "open" : "closed"}
      className={cn(
        "grid grid-rows-[0fr] transition-[grid-template-rows] duration-200 ease-in-out",
        "data-[state=open]:grid-rows-[1fr]",
        "motion-reduce:transition-none",
        className,
      )}
      {...props}
    >
      <div className="overflow-hidden" data-slot="content-inner">
        {children}
      </div>
    </div>
  );
}

CollapsibleContent.displayName = "CollapsibleContent";

export { CollapsibleContent };
