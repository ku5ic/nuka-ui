"use client";
import * as React from "react";
import { CollapsibleContent } from "@nuka/components/Collapsible";

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
}

function AccordionContent({
  ref,
  className,
  children,
  ...props
}: AccordionContentProps) {
  return (
    <CollapsibleContent ref={ref} className={className} {...props}>
      <div className="pb-(--space-4)">{children}</div>
    </CollapsibleContent>
  );
}

AccordionContent.displayName = "AccordionContent";

export { AccordionContent };
