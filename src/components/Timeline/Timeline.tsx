import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface TimelineProps
  extends React.OlHTMLAttributes<HTMLOListElement> {}

const Timeline = React.forwardRef<HTMLOListElement, TimelineProps>(
  ({ className, ...props }, ref) => {
    return (
      <ol
        ref={ref}
        className={cn("relative flex flex-col", "list-none", className)}
        {...props}
      />
    );
  },
);

Timeline.displayName = "Timeline";

export { Timeline };
