import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";
import { amuDocsApiPlugin } from "./vite.api-plugin";

export default defineConfig({
  plugins: [vue(), amuDocsApiPlugin()],
  resolve: {
    alias: [
      // docs 开发时直接指向源码，保证 HMR 与调试体验
      {
        find: "amu-ui/theme",
        replacement: resolve(__dirname, "../packages/theme/index.ts"),
      },
      {
        find: "amu-ui/button",
        replacement: resolve(
          __dirname,
          "../packages/components/button/index.ts",
        ),
      },
      {
        find: "amu-ui/components/button",
        replacement: resolve(
          __dirname,
          "../packages/components/button/index.ts",
        ),
      },
      {
        find: "amu-ui",
        replacement: resolve(__dirname, "../packages/components/index.ts"),
      },
      {
        find: "@amu-ui/utils",
        replacement: resolve(__dirname, "../packages/utils/index.ts"),
      },
      {
        find: "@amu-ui/icons",
        replacement: resolve(__dirname, "../packages/icons/src/index.ts"),
      },
      {
        find: "@amu-ui/hooks",
        replacement: resolve(__dirname, "../packages/hooks/index.ts"),
      },
      {
        find: "@amu-ui/locale",
        replacement: resolve(__dirname, "../packages/locale/index.ts"),
      },
    ],
  },
  server: {
    port: 5175,
    strictPort: false,
  },
});
