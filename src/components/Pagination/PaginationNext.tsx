"use client";

import * as React from "react";
import { composeRefs } from "@nuka/utils/slot";
import { Button } from "@nuka/components/Button";
import { Icon } from "@nuka/components/Icon";

interface PaginationChildProps {
  ref?: React.Ref<HTMLElement>;
  children?: React.ReactNode;
  [key: string]: unknown;
}

export interface PaginationNextProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  ref?: React.Ref<HTMLAnchorElement> | undefined;
  disabled?: boolean;
  /**
   * When true, merges into the child element instead of rendering an `<a>`.
   * The child's children are replaced with the built-in chevron icon and a
   * text label. Pass a single-element child (e.g. `<Link />`) with plain text
   * children; rich JSX children will be replaced by the label fallback.
   * For custom icon or label arrangements, use `PaginationLink` directly.
   */
  asChild?: boolean;
}

const NextIcon = () => (
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  </Icon>
);

function PaginationNext({
  ref,
  disabled = false,
  asChild = false,
  className,
  children,
  onClick,
  "aria-label": ariaLabel = "Go to next page",
  ...props
}: PaginationNextProps) {
  if (disabled) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className={className}
        disabled
        aria-label={ariaLabel}
      >
        {children ?? "Next"}
        <NextIcon />
      </Button>
    );
  }

  if (asChild && React.isValidElement<PaginationChildProps>(children)) {
    const child = children;
    const label = child.props.children ?? "Next";

    return (
      <Button asChild variant="ghost" size="sm" className={className}>
        {React.cloneElement(
          child,
          {
            ref: composeRefs(ref as React.Ref<HTMLElement>, child.props.ref),
            "aria-label": ariaLabel,
            ...props,
          },
          label,
          <NextIcon />,
        )}
      </Button>
    );
  }

  return (
    <Button asChild variant="ghost" size="sm" className={className}>
      <a ref={ref} aria-label={ariaLabel} onClick={onClick} {...props}>
        {children ?? "Next"}
        <NextIcon />
      </a>
    </Button>
  );
}

PaginationNext.displayName = "PaginationNext";

export { PaginationNext };
