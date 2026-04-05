import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Grid } from "./Grid";

describe("Grid", () => {
  describe("rendering", () => {
    it("renders a div element by default", () => {
      render(<Grid data-testid="grid">Content</Grid>);
      expect(screen.getByTestId("grid").tagName).toBe("DIV");
    });

    it("renders children correctly", () => {
      render(<Grid>Hello</Grid>);
      expect(screen.getByText("Hello")).toBeInTheDocument();
    });

    it("sets displayName correctly", () => {
      expect(Grid.displayName).toBe("Grid");
    });
  });

  describe("base class", () => {
    it("applies grid base class", () => {
      render(<Grid data-testid="grid">Content</Grid>);
      expect(screen.getByTestId("grid").className).toContain("grid");
    });
  });

  describe("cols", () => {
    it("applies default cols class (grid-cols-1)", () => {
      render(<Grid data-testid="grid">Content</Grid>);
      expect(screen.getByTestId("grid").className).toContain("grid-cols-1");
    });

    it("applies grid-cols-3 when cols is 3", () => {
      render(
        <Grid data-testid="grid" cols={3}>
          Content
        </Grid>,
      );
      expect(screen.getByTestId("grid").className).toContain("grid-cols-3");
    });

    it("applies responsive cols classes", () => {
      render(
        <Grid data-testid="grid" cols={{ base: 1, sm: 2, lg: 3 }}>
          Content
        </Grid>,
      );
      const cls = screen.getByTestId("grid").className;
      expect(cls).toContain("grid-cols-1");
      expect(cls).toContain("sm:grid-cols-2");
      expect(cls).toContain("lg:grid-cols-3");
    });
  });

  describe("gap", () => {
    it("applies default gap class (gap-0)", () => {
      render(<Grid data-testid="grid">Content</Grid>);
      expect(screen.getByTestId("grid").className).toContain("gap-0");
    });

    it("applies correct gap class", () => {
      render(
        <Grid data-testid="grid" gap="lg">
          Content
        </Grid>,
      );
      expect(screen.getByTestId("grid").className).toContain("gap-6");
    });
  });

  describe("colGap and rowGap", () => {
    it("applies colGap class", () => {
      render(
        <Grid data-testid="grid" colGap="md">
          Content
        </Grid>,
      );
      expect(screen.getByTestId("grid").className).toContain("gap-x-4");
    });

    it("applies rowGap class", () => {
      render(
        <Grid data-testid="grid" rowGap="sm">
          Content
        </Grid>,
      );
      expect(screen.getByTestId("grid").className).toContain("gap-y-2");
    });

    it("includes both gap and colGap classes when both are set", () => {
      render(
        <Grid data-testid="grid" gap="sm" colGap="lg">
          Content
        </Grid>,
      );
      const cls = screen.getByTestId("grid").className;
      expect(cls).toContain("gap-2");
      expect(cls).toContain("gap-x-6");
    });
  });

  describe("className override", () => {
    it("merges consumer className with layout classes", () => {
      render(
        <Grid data-testid="grid" className="mt-4">
          Content
        </Grid>,
      );
      const cls = screen.getByTestId("grid").className;
      expect(cls).toContain("mt-4");
      expect(cls).toContain("grid");
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to the div element", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Grid ref={ref}>Content</Grid>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("asChild", () => {
    it("renders as child element when asChild is true", () => {
      render(
        <Grid asChild>
          <section data-testid="section">Content</section>
        </Grid>,
      );
      expect(screen.getByTestId("section").tagName).toBe("SECTION");
    });

    it("merges layout classes onto child element", () => {
      render(
        <Grid asChild cols={3} gap="md">
          <section data-testid="section">Content</section>
        </Grid>,
      );
      const cls = screen.getByTestId("section").className;
      expect(cls).toContain("grid");
      expect(cls).toContain("grid-cols-3");
      expect(cls).toContain("gap-4");
    });
  });
});
