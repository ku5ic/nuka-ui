import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "@nuka/components/Textarea";
import { Label } from "@nuka/components/Label";
import { Text } from "@nuka/components/Text";
import { Stack } from "@nuka/components/Stack";

const meta = {
  title: "Forms/Inputs/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    intent: {
      control: "select",
      options: ["default", "danger", "success", "warning"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: {
      control: "boolean",
    },
    readOnly: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
    rows: 4,
  },
};

export const AllIntents: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Stack gap="md" className="w-80">
  <Stack className="gap-1.5">
    <Label htmlFor="default-textarea">Default</Label>
    <Textarea
      id="default-textarea"
      intent="default"
      placeholder="Default intent"
      rows={3}
    />
  </Stack>
  <Stack className="gap-1.5">
    <Label htmlFor="danger-textarea">Danger</Label>
    <Textarea
      id="danger-textarea"
      intent="danger"
      placeholder="Danger intent"
      rows={3}
    />
  </Stack>
  <Stack className="gap-1.5">
    <Label htmlFor="success-textarea">Success</Label>
    <Textarea
      id="success-textarea"
      intent="success"
      placeholder="Success intent"
      rows={3}
    />
  </Stack>
  <Stack className="gap-1.5">
    <Label htmlFor="warning-textarea">Warning</Label>
    <Textarea
      id="warning-textarea"
      intent="warning"
      placeholder="Warning intent"
      rows={3}
    />
  </Stack>
</Stack>
        `.trim(),
      },
    },
  },
  render: () => (
    <Stack gap="md" className="w-80">
      <Stack className="gap-1.5">
        <Label htmlFor="default-textarea">Default</Label>
        <Textarea
          id="default-textarea"
          intent="default"
          placeholder="Default intent"
          rows={3}
        />
      </Stack>
      <Stack className="gap-1.5">
        <Label htmlFor="danger-textarea">Danger</Label>
        <Textarea
          id="danger-textarea"
          intent="danger"
          placeholder="Danger intent"
          rows={3}
        />
      </Stack>
      <Stack className="gap-1.5">
        <Label htmlFor="success-textarea">Success</Label>
        <Textarea
          id="success-textarea"
          intent="success"
          placeholder="Success intent"
          rows={3}
        />
      </Stack>
      <Stack className="gap-1.5">
        <Label htmlFor="warning-textarea">Warning</Label>
        <Textarea
          id="warning-textarea"
          intent="warning"
          placeholder="Warning intent"
          rows={3}
        />
      </Stack>
    </Stack>
  ),
};

export const AllSizes: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Stack gap="md" className="w-80">
  <Stack className="gap-1.5">
    <Label htmlFor="sm-textarea">Small</Label>
    <Textarea
      id="sm-textarea"
      size="sm"
      placeholder="Small textarea"
      rows={3}
    />
  </Stack>
  <Stack className="gap-1.5">
    <Label htmlFor="md-textarea">Medium</Label>
    <Textarea
      id="md-textarea"
      size="md"
      placeholder="Medium textarea"
      rows={3}
    />
  </Stack>
  <Stack className="gap-1.5">
    <Label htmlFor="lg-textarea">Large</Label>
    <Textarea
      id="lg-textarea"
      size="lg"
      placeholder="Large textarea"
      rows={3}
    />
  </Stack>
</Stack>
        `.trim(),
      },
    },
  },
  render: () => (
    <Stack gap="md" className="w-80">
      <Stack className="gap-1.5">
        <Label htmlFor="sm-textarea">Small</Label>
        <Textarea
          id="sm-textarea"
          size="sm"
          placeholder="Small textarea"
          rows={3}
        />
      </Stack>
      <Stack className="gap-1.5">
        <Label htmlFor="md-textarea">Medium</Label>
        <Textarea
          id="md-textarea"
          size="md"
          placeholder="Medium textarea"
          rows={3}
        />
      </Stack>
      <Stack className="gap-1.5">
        <Label htmlFor="lg-textarea">Large</Label>
        <Textarea
          id="lg-textarea"
          size="lg"
          placeholder="Large textarea"
          rows={3}
        />
      </Stack>
    </Stack>
  ),
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled textarea",
    disabled: true,
    rows: 4,
  },
};

export const ReadOnly: Story = {
  args: {
    value: "This content is read-only and cannot be edited.",
    readOnly: true,
    rows: 4,
  },
};

export const WithError: Story = {
  name: "Pattern: With Error",
  parameters: {
    docs: {
      source: {
        code: `
<Stack className="gap-1.5 w-80">
  <Label htmlFor="error-textarea" required>
    Description
  </Label>
  <Textarea
    id="error-textarea"
    intent="danger"
    placeholder="Describe the issue..."
    rows={4}
    aria-required="true"
    aria-describedby="textarea-error"
  />
  <Text
    id="textarea-error"
    size="sm"
    className="text-(--nuka-danger-text)"
  >
    Description must be at least 20 characters.
  </Text>
</Stack>
        `.trim(),
      },
    },
  },
  render: () => (
    <Stack className="gap-1.5 w-80">
      <Label htmlFor="error-textarea" required>
        Description
      </Label>
      <Textarea
        id="error-textarea"
        intent="danger"
        placeholder="Describe the issue..."
        rows={4}
        aria-required="true"
        aria-describedby="textarea-error"
      />
      <Text id="textarea-error" size="sm" className="text-(--nuka-danger-text)">
        Description must be at least 20 characters.
      </Text>
    </Stack>
  ),
};

export const MessageField: Story = {
  name: "Pattern: Message Field",
  parameters: {
    docs: {
      source: {
        code: `
<Stack className="gap-1.5 w-96">
  <Label htmlFor="message-textarea">Leave a comment</Label>
  <Textarea
    id="message-textarea"
    placeholder="Write your thoughts..."
    rows={5}
  />
  <Text size="xs" color="muted">
    Markdown is supported. Be kind and constructive.
  </Text>
</Stack>
        `.trim(),
      },
    },
  },
  render: () => (
    <Stack className="gap-1.5 w-96">
      <Label htmlFor="message-textarea">Leave a comment</Label>
      <Textarea
        id="message-textarea"
        placeholder="Write your thoughts..."
        rows={5}
      />
      <Text size="xs" color="muted">
        Markdown is supported. Be kind and constructive.
      </Text>
    </Stack>
  ),
};
