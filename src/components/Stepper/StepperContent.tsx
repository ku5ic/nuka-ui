"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { useStepperContext } from "@nuka/components/Stepper/Stepper.context";

export interface StepperContentProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
}

function StepperContent({ ref, className, ...props }: StepperContentProps) {
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
      data-slot="content"
      {...props}
    />
  );
}

StepperContent.displayName = "StepperContent";

export { StepperContent };
