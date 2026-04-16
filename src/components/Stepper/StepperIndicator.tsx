"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Icon } from "@nuka/components/Icon";
import { Text } from "@nuka/components/Text";
import {
  useStepperContext,
  useStepperItemContext,
} from "@nuka/components/Stepper/Stepper.context";

export interface StepperIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
}

function StepperIndicator({ ref, className, ...props }: StepperIndicatorProps) {
  const { state, step } = useStepperItemContext();
  const { orientation } = useStepperContext();

  const circle = (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center",
        "w-8 h-8 rounded-full",
        "border-2 shrink-0",
        "text-sm font-medium",
        "transition-colors duration-150",
        state === "completed" &&
          "bg-(--nuka-accent-bg) border-(--nuka-accent-bg) text-(--nuka-accent-fg)",
        state === "current" &&
          "border-(--nuka-accent-bg) text-(--nuka-accent-text) bg-(--nuka-bg-base)",
        state === "upcoming" &&
          "border-(--nuka-border-base) text-(--nuka-text-muted) bg-(--nuka-bg-base)",
        state === "error" &&
          "border-(--nuka-danger-base) text-(--nuka-danger-fg) bg-(--nuka-danger-base)",
        className,
      )}
      {...props}
    >
      {state === "completed" ? (
        <>
          <Icon size="sm">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                d="M5 13l4 4L19 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Icon>
          <span className="sr-only">Completed</span>
        </>
      ) : state === "error" ? (
        <>
          <Icon size="sm">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                d="M12 8v4m0 4h.01"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Icon>
          <span className="sr-only">Error</span>
        </>
      ) : (
        <Text as="span">{step + 1}</Text>
      )}
    </div>
  );

  if (orientation === "vertical") {
    return (
      <div className="flex flex-col items-center self-stretch shrink-0 -mb-(--space-8) group-last:mb-0">
        {circle}
        <div
          aria-hidden="true"
          className={cn(
            "w-px flex-1 group-last:hidden",
            state === "completed"
              ? "bg-(--nuka-accent-bg)"
              : "bg-(--nuka-border-base)",
          )}
        />
      </div>
    );
  }

  return circle;
}

StepperIndicator.displayName = "StepperIndicator";

export { StepperIndicator };
