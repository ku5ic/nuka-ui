"use client";

import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Text } from "@nuka/components/Text";
import { textVariants } from "@nuka/components/Text/Text.variants";
import {
  resolveResponsiveClasses,
  textSizeClasses,
  textAlignClasses,
} from "@nuka/utils/responsive";
import { timelineItemMarkerVariants } from "@nuka/components/Timeline/Timeline.variants";

export interface TimelineItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  ref?: React.Ref<HTMLLIElement> | undefined;
  timestamp?: string;
  title: string;
  titleAs?: "p" | "h2" | "h3" | "h4" | "h5" | "h6";
  description?: string;
  icon?: React.ReactNode;
  intent?: "default" | "danger" | "success" | "warning";
}

function TimelineItem({
  ref,
  className,
  timestamp,
  title,
  titleAs = "p",
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
      data-slot="item"
      {...rest}
    >
      {/* Left column: marker + connector */}
      <div
        className="flex flex-col items-center self-stretch -mb-(--space-6) group-last:mb-0"
        data-slot="item-marker-wrapper"
      >
        <div
          className={cn(timelineItemMarkerVariants({ intent }))}
          data-slot="item-marker"
        >
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
        <div
          className="w-px flex-1 bg-(--nuka-border-base) mt-(--space-1) group-last:hidden"
          data-slot="item-connector"
        />
      </div>

      {/* Right column: content */}
      <div className="flex-1 min-w-0 pb-(--space-1)" data-slot="item-content">
        {timestamp != null && (
          <time
            className="block text-xs text-(--nuka-text-muted) mb-(--space-1)"
            data-slot="item-timestamp"
          >
            {timestamp}
          </time>
        )}
        {titleAs === "p" ? (
          <Text as="p" size="sm" weight="medium" data-slot="item-title">
            {title}
          </Text>
        ) : (
          // Heading element shares the class string Text would emit for
          // size="sm" weight="medium" so visual output matches the default
          // regardless of the tag.
          React.createElement(
            titleAs,
            {
              className: cn(
                textVariants({
                  family: "body",
                  weight: "medium",
                  color: "base",
                  truncate: false,
                }),
                ...resolveResponsiveClasses("sm", textSizeClasses),
                ...resolveResponsiveClasses("left", textAlignClasses),
              ),
              "data-slot": "item-title",
            },
            title,
          )
        )}
        {description != null && (
          <Text
            as="p"
            size="sm"
            color="muted"
            className="mt-(--space-1)"
            data-slot="item-description"
          >
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
