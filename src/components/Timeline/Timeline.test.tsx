import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Timeline, TimelineItem } from "./Timeline";

describe("Timeline", () => {
  describe("rendering", () => {
    it("renders as an <ol> element", () => {
      render(
        <Timeline aria-label="Events">
          <TimelineItem title="First" />
        </Timeline>,
      );
      expect(screen.getByRole("list")).toBeInstanceOf(HTMLOListElement);
    });

    it("sets displayName correctly", () => {
      expect(Timeline.displayName).toBe("Timeline");
    });
  });

  describe("className override", () => {
    it("merges consumer className on Timeline", () => {
      render(
        <Timeline aria-label="Events" className="mt-6">
          <TimelineItem title="First" />
        </Timeline>,
      );
      const ol = screen.getByRole("list");
      expect(ol.className).toContain("mt-6");
      expect(ol.className).toContain("flex");
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref on Timeline", () => {
      const ref = React.createRef<HTMLOListElement>();
      render(
        <Timeline ref={ref} aria-label="Events">
          <TimelineItem title="First" />
        </Timeline>,
      );
      expect(ref.current).toBeInstanceOf(HTMLOListElement);
    });
  });
});

describe("TimelineItem", () => {
  describe("rendering", () => {
    it("renders as an <li> element", () => {
      render(
        <Timeline aria-label="Events">
          <TimelineItem title="Deployed" />
        </Timeline>,
      );
      expect(screen.getByRole("listitem")).toBeInstanceOf(HTMLLIElement);
    });

    it("renders title text", () => {
      render(
        <Timeline aria-label="Events">
          <TimelineItem title="Deployed" />
        </Timeline>,
      );
      expect(screen.getByText("Deployed")).toBeInTheDocument();
    });

    it("sets displayName correctly", () => {
      expect(TimelineItem.displayName).toBe("TimelineItem");
    });
  });

  describe("timestamp", () => {
    it("renders as <time> element when provided", () => {
      render(
        <Timeline aria-label="Events">
          <TimelineItem title="Deployed" timestamp="2026-04-04" />
        </Timeline>,
      );
      const time = screen.getByText("2026-04-04");
      expect(time.tagName).toBe("TIME");
    });

    it("does not render <time> when not provided", () => {
      const { container } = render(
        <Timeline aria-label="Events">
          <TimelineItem title="Deployed" />
        </Timeline>,
      );
      expect(container.querySelector("time")).not.toBeInTheDocument();
    });
  });

  describe("description", () => {
    it("renders description when provided", () => {
      render(
        <Timeline aria-label="Events">
          <TimelineItem title="Deployed" description="Version 2.0" />
        </Timeline>,
      );
      expect(screen.getByText("Version 2.0")).toBeInTheDocument();
    });

    it("does not render description when not provided", () => {
      render(
        <Timeline aria-label="Events">
          <TimelineItem title="Deployed" />
        </Timeline>,
      );
      expect(screen.queryByText("Version 2.0")).not.toBeInTheDocument();
    });
  });

  describe("icon", () => {
    it("renders icon inside marker when provided", () => {
      render(
        <Timeline aria-label="Events">
          <TimelineItem title="Deployed" icon={<span data-testid="icon">🚀</span>} />
        </Timeline>,
      );
      expect(screen.getByTestId("icon")).toBeInTheDocument();
    });

    it("renders default dot when no icon provided", () => {
      const { container } = render(
        <Timeline aria-label="Events">
          <TimelineItem title="Deployed" />
        </Timeline>,
      );
      expect(container.querySelector(".w-2.h-2.rounded-full")).toBeInTheDocument();
    });
  });

  describe("intent", () => {
    it("applies default marker border class by default", () => {
      const { container } = render(
        <Timeline aria-label="Events">
          <TimelineItem title="Deployed" />
        </Timeline>,
      );
      const marker = container.querySelector(".border-\\(--nuka-accent-bg\\)");
      expect(marker).toBeInTheDocument();
    });

    it("applies success marker border class", () => {
      const { container } = render(
        <Timeline aria-label="Events">
          <TimelineItem title="Done" intent="success" />
        </Timeline>,
      );
      const marker = container.querySelector(".border-\\(--nuka-success-base\\)");
      expect(marker).toBeInTheDocument();
    });

    it("applies danger marker border class", () => {
      const { container } = render(
        <Timeline aria-label="Events">
          <TimelineItem title="Failed" intent="danger" />
        </Timeline>,
      );
      const marker = container.querySelector(".border-\\(--nuka-danger-base\\)");
      expect(marker).toBeInTheDocument();
    });

    it("applies warning marker border class", () => {
      const { container } = render(
        <Timeline aria-label="Events">
          <TimelineItem title="Slow" intent="warning" />
        </Timeline>,
      );
      const marker = container.querySelector(".border-\\(--nuka-warning-base\\)");
      expect(marker).toBeInTheDocument();
    });
  });

  describe("className override", () => {
    it("merges consumer className on TimelineItem", () => {
      render(
        <Timeline aria-label="Events">
          <TimelineItem title="Deployed" className="custom-class" />
        </Timeline>,
      );
      expect(screen.getByRole("listitem").className).toContain("custom-class");
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref on TimelineItem", () => {
      const ref = React.createRef<HTMLLIElement>();
      render(
        <Timeline aria-label="Events">
          <TimelineItem ref={ref} title="Deployed" />
        </Timeline>,
      );
      expect(ref.current).toBeInstanceOf(HTMLLIElement);
    });
  });
});
