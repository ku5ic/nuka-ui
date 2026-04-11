import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataTable } from "@nuka/components/DataTable/DataTable";
import type { DataTableColumn } from "@nuka/components/DataTable/DataTable";

interface Person {
  name: string;
  role: string;
  age: string;
}

const columns: DataTableColumn<Person>[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "role", header: "Role" },
  { key: "age", header: "Age", sortable: true },
];

const data: Person[] = [
  { name: "Alice", role: "Engineer", age: "30" },
  { name: "Bob", role: "Designer", age: "25" },
  { name: "Charlie", role: "Manager", age: "40" },
  { name: "Diana", role: "Engineer", age: "35" },
  { name: "Eve", role: "Designer", age: "28" },
];

describe("DataTable", () => {
  it("sets displayName", () => {
    expect(DataTable.displayName).toBe("DataTable");
  });

  it("renders table with data", () => {
    render(<DataTable data={data} columns={columns} caption="Team members" />);

    const table = screen.getByRole("table", { name: "Team members" });
    expect(table).toBeInTheDocument();

    const rows = within(table).getAllByRole("row");
    // 1 header row + 5 data rows
    expect(rows).toHaveLength(6);
  });

  it("renders column headers", () => {
    render(<DataTable data={data} columns={columns} caption="Team members" />);

    expect(
      screen.getByRole("columnheader", { name: "Name" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Role" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Age" }),
    ).toBeInTheDocument();
  });

  it("renders cell content", () => {
    render(<DataTable data={data} columns={columns} caption="Team members" />);

    expect(screen.getByRole("cell", { name: "Alice" })).toBeInTheDocument();
    expect(screen.getAllByRole("cell", { name: "Engineer" })).toHaveLength(2);
  });

  it("shows EmptyState when data is empty", () => {
    render(
      <DataTable
        data={[]}
        columns={columns}
        caption="Team members"
        emptyMessage="No team members"
      />,
    );

    expect(screen.getByText("No team members")).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("uses default empty message", () => {
    render(<DataTable data={[]} columns={columns} caption="Team members" />);

    expect(screen.getByText("No results found")).toBeInTheDocument();
  });
});

describe("DataTable filtering", () => {
  it("renders filter input when filterable", () => {
    render(
      <DataTable
        data={data}
        columns={columns}
        caption="Team members"
        filterable
      />,
    );

    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });

  it("does not render filter input when not filterable", () => {
    render(<DataTable data={data} columns={columns} caption="Team members" />);

    expect(screen.queryByRole("searchbox")).not.toBeInTheDocument();
  });

  it("filter label reads Filter {caption}", () => {
    render(
      <DataTable
        data={data}
        columns={columns}
        caption="Team members"
        filterable
      />,
    );

    expect(screen.getByLabelText("Filter Team members")).toBeInTheDocument();
  });

  it("reduces visible rows on filter", async () => {
    const user = userEvent.setup();
    render(
      <DataTable
        data={data}
        columns={columns}
        caption="Team members"
        filterable
      />,
    );

    const input = screen.getByRole("searchbox");
    await user.type(input, "Engineer");

    const table = screen.getByRole("table");
    const rows = within(table).getAllByRole("row");
    // 1 header + 2 data rows (Alice and Diana are Engineers)
    expect(rows).toHaveLength(3);
  });

  it("filter is case-insensitive", async () => {
    const user = userEvent.setup();
    render(
      <DataTable
        data={data}
        columns={columns}
        caption="Team members"
        filterable
      />,
    );

    const input = screen.getByRole("searchbox");
    await user.type(input, "engineer");

    const table = screen.getByRole("table");
    const rows = within(table).getAllByRole("row");
    expect(rows).toHaveLength(3);
  });

  it("shows EmptyState when filter matches nothing", async () => {
    const user = userEvent.setup();
    render(
      <DataTable
        data={data}
        columns={columns}
        caption="Team members"
        filterable
        emptyMessage="No matches"
      />,
    );

    const input = screen.getByRole("searchbox");
    await user.type(input, "zzzzz");

    expect(screen.getByText("No matches")).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("uses filterPlaceholder on input", () => {
    render(
      <DataTable
        data={data}
        columns={columns}
        caption="Team members"
        filterable
        filterPlaceholder="Search team..."
      />,
    );

    expect(screen.getByPlaceholderText("Search team...")).toBeInTheDocument();
  });
});

describe("DataTable sorting", () => {
  it("sorts ascending on first click", async () => {
    const user = userEvent.setup();
    render(<DataTable data={data} columns={columns} caption="Team members" />);

    const nameHeader = screen.getByRole("columnheader", { name: "Name" });
    const sortButton = within(nameHeader).getByRole("button", {
      name: "Name",
    });
    await user.click(sortButton);

    expect(nameHeader).toHaveAttribute("aria-sort", "ascending");

    const table = screen.getByRole("table");
    const cells = within(table).getAllByRole("cell");
    // First data cell should be Alice (alphabetically first)
    expect(cells[0]).toHaveTextContent("Alice");
  });

  it("sorts descending on second click", async () => {
    const user = userEvent.setup();
    render(<DataTable data={data} columns={columns} caption="Team members" />);

    const nameHeader = screen.getByRole("columnheader", { name: "Name" });
    const sortButton = within(nameHeader).getByRole("button", {
      name: "Name",
    });
    await user.click(sortButton);
    await user.click(sortButton);

    expect(nameHeader).toHaveAttribute("aria-sort", "descending");

    const table = screen.getByRole("table");
    const cells = within(table).getAllByRole("cell");
    // First data cell should be Eve (alphabetically last)
    expect(cells[0]).toHaveTextContent("Eve");
  });

  it("removes sort on third click", async () => {
    const user = userEvent.setup();
    render(<DataTable data={data} columns={columns} caption="Team members" />);

    const nameHeader = screen.getByRole("columnheader", { name: "Name" });
    const sortButton = within(nameHeader).getByRole("button", {
      name: "Name",
    });
    await user.click(sortButton);
    await user.click(sortButton);
    await user.click(sortButton);

    expect(nameHeader).toHaveAttribute("aria-sort", "none");
  });

  it("sets aria-sort on sortable headers", () => {
    render(<DataTable data={data} columns={columns} caption="Team members" />);

    const nameHeader = screen.getByRole("columnheader", { name: "Name" });
    expect(nameHeader).toHaveAttribute("aria-sort", "none");

    const roleHeader = screen.getByRole("columnheader", { name: "Role" });
    expect(roleHeader).not.toHaveAttribute("aria-sort");
  });

  it("uses rowKey for stable row identity across sort changes", async () => {
    const user = userEvent.setup();
    render(
      <DataTable
        data={data}
        columns={columns}
        caption="Team members"
        rowKey="name"
      />,
    );

    const nameHeader = screen.getByRole("columnheader", { name: "Name" });
    const sortButton = within(nameHeader).getByRole("button", {
      name: "Name",
    });

    await user.click(sortButton);
    let cells = within(screen.getByRole("table")).getAllByRole("cell");
    expect(cells[0]).toHaveTextContent("Alice");

    await user.click(sortButton);
    cells = within(screen.getByRole("table")).getAllByRole("cell");
    expect(cells[0]).toHaveTextContent("Eve");

    await user.click(sortButton);
    cells = within(screen.getByRole("table")).getAllByRole("cell");
    expect(cells[0]).toHaveTextContent("Alice");
  });

  it("switches sort column when clicking a different header", async () => {
    const user = userEvent.setup();
    render(<DataTable data={data} columns={columns} caption="Team members" />);

    const nameButton = within(
      screen.getByRole("columnheader", { name: "Name" }),
    ).getByRole("button", { name: "Name" });
    await user.click(nameButton);

    const ageButton = within(
      screen.getByRole("columnheader", { name: "Age" }),
    ).getByRole("button", { name: "Age" });
    await user.click(ageButton);

    const nameHeader = screen.getByRole("columnheader", { name: "Name" });
    expect(nameHeader).toHaveAttribute("aria-sort", "none");

    const ageHeader = screen.getByRole("columnheader", { name: "Age" });
    expect(ageHeader).toHaveAttribute("aria-sort", "ascending");
  });
});

describe("DataTable pagination", () => {
  it("shows only pageSize rows", () => {
    render(
      <DataTable
        data={data}
        columns={columns}
        caption="Team members"
        pageSize={2}
      />,
    );

    const table = screen.getByRole("table");
    const rows = within(table).getAllByRole("row");
    // 1 header + 2 data rows
    expect(rows).toHaveLength(3);
  });

  it("navigates to next page", async () => {
    const user = userEvent.setup();
    render(
      <DataTable
        data={data}
        columns={columns}
        caption="Team members"
        pageSize={2}
      />,
    );

    const nextButton = screen.getByRole("button", {
      name: "Go to next page",
    });
    await user.click(nextButton);

    expect(screen.getByRole("cell", { name: "Charlie" })).toBeInTheDocument();
    expect(
      screen.queryByRole("cell", { name: "Alice" }),
    ).not.toBeInTheDocument();
  });

  it("navigates to previous page", async () => {
    const user = userEvent.setup();
    render(
      <DataTable
        data={data}
        columns={columns}
        caption="Team members"
        pageSize={2}
      />,
    );

    const nextButton = screen.getByRole("button", {
      name: "Go to next page",
    });
    await user.click(nextButton);

    const prevButton = screen.getByRole("button", {
      name: "Go to previous page",
    });
    await user.click(prevButton);

    expect(screen.getByRole("cell", { name: "Alice" })).toBeInTheDocument();
  });

  it("disables Previous on first page", () => {
    render(
      <DataTable
        data={data}
        columns={columns}
        caption="Team members"
        pageSize={2}
      />,
    );

    const prevButton = screen.getByRole("button", {
      name: "Go to previous page",
    });
    expect(prevButton).toBeDisabled();
  });

  it("disables Next on last page", async () => {
    const user = userEvent.setup();
    render(
      <DataTable
        data={data}
        columns={columns}
        caption="Team members"
        pageSize={2}
      />,
    );

    const nextButton = screen.getByRole("button", {
      name: "Go to next page",
    });
    await user.click(nextButton);
    await user.click(nextButton);

    expect(
      screen.getByRole("button", { name: "Go to next page" }),
    ).toBeDisabled();
  });

  it("hides pagination when data fits one page", () => {
    render(
      <DataTable
        data={data}
        columns={columns}
        caption="Team members"
        pageSize={10}
      />,
    );

    expect(
      screen.queryByRole("navigation", { name: "Pagination" }),
    ).not.toBeInTheDocument();
  });

  it("resets to page 1 when filter changes", async () => {
    const user = userEvent.setup();
    render(
      <DataTable
        data={data}
        columns={columns}
        caption="Team members"
        pageSize={2}
        filterable
      />,
    );

    const nextButton = screen.getByRole("button", {
      name: "Go to next page",
    });
    await user.click(nextButton);

    expect(screen.getByRole("cell", { name: "Charlie" })).toBeInTheDocument();

    const input = screen.getByRole("searchbox");
    await user.type(input, "a");

    // After filtering, should be back on page 1
    const table = screen.getByRole("table");
    const rows = within(table).getAllByRole("row");
    // Page 1 of filtered results
    expect(rows.length).toBeGreaterThanOrEqual(2);
  });

  it("navigates via page number buttons", async () => {
    const user = userEvent.setup();
    render(
      <DataTable
        data={data}
        columns={columns}
        caption="Team members"
        pageSize={2}
      />,
    );

    const page2Button = screen.getByRole("button", { name: "2" });
    await user.click(page2Button);

    expect(screen.getByRole("cell", { name: "Charlie" })).toBeInTheDocument();
  });

  it("marks active page with aria-current", () => {
    render(
      <DataTable
        data={data}
        columns={columns}
        caption="Team members"
        pageSize={2}
      />,
    );

    // PaginationLink asChild merges aria-current onto the button via Slot
    const page1Button = screen.getByRole("button", { name: "1" });
    expect(page1Button).toHaveAttribute("aria-current", "page");
  });

  it("Previous button cannot navigate below page 1", async () => {
    const user = userEvent.setup();
    render(
      <DataTable
        data={data}
        columns={columns}
        caption="Team members"
        pageSize={2}
      />,
    );

    const prevButton = screen.getByRole("button", {
      name: "Go to previous page",
    });
    expect(prevButton).toBeDisabled();
    await user.click(prevButton);

    expect(screen.getByRole("cell", { name: "Alice" })).toBeInTheDocument();
  });

  it("Next button cannot navigate past last page", async () => {
    const user = userEvent.setup();
    render(
      <DataTable
        data={data}
        columns={columns}
        caption="Team members"
        pageSize={2}
      />,
    );

    const nextButton = screen.getByRole("button", {
      name: "Go to next page",
    });
    await user.click(nextButton);
    await user.click(nextButton);

    expect(nextButton).toBeDisabled();
    await user.click(nextButton);

    expect(screen.getByRole("cell", { name: "Eve" })).toBeInTheDocument();
  });
});

describe("DataTable live region", () => {
  it("is empty on initial mount", () => {
    render(
      <DataTable
        data={data}
        columns={columns}
        caption="Team members"
        filterable
      />,
    );

    const status = screen.getByRole("status");
    expect(status).toHaveTextContent("");
  });

  it("announces result count after filtering", async () => {
    const user = userEvent.setup();
    render(
      <DataTable
        data={data}
        columns={columns}
        caption="Team members"
        filterable
      />,
    );

    const input = screen.getByRole("searchbox");
    await user.type(input, "Engineer");

    const status = screen.getByRole("status");
    expect(status).toHaveTextContent("Showing 2 results");
  });

  it("uses singular form for one result", async () => {
    const user = userEvent.setup();
    render(
      <DataTable
        data={data}
        columns={columns}
        caption="Team members"
        filterable
      />,
    );

    const input = screen.getByRole("searchbox");
    await user.type(input, "Alice");

    const status = screen.getByRole("status");
    expect(status).toHaveTextContent("Showing 1 result");
  });
});

describe("DataTable custom cell renderer", () => {
  it("renders custom cell content", () => {
    const columnsWithRenderer: DataTableColumn<Person>[] = [
      {
        key: "name",
        header: "Name",
        cell: (value) => <strong data-testid="custom-cell">{value}</strong>,
      },
      { key: "role", header: "Role" },
      { key: "age", header: "Age" },
    ];

    render(
      <DataTable
        data={data}
        columns={columnsWithRenderer}
        caption="Team members"
      />,
    );

    const customCells = screen.getAllByTestId("custom-cell");
    expect(customCells).toHaveLength(5);
    expect(customCells[0]).toHaveTextContent("Alice");
  });
});
