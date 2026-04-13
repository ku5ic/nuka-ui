import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      tsconfigPath: "./tsconfig.build.json",
      outDir: "dist",
    }),
    {
      name: "copy-styles",
      closeBundle() {
        mkdirSync(resolve(__dirname, "dist"), { recursive: true });

        let compiled = "";
        try {
          compiled = readFileSync(
            resolve(__dirname, "dist/bundle.css"),
            "utf-8",
          );
        } catch {
          // bundle.css may not exist in non-lib builds (e.g. Storybook)
        }

        const animations = readFileSync(
          resolve(__dirname, "src/styles/animations.css"),
          "utf-8",
        );

        const tokens = readFileSync(
          resolve(__dirname, "src/styles/tokens.css"),
          "utf-8",
        );
        writeFileSync(
          resolve(__dirname, "dist/styles.css"),
          ["/* @nuka-ui/core styles */", compiled, tokens, animations]
            .filter(Boolean)
            .join("\n\n"),
          "utf-8",
        );

        const root = readFileSync(
          resolve(__dirname, "src/styles/root.css"),
          "utf-8",
        );
        writeFileSync(
          resolve(__dirname, "dist/styles-root.css"),
          ["/* @nuka-ui/core styles/root */", compiled, root, animations]
            .filter(Boolean)
            .join("\n\n"),
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
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        styles: resolve(__dirname, "src/styles/bundle.css"),
      },
      name: "NukaUI",
      formats: ["es", "cjs"],
      fileName: (format, entryName) => {
        if (entryName === "styles")
          return `bundle.${format === "es" ? "js" : "cjs"}`;
        return `index.${format === "es" ? "js" : "cjs"}`;
      },
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
          if (name?.endsWith(".css")) return "bundle.css";
          return name ?? "asset";
        },
      },
    },
    cssCodeSplit: true,
    sourcemap: true,
  },
});
