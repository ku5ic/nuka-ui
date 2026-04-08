import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Portal } from "@nuka/utils/portal";

describe("Portal", () => {
  it("renders children into document.body", () => {
    render(
      <Portal>
        <span data-testid="portal-child">hello</span>
      </Portal>,
    );
    expect(screen.getByTestId("portal-child")).toBeInTheDocument();
    expect(
      document.body.querySelector("[data-testid='portal-child']"),
    ).not.toBeNull();
  });

  it("renders children outside the parent DOM node", () => {
    const { container } = render(
      <div data-testid="parent">
        <Portal>
          <span data-testid="portal-child">hello</span>
        </Portal>
      </div>,
    );
    expect(container.querySelector("[data-testid='portal-child']")).toBeNull();
    expect(
      document.body.querySelector("[data-testid='portal-child']"),
    ).not.toBeNull();
  });

  it("returns null when document is undefined", async () => {
    const originalDocument = globalThis.document;
    vi.stubGlobal("document", undefined);

    try {
      const { Portal: FreshPortal } = await import("@nuka/utils/portal");
      const { container } = render(
        <FreshPortal>
          <span>should not render</span>
        </FreshPortal>,
        { container: originalDocument.createElement("div") },
      );
      expect(container.innerHTML).toBe("");
    } finally {
      vi.stubGlobal("document", originalDocument);
    }
  });
});
