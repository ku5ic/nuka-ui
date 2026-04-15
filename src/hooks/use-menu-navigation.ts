"use client";
import type * as React from "react";
import { useCallback, useRef } from "react";

interface UseMenuNavigationOptions {
  onEscape?: (() => void) | undefined;
  onTab?: (() => void) | undefined;
}

interface ItemProps {
  tabIndex: number;
  ref: (el: HTMLElement | null) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

interface UseMenuNavigationReturn {
  getItemProps: (index: number) => ItemProps;
  focusItem: (index: number) => void;
  itemsRef: React.RefObject<(HTMLElement | null)[]>;
  resetTypeAhead: () => void;
}

function useMenuNavigation(
  options: UseMenuNavigationOptions = {},
): UseMenuNavigationReturn {
  const { onEscape, onTab } = options;
  const itemsRef = useRef<(HTMLElement | null)[]>([]);
  const typeAheadBuffer = useRef("");
  const typeAheadTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const getEnabledItems = useCallback(() => {
    const items = itemsRef.current;
    const result: { index: number; element: HTMLElement }[] = [];
    for (let i = 0; i < items.length; i++) {
      const el = items[i];
      if (el) {
        result.push({ index: i, element: el });
      }
    }
    return result;
  }, []);

  const focusItem = useCallback((index: number) => {
    const el = itemsRef.current[index];
    if (el) {
      el.focus();
    }
  }, []);

  const focusNextEnabled = useCallback(
    (currentIndex: number, direction: 1 | -1) => {
      const items = getEnabledItems();
      if (items.length === 0) return;

      const currentPos = items.findIndex((item) => item.index === currentIndex);
      if (currentPos === -1) {
        const first = items[0];
        if (first) focusItem(first.index);
        return;
      }

      const nextPos = (currentPos + direction + items.length) % items.length;
      const next = items[nextPos];
      if (next) focusItem(next.index);
    },
    [getEnabledItems, focusItem],
  );

  const focusFirst = useCallback(() => {
    const items = getEnabledItems();
    const first = items[0];
    if (first) {
      focusItem(first.index);
    }
  }, [getEnabledItems, focusItem]);

  const focusLast = useCallback(() => {
    const items = getEnabledItems();
    const last = items[items.length - 1];
    if (last) {
      focusItem(last.index);
    }
  }, [getEnabledItems, focusItem]);

  const handleTypeAhead = useCallback(
    (char: string, currentIndex: number) => {
      if (typeAheadTimer.current) {
        clearTimeout(typeAheadTimer.current);
      }

      typeAheadBuffer.current += char.toLowerCase();
      typeAheadTimer.current = setTimeout(() => {
        typeAheadBuffer.current = "";
      }, 500);

      const items = getEnabledItems();
      if (items.length === 0) return;

      const buffer = typeAheadBuffer.current;
      const currentPos = items.findIndex((item) => item.index === currentIndex);
      const startPos = currentPos === -1 ? 0 : currentPos;

      for (
        let offset = buffer.length === 1 ? 1 : 0;
        offset < items.length;
        offset++
      ) {
        const idx = (startPos + offset) % items.length;
        const item = items[idx];
        if (!item) continue;
        const text = (item.element.textContent || "").toLowerCase();
        if (text.startsWith(buffer)) {
          focusItem(item.index);
          return;
        }
      }
    },
    [getEnabledItems, focusItem],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          focusNextEnabled(index, 1);
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          focusNextEnabled(index, -1);
          break;
        }
        case "Home": {
          e.preventDefault();
          focusFirst();
          break;
        }
        case "End": {
          e.preventDefault();
          focusLast();
          break;
        }
        case "Escape": {
          e.preventDefault();
          onEscape?.();
          break;
        }
        case "Tab": {
          onTab?.();
          break;
        }
        default: {
          if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
            e.preventDefault();
            handleTypeAhead(e.key, index);
          }
          break;
        }
      }
    },
    [focusNextEnabled, focusFirst, focusLast, onEscape, onTab, handleTypeAhead],
  );

  const getItemProps = useCallback(
    (index: number): ItemProps => ({
      tabIndex: -1,
      ref: (el: HTMLElement | null) => {
        itemsRef.current[index] = el;
      },
      onKeyDown: (e: React.KeyboardEvent) => handleKeyDown(e, index),
    }),
    [handleKeyDown],
  );

  const resetTypeAhead = useCallback(() => {
    typeAheadBuffer.current = "";
    if (typeAheadTimer.current) {
      clearTimeout(typeAheadTimer.current);
      typeAheadTimer.current = undefined;
    }
  }, []);

  return { getItemProps, focusItem, itemsRef, resetTypeAhead };
}

export { useMenuNavigation };
export type { UseMenuNavigationOptions, UseMenuNavigationReturn };
