import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Combobox,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxInput,
  ComboboxListbox,
  ComboboxOption,
  ComboboxGroup,
  ComboboxEmpty,
} from "@nuka/components/Combobox";
import { FormField } from "@nuka/components/FormField";
import { Label } from "@nuka/components/Label";
import { Stack } from "@nuka/components/Stack";
import { Text } from "@nuka/components/Text";

const meta: Meta = {
  title: "Composites/Combobox",
  component: Combobox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

const frameworks = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "SolidJS" },
  { value: "preact", label: "Preact" },
];

export const Basic: Story = {
  render: () => (
    <div className="w-64">
      <Combobox>
        <ComboboxTrigger placeholder="Select framework..." />
        <ComboboxContent>
          <ComboboxInput placeholder="Search..." />
          <ComboboxListbox>
            <ComboboxEmpty>No results found.</ComboboxEmpty>
            {frameworks.map((f) => (
              <ComboboxOption key={f.value} value={f.value}>
                {f.label}
              </ComboboxOption>
            ))}
          </ComboboxListbox>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
};

export const WithDefaultValue: Story = {
  render: () => (
    <div className="w-64">
      <Combobox defaultValue="svelte">
        <ComboboxTrigger placeholder="Select framework..." />
        <ComboboxContent>
          <ComboboxInput placeholder="Search..." />
          <ComboboxListbox>
            <ComboboxEmpty>No results found.</ComboboxEmpty>
            {frameworks.map((f) => (
              <ComboboxOption key={f.value} value={f.value}>
                {f.label}
              </ComboboxOption>
            ))}
          </ComboboxListbox>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <div className="w-64">
      <Combobox>
        <ComboboxTrigger placeholder="Select technology..." />
        <ComboboxContent>
          <ComboboxInput placeholder="Search..." />
          <ComboboxListbox>
            <ComboboxEmpty>No results found.</ComboboxEmpty>
            <ComboboxGroup label="Frontend">
              <ComboboxOption value="react">React</ComboboxOption>
              <ComboboxOption value="vue">Vue</ComboboxOption>
              <ComboboxOption value="svelte">Svelte</ComboboxOption>
            </ComboboxGroup>
            <ComboboxGroup label="Backend">
              <ComboboxOption value="node">Node.js</ComboboxOption>
              <ComboboxOption value="python">Python</ComboboxOption>
              <ComboboxOption value="go">Go</ComboboxOption>
            </ComboboxGroup>
            <ComboboxGroup label="Database">
              <ComboboxOption value="postgres">PostgreSQL</ComboboxOption>
              <ComboboxOption value="mongo">MongoDB</ComboboxOption>
            </ComboboxGroup>
          </ComboboxListbox>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
};

export const WithDisabledOptions: Story = {
  render: () => (
    <div className="w-64">
      <Combobox>
        <ComboboxTrigger placeholder="Select framework..." />
        <ComboboxContent>
          <ComboboxInput placeholder="Search..." />
          <ComboboxListbox>
            <ComboboxEmpty>No results found.</ComboboxEmpty>
            <ComboboxOption value="react">React</ComboboxOption>
            <ComboboxOption value="vue">Vue</ComboboxOption>
            <ComboboxOption value="angular" disabled>
              Angular (deprecated)
            </ComboboxOption>
            <ComboboxOption value="svelte">Svelte</ComboboxOption>
            <ComboboxOption value="jquery" disabled>
              jQuery (legacy)
            </ComboboxOption>
          </ComboboxListbox>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
};

function FreeTextExample() {
  const [value, setValue] = React.useState("");

  return (
    <Stack gap="md">
      <div className="w-64">
        <Combobox freeText value={value} onValueChange={setValue}>
          <ComboboxTrigger placeholder="Type or select..." />
          <ComboboxContent>
            <ComboboxInput placeholder="Search or type custom..." />
            <ComboboxListbox>
              <ComboboxEmpty>
                No matches. Press Enter to use typed value.
              </ComboboxEmpty>
              {frameworks.map((f) => (
                <ComboboxOption key={f.value} value={f.value}>
                  {f.label}
                </ComboboxOption>
              ))}
            </ComboboxListbox>
          </ComboboxContent>
        </Combobox>
      </div>
      <Text size="sm" color="muted">
        Current value: {value || "(empty)"}
      </Text>
    </Stack>
  );
}

export const FreeText: Story = {
  render: () => <FreeTextExample />,
};

export const InsideFormField: Story = {
  render: () => (
    <div className="w-64">
      <FormField error="Please select a framework">
        <Label>Framework</Label>
        <Combobox>
          <ComboboxTrigger placeholder="Select..." intent="danger" />
          <ComboboxContent>
            <ComboboxInput placeholder="Search..." />
            <ComboboxListbox>
              <ComboboxEmpty>No results found.</ComboboxEmpty>
              {frameworks.map((f) => (
                <ComboboxOption key={f.value} value={f.value}>
                  {f.label}
                </ComboboxOption>
              ))}
            </ComboboxListbox>
          </ComboboxContent>
        </Combobox>
      </FormField>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <Stack gap="lg" className="w-64">
      <Stack gap="xs">
        <Text size="xs" color="muted">
          Small
        </Text>
        <Combobox defaultValue="react">
          <ComboboxTrigger placeholder="Select..." size="sm" />
          <ComboboxContent>
            <ComboboxInput placeholder="Search..." />
            <ComboboxListbox>
              {frameworks.map((f) => (
                <ComboboxOption key={f.value} value={f.value}>
                  {f.label}
                </ComboboxOption>
              ))}
            </ComboboxListbox>
          </ComboboxContent>
        </Combobox>
      </Stack>
      <Stack gap="xs">
        <Text size="xs" color="muted">
          Medium (default)
        </Text>
        <Combobox defaultValue="vue">
          <ComboboxTrigger placeholder="Select..." size="md" />
          <ComboboxContent>
            <ComboboxInput placeholder="Search..." />
            <ComboboxListbox>
              {frameworks.map((f) => (
                <ComboboxOption key={f.value} value={f.value}>
                  {f.label}
                </ComboboxOption>
              ))}
            </ComboboxListbox>
          </ComboboxContent>
        </Combobox>
      </Stack>
      <Stack gap="xs">
        <Text size="xs" color="muted">
          Large
        </Text>
        <Combobox defaultValue="svelte">
          <ComboboxTrigger placeholder="Select..." size="lg" />
          <ComboboxContent>
            <ComboboxInput placeholder="Search..." />
            <ComboboxListbox>
              {frameworks.map((f) => (
                <ComboboxOption key={f.value} value={f.value}>
                  {f.label}
                </ComboboxOption>
              ))}
            </ComboboxListbox>
          </ComboboxContent>
        </Combobox>
      </Stack>
    </Stack>
  ),
};

function ControlledExample() {
  const [value, setValue] = React.useState("react");

  return (
    <Stack gap="md">
      <div className="w-64">
        <Combobox value={value} onValueChange={setValue}>
          <ComboboxTrigger placeholder="Select framework..." />
          <ComboboxContent>
            <ComboboxInput placeholder="Search..." />
            <ComboboxListbox>
              <ComboboxEmpty>No results found.</ComboboxEmpty>
              {frameworks.map((f) => (
                <ComboboxOption key={f.value} value={f.value}>
                  {f.label}
                </ComboboxOption>
              ))}
            </ComboboxListbox>
          </ComboboxContent>
        </Combobox>
      </div>
      <Text size="sm" color="muted">
        Selected: {value}
      </Text>
    </Stack>
  );
}

export const Controlled: Story = {
  render: () => <ControlledExample />,
};

const manyOptions = Array.from({ length: 50 }, (_, i) => ({
  value: `option-${String(i + 1)}`,
  label: `Option ${String(i + 1)}`,
}));

export const ManyOptions: Story = {
  render: () => (
    <div className="w-64">
      <Combobox>
        <ComboboxTrigger placeholder="Select from 50 options..." />
        <ComboboxContent>
          <ComboboxInput placeholder="Search..." />
          <ComboboxListbox>
            <ComboboxEmpty>No results found.</ComboboxEmpty>
            {manyOptions.map((o) => (
              <ComboboxOption key={o.value} value={o.value}>
                {o.label}
              </ComboboxOption>
            ))}
          </ComboboxListbox>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
};
