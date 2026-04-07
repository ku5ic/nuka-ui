import { useEffect, useRef } from "react";
import { tabbable } from "tabbable";

function useFocusTrap(
  containerRef: React.RefObject<HTMLElement | null>,
  active: boolean,
) {
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) return undefined;

    const container = containerRef.current;
    if (!container) return undefined;

    restoreRef.current = document.activeElement as HTMLElement | null;

    const tabbableOptions = { displayCheck: "none" as const };

    const frame = requestAnimationFrame(() => {
      const focusableElements = tabbable(container, tabbableOptions);
      if (focusableElements.length > 0) {
        focusableElements[0]?.focus();
      } else {
        container.focus();
      }
    });

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== "Tab" || !container) return;

      const focusableElements = tabbable(container, tabbableOptions);
      if (focusableElements.length === 0) {
        e.preventDefault();
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      if (!first || !last) return;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    function handleFocusOut(e: FocusEvent) {
      const relatedTarget = e.relatedTarget as HTMLElement | null;
      if (
        relatedTarget &&
        container &&
        !container.contains(relatedTarget)
      ) {
        const focusableElements = tabbable(container, tabbableOptions);
        if (focusableElements.length > 0) {
          focusableElements[0]?.focus();
        } else {
          container.focus();
        }
      }
    }

    container.addEventListener("keydown", handleKeyDown);
    container.addEventListener("focusout", handleFocusOut);

    return () => {
      cancelAnimationFrame(frame);
      container.removeEventListener("keydown", handleKeyDown);
      container.removeEventListener("focusout", handleFocusOut);

      restoreRef.current?.focus();
      restoreRef.current = null;
    };
  }, [active, containerRef]);
}

export { useFocusTrap };
