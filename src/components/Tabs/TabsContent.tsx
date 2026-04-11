import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { useTabsContext } from "@nuka/components/Tabs/Tabs.context";

export interface TabsContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, className, ...props }, ref) => {
    const ctx = useTabsContext();
    const isActive = ctx.value === value;
    const triggerId = `${ctx.baseId}-trigger-${value}`;
    const panelId = `${ctx.baseId}-panel-${value}`;

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={panelId}
        aria-labelledby={triggerId}
        hidden={!isActive ? true : undefined}
        tabIndex={0}
        data-state={isActive ? "active" : "inactive"}
        className={cn(
          "mt-(--space-2)",
          "focus-visible:outline-2 focus-visible:outline-offset-2",
          "focus-visible:outline-(--nuka-border-focus)",
          className,
        )}
        {...props}
      />
    );
  },
);

TabsContent.displayName = "TabsContent";

export { TabsContent };
