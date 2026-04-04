import type { Preview } from "@storybook/react-vite";
import "@nuka/styles/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      config: {},
    },
  },
  decorators: [
    (Story) => (
      <div
        data-theme="light"
        style={{ fontFamily: "system-ui, sans-serif", fontSize: "16px" }}
      >
        <Story />
      </div>
    ),
  ],
};

export default preview;
