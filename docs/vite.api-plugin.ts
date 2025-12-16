import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import type { Plugin } from "vite";

type PropRow = {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description?: string;
};

type ApiMeta = {
  components: Record<string, { props: PropRow[] }>;
};

type NavItem = {
  name: string;
  title: string;
  route: string;
};

type NavMeta = {
  components: NavItem[];
};

const API_VIRTUAL_ID = "virtual:amu-docs-api";
const API_RESOLVED_ID = "\0" + API_VIRTUAL_ID;

const NAV_VIRTUAL_ID = "virtual:amu-docs-nav";
const NAV_RESOLVED_ID = "\0" + NAV_VIRTUAL_ID;

function findRepoRoot(startDir: string) {
  let dir = startDir;
  for (let i = 0; i < 8; i++) {
    const hasWorkspace = fs.existsSync(path.join(dir, "pnpm-workspace.yaml"));
    const hasPackages = fs.existsSync(path.join(dir, "packages", "components"));
    if (hasWorkspace || hasPackages) return dir;

    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return startDir;
}

function walk(dir: string, match: (p: string) => boolean, out: string[] = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      walk(full, match, out);
    } else if (ent.isFile() && match(full)) {
      out.push(full);
    }
  }
  return out;
}

function toDefaultString(node: ts.Expression | undefined): string | undefined {
  if (!node) return undefined;
  if (ts.isStringLiteral(node)) return JSON.stringify(node.text);
  if (ts.isNumericLiteral(node)) return String(node.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return "true";
  if (node.kind === ts.SyntaxKind.FalseKeyword) return "false";
  if (ts.isArrowFunction(node) || ts.isFunctionExpression(node))
    return "() => ...";
  return undefined;
}

function primitiveFromCtor(expr: ts.Expression): string | undefined {
  if (ts.isIdentifier(expr)) {
    if (expr.text === "String") return "string";
    if (expr.text === "Number") return "number";
    if (expr.text === "Boolean") return "boolean";
    if (expr.text === "Array") return "any[]";
    if (expr.text === "Object") return "Record<string, any>";
  }
  return undefined;
}

function collectApiMeta(rootDir: string): ApiMeta {
  const componentsRoot = path.resolve(rootDir, "packages/components");
  const propFiles = fs.existsSync(componentsRoot)
    ? walk(componentsRoot, (p) => p.endsWith(path.join("src", "props.ts")))
    : [];

  const compilerOptions: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    strict: true,
    skipLibCheck: true,
    types: [],
  };

  const host = ts.createCompilerHost(compilerOptions, true);
  const program = ts.createProgram(propFiles, compilerOptions, host);
  const checker = program.getTypeChecker();

  const meta: ApiMeta = { components: {} };

  for (const filePath of propFiles) {
    const sf = program.getSourceFile(filePath);
    if (!sf) continue;

    const rel = filePath.split(path.sep);
    const idx = rel.lastIndexOf("components");
    const compName =
      idx >= 0 && rel[idx + 1]
        ? rel[idx + 1]
        : path.basename(path.dirname(path.dirname(filePath)));

    let rows: PropRow[] = [];

    sf.forEachChild((node) => {
      if (!ts.isVariableStatement(node)) return;
      if (!node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword))
        return;

      for (const decl of node.declarationList.declarations) {
        if (!ts.isIdentifier(decl.name)) continue;
        if (!decl.name.text.endsWith("Props")) continue;

        let init = decl.initializer;
        if (!init) continue;

        if (ts.isAsExpression(init) || ts.isSatisfiesExpression(init)) {
          init = init.expression;
        }

        if (!ts.isObjectLiteralExpression(init)) continue;

        rows = init.properties
          .filter((p): p is ts.PropertyAssignment => ts.isPropertyAssignment(p))
          .map((p) => {
            const propName = ts.isIdentifier(p.name)
              ? p.name.text
              : ts.isStringLiteral(p.name)
                ? p.name.text
                : "";

            const desc = p.initializer;
            let required = false;
            let typeText = "any";
            let defaultText: string | undefined;
            const description = ((p as any).jsDoc?.[0]?.comment ?? "").trim();

            if (ts.isObjectLiteralExpression(desc)) {
              for (const dp of desc.properties) {
                if (!ts.isPropertyAssignment(dp)) continue;
                const key = ts.isIdentifier(dp.name)
                  ? dp.name.text
                  : ts.isStringLiteral(dp.name)
                    ? dp.name.text
                    : "";

                if (key === "required") {
                  required = dp.initializer.kind === ts.SyntaxKind.TrueKeyword;
                }

                if (key === "default") {
                  defaultText = toDefaultString(dp.initializer);
                }

                if (key === "type") {
                  const initExpr = dp.initializer;
                  if (
                    ts.isAsExpression(initExpr) ||
                    ts.isSatisfiesExpression(initExpr)
                  ) {
                    const typeNode = initExpr.type;
                    if (
                      ts.isTypeReferenceNode(typeNode) &&
                      typeNode.typeArguments?.length
                    ) {
                      const arg = typeNode.typeArguments[0];
                      const t = checker.getTypeFromTypeNode(arg);
                      typeText = checker.typeToString(
                        t,
                        undefined,
                        ts.TypeFormatFlags.NoTruncation,
                      );
                    } else {
                      typeText =
                        primitiveFromCtor(initExpr.expression) ?? "any";
                    }
                  } else {
                    typeText = primitiveFromCtor(initExpr) ?? "any";
                  }
                }
              }
            }

            return {
              name: propName,
              type: typeText,
              required,
              ...(defaultText ? { default: defaultText } : {}),
              ...(description ? { description } : {}),
            };
          });
      }
    });

    meta.components[compName] = { props: rows };
  }

  return meta;
}

function pascalCase(name: string) {
  return name
    .split(/[-_\s]+/g)
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}

function collectNavMeta(rootDir: string): NavMeta {
  const componentsRoot = path.resolve(rootDir, "packages/components");
  if (!fs.existsSync(componentsRoot)) return { components: [] };

  const components: NavItem[] = [];
  for (const ent of fs.readdirSync(componentsRoot, { withFileTypes: true })) {
    if (!ent.isDirectory()) continue;
    if (ent.name.startsWith(".")) continue;

    const dir = path.join(componentsRoot, ent.name);
    const entry = path.join(dir, "index.ts");
    if (!fs.existsSync(entry)) continue;

    components.push({
      name: ent.name,
      title: pascalCase(ent.name),
      route: `/components/${ent.name}`,
    });
  }

  components.sort((a, b) => a.title.localeCompare(b.title));
  return { components };
}

export function amuDocsApiPlugin(): Plugin {
  const rootDir = findRepoRoot(process.cwd());
  const getApiCode = () =>
    `export default ${JSON.stringify(collectApiMeta(rootDir), null, 2)};`;
  const getNavCode = () =>
    `export default ${JSON.stringify(collectNavMeta(rootDir), null, 2)};`;

  return {
    name: "amu-docs-api",
    resolveId(id) {
      if (id === API_VIRTUAL_ID) return API_RESOLVED_ID;
      if (id === NAV_VIRTUAL_ID) return NAV_RESOLVED_ID;
    },
    load(id) {
      if (id === API_RESOLVED_ID) return getApiCode();
      if (id === NAV_RESOLVED_ID) return getNavCode();
    },
    configureServer(server) {
      const componentsRoot = path.resolve(rootDir, "packages/components");
      if (!fs.existsSync(componentsRoot)) return;

      const watchFiles = walk(componentsRoot, (p) =>
        p.endsWith(path.join("src", "props.ts")),
      );
      watchFiles.forEach((f) => server.watcher.add(f));

      server.watcher.add(componentsRoot);

      server.watcher.on("change", (file) => {
        if (!file.endsWith(path.join("src", "props.ts"))) return;
        const mod = server.moduleGraph.getModuleById(API_RESOLVED_ID);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: "full-reload" });
      });

      server.watcher.on("addDir", (dir) => {
        if (!dir.startsWith(componentsRoot)) return;
        const mod = server.moduleGraph.getModuleById(NAV_RESOLVED_ID);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: "full-reload" });
      });

      server.watcher.on("unlinkDir", (dir) => {
        if (!dir.startsWith(componentsRoot)) return;
        const mod = server.moduleGraph.getModuleById(NAV_RESOLVED_ID);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: "full-reload" });
      });
    },
  };
}
