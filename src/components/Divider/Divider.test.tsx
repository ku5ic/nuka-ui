import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Divider } from "./Divider";

describe("Divider", () => {
  describe("rendering", () => {
    it("renders an <hr> by default (horizontal, no label)", () => {
      render(<Divider data-testid="divider" />);
      const el = screen.getByTestId("divider");
      expect(el.tagName).toBe("HR");
    });

    it("sets displayName correctly", () => {
      expect(Divider.displayName).toBe("Divider");
    });

    it("renders a <div> when orientation='vertical'", () => {
      render(<Divider orientation="vertical" data-testid="divider" />);
      const el = screen.getByTestId("divider");
      expect(el.tagName).toBe("DIV");
    });

    it("renders a <div> when label is provided (horizontal + label)", () => {
      render(<Divider label="Or" data-testid="divider" />);
      const el = screen.getByTestId("divider");
      expect(el.tagName).toBe("DIV");
    });
  });

  describe("orientation", () => {
    it("horizontal applies correct classes", () => {
      render(<Divider data-testid="divider" />);
      const el = screen.getByTestId("divider");
      expect(el.className).toContain("w-full");
    });

    it("vertical applies correct classes", () => {
      render(<Divider orientation="vertical" data-testid="divider" />);
      const el = screen.getByTestId("divider");
      expect(el.className).toContain("self-stretch");
    });
  });

  describe("size", () => {
    it("sm applies h-px for horizontal", () => {
      render(<Divider size="sm" data-testid="divider" />);
      const el = screen.getByTestId("divider");
      expect(el.className).toContain("h-px");
    });

    it("md applies h-px for horizontal (default)", () => {
      render(<Divider data-testid="divider" />);
      const el = screen.getByTestId("divider");
      expect(el.className).toContain("h-px");
    });

    it("lg applies h-0.5 for horizontal", () => {
      render(<Divider size="lg" data-testid="divider" />);
      const el = screen.getByTestId("divider");
      expect(el.className).toContain("h-0.5");
    });

    it("sm applies w-px for vertical", () => {
      render(
        <Divider orientation="vertical" size="sm" data-testid="divider" />,
      );
      const el = screen.getByTestId("divider");
      expect(el.className).toContain("w-px");
    });

    it("lg applies w-0.5 for vertical", () => {
      render(
        <Divider orientation="vertical" size="lg" data-testid="divider" />,
      );
      const el = screen.getByTestId("divider");
      expect(el.className).toContain("w-0.5");
    });
  });

  describe("label", () => {
    it("renders label content when label is provided", () => {
      render(<Divider label="Or" />);
      expect(screen.getByText("Or")).toBeInTheDocument();
    });

    it("does not render label elements when label is omitted", () => {
      render(<Divider data-testid="divider" />);
      const el = screen.getByTestId("divider");
      expect(el.querySelector(".shrink-0")).toBeNull();
      expect(el.children).toHaveLength(0);
    });

    it("line segments are aria-hidden when label is present", () => {
      render(<Divider label="Or" data-testid="divider" />);
      const el = screen.getByTestId("divider");
      const lines = el.querySelectorAll("[aria-hidden='true']");
      expect(lines).toHaveLength(2);
    });

    it("vertical + label renders without label and warns", () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(vi.fn());
      render(
        <Divider orientation="vertical" label="Should not show" data-testid="divider" />,
      );
      expect(screen.queryByText("Should not show")).not.toBeInTheDocument();
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining("label"),
      );
      warnSpy.mockRestore();
    });
  });

  describe("accessibility", () => {
    it("horizontal without label: <hr> has no explicit role", () => {
      render(<Divider data-testid="divider" />);
      const el = screen.getByTestId("divider");
      expect(el.tagName).toBe("HR");
      expect(el.getAttribute("role")).toBeNull();
    });

    it("vertical without label: has role='separator' and aria-orientation='vertical'", () => {
      render(<Divider orientation="vertical" data-testid="divider" />);
      const el = screen.getByTestId("divider");
      expect(el).toHaveAttribute("role", "separator");
      expect(el).toHaveAttribute("aria-orientation", "vertical");
    });

    it("horizontal with label: has role='separator' and aria-orientation='horizontal'", () => {
      render(<Divider label="Or" data-testid="divider" />);
      const el = screen.getByTestId("divider");
      expect(el).toHaveAttribute("role", "separator");
      expect(el).toHaveAttribute("aria-orientation", "horizontal");
    });

    it("aria-label is forwarded to the root element", () => {
      render(<Divider aria-label="Content separator" data-testid="divider" />);
      const el = screen.getByTestId("divider");
      expect(el).toHaveAttribute("aria-label", "Content separator");
    });
  });

  describe("className override", () => {
    it("merges consumer className with variant classes", () => {
      render(<Divider className="my-4" data-testid="divider" />);
      const el = screen.getByTestId("divider");
      expect(el.className).toContain("my-4");
      expect(el.className).toContain("bg-[var(--nuka-border-base)]");
    });
  });

  describe("ref forwarding", () => {
    it("ref resolves to an instance of HTMLElement", () => {
      const ref = React.createRef<HTMLElement>();
      render(<Divider ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLElement);
    });

    it("ref resolves for vertical orientation", () => {
      const ref = React.createRef<HTMLElement>();
      render(<Divider ref={ref} orientation="vertical" />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("ref resolves for labeled divider", () => {
      const ref = React.createRef<HTMLElement>();
      render(<Divider ref={ref} label="Section" />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });
});
