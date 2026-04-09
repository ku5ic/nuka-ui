import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Slot } from "@nuka/utils/slot";
import { Button } from "@nuka/components/Button";
import { Icon } from "@nuka/components/Icon";

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  "aria-label"?: string;
}

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ "aria-label": ariaLabel = "Pagination", className, ...props }, ref) => (
    <nav
      ref={ref}
      aria-label={ariaLabel}
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  ),
);

Pagination.displayName = "Pagination";

export interface PaginationContentProps extends React.HTMLAttributes<HTMLUListElement> {}

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  PaginationContentProps
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex items-center gap-(--space-1)", "list-none", className)}
    {...props}
  />
));

PaginationContent.displayName = "PaginationContent";

export interface PaginationItemProps extends React.LiHTMLAttributes<HTMLLIElement> {}

const PaginationItem = React.forwardRef<HTMLLIElement, PaginationItemProps>(
  (props, ref) => <li ref={ref} {...props} />,
);

PaginationItem.displayName = "PaginationItem";

export interface PaginationLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  isActive?: boolean;
  asChild?: boolean;
}

const PaginationLink = React.forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ isActive = false, asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "a";

    return (
      <Button
        asChild
        variant={isActive ? "outline" : "ghost"}
        size="sm"
        className={className}
      >
        <Comp
          ref={ref}
          aria-current={isActive ? "page" : undefined}
          {...props}
        />
      </Button>
    );
  },
);

PaginationLink.displayName = "PaginationLink";

export interface PaginationPreviousProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  disabled?: boolean;
  asChild?: boolean;
}

const PaginationPrevious = React.forwardRef<
  HTMLAnchorElement,
  PaginationPreviousProps
>(
  (
    { disabled = false, asChild = false, className, children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : disabled ? "span" : "a";

    return (
      <Button
        asChild
        variant="ghost"
        size="sm"
        className={className}
        disabled={disabled}
      >
        <Comp
          ref={ref as React.Ref<never>}
          aria-label="Go to previous page"
          {...props}
          {...(disabled && !asChild ? { role: "link" as const, "aria-disabled": true } : {})}
        >
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
          {children ?? "Previous"}
        </Comp>
      </Button>
    );
  },
);

PaginationPrevious.displayName = "PaginationPrevious";

export interface PaginationNextProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  disabled?: boolean;
  asChild?: boolean;
}

const PaginationNext = React.forwardRef<HTMLAnchorElement, PaginationNextProps>(
  (
    { disabled = false, asChild = false, className, children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : disabled ? "span" : "a";

    return (
      <Button
        asChild
        variant="ghost"
        size="sm"
        className={className}
        disabled={disabled}
      >
        <Comp
          ref={ref as React.Ref<never>}
          aria-label="Go to next page"
          {...props}
          {...(disabled && !asChild ? { role: "link" as const, "aria-disabled": true } : {})}
        >
          {children ?? "Next"}
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
        </Comp>
      </Button>
    );
  },
);

PaginationNext.displayName = "PaginationNext";

export interface PaginationEllipsisProps extends React.HTMLAttributes<HTMLSpanElement> {}

const PaginationEllipsis = React.forwardRef<
  HTMLSpanElement,
  PaginationEllipsisProps
>(({ className, ...props }, ref) => (
  <>
    <span
      ref={ref}
      aria-hidden="true"
      className={cn(
        "flex items-center justify-center size-8",
        "text-(--nuka-text-muted)",
        className,
      )}
      {...props}
    >
      ...
    </span>
    <span className="sr-only">More pages</span>
  </>
));

PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
