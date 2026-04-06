import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Progress } from "./Progress";

describe("Progress", () => {
  describe("rendering", () => {
    it("renders with role='progressbar'", () => {
      render(<Progress value={50} />);
      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("sets displayName correctly", () => {
      expect(Progress.displayName).toBe("Progress");
    });
  });

  describe("ARIA attributes", () => {
    it("always has aria-valuemin and aria-valuemax", () => {
      render(<Progress value={50} />);
      const el = screen.getByRole("progressbar");
      expect(el).toHaveAttribute("aria-valuemin", "0");
      expect(el).toHaveAttribute("aria-valuemax", "100");
    });

    it("sets aria-valuenow when value is provided", () => {
      render(<Progress value={75} />);
      expect(screen.getByRole("progressbar")).toHaveAttribute(
        "aria-valuenow",
        "75",
      );
    });

    it("omits aria-valuenow when value is undefined", () => {
      render(<Progress />);
      expect(screen.getByRole("progressbar")).not.toHaveAttribute(
        "aria-valuenow",
      );
    });

    it("defaults aria-label to 'Loading'", () => {
      render(<Progress value={50} />);
      expect(screen.getByRole("progressbar")).toHaveAttribute(
        "aria-label",
        "Loading",
      );
    });

    it("uses provided label for aria-label", () => {
      render(<Progress value={50} label="Uploading file" />);
      expect(screen.getByRole("progressbar")).toHaveAttribute(
        "aria-label",
        "Uploading file",
      );
    });
  });

  describe("fill width", () => {
    it("sets fill width to value% when determinate", () => {
      render(<Progress value={60} />);
      const track = screen.getByRole("progressbar");
      const fill = track.firstElementChild as HTMLElement;
      expect(fill.style.width).toBe("60%");
    });

    it("sets fill width to 33% when indeterminate", () => {
      render(<Progress />);
      const track = screen.getByRole("progressbar");
      const fill = track.firstElementChild as HTMLElement;
      expect(fill.className).toContain("w-[33%]");
    });
  });

  describe("intent", () => {
    it("applies default intent fill color", () => {
      render(<Progress value={50} />);
      const track = screen.getByRole("progressbar");
      const fill = track.firstElementChild as HTMLElement;
      expect(fill.className).toContain("bg-(--nuka-accent-bg)");
    });

    it("applies danger intent fill color", () => {
      render(<Progress value={50} intent="danger" />);
      const track = screen.getByRole("progressbar");
      const fill = track.firstElementChild as HTMLElement;
      expect(fill.className).toContain("bg-(--nuka-danger-base)");
    });

    it("applies success intent fill color", () => {
      render(<Progress value={50} intent="success" />);
      const track = screen.getByRole("progressbar");
      const fill = track.firstElementChild as HTMLElement;
      expect(fill.className).toContain("bg-(--nuka-success-base)");
    });

    it("applies warning intent fill color", () => {
      render(<Progress value={50} intent="warning" />);
      const track = screen.getByRole("progressbar");
      const fill = track.firstElementChild as HTMLElement;
      expect(fill.className).toContain("bg-(--nuka-warning-base)");
    });
  });

  describe("className override", () => {
    it("merges consumer className on the outer track", () => {
      render(<Progress value={50} className="mt-4" />);
      const el = screen.getByRole("progressbar");
      expect(el.className).toContain("mt-4");
      expect(el.className).toContain("overflow-hidden");
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to the outer track div", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Progress ref={ref} value={50} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveAttribute("role", "progressbar");
    });
  });
});
