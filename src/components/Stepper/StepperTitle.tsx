import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Text } from "@nuka/components/Text";
import { useStepperContext } from "@nuka/components/Stepper/Stepper.context";

export interface StepperTitleProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color"> {}

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

export { StepperTitle };
