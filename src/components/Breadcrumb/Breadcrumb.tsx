import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Slot } from "@nuka/utils/slot";
import { Text } from "@nuka/components/Text";

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  "aria-label"?: string;
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ "aria-label": ariaLabel = "Breadcrumb", ...props }, ref) => (
    <nav ref={ref} aria-label={ariaLabel} {...props} />
  ),
);

Breadcrumb.displayName = "Breadcrumb";

export interface BreadcrumbListProps extends React.OlHTMLAttributes<HTMLOListElement> {}

const BreadcrumbList = React.forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      role="list"
      className={cn(
        "flex items-center gap-(--space-1.5)",
        "flex-wrap",
        "list-none",
        "text-sm text-(--nuka-text-muted)",
        className,
      )}
      {...props}
    />
  ),
);

BreadcrumbList.displayName = "BreadcrumbList";

export interface BreadcrumbItemProps extends React.LiHTMLAttributes<HTMLLIElement> {}

const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, ...props }, ref) => (
    <li
      ref={ref}
      className={cn("inline-flex items-center gap-(--space-1.5)", className)}
      {...props}
    />
  ),
);

BreadcrumbItem.displayName = "BreadcrumbItem";

export interface BreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
}

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "a";

    return (
      <Comp
        ref={ref}
        className={cn(
          "text-(--nuka-text-muted)",
          "hover:text-(--nuka-text-base)",
          "transition-colors duration-150",
          "focus-visible:outline-2 focus-visible:outline-offset-2",
          "focus-visible:outline-(--nuka-border-focus)",
          "rounded-(--radius-sm)",
          className,
        )}
        {...props}
      />
    );
  },
);

BreadcrumbLink.displayName = "BreadcrumbLink";

export interface BreadcrumbPageProps extends React.HTMLAttributes<HTMLSpanElement> {}

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      aria-current="page"
      className={cn("text-(--nuka-text-base)", "font-medium", className)}
      {...props}
    />
  ),
);

BreadcrumbPage.displayName = "BreadcrumbPage";

export interface BreadcrumbSeparatorProps extends React.LiHTMLAttributes<HTMLLIElement> {}

const BreadcrumbSeparator = React.forwardRef<
  HTMLLIElement,
  BreadcrumbSeparatorProps
>(({ className, children, ...props }, ref) => (
  <li
    ref={ref}
    role="presentation"
    aria-hidden="true"
    className={cn(
      "flex items-center px-(--space-1) text-(--nuka-text-subtle",
      className,
    )}
    {...props}
  >
    {children ?? (
      <Text as="span" size="sm" color="subtle">
        /
      </Text>
    )}
  </li>
));

BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export interface BreadcrumbEllipsisProps extends React.HTMLAttributes<HTMLSpanElement> {}

const BreadcrumbEllipsis = React.forwardRef<
  HTMLSpanElement,
  BreadcrumbEllipsisProps
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="presentation"
    className={cn("flex items-center justify-center size-6", className)}
    {...props}
  >
    <span aria-hidden="true">...</span>
    <span className="sr-only">More pages</span>
  </span>
));

BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
