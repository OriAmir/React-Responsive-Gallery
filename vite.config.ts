import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsConfigPaths from "vite-tsconfig-paths";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import eslint from "vite-plugin-eslint";

export default defineConfig((configEnv) => ({
  define: {
    global: {},
  },
  plugins: [
    eslint({
      failOnWarning: true,
    }),
    react(),
    tsConfigPaths(),
    dts({
      outputDir: "dist/declarations",
      insertTypesEntry: true,
    }),
    cssInjectedByJsPlugin(),
  ],
  build: {
    // sourcemap: true --> for dev debug,
    lib: {
      entry: resolve("src", "index.tsx"),
      fileName: "react-responsive-gallery",
      name: "ReactResponsiveGallery",
    },
    rollupOptions: {
      external: ["react", "react-dom", "styled-components"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "styled-components": "styled",
        },
      },
    },
  },
}));
