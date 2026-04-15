"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { StepperContext } from "@nuka/components/Stepper/Stepper.context";
import type {
  StepperOrientation,
  StepState,
  StepperContextValue,
} from "@nuka/components/Stepper/Stepper.context";

function resolveStepState(
  child: React.ReactNode,
  index: number,
  currentStep: number,
): StepState {
  if (React.isValidElement(child)) {
    const explicitState = (child.props as Record<string, unknown>).state as
      | StepState
      | undefined;
    if (explicitState !== undefined) return explicitState;

    const step = (child.props as Record<string, unknown>).step as
      | number
      | undefined;
    const stepIndex = step ?? index;
    if (stepIndex < currentStep) return "completed";
    if (stepIndex === currentStep) return "current";
  }
  return "upcoming";
}

export interface StepperProps extends React.HTMLAttributes<HTMLElement> {
  currentStep: number;
  orientation?: StepperOrientation;
  onStepClick?: (step: number) => void;
}

const Stepper = React.forwardRef<HTMLElement, StepperProps>(
  (
    {
      currentStep,
      orientation = "horizontal",
      onStepClick,
      className,
      children,
      "aria-label": ariaLabel = "Progress",
      ...props
    },
    ref,
  ) => {
    const contextValue: StepperContextValue = React.useMemo(
      () => ({ currentStep, orientation, onStepClick }),
      [currentStep, orientation, onStepClick],
    );

    const childArray = React.Children.toArray(children);
    let listChildren: React.ReactNode[];

    if (orientation === "horizontal") {
      listChildren = [];
      childArray.forEach((child, i) => {
        listChildren.push(child);
        if (i < childArray.length - 1) {
          const leftStepState = resolveStepState(child, i, currentStep);
          const segmentCompleted = leftStepState === "completed";
          listChildren.push(
            <li
              key={`connector-${String(i)}`}
              role="presentation"
              aria-hidden="true"
              className="flex items-start flex-1"
            >
              <div
                className={cn(
                  "h-px w-full mt-(--space-4)",
                  segmentCompleted
                    ? "bg-(--nuka-accent-bg)"
                    : "bg-(--nuka-border-base)",
                )}
              />
            </li>,
          );
        }
      });
    } else {
      listChildren = childArray;
    }

    return (
      <StepperContext value={contextValue}>
        <nav ref={ref} aria-label={ariaLabel} className={className} {...props}>
          <ol
            className={cn(
              "flex list-none",
              orientation === "horizontal"
                ? "flex-row items-start"
                : "flex-col",
            )}
          >
            {listChildren}
          </ol>
        </nav>
      </StepperContext>
    );
  },
);

Stepper.displayName = "Stepper";

export { Stepper };
