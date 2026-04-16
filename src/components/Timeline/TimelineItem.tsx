import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Text } from "@nuka/components/Text";
import { timelineItemMarkerVariants } from "@nuka/components/Timeline/Timeline.variants";

export interface TimelineItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  ref?: React.Ref<HTMLLIElement> | undefined;
  timestamp?: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  intent?: "default" | "danger" | "success" | "warning";
}

function TimelineItem({
  ref,
  className,
  timestamp,
  title,
  description,
  icon,
  intent,
  children,
  ...rest
}: TimelineItemProps) {
  return (
    <li
      ref={ref}
      className={cn(
        "group relative flex gap-(--space-4) pb-(--space-6) last:pb-0",
        className,
      )}
      {...rest}
    >
      {/* Left column: marker + connector */}
      <div className="flex flex-col items-center self-stretch -mb-(--space-6) group-last:mb-0">
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
        {/* Connector line: hidden on last item */}
        <div className="w-px flex-1 bg-(--nuka-border-base) mt-(--space-1) group-last:hidden" />
      </div>

      {/* Right column: content */}
      <div className="flex-1 min-w-0 pb-(--space-1)">
        {timestamp != null && (
          <time className="block text-xs text-(--nuka-text-muted) mb-(--space-1)">
            {timestamp}
          </time>
        )}
        <Text as="p" size="sm" weight="medium">
          {title}
        </Text>
        {description != null && (
          <Text as="p" size="sm" color="muted" className="mt-(--space-1)">
            {description}
          </Text>
        )}
        {children && <div className="mt-(--space-2)">{children}</div>}
      </div>
    </li>
  );
}

TimelineItem.displayName = "TimelineItem";

export { TimelineItem };
