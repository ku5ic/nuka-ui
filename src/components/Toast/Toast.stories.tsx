import type { Meta, StoryObj } from "@storybook/react-vite";
import { toast } from "@nuka/components/Toast/toastStore";
import { toastStore } from "@nuka/components/Toast/toastStore";
import { Toaster } from "@nuka/components/Toast/Toaster";
import type { ToasterPosition } from "@nuka/components/Toast/Toaster";
import { Button } from "@nuka/components/Button";
import * as React from "react";

const meta = {
  title: "Feedback/Toast",
  component: Toaster,
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      toastStore.__reset();
      return <Story />;
    },
  ],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<div>
  <Button
    variant="primary"
    intent="default"
    onClick={() => toast("Settings saved")}
  >
    Show toast
  </Button>
  <Toaster />
</div>
        `.trim(),
      },
    },
  },
  render: () => (
    <div>
      <Button
        variant="primary"
        intent="default"
        onClick={() => toast("Settings saved")}
      >
        Show toast
      </Button>
      <Toaster />
    </div>
  ),
};

export const Intents: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<div className="flex gap-(--space-3)">
  <Button
    variant="secondary"
    intent="default"
    onClick={() => toast("Default notification")}
  >
    Default
  </Button>
  <Button
    variant="secondary"
    intent="success"
    onClick={() => toast.success("Operation completed")}
  >
    Success
  </Button>
  <Button
    variant="secondary"
    intent="danger"
    onClick={() => toast.danger("Something went wrong")}
  >
    Danger
  </Button>
  <Button
    variant="secondary"
    intent="warning"
    onClick={() => toast.warning("Please review your input")}
  >
    Warning
  </Button>
  <Toaster />
</div>
        `.trim(),
      },
    },
  },
  render: () => (
    <div className="flex gap-(--space-3)">
      <Button
        variant="secondary"
        intent="default"
        onClick={() => toast("Default notification")}
      >
        Default
      </Button>
      <Button
        variant="secondary"
        intent="success"
        onClick={() => toast.success("Operation completed")}
      >
        Success
      </Button>
      <Button
        variant="secondary"
        intent="danger"
        onClick={() => toast.danger("Something went wrong")}
      >
        Danger
      </Button>
      <Button
        variant="secondary"
        intent="warning"
        onClick={() => toast.warning("Please review your input")}
      >
        Warning
      </Button>
      <Toaster />
    </div>
  ),
};

export const PersistentToast: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<div>
  <Button
    variant="primary"
    intent="default"
    onClick={() =>
      toast("This toast will not auto-dismiss", { duration: Infinity })
    }
  >
    Show persistent toast
  </Button>
  <Toaster />
</div>
        `.trim(),
      },
    },
  },
  render: () => (
    <div>
      <Button
        variant="primary"
        intent="default"
        onClick={() =>
          toast("This toast will not auto-dismiss", { duration: Infinity })
        }
      >
        Show persistent toast
      </Button>
      <Toaster />
    </div>
  ),
};

export const MultipleToasts: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<div>
  <Button
    variant="primary"
    intent="default"
    onClick={() => {
      toast("First notification");
      setTimeout(() => toast.success("Second notification"), 200);
      setTimeout(() => toast.warning("Third notification"), 400);
    }}
  >
    Show 3 toasts
  </Button>
  <Toaster />
</div>
        `.trim(),
      },
    },
  },
  render: () => (
    <div>
      <Button
        variant="primary"
        intent="default"
        onClick={() => {
          toast("First notification");
          setTimeout(() => toast.success("Second notification"), 200);
          setTimeout(() => toast.warning("Third notification"), 400);
        }}
      >
        Show 3 toasts
      </Button>
      <Toaster />
    </div>
  ),
};

export const QueueOverflow: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<div>
  <Button
    variant="primary"
    intent="default"
    onClick={() => {
      for (let i = 1; i <= 7; i++) {
        toast(\`Toast #\${String(i)}\`, {
          intent: i % 2 === 0 ? "success" : "default",
        });
      }
    }}
  >
    Fire 7 toasts (max 5 visible)
  </Button>
  <Toaster />
</div>
        `.trim(),
      },
    },
  },
  render: () => (
    <div>
      <Button
        variant="primary"
        intent="default"
        onClick={() => {
          for (let i = 1; i <= 7; i++) {
            toast(`Toast #${String(i)}`, {
              intent: i % 2 === 0 ? "success" : "default",
            });
          }
        }}
      >
        Fire 7 toasts (max 5 visible)
      </Button>
      <Toaster />
    </div>
  ),
};

function PositionsExample() {
  const positions: ToasterPosition[] = [
    "top-left",
    "top-center",
    "top-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ];
  const [active, setActive] = React.useState<ToasterPosition>("bottom-right");

  return (
    <div className="flex flex-col gap-(--space-4)">
      <div className="flex flex-wrap gap-(--space-2)">
        {positions.map((pos) => (
          <Button
            key={pos}
            variant={active === pos ? "primary" : "outline"}
            intent="default"
            size="sm"
            onClick={() => {
              toastStore.__reset();
              setActive(pos);
              setTimeout(() => toast(`Toast at ${pos}`), 0);
            }}
          >
            {pos}
          </Button>
        ))}
      </div>
      <Toaster position={active} />
    </div>
  );
}

export const Positions: Story = {
  parameters: {
    docs: {
      source: {
        code: `
function Example() {
  const positions = [
    "top-left",
    "top-center",
    "top-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ];
  const [active, setActive] = useState("bottom-right");

  return (
    <div className="flex flex-col gap-(--space-4)">
      <div className="flex flex-wrap gap-(--space-2)">
        {positions.map((pos) => (
          <Button
            key={pos}
            variant={active === pos ? "primary" : "outline"}
            intent="default"
            size="sm"
            onClick={() => {
              toastStore.__reset();
              setActive(pos);
              setTimeout(() => toast(\`Toast at \${pos}\`), 0);
            }}
          >
            {pos}
          </Button>
        ))}
      </div>
      <Toaster position={active} />
    </div>
  );
}
        `.trim(),
      },
    },
  },
  render: () => <PositionsExample />,
};

function ApiResponseExample() {
  const [loading, setLoading] = React.useState(false);

  const simulateApi = (shouldFail: boolean) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (shouldFail) {
        toast.danger("Failed to save changes. Please try again.");
      } else {
        toast.success("Changes saved successfully");
      }
    }, 1500);
  };

  return (
    <div className="flex gap-(--space-3)">
      <Button
        variant="primary"
        intent="success"
        onClick={() => simulateApi(false)}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save (success)"}
      </Button>
      <Button
        variant="primary"
        intent="danger"
        onClick={() => simulateApi(true)}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save (fail)"}
      </Button>
      <Toaster />
    </div>
  );
}

export const ApiResponse: Story = {
  parameters: {
    docs: {
      source: {
        code: `
function Example() {
  const [loading, setLoading] = useState(false);

  const simulateApi = (shouldFail) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (shouldFail) {
        toast.danger("Failed to save changes. Please try again.");
      } else {
        toast.success("Changes saved successfully");
      }
    }, 1500);
  };

  return (
    <div className="flex gap-(--space-3)">
      <Button
        variant="primary"
        intent="success"
        onClick={() => simulateApi(false)}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save (success)"}
      </Button>
      <Button
        variant="primary"
        intent="danger"
        onClick={() => simulateApi(true)}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save (fail)"}
      </Button>
      <Toaster />
    </div>
  );
}
        `.trim(),
      },
    },
  },
  render: () => <ApiResponseExample />,
};

function UndoActionExample() {
  const [items, setItems] = React.useState(["Item A", "Item B", "Item C"]);

  const deleteItem = (item: string) => {
    setItems((prev) => prev.filter((i) => i !== item));
    toast(`"${item}" deleted`, {
      action: {
        label: "Undo",
        onClick: () => setItems((prev) => [...prev, item]),
      },
    });
  };

  return (
    <div className="flex flex-col gap-(--space-3)">
      {items.length === 0 && (
        <p className="text-sm text-(--nuka-text-muted)">No items remaining</p>
      )}
      {items.map((item) => (
        <div key={item} className="flex items-center gap-(--space-3)">
          <span className="text-sm">{item}</span>
          <Button
            variant="ghost"
            intent="danger"
            size="sm"
            onClick={() => deleteItem(item)}
          >
            Delete
          </Button>
        </div>
      ))}
      <Toaster />
    </div>
  );
}

export const UndoAction: Story = {
  parameters: {
    docs: {
      source: {
        code: `
function Example() {
  const [items, setItems] = useState(["Item A", "Item B", "Item C"]);

  const deleteItem = (item) => {
    setItems((prev) => prev.filter((i) => i !== item));
    toast(\`"\${item}" deleted\`, {
      action: {
        label: "Undo",
        onClick: () => setItems((prev) => [...prev, item]),
      },
    });
  };

  return (
    <div className="flex flex-col gap-(--space-3)">
      {items.length === 0 && (
        <p className="text-sm text-(--nuka-text-muted)">No items remaining</p>
      )}
      {items.map((item) => (
        <div key={item} className="flex items-center gap-(--space-3)">
          <span className="text-sm">{item}</span>
          <Button
            variant="ghost"
            intent="danger"
            size="sm"
            onClick={() => deleteItem(item)}
          >
            Delete
          </Button>
        </div>
      ))}
      <Toaster />
    </div>
  );
}
        `.trim(),
      },
    },
  },
  render: () => <UndoActionExample />,
};
