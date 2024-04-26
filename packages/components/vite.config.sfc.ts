import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import DefineOptions from "unplugin-vue-define-options/vite";
import vueJsx from "@vitejs/plugin-vue-jsx";

const path = require("path");
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      "@components": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    //打包文件目录
    outDir: "es",
    //压缩
    //minify: false,
    rollupOptions: {
      //忽略打包vue文件
      external: ["vue"],
      input: ["index.ts"],
      output: [
        {
          //打包格式
          format: 'esm',
          //打包后文件名
          entryFileNames: "[name].esm.js",
          //让打包目录和我们目录对应
          preserveModules: false,
          exports: "named",
          //配置打包根目录
          dir: "../../sfc-playground/public/amu-ui",
        }
      ],
    },
    lib: {
      entry: "./index.ts",
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    DefineOptions(),
    dts({
      entryRoot: "./src",
      outputDir: ["../amu-ui/es/src", "../amu-ui/lib/src"],
      //指定使用的tsconfig.json为我们整个项目根目录下,如果不配置,你也可以在components下新建tsconfig.json
      tsConfigFilePath: "../../tsconfig.json",
    }),
   
  ],
});
