"use client";

import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { DismissButton } from "@nuka/utils/dismiss-button";
import {
  bannerVariants,
  type BannerVariantProps,
} from "@nuka/components/Banner/Banner.variants";

export interface BannerProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "aria-label">,
    BannerVariantProps {
  ref?: React.Ref<HTMLDivElement> | undefined;
  "aria-label": string;
  onDismiss?: () => void;
  action?: React.ReactNode;
}

function Banner({
  ref,
  className,
  intent,
  "aria-label": ariaLabel,
  onDismiss,
  action,
  children,
  ...props
}: BannerProps) {
  return (
    <div
      ref={ref}
      role="region"
      aria-label={ariaLabel}
      className={cn(bannerVariants({ intent }), className)}
      {...props}
    >
      <div className="flex-1 min-w-0">{children}</div>
      {action && <div className="shrink-0">{action}</div>}
      {onDismiss != null && (
        <DismissButton
          onClick={onDismiss}
          className="shrink-0 self-start ml-auto"
        />
      )}
    </div>
  );
}

Banner.displayName = "Banner";

export { Banner, bannerVariants };
