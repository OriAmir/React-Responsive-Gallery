import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsConfigPaths from "vite-tsconfig-paths";
import eslint from "vite-plugin-eslint";
import libCss from "vite-plugin-libcss";

export default defineConfig(() => ({
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
      outDir: "dist/declarations",
      insertTypesEntry: true,
    }),
    libCss(),
  ],
  build: {
    cssCodeSplit: true,
    sourcemap: true, // --> for dev debug,
    lib: {
      formats: ["es"],
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
