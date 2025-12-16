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
        find: "am-ui/theme",
        replacement: resolve(__dirname, "../packages/theme/index.ts"),
      },
      {
        find: "am-ui/button",
        replacement: resolve(
          __dirname,
          "../packages/components/button/index.ts",
        ),
      },
      {
        find: "am-ui/components/button",
        replacement: resolve(
          __dirname,
          "../packages/components/button/index.ts",
        ),
      },
      {
        find: "am-ui",
        replacement: resolve(__dirname, "../packages/components/index.ts"),
      },
    ],
  },
  server: {
    port: 5175,
    strictPort: false,
  },
});
