import { readFileSync, writeFileSync } from "node:fs";
import { defineConfig } from "vite";
import type { Plugin } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "node:path";
import { amuDocsApiPlugin } from "./vite.api-plugin";

function resolveDocsBase(command: string) {
  if (command !== "build") {
    return "/";
  }

  if (process.env.AMU_DOCS_BASE) {
    return process.env.AMU_DOCS_BASE;
  }

  const repository = process.env.GITHUB_REPOSITORY?.split("/")[1];
  return repository ? `/${repository}/` : "/amu-ui/";
}

function githubPagesSpaFallbackPlugin(): Plugin {
  return {
    name: "amu-docs-github-pages-fallback",
    writeBundle() {
      const outputDir = resolve(__dirname, "dist");
      const indexFile = resolve(outputDir, "index.html");
      const notFoundFile = resolve(outputDir, "404.html");

      writeFileSync(notFoundFile, readFileSync(indexFile, "utf-8"));
    },
  };
}

export default defineConfig(({ command }) => ({
  base: resolveDocsBase(command),
  build: {
    target: "esnext",
  },
  plugins: [vue(), vueJsx(), amuDocsApiPlugin(), githubPagesSpaFallbackPlugin()],
  resolve: {
    alias: [
      // docs 开发时直接指向源码，保证 HMR 与调试体验
      {
        find: "amu-ui/theme",
        replacement: resolve(__dirname, "../packages/theme/index.ts"),
      },
      {
        find: /^amu-ui\/(.*)$/,
        replacement: resolve(__dirname, "../packages/components/$1/index.ts"),
      },
      {
        find: /^amu-ui\/components\/(.*)$/,
        replacement: resolve(__dirname, "../packages/components/$1/index.ts"),
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
}));
