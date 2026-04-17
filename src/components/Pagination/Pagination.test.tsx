import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@nuka/components/Pagination";

function renderPagination() {
  return render(
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="/page/1" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="/page/1">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="/page/2" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="/page/3">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="/page/3" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>,
  );
}

describe("Pagination", () => {
  describe("rendering", () => {
    it("renders a nav element with default aria-label", () => {
      renderPagination();
      expect(
        screen.getByRole("navigation", { name: "Pagination" }),
      ).toBeInTheDocument();
    });

    it("accepts a custom aria-label", () => {
      render(
        <Pagination aria-label="Results pagination">
          <PaginationContent />
        </Pagination>,
      );
      expect(
        screen.getByRole("navigation", { name: "Results pagination" }),
      ).toBeInTheDocument();
    });

    it("renders content as an unordered list", () => {
      renderPagination();
      // list has no accessible name; only one in fixture
      expect(screen.getByRole("list")).toBeInTheDocument();
      expect(screen.getByRole("list").tagName).toBe("UL");
    });

    it("renders items as list items", () => {
      renderPagination();
      const items = screen.getAllByRole("listitem");
      expect(items.length).toBe(5);
    });
  });

  describe("PaginationLink", () => {
    it("renders an anchor with href", () => {
      renderPagination();
      expect(screen.getByRole("link", { name: "1" })).toHaveAttribute(
        "href",
        "/page/1",
      );
    });

    it("applies aria-current=page when isActive", () => {
      renderPagination();
      expect(screen.getByRole("link", { name: "2" })).toHaveAttribute(
        "aria-current",
        "page",
      );
    });

    it("does not set aria-current when not active", () => {
      renderPagination();
      expect(screen.getByRole("link", { name: "1" })).not.toHaveAttribute(
        "aria-current",
      );
    });

    it("supports asChild", () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink asChild>
                <a href="/custom">Custom</a>
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>,
      );
      const link = screen.getByRole("link", { name: "Custom" });
      expect(link.tagName).toBe("A");
      expect(link).toHaveAttribute("href", "/custom");
    });
  });

  describe("PaginationPrevious", () => {
    it("renders with aria-label for previous page", () => {
      renderPagination();
      expect(
        screen.getByRole("link", { name: "Go to previous page" }),
      ).toBeInTheDocument();
    });

    it("renders default Previous text", () => {
      renderPagination();
      expect(
        screen.getByRole("link", { name: "Go to previous page" }),
      ).toHaveTextContent("Previous");
    });

    it("renders with href", () => {
      renderPagination();
      expect(
        screen.getByRole("link", { name: "Go to previous page" }),
      ).toHaveAttribute("href", "/page/1");
    });

    it("renders native disabled button when disabled", () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious disabled />
            </PaginationItem>
          </PaginationContent>
        </Pagination>,
      );
      const el = screen.getByRole("button", { name: "Go to previous page" });
      expect(el.tagName).toBe("BUTTON");
      expect(el).toHaveAttribute("disabled");
    });

    it("does not fire onClick when disabled", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious disabled onClick={onClick} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>,
      );
      await user.click(
        screen.getByRole("button", { name: "Go to previous page" }),
      );
      expect(onClick).not.toHaveBeenCalled();
    });

    it("supports overriding aria-label", () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="/page/1" aria-label="Previous page" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>,
      );
      expect(
        screen.getByRole("link", { name: "Previous page" }),
      ).toBeInTheDocument();
    });
  });

  describe("PaginationNext", () => {
    it("renders with aria-label for next page", () => {
      renderPagination();
      expect(
        screen.getByRole("link", { name: "Go to next page" }),
      ).toBeInTheDocument();
    });

    it("renders default Next text", () => {
      renderPagination();
      expect(
        screen.getByRole("link", { name: "Go to next page" }),
      ).toHaveTextContent("Next");
    });

    it("renders with href", () => {
      renderPagination();
      expect(
        screen.getByRole("link", { name: "Go to next page" }),
      ).toHaveAttribute("href", "/page/3");
    });

    it("renders native disabled button when disabled", () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationNext disabled />
            </PaginationItem>
          </PaginationContent>
        </Pagination>,
      );
      const el = screen.getByRole("button", { name: "Go to next page" });
      expect(el.tagName).toBe("BUTTON");
      expect(el).toHaveAttribute("disabled");
    });

    it("does not fire onClick when disabled", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationNext disabled onClick={onClick} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>,
      );
      await user.click(screen.getByRole("button", { name: "Go to next page" }));
      expect(onClick).not.toHaveBeenCalled();
    });

    it("supports overriding aria-label", () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationNext href="/page/3" aria-label="Next page" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>,
      );
      expect(
        screen.getByRole("link", { name: "Next page" }),
      ).toBeInTheDocument();
    });
  });

  describe("PaginationEllipsis", () => {
    it("is aria-hidden", () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </PaginationContent>
        </Pagination>,
      );
      const ellipsis = screen.getByText("...");
      expect(ellipsis.closest("[aria-hidden]")).toHaveAttribute(
        "aria-hidden",
        "true",
      );
    });

    it("has accessible label for screen readers", () => {
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </PaginationContent>
        </Pagination>,
      );
      expect(screen.getByText("More pages")).toBeInTheDocument();
      expect(screen.getByText("More pages")).toHaveClass("sr-only");
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref on Pagination", () => {
      const ref = React.createRef<HTMLElement>();
      render(
        <Pagination ref={ref}>
          <PaginationContent />
        </Pagination>,
      );
      expect(ref.current).toBeInstanceOf(HTMLElement);
    });

    it("forwards ref on PaginationContent", () => {
      const ref = React.createRef<HTMLUListElement>();
      render(
        <Pagination>
          <PaginationContent ref={ref} />
        </Pagination>,
      );
      expect(ref.current).toBeInstanceOf(HTMLUListElement);
    });

    it("forwards ref on PaginationLink", () => {
      const ref = React.createRef<HTMLAnchorElement>();
      render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink ref={ref} href="/test">
                1
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>,
      );
      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    });
  });

  describe("displayName", () => {
    it("sets displayName on all sub-components", () => {
      expect(Pagination.displayName).toBe("Pagination");
      expect(PaginationContent.displayName).toBe("PaginationContent");
      expect(PaginationItem.displayName).toBe("PaginationItem");
      expect(PaginationLink.displayName).toBe("PaginationLink");
      expect(PaginationPrevious.displayName).toBe("PaginationPrevious");
      expect(PaginationNext.displayName).toBe("PaginationNext");
      expect(PaginationEllipsis.displayName).toBe("PaginationEllipsis");
    });
  });

  describe("className override", () => {
    it("merges className on Pagination", () => {
      render(
        <Pagination className="custom-pagination">
          <PaginationContent />
        </Pagination>,
      );
      expect(
        screen.getByRole("navigation", { name: "Pagination" }),
      ).toHaveClass("custom-pagination");
    });
  });
});
