import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  describe("rendering", () => {
    it("renders heading text", () => {
      render(<EmptyState heading="No items" />);
      expect(screen.getByText("No items")).toBeInTheDocument();
    });

    it("has no implicit role by default", () => {
      render(<EmptyState heading="No items" data-testid="empty" />);
      expect(screen.getByTestId("empty")).not.toHaveAttribute("role");
    });

    it("sets displayName correctly", () => {
      expect(EmptyState.displayName).toBe("EmptyState");
    });
  });

  describe("description", () => {
    it("renders description when provided", () => {
      render(<EmptyState heading="No items" description="Try adding one." />);
      expect(screen.getByText("Try adding one.")).toBeInTheDocument();
    });

    it("does not render description when not provided", () => {
      render(<EmptyState heading="No items" data-testid="empty" />);
      const el = screen.getByTestId("empty");
      expect(el.querySelectorAll("p")).toHaveLength(1);
    });
  });

  describe("visual slots", () => {
    it("renders illustration when provided", () => {
      render(
        <EmptyState
          heading="No items"
          illustration={<svg data-testid="illustration" />}
        />,
      );
      expect(screen.getByTestId("illustration")).toBeInTheDocument();
    });

    it("renders icon when no illustration is provided", () => {
      render(
        <EmptyState
          heading="No items"
          icon={<span data-testid="icon">📦</span>}
        />,
      );
      expect(screen.getByTestId("icon")).toBeInTheDocument();
    });

    it("renders illustration and ignores icon when both are provided", () => {
      render(
        <EmptyState
          heading="No items"
          illustration={<svg data-testid="illustration" />}
          icon={<span data-testid="icon">📦</span>}
        />,
      );
      expect(screen.getByTestId("illustration")).toBeInTheDocument();
      expect(screen.queryByTestId("icon")).not.toBeInTheDocument();
    });

    it("does not render visual region when neither illustration nor icon provided", () => {
      const { container } = render(<EmptyState heading="No items" />);
      expect(
        container.querySelector(
          ".flex.items-center.justify-center.text-\\[var\\(--nuka-text-muted\\)\\]",
        ),
      ).not.toBeInTheDocument();
    });
  });

  describe("action slot", () => {
    it("renders action when provided", () => {
      render(
        <EmptyState
          heading="No items"
          action={<button type="button">Add item</button>}
        />,
      );
      expect(
        screen.getByRole("button", { name: "Add item" }),
      ).toBeInTheDocument();
    });
  });

  describe("className override", () => {
    it("merges consumer className", () => {
      render(
        <EmptyState heading="No items" className="mt-8" data-testid="empty" />,
      );
      const el = screen.getByTestId("empty");
      expect(el.className).toContain("mt-8");
      expect(el.className).toContain("flex");
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to the div element", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<EmptyState ref={ref} heading="No items" />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("weight pass-through", () => {
    it("heading renders at semibold by default", () => {
      render(<EmptyState heading="Default heading" />);
      expect(screen.getByText("Default heading").className).toContain(
        "font-[number:var(--font-weight-semibold)]",
      );
    });

    it("forwards headingWeight to the heading Text", () => {
      render(<EmptyState heading="Heavy" headingWeight="extrabold" />);
      expect(screen.getByText("Heavy").className).toContain(
        "font-[number:var(--font-weight-extrabold)]",
      );
    });

    it("description renders at regular default when descriptionWeight omitted", () => {
      render(<EmptyState heading="Title" description="Default description" />);
      expect(screen.getByText("Default description").className).toContain(
        "font-[number:var(--font-weight-regular)]",
      );
    });

    it("forwards descriptionWeight to the description Text", () => {
      render(
        <EmptyState
          heading="Title"
          description="Medium body"
          descriptionWeight="medium"
        />,
      );
      expect(screen.getByText("Medium body").className).toContain(
        "font-[number:var(--font-weight-medium)]",
      );
    });
  });

  describe("data-slot attributes (ADR-054)", () => {
    it("emits data-slot on every optional slot when provided", () => {
      const { container } = render(
        <EmptyState
          illustration={<svg />}
          heading="Title"
          description="Desc"
          action={<button type="button">Act</button>}
        />,
      );
      expect(container.querySelector('[data-slot="root"]')).not.toBeNull();
      expect(container.querySelector('[data-slot="visual"]')).not.toBeNull();
      expect(container.querySelector('[data-slot="heading"]')).not.toBeNull();
      expect(
        container.querySelector('[data-slot="description"]'),
      ).not.toBeNull();
      expect(container.querySelector('[data-slot="action"]')).not.toBeNull();
    });
  });
});
