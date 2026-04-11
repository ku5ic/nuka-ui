import { useEffect } from "react";

let lockCount = 0;
let originalOverflow = "";
let originalPaddingRight = "";

function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return undefined;
    if (typeof document === "undefined") return undefined;

    lockCount++;

    if (lockCount === 1) {
      originalOverflow = document.body.style.overflow;
      originalPaddingRight = document.body.style.paddingRight;

      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = String(scrollbarWidth) + "px";
      }
    }

    return () => {
      lockCount--;

      if (lockCount === 0) {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      }
    };
  }, [active]);
}

// Exposed for test cleanup only. Not part of the public API.
function __resetScrollLock() {
  lockCount = 0;
  originalOverflow = "";
  originalPaddingRight = "";
}

export { useScrollLock, __resetScrollLock };
