import * as React from "react";
import { Slot } from "@nuka/utils/slot";
import { cn } from "@nuka/utils/cn";
import { Icon } from "@nuka/components/Icon";

export interface NavTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: React.Ref<HTMLButtonElement> | undefined;
  asChild?: boolean;
}

const chevron = (
  <Icon size="sm">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  </Icon>
);

const triggerClasses = [
  "inline-flex items-center gap-(--space-1)",
  "rounded-(--radius-md) px-(--space-3) py-(--space-2)",
  "text-sm font-medium",
  "text-(--nuka-text-base)",
  "select-none",
  "hover:bg-(--nuka-bg-muted)",
  "focus-visible:outline-2 focus-visible:outline-offset-2",
  "focus-visible:outline-(--nuka-border-focus)",
] as const;

function NavTrigger({
  ref,
  asChild = false,
  className,
  children,
  ...props
}: NavTriggerProps) {
  if (asChild) {
    return (
      <Slot
        ref={ref}
        type="button"
        aria-haspopup="true"
        className={cn(...triggerClasses, className)}
        {...props}
      >
        {children}
      </Slot>
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      aria-haspopup="true"
      className={cn(...triggerClasses, className)}
      {...props}
    >
      {children}
      {chevron}
    </button>
  );
}

NavTrigger.displayName = "NavTrigger";

export { NavTrigger };
