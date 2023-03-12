import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../packages/components"),
      "@components": path.resolve(__dirname, "../packages/components/src"),
    },
  },
  server:{
    port:8080
  },
  plugins: [vue(), vueJsx()],
});
