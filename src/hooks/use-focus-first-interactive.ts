"use client";
import { useEffect } from "react";
import type { RefObject } from "react";

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function useFocusFirstInteractive(
  containerRef: RefObject<HTMLElement | null>,
  enabled: boolean,
): void {
  useEffect(() => {
    if (enabled) {
      const frame = requestAnimationFrame(() => {
        const focusable =
          containerRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
        if (focusable) {
          focusable.focus();
        } else {
          containerRef.current?.focus();
        }
      });
      return () => cancelAnimationFrame(frame);
    }
    return undefined;
  }, [enabled, containerRef]);
}

export { useFocusFirstInteractive };
