"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import {
  StepperItemContext,
  useStepperContext,
} from "@nuka/components/Stepper/Stepper.context";
import type {
  StepState,
  StepperItemContextValue,
} from "@nuka/components/Stepper/Stepper.context";

export interface StepperItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  ref?: React.Ref<HTMLLIElement> | undefined;
  step: number;
  state?: StepState;
  disabled?: boolean;
}

function StepperItem({
  ref,
  step,
  state: explicitState,
  disabled = false,
  className,
  children,
  ...props
}: StepperItemProps) {
  const { currentStep, orientation, onStepClick } = useStepperContext();

  const inferredState: StepState =
    step < currentStep
      ? "completed"
      : step === currentStep
        ? "current"
        : "upcoming";

  const state = explicitState ?? inferredState;

  const isInteractive =
    onStepClick !== undefined && state === "completed" && !disabled;

  const itemContextValue: StepperItemContextValue = React.useMemo(
    () => ({ step, state, disabled }),
    [step, state, disabled],
  );

  return (
    <StepperItemContext value={itemContextValue}>
      <li
        ref={ref}
        aria-current={state === "current" ? "step" : undefined}
        className={cn(
          orientation === "horizontal"
            ? "flex flex-col items-center shrink-0"
            : "group relative flex gap-(--space-3) pb-(--space-8) last:pb-0",
          className,
        )}
        {...props}
      >
        {isInteractive ? (
          <button
            type="button"
            onClick={() => onStepClick(step)}
            aria-label={`Go to step ${String(step + 1)}`}
            className={cn(
              "flex cursor-pointer bg-transparent border-none p-0",
              orientation === "horizontal"
                ? "flex-col items-center"
                : "flex-row gap-(--space-3) items-start",
              "rounded-(--radius-md)",
              "focus-visible:outline-2 focus-visible:outline-offset-2",
              "focus-visible:outline-(--nuka-border-focus)",
            )}
          >
            {children}
          </button>
        ) : (
          children
        )}
      </li>
    </StepperItemContext>
  );
}

StepperItem.displayName = "StepperItem";

export { StepperItem };
