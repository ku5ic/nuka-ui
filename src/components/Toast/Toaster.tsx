import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Portal } from "@nuka/utils/portal";
import { toast, toastStore } from "@nuka/components/Toast/toastStore";
import type { ToastItem } from "@nuka/components/Toast/toastStore";
import { Toast } from "@nuka/components/Toast/Toast";

export type ToasterPosition =
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center";

const positionClasses: Record<ToasterPosition, string> = {
  "top-right": "top-0 right-0 items-end",
  "top-left": "top-0 left-0 items-start",
  "top-center": "top-0 left-1/2 -translate-x-1/2 items-center",
  "bottom-right": "bottom-0 right-0 items-end",
  "bottom-left": "bottom-0 left-0 items-start",
  "bottom-center": "bottom-0 left-1/2 -translate-x-1/2 items-center",
};

const emptySnapshot: ToastItem[] = [];

export interface ToasterProps {
  position?: ToasterPosition;
  className?: string;
}

const Toaster = React.forwardRef<HTMLDivElement, ToasterProps>(
  ({ position = "bottom-right", className }, ref) => {
    const toasts = React.useSyncExternalStore(
      toastStore.subscribe,
      toastStore.getSnapshot,
      () => emptySnapshot,
    );

    const visibleToasts = toasts.filter((t) => t.visible);

    if (visibleToasts.length === 0) return null;

    return (
      <Portal>
        <div
          ref={ref}
          role="region"
          aria-label="Notifications"
          className={cn(
            "fixed z-50 flex flex-col gap-(--space-2) p-(--space-4)",
            positionClasses[position],
            className,
          )}
        >
          {visibleToasts.map((t) => (
            <Toast key={t.id} toast={t} onDismiss={toast.dismiss} />
          ))}
        </div>
      </Portal>
    );
  },
);

Toaster.displayName = "Toaster";

export { Toaster };
