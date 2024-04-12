import { defineConfig } from "vite";
import { SearchPlugin } from 'vitepress-plugin-search';
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";


//default options
const options = {
  previewLength: 62,
  buttonLabel: "搜索内容",
  placeholder: "Search docs",
  allow: [],
  ignore: [],
};
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../../packages/components"),
      "@components": path.resolve(__dirname, "../../packages/components/src"),
    },
  },
  plugins: [vueJsx()],
});
