import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { toast, toastStore } from "@nuka/components/Toast/toastStore"
import type { ToastItem } from "@nuka/components/Toast/toastStore"
import { Toast } from "@nuka/components/Toast/Toast"
import { Toaster } from "@nuka/components/Toast/Toaster"

describe("toastStore", () => {
  beforeEach(() => {
    vi.useFakeTimers()
    toastStore.__reset()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("adds a toast and returns an id", () => {
    const id = toast("Hello")
    expect(typeof id).toBe("string")
    expect(id.length).toBeGreaterThan(0)

    const snapshot = toastStore.getSnapshot()
    expect(snapshot).toHaveLength(1)
    expect(snapshot[0]?.message).toBe("Hello")
  })

  it("defaults to intent 'default' and duration 4000", () => {
    toast("msg")
    const item = toastStore.getSnapshot()[0]
    expect(item?.intent).toBe("default")
    expect(item?.duration).toBe(4000)
  })

  it("toast.success sets intent to success", () => {
    toast.success("ok")
    expect(toastStore.getSnapshot()[0]?.intent).toBe("success")
  })

  it("toast.danger sets intent to danger", () => {
    toast.danger("fail")
    expect(toastStore.getSnapshot()[0]?.intent).toBe("danger")
  })

  it("toast.warning sets intent to warning", () => {
    toast.warning("warn")
    expect(toastStore.getSnapshot()[0]?.intent).toBe("warning")
  })

  it("marks the first toast as visible immediately", () => {
    toast("msg")
    expect(toastStore.getSnapshot()[0]?.visible).toBe(true)
  })

  it("allows max 5 visible toasts", () => {
    for (let i = 0; i < 7; i++) {
      toast(`msg-${String(i)}`)
    }
    const snapshot = toastStore.getSnapshot()
    expect(snapshot).toHaveLength(7)
    const visibleCount = snapshot.filter((t) => t.visible).length
    expect(visibleCount).toBe(5)
  })

  it("dismiss marks a toast as dismissing", () => {
    const id = toast("msg")
    toast.dismiss(id)
    expect(toastStore.getSnapshot()[0]?.dismissing).toBe(true)
  })

  it("dismiss removes the toast after exit animation duration", () => {
    const id = toast("msg")
    toast.dismiss(id)
    expect(toastStore.getSnapshot()).toHaveLength(1)

    vi.advanceTimersByTime(300)
    expect(toastStore.getSnapshot()).toHaveLength(0)
  })

  it("auto-dismisses after default duration", () => {
    toast("msg")
    expect(toastStore.getSnapshot()[0]?.dismissing).toBe(false)

    vi.advanceTimersByTime(4000)
    expect(toastStore.getSnapshot()[0]?.dismissing).toBe(true)

    vi.advanceTimersByTime(300)
    expect(toastStore.getSnapshot()).toHaveLength(0)
  })

  it("duration Infinity never auto-dismisses", () => {
    toast("msg", { duration: Infinity })
    vi.advanceTimersByTime(60000)
    expect(toastStore.getSnapshot()[0]?.dismissing).toBe(false)
    expect(toastStore.getSnapshot()[0]?.visible).toBe(true)
  })

  it("promotes queued toasts after dismiss", () => {
    for (let i = 0; i < 7; i++) {
      toast(`msg-${String(i)}`)
    }

    const firstId = toastStore.getSnapshot()[0]!.id
    toast.dismiss(firstId)
    vi.advanceTimersByTime(300)

    const snapshot = toastStore.getSnapshot()
    expect(snapshot).toHaveLength(6)
    const visibleCount = snapshot.filter((t) => t.visible).length
    expect(visibleCount).toBe(5)
  })

  it("subscribe notifies listeners on state change", () => {
    const listener = vi.fn()
    const unsub = toastStore.subscribe(listener)

    toast("msg")
    expect(listener).toHaveBeenCalled()

    unsub()
    listener.mockClear()
    toast("msg2")
    expect(listener).not.toHaveBeenCalled()
  })

  it("__reset clears all toasts", () => {
    toast("a")
    toast("b")
    toastStore.__reset()
    expect(toastStore.getSnapshot()).toHaveLength(0)
  })

  it("supports action option", () => {
    const onClick = vi.fn()
    toast("msg", { action: { label: "Undo", onClick } })
    expect(toastStore.getSnapshot()[0]?.action?.label).toBe("Undo")
  })

  it("uses custom duration", () => {
    toast("msg", { duration: 8000 })
    vi.advanceTimersByTime(4000)
    expect(toastStore.getSnapshot()[0]?.dismissing).toBe(false)

    vi.advanceTimersByTime(4000)
    expect(toastStore.getSnapshot()[0]?.dismissing).toBe(true)
  })
})

describe("Toast", () => {
  const baseToast: ToastItem = {
    id: "test-1",
    message: "Test message",
    intent: "default",
    duration: 4000,
    visible: true,
    dismissing: false,
  }

  it("renders message text", () => {
    const onDismiss = vi.fn()
    render(<Toast toast={baseToast} onDismiss={onDismiss} />)
    expect(screen.getByText("Test message")).toBeInTheDocument()
  })

  it("has role=status", () => {
    const onDismiss = vi.fn()
    render(<Toast toast={baseToast} onDismiss={onDismiss} />)
    expect(screen.getByRole("status")).toBeInTheDocument()
  })

  it("has aria-live=polite for default intent", () => {
    const onDismiss = vi.fn()
    render(<Toast toast={baseToast} onDismiss={onDismiss} />)
    expect(screen.getByRole("status")).toHaveAttribute("aria-live", "polite")
  })

  it("has aria-live=polite for success intent", () => {
    const onDismiss = vi.fn()
    render(
      <Toast toast={{ ...baseToast, intent: "success" }} onDismiss={onDismiss} />,
    )
    expect(screen.getByRole("status")).toHaveAttribute("aria-live", "polite")
  })

  it("has aria-live=polite for warning intent", () => {
    const onDismiss = vi.fn()
    render(
      <Toast toast={{ ...baseToast, intent: "warning" }} onDismiss={onDismiss} />,
    )
    expect(screen.getByRole("status")).toHaveAttribute("aria-live", "polite")
  })

  it("has aria-live=assertive for danger intent", () => {
    const onDismiss = vi.fn()
    render(
      <Toast toast={{ ...baseToast, intent: "danger" }} onDismiss={onDismiss} />,
    )
    expect(screen.getByRole("status")).toHaveAttribute("aria-live", "assertive")
  })

  it("has data-state=open when not dismissing", () => {
    const onDismiss = vi.fn()
    render(<Toast toast={baseToast} onDismiss={onDismiss} />)
    expect(screen.getByRole("status")).toHaveAttribute("data-state", "open")
  })

  it("has data-state=closed when dismissing", () => {
    const onDismiss = vi.fn()
    render(
      <Toast toast={{ ...baseToast, dismissing: true }} onDismiss={onDismiss} />,
    )
    expect(screen.getByRole("status")).toHaveAttribute("data-state", "closed")
  })

  it("dismiss button has correct aria-label", () => {
    const onDismiss = vi.fn()
    render(<Toast toast={baseToast} onDismiss={onDismiss} />)
    expect(
      screen.getByRole("button", { name: "Dismiss notification" }),
    ).toBeInTheDocument()
  })

  it("calls onDismiss with correct id when dismiss button clicked", async () => {
    const user = userEvent.setup()
    const onDismiss = vi.fn()
    render(<Toast toast={baseToast} onDismiss={onDismiss} />)

    await user.click(
      screen.getByRole("button", { name: "Dismiss notification" }),
    )
    expect(onDismiss).toHaveBeenCalledWith("test-1")
  })

  it("applies intent classes for success", () => {
    const onDismiss = vi.fn()
    render(
      <Toast toast={{ ...baseToast, intent: "success" }} onDismiss={onDismiss} />,
    )
    const el = screen.getByRole("status")
    expect(el.className).toContain("bg-(--nuka-success-bg)")
  })

  it("applies intent classes for danger", () => {
    const onDismiss = vi.fn()
    render(
      <Toast toast={{ ...baseToast, intent: "danger" }} onDismiss={onDismiss} />,
    )
    const el = screen.getByRole("status")
    expect(el.className).toContain("bg-(--nuka-danger-bg)")
  })

  it("applies intent classes for warning", () => {
    const onDismiss = vi.fn()
    render(
      <Toast toast={{ ...baseToast, intent: "warning" }} onDismiss={onDismiss} />,
    )
    const el = screen.getByRole("status")
    expect(el.className).toContain("bg-(--nuka-warning-bg)")
  })

  it("renders action button when action is provided", () => {
    const onDismiss = vi.fn()
    const onClick = vi.fn()
    render(
      <Toast
        toast={{ ...baseToast, action: { label: "Undo", onClick } }}
        onDismiss={onDismiss}
      />,
    )
    expect(screen.getByRole("button", { name: "Undo" })).toBeInTheDocument()
  })

  it("calls action onClick and onDismiss when action button clicked", async () => {
    const user = userEvent.setup()
    const onDismiss = vi.fn()
    const onClick = vi.fn()
    render(
      <Toast
        toast={{ ...baseToast, action: { label: "Undo", onClick } }}
        onDismiss={onDismiss}
      />,
    )

    await user.click(screen.getByRole("button", { name: "Undo" }))
    expect(onClick).toHaveBeenCalledOnce()
    expect(onDismiss).toHaveBeenCalledWith("test-1")
  })

  it("does not render action button when action is not provided", () => {
    const onDismiss = vi.fn()
    render(<Toast toast={baseToast} onDismiss={onDismiss} />)
    const buttons = screen.getAllByRole("button")
    expect(buttons).toHaveLength(1) // only dismiss button
  })
})

describe("Toaster", () => {
  beforeEach(() => {
    vi.useFakeTimers()
    toastStore.__reset()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("renders nothing when no toasts", () => {
    const { container } = render(<Toaster />)
    expect(container).toBeEmptyDOMElement()
  })

  it("renders a toast when one is added", () => {
    toast("Hello from toaster")
    render(<Toaster />)
    expect(screen.getByText("Hello from toaster")).toBeInTheDocument()
  })

  it("renders one Toast per visible toast", () => {
    toast("First")
    toast("Second")
    render(<Toaster />)
    expect(screen.getByText("First")).toBeInTheDocument()
    expect(screen.getByText("Second")).toBeInTheDocument()
  })

  it("does not render non-visible (queued) toasts", () => {
    for (let i = 0; i < 7; i++) {
      toast(`msg-${String(i)}`)
    }
    render(<Toaster />)
    const statuses = screen.getAllByRole("status")
    expect(statuses).toHaveLength(5)
  })

  it("has aria-label=Notifications on container", () => {
    toast("msg")
    render(<Toaster />)
    expect(screen.getByLabelText("Notifications")).toBeInTheDocument()
  })

  it("defaults to bottom-right position", () => {
    toast("msg")
    render(<Toaster />)
    const container = screen.getByLabelText("Notifications")
    expect(container.className).toContain("bottom-0")
    expect(container.className).toContain("right-0")
  })

  it("applies top-left position classes", () => {
    toast("msg")
    render(<Toaster position="top-left" />)
    const container = screen.getByLabelText("Notifications")
    expect(container.className).toContain("top-0")
    expect(container.className).toContain("left-0")
  })

  it("applies top-center position classes", () => {
    toast("msg")
    render(<Toaster position="top-center" />)
    const container = screen.getByLabelText("Notifications")
    expect(container.className).toContain("top-0")
    expect(container.className).toContain("left-1/2")
  })

  it("merges className on container", () => {
    toast("msg")
    render(<Toaster className="custom-class" />)
    const container = screen.getByLabelText("Notifications")
    expect(container.className).toContain("custom-class")
  })
})
