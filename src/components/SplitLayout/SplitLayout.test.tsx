import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { SplitLayout } from "./SplitLayout";

describe("SplitLayout", () => {
  describe("rendering", () => {
    it("renders a div with grid class by default", () => {
      render(
        <SplitLayout data-testid="sl">
          <div>Main</div>
          <div>Side</div>
        </SplitLayout>,
      );
      const el = screen.getByTestId("sl");
      expect(el.tagName).toBe("DIV");
      expect(el.className).toContain("grid");
    });

    it("sets displayName correctly", () => {
      expect(SplitLayout.displayName).toBe("SplitLayout");
    });
  });

  describe("sidebar", () => {
    it("defaults to right sidebar layout", () => {
      render(
        <SplitLayout data-testid="sl">
          <div>Main</div>
          <div>Side</div>
        </SplitLayout>,
      );
      expect(screen.getByTestId("sl").className).toContain(
        "md:grid-cols-[1fr_320px]",
      );
    });

    it("applies left sidebar layout", () => {
      render(
        <SplitLayout sidebar="left" data-testid="sl">
          <div>Side</div>
          <div>Main</div>
        </SplitLayout>,
      );
      expect(screen.getByTestId("sl").className).toContain(
        "md:grid-cols-[320px_1fr]",
      );
    });
  });

  describe("sideWidth", () => {
    it("applies sm width (240px)", () => {
      render(
        <SplitLayout sideWidth="sm" data-testid="sl">
          <div>Main</div>
          <div>Side</div>
        </SplitLayout>,
      );
      expect(screen.getByTestId("sl").className).toContain("240px");
    });

    it("applies md width (320px) by default", () => {
      render(
        <SplitLayout data-testid="sl">
          <div>Main</div>
          <div>Side</div>
        </SplitLayout>,
      );
      expect(screen.getByTestId("sl").className).toContain("320px");
    });

    it("applies lg width (400px)", () => {
      render(
        <SplitLayout sideWidth="lg" data-testid="sl">
          <div>Main</div>
          <div>Side</div>
        </SplitLayout>,
      );
      expect(screen.getByTestId("sl").className).toContain("400px");
    });

    it("applies xl width (480px)", () => {
      render(
        <SplitLayout sideWidth="xl" data-testid="sl">
          <div>Main</div>
          <div>Side</div>
        </SplitLayout>,
      );
      expect(screen.getByTestId("sl").className).toContain("480px");
    });
  });

  describe("stackBelow", () => {
    it("defaults to md breakpoint", () => {
      render(
        <SplitLayout data-testid="sl">
          <div>Main</div>
          <div>Side</div>
        </SplitLayout>,
      );
      expect(screen.getByTestId("sl").className).toContain("md:grid-cols-");
    });

    it("applies sm breakpoint", () => {
      render(
        <SplitLayout stackBelow="sm" data-testid="sl">
          <div>Main</div>
          <div>Side</div>
        </SplitLayout>,
      );
      expect(screen.getByTestId("sl").className).toContain("sm:grid-cols-");
    });

    it("applies lg breakpoint", () => {
      render(
        <SplitLayout stackBelow="lg" data-testid="sl">
          <div>Main</div>
          <div>Side</div>
        </SplitLayout>,
      );
      expect(screen.getByTestId("sl").className).toContain("lg:grid-cols-");
    });

    it("applies xl breakpoint", () => {
      render(
        <SplitLayout stackBelow="xl" data-testid="sl">
          <div>Main</div>
          <div>Side</div>
        </SplitLayout>,
      );
      expect(screen.getByTestId("sl").className).toContain("xl:grid-cols-");
    });
  });

  describe("gap", () => {
    it("applies gap classes", () => {
      render(
        <SplitLayout gap="md" data-testid="sl">
          <div>Main</div>
          <div>Side</div>
        </SplitLayout>,
      );
      expect(screen.getByTestId("sl").className).toContain("gap-4");
    });
  });

  describe("asChild", () => {
    it("renders child element when asChild is true", () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(vi.fn());
      render(
        <SplitLayout asChild>
          <section data-testid="sl">
            <div>Main</div>
            <div>Side</div>
          </section>
        </SplitLayout>,
      );
      expect(screen.getByTestId("sl").tagName).toBe("SECTION");
      warnSpy.mockRestore();
    });
  });

  describe("className override", () => {
    it("merges consumer className", () => {
      render(
        <SplitLayout className="custom" data-testid="sl">
          <div>Main</div>
          <div>Side</div>
        </SplitLayout>,
      );
      const cls = screen.getByTestId("sl").className;
      expect(cls).toContain("custom");
      expect(cls).toContain("grid");
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to the rendered element", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <SplitLayout ref={ref}>
          <div>Main</div>
          <div>Side</div>
        </SplitLayout>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("dev warning", () => {
    it("warns when child count is not 2", () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(vi.fn());
      render(
        <SplitLayout>
          <div>Only one</div>
        </SplitLayout>,
      );
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining("2 children"),
      );
      warnSpy.mockRestore();
    });

    it("does not warn when child count is 2", () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(vi.fn());
      render(
        <SplitLayout>
          <div>Main</div>
          <div>Side</div>
        </SplitLayout>,
      );
      expect(warnSpy).not.toHaveBeenCalled();
      warnSpy.mockRestore();
    });
  });

  describe("data-slot attributes (ADR-054)", () => {
    it("emits data-slot='root' on the wrapper", () => {
      const { container } = render(
        <SplitLayout>
          <div>Main</div>
          <div>Side</div>
        </SplitLayout>,
      );
      expect(container.querySelector('[data-slot="root"]')).not.toBeNull();
    });
  });
});
