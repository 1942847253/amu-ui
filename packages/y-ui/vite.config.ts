import { defineConfig, Plugin_2, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from "vite-plugin-dts";
import vueJsx from "@vitejs/plugin-vue-jsx";

const rollupOptions = {
  external: ["vue"],
  output: {
    globals: {
      vue: "Vue",
    },
    assetFileNames: 'assets/[name].[ext]',
  },
};

export const config ={
  plugins: [
    vue(),
    vueJsx() as Plugin_2,
    dts({ insertTypesEntry: true, copyDtsFiles: false })
  ],
   build: {
    rollupOptions,
    minify: `terser`, // boolean | 'terser' | 'esbuild'
    sourcemap: true, // 输出单独 source文件
    brotliSize: true, // 生成压缩大小报告
    cssCodeSplit:true,
    assetsDir:'',
    lib: {
      entry: "./index.ts",
      name: "YUI",
      fileName: "index",
      formats: ["es"], // 导出模块类型
    },
    outDir: "./dist",
  },
  server: {
    fs: {
      strict: false,
      allow: [],
    },
}
}

export default defineConfig(config as UserConfig);
