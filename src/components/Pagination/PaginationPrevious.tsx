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

export interface PaginationPreviousProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  ref?: React.Ref<HTMLAnchorElement> | undefined;
  disabled?: boolean;
  asChild?: boolean;
}

const PreviousIcon = () => (
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
      <path d="m15 18-6-6 6-6" />
    </svg>
  </Icon>
);

function PaginationPrevious({
  ref,
  disabled = false,
  asChild = false,
  className,
  children,
  onClick,
  ...props
}: PaginationPreviousProps) {
  const handleClick = disabled
    ? (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
      }
    : onClick;

  if (asChild && React.isValidElement<PaginationChildProps>(children)) {
    const child = children;
    const label = child.props.children ?? "Previous";

    return (
      <Button
        asChild
        variant="ghost"
        size="sm"
        className={className}
        disabled={disabled}
      >
        {React.cloneElement(
          child,
          {
            ref: composeRefs(ref as React.Ref<HTMLElement>, child.props.ref),
            "aria-label": "Go to previous page",
            ...props,
          },
          <PreviousIcon />,
          label,
        )}
      </Button>
    );
  }

  const Comp = disabled ? "span" : "a";

  return (
    <Button
      asChild
      variant="ghost"
      size="sm"
      className={className}
      disabled={disabled}
    >
      {/* Comp is a union of "span" | "a"; TypeScript cannot unify their ref
          types. This widening cast is safe because both accept HTMLElement. */}
      <Comp
        ref={ref as React.Ref<never>}
        aria-label="Go to previous page"
        onClick={handleClick}
        {...props}
        {...(disabled ? { role: "link" as const, "aria-disabled": true } : {})}
      >
        <PreviousIcon />
        {children ?? "Previous"}
      </Comp>
    </Button>
  );
}

PaginationPrevious.displayName = "PaginationPrevious";

export { PaginationPrevious };
