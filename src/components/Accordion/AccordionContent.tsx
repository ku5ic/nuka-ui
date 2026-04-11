import * as React from "react";
import { CollapsibleContent } from "@nuka/components/Collapsible";

export interface AccordionContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(({ className, children, ...props }, ref) => {
  return (
    <CollapsibleContent ref={ref} className={className} {...props}>
      <div className="pb-(--space-4)">{children}</div>
    </CollapsibleContent>
  );
});

AccordionContent.displayName = "AccordionContent";

export { AccordionContent };
