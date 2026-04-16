"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { composeRefs } from "@nuka/utils/slot";
import { useTabsContext } from "@nuka/components/Tabs/Tabs.context";
import {
  tabsListVariants,
  type TabsListVariantProps,
} from "@nuka/components/Tabs/Tabs.variants";

const TRIGGER_SELECTOR = '[role="tab"]:not([aria-disabled="true"])';

export interface TabsListProps
  extends React.HTMLAttributes<HTMLDivElement>, TabsListVariantProps {
  ref?: React.Ref<HTMLDivElement> | undefined;
}

function TabsList({
  ref,
  variant,
  className,
  onKeyDown,
  children,
  ...props
}: TabsListProps) {
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
}

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

export { TabsList };
