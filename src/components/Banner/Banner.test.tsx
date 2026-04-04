import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Banner } from "./Banner";

describe("Banner", () => {
  describe("rendering", () => {
    it("renders children", () => {
      render(<Banner aria-label="Notice">Hello world</Banner>);
      expect(screen.getByText("Hello world")).toBeInTheDocument();
    });

    it("has role='region'", () => {
      render(<Banner aria-label="Notice">Info</Banner>);
      expect(
        screen.getByRole("region", { name: "Notice" }),
      ).toBeInTheDocument();
    });

    it("forwards aria-label to the root element", () => {
      render(<Banner aria-label="Site announcement">Info</Banner>);
      expect(
        screen.getByRole("region", { name: "Site announcement" }),
      ).toBeInTheDocument();
    });

    it("sets displayName correctly", () => {
      expect(Banner.displayName).toBe("Banner");
    });
  });

  describe("intent", () => {
    it("applies default intent classes by default", () => {
      render(<Banner aria-label="Notice">Default</Banner>);
      expect(
        screen.getByRole("region", { name: "Notice" }).className,
      ).toContain("bg-[var(--nuka-accent-bg-subtle)]");
    });

    it("applies success intent classes", () => {
      render(
        <Banner aria-label="Notice" intent="success">
          Success
        </Banner>,
      );
      expect(
        screen.getByRole("region", { name: "Notice" }).className,
      ).toContain("bg-[var(--nuka-success-bg)]");
    });

    it("applies danger intent classes", () => {
      render(
        <Banner aria-label="Notice" intent="danger">
          Danger
        </Banner>,
      );
      expect(
        screen.getByRole("region", { name: "Notice" }).className,
      ).toContain("bg-[var(--nuka-danger-bg)]");
    });

    it("applies warning intent classes", () => {
      render(
        <Banner aria-label="Notice" intent="warning">
          Warning
        </Banner>,
      );
      expect(
        screen.getByRole("region", { name: "Notice" }).className,
      ).toContain("bg-[var(--nuka-warning-bg)]");
    });
  });

  describe("dismiss", () => {
    it("does not render dismiss button when onDismiss is not provided", () => {
      render(<Banner aria-label="Notice">Info</Banner>);
      expect(
        screen.queryByRole("button", { name: "Dismiss" }),
      ).not.toBeInTheDocument();
    });

    it("renders dismiss button when onDismiss is provided", () => {
      const noop = () => {
        /* dismiss handler */
      };
      render(
        <Banner aria-label="Notice" onDismiss={noop}>
          Info
        </Banner>,
      );
      expect(
        screen.getByRole("button", { name: "Dismiss" }),
      ).toBeInTheDocument();
    });

    it("calls onDismiss when dismiss button is clicked", async () => {
      const user = userEvent.setup();
      const handleDismiss = vi.fn();
      render(
        <Banner aria-label="Notice" onDismiss={handleDismiss}>
          Info
        </Banner>,
      );
      await user.click(screen.getByRole("button", { name: "Dismiss" }));
      expect(handleDismiss).toHaveBeenCalledTimes(1);
    });
  });

  describe("action slot", () => {
    it("renders action content when provided", () => {
      render(
        <Banner aria-label="Notice" action={<button type="button">Update</button>}>
          New version available
        </Banner>,
      );
      expect(
        screen.getByRole("button", { name: "Update" }),
      ).toBeInTheDocument();
    });
  });

  describe("className override", () => {
    it("merges consumer className with variant classes", () => {
      render(
        <Banner aria-label="Notice" className="mt-4">
          Styled
        </Banner>,
      );
      const el = screen.getByRole("region", { name: "Notice" });
      expect(el.className).toContain("mt-4");
      expect(el.className).toContain("bg-[var(--nuka-accent-bg-subtle)]");
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to the div element", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Banner ref={ref} aria-label="Notice">
          Ref
        </Banner>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("native attributes", () => {
    it("forwards data-testid", () => {
      render(
        <Banner aria-label="Notice" data-testid="my-banner">
          Attr
        </Banner>,
      );
      expect(screen.getByTestId("my-banner")).toBeInTheDocument();
    });
  });
});
