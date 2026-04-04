import * as React from "react";
import { cva, type VariantProps } from "@nuka/utils/variants";
import { cn } from "@nuka/utils/cn";

const bannerVariants = cva(
  [
    "w-full flex items-start gap-[var(--space-3)]",
    "border-l-4",
    "px-[var(--space-4)] py-[var(--space-3)]",
    "text-sm",
  ],
  {
    variants: {
      intent: {
        default:
          "bg-[var(--nuka-accent-bg-subtle)] border-[var(--nuka-accent-bg)] text-[var(--nuka-text-base)]",
        success:
          "bg-[var(--nuka-success-bg)] border-[var(--nuka-success-base)] text-[var(--nuka-success-text)]",
        danger:
          "bg-[var(--nuka-danger-bg)] border-[var(--nuka-danger-base)] text-[var(--nuka-danger-text)]",
        warning:
          "bg-[var(--nuka-warning-bg)] border-[var(--nuka-warning-base)] text-[var(--nuka-warning-text)]",
      },
    },
    defaultVariants: {
      intent: "default",
    },
  },
);

export type BannerVariantProps = VariantProps<typeof bannerVariants>;

export interface BannerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "aria-label">,
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
          <button
            type="button"
            aria-label="Dismiss"
            onClick={onDismiss}
            className="shrink-0 self-start ml-auto inline-flex items-center justify-center rounded-[var(--radius-sm)] p-[var(--space-1)] opacity-70 hover:opacity-100 transition-opacity cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nuka-border-focus)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    );
  },
);

Banner.displayName = "Banner";

export { Banner, bannerVariants };
