import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
} from "@nuka/components/Table";

function renderTable({
  variant,
  caption = "Test table",
}: { variant?: "default" | "bordered"; caption?: string } = {}) {
  return render(
    <Table caption={caption} variant={variant}>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Alice</TableCell>
          <TableCell>100</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
        </TableRow>
      </TableFooter>
    </Table>,
  );
}

describe("displayName", () => {
  it("sets displayName on all parts", () => {
    expect(Table.displayName).toBe("Table");
    expect(TableHeader.displayName).toBe("TableHeader");
    expect(TableBody.displayName).toBe("TableBody");
    expect(TableFooter.displayName).toBe("TableFooter");
    expect(TableRow.displayName).toBe("TableRow");
    expect(TableHead.displayName).toBe("TableHead");
    expect(TableCell.displayName).toBe("TableCell");
  });
});

describe("Table", () => {
  it("renders a table element inside a div wrapper", () => {
    renderTable();
    const table = screen.getByRole("table");
    expect(table).toBeInstanceOf(HTMLTableElement);
    expect(table.parentElement).toBeInstanceOf(HTMLDivElement);
  });

  it("renders caption as sr-only", () => {
    renderTable({ caption: "Team members" });
    const caption = screen.getByText("Team members");
    expect(caption.tagName).toBe("CAPTION");
    expect(caption.className).toContain("sr-only");
  });

  it("applies default variant with no border on wrapper", () => {
    renderTable();
    const wrapper = screen.getByRole("table").parentElement!;
    expect(wrapper.className).not.toContain("border ");
  });

  it("applies bordered variant with border on wrapper", () => {
    renderTable({ variant: "bordered" });
    const wrapper = screen.getByRole("table").parentElement!;
    expect(wrapper.className).toContain("border");
    expect(wrapper).toHaveAttribute("data-variant", "bordered");
  });

  it("applies custom className to wrapper", () => {
    render(
      <Table caption="Test" className="custom">
        <TableBody>
          <TableRow>
            <TableCell>A</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    const wrapper = screen.getByRole("table").parentElement!;
    expect(wrapper.className).toContain("custom");
  });

  it("forwards native attributes to wrapper", () => {
    render(
      <Table caption="Test" data-testid="table-wrapper" data-section="data">
        <TableBody>
          <TableRow>
            <TableCell>A</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(screen.getByTestId("table-wrapper")).toHaveAttribute(
      "data-section",
      "data",
    );
  });
});

describe("TableHeader", () => {
  it("renders a thead element", () => {
    render(
      <table>
        <TableHeader data-testid="thead">
          <tr>
            <th>H</th>
          </tr>
        </TableHeader>
      </table>,
    );
    expect(screen.getByTestId("thead").tagName).toBe("THEAD");
  });

  it("has bottom border", () => {
    render(
      <table>
        <TableHeader data-testid="thead">
          <tr>
            <th>H</th>
          </tr>
        </TableHeader>
      </table>,
    );
    expect(screen.getByTestId("thead").className).toContain("border-b");
  });
});

describe("TableBody", () => {
  it("renders a tbody element", () => {
    render(
      <table>
        <TableBody data-testid="tbody">
          <tr>
            <td>Cell</td>
          </tr>
        </TableBody>
      </table>,
    );
    expect(screen.getByTestId("tbody").tagName).toBe("TBODY");
  });
});

describe("TableFooter", () => {
  it("renders a tfoot element with border and muted text", () => {
    render(
      <table>
        <TableFooter data-testid="tfoot">
          <tr>
            <td>Footer</td>
          </tr>
        </TableFooter>
      </table>,
    );
    const tfoot = screen.getByTestId("tfoot");
    expect(tfoot.tagName).toBe("TFOOT");
    expect(tfoot.className).toContain("border-t");
    expect(tfoot.className).toContain("bg-(--nuka-bg-subtle)");
  });
});

describe("TableRow", () => {
  it("renders a tr element with bottom border", () => {
    render(
      <table>
        <tbody>
          <TableRow data-testid="row">
            <td>Cell</td>
          </TableRow>
        </tbody>
      </table>,
    );
    const row = screen.getByTestId("row");
    expect(row.tagName).toBe("TR");
    expect(row.className).toContain("border-b");
  });

  it("applies danger intent background", () => {
    render(
      <table>
        <tbody>
          <TableRow data-testid="row" intent="danger">
            <td>Cell</td>
          </TableRow>
        </tbody>
      </table>,
    );
    expect(screen.getByTestId("row").className).toContain(
      "bg-(--nuka-danger-bg)",
    );
  });

  it("applies success intent background", () => {
    render(
      <table>
        <tbody>
          <TableRow data-testid="row" intent="success">
            <td>Cell</td>
          </TableRow>
        </tbody>
      </table>,
    );
    expect(screen.getByTestId("row").className).toContain(
      "bg-(--nuka-success-bg)",
    );
  });

  it("applies warning intent background", () => {
    render(
      <table>
        <tbody>
          <TableRow data-testid="row" intent="warning">
            <td>Cell</td>
          </TableRow>
        </tbody>
      </table>,
    );
    expect(screen.getByTestId("row").className).toContain(
      "bg-(--nuka-warning-bg)",
    );
  });

  it("applies selected state with aria-selected and accent background", () => {
    render(
      <table>
        <tbody>
          <TableRow data-testid="row" selected>
            <td>Cell</td>
          </TableRow>
        </tbody>
      </table>,
    );
    const row = screen.getByTestId("row");
    expect(row).toHaveAttribute("aria-selected", "true");
    expect(row.className).toContain("bg-(--nuka-accent-bg-subtle)");
  });

  it("selected background takes precedence over intent", () => {
    render(
      <table>
        <tbody>
          <TableRow data-testid="row" intent="danger" selected>
            <td>Cell</td>
          </TableRow>
        </tbody>
      </table>,
    );
    const row = screen.getByTestId("row");
    expect(row.className).toContain("bg-(--nuka-accent-bg-subtle)");
    expect(row.className).not.toContain("bg-(--nuka-danger-bg)");
  });

  it("applies custom className", () => {
    render(
      <table>
        <tbody>
          <TableRow data-testid="row" className="custom">
            <td>Cell</td>
          </TableRow>
        </tbody>
      </table>,
    );
    expect(screen.getByTestId("row").className).toContain("custom");
  });
});

describe("TableHead", () => {
  it("renders a th element with scope col", () => {
    render(
      <table>
        <thead>
          <tr>
            <TableHead>Name</TableHead>
          </tr>
        </thead>
      </table>,
    );
    const th = screen.getByRole("columnheader", { name: "Name" });
    expect(th.tagName).toBe("TH");
    expect(th).toHaveAttribute("scope", "col");
  });

  it("renders sort button when sortable", () => {
    render(
      <table>
        <thead>
          <tr>
            <TableHead sortable sortDirection="asc" onSort={vi.fn()}>
              Name
            </TableHead>
          </tr>
        </thead>
      </table>,
    );
    expect(screen.getByRole("button", { name: /Name/ })).toBeInTheDocument();
  });

  it("sets aria-sort ascending", () => {
    render(
      <table>
        <thead>
          <tr>
            <TableHead sortable sortDirection="asc">
              Name
            </TableHead>
          </tr>
        </thead>
      </table>,
    );
    expect(screen.getByRole("columnheader", { name: /Name/ })).toHaveAttribute(
      "aria-sort",
      "ascending",
    );
  });

  it("sets aria-sort descending", () => {
    render(
      <table>
        <thead>
          <tr>
            <TableHead sortable sortDirection="desc">
              Name
            </TableHead>
          </tr>
        </thead>
      </table>,
    );
    expect(screen.getByRole("columnheader", { name: /Name/ })).toHaveAttribute(
      "aria-sort",
      "descending",
    );
  });

  it("sets aria-sort none when sortable but unsorted", () => {
    render(
      <table>
        <thead>
          <tr>
            <TableHead sortable sortDirection="none">
              Name
            </TableHead>
          </tr>
        </thead>
      </table>,
    );
    expect(screen.getByRole("columnheader", { name: /Name/ })).toHaveAttribute(
      "aria-sort",
      "none",
    );
  });

  it("does not set aria-sort when not sortable", () => {
    render(
      <table>
        <thead>
          <tr>
            <TableHead>Name</TableHead>
          </tr>
        </thead>
      </table>,
    );
    expect(
      screen.getByRole("columnheader", { name: "Name" }),
    ).not.toHaveAttribute("aria-sort");
  });

  it("fires onSort when sort button is clicked", async () => {
    const user = userEvent.setup();
    const handleSort = vi.fn();
    render(
      <table>
        <thead>
          <tr>
            <TableHead sortable sortDirection="asc" onSort={handleSort}>
              Name
            </TableHead>
          </tr>
        </thead>
      </table>,
    );
    await user.click(screen.getByRole("button", { name: /Name/ }));
    expect(handleSort).toHaveBeenCalledOnce();
  });

  it("applies bordered cell border via context", () => {
    render(
      <Table caption="Test" variant="bordered">
        <TableHeader>
          <TableRow>
            <TableHead data-testid="head">Name</TableHead>
          </TableRow>
        </TableHeader>
      </Table>,
    );
    expect(screen.getByTestId("head").className).toContain("border-r");
  });

  it("does not apply cell border in default variant", () => {
    render(
      <Table caption="Test">
        <TableHeader>
          <TableRow>
            <TableHead data-testid="head">Name</TableHead>
          </TableRow>
        </TableHeader>
      </Table>,
    );
    expect(screen.getByTestId("head").className).not.toContain("border-r");
  });

  it("applies custom className", () => {
    render(
      <table>
        <thead>
          <tr>
            <TableHead data-testid="head" className="custom">
              Name
            </TableHead>
          </tr>
        </thead>
      </table>,
    );
    expect(screen.getByTestId("head").className).toContain("custom");
  });
});

describe("TableCell", () => {
  it("renders a td element", () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell>Content</TableCell>
          </tr>
        </tbody>
      </table>,
    );
    expect(screen.getByRole("cell", { name: "Content" }).tagName).toBe("TD");
  });

  it("applies bordered cell border via context", () => {
    render(
      <Table caption="Test" variant="bordered">
        <TableBody>
          <TableRow>
            <TableCell data-testid="cell">Content</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(screen.getByTestId("cell").className).toContain("border-r");
  });

  it("does not apply cell border in default variant", () => {
    render(
      <Table caption="Test">
        <TableBody>
          <TableRow>
            <TableCell data-testid="cell">Content</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(screen.getByTestId("cell").className).not.toContain("border-r");
  });

  it("applies custom className", () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell data-testid="cell" className="custom">
              Content
            </TableCell>
          </tr>
        </tbody>
      </table>,
    );
    expect(screen.getByTestId("cell").className).toContain("custom");
  });

  it("forwards native attributes", () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell data-testid="cell" data-col="name">
              Content
            </TableCell>
          </tr>
        </tbody>
      </table>,
    );
    expect(screen.getByTestId("cell")).toHaveAttribute("data-col", "name");
  });
});

describe("ref forwarding", () => {
  it("forwards ref on Table (to wrapper div)", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Table ref={ref} caption="Test">
        <TableBody>
          <TableRow>
            <TableCell>A</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("forwards ref on TableHeader", () => {
    const ref = React.createRef<HTMLTableSectionElement>();
    render(
      <table>
        <TableHeader ref={ref}>
          <tr>
            <th>H</th>
          </tr>
        </TableHeader>
      </table>,
    );
    expect(ref.current).toBeInstanceOf(HTMLTableSectionElement);
  });

  it("forwards ref on TableBody", () => {
    const ref = React.createRef<HTMLTableSectionElement>();
    render(
      <table>
        <TableBody ref={ref}>
          <tr>
            <td>A</td>
          </tr>
        </TableBody>
      </table>,
    );
    expect(ref.current).toBeInstanceOf(HTMLTableSectionElement);
  });

  it("forwards ref on TableFooter", () => {
    const ref = React.createRef<HTMLTableSectionElement>();
    render(
      <table>
        <TableFooter ref={ref}>
          <tr>
            <td>F</td>
          </tr>
        </TableFooter>
      </table>,
    );
    expect(ref.current).toBeInstanceOf(HTMLTableSectionElement);
  });

  it("forwards ref on TableRow", () => {
    const ref = React.createRef<HTMLTableRowElement>();
    render(
      <table>
        <tbody>
          <TableRow ref={ref}>
            <td>A</td>
          </TableRow>
        </tbody>
      </table>,
    );
    expect(ref.current).toBeInstanceOf(HTMLTableRowElement);
  });

  it("forwards ref on TableHead", () => {
    const ref = React.createRef<HTMLTableCellElement>();
    render(
      <table>
        <thead>
          <tr>
            <TableHead ref={ref}>H</TableHead>
          </tr>
        </thead>
      </table>,
    );
    expect(ref.current).toBeInstanceOf(HTMLTableCellElement);
  });

  it("forwards ref on TableCell", () => {
    const ref = React.createRef<HTMLTableCellElement>();
    render(
      <table>
        <tbody>
          <tr>
            <TableCell ref={ref}>A</TableCell>
          </tr>
        </tbody>
      </table>,
    );
    expect(ref.current).toBeInstanceOf(HTMLTableCellElement);
  });
});

describe("full composition", () => {
  it("renders all semantic elements in correct structure", () => {
    renderTable();
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getAllByRole("columnheader")).toHaveLength(2);
    expect(screen.getAllByRole("cell")).toHaveLength(3);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
  });
});
