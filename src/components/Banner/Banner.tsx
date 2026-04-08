import * as React from "react";
import { cva, type VariantProps } from "@nuka/utils/variants";
import { cn } from "@nuka/utils/cn";
import { DismissButton } from "@nuka/utils/dismiss-button";

const bannerVariants = cva(
  [
    "w-full flex items-start gap-(--space-3)",
    "border-l-4",
    "px-(--space-4) py-(--space-3)",
    "text-sm",
  ],
  {
    variants: {
      intent: {
        default:
          "bg-(--nuka-accent-bg-subtle) border-(--nuka-accent-bg) text-(--nuka-text-base)",
        success:
          "bg-(--nuka-success-bg) border-(--nuka-success-base) text-(--nuka-success-text)",
        danger:
          "bg-(--nuka-danger-bg) border-(--nuka-danger-base) text-(--nuka-danger-text)",
        warning:
          "bg-(--nuka-warning-bg) border-(--nuka-warning-base) text-(--nuka-warning-text)",
      },
    },
    defaultVariants: {
      intent: "default",
    },
  },
);

export type BannerVariantProps = VariantProps<typeof bannerVariants>;

export interface BannerProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "aria-label">,
    BannerVariantProps {
  "aria-label": string;
  onDismiss?: () => void;
  action?: React.ReactNode;
}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      className,
      intent,
      "aria-label": ariaLabel,
      onDismiss,
      action,
      children,
      ...props
    },
    ref,
  ) => {
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
  },
);

Banner.displayName = "Banner";

export { Banner, bannerVariants };
