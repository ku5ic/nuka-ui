import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface SkipLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  ref?: React.Ref<HTMLAnchorElement> | undefined;
  /** Target element ID without the # prefix */
  targetId?: string;
}

function SkipLink({
  ref,
  className,
  targetId = "main-content",
  children = "Skip to main content",
  ...props
}: SkipLinkProps) {
  return (
    <a
      ref={ref}
      href={`#${targetId}`}
      className={cn(
        "sr-only focus:not-sr-only",
        "fixed top-(--space-4) left-(--space-4) z-(--nuka-z-toast)",
        "inline-flex items-center",
        "rounded-(--radius-md) px-(--space-4) py-(--space-2)",
        "bg-(--nuka-accent-bg) text-(--nuka-accent-fg)",
        "text-sm font-medium",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        "focus-visible:outline-(--nuka-border-focus)",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

SkipLink.displayName = "SkipLink";

export { SkipLink };
