import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "@nuka/components/DataTable";
import type { DataTableColumn } from "@nuka/components/DataTable";
import { Badge } from "@nuka/components/Badge";

interface Person {
  name: string;
  role: string;
  department: string;
  status: string;
  age: string;
}

const people: Person[] = [
  {
    name: "Alice Johnson",
    role: "Engineer",
    department: "Platform",
    status: "Active",
    age: "30",
  },
  {
    name: "Bob Smith",
    role: "Designer",
    department: "Product",
    status: "Active",
    age: "25",
  },
  {
    name: "Carol White",
    role: "Manager",
    department: "Engineering",
    status: "Away",
    age: "40",
  },
  {
    name: "Diana Chen",
    role: "Engineer",
    department: "Platform",
    status: "Active",
    age: "35",
  },
  {
    name: "Eve Martinez",
    role: "Designer",
    department: "Product",
    status: "Offline",
    age: "28",
  },
  {
    name: "Frank Lee",
    role: "Engineer",
    department: "Infrastructure",
    status: "Active",
    age: "32",
  },
  {
    name: "Grace Kim",
    role: "Product Manager",
    department: "Product",
    status: "Active",
    age: "38",
  },
  {
    name: "Henry Brown",
    role: "Engineer",
    department: "Platform",
    status: "Away",
    age: "27",
  },
  {
    name: "Iris Wilson",
    role: "Designer",
    department: "Brand",
    status: "Active",
    age: "31",
  },
  {
    name: "Jack Davis",
    role: "Engineer",
    department: "Infrastructure",
    status: "Active",
    age: "29",
  },
  {
    name: "Kate Thomas",
    role: "Manager",
    department: "Engineering",
    status: "Active",
    age: "45",
  },
  {
    name: "Leo Garcia",
    role: "Engineer",
    department: "Platform",
    status: "Offline",
    age: "26",
  },
];

const basicColumns: DataTableColumn<Person>[] = [
  { key: "name", header: "Name" },
  { key: "role", header: "Role" },
  { key: "department", header: "Department" },
];

const sortableColumns: DataTableColumn<Person>[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "role", header: "Role", sortable: true },
  { key: "department", header: "Department" },
  { key: "age", header: "Age", sortable: true },
];

const fullColumns: DataTableColumn<Person>[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "role", header: "Role", sortable: true },
  { key: "department", header: "Department", sortable: true },
  {
    key: "status",
    header: "Status",
    cell: (value) => {
      const intent =
        value === "Active"
          ? "success"
          : value === "Away"
            ? "warning"
            : "default";
      return (
        <Badge intent={intent} variant="subtle">
          {value}
        </Badge>
      );
    },
  },
];

const meta: Meta = {
  title: "Composites/DataTable",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj;

export const BasicDataTable: Story = {
  name: "Basic",
  parameters: {
    docs: {
      source: {
        code: `<DataTable
  data={people}
  columns={[
    { key: "name", header: "Name" },
    { key: "role", header: "Role" },
    { key: "department", header: "Department" },
  ]}
  caption="Team members"
/>`,
      },
    },
  },
  render: () => (
    <DataTable
      data={people.slice(0, 5)}
      columns={basicColumns}
      caption="Team members"
    />
  ),
};

export const WithFiltering: Story = {
  name: "With Filtering",
  parameters: {
    docs: {
      source: {
        code: `<DataTable
  data={people}
  columns={columns}
  caption="Team members"
  filterable
  filterPlaceholder="Search by name, role, or department..."
/>`,
      },
    },
  },
  render: () => (
    <DataTable
      data={people}
      columns={basicColumns}
      caption="Team members"
      filterable
      filterPlaceholder="Search by name, role, or department..."
    />
  ),
};

export const WithSorting: Story = {
  name: "With Sorting",
  parameters: {
    docs: {
      source: {
        code: `<DataTable
  data={people}
  columns={[
    { key: "name", header: "Name", sortable: true },
    { key: "role", header: "Role", sortable: true },
    { key: "department", header: "Department" },
    { key: "age", header: "Age", sortable: true },
  ]}
  caption="Team members"
/>`,
      },
    },
  },
  render: () => (
    <DataTable data={people} columns={sortableColumns} caption="Team members" />
  ),
};

export const WithPagination: Story = {
  name: "With Pagination",
  parameters: {
    docs: {
      source: {
        code: `<DataTable
  data={people}
  columns={columns}
  caption="Team members"
  pageSize={5}
/>`,
      },
    },
  },
  render: () => (
    <DataTable
      data={people}
      columns={basicColumns}
      caption="Team members"
      pageSize={5}
    />
  ),
};

export const FullFeatures: Story = {
  name: "Full Features",
  parameters: {
    docs: {
      source: {
        code: `<DataTable
  data={people}
  columns={[
    { key: "name", header: "Name", sortable: true },
    { key: "role", header: "Role", sortable: true },
    { key: "department", header: "Department", sortable: true },
    {
      key: "status",
      header: "Status",
      cell: (value) => (
        <Badge intent={value === "Active" ? "success" : "default"} variant="subtle">
          {value}
        </Badge>
      ),
    },
  ]}
  caption="Team members"
  filterable
  filterPlaceholder="Search team..."
  pageSize={5}
/>`,
      },
    },
  },
  render: () => (
    <DataTable
      data={people}
      columns={fullColumns}
      caption="Team members"
      filterable
      filterPlaceholder="Search team..."
      pageSize={5}
    />
  ),
};

export const EmptyFilterState: Story = {
  name: "Empty Filter State",
  parameters: {
    docs: {
      source: {
        code: `<DataTable
  data={people}
  columns={columns}
  caption="Team members"
  filterable
  emptyMessage="No team members match your search"
/>`,
      },
    },
  },
  render: () => (
    <DataTable
      data={people.slice(0, 3)}
      columns={basicColumns}
      caption="Team members"
      filterable
      emptyMessage="No team members match your search"
    />
  ),
};
