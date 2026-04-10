import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
} from "@nuka/components/Table";
import type { SortDirection } from "@nuka/components/Table";
import { Badge } from "@nuka/components/Badge";
import { Text } from "@nuka/components/Text";

const meta: Meta = {
  title: "Composites/Table",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: "Default",
  parameters: {
    docs: {
      source: {
        code: `
<Table caption="Team members">
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Role</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Alice Johnson</TableCell>
      <TableCell>Engineer</TableCell>
      <TableCell><Badge intent="success">Active</Badge></TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Bob Smith</TableCell>
      <TableCell>Designer</TableCell>
      <TableCell><Badge intent="success">Active</Badge></TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Carol White</TableCell>
      <TableCell>Manager</TableCell>
      <TableCell><Badge variant="subtle">Away</Badge></TableCell>
    </TableRow>
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={3}>3 members</TableCell>
    </TableRow>
  </TableFooter>
</Table>
        `.trim(),
      },
    },
  },
  render: () => (
    <Table caption="Team members">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Alice Johnson</TableCell>
          <TableCell>Engineer</TableCell>
          <TableCell>
            <Badge intent="success">Active</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bob Smith</TableCell>
          <TableCell>Designer</TableCell>
          <TableCell>
            <Badge intent="success">Active</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Carol White</TableCell>
          <TableCell>Manager</TableCell>
          <TableCell>
            <Badge variant="subtle">Away</Badge>
          </TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>3 members</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

interface Person {
  name: string;
  role: string;
  joined: string;
}

const people: Person[] = [
  { name: "Alice Johnson", role: "Engineer", joined: "2024-01-15" },
  { name: "Bob Smith", role: "Designer", joined: "2023-06-01" },
  { name: "Carol White", role: "Manager", joined: "2022-11-20" },
  { name: "Dave Brown", role: "Engineer", joined: "2024-03-10" },
];

type SortKey = "name" | "role" | "joined";

function SortableExample() {
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDirection>("asc");

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const sorted = [...people].sort((a, b) => {
    const cmp = a[sortKey].localeCompare(b[sortKey]);
    return sortDir === "asc" ? cmp : -cmp;
  });

  function dirFor(key: SortKey): SortDirection {
    return key === sortKey ? sortDir : "none";
  }

  return (
    <Table caption="Sortable team members">
      <TableHeader>
        <TableRow>
          <TableHead
            sortable
            sortDirection={dirFor("name")}
            onSort={() => handleSort("name")}
          >
            Name
          </TableHead>
          <TableHead
            sortable
            sortDirection={dirFor("role")}
            onSort={() => handleSort("role")}
          >
            Role
          </TableHead>
          <TableHead
            sortable
            sortDirection={dirFor("joined")}
            onSort={() => handleSort("joined")}
          >
            Joined
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sorted.map((p) => (
          <TableRow key={p.name}>
            <TableCell>{p.name}</TableCell>
            <TableCell>{p.role}</TableCell>
            <TableCell>{p.joined}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export const Sortable: Story = {
  name: "Sortable",
  parameters: {
    docs: {
      source: {
        code: `
function Example() {
  const [sortKey, setSortKey] = useState("name");
  const [sortDir, setSortDir] = useState<SortDirection>("asc");

  function handleSort(key: string) {
    if (key === sortKey) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  return (
    <Table caption="Sortable team members">
      <TableHeader>
        <TableRow>
          <TableHead
            sortable
            sortDirection={sortKey === "name" ? sortDir : "none"}
            onSort={() => handleSort("name")}
          >
            Name
          </TableHead>
          <TableHead
            sortable
            sortDirection={sortKey === "role" ? sortDir : "none"}
            onSort={() => handleSort("role")}
          >
            Role
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sorted.map((person) => (
          <TableRow key={person.name}>
            <TableCell>{person.name}</TableCell>
            <TableCell>{person.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
        `.trim(),
      },
    },
  },
  render: () => <SortableExample />,
};

export const Bordered: Story = {
  name: "Bordered",
  parameters: {
    docs: {
      source: {
        code: `
<Table caption="Invoices" variant="bordered">
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Amount</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV-001</TableCell>
      <TableCell>$1,200.00</TableCell>
      <TableCell>Paid</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>INV-002</TableCell>
      <TableCell>$850.00</TableCell>
      <TableCell>Pending</TableCell>
    </TableRow>
  </TableBody>
</Table>
        `.trim(),
      },
    },
  },
  render: () => (
    <Table caption="Invoices" variant="bordered">
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>INV-001</TableCell>
          <TableCell>$1,200.00</TableCell>
          <TableCell>Paid</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>INV-002</TableCell>
          <TableCell>$850.00</TableCell>
          <TableCell>Pending</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>INV-003</TableCell>
          <TableCell>$2,400.00</TableCell>
          <TableCell>Overdue</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const WithRowIntent: Story = {
  name: "With Row Intent",
  parameters: {
    docs: {
      source: {
        code: `
<Table caption="Deployment status">
  <TableHeader>
    <TableRow>
      <TableHead>Service</TableHead>
      <TableHead>Version</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow intent="success">
      <TableCell>API</TableCell>
      <TableCell>v2.4.1</TableCell>
      <TableCell>Healthy</TableCell>
    </TableRow>
    <TableRow intent="warning">
      <TableCell>Worker</TableCell>
      <TableCell>v2.3.0</TableCell>
      <TableCell>Degraded</TableCell>
    </TableRow>
    <TableRow intent="danger">
      <TableCell>Scheduler</TableCell>
      <TableCell>v2.2.8</TableCell>
      <TableCell>Down</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Dashboard</TableCell>
      <TableCell>v2.4.1</TableCell>
      <TableCell>Healthy</TableCell>
    </TableRow>
  </TableBody>
</Table>
        `.trim(),
      },
    },
  },
  render: () => (
    <Table caption="Deployment status">
      <TableHeader>
        <TableRow>
          <TableHead>Service</TableHead>
          <TableHead>Version</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow intent="success">
          <TableCell>API</TableCell>
          <TableCell>v2.4.1</TableCell>
          <TableCell>
            <Badge intent="success">Healthy</Badge>
          </TableCell>
        </TableRow>
        <TableRow intent="warning">
          <TableCell>Worker</TableCell>
          <TableCell>v2.3.0</TableCell>
          <TableCell>
            <Badge intent="warning">Degraded</Badge>
          </TableCell>
        </TableRow>
        <TableRow intent="danger">
          <TableCell>Scheduler</TableCell>
          <TableCell>v2.2.8</TableCell>
          <TableCell>
            <Badge intent="danger">Down</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Dashboard</TableCell>
          <TableCell>v2.4.1</TableCell>
          <TableCell>
            <Badge intent="success">Healthy</Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const WithSelectedRows: Story = {
  name: "With Selected Rows",
  parameters: {
    docs: {
      source: {
        code: `
<Table caption="Files">
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Size</TableHead>
      <TableHead>Modified</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow selected>
      <TableCell>report.pdf</TableCell>
      <TableCell>2.4 MB</TableCell>
      <TableCell>2026-04-08</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>notes.md</TableCell>
      <TableCell>12 KB</TableCell>
      <TableCell>2026-04-07</TableCell>
    </TableRow>
    <TableRow selected>
      <TableCell>data.csv</TableCell>
      <TableCell>840 KB</TableCell>
      <TableCell>2026-04-06</TableCell>
    </TableRow>
  </TableBody>
</Table>
        `.trim(),
      },
    },
  },
  render: () => (
    <Table caption="Files">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Modified</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow selected>
          <TableCell>report.pdf</TableCell>
          <TableCell>2.4 MB</TableCell>
          <TableCell>2026-04-08</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>notes.md</TableCell>
          <TableCell>
            <Text size="sm">12 KB</Text>
          </TableCell>
          <TableCell>2026-04-07</TableCell>
        </TableRow>
        <TableRow selected>
          <TableCell>data.csv</TableCell>
          <TableCell>840 KB</TableCell>
          <TableCell>2026-04-06</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

function WideTableExample() {
  const columns = [
    "ID",
    "Name",
    "Email",
    "Role",
    "Department",
    "Location",
    "Start Date",
    "Status",
  ];
  const rows = [
    [
      "001",
      "Alice Johnson",
      "alice@example.com",
      "Engineer",
      "Platform",
      "San Francisco",
      "2024-01-15",
      "Active",
    ],
    [
      "002",
      "Bob Smith",
      "bob@example.com",
      "Designer",
      "Product",
      "New York",
      "2023-06-01",
      "Active",
    ],
    [
      "003",
      "Carol White",
      "carol@example.com",
      "Manager",
      "Engineering",
      "London",
      "2022-11-20",
      "Away",
    ],
  ];

  return (
    <Table caption="Wide employee directory" className="max-w-2xl">
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead key={col} className="whitespace-nowrap">
              {col}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row[0]}>
            {row.map((cell, i) => (
              <TableCell key={i} className="whitespace-nowrap">
                {cell}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export const LongTableWithScroll: Story = {
  name: "Long Table With Scroll",
  parameters: {
    docs: {
      source: {
        code: `
<Table caption="Wide employee directory" className="max-w-2xl">
  <TableHeader>
    <TableRow>
      <TableHead className="whitespace-nowrap">ID</TableHead>
      <TableHead className="whitespace-nowrap">Name</TableHead>
      <TableHead className="whitespace-nowrap">Email</TableHead>
      {/* more columns... */}
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="whitespace-nowrap">001</TableCell>
      <TableCell className="whitespace-nowrap">Alice Johnson</TableCell>
      <TableCell className="whitespace-nowrap">alice@example.com</TableCell>
      {/* more cells... */}
    </TableRow>
  </TableBody>
</Table>
        `.trim(),
      },
    },
  },
  render: () => <WideTableExample />,
};
