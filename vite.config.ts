import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsConfigPaths from "vite-tsconfig-paths";
import libCss from "vite-plugin-libcss";
import eslint from "vite-plugin-eslint";

export default defineConfig((configEnv) => ({
  define: {
    global: {},
  },
  plugins: [
    eslint({
      failOnWarning: true,
    }),
    libCss(),
    react(),
    tsConfigPaths(),
    dts({
      outputDir: "dist/declarations",
      insertTypesEntry: true,
    }),
  ],
  build: {
    // sourcemap: true --> for dev debug,
    cssCodeSplit: true,
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
