import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Text } from "@nuka/components/Text";
import { useStepperContext } from "@nuka/components/Stepper/Stepper.context";

export interface StepperDescriptionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color"> {}

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

export { StepperDescription };
