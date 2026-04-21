import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ScrollArea } from "./ScrollArea";

describe("ScrollArea", () => {
  describe("rendering", () => {
    it("renders a div element", () => {
      render(<ScrollArea data-testid="scroll">Content</ScrollArea>);
      expect(screen.getByTestId("scroll").tagName).toBe("DIV");
    });

    it("renders children", () => {
      render(<ScrollArea>Hello</ScrollArea>);
      expect(screen.getByText("Hello")).toBeInTheDocument();
    });

    it("sets displayName", () => {
      expect(ScrollArea.displayName).toBe("ScrollArea");
    });
  });

  describe("orientation", () => {
    it("applies vertical overflow classes by default", () => {
      render(<ScrollArea data-testid="scroll">Content</ScrollArea>);
      const cls = screen.getByTestId("scroll").className;
      expect(cls).toContain("overflow-y-auto");
      expect(cls).toContain("overflow-x-hidden");
    });

    it("applies horizontal overflow classes", () => {
      render(
        <ScrollArea data-testid="scroll" orientation="horizontal">
          Content
        </ScrollArea>,
      );
      const cls = screen.getByTestId("scroll").className;
      expect(cls).toContain("overflow-x-auto");
      expect(cls).toContain("overflow-y-hidden");
    });

    it("applies both overflow class", () => {
      render(
        <ScrollArea data-testid="scroll" orientation="both">
          Content
        </ScrollArea>,
      );
      expect(screen.getByTestId("scroll").className).toContain("overflow-auto");
    });
  });

  describe("maxHeight", () => {
    it("applies maxHeight as inline style", () => {
      render(
        <ScrollArea data-testid="scroll" maxHeight="200px">
          Content
        </ScrollArea>,
      );
      expect(screen.getByTestId("scroll").style.maxHeight).toBe("200px");
    });
  });

  describe("maxWidth", () => {
    it("applies maxWidth as inline style", () => {
      render(
        <ScrollArea data-testid="scroll" maxWidth="400px">
          Content
        </ScrollArea>,
      );
      expect(screen.getByTestId("scroll").style.maxWidth).toBe("400px");
    });
  });

  describe("tabIndex", () => {
    it("defaults tabIndex to 0", () => {
      render(<ScrollArea data-testid="scroll">Content</ScrollArea>);
      expect(screen.getByTestId("scroll").tabIndex).toBe(0);
    });

    it("respects explicit tabIndex override", () => {
      render(
        <ScrollArea data-testid="scroll" tabIndex={-1}>
          Content
        </ScrollArea>,
      );
      expect(screen.getByTestId("scroll").tabIndex).toBe(-1);
    });
  });

  describe("base classes", () => {
    it("applies nuka-scroll-area class", () => {
      render(<ScrollArea data-testid="scroll">Content</ScrollArea>);
      expect(screen.getByTestId("scroll").className).toContain(
        "nuka-scroll-area",
      );
    });

    it("applies scrollbar-width thin", () => {
      render(<ScrollArea data-testid="scroll">Content</ScrollArea>);
      expect(screen.getByTestId("scroll").className).toContain(
        "[scrollbar-width:thin]",
      );
    });
  });

  describe("className override", () => {
    it("merges consumer className", () => {
      render(
        <ScrollArea data-testid="scroll" className="mt-4">
          Content
        </ScrollArea>,
      );
      const cls = screen.getByTestId("scroll").className;
      expect(cls).toContain("mt-4");
      expect(cls).toContain("nuka-scroll-area");
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to the div element", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<ScrollArea ref={ref}>Content</ScrollArea>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("native attributes", () => {
    it("forwards native HTML attributes", () => {
      render(
        <ScrollArea data-testid="scroll" aria-label="Scrollable content">
          Content
        </ScrollArea>,
      );
      expect(screen.getByTestId("scroll")).toHaveAttribute(
        "aria-label",
        "Scrollable content",
      );
    });
  });

  describe("data-slot attributes (ADR-054)", () => {
    it("emits data-slot='root' on the wrapper", () => {
      const { container } = render(<ScrollArea>Content</ScrollArea>);
      expect(container.querySelector('[data-slot="root"]')).not.toBeNull();
    });
  });
});
