import { copyFileSync } from "fs";
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
      name: "copy-root-styles",
      closeBundle() {
        copyFileSync(
          resolve(__dirname, "src/styles/root.css"),
          resolve(__dirname, "dist/styles-root.css"),
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
