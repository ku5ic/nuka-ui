"use client";
import { createContext, useContext } from "react";

export type StepperOrientation = "horizontal" | "vertical";
export type StepState = "completed" | "current" | "upcoming" | "error";

export interface StepperContextValue {
  currentStep: number;
  orientation: StepperOrientation;
  onStepClick: ((step: number) => void) | undefined;
}

export interface StepperItemContextValue {
  step: number;
  state: StepState;
  disabled: boolean;
}

const StepperContext = createContext<StepperContextValue | null>(null);

function useStepperContext(): StepperContextValue {
  const context = useContext(StepperContext);
  if (context === null) {
    throw new Error(
      "Stepper compound components must be used within <Stepper>",
    );
  }
  return context;
}

const StepperItemContext = createContext<StepperItemContextValue | null>(null);

function useStepperItemContext(): StepperItemContextValue {
  const context = useContext(StepperItemContext);
  if (context === null) {
    throw new Error(
      "StepperIndicator/StepperContent must be used within <StepperItem>",
    );
  }
  return context;
}

export {
  StepperContext,
  useStepperContext,
  StepperItemContext,
  useStepperItemContext,
};
