"use client";

import * as React from "react";

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  ref?: React.Ref<HTMLElement> | undefined;
  "aria-label"?: string;
}

function Breadcrumb({
  ref,
  "aria-label": ariaLabel = "Breadcrumb",
  ...props
}: BreadcrumbProps) {
  return <nav ref={ref} aria-label={ariaLabel} data-slot="root" {...props} />;
}

Breadcrumb.displayName = "Breadcrumb";

export { Breadcrumb };
