import { copyFileSync, readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "copy-styles",
      closeBundle() {
        // styles-root.css: light-theme only, no dark mode, single :root scope
        copyFileSync(
          resolve(__dirname, "src/styles/root.css"),
          resolve(__dirname, "dist/styles-root.css"),
        );

        // styles.css: tokens (light + dark) + animations, no Tailwind base layer
        const tokens = readFileSync(
          resolve(__dirname, "src/styles/tokens.css"),
          "utf-8",
        );
        const animations = readFileSync(
          resolve(__dirname, "src/styles/animations.css"),
          "utf-8",
        );
        writeFileSync(
          resolve(__dirname, "dist/styles.css"),
          `/* nuka-ui styles */\n\n${tokens}\n\n${animations}`,
          "utf-8",
        );
      },
    },
  ],
  resolve: {
    alias: {
      "@nuka": resolve(__dirname, "./src/"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "NukaUI",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        assetFileNames: (assetInfo) => {
          const name = assetInfo.names[0];
          if (name === "style.css") return "styles.css";
          return name ?? "asset";
        },
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
  },
});
