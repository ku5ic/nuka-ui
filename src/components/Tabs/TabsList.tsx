"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { composeRefs } from "@nuka/utils/slot";
import { getActiveElement } from "@nuka/utils/get-active-element";
import { getRovingIndex } from "@nuka/utils/roving-index";
import type { RovingOrientation } from "@nuka/utils/roving-index";
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
      data-slot="list"
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

  const active = getActiveElement();
  const currentIndex = triggers.indexOf(active as HTMLButtonElement);
  if (currentIndex === -1) return;

  const isHorizontal = list.getAttribute("aria-orientation") !== "vertical";
  const orientation: RovingOrientation = isHorizontal
    ? "horizontal"
    : "vertical";

  const nextIndex = getRovingIndex(
    e.key,
    currentIndex,
    triggers.length,
    orientation,
  );
  if (nextIndex === undefined) return;

  e.preventDefault();
  triggers[nextIndex]?.focus();
}

export { TabsList };
