"use client";
import { useEffect } from "react";

function useModalTitleWarning(
  displayName: string,
  titleId: string,
  open: boolean,
): void {
  useEffect(() => {
    if (open && process.env.NODE_ENV !== "production") {
      const frame = requestAnimationFrame(() => {
        if (!document.getElementById(titleId)) {
          console.error(
            `${displayName}: a <${displayName}Title> is required for accessible labeling. ` +
              `Add a <${displayName}Title> inside <${displayName}Content>.`,
          );
        }
      });
      return () => cancelAnimationFrame(frame);
    }
    return undefined;
  }, [open, displayName, titleId]);
}

export { useModalTitleWarning };
