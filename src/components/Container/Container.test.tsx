import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Container } from "./Container";

describe("Container", () => {
  describe("rendering", () => {
    it("renders a div element by default", () => {
      render(<Container data-testid="container">Content</Container>);
      expect(screen.getByTestId("container").tagName).toBe("DIV");
    });

    it("renders children correctly", () => {
      render(<Container>Hello</Container>);
      expect(screen.getByText("Hello")).toBeInTheDocument();
    });

    it("sets displayName correctly", () => {
      expect(Container.displayName).toBe("Container");
    });
  });

  describe("base class", () => {
    it("applies w-full base class", () => {
      render(<Container data-testid="container">Content</Container>);
      expect(screen.getByTestId("container").className).toContain("w-full");
    });
  });

  describe("size", () => {
    it("applies max-w-screen-xl by default", () => {
      render(<Container data-testid="container">Content</Container>);
      expect(screen.getByTestId("container").className).toContain(
        "max-w-screen-xl",
      );
    });

    it("applies max-w-screen-sm for size sm", () => {
      render(
        <Container data-testid="container" size="sm">
          Content
        </Container>,
      );
      expect(screen.getByTestId("container").className).toContain(
        "max-w-screen-sm",
      );
    });

    it("applies max-w-screen-md for size md", () => {
      render(
        <Container data-testid="container" size="md">
          Content
        </Container>,
      );
      expect(screen.getByTestId("container").className).toContain(
        "max-w-screen-md",
      );
    });

    it("applies max-w-screen-lg for size lg", () => {
      render(
        <Container data-testid="container" size="lg">
          Content
        </Container>,
      );
      expect(screen.getByTestId("container").className).toContain(
        "max-w-screen-lg",
      );
    });

    it("applies max-w-screen-2xl for size 2xl", () => {
      render(
        <Container data-testid="container" size="2xl">
          Content
        </Container>,
      );
      expect(screen.getByTestId("container").className).toContain(
        "max-w-screen-2xl",
      );
    });

    it("applies max-w-full for size full", () => {
      render(
        <Container data-testid="container" size="full">
          Content
        </Container>,
      );
      expect(screen.getByTestId("container").className).toContain("max-w-full");
    });
  });

  describe("padded", () => {
    it("applies horizontal padding classes when padded is true (default)", () => {
      render(<Container data-testid="container">Content</Container>);
      const cls = screen.getByTestId("container").className;
      expect(cls).toContain("px-4");
      expect(cls).toContain("sm:px-6");
      expect(cls).toContain("lg:px-8");
    });

    it("does not apply horizontal padding when padded is false", () => {
      render(
        <Container data-testid="container" padded={false}>
          Content
        </Container>,
      );
      const cls = screen.getByTestId("container").className;
      expect(cls).not.toContain("px-4");
      expect(cls).not.toContain("sm:px-6");
      expect(cls).not.toContain("lg:px-8");
    });
  });

  describe("centered", () => {
    it("applies mx-auto when centered is true (default)", () => {
      render(<Container data-testid="container">Content</Container>);
      expect(screen.getByTestId("container").className).toContain("mx-auto");
    });

    it("does not apply mx-auto when centered is false", () => {
      render(
        <Container data-testid="container" centered={false}>
          Content
        </Container>,
      );
      expect(screen.getByTestId("container").className).not.toContain(
        "mx-auto",
      );
    });
  });

  describe("defaults", () => {
    it("applies size xl, padded true, centered true by default", () => {
      render(<Container data-testid="container">Content</Container>);
      const cls = screen.getByTestId("container").className;
      expect(cls).toContain("max-w-screen-xl");
      expect(cls).toContain("mx-auto");
      expect(cls).toContain("px-4");
    });
  });

  describe("className override", () => {
    it("merges consumer className with container classes", () => {
      render(
        <Container data-testid="container" className="mt-8">
          Content
        </Container>,
      );
      const cls = screen.getByTestId("container").className;
      expect(cls).toContain("mt-8");
      expect(cls).toContain("w-full");
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to the div element", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Container ref={ref}>Content</Container>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("asChild", () => {
    it("renders as child element when asChild is true", () => {
      render(
        <Container asChild>
          <main data-testid="main">Content</main>
        </Container>,
      );
      expect(screen.getByTestId("main").tagName).toBe("MAIN");
    });

    it("merges container classes onto child element", () => {
      render(
        <Container asChild size="lg">
          <main data-testid="main">Content</main>
        </Container>,
      );
      const cls = screen.getByTestId("main").className;
      expect(cls).toContain("w-full");
      expect(cls).toContain("max-w-screen-lg");
      expect(cls).toContain("mx-auto");
    });
  });

  describe("as", () => {
    it("renders a main when as='main'", () => {
      render(
        <Container as="main" data-testid="container">
          Content
        </Container>,
      );
      expect(screen.getByTestId("container").tagName).toBe("MAIN");
    });

    it("renders an article when as='article'", () => {
      render(
        <Container as="article" data-testid="container">
          Content
        </Container>,
      );
      expect(screen.getByTestId("container").tagName).toBe("ARTICLE");
    });

    it("forwards ref when as is a non-div element", () => {
      const ref = React.createRef<HTMLElement>();
      render(
        <Container as="main" ref={ref}>
          Content
        </Container>,
      );
      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current?.tagName).toBe("MAIN");
    });

    it("asChild overrides as (renders child element, not as value)", () => {
      render(
        <Container asChild as="main">
          <article data-testid="child">Content</article>
        </Container>,
      );
      expect(screen.getByTestId("child").tagName).toBe("ARTICLE");
    });

    it("rejects interactive elements at compile time", () => {
      render(
        // @ts-expect-error -- `button` is not a member of LayoutElement
        <Container as="button" data-testid="container">
          Content
        </Container>,
      );
      expect(screen.getByTestId("container")).toBeInTheDocument();
    });
  });
});
