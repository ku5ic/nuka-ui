"use client";
import * as React from "react";
import { Slot } from "@nuka/utils/slot";
import { useCollapsibleContext } from "@nuka/components/Collapsible/Collapsible.context";

export interface CollapsibleTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: React.Ref<HTMLButtonElement> | undefined;
  asChild?: boolean;
}

function CollapsibleTrigger({
  ref,
  asChild = false,
  className,
  onClick,
  ...props
}: CollapsibleTriggerProps) {
  const { open, onOpenChange, contentId, triggerId, disabled } =
    useCollapsibleContext();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onOpenChange(!open);
    onClick?.(e);
  };

  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      type={asChild ? undefined : "button"}
      id={triggerId}
      aria-expanded={open}
      aria-controls={contentId}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      data-state={open ? "open" : "closed"}
      className={className}
      onClick={handleClick}
      {...props}
    />
  );
}

CollapsibleTrigger.displayName = "CollapsibleTrigger";

export { CollapsibleTrigger };
