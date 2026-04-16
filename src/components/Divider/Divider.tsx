import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Text } from "@nuka/components/Text";
import {
  resolveResponsiveClasses,
  dividerOrientationClasses,
} from "@nuka/utils/responsive";
import type { Responsive, DividerOrientation } from "@nuka/utils/responsive";
import type { DividerVariantProps } from "@nuka/components/Divider/Divider.variants";

export type { DividerVariantProps };

export interface DividerProps
  extends React.ComponentPropsWithoutRef<"div">, DividerVariantProps {
  ref?: React.Ref<HTMLElement> | undefined;
  label?: React.ReactNode;
}

function resolveBaseOrientation(
  orientation: Responsive<DividerOrientation>,
): DividerOrientation {
  if (typeof orientation === "string") return orientation;
  return orientation.base ?? "horizontal";
}

function hasVertical(orientation: Responsive<DividerOrientation>): boolean {
  if (typeof orientation === "string") return orientation === "vertical";
  return Object.values(orientation).some((v) => v === "vertical");
}

/**
 * Ref type is HTMLElement because the root element varies between
 * HTMLHRElement (horizontal, no label) and HTMLDivElement (vertical or labeled).
 * HTMLElement is the correct common supertype.
 */
function Divider({
  ref,
  className,
  orientation = "horizontal",
  size = "md",
  label,
  ...props
}: DividerProps) {
  const baseOrientation = resolveBaseOrientation(orientation);
  const hasLabel = label != null;
  const lookup = dividerOrientationClasses[size];
  const orientationClasses = resolveResponsiveClasses(orientation, lookup);

  // Vertical + label is explicitly unsupported
  if (hasVertical(orientation) && hasLabel) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        'Divider: `label` is not supported with `orientation="vertical"`. The label will be ignored.',
      );
    }

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        role="separator"
        aria-orientation={baseOrientation}
        className={cn(
          "bg-(--nuka-border-base)",
          ...orientationClasses,
          className,
        )}
        {...props}
      />
    );
  }

  // Horizontal with label: flex layout with two line segments
  if (hasLabel) {
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        role="separator"
        aria-orientation="horizontal"
        className={cn("flex items-center gap-(--space-3)", className)}
        {...props}
      >
        <div
          className={cn(
            "flex-1 bg-(--nuka-border-base)",
            ...orientationClasses,
          )}
          aria-hidden="true"
        />
        <Text
          as="span"
          size="xs"
          color="muted"
          className="shrink-0 px-(--space-2) whitespace-nowrap"
        >
          {label}
        </Text>
        <div
          className={cn(
            "flex-1 bg-(--nuka-border-base)",
            ...orientationClasses,
          )}
          aria-hidden="true"
        />
      </div>
    );
  }

  // Vertical: div with role="separator"
  if (baseOrientation === "vertical") {
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        role="separator"
        aria-orientation="vertical"
        className={cn(
          "bg-(--nuka-border-base)",
          ...orientationClasses,
          className,
        )}
        {...props}
      />
    );
  }

  // Horizontal without label: semantic <hr>
  return (
    <hr
      ref={ref as React.Ref<HTMLHRElement>}
      className={cn(
        "border-0 bg-(--nuka-border-base)",
        ...orientationClasses,
        className,
      )}
      {...(props as React.ComponentPropsWithoutRef<"hr">)}
    />
  );
}

Divider.displayName = "Divider";

export { Divider };
