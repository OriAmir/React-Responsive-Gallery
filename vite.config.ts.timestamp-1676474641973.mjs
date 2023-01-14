// vite.config.ts
import react from "file:///Users/oriamir/Documents/Gallery/React-Responsive-Gallery/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "node:path";
import { defineConfig } from "file:///Users/oriamir/Documents/Gallery/React-Responsive-Gallery/node_modules/vite/dist/node/index.js";
import dts from "file:///Users/oriamir/Documents/Gallery/React-Responsive-Gallery/node_modules/vite-plugin-dts/dist/index.mjs";
import tsConfigPaths from "file:///Users/oriamir/Documents/Gallery/React-Responsive-Gallery/node_modules/vite-tsconfig-paths/dist/index.mjs";
import cssInjectedByJsPlugin from "file:///Users/oriamir/Documents/Gallery/React-Responsive-Gallery/node_modules/vite-plugin-css-injected-by-js/dist/esm/index.js";
import eslint from "file:///Users/oriamir/Documents/Gallery/React-Responsive-Gallery/node_modules/vite-plugin-eslint/dist/index.mjs";
var vite_config_default = defineConfig((configEnv) => ({
  define: {
    global: {}
  },
  plugins: [
    eslint({
      failOnWarning: true
    }),
    react(),
    tsConfigPaths(),
    dts({
      include: ["src/*"],
      insertTypesEntry: true
    }),
    cssInjectedByJsPlugin()
  ],
  build: {
    // sourcemap: true --> for dev debug,
    lib: {
      entry: resolve("src", "index.tsx"),
      fileName: "react-responsive-gallery",
      name: "ReactResponsiveGallery"
    },
    rollupOptions: {
      external: ["react", "react-dom", "styled-components"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "styled-components": "styled"
        }
      }
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvb3JpYW1pci9Eb2N1bWVudHMvR2FsbGVyeS9SZWFjdC1SZXNwb25zaXZlLUdhbGxlcnlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9vcmlhbWlyL0RvY3VtZW50cy9HYWxsZXJ5L1JlYWN0LVJlc3BvbnNpdmUtR2FsbGVyeS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvb3JpYW1pci9Eb2N1bWVudHMvR2FsbGVyeS9SZWFjdC1SZXNwb25zaXZlLUdhbGxlcnkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCBkdHMgZnJvbSBcInZpdGUtcGx1Z2luLWR0c1wiO1xuaW1wb3J0IHRzQ29uZmlnUGF0aHMgZnJvbSBcInZpdGUtdHNjb25maWctcGF0aHNcIjtcbmltcG9ydCBjc3NJbmplY3RlZEJ5SnNQbHVnaW4gZnJvbSBcInZpdGUtcGx1Z2luLWNzcy1pbmplY3RlZC1ieS1qc1wiO1xuaW1wb3J0IGVzbGludCBmcm9tIFwidml0ZS1wbHVnaW4tZXNsaW50XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoY29uZmlnRW52KSA9PiAoe1xuICBkZWZpbmU6IHtcbiAgICBnbG9iYWw6IHt9LFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgZXNsaW50KHtcbiAgICAgIGZhaWxPbldhcm5pbmc6IHRydWUsXG4gICAgfSksXG4gICAgcmVhY3QoKSxcbiAgICB0c0NvbmZpZ1BhdGhzKCksXG4gICAgZHRzKHtcbiAgICAgIGluY2x1ZGU6IFtcInNyYy8qXCJdLFxuICAgICAgaW5zZXJ0VHlwZXNFbnRyeTogdHJ1ZSxcbiAgICB9KSxcbiAgICBjc3NJbmplY3RlZEJ5SnNQbHVnaW4oKSxcbiAgXSxcbiAgYnVpbGQ6IHtcbiAgICAvLyBzb3VyY2VtYXA6IHRydWUgLS0+IGZvciBkZXYgZGVidWcsXG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogcmVzb2x2ZShcInNyY1wiLCBcImluZGV4LnRzeFwiKSxcbiAgICAgIGZpbGVOYW1lOiBcInJlYWN0LXJlc3BvbnNpdmUtZ2FsbGVyeVwiLFxuICAgICAgbmFtZTogXCJSZWFjdFJlc3BvbnNpdmVHYWxsZXJ5XCIsXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogW1wicmVhY3RcIiwgXCJyZWFjdC1kb21cIiwgXCJzdHlsZWQtY29tcG9uZW50c1wiXSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgcmVhY3Q6IFwiUmVhY3RcIixcbiAgICAgICAgICBcInJlYWN0LWRvbVwiOiBcIlJlYWN0RE9NXCIsXG4gICAgICAgICAgXCJzdHlsZWQtY29tcG9uZW50c1wiOiBcInN0eWxlZFwiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSkpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2VixPQUFPLFdBQVc7QUFDL1csU0FBUyxlQUFlO0FBQ3hCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLG1CQUFtQjtBQUMxQixPQUFPLDJCQUEyQjtBQUNsQyxPQUFPLFlBQVk7QUFFbkIsSUFBTyxzQkFBUSxhQUFhLENBQUMsZUFBZTtBQUFBLEVBQzFDLFFBQVE7QUFBQSxJQUNOLFFBQVEsQ0FBQztBQUFBLEVBQ1g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLGVBQWU7QUFBQSxJQUNqQixDQUFDO0FBQUEsSUFDRCxNQUFNO0FBQUEsSUFDTixjQUFjO0FBQUEsSUFDZCxJQUFJO0FBQUEsTUFDRixTQUFTLENBQUMsT0FBTztBQUFBLE1BQ2pCLGtCQUFrQjtBQUFBLElBQ3BCLENBQUM7QUFBQSxJQUNELHNCQUFzQjtBQUFBLEVBQ3hCO0FBQUEsRUFDQSxPQUFPO0FBQUE7QUFBQSxJQUVMLEtBQUs7QUFBQSxNQUNILE9BQU8sUUFBUSxPQUFPLFdBQVc7QUFBQSxNQUNqQyxVQUFVO0FBQUEsTUFDVixNQUFNO0FBQUEsSUFDUjtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLFNBQVMsYUFBYSxtQkFBbUI7QUFBQSxNQUNwRCxRQUFRO0FBQUEsUUFDTixTQUFTO0FBQUEsVUFDUCxPQUFPO0FBQUEsVUFDUCxhQUFhO0FBQUEsVUFDYixxQkFBcUI7QUFBQSxRQUN2QjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLEVBQUU7IiwKICAibmFtZXMiOiBbXQp9Cg==
