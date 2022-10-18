import { defineConfig, Plugin_2 } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  plugins: [vue(), vueJsx() as Plugin_2],
  server:{
    port:8080
  }
});
