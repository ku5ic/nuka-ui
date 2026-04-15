import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FileInput } from "@nuka/components/FileInput";
import { Stack } from "@nuka/components/Stack";
import { FormField } from "@nuka/components/FormField";
import { Label } from "@nuka/components/Label";
import { Text } from "@nuka/components/Text";

const meta = {
  title: "Forms/Inputs/FileInput",
  component: FileInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    intent: {
      control: "select",
      options: ["default", "danger", "success", "warning"],
    },
    disabled: { control: "boolean" },
    multiple: { control: "boolean" },
    maxFiles: { control: "number" },
    accept: { control: "text" },
    dragLabel: { control: "text" },
    browseLabel: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FileInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Multiple: Story = {
  args: {
    multiple: true,
  },
};

export const WithMaxFiles: Story = {
  args: {
    multiple: true,
    maxFiles: 3,
  },
  parameters: {
    docs: {
      source: {
        code: `<FileInput multiple maxFiles={3} />`.trim(),
      },
    },
  },
};

export const WithAccept: Story = {
  args: {
    accept: ".pdf,.doc,.docx",
    dragLabel: "Drag documents here or",
  },
  parameters: {
    docs: {
      source: {
        code: `<FileInput accept=".pdf,.doc,.docx" dragLabel="Drag documents here or" />`.trim(),
      },
    },
  },
};

export const Intents: Story = {
  render: () => (
    <Stack direction="column" gap="md">
      {(["default", "danger", "success", "warning"] as const).map((intent) => (
        <Stack key={intent} direction="column" gap="xs">
          <Text size="sm" color="muted">
            {intent}
          </Text>
          <FileInput intent={intent} />
        </Stack>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<FileInput intent="default" />
<FileInput intent="danger" />
{/* ...success, warning */}
        `.trim(),
      },
    },
  },
};

export const InFormField: Story = {
  args: {
    multiple: true,
    accept: "image/*",
  },
  decorators: [
    (Story) => (
      <FormField id="avatar" hint="Max 5 MB per file">
        <Label>Upload photos</Label>
        <Story />
      </FormField>
    ),
  ],
  parameters: {
    docs: {
      source: {
        code: `
<FormField id="avatar" hint="Max 5 MB per file">
  <Label>Upload photos</Label>
  <FileInput multiple accept="image/*" />
</FormField>
        `.trim(),
      },
    },
  },
};

export const WithFiles: Story = {
  render: function WithFilesStory() {
    const [files, setFiles] = React.useState<File[]>([]);
    return (
      <Stack direction="column" gap="sm">
        <FileInput multiple onFilesChange={setFiles} />
        <Text size="xs" color="muted">
          {files.length} file{files.length !== 1 ? "s" : ""} selected
        </Text>
      </Stack>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
const [files, setFiles] = React.useState<File[]>([]);
// ...
<FileInput multiple onFilesChange={setFiles} />
        `.trim(),
      },
    },
  },
};
