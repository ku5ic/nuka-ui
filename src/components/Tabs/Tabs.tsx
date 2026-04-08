import * as React from "react";
import { cva, type VariantProps } from "@nuka/utils/variants";
import { cn } from "@nuka/utils/cn";
import { composeRefs } from "@nuka/utils/slot";
import { useControllableState } from "@nuka/utils/use-controllable-state";
import { TabsContext, useTabsContext } from "@nuka/components/Tabs/TabsContext";

const TRIGGER_SELECTOR = '[role="tab"]:not([aria-disabled="true"])';

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

const tabsListVariants = cva(["flex shrink-0", "focus-visible:outline-none"], {
  variants: {
    variant: {
      underline: ["border-b border-(--nuka-border-base)", "gap-(--space-4)"],
      pill: [
        "bg-(--nuka-bg-muted)",
        "rounded-(--radius-lg)",
        "p-(--space-1)",
        "gap-(--space-1)",
      ],
      boxed: [
        "border border-(--nuka-border-base)",
        "rounded-(--radius-lg)",
        "p-(--space-1)",
        "gap-(--space-1)",
      ],
    },
  },
  defaultVariants: {
    variant: "underline",
  },
});

export type TabsListVariantProps = VariantProps<typeof tabsListVariants>;

export interface TabsListProps
  extends React.HTMLAttributes<HTMLDivElement>, TabsListVariantProps {}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ variant, className, onKeyDown, children, ...props }, ref) => {
    const { orientation } = useTabsContext();
    const listRef = React.useRef<HTMLDivElement>(null);

    const composedRef = composeRefs(ref, listRef);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      handleTabsKeyboard(e, listRef);
      onKeyDown?.(e);
    };

    return (
      <div
        ref={composedRef}
        role="tablist"
        aria-orientation={orientation}
        className={cn(
          tabsListVariants({ variant }),
          orientation === "vertical" && "flex-col",
          className,
        )}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    );
  },
);

TabsList.displayName = "TabsList";

function handleTabsKeyboard(
  e: React.KeyboardEvent<HTMLDivElement>,
  listRef: React.RefObject<HTMLDivElement | null>,
) {
  const list = listRef.current;
  if (!list) return;

  const triggers = Array.from(
    list.querySelectorAll<HTMLButtonElement>(TRIGGER_SELECTOR),
  );
  if (triggers.length === 0) return;

  const active = document.activeElement;
  const currentIndex = triggers.indexOf(active as HTMLButtonElement);
  if (currentIndex === -1) return;

  const isHorizontal = list.getAttribute("aria-orientation") !== "vertical";
  const prevKey = isHorizontal ? "ArrowLeft" : "ArrowUp";
  const nextKey = isHorizontal ? "ArrowRight" : "ArrowDown";

  let nextIndex: number | undefined;

  switch (e.key) {
    case nextKey:
      nextIndex = (currentIndex + 1) % triggers.length;
      break;
    case prevKey:
      nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
      break;
    case "Home":
      nextIndex = 0;
      break;
    case "End":
      nextIndex = triggers.length - 1;
      break;
    default:
      return;
  }

  e.preventDefault();
  triggers[nextIndex]?.focus();
}

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, disabled = false, className, onClick, onFocus, ...props }, ref) => {
    const ctx = useTabsContext();
    const isSelected = ctx.value === value;
    const triggerId = `${ctx.baseId}-trigger-${value}`;
    const panelId = `${ctx.baseId}-panel-${value}`;

    const isFocusTarget = ctx.focusedValue
      ? ctx.focusedValue === value
      : isSelected;

    const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
      ctx.setFocusedValue(value);
      if (ctx.activationMode === "automatic") {
        ctx.onValueChange(value);
      }
      onFocus?.(e);
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      ctx.onValueChange(value);
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        id={triggerId}
        aria-selected={isSelected}
        aria-controls={panelId}
        aria-disabled={disabled || undefined}
        disabled={disabled}
        tabIndex={isFocusTarget ? 0 : -1}
        data-state={isSelected ? "active" : "inactive"}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap",
          "text-[length:var(--font-size-sm)]",
          "font-[number:var(--font-weight-medium)]",
          "transition-colors duration-150",
          "focus-visible:outline-2 focus-visible:outline-offset-2",
          "focus-visible:outline-(--nuka-border-focus)",
          "disabled:pointer-events-none disabled:opacity-50",
          "cursor-pointer",
          "px-(--space-3) py-(--space-2)",
          "text-(--nuka-text-muted)",
          "hover:text-(--nuka-text-base)",
          "data-[state=active]:text-(--nuka-text-base)",
          "rounded-(--radius-md)",
          "data-[state=active]:bg-(--nuka-bg-base)",
          "data-[state=active]:shadow-sm",
          className,
        )}
        onFocus={handleFocus}
        onClick={handleClick}
        {...props}
      />
    );
  },
);

TabsTrigger.displayName = "TabsTrigger";

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
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

export { Tabs, TabsList, tabsListVariants, TabsTrigger, TabsContent };
