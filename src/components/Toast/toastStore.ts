export type ToastIntent = "default" | "success" | "danger" | "warning"

export interface ToastAction {
  label: string
  onClick: () => void
}

export interface ToastItem {
  id: string
  message: string
  intent: ToastIntent
  duration: number
  visible: boolean
  dismissing: boolean
  action?: ToastAction
}

export interface ToastOptions {
  intent?: ToastIntent
  duration?: number
  action?: ToastAction
}

const MAX_VISIBLE = 5
const DEFAULT_DURATION = 4000
const EXIT_ANIMATION_DURATION = 300

let state: ToastItem[] = []
const listeners = new Set<() => void>()
const timers = new Map<string, ReturnType<typeof setTimeout>>()

function notify(): void {
  for (const listener of listeners) {
    listener()
  }
}

function setState(updater: (prev: ToastItem[]) => ToastItem[]): void {
  state = updater(state)
  notify()
}

function generateId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID()
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

function startTimer(id: string, duration: number): void {
  if (duration === Infinity) return
  const timer = setTimeout(() => {
    timers.delete(id)
    dismiss(id)
  }, duration)
  timers.set(id, timer)
}

function flush(): void {
  const visibleCount = state.filter((t) => t.visible && !t.dismissing).length
  let slotsAvailable = MAX_VISIBLE - visibleCount

  if (slotsAvailable <= 0) return

  const updated = state.map((t) => {
    if (slotsAvailable <= 0 || t.visible || t.dismissing) return t
    slotsAvailable--
    startTimer(t.id, t.duration)
    return { ...t, visible: true }
  })

  state = updated
  notify()
}

function add(message: string, options?: ToastOptions): string {
  const id = generateId()
  const item: ToastItem = {
    id,
    message,
    intent: options?.intent ?? "default",
    duration: options?.duration ?? DEFAULT_DURATION,
    visible: false,
    dismissing: false,
    ...(options?.action != null ? { action: options.action } : {}),
  }

  setState((prev) => [...prev, item])
  flush()
  return id
}

function dismiss(id: string): void {
  const existing = state.find((t) => t.id === id)
  if (!existing || existing.dismissing) return

  const timer = timers.get(id)
  if (timer != null) {
    clearTimeout(timer)
    timers.delete(id)
  }

  setState((prev) =>
    prev.map((t) => (t.id === id ? { ...t, dismissing: true } : t)),
  )

  setTimeout(() => {
    remove(id)
  }, EXIT_ANIMATION_DURATION)
}

function remove(id: string): void {
  setState((prev) => prev.filter((t) => t.id !== id))
  flush()
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function getSnapshot(): ToastItem[] {
  return state
}

function __reset(): void {
  for (const timer of timers.values()) {
    clearTimeout(timer)
  }
  timers.clear()
  state = []
  notify()
}

function toast(message: string, options?: ToastOptions): string {
  return add(message, options)
}

toast.success = (
  message: string,
  options?: Omit<ToastOptions, "intent">,
): string => add(message, { ...options, intent: "success" })

toast.danger = (
  message: string,
  options?: Omit<ToastOptions, "intent">,
): string => add(message, { ...options, intent: "danger" })

toast.warning = (
  message: string,
  options?: Omit<ToastOptions, "intent">,
): string => add(message, { ...options, intent: "warning" })

toast.dismiss = (id: string): void => {
  dismiss(id)
}

const toastStore = { subscribe, getSnapshot, __reset }

export { toast, toastStore }
