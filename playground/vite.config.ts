import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      // 先匹配更具体的子路径，避免被 'amu-ui' 前缀吞掉
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
      // HMR 直接指向源码，开发体验更好
      {
        find: "amu-ui",
        replacement: resolve(__dirname, "../packages/components/index.ts"),
      },
    ],
  },
});
