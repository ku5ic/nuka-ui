"use client";
import { useEffect } from "react";

interface ScrollLockState {
  count: number;
  originalOverflow: string;
  originalPaddingRight: string;
}

function getScrollLockState(): ScrollLockState {
  if (typeof window === "undefined") {
    return { count: 0, originalOverflow: "", originalPaddingRight: "" };
  }
  const win = window as typeof window & { __nukaScrollLock?: ScrollLockState };
  win.__nukaScrollLock ??= {
    count: 0,
    originalOverflow: "",
    originalPaddingRight: "",
  };
  return win.__nukaScrollLock;
}

function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return undefined;
    if (typeof document === "undefined") return undefined;

    const state = getScrollLockState();
    state.count++;

    if (state.count === 1) {
      state.originalOverflow = document.body.style.overflow;
      state.originalPaddingRight = document.body.style.paddingRight;

      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = String(scrollbarWidth) + "px";
      }
    }

    return () => {
      state.count--;

      if (state.count === 0) {
        document.body.style.overflow = state.originalOverflow;
        document.body.style.paddingRight = state.originalPaddingRight;
      }
    };
  }, [active]);
}

// Exposed for test cleanup only. Not part of the public API.
function __resetScrollLock() {
  if (typeof window !== "undefined") {
    const win = window as typeof window & {
      __nukaScrollLock?: ScrollLockState;
    };
    delete win.__nukaScrollLock;
  }
}

export { useScrollLock, __resetScrollLock };
