import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  DatePicker,
  DatePickerInput,
  DatePickerCalendar,
} from "@nuka/components/DatePicker";
import { FormField } from "@nuka/components/FormField";
import { Label } from "@nuka/components/Label";
import { Text } from "@nuka/components/Text";
import { Stack } from "@nuka/components/Stack";

const meta: Meta = {
  title: "Composites/DatePicker",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj;

function BasicDemo() {
  return (
    <div style={{ width: 280 }}>
      <DatePicker>
        <DatePickerInput placeholder="YYYY-MM-DD" />
        <DatePickerCalendar />
      </DatePicker>
    </div>
  );
}

export const Basic: Story = {
  render: () => <BasicDemo />,
  parameters: {
    docs: {
      source: {
        code: `<DatePicker>
  <DatePickerInput placeholder="YYYY-MM-DD" />
  <DatePickerCalendar />
</DatePicker>`,
      },
    },
  },
};

function WithMinMaxDemo() {
  const min = new Date(2026, 3, 5);
  const max = new Date(2026, 3, 25);
  return (
    <div style={{ width: 280 }}>
      <DatePicker min={min} max={max}>
        <DatePickerInput />
        <DatePickerCalendar />
      </DatePicker>
      <Text as="p" size="xs" color="muted" className="mt-(--space-2)">
        Selectable range: April 5 to April 25, 2026
      </Text>
    </div>
  );
}

export const WithMinMax: Story = {
  render: () => <WithMinMaxDemo />,
  parameters: {
    docs: {
      source: {
        code: `<DatePicker min={new Date(2026, 3, 5)} max={new Date(2026, 3, 25)}>
  <DatePickerInput />
  <DatePickerCalendar />
</DatePicker>`,
      },
    },
  },
};

function InsideFormFieldDemo() {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <div style={{ width: 280 }}>
      <FormField id="dob" error="Date of birth is required" required>
        <Label>Date of birth</Label>
        <DatePicker value={date} onValueChange={setDate}>
          <DatePickerInput />
          <DatePickerCalendar />
        </DatePicker>
      </FormField>
    </div>
  );
}

export const InsideFormField: Story = {
  render: () => <InsideFormFieldDemo />,
  parameters: {
    docs: {
      source: {
        code: `<FormField id="dob" error="Date of birth is required" required>
  <Label>Date of birth</Label>
  <DatePicker value={date} onValueChange={setDate}>
    <DatePickerInput />
    <DatePickerCalendar />
  </DatePicker>
</FormField>`,
      },
    },
  },
};

function ControlledDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 3, 15));

  return (
    <Stack gap="md">
      <div style={{ width: 280 }}>
        <DatePicker value={date} onValueChange={setDate}>
          <DatePickerInput />
          <DatePickerCalendar />
        </DatePicker>
      </div>
      <Text as="p" size="sm">
        Selected:{" "}
        {date !== undefined
          ? date.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "none"}
      </Text>
    </Stack>
  );
}

export const Controlled: Story = {
  render: () => <ControlledDemo />,
  parameters: {
    docs: {
      source: {
        code: `const [date, setDate] = useState(new Date(2026, 3, 15));

<DatePicker value={date} onValueChange={setDate}>
  <DatePickerInput />
  <DatePickerCalendar />
</DatePicker>
<p>Selected: {date?.toLocaleDateString()}</p>`,
      },
    },
  },
};

function DefaultValueDemo() {
  return (
    <div style={{ width: 280 }}>
      <DatePicker defaultValue={new Date(2026, 0, 1)}>
        <DatePickerInput />
        <DatePickerCalendar />
      </DatePicker>
    </div>
  );
}

export const DefaultValue: Story = {
  render: () => <DefaultValueDemo />,
  parameters: {
    docs: {
      source: {
        code: `<DatePicker defaultValue={new Date(2026, 0, 1)}>
  <DatePickerInput />
  <DatePickerCalendar />
</DatePicker>`,
      },
    },
  },
};

function LocalizedDEDemo() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  return (
    <div style={{ width: 280 }}>
      <DatePicker
        locale="de-DE"
        value={date}
        onValueChange={setDate}
        formatDate={(d) =>
          `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getFullYear())}`
        }
      >
        <DatePickerInput placeholder="TT.MM.JJJJ" />
        <DatePickerCalendar />
      </DatePicker>
    </div>
  );
}

export const LocalizedDE: Story = {
  name: "Localized (de-DE)",
  render: () => <LocalizedDEDemo />,
  parameters: {
    docs: {
      source: {
        code: `<DatePicker locale="de-DE" value={date} onValueChange={setDate}>
  <DatePickerInput placeholder="TT.MM.JJJJ" />
  <DatePickerCalendar />
</DatePicker>`,
      },
    },
  },
};
