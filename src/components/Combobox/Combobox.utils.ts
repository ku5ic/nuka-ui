import type * as React from "react";

export function getNavigableOptions(
  listRef: React.RefObject<HTMLDivElement | null>,
): HTMLElement[] {
  if (listRef.current == null) return [];
  return Array.from(
    listRef.current.querySelectorAll<HTMLElement>(
      '[role="option"]:not([hidden]):not([aria-disabled="true"])',
    ),
  );
}

export function getLabel(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  return "";
}
