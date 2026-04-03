import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import type { StorybookConfig } from "@storybook/react-vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-a11y"],
  framework: "@storybook/react-vite",
  async viteFinal(config) {
    config.resolve ??= {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@vault": resolve(__dirname, "../src"),
    };
    return config;
  },
};

export default config;

