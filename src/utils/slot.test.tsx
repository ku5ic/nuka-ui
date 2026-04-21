import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Slot, composeRefs } from "@nuka/utils/slot";

describe("composeRefs", () => {
  it("calls a function ref", () => {
    const fnRef = vi.fn();
    const composed = composeRefs(fnRef);
    const node = document.createElement("div");
    composed(node);
    expect(fnRef).toHaveBeenCalledWith(node);
  });

  it("assigns to a ref object", () => {
    const objRef: React.RefObject<HTMLDivElement | null> = { current: null };
    const composed = composeRefs(objRef);
    const node = document.createElement("div");
    composed(node);
    expect(objRef.current).toBe(node);
  });

  it("handles multiple refs", () => {
    const fnRef = vi.fn();
    const objRef: React.RefObject<HTMLDivElement | null> = { current: null };
    const composed = composeRefs(fnRef, objRef);
    const node = document.createElement("div");
    composed(node);
    expect(fnRef).toHaveBeenCalledWith(node);
    expect(objRef.current).toBe(node);
  });

  it("skips null and undefined entries", () => {
    const fnRef = vi.fn();
    const composed = composeRefs(null, undefined, fnRef, undefined);
    const node = document.createElement("div");
    composed(node);
    expect(fnRef).toHaveBeenCalledWith(node);
  });
});

describe("Slot", () => {
  it("renders child element, not a wrapper", () => {
    render(
      <Slot data-testid="slot">
        <button type="button">Click</button>
      </Slot>,
    );
    const button = screen.getByRole("button", { name: "Click" });
    expect(button.tagName).toBe("BUTTON");
    // No wrapper element: the button's parent should be the container
    expect(button.parentElement?.tagName).not.toBe("SLOT");
  });

  it("merges className from both Slot and child", () => {
    render(
      <Slot className="from-slot">
        <div className="from-child" data-testid="target" />
      </Slot>,
    );
    const el = screen.getByTestId("target");
    expect(el.className).toContain("from-slot");
    expect(el.className).toContain("from-child");
  });

  it("merges style from both, child wins on conflicts", () => {
    render(
      <Slot style={{ color: "red", fontSize: "14px" }}>
        <div style={{ color: "blue", margin: "8px" }} data-testid="target" />
      </Slot>,
    );
    const el = screen.getByTestId("target");
    expect(el.style.color).toBe("blue");
    expect(el.style.fontSize).toBe("14px");
    expect(el.style.margin).toBe("8px");
  });

  it("composes event handlers: both fire", async () => {
    const user = userEvent.setup();
    const slotHandler = vi.fn();
    const childHandler = vi.fn();

    render(
      <Slot onClick={slotHandler}>
        <button type="button" onClick={childHandler}>
          Click
        </button>
      </Slot>,
    );

    await user.click(screen.getByRole("button", { name: "Click" }));
    expect(slotHandler).toHaveBeenCalledTimes(1);
    expect(childHandler).toHaveBeenCalledTimes(1);
  });

  it("child's preventDefault does not suppress Slot's handler", async () => {
    const user = userEvent.setup();
    const callOrder: string[] = [];
    const slotHandler = vi.fn(() => callOrder.push("slot"));
    const childHandler = vi.fn((e: React.MouseEvent) => {
      e.preventDefault();
      callOrder.push("child");
    });

    render(
      <Slot onClick={slotHandler}>
        <button type="button" onClick={childHandler}>
          Click
        </button>
      </Slot>,
    );

    await user.click(screen.getByRole("button", { name: "Click" }));
    expect(slotHandler).toHaveBeenCalledTimes(1);
    expect(childHandler).toHaveBeenCalledTimes(1);
  });

  it("Slot's handler fires before child's", async () => {
    const user = userEvent.setup();
    const callOrder: string[] = [];

    render(
      <Slot onClick={() => callOrder.push("slot")}>
        <button type="button" onClick={() => callOrder.push("child")}>
          Click
        </button>
      </Slot>,
    );

    await user.click(screen.getByRole("button", { name: "Click" }));
    expect(callOrder).toEqual(["slot", "child"]);
  });

  it("forwards ref to child element", () => {
    const ref = React.createRef<HTMLButtonElement>();

    render(
      <Slot ref={ref}>
        <button type="button">Click</button>
      </Slot>,
    );

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current?.textContent).toBe("Click");
  });

  it("composes two refs when child already has a ref", () => {
    const slotRef = React.createRef<HTMLButtonElement>();
    const childRef = React.createRef<HTMLButtonElement>();

    function TestCase() {
      return (
        <Slot ref={slotRef}>
          <button type="button" ref={childRef}>
            Click
          </button>
        </Slot>
      );
    }

    render(<TestCase />);

    expect(slotRef.current).toBeInstanceOf(HTMLButtonElement);
    expect(childRef.current).toBeInstanceOf(HTMLButtonElement);
    expect(slotRef.current).toBe(childRef.current);
  });

  it("throws in development when child is not a valid React element", () => {
    // Suppress console.error from React's error boundary
    const spy = vi.spyOn(console, "error").mockImplementation(vi.fn());

    expect(() => {
      render(<Slot>{"just a string" as unknown as React.ReactElement}</Slot>);
    }).toThrow("Slot requires a single valid React element as its child");

    spy.mockRestore();
  });

  it("passes through arbitrary HTML attributes to child", () => {
    render(
      <Slot data-testid="target" aria-label="custom" id="slot-id">
        <div />
      </Slot>,
    );
    const el = screen.getByTestId("target");
    expect(el.getAttribute("aria-label")).toBe("custom");
    expect(el.getAttribute("id")).toBe("slot-id");
  });

  describe("data-slot forwarding (ADR-054)", () => {
    it("forwards data-slot from Slot to the child element", () => {
      render(
        <Slot data-slot="trigger">
          <button type="button">Click</button>
        </Slot>,
      );
      const button = screen.getByRole("button", { name: "Click" });
      expect(button.getAttribute("data-slot")).toBe("trigger");
    });

    it("forwards arbitrary additional data-* attributes alongside data-slot", () => {
      render(
        <Slot data-slot="content" data-state="open" data-side="right">
          <div data-testid="panel" />
        </Slot>,
      );
      const panel = screen.getByTestId("panel");
      expect(panel.getAttribute("data-slot")).toBe("content");
      expect(panel.getAttribute("data-state")).toBe("open");
      expect(panel.getAttribute("data-side")).toBe("right");
    });

    it("lets the child override a data-slot set by Slot", () => {
      render(
        <Slot data-slot="trigger">
          <button type="button" data-slot="custom">
            Click
          </button>
        </Slot>,
      );
      const button = screen.getByRole("button", { name: "Click" });
      expect(button.getAttribute("data-slot")).toBe("custom");
    });
  });
});
