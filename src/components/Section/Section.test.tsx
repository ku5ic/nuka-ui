import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Section } from "./Section";

describe("Section", () => {
  describe("rendering", () => {
    it("renders a section element by default", () => {
      render(<Section data-testid="s">Content</Section>);
      expect(screen.getByTestId("s").tagName).toBe("SECTION");
    });

    it("sets displayName correctly", () => {
      expect(Section.displayName).toBe("Section");
    });
  });

  describe("as prop", () => {
    it("renders as div", () => {
      render(
        <Section as="div" data-testid="s">
          Content
        </Section>,
      );
      expect(screen.getByTestId("s").tagName).toBe("DIV");
    });

    it("renders as article", () => {
      render(
        <Section as="article" data-testid="s">
          Content
        </Section>,
      );
      expect(screen.getByTestId("s").tagName).toBe("ARTICLE");
    });

    it("renders as aside", () => {
      render(
        <Section as="aside" data-testid="s">
          Content
        </Section>,
      );
      expect(screen.getByTestId("s").tagName).toBe("ASIDE");
    });
  });

  describe("spacing", () => {
    it("applies md spacing by default", () => {
      render(<Section data-testid="s">Content</Section>);
      const cls = screen.getByTestId("s").className;
      expect(cls).toContain("py-(--space-10)");
      expect(cls).toContain("md:py-(--space-16)");
    });

    it("applies none spacing", () => {
      render(
        <Section spacing="none" data-testid="s">
          Content
        </Section>,
      );
      expect(screen.getByTestId("s").className).toContain("py-0");
    });

    it("applies sm spacing", () => {
      render(
        <Section spacing="sm" data-testid="s">
          Content
        </Section>,
      );
      const cls = screen.getByTestId("s").className;
      expect(cls).toContain("py-(--space-8)");
      expect(cls).toContain("md:py-(--space-10)");
    });

    it("applies lg spacing", () => {
      render(
        <Section spacing="lg" data-testid="s">
          Content
        </Section>,
      );
      const cls = screen.getByTestId("s").className;
      expect(cls).toContain("py-(--space-16)");
      expect(cls).toContain("md:py-(--space-24)");
    });

    it("applies xl spacing", () => {
      render(
        <Section spacing="xl" data-testid="s">
          Content
        </Section>,
      );
      const cls = screen.getByTestId("s").className;
      expect(cls).toContain("py-(--space-24)");
      expect(cls).toContain("md:py-(--space-32)");
    });
  });

  describe("background", () => {
    it("does not apply background by default", () => {
      render(<Section data-testid="s">Content</Section>);
      expect(screen.getByTestId("s").className).not.toContain("bg-");
    });

    it("applies base background", () => {
      render(
        <Section background="base" data-testid="s">
          Content
        </Section>,
      );
      expect(screen.getByTestId("s").className).toContain(
        "bg-(--nuka-bg-base)",
      );
    });

    it("applies subtle background", () => {
      render(
        <Section background="subtle" data-testid="s">
          Content
        </Section>,
      );
      expect(screen.getByTestId("s").className).toContain(
        "bg-(--nuka-bg-subtle)",
      );
    });

    it("applies muted background", () => {
      render(
        <Section background="muted" data-testid="s">
          Content
        </Section>,
      );
      expect(screen.getByTestId("s").className).toContain(
        "bg-(--nuka-bg-muted)",
      );
    });

    it("applies emphasis background with inverse text", () => {
      render(
        <Section background="emphasis" data-testid="s">
          Content
        </Section>,
      );
      const cls = screen.getByTestId("s").className;
      expect(cls).toContain("bg-(--nuka-bg-emphasis)");
      expect(cls).toContain("text-(--nuka-text-inverse)");
    });
  });

  describe("divider", () => {
    it("does not add border by default", () => {
      render(<Section data-testid="s">Content</Section>);
      expect(screen.getByTestId("s").className).not.toContain("border-t");
    });

    it("adds border-t when divider is true", () => {
      render(
        <Section divider data-testid="s">
          Content
        </Section>,
      );
      expect(screen.getByTestId("s").className).toContain("border-t");
    });
  });

  describe("asChild", () => {
    it("renders child element when asChild is true", () => {
      render(
        <Section asChild>
          <article data-testid="s">Content</article>
        </Section>,
      );
      expect(screen.getByTestId("s").tagName).toBe("ARTICLE");
    });
  });

  describe("className override", () => {
    it("merges consumer className with variant classes", () => {
      render(
        <Section className="custom" data-testid="s">
          Content
        </Section>,
      );
      const cls = screen.getByTestId("s").className;
      expect(cls).toContain("custom");
      expect(cls).toContain("py-(--space-10)");
    });
  });

  describe("data-surface", () => {
    it("emits data-surface='inverse' when background='emphasis'", () => {
      render(
        <Section background="emphasis" data-testid="s">
          Content
        </Section>,
      );
      expect(screen.getByTestId("s")).toHaveAttribute(
        "data-surface",
        "inverse",
      );
    });

    it("does not emit data-surface for other background values", () => {
      for (const bg of ["base", "subtle", "muted"] as const) {
        const { unmount } = render(
          <Section background={bg} data-testid="s">
            Content
          </Section>,
        );
        expect(screen.getByTestId("s")).not.toHaveAttribute("data-surface");
        unmount();
      }
    });

    it("does not emit data-surface when background is undefined", () => {
      render(<Section data-testid="s">Content</Section>);
      expect(screen.getByTestId("s")).not.toHaveAttribute("data-surface");
    });

    it("attribute survives asChild composition", () => {
      render(
        <Section asChild background="emphasis">
          <article data-testid="s">Content</article>
        </Section>,
      );
      expect(screen.getByTestId("s")).toHaveAttribute(
        "data-surface",
        "inverse",
      );
    });

    it("consumer data-surface overrides the computed value", () => {
      render(
        <Section background="emphasis" data-surface="default" data-testid="s">
          Content
        </Section>,
      );
      expect(screen.getByTestId("s")).toHaveAttribute(
        "data-surface",
        "default",
      );
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to the rendered element", () => {
      const ref = React.createRef<HTMLElement>();
      render(<Section ref={ref}>Content</Section>);
      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current?.tagName).toBe("SECTION");
    });

    it("forwards ref with as prop", () => {
      const ref = React.createRef<HTMLElement>();
      render(
        <Section ref={ref} as="div">
          Content
        </Section>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });
});
