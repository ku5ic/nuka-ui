import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { AspectRatio } from "./AspectRatio";
import { resolveRatio } from "./AspectRatio.utils";

// jsdom silently drops aspect-ratio on el.style assignment.
// SSR output retains it, so ratio assertions use renderToStaticMarkup.
function ssrAspectRatio(el: React.ReactElement): number {
  const html = renderToStaticMarkup(el);
  const match = /aspect-ratio:([\d.]+)/.exec(html);
  return match?.[1] ? parseFloat(match[1]) : NaN;
}

describe("resolveRatio", () => {
  it("resolves '1/1' to 1", () => {
    expect(resolveRatio("1/1")).toBe(1);
  });

  it("resolves '16/9' to 16/9", () => {
    expect(resolveRatio("16/9")).toBeCloseTo(16 / 9, 10);
  });

  it("resolves '9/16' to 9/16", () => {
    expect(resolveRatio("9/16")).toBeCloseTo(9 / 16, 10);
  });

  it("resolves '4/3' to 4/3", () => {
    expect(resolveRatio("4/3")).toBeCloseTo(4 / 3, 10);
  });

  it("resolves '3/4' to 3/4", () => {
    expect(resolveRatio("3/4")).toBeCloseTo(3 / 4, 10);
  });

  it("resolves '21/9' to 21/9", () => {
    expect(resolveRatio("21/9")).toBeCloseTo(21 / 9, 10);
  });

  it("passes a raw number through unchanged", () => {
    expect(resolveRatio(2.35)).toBe(2.35);
  });
});

describe("AspectRatio", () => {
  describe("rendering", () => {
    it("renders a div element by default", () => {
      render(<AspectRatio data-testid="ar" />);
      expect(screen.getByTestId("ar").tagName).toBe("DIV");
    });

    it("sets displayName correctly", () => {
      expect(AspectRatio.displayName).toBe("AspectRatio");
    });

    it("renders children inside the container", () => {
      render(<AspectRatio>content</AspectRatio>);
      expect(screen.getByText("content")).toBeInTheDocument();
    });

    it("forwards ref to the outer element", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<AspectRatio ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("ratio", () => {
    it("defaults to '1/1' producing aspectRatio of 1", () => {
      expect(ssrAspectRatio(<AspectRatio />)).toBeCloseTo(1, 4);
    });

    it("applies correct aspectRatio for named preset '16/9'", () => {
      expect(ssrAspectRatio(<AspectRatio ratio="16/9" />)).toBeCloseTo(
        16 / 9,
        4,
      );
    });

    it("applies correct aspectRatio for named preset '9/16'", () => {
      expect(ssrAspectRatio(<AspectRatio ratio="9/16" />)).toBeCloseTo(
        9 / 16,
        4,
      );
    });

    it("applies correct aspectRatio for named preset '4/3'", () => {
      expect(ssrAspectRatio(<AspectRatio ratio="4/3" />)).toBeCloseTo(4 / 3, 4);
    });

    it("applies correct aspectRatio for named preset '3/4'", () => {
      expect(ssrAspectRatio(<AspectRatio ratio="3/4" />)).toBeCloseTo(3 / 4, 4);
    });

    it("applies correct aspectRatio for named preset '21/9'", () => {
      expect(ssrAspectRatio(<AspectRatio ratio="21/9" />)).toBeCloseTo(
        21 / 9,
        4,
      );
    });

    it("applies correct aspectRatio for a raw number", () => {
      expect(ssrAspectRatio(<AspectRatio ratio={2.35} />)).toBeCloseTo(2.35, 4);
    });
  });

  describe("className override", () => {
    it("merges consumer className with structural classes", () => {
      render(<AspectRatio data-testid="ar" className="rounded-md" />);
      const cls = screen.getByTestId("ar").className;
      expect(cls).toContain("rounded-md");
      expect(cls).toContain("overflow-hidden");
    });
  });

  describe("style override", () => {
    it("merges consumer style with aspectRatio", () => {
      const html = renderToStaticMarkup(
        <AspectRatio ratio="16/9" style={{ maxWidth: "400px" }} />,
      );
      expect(html).toContain("max-width:400px");
      expect(html).toMatch(/aspect-ratio:[\d.]+/);
    });
  });

  describe("asChild", () => {
    it("renders child element tag when asChild is true", () => {
      render(
        <AspectRatio asChild>
          <section data-testid="section">content</section>
        </AspectRatio>,
      );
      expect(screen.getByTestId("section").tagName).toBe("SECTION");
    });

    it("merges structural classes onto child element", () => {
      render(
        <AspectRatio asChild ratio="16/9">
          <section data-testid="section">content</section>
        </AspectRatio>,
      );
      expect(screen.getByTestId("section").className).toContain(
        "overflow-hidden",
      );
    });

    it("merges aspectRatio style onto child element", () => {
      const html = renderToStaticMarkup(
        <AspectRatio asChild ratio="16/9">
          <section>content</section>
        </AspectRatio>,
      );
      expect(html).toMatch(/<section[^>]+aspect-ratio:[\d.]+/);
    });
  });
});
