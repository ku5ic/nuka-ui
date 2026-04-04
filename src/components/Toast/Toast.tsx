import * as React from "react"
import { cva } from "@nuka/utils/variants"
import { cn } from "@nuka/utils/cn"
import type { ToastItem } from "@nuka/components/Toast/toastStore"

const toastVariants = cva(
  [
    "relative flex items-start gap-[var(--space-3)]",
    "w-80 rounded-[var(--radius-md)] border p-[var(--space-4)]",
    "shadow-lg",
    "transition-all duration-300",
    "data-[state=open]:animate-[nuka-toast-enter_200ms_ease-out]",
    "data-[state=closed]:animate-[nuka-toast-exit_300ms_ease-in_forwards]",
  ],
  {
    variants: {
      intent: {
        default: [
          "bg-[var(--nuka-bg-base)]",
          "border-[var(--nuka-border-base)]",
          "text-[var(--nuka-text-base)]",
        ],
        success: [
          "bg-[var(--nuka-success-bg)]",
          "border-[var(--nuka-success-border)]",
          "text-[var(--nuka-success-text)]",
        ],
        danger: [
          "bg-[var(--nuka-danger-bg)]",
          "border-[var(--nuka-danger-border)]",
          "text-[var(--nuka-danger-text)]",
        ],
        warning: [
          "bg-[var(--nuka-warning-bg)]",
          "border-[var(--nuka-warning-border)]",
          "text-[var(--nuka-warning-text)]",
        ],
      },
    },
    defaultVariants: {
      intent: "default",
    },
  },
)

export interface ToastProps {
  toast: ToastItem
  onDismiss: (id: string) => void
}

function Toast({ toast: toastItem, onDismiss }: ToastProps) {
  return (
    <div
      role="status"
      aria-live={toastItem.intent === "danger" ? "assertive" : "polite"}
      aria-atomic="true"
      data-state={toastItem.dismissing ? "closed" : "open"}
      className={cn(toastVariants({ intent: toastItem.intent }))}
    >
      <div className="flex-1 text-sm font-medium">{toastItem.message}</div>
      {toastItem.action != null && (
        <button
          type="button"
          onClick={() => {
            toastItem.action?.onClick()
            onDismiss(toastItem.id)
          }}
          className="shrink-0 text-sm font-medium underline underline-offset-2 hover:no-underline"
        >
          {toastItem.action.label}
        </button>
      )}
      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={() => onDismiss(toastItem.id)}
        className={cn(
          "shrink-0 rounded",
          "opacity-60 hover:opacity-100",
          "transition-opacity duration-150 cursor-pointer",
          "focus-visible:outline-2 focus-visible:outline-offset-2",
          "focus-visible:outline-[var(--nuka-border-focus)]",
        )}
      >
        <span aria-hidden="true">&#10005;</span>
      </button>
    </div>
  )
}

Toast.displayName = "Toast"

export { Toast, toastVariants }
