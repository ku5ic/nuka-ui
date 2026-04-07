import * as React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { useScrollLock, __resetScrollLock } from "./use-scroll-lock";

function LockHarness({ active }: { active: boolean }) {
  useScrollLock(active);
  return React.createElement("div", null, "lock harness");
}

describe("useScrollLock", () => {
  beforeEach(() => {
    __resetScrollLock();
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  });

  it("sets body overflow to hidden when active", () => {
    render(React.createElement(LockHarness, { active: true }));
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("restores body overflow on unmount", () => {
    document.body.style.overflow = "auto";
    __resetScrollLock();

    const { unmount } = render(
      React.createElement(LockHarness, { active: true }),
    );
    expect(document.body.style.overflow).toBe("hidden");

    unmount();
    expect(document.body.style.overflow).toBe("auto");
  });

  it("does not lock when inactive", () => {
    document.body.style.overflow = "auto";
    render(React.createElement(LockHarness, { active: false }));
    expect(document.body.style.overflow).toBe("auto");
  });

  it("ref-counts: first unlock does not restore when two locks active", () => {
    const { unmount: unmount1 } = render(
      React.createElement(LockHarness, { active: true }),
    );
    render(React.createElement(LockHarness, { active: true }));

    expect(document.body.style.overflow).toBe("hidden");

    unmount1();
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("ref-counts: last unlock restores original values", () => {
    const { unmount: unmount1 } = render(
      React.createElement(LockHarness, { active: true }),
    );
    const { unmount: unmount2 } = render(
      React.createElement(LockHarness, { active: true }),
    );

    unmount1();
    unmount2();
    expect(document.body.style.overflow).toBe("");
  });
});
