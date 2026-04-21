import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@nuka/components/Breadcrumb";

function renderBreadcrumb() {
  return render(
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/products">Products</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Widget Pro</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>,
  );
}

describe("Breadcrumb", () => {
  describe("rendering", () => {
    it("renders a nav element with default aria-label", () => {
      renderBreadcrumb();
      expect(
        screen.getByRole("navigation", { name: "Breadcrumb" }),
      ).toBeInTheDocument();
    });

    it("accepts a custom aria-label", () => {
      render(
        <Breadcrumb aria-label="Site breadcrumb">
          <BreadcrumbList />
        </Breadcrumb>,
      );
      expect(
        screen.getByRole("navigation", { name: "Site breadcrumb" }),
      ).toBeInTheDocument();
    });

    it("renders list as an ordered list", () => {
      renderBreadcrumb();
      expect(screen.getByRole("list")).toBeInTheDocument();
      expect(screen.getByRole("list").tagName).toBe("OL");
    });

    it("renders items as list items", () => {
      renderBreadcrumb();
      const items = screen.getAllByRole("listitem");
      expect(items.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe("BreadcrumbLink", () => {
    it("renders a real <a> element with href", () => {
      renderBreadcrumb();
      const link = screen.getByRole("link", { name: "Home" });
      expect(link.tagName).toBe("A");
      expect(link).toHaveAttribute("href", "/");
    });

    it("is keyboard focusable via Tab", async () => {
      const user = userEvent.setup();
      renderBreadcrumb();
      await user.tab();
      expect(screen.getByRole("link", { name: "Home" })).toHaveFocus();
      await user.tab();
      expect(screen.getByRole("link", { name: "Products" })).toHaveFocus();
    });

    it("supports asChild for router links", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <a href="/custom">Custom</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const link = screen.getByRole("link", { name: "Custom" });
      expect(link.tagName).toBe("A");
      expect(link).toHaveAttribute("href", "/custom");
    });

    it("has focus-visible outline classes", () => {
      renderBreadcrumb();
      const link = screen.getByRole("link", { name: "Home" });
      expect(link.className).toContain("focus-visible:outline-2");
    });
  });

  describe("BreadcrumbPage", () => {
    it("renders a span with aria-current=page", () => {
      renderBreadcrumb();
      const page = screen.getByText("Widget Pro");
      expect(page.tagName).toBe("SPAN");
      expect(page).toHaveAttribute("aria-current", "page");
    });

    it("is not a link element", () => {
      renderBreadcrumb();
      const page = screen.getByText("Widget Pro");
      expect(page.tagName).not.toBe("A");
    });

    it("is in the reading order (visible in DOM)", () => {
      renderBreadcrumb();
      const page = screen.getByText("Widget Pro");
      expect(page).toBeVisible();
      expect(page).not.toHaveAttribute("aria-hidden");
    });
  });

  describe("BreadcrumbSeparator", () => {
    it("has aria-hidden=true", () => {
      renderBreadcrumb();
      const separators = screen.getAllByRole("presentation", { hidden: true });
      expect(separators.length).toBeGreaterThanOrEqual(2);
      for (const sep of separators) {
        expect(sep).toHaveAttribute("aria-hidden", "true");
      }
    });

    it("renders default / when no children", () => {
      renderBreadcrumb();
      const separators = screen.getAllByRole("presentation", { hidden: true });
      expect(separators[0]?.textContent).toBe("/");
    });

    it("renders custom children", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>{">"}</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Page</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const seps = screen.getAllByRole("presentation", { hidden: true });
      expect(seps[0]?.textContent).toBe(">");
    });

    it("does not interfere with Tab order", async () => {
      const user = userEvent.setup();
      renderBreadcrumb();
      await user.tab();
      expect(screen.getByRole("link", { name: "Home" })).toHaveFocus();
      await user.tab();
      expect(screen.getByRole("link", { name: "Products" })).toHaveFocus();
      await user.tab();
      expect(document.body).toHaveFocus();
    });
  });

  describe("BreadcrumbEllipsis", () => {
    it("renders with accessible label", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      expect(screen.getByText("More pages")).toBeInTheDocument();
      expect(screen.getByText("More pages")).toHaveClass("sr-only");
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref on Breadcrumb", () => {
      const ref = React.createRef<HTMLElement>();
      render(
        <Breadcrumb ref={ref}>
          <BreadcrumbList />
        </Breadcrumb>,
      );
      expect(ref.current).toBeInstanceOf(HTMLElement);
    });

    it("forwards ref on BreadcrumbList", () => {
      const ref = React.createRef<HTMLOListElement>();
      render(
        <Breadcrumb>
          <BreadcrumbList ref={ref} />
        </Breadcrumb>,
      );
      expect(ref.current).toBeInstanceOf(HTMLOListElement);
    });

    it("forwards ref on BreadcrumbLink", () => {
      const ref = React.createRef<HTMLAnchorElement>();
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink ref={ref} href="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    });

    it("forwards ref on BreadcrumbPage", () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage ref={ref}>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
  });

  describe("displayName", () => {
    it("sets displayName on all sub-components", () => {
      expect(Breadcrumb.displayName).toBe("Breadcrumb");
      expect(BreadcrumbList.displayName).toBe("BreadcrumbList");
      expect(BreadcrumbItem.displayName).toBe("BreadcrumbItem");
      expect(BreadcrumbLink.displayName).toBe("BreadcrumbLink");
      expect(BreadcrumbPage.displayName).toBe("BreadcrumbPage");
      expect(BreadcrumbSeparator.displayName).toBe("BreadcrumbSeparator");
      expect(BreadcrumbEllipsis.displayName).toBe("BreadcrumbEllipsis");
    });
  });

  describe("className override", () => {
    it("merges className on BreadcrumbList", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList className="custom-list" />
        </Breadcrumb>,
      );
      expect(screen.getByRole("list")).toHaveClass("custom-list");
    });
  });

  describe("data-slot attributes (ADR-054)", () => {
    it("emits data-slot on every Breadcrumb sub-component", () => {
      const { container } = render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );

      expect(container.querySelector('[data-slot="root"]')).not.toBeNull();
      expect(container.querySelector('[data-slot="list"]')).not.toBeNull();
      expect(container.querySelectorAll('[data-slot="item"]').length).toBe(3);
      expect(container.querySelector('[data-slot="link"]')).not.toBeNull();
      expect(container.querySelectorAll('[data-slot="separator"]').length).toBe(
        2,
      );
      expect(container.querySelector('[data-slot="ellipsis"]')).not.toBeNull();
      expect(container.querySelector('[data-slot="page"]')).not.toBeNull();
    });
  });
});
