"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { StepperContext } from "@nuka/components/Stepper/Stepper.context";
import type {
  StepperOrientation,
  StepState,
  StepperContextValue,
} from "@nuka/components/Stepper/Stepper.context";
import type { StepperItemProps } from "@nuka/components/Stepper/StepperItem";

function resolveStepState(
  child: React.ReactNode,
  index: number,
  currentStep: number,
): StepState {
  if (React.isValidElement<StepperItemProps>(child)) {
    if (child.props.state !== undefined) return child.props.state;

    const stepIndex = child.props.step;
    if (stepIndex < currentStep) return "completed";
    if (stepIndex === currentStep) return "current";
  }
  return "upcoming";
}

export interface StepperProps extends React.HTMLAttributes<HTMLElement> {
  ref?: React.Ref<HTMLElement> | undefined;
  currentStep: number;
  orientation?: StepperOrientation;
  onStepClick?: (step: number) => void;
}

function Stepper({
  ref,
  currentStep,
  orientation = "horizontal",
  onStepClick,
  className,
  children,
  "aria-label": ariaLabel = "Progress",
  ...props
}: StepperProps) {
  const contextValue: StepperContextValue = React.useMemo(
    () => ({ currentStep, orientation, onStepClick }),
    [currentStep, orientation, onStepClick],
  );

  // eslint-disable-next-line @eslint-react/no-children-map -- inserting connector <li> elements between steps requires iterating children; no viable alternative without changing the component's public API
  const childArray = React.Children.map(children, (c) => c) ?? [];
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
            data-slot="separator"
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
      <nav
        ref={ref}
        aria-label={ariaLabel}
        className={className}
        data-slot="root"
        {...props}
      >
        <ol
          className={cn(
            "flex list-none",
            orientation === "horizontal" ? "flex-row items-start" : "flex-col",
          )}
          data-slot="list"
        >
          {listChildren}
        </ol>
      </nav>
    </StepperContext>
  );
}

Stepper.displayName = "Stepper";

export { Stepper };
