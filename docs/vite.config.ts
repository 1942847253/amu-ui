import { cpSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { defineConfig } from "vite";
import type { Plugin } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { extname, resolve } from "node:path";
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

function getMimeType(filePath: string) {
  const extension = extname(filePath).toLowerCase();

  if (extension === ".html") return "text/html; charset=utf-8";
  if (extension === ".js") return "text/javascript; charset=utf-8";
  if (extension === ".css") return "text/css; charset=utf-8";
  if (extension === ".json") return "application/json; charset=utf-8";
  if (extension === ".svg") return "image/svg+xml";
  if (extension === ".mjs") return "text/javascript; charset=utf-8";

  return "application/octet-stream";
}

function sfcPlaygroundBridgePlugin(): Plugin {
  const routeBase = "/sfc-playground";
  const playgroundDistDir = resolve(__dirname, "../sfc-playground/dist");

  return {
    name: "amu-docs-sfc-playground-bridge",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const requestUrl = req.url?.split("?")[0] ?? "";
        if (!requestUrl.startsWith(routeBase)) {
          next();
          return;
        }

        if (!existsSync(playgroundDistDir)) {
          res.statusCode = 503;
          res.setHeader("Content-Type", "text/plain; charset=utf-8");
          res.end("sfc-playground 尚未构建，请先执行 pnpm run docs:dev 或 pnpm run sfc-playground:build。");
          return;
        }

        const relativePath = requestUrl.slice(routeBase.length).replace(/^\/+/, "");
        const targetPath = relativePath ? resolve(playgroundDistDir, relativePath) : resolve(playgroundDistDir, "index.html");

        if (targetPath.startsWith(playgroundDistDir) && existsSync(targetPath)) {
          res.statusCode = 200;
          res.setHeader("Content-Type", getMimeType(targetPath));
          res.end(readFileSync(targetPath));
          return;
        }

        const indexPath = resolve(playgroundDistDir, "index.html");
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.end(readFileSync(indexPath, "utf-8"));
      });
    },
    writeBundle() {
      if (!existsSync(playgroundDistDir)) {
        throw new Error("缺少 sfc-playground/dist，请先执行 pnpm run sfc-playground:build。");
      }

      const docsOutputDir = resolve(__dirname, "dist/sfc-playground");
      cpSync(playgroundDistDir, docsOutputDir, { recursive: true, force: true });
    },
  };
}

export default defineConfig(({ command }) => ({
  base: resolveDocsBase(command),
  build: {
    target: "esnext",
  },
  plugins: [
    vue(),
    vueJsx(),
    amuDocsApiPlugin(),
    sfcPlaygroundBridgePlugin(),
    githubPagesSpaFallbackPlugin(),
  ],
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
