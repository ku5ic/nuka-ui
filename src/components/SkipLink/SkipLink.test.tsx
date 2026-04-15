import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SkipLink } from "./SkipLink";

describe("SkipLink", () => {
  describe("rendering", () => {
    it("renders an anchor element", () => {
      render(<SkipLink />);
      expect(
        screen.getByRole("link", { name: "Skip to main content" }),
      ).toBeInTheDocument();
    });

    it("sets displayName correctly", () => {
      expect(SkipLink.displayName).toBe("SkipLink");
    });

    it("renders default children text", () => {
      render(<SkipLink />);
      expect(screen.getByText("Skip to main content")).toBeInTheDocument();
    });
  });

  describe("href", () => {
    it("defaults to #main-content", () => {
      render(<SkipLink />);
      expect(
        screen.getByRole("link", { name: "Skip to main content" }),
      ).toHaveAttribute("href", "#main-content");
    });

    it("uses custom targetId", () => {
      render(<SkipLink targetId="content" />);
      expect(
        screen.getByRole("link", { name: "Skip to main content" }),
      ).toHaveAttribute("href", "#content");
    });
  });

  describe("children", () => {
    it("accepts custom children", () => {
      render(<SkipLink>Jump to content</SkipLink>);
      expect(
        screen.getByRole("link", { name: "Jump to content" }),
      ).toBeInTheDocument();
    });
  });

  describe("base classes", () => {
    it("applies sr-only class for visual hiding", () => {
      render(<SkipLink data-testid="skip" />);
      expect(screen.getByTestId("skip").className).toContain("sr-only");
    });

    it("applies focus:not-sr-only for visibility on focus", () => {
      render(<SkipLink data-testid="skip" />);
      expect(screen.getByTestId("skip").className).toContain(
        "focus:not-sr-only",
      );
    });

    it("applies fixed positioning", () => {
      render(<SkipLink data-testid="skip" />);
      expect(screen.getByTestId("skip").className).toContain("fixed");
    });
  });

  describe("className override", () => {
    it("merges consumer className with base classes", () => {
      render(<SkipLink className="custom-skip" data-testid="skip" />);
      const cls = screen.getByTestId("skip").className;
      expect(cls).toContain("custom-skip");
      expect(cls).toContain("sr-only");
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to the anchor element", () => {
      const ref = React.createRef<HTMLAnchorElement>();
      render(<SkipLink ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    });
  });

  describe("native attributes", () => {
    it("forwards data attributes", () => {
      render(<SkipLink data-testid="my-skip" />);
      expect(screen.getByTestId("my-skip")).toBeInTheDocument();
    });
  });
});
