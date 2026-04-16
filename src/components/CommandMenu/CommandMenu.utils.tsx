import type * as React from "react";

function getVisibleItems(
  listRef: React.RefObject<HTMLDivElement | null>,
): HTMLElement[] {
  if (listRef.current == null) return [];
  return Array.from(
    listRef.current.querySelectorAll<HTMLElement>(
      '[role="option"]:not([hidden])',
    ),
  );
}

const SearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export { getVisibleItems, SearchIcon };
