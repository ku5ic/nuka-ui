import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "@nuka/components/Select/Select";
import { SelectTrigger } from "@nuka/components/Select/SelectTrigger";
import { SelectContent } from "@nuka/components/Select/SelectContent";
import { SelectItem } from "@nuka/components/Select/SelectItem";
import { SelectSeparator } from "@nuka/components/Select/SelectSeparator";
import { FormField } from "@nuka/components/FormField";
import { Label } from "@nuka/components/Label";

const meta: Meta = {
  title: "Forms/Inputs/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div style={{ width: "16rem" }}>
      <Select>
        <SelectTrigger placeholder="Choose an option" />
        <SelectContent>
          <SelectItem value="a">Option A</SelectItem>
          <SelectItem value="b">Option B</SelectItem>
          <SelectItem value="c">Option C</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const WithDefaultValue: Story = {
  render: () => (
    <div style={{ width: "16rem" }}>
      <Select defaultValue="b">
        <SelectTrigger placeholder="Choose an option" />
        <SelectContent>
          <SelectItem value="a">Option A</SelectItem>
          <SelectItem value="b">Option B</SelectItem>
          <SelectItem value="c">Option C</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

function ControlledSelect() {
  const [value, setValue] = React.useState("a");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "16rem" }}>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger placeholder="Choose an option" />
        <SelectContent>
          <SelectItem value="a">Option A</SelectItem>
          <SelectItem value="b">Option B</SelectItem>
          <SelectItem value="c">Option C</SelectItem>
        </SelectContent>
      </Select>
      <p style={{ fontSize: "0.875rem", color: "var(--nuka-text-muted)", margin: 0 }}>
        Selected: {value}
      </p>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledSelect />,
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "16rem" }}>
      <div>
        <Label htmlFor="sm-select">Small</Label>
        <Select>
          <SelectTrigger id="sm-select" size="sm" placeholder="Small" />
          <SelectContent>
            <SelectItem value="a">Option A</SelectItem>
            <SelectItem value="b">Option B</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="md-select">Medium</Label>
        <Select>
          <SelectTrigger id="md-select" size="md" placeholder="Medium" />
          <SelectContent>
            <SelectItem value="a">Option A</SelectItem>
            <SelectItem value="b">Option B</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="lg-select">Large</Label>
        <Select>
          <SelectTrigger id="lg-select" size="lg" placeholder="Large" />
          <SelectContent>
            <SelectItem value="a">Option A</SelectItem>
            <SelectItem value="b">Option B</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
};

export const AllIntents: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "16rem" }}>
      <div>
        <Label htmlFor="default-select">Default</Label>
        <Select>
          <SelectTrigger id="default-select" intent="default" placeholder="Default" />
          <SelectContent>
            <SelectItem value="a">Option A</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="danger-select">Danger</Label>
        <Select>
          <SelectTrigger id="danger-select" intent="danger" placeholder="Danger" />
          <SelectContent>
            <SelectItem value="a">Option A</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="success-select">Success</Label>
        <Select>
          <SelectTrigger id="success-select" intent="success" placeholder="Success" />
          <SelectContent>
            <SelectItem value="a">Option A</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="warning-select">Warning</Label>
        <Select>
          <SelectTrigger id="warning-select" intent="warning" placeholder="Warning" />
          <SelectContent>
            <SelectItem value="a">Option A</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: "16rem" }}>
      <Select disabled>
        <SelectTrigger placeholder="Disabled select" />
        <SelectContent>
          <SelectItem value="a">Option A</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const DisabledOption: Story = {
  render: () => (
    <div style={{ width: "16rem" }}>
      <Select>
        <SelectTrigger placeholder="Choose an option" />
        <SelectContent>
          <SelectItem value="a">Option A</SelectItem>
          <SelectItem value="b" disabled>
            Option B (disabled)
          </SelectItem>
          <SelectItem value="c">Option C</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const WithSeparator: Story = {
  render: () => (
    <div style={{ width: "16rem" }}>
      <Select>
        <SelectTrigger placeholder="Choose a fruit" />
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectSeparator />
          <SelectItem value="carrot">Carrot</SelectItem>
          <SelectItem value="daikon">Daikon</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const LongOptionList: Story = {
  render: () => (
    <div style={{ width: "16rem" }}>
      <Select>
        <SelectTrigger placeholder="Choose a country" />
        <SelectContent>
          <SelectItem value="ar">Argentina</SelectItem>
          <SelectItem value="au">Australia</SelectItem>
          <SelectItem value="br">Brazil</SelectItem>
          <SelectItem value="ca">Canada</SelectItem>
          <SelectItem value="de">Germany</SelectItem>
          <SelectItem value="fr">France</SelectItem>
          <SelectItem value="gb">United Kingdom</SelectItem>
          <SelectItem value="in">India</SelectItem>
          <SelectItem value="jp">Japan</SelectItem>
          <SelectItem value="kr">South Korea</SelectItem>
          <SelectItem value="mx">Mexico</SelectItem>
          <SelectItem value="us">United States</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const InFormField: Story = {
  name: "Pattern: In FormField",
  render: () => (
    <div style={{ width: "20rem" }}>
      <FormField id="country" error="Please select a country" hint="Where do you live?" required>
        <Label>Country</Label>
        <Select>
          <SelectTrigger placeholder="Select a country" intent="danger" />
          <SelectContent>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="gb">United Kingdom</SelectItem>
            <SelectItem value="de">Germany</SelectItem>
          </SelectContent>
        </Select>
      </FormField>
    </div>
  ),
};

function FilterFormExample() {
  const [country, setCountry] = React.useState("");
  const [language, setLanguage] = React.useState("");
  return (
    <div style={{ display: "flex", gap: "1rem", width: "32rem" }}>
      <div style={{ flex: 1 }}>
        <Label htmlFor="filter-country">Country</Label>
        <Select value={country !== "" ? country : undefined} onValueChange={setCountry}>
          <SelectTrigger id="filter-country" placeholder="All countries" />
          <SelectContent>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="gb">United Kingdom</SelectItem>
            <SelectItem value="de">Germany</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div style={{ flex: 1 }}>
        <Label htmlFor="filter-language">Language</Label>
        <Select value={language !== "" ? language : undefined} onValueChange={setLanguage}>
          <SelectTrigger id="filter-language" placeholder="All languages" />
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="de">German</SelectItem>
            <SelectItem value="fr">French</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export const FilterForm: Story = {
  name: "Pattern: Filter Form",
  render: () => <FilterFormExample />,
};
