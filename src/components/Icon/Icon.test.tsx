import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Icon } from "./Icon";

const MockSvg = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    {...props}
  >
    <circle cx="12" cy="12" r="9" />
  </svg>
);

describe("Icon", () => {
  describe("rendering", () => {
    it("renders without crashing with a mock SVG child", () => {
      render(
        <Icon data-testid="icon">
          <MockSvg />
        </Icon>,
      );
      expect(screen.getByTestId("icon")).toBeInTheDocument();
    });

    it("renders a <span> as root element", () => {
      render(
        <Icon data-testid="icon">
          <MockSvg />
        </Icon>,
      );
      expect(screen.getByTestId("icon").tagName).toBe("SPAN");
    });

    it("displayName is 'Icon'", () => {
      expect(Icon.displayName).toBe("Icon");
    });
  });

  describe("size variants", () => {
    it("applies size-4 for sm", () => {
      render(
        <Icon size="sm" data-testid="icon">
          <MockSvg />
        </Icon>,
      );
      expect(screen.getByTestId("icon").className).toContain("size-4");
    });

    it("applies size-6 for md (default)", () => {
      render(
        <Icon data-testid="icon">
          <MockSvg />
        </Icon>,
      );
      expect(screen.getByTestId("icon").className).toContain("size-6");
    });

    it("applies size-8 for lg", () => {
      render(
        <Icon size="lg" data-testid="icon">
          <MockSvg />
        </Icon>,
      );
      expect(screen.getByTestId("icon").className).toContain("size-8");
    });

    it("applies size-10 for xl", () => {
      render(
        <Icon size="xl" data-testid="icon">
          <MockSvg />
        </Icon>,
      );
      expect(screen.getByTestId("icon").className).toContain("size-10");
    });
  });

  describe("color variants", () => {
    it("color='inherit' applies no color class (default)", () => {
      render(
        <Icon data-testid="icon">
          <MockSvg />
        </Icon>,
      );
      const cls = screen.getByTestId("icon").className;
      expect(cls).not.toContain("text-(--nuka-text-");
    });

    it("color='base' applies correct class", () => {
      render(
        <Icon color="base" data-testid="icon">
          <MockSvg />
        </Icon>,
      );
      expect(screen.getByTestId("icon").className).toContain(
        "text-(--nuka-text-base)",
      );
    });

    it("color='muted' applies correct class", () => {
      render(
        <Icon color="muted" data-testid="icon">
          <MockSvg />
        </Icon>,
      );
      expect(screen.getByTestId("icon").className).toContain(
        "text-(--nuka-text-muted)",
      );
    });

    it("color='subtle' applies correct class", () => {
      render(
        <Icon color="subtle" data-testid="icon">
          <MockSvg />
        </Icon>,
      );
      expect(screen.getByTestId("icon").className).toContain(
        "text-(--nuka-text-subtle)",
      );
    });

    it("color='inverse' applies correct class", () => {
      render(
        <Icon color="inverse" data-testid="icon">
          <MockSvg />
        </Icon>,
      );
      expect(screen.getByTestId("icon").className).toContain(
        "text-(--nuka-text-inverse)",
      );
    });

    it("color='disabled' applies correct class", () => {
      render(
        <Icon color="disabled" data-testid="icon">
          <MockSvg />
        </Icon>,
      );
      expect(screen.getByTestId("icon").className).toContain(
        "text-(--nuka-text-disabled)",
      );
    });
  });

  describe("accessibility: decorative mode (no label)", () => {
    it("root span has aria-hidden='true'", () => {
      render(
        <Icon data-testid="icon">
          <MockSvg />
        </Icon>,
      );
      expect(screen.getByTestId("icon")).toHaveAttribute("aria-hidden", "true");
    });

    it("root span does not have role='img'", () => {
      render(
        <Icon data-testid="icon">
          <MockSvg />
        </Icon>,
      );
      expect(screen.getByTestId("icon")).not.toHaveAttribute("role");
    });

    it("root span does not have aria-label", () => {
      render(
        <Icon data-testid="icon">
          <MockSvg />
        </Icon>,
      );
      expect(screen.getByTestId("icon")).not.toHaveAttribute("aria-label");
    });
  });

  describe("accessibility: labelled mode (with label)", () => {
    it("root span has role='img'", () => {
      render(
        <Icon label="Close dialog" data-testid="icon">
          <MockSvg />
        </Icon>,
      );
      expect(screen.getByTestId("icon")).toHaveAttribute("role", "img");
    });

    it("root span has aria-label matching label prop", () => {
      render(
        <Icon label="Close dialog" data-testid="icon">
          <MockSvg />
        </Icon>,
      );
      expect(screen.getByTestId("icon")).toHaveAttribute(
        "aria-label",
        "Close dialog",
      );
    });

    it("root span does not have aria-hidden='true'", () => {
      render(
        <Icon label="Close dialog" data-testid="icon">
          <MockSvg />
        </Icon>,
      );
      expect(screen.getByTestId("icon")).not.toHaveAttribute("aria-hidden");
    });
  });

  describe("child manipulation", () => {
    it("child SVG receives aria-hidden='true' via cloneElement", () => {
      render(
        <Icon data-testid="icon">
          <MockSvg />
        </Icon>,
      );
      const svg = screen.getByTestId("icon").querySelector("svg");
      expect(svg).toHaveAttribute("aria-hidden", "true");
    });

    it("child SVG receives width='100%' and height='100%' via cloneElement", () => {
      render(
        <Icon data-testid="icon">
          <MockSvg />
        </Icon>,
      );
      const svg = screen.getByTestId("icon").querySelector("svg");
      expect(svg).toHaveAttribute("width", "100%");
      expect(svg).toHaveAttribute("height", "100%");
    });
  });

  describe("className override", () => {
    it("merges consumer className with variant classes", () => {
      render(
        <Icon className="ml-2" data-testid="icon">
          <MockSvg />
        </Icon>,
      );
      const el = screen.getByTestId("icon");
      expect(el.className).toContain("ml-2");
      expect(el.className).toContain("inline-flex");
    });
  });

  describe("native attribute forwarding", () => {
    it("forwards data-testid", () => {
      render(
        <Icon data-testid="my-icon">
          <MockSvg />
        </Icon>,
      );
      expect(screen.getByTestId("my-icon")).toBeInTheDocument();
    });

    it("forwards style prop", () => {
      render(
        <Icon style={{ opacity: 0.5 }} data-testid="icon">
          <MockSvg />
        </Icon>,
      );
      expect(screen.getByTestId("icon").style.opacity).toBe("0.5");
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to root <span>", () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(
        <Icon ref={ref}>
          <MockSvg />
        </Icon>,
      );
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
  });
});
