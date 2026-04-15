"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { useControllableState } from "@nuka/hooks/use-controllable-state";
import { TabsContext } from "@nuka/components/Tabs/Tabs.context";

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  activationMode?: "automatic" | "manual";
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onValueChange,
      orientation = "horizontal",
      activationMode = "automatic",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [value, setValue] = useControllableState(
      controlledValue,
      defaultValue,
      onValueChange,
    );

    const baseId = React.useId();
    const [focusedValue, setFocusedValue] = React.useState<string | undefined>(
      undefined,
    );

    const contextValue = React.useMemo(
      () => ({
        value,
        onValueChange: setValue,
        orientation,
        activationMode,
        baseId,
        focusedValue,
        setFocusedValue,
      }),
      [value, setValue, orientation, activationMode, baseId, focusedValue],
    );

    return (
      <TabsContext value={contextValue}>
        <div
          ref={ref}
          className={cn(
            orientation === "horizontal" ? "flex flex-col" : "flex flex-row",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </TabsContext>
    );
  },
);

Tabs.displayName = "Tabs";

export { Tabs };
