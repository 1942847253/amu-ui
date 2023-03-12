import { defineConfig } from "vite";

import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../../packages/components"),
      "@components": path.resolve(__dirname, "../../packages/components/src"),
    },
  },
  plugins: [vueJsx()],
});
