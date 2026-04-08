import * as React from "react";
import { cva } from "@nuka/utils/variants";
import { cn } from "@nuka/utils/cn";
import { DismissButton } from "@nuka/utils/dismiss-button";
import { Button } from "@nuka/components/Button";
import type { ToastItem } from "@nuka/components/Toast/toastStore";

const toastVariants = cva(
  [
    "relative flex items-start gap-(--space-3)",
    "w-80 rounded-(--radius-md) border p-(--space-4)",
    "shadow-lg",
    "transition-all duration-300",
    "data-[state=open]:animate-[nuka-toast-enter_200ms_ease-out]",
    "data-[state=closed]:animate-[nuka-toast-exit_300ms_ease-in_forwards]",
  ],
  {
    variants: {
      intent: {
        default: [
          "bg-(--nuka-bg-base)",
          "border-(--nuka-border-base)",
          "text-(--nuka-text-base)",
        ],
        success: [
          "bg-(--nuka-success-bg)",
          "border-(--nuka-success-border)",
          "text-(--nuka-success-text)",
        ],
        danger: [
          "bg-(--nuka-danger-bg)",
          "border-(--nuka-danger-border)",
          "text-(--nuka-danger-text)",
        ],
        warning: [
          "bg-(--nuka-warning-bg)",
          "border-(--nuka-warning-border)",
          "text-(--nuka-warning-text)",
        ],
      },
    },
    defaultVariants: {
      intent: "default",
    },
  },
);

export interface ToastProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ toast: toastItem, onDismiss }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-live={toastItem.intent === "danger" ? "assertive" : "polite"}
        aria-atomic="true"
        data-state={toastItem.dismissing ? "closed" : "open"}
        className={cn(toastVariants({ intent: toastItem.intent }))}
      >
        <div className="flex-1 text-sm font-medium">{toastItem.message}</div>
        {toastItem.action != null && (
          <Button
            variant="link"
            size="sm"
            className="shrink-0"
            onClick={() => {
              toastItem.action?.onClick();
              onDismiss(toastItem.id);
            }}
          >
            {toastItem.action.label}
          </Button>
        )}
        <DismissButton
          onClick={() => onDismiss(toastItem.id)}
          label="Dismiss notification"
          className="shrink-0"
        />
      </div>
    );
  },
);

Toast.displayName = "Toast";

export { Toast, toastVariants };
