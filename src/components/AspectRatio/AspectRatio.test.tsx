import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AspectRatio } from "./AspectRatio";

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
    it("defaults to '1/1' with aspect-square class", () => {
      render(<AspectRatio data-testid="ar" />);
      expect(screen.getByTestId("ar").className).toContain("aspect-square");
    });

    it("applies aspect-video for '16/9'", () => {
      render(<AspectRatio ratio="16/9" data-testid="ar" />);
      expect(screen.getByTestId("ar").className).toContain("aspect-video");
    });

    it("applies aspect-[4/3] for '4/3'", () => {
      render(<AspectRatio ratio="4/3" data-testid="ar" />);
      expect(screen.getByTestId("ar").className).toContain("aspect-[4/3]");
    });

    it("applies aspect-[3/2] for '3/2'", () => {
      render(<AspectRatio ratio="3/2" data-testid="ar" />);
      expect(screen.getByTestId("ar").className).toContain("aspect-[3/2]");
    });

    it("applies aspect-[2/1] for '2/1'", () => {
      render(<AspectRatio ratio="2/1" data-testid="ar" />);
      expect(screen.getByTestId("ar").className).toContain("aspect-[2/1]");
    });

    it("applies aspect-[9/16] for '9/16'", () => {
      render(<AspectRatio ratio="9/16" data-testid="ar" />);
      expect(screen.getByTestId("ar").className).toContain("aspect-[9/16]");
    });

    it("applies aspect-[4/5] for '4/5'", () => {
      render(<AspectRatio ratio="4/5" data-testid="ar" />);
      expect(screen.getByTestId("ar").className).toContain("aspect-[4/5]");
    });
  });

  describe("responsive ratio", () => {
    it("accepts an object form for ratio", () => {
      render(
        <AspectRatio ratio={{ base: "1/1", md: "16/9" }} data-testid="ar" />,
      );
      const cls = screen.getByTestId("ar").className;
      expect(cls).toContain("aspect-square");
      expect(cls).toContain("md:aspect-video");
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
      const cls = screen.getByTestId("section").className;
      expect(cls).toContain("overflow-hidden");
      expect(cls).toContain("aspect-video");
    });
  });
});
