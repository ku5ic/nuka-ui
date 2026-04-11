import * as React from "react";

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  "aria-label"?: string;
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ "aria-label": ariaLabel = "Breadcrumb", ...props }, ref) => (
    <nav ref={ref} aria-label={ariaLabel} {...props} />
  ),
);

Breadcrumb.displayName = "Breadcrumb";

export { Breadcrumb };
