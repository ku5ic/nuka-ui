import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
  CardFooter,
} from "./Card";

describe("Card", () => {
  describe("rendering", () => {
    it("renders a div element by default", () => {
      render(<Card data-testid="card">Content</Card>);
      const card = screen.getByTestId("card");
      expect(card.tagName).toBe("DIV");
      expect(card).toHaveTextContent("Content");
    });

    it("sets displayName correctly", () => {
      expect(Card.displayName).toBe("Card");
    });
  });

  describe("variants", () => {
    it("applies outlined variant classes by default", () => {
      render(<Card data-testid="card">Card</Card>);
      const card = screen.getByTestId("card");
      expect(card.className).toContain("bg-(--nuka-bg-base)");
      expect(card.className).toContain("border-(--nuka-border-base)");
    });

    it("applies elevated variant classes", () => {
      render(
        <Card data-testid="card" variant="elevated">
          Card
        </Card>,
      );
      const card = screen.getByTestId("card");
      expect(card.className).toContain("bg-(--nuka-bg-base)");
      expect(card.className).toContain("shadow-(--nuka-shadow-card)");
    });

    it("applies filled variant classes", () => {
      render(
        <Card data-testid="card" variant="filled">
          Card
        </Card>,
      );
      const card = screen.getByTestId("card");
      expect(card.className).toContain("bg-(--nuka-bg-muted)");
    });
  });

  describe("className override", () => {
    it("merges consumer className with variant classes", () => {
      render(
        <Card data-testid="card" className="mt-4">
          Card
        </Card>,
      );
      const card = screen.getByTestId("card");
      expect(card.className).toContain("mt-4");
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to the root element", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Card ref={ref}>Card</Card>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("asChild", () => {
    it("renders as child element when asChild is true", () => {
      render(
        <Card asChild variant="outlined">
          <section data-testid="card">Card content</section>
        </Card>,
      );
      const card = screen.getByTestId("card");
      expect(card.tagName).toBe("SECTION");
      expect(card.className).toContain("bg-(--nuka-bg-base)");
    });
  });
});

describe("CardHeader", () => {
  it("renders with padding", () => {
    render(<CardHeader data-testid="header">Header</CardHeader>);
    const header = screen.getByTestId("header");
    expect(header.className).toContain("p-(--space-6)");
  });

  it("sets displayName correctly", () => {
    expect(CardHeader.displayName).toBe("CardHeader");
  });

  it("merges consumer className", () => {
    render(
      <CardHeader data-testid="header" className="gap-4">
        Header
      </CardHeader>,
    );
    expect(screen.getByTestId("header").className).toContain("gap-4");
  });

  it("renders via Slot when asChild is true, skipping Stack", () => {
    render(
      <CardHeader asChild>
        <nav data-testid="header">Nav header</nav>
      </CardHeader>,
    );
    const header = screen.getByTestId("header");
    expect(header.tagName).toBe("NAV");
    expect(header.className).toContain("p-(--space-6)");
  });
});

describe("CardTitle", () => {
  it("renders as h3 by default via Heading", () => {
    render(<CardTitle>Title</CardTitle>);
    const title = screen.getByRole("heading", { name: "Title", level: 3 });
    expect(title).toBeInTheDocument();
  });

  it("renders with the specified heading level", () => {
    render(<CardTitle as="h2">Title</CardTitle>);
    const title = screen.getByRole("heading", { name: "Title", level: 2 });
    expect(title).toBeInTheDocument();
  });

  it("accepts all valid heading levels", () => {
    render(<CardTitle as="h6">Title</CardTitle>);
    const title = screen.getByRole("heading", { name: "Title", level: 6 });
    expect(title).toBeInTheDocument();
  });

  it("sets displayName correctly", () => {
    expect(CardTitle.displayName).toBe("CardTitle");
  });
});

describe("CardDescription", () => {
  it("renders as a p element via Text with muted color", () => {
    render(<CardDescription>Description</CardDescription>);
    const desc = screen.getByText("Description");
    expect(desc.tagName).toBe("P");
    expect(desc.className).toContain("text-(--nuka-text-muted)");
  });

  it("sets displayName correctly", () => {
    expect(CardDescription.displayName).toBe("CardDescription");
  });
});

describe("CardBody", () => {
  it("renders with padding", () => {
    render(<CardBody data-testid="body">Body</CardBody>);
    const body = screen.getByTestId("body");
    expect(body.className).toContain("p-(--space-6)");
  });

  it("sets displayName correctly", () => {
    expect(CardBody.displayName).toBe("CardBody");
  });

  it("renders via Slot when asChild is true", () => {
    render(
      <CardBody asChild>
        <section data-testid="body">Body content</section>
      </CardBody>,
    );
    const body = screen.getByTestId("body");
    expect(body.tagName).toBe("SECTION");
    expect(body.className).toContain("p-(--space-6)");
  });
});

describe("CardFooter", () => {
  it("renders with padding", () => {
    render(<CardFooter data-testid="footer">Footer</CardFooter>);
    const footer = screen.getByTestId("footer");
    expect(footer.className).toContain("p-(--space-6)");
  });

  it("sets displayName correctly", () => {
    expect(CardFooter.displayName).toBe("CardFooter");
  });

  it("merges consumer className", () => {
    render(
      <CardFooter data-testid="footer" className="border-t">
        Footer
      </CardFooter>,
    );
    expect(screen.getByTestId("footer").className).toContain("border-t");
  });

  it("renders via Slot when asChild is true, skipping Stack", () => {
    render(
      <CardFooter asChild>
        <nav data-testid="footer">Nav footer</nav>
      </CardFooter>,
    );
    const footer = screen.getByTestId("footer");
    expect(footer.tagName).toBe("NAV");
    expect(footer.className).toContain("p-(--space-6)");
  });
});

describe("Card composition", () => {
  it("renders a full card with all sub-components", () => {
    render(
      <Card data-testid="card">
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardBody>Body content</CardBody>
        <CardFooter>
          <button type="button">Action</button>
        </CardFooter>
      </Card>,
    );

    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Title", level: 3 }),
    ).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Body content")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
  });
});
