import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Icon } from "@nuka/components/Icon";
import { Text } from "@nuka/components/Text";
import {
  StepperContext,
  useStepperContext,
  StepperItemContext,
  useStepperItemContext,
} from "@nuka/components/Stepper/StepperContext";
import type {
  StepperOrientation,
  StepState,
  StepperContextValue,
  StepperItemContextValue,
} from "@nuka/components/Stepper/StepperContext";

function resolveStepState(
  child: React.ReactNode,
  index: number,
  currentStep: number,
): StepState {
  if (React.isValidElement(child)) {
    // Safe: React.ReactElement.props is typed as unknown in strict mode.
    // The double cast through Record<string, unknown> reads .state and .step
    // which are guaranteed by StepperItem's props interface. A typed predicate
    // via isValidElement<Pick<StepperItemProps, 'state' | 'step'>> could
    // eliminate these casts; not refactored here to keep the batch scoped.
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

export interface StepperItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  step: number;
  state?: StepState;
  disabled?: boolean;
}

const StepperItem = React.forwardRef<HTMLLIElement, StepperItemProps>(
  (
    {
      step,
      state: explicitState,
      disabled = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
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
  },
);

StepperItem.displayName = "StepperItem";

export interface StepperIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {}

const StepperIndicator = React.forwardRef<
  HTMLDivElement,
  StepperIndicatorProps
>(({ className, ...props }, ref) => {
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
});

StepperIndicator.displayName = "StepperIndicator";

export interface StepperContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const StepperContent = React.forwardRef<HTMLDivElement, StepperContentProps>(
  ({ className, ...props }, ref) => {
    const { orientation } = useStepperContext();

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col",
          orientation === "horizontal"
            ? "w-0 mt-(--space-1) items-center text-center"
            : "flex-1 min-w-0 pt-(--space-0.5)",
          className,
        )}
        {...props}
      />
    );
  },
);

StepperContent.displayName = "StepperContent";

export interface StepperTitleProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "color"
> {}

const StepperTitle = React.forwardRef<HTMLElement, StepperTitleProps>(
  ({ className, ...props }, ref) => {
    const { orientation } = useStepperContext();

    return (
      <Text
        ref={ref}
        as="span"
        size="sm"
        weight="medium"
        className={cn(
          orientation === "horizontal" && "whitespace-nowrap",
          className,
        )}
        {...props}
      />
    );
  },
);

StepperTitle.displayName = "StepperTitle";

export interface StepperDescriptionProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "color"
> {}

const StepperDescription = React.forwardRef<
  HTMLElement,
  StepperDescriptionProps
>(({ className, ...props }, ref) => {
  const { orientation } = useStepperContext();

  return (
    <Text
      ref={ref}
      as="span"
      size="xs"
      color="muted"
      className={cn(
        orientation === "horizontal" && "whitespace-nowrap",
        className,
      )}
      {...props}
    />
  );
});

StepperDescription.displayName = "StepperDescription";

export {
  Stepper,
  StepperItem,
  StepperIndicator,
  StepperContent,
  StepperTitle,
  StepperDescription,
};
