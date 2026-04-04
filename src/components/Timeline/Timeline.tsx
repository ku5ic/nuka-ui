import * as React from "react";
import { cva, type VariantProps } from "@nuka/utils/variants";
import { cn } from "@nuka/utils/cn";

/* ─── Timeline (root) ──────────────────────────────────── */

export interface TimelineProps
  extends React.OlHTMLAttributes<HTMLOListElement> {}

const Timeline = React.forwardRef<HTMLOListElement, TimelineProps>(
  ({ className, ...props }, ref) => {
    return (
      <ol
        ref={ref}
        className={cn("relative flex flex-col", "list-none", className)}
        {...props}
      />
    );
  },
);

Timeline.displayName = "Timeline";

/* ─── TimelineItem marker variants ─────────────────────── */

const timelineItemMarkerVariants = cva(
  [
    "flex items-center justify-center",
    "w-8 h-8 rounded-full",
    "border-2",
    "shrink-0 z-10",
    "bg-[var(--nuka-bg-base)]",
  ],
  {
    variants: {
      intent: {
        default:
          "border-[var(--nuka-accent-bg)] text-[var(--nuka-accent-text)]",
        success:
          "border-[var(--nuka-success-base)] text-[var(--nuka-success-text)]",
        danger:
          "border-[var(--nuka-danger-base)] text-[var(--nuka-danger-text)]",
        warning:
          "border-[var(--nuka-warning-base)] text-[var(--nuka-warning-text)]",
      },
    },
    defaultVariants: {
      intent: "default",
    },
  },
);

export type TimelineItemMarkerVariantProps = VariantProps<
  typeof timelineItemMarkerVariants
>;

/* ─── TimelineItem ─────────────────────────────────────── */

export interface TimelineItemProps
  extends React.LiHTMLAttributes<HTMLLIElement> {
  timestamp?: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  intent?: "default" | "danger" | "success" | "warning";
}

const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  (
    { className, timestamp, title, description, icon, intent, children, ...rest },
    ref,
  ) => {
    return (
      <li
        ref={ref}
        className={cn(
          "group relative flex gap-[var(--space-4)] pb-[var(--space-6)] last:pb-0",
          className,
        )}
        {...rest}
      >
        {/* Left column: marker + connector */}
        <div className="flex flex-col items-center self-stretch -mb-[var(--space-6)] group-last:mb-0">
          <div className={cn(timelineItemMarkerVariants({ intent }))}>
            {icon ? (
              <span className="text-sm" aria-hidden="true">
                {icon}
              </span>
            ) : (
              <span
                className="w-2 h-2 rounded-full bg-current"
                aria-hidden="true"
              />
            )}
          </div>
          {/* Connector line — hidden on last item */}
          <div className="w-px flex-1 bg-[var(--nuka-border-base)] mt-[var(--space-1)] group-last:hidden" />
        </div>

        {/* Right column: content */}
        <div className="flex-1 min-w-0 pb-[var(--space-1)]">
          {timestamp != null && (
            <time className="block text-xs text-[var(--nuka-text-muted)] mb-[var(--space-1)]">
              {timestamp}
            </time>
          )}
          <p className="text-sm font-medium text-[var(--nuka-text-base)]">
            {title}
          </p>
          {description != null && (
            <p className="text-sm text-[var(--nuka-text-muted)] mt-[var(--space-1)]">
              {description}
            </p>
          )}
          {children && <div className="mt-[var(--space-2)]">{children}</div>}
        </div>
      </li>
    );
  },
);

TimelineItem.displayName = "TimelineItem";

export { Timeline, TimelineItem, timelineItemMarkerVariants };
