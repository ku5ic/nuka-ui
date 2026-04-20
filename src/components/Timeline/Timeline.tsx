"use client";

import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface TimelineProps extends React.OlHTMLAttributes<HTMLOListElement> {
  ref?: React.Ref<HTMLOListElement> | undefined;
}

function Timeline({ ref, className, ...props }: TimelineProps) {
  return (
    <ol
      ref={ref}
      className={cn("relative flex flex-col", "list-none", className)}
      data-slot="root"
      {...props}
    />
  );
}

Timeline.displayName = "Timeline";

export { Timeline };
