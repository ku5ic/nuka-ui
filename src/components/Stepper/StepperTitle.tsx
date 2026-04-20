"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Text } from "@nuka/components/Text";
import { useStepperContext } from "@nuka/components/Stepper/Stepper.context";

export interface StepperTitleProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "color"
> {
  ref?: React.Ref<HTMLElement> | undefined;
}

function StepperTitle({ ref, className, ...props }: StepperTitleProps) {
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
      data-slot="title"
      {...props}
    />
  );
}

StepperTitle.displayName = "StepperTitle";

export { StepperTitle };
