import type { Meta, StoryObj } from "@storybook/react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@nuka/components/Pagination";
import { Stack } from "@nuka/components/Stack";
import { Text } from "@nuka/components/Text";

const meta = {
  title: "Navigation/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="/page/2" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="/page/1">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="/page/2">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="/page/3" isActive>
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="/page/4">4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="/page/5">5</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="/page/4" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="/page/2" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/1">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/2">2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/3" isActive>3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/4">4</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/5">5</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="/page/4" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
        `.trim(),
      },
    },
  },
};

export const FirstPage: Story = {
  name: "First Page",
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" disabled />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="/page/1" isActive>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="/page/2">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="/page/3">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="/page/2" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" disabled />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/1" isActive>1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/2">2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/3">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="/page/2" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
        `.trim(),
      },
    },
  },
};

export const LastPage: Story = {
  name: "Last Page",
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="/page/9" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="/page/8">8</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="/page/9">9</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="/page/10" isActive>
            10
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" disabled />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="/page/9" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/8">8</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/9">9</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/10" isActive>10</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" disabled />
    </PaginationItem>
  </PaginationContent>
</Pagination>
        `.trim(),
      },
    },
  },
};

export const WithEllipsis: Story = {
  name: "With Ellipsis",
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="/page/6" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="/page/1">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="/page/6">6</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="/page/7" isActive>
            7
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="/page/8">8</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="/page/20">20</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="/page/8" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="/page/6" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/1">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/6">6</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/7" isActive>7</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/8">8</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/20">20</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="/page/8" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
        `.trim(),
      },
    },
  },
};

export const TablePagination: Story = {
  name: "Pattern: Table Pagination",
  render: () => (
    <Stack
      direction="row"
      align="center"
      justify="between"
      className="w-full min-w-[500px]"
    >
      <Text size="sm" color="muted">
        Showing 31-40 of 97 results
      </Text>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="/page/3" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="/page/1">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="/page/4" isActive>
              4
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="/page/10">10</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="/page/5" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Stack direction="row" align="center" justify="between" className="w-full min-w-[500px]">
  <Text size="sm" color="muted">Showing 31-40 of 97 results</Text>
  <Pagination>
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious href="/page/3" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="/page/1">1</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationEllipsis />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="/page/4" isActive>4</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationEllipsis />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="/page/10">10</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationNext href="/page/5" />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
</Stack>
        `.trim(),
      },
    },
  },
};
