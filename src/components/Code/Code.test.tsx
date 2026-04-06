import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Code } from "./Code";

describe("Code", () => {
  describe("rendering", () => {
    it("renders a code element by default", () => {
      render(<Code>const x = 1</Code>);
      const el = screen.getByText("const x = 1");
      expect(el.tagName).toBe("CODE");
    });

    it("renders children correctly", () => {
      render(<Code>useState</Code>);
      expect(screen.getByText("useState")).toBeInTheDocument();
    });

    it("sets displayName correctly", () => {
      expect(Code.displayName).toBe("Code");
    });
  });

  describe("variants", () => {
    it("applies subtle variant classes by default", () => {
      render(<Code>subtle</Code>);
      expect(screen.getByText("subtle").className).toContain(
        "bg-(--nuka-bg-muted)",
      );
    });

    it("applies outline variant classes when specified", () => {
      render(<Code variant="outline">outline</Code>);
      expect(screen.getByText("outline").className).toContain(
        "border-(--nuka-border-strong)",
      );
    });

    it("applies ghost variant classes when specified", () => {
      render(<Code variant="ghost">ghost</Code>);
      expect(screen.getByText("ghost").className).toContain(
        "text-(--nuka-text-muted)",
      );
    });
  });

  describe("sizes", () => {
    it("applies sm size classes when specified", () => {
      render(<Code size="sm">small</Code>);
      expect(screen.getByText("small").className).toContain(
        "text-[length:var(--font-size-xs)]",
      );
    });

    it("applies md size classes by default", () => {
      render(<Code>medium</Code>);
      expect(screen.getByText("medium").className).toContain(
        "text-[length:var(--font-size-sm)]",
      );
    });

    it("applies lg size classes when specified", () => {
      render(<Code size="lg">large</Code>);
      expect(screen.getByText("large").className).toContain(
        "text-[length:var(--font-size-md)]",
      );
    });
  });

  describe("intent", () => {
    it("applies danger intent classes on default variant", () => {
      render(<Code intent="danger">danger</Code>);
      expect(screen.getByText("danger").className).toContain(
        "bg-(--nuka-danger-bg)",
      );
    });

    it("applies success intent classes on default variant", () => {
      render(<Code intent="success">success</Code>);
      expect(screen.getByText("success").className).toContain(
        "bg-(--nuka-success-bg)",
      );
    });

    it("applies warning intent classes on default variant", () => {
      render(<Code intent="warning">warning</Code>);
      expect(screen.getByText("warning").className).toContain(
        "bg-(--nuka-warning-bg)",
      );
    });

    it("applies compound variant classes for outline + danger", () => {
      render(
        <Code variant="outline" intent="danger">
          outline danger
        </Code>,
      );
      const el = screen.getByText("outline danger");
      expect(el.className).toContain("border-(--nuka-danger-border)");
      expect(el.className).toContain("text-(--nuka-danger-text)");
    });
  });

  describe("className override", () => {
    it("merges consumer className with variant classes", () => {
      render(<Code className="mt-4">code</Code>);
      const el = screen.getByText("code");
      expect(el.className).toContain("mt-4");
      expect(el.className).toContain("bg-(--nuka-bg-muted)");
    });
  });

  describe("native attributes", () => {
    it("forwards aria-label attribute", () => {
      render(<Code aria-label="code snippet">snippet</Code>);
      const el = screen.getByText("snippet");
      expect(el).toHaveAttribute("aria-label", "code snippet");
    });

    it("forwards data attributes", () => {
      render(<Code data-testid="my-code">code</Code>);
      expect(screen.getByTestId("my-code")).toBeInTheDocument();
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to the code element", () => {
      const ref = React.createRef<HTMLElement>();
      render(<Code ref={ref}>code</Code>);
      expect(ref.current).toBeInstanceOf(HTMLElement);
    });
  });
});
