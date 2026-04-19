import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Callout } from "./Callout";

describe("Callout", () => {
  describe("rendering", () => {
    it("renders as a blockquote by default", () => {
      render(<Callout data-testid="callout">Body</Callout>);
      expect(screen.getByTestId("callout").tagName).toBe("BLOCKQUOTE");
    });

    it("renders children inside the default blockquote", () => {
      render(<Callout>A pulled quotation.</Callout>);
      expect(screen.getByText("A pulled quotation.")).toBeInTheDocument();
    });

    it("sets displayName correctly", () => {
      expect(Callout.displayName).toBe("Callout");
    });
  });

  describe("variants", () => {
    it("applies secondary variant classes by default", () => {
      render(<Callout data-testid="callout">Default</Callout>);
      const el = screen.getByTestId("callout");
      expect(el.className).toContain("bg-(--nuka-accent-bg-subtle)");
      expect(el.className).toContain("border-(--nuka-accent-border)");
    });

    it("applies primary variant border class", () => {
      render(
        <Callout data-testid="callout" variant="primary">
          Primary
        </Callout>,
      );
      expect(screen.getByTestId("callout").className).toContain(
        "border-transparent",
      );
    });

    it("applies outline variant classes", () => {
      render(
        <Callout data-testid="callout" variant="outline">
          Outline
        </Callout>,
      );
      expect(screen.getByTestId("callout").className).toContain(
        "bg-transparent",
      );
    });

    it("applies ghost variant classes", () => {
      render(
        <Callout data-testid="callout" variant="ghost">
          Ghost
        </Callout>,
      );
      const el = screen.getByTestId("callout");
      expect(el.className).toContain("bg-transparent");
      expect(el.className).toContain("border-transparent");
    });
  });

  describe("intent", () => {
    it("applies secondary x danger compound classes", () => {
      render(
        <Callout data-testid="callout" intent="danger">
          Danger
        </Callout>,
      );
      expect(screen.getByTestId("callout").className).toContain(
        "bg-(--nuka-danger-bg)",
      );
    });

    it("applies outline x danger compound classes", () => {
      render(
        <Callout data-testid="callout" variant="outline" intent="danger">
          Outline Danger
        </Callout>,
      );
      const el = screen.getByTestId("callout");
      expect(el.className).toContain("border-(--nuka-danger-border)");
      expect(el.className).toContain("text-(--nuka-danger-text)");
    });

    it("applies ghost x warning compound class", () => {
      render(
        <Callout data-testid="callout" variant="ghost" intent="warning">
          Ghost Warning
        </Callout>,
      );
      expect(screen.getByTestId("callout").className).toContain(
        "text-(--nuka-warning-text)",
      );
    });
  });

  describe("variant x intent matrix", () => {
    const cases = [
      ["primary", "default", "bg-(--nuka-accent-bg)"],
      ["primary", "danger", "bg-(--nuka-danger-base)"],
      ["primary", "success", "bg-(--nuka-success-base)"],
      ["primary", "warning", "bg-(--nuka-warning-base)"],
      ["secondary", "default", "bg-(--nuka-accent-bg-subtle)"],
      ["secondary", "danger", "bg-(--nuka-danger-bg)"],
      ["secondary", "success", "bg-(--nuka-success-bg)"],
      ["secondary", "warning", "bg-(--nuka-warning-bg)"],
      ["outline", "default", "border-(--nuka-accent-border)"],
      ["outline", "danger", "border-(--nuka-danger-border)"],
      ["outline", "success", "border-(--nuka-success-border)"],
      ["outline", "warning", "border-(--nuka-warning-border)"],
      ["ghost", "default", "text-(--nuka-text-base)"],
      ["ghost", "danger", "text-(--nuka-danger-text)"],
      ["ghost", "success", "text-(--nuka-success-text)"],
      ["ghost", "warning", "text-(--nuka-warning-text)"],
    ] as const;

    it.each(cases)(
      "variant=%s intent=%s emits %s",
      (variant, intent, expected) => {
        render(
          <Callout data-testid="callout" variant={variant} intent={intent}>
            Body
          </Callout>,
        );
        expect(screen.getByTestId("callout").className).toContain(expected);
      },
    );
  });

  describe("size", () => {
    it("applies sm padding", () => {
      render(
        <Callout data-testid="callout" size="sm">
          Small
        </Callout>,
      );
      const cls = screen.getByTestId("callout").className;
      expect(cls).toContain("px-(--space-3)");
      expect(cls).toContain("py-(--space-2)");
    });

    it("applies md padding by default", () => {
      render(<Callout data-testid="callout">Medium</Callout>);
      const cls = screen.getByTestId("callout").className;
      expect(cls).toContain("px-(--space-4)");
      expect(cls).toContain("py-(--space-3)");
    });

    it("applies lg padding", () => {
      render(
        <Callout data-testid="callout" size="lg">
          Large
        </Callout>,
      );
      const cls = screen.getByTestId("callout").className;
      expect(cls).toContain("px-(--space-6)");
      expect(cls).toContain("py-(--space-4)");
    });
  });

  describe("citation", () => {
    it("renders citation inside a <cite> element when provided", () => {
      render(<Callout citation="Jane Doe, CEO">Body</Callout>);
      const cite = screen.getByText("Jane Doe, CEO");
      expect(cite.tagName).toBe("CITE");
    });

    it("does not render a <cite> when citation is not provided", () => {
      const { container } = render(<Callout>Body only</Callout>);
      expect(container.querySelector("cite")).toBeNull();
    });

    it("warns once and ignores citation when asChild is used", () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {
        /* suppress expected warning */
      });
      render(
        <Callout asChild citation="ignored">
          <figure data-testid="consumer">
            <blockquote>Inner</blockquote>
          </figure>
        </Callout>,
      );
      expect(warn).toHaveBeenCalledTimes(1);
      expect(screen.queryByText("ignored")).not.toBeInTheDocument();
      warn.mockRestore();
    });
  });

  describe("asChild", () => {
    it("renders the consumer tree verbatim", () => {
      render(
        <Callout asChild>
          <figure data-testid="figure">
            <blockquote>Quoted content.</blockquote>
            <figcaption>Jane Doe</figcaption>
          </figure>
        </Callout>,
      );
      const figure = screen.getByTestId("figure");
      expect(figure.tagName).toBe("FIGURE");
      expect(screen.getByText("Quoted content.")).toBeInTheDocument();
      expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    });

    it("merges Callout classes onto the consumer root", () => {
      render(
        <Callout asChild variant="outline" intent="danger">
          <figure data-testid="figure">
            <blockquote>Body</blockquote>
          </figure>
        </Callout>,
      );
      const figure = screen.getByTestId("figure");
      expect(figure.className).toContain("border-(--nuka-danger-border)");
      expect(figure.className).toContain("rounded-(--radius-md)");
    });
  });

  describe("className override", () => {
    it("merges consumer className with variant classes", () => {
      render(
        <Callout data-testid="callout" className="mt-4">
          Styled
        </Callout>,
      );
      const el = screen.getByTestId("callout");
      expect(el.className).toContain("mt-4");
      expect(el.className).toContain("bg-(--nuka-accent-bg-subtle)");
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to the blockquote element", () => {
      const ref = React.createRef<HTMLQuoteElement>();
      render(<Callout ref={ref}>Body</Callout>);
      expect(ref.current).toBeInstanceOf(HTMLQuoteElement);
    });
  });

  describe("native attributes", () => {
    it("forwards the native HTML cite attribute", () => {
      render(
        <Callout data-testid="callout" cite="https://example.com/source">
          Body
        </Callout>,
      );
      expect(screen.getByTestId("callout")).toHaveAttribute(
        "cite",
        "https://example.com/source",
      );
    });

    it("forwards aria-label", () => {
      render(
        <Callout data-testid="callout" aria-label="Testimonial">
          Body
        </Callout>,
      );
      expect(screen.getByTestId("callout")).toHaveAttribute(
        "aria-label",
        "Testimonial",
      );
    });
  });
});
