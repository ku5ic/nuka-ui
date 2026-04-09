import type { Preview, Decorator } from "@storybook/react-vite";
import { useEffect } from "react";
// @ts-expect-error css side-effect import resolved by Vite
import "../src/styles/index.css";
// @ts-expect-error css side-effect import resolved by Vite
import "./preview.css";

function WithDocumentTheme(
  Story: Parameters<Decorator>[0],
  context: Parameters<Decorator>[1],
) {
  const theme = context.globals["theme"] ?? "light";
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return <Story />;
}

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
    docs: {
      canvas: {
        sourceState: "shown",
      },
    },
    backgrounds: { disable: true },
  },
  decorators: [WithDocumentTheme],
  globalTypes: {
    theme: {
      description: "Global theme for components",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },
};

export default preview;
