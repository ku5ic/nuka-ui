import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Chip } from "./Chip";

describe("Chip", () => {
  describe("rendering", () => {
    it("renders a button element", () => {
      render(<Chip>Filter</Chip>);
      expect(
        screen.getByRole("button", { name: "Filter" }),
      ).toBeInTheDocument();
    });

    it("defaults to type=button", () => {
      render(<Chip>Filter</Chip>);
      expect(screen.getByRole("button", { name: "Filter" })).toHaveAttribute(
        "type",
        "button",
      );
    });

    it("sets displayName correctly", () => {
      expect(Chip.displayName).toBe("Chip");
    });
  });

  describe("selected state", () => {
    it("has aria-pressed=false by default", () => {
      render(<Chip>Tag</Chip>);
      expect(screen.getByRole("button", { name: "Tag" })).toHaveAttribute(
        "aria-pressed",
        "false",
      );
    });

    it("has aria-pressed=true when selected", () => {
      render(<Chip selected>Tag</Chip>);
      expect(screen.getByRole("button", { name: "Tag" })).toHaveAttribute(
        "aria-pressed",
        "true",
      );
    });

    it("applies selected classes when selected is true", () => {
      render(<Chip selected>Active</Chip>);
      expect(
        screen.getByRole("button", { name: "Active" }).className,
      ).toContain("bg-(--nuka-accent-bg)");
    });

    it("applies unselected classes when selected is false", () => {
      render(<Chip>Inactive</Chip>);
      expect(
        screen.getByRole("button", { name: "Inactive" }).className,
      ).toContain("bg-(--nuka-bg-muted)");
    });
  });

  describe("variants", () => {
    it("applies solid variant by default", () => {
      render(<Chip>Solid</Chip>);
      expect(screen.getByRole("button", { name: "Solid" }).className).toContain(
        "bg-(--nuka-bg-muted)",
      );
    });

    it("applies subtle variant classes", () => {
      render(<Chip variant="subtle">Subtle</Chip>);
      const cls = screen.getByRole("button", { name: "Subtle" }).className;
      expect(cls).toContain("border-(--nuka-border-base)");
    });

    it("applies outline variant classes", () => {
      render(<Chip variant="outline">Outline</Chip>);
      const cls = screen.getByRole("button", { name: "Outline" }).className;
      expect(cls).toContain("bg-transparent");
    });
  });

  describe("intent", () => {
    it("applies danger intent classes", () => {
      render(<Chip intent="danger">Danger</Chip>);
      expect(
        screen.getByRole("button", { name: "Danger" }).className,
      ).toContain("text-(--nuka-danger-text)");
    });

    it("applies success intent classes", () => {
      render(<Chip intent="success">Success</Chip>);
      expect(
        screen.getByRole("button", { name: "Success" }).className,
      ).toContain("text-(--nuka-success-text)");
    });

    it("applies warning intent classes", () => {
      render(<Chip intent="warning">Warning</Chip>);
      expect(
        screen.getByRole("button", { name: "Warning" }).className,
      ).toContain("text-(--nuka-warning-text)");
    });

    it("applies selected + intent compound classes", () => {
      render(
        <Chip intent="danger" selected>
          Selected Danger
        </Chip>,
      );
      expect(
        screen.getByRole("button", { name: "Selected Danger" }).className,
      ).toContain("bg-(--nuka-danger-base)");
    });
  });

  describe("sizes", () => {
    it("applies sm size classes", () => {
      render(<Chip size="sm">Small</Chip>);
      expect(screen.getByRole("button", { name: "Small" }).className).toContain(
        "text-xs",
      );
    });

    it("applies md size classes by default", () => {
      render(<Chip>Medium</Chip>);
      expect(
        screen.getByRole("button", { name: "Medium" }).className,
      ).toContain("text-xs");
    });

    it("applies lg size classes", () => {
      render(<Chip size="lg">Large</Chip>);
      expect(screen.getByRole("button", { name: "Large" }).className).toContain(
        "text-sm",
      );
    });
  });

  describe("interaction", () => {
    it("calls onClick when clicked", async () => {
      const user = userEvent.setup();
      const spy = vi.fn();
      render(<Chip onClick={spy}>Click me</Chip>);
      await user.click(screen.getByRole("button", { name: "Click me" }));
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick when disabled", async () => {
      const user = userEvent.setup();
      const spy = vi.fn();
      render(
        <Chip onClick={spy} disabled>
          Disabled
        </Chip>,
      );
      await user.click(screen.getByRole("button", { name: "Disabled" }));
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe("disabled", () => {
    it("sets disabled attribute", () => {
      render(<Chip disabled>Disabled</Chip>);
      expect(screen.getByRole("button", { name: "Disabled" })).toBeDisabled();
    });
  });

  describe("className override", () => {
    it("merges consumer className with variant classes", () => {
      render(<Chip className="mt-4">Styled</Chip>);
      const cls = screen.getByRole("button", { name: "Styled" }).className;
      expect(cls).toContain("mt-4");
      expect(cls).toContain("rounded-full");
    });
  });

  describe("native attributes", () => {
    it("forwards aria-label attribute", () => {
      render(<Chip aria-label="Filter by category">Tag</Chip>);
      expect(
        screen.getByRole("button", { name: "Filter by category" }),
      ).toBeInTheDocument();
    });

    it("forwards data attributes", () => {
      render(<Chip data-testid="my-chip">Chip</Chip>);
      expect(screen.getByTestId("my-chip")).toBeInTheDocument();
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to the button element", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Chip ref={ref}>Chip</Chip>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });
});
