import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useFocusTrap } from "./use-focus-trap";

function TrapHarness({ active }: { active: boolean }) {
  const ref = React.useRef<HTMLDivElement>(null);
  useFocusTrap(ref, active);

  return React.createElement(
    "div",
    { ref, tabIndex: -1, "data-testid": "container" },
    React.createElement("button", { type: "button" }, "First"),
    React.createElement("button", { type: "button" }, "Second"),
    React.createElement("button", { type: "button" }, "Third"),
  );
}

function EmptyTrapHarness({ active }: { active: boolean }) {
  const ref = React.useRef<HTMLDivElement>(null);
  useFocusTrap(ref, active);

  return React.createElement(
    "div",
    { ref, tabIndex: -1, "data-testid": "container" },
    React.createElement("span", null, "No focusable children"),
  );
}

describe("useFocusTrap", () => {
  it("moves focus to first tabbable element on activate", async () => {
    render(React.createElement(TrapHarness, { active: true }));

    await act(async () => {
      await new Promise((r) => requestAnimationFrame(r));
    });

    expect(screen.getByRole("button", { name: "First" })).toHaveFocus();
  });

  it("focuses container when no tabbable children", async () => {
    render(React.createElement(EmptyTrapHarness, { active: true }));

    await act(async () => {
      await new Promise((r) => requestAnimationFrame(r));
    });

    expect(screen.getByTestId("container")).toHaveFocus();
  });

  it("cycles focus from last to first on Tab", async () => {
    const user = userEvent.setup();
    render(React.createElement(TrapHarness, { active: true }));

    await act(async () => {
      await new Promise((r) => requestAnimationFrame(r));
    });

    screen.getByRole("button", { name: "Third" }).focus();
    await user.keyboard("{Tab}");

    expect(screen.getByRole("button", { name: "First" })).toHaveFocus();
  });

  it("cycles focus from first to last on Shift+Tab", async () => {
    const user = userEvent.setup();
    render(React.createElement(TrapHarness, { active: true }));

    await act(async () => {
      await new Promise((r) => requestAnimationFrame(r));
    });

    screen.getByRole("button", { name: "First" }).focus();
    await user.keyboard("{Shift>}{Tab}{/Shift}");

    expect(screen.getByRole("button", { name: "Third" })).toHaveFocus();
  });

  it("restores focus on deactivate", async () => {
    const outer = document.createElement("button");
    outer.textContent = "Outer";
    document.body.appendChild(outer);
    outer.focus();

    const { rerender } = render(
      React.createElement(TrapHarness, { active: true }),
    );

    await act(async () => {
      await new Promise((r) => requestAnimationFrame(r));
    });

    expect(screen.getByRole("button", { name: "First" })).toHaveFocus();

    rerender(React.createElement(TrapHarness, { active: false }));

    expect(outer).toHaveFocus();
    document.body.removeChild(outer);
  });

  it("does not trap focus when inactive", async () => {
    render(React.createElement(TrapHarness, { active: false }));

    await act(async () => {
      await new Promise((r) => requestAnimationFrame(r));
    });

    expect(screen.getByRole("button", { name: "First" })).not.toHaveFocus();
  });
});
