import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Alert } from "./Alert";

describe("Alert", () => {
  describe("rendering", () => {
    it("renders children", () => {
      render(<Alert>Something happened</Alert>);
      expect(screen.getByText("Something happened")).toBeInTheDocument();
    });

    it("applies role='alert'", () => {
      render(<Alert>Info</Alert>);
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    it("sets displayName correctly", () => {
      expect(Alert.displayName).toBe("Alert");
    });
  });

  describe("variants", () => {
    it("applies secondary variant classes by default", () => {
      render(<Alert>Default</Alert>);
      expect(screen.getByRole("alert").className).toContain(
        "bg-[var(--nuka-accent-bg-subtle)]",
      );
    });

    it("applies primary variant classes", () => {
      render(<Alert variant="primary">Primary</Alert>);
      expect(screen.getByRole("alert").className).toContain(
        "bg-[var(--nuka-accent-bg)]",
      );
    });

    it("applies outline variant classes", () => {
      render(<Alert variant="outline">Outline</Alert>);
      expect(screen.getByRole("alert").className).toContain("bg-transparent");
    });

    it("applies ghost variant classes", () => {
      render(<Alert variant="ghost">Ghost</Alert>);
      expect(screen.getByRole("alert").className).toContain("bg-transparent");
      expect(screen.getByRole("alert").className).toContain("border-transparent");
    });
  });

  describe("intent", () => {
    it("applies danger intent classes", () => {
      render(<Alert intent="danger">Danger</Alert>);
      expect(screen.getByRole("alert").className).toContain(
        "bg-[var(--nuka-danger-bg)]",
      );
    });

    it("applies success intent classes", () => {
      render(<Alert intent="success">Success</Alert>);
      expect(screen.getByRole("alert").className).toContain(
        "bg-[var(--nuka-success-bg)]",
      );
    });

    it("applies warning intent classes", () => {
      render(<Alert intent="warning">Warning</Alert>);
      expect(screen.getByRole("alert").className).toContain(
        "bg-[var(--nuka-warning-bg)]",
      );
    });

    it("applies compound variant classes for outline × danger", () => {
      render(
        <Alert variant="outline" intent="danger">
          Outline Danger
        </Alert>,
      );
      const el = screen.getByRole("alert");
      expect(el.className).toContain("border-[var(--nuka-danger-border)]");
      expect(el.className).toContain("text-[var(--nuka-danger-text)]");
    });
  });

  describe("dismiss", () => {
    it("does not render dismiss button when onDismiss is not provided", () => {
      render(<Alert>Info</Alert>);
      expect(
        screen.queryByRole("button", { name: "Dismiss" }),
      ).not.toBeInTheDocument();
    });

    it("renders dismiss button when onDismiss is provided", () => {
      const noop = () => { /* dismiss handler */ };
      render(<Alert onDismiss={noop}>Info</Alert>);
      expect(
        screen.getByRole("button", { name: "Dismiss" }),
      ).toBeInTheDocument();
    });

    it("calls onDismiss when dismiss button is clicked", async () => {
      const user = userEvent.setup();
      const handleDismiss = vi.fn();
      render(<Alert onDismiss={handleDismiss}>Info</Alert>);
      await user.click(screen.getByRole("button", { name: "Dismiss" }));
      expect(handleDismiss).toHaveBeenCalledTimes(1);
    });
  });

  describe("icon", () => {
    it("renders the icon node when provided", () => {
      render(
        <Alert icon={<span data-testid="alert-icon">!</span>}>
          With icon
        </Alert>,
      );
      expect(screen.getByTestId("alert-icon")).toBeInTheDocument();
    });
  });

  describe("className override", () => {
    it("merges consumer className with variant classes", () => {
      render(<Alert className="mt-4">Styled</Alert>);
      const el = screen.getByRole("alert");
      expect(el.className).toContain("mt-4");
      expect(el.className).toContain("bg-[var(--nuka-accent-bg-subtle)]");
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to the div element", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Alert ref={ref}>Ref</Alert>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });
});
