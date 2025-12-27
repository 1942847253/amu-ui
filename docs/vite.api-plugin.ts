import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import type { Plugin } from "vite";

type LocalizedDesc = string | Record<string, string>;

type PropRow = {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description?: LocalizedDesc;
};

type EventRow = {
  name: string;
  description?: LocalizedDesc;
  parameters?: string;
};

type SlotRow = {
  name: string;
  description?: LocalizedDesc;
};

type ApiMeta = {
  components: Record<string, Record<string, { props: PropRow[]; events: EventRow[]; slots: SlotRow[] }>>;
};

type NavItem = {
  name: string;
  title: string;
  route: string;
  label?: string;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

type NavMeta = {
  groups: NavGroup[];
};

const API_VIRTUAL_ID = "virtual:amu-docs-api";
const API_RESOLVED_ID = "\0" + API_VIRTUAL_ID;

const NAV_VIRTUAL_ID = "virtual:amu-docs-nav";
const NAV_RESOLVED_ID = "\0" + NAV_VIRTUAL_ID;

const SEARCH_INDEX_VIRTUAL_ID = "virtual:amu-docs-search-index";
const SEARCH_INDEX_RESOLVED_ID = "\0" + SEARCH_INDEX_VIRTUAL_ID;

type NavConfig = {
  hiddenComponents?: string[];
  labels?: Record<string, string>;
  groups?: { key: string; items: string[] }[];
};

function readNavConfig(rootDir: string): NavConfig {
  const configPath = path.resolve(rootDir, "docs/nav.config.json");
  if (!fs.existsSync(configPath)) return {};
  try {
    const raw = fs.readFileSync(configPath, "utf8");
    const parsed = JSON.parse(raw) as NavConfig;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

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
  if (ts.isArrayLiteralExpression(expr)) {
    return expr.elements
      .map((e) => primitiveFromCtor(e))
      .filter((t) => t)
      .join(" | ");
  }
  return undefined;
}

function parseDescription(node: any): LocalizedDesc | undefined {
  const jsDoc = node.jsDoc?.[0];
  if (!jsDoc) return undefined;

  let mainComment = (jsDoc.comment ?? "").trim();
  const tags = jsDoc.tags ?? [];
  
  let en = "";
  for (const tag of tags) {
    const tagName = tag.tagName.escapedText;
    if (tagName === "en" || tagName === "en-US") {
      en = (tag.comment ?? "").trim();
    } else if (tagName === "description") {
      const desc = (tag.comment ?? "").trim();
      if (desc && !mainComment) {
        mainComment = desc;
      }
    }
  }

  if (en) {
    return {
      "zh-CN": mainComment,
      "en-US": en
    };
  }
  
  return mainComment;
}

function collectApiMeta(rootDir: string): ApiMeta {
  const componentsRoot = path.resolve(rootDir, "packages/components");
  const iconsRoot = path.resolve(rootDir, "packages/icons");
  
  const propFiles = fs.existsSync(componentsRoot)
    ? walk(componentsRoot, (p) => p.endsWith(path.join("src", "props.ts")))
    : [];

  if (fs.existsSync(iconsRoot)) {
    const iconProps = path.join(iconsRoot, "src", "props.ts");
    if (fs.existsSync(iconProps)) {
      propFiles.push(iconProps);
    }
  }

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

    const subComponents: Record<string, { props: PropRow[]; events: EventRow[]; slots: SlotRow[] }> = {};
    
    const getSub = (name: string) => {
      if (!subComponents[name]) {
        subComponents[name] = { props: [], events: [], slots: [] };
      }
      return subComponents[name];
    };

    sf.forEachChild((node) => {
      if (!ts.isVariableStatement(node)) return;
      if (!node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword))
        return;

      for (const decl of node.declarationList.declarations) {
        if (!ts.isIdentifier(decl.name)) continue;
        
        // Parse Props
        if (decl.name.text.endsWith("Props")) {
          const rawName = decl.name.text.replace(/Props$/, "");
          const subName = pascalCase(rawName);
          const target = getSub(subName);

          let init = decl.initializer;
          if (!init) continue;

          if (ts.isAsExpression(init) || ts.isSatisfiesExpression(init)) {
            init = init.expression;
          }

          if (!ts.isObjectLiteralExpression(init)) continue;

          const newRows = init.properties
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
              const description = parseDescription(p);

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
          target.props.push(...newRows);
        }

        // Parse Emits
        if (decl.name.text.endsWith("Emits")) {
          const rawName = decl.name.text.replace(/Emits$/, "");
          const subName = pascalCase(rawName);
          const target = getSub(subName);

          let init = decl.initializer;
          if (!init) continue;

          if (ts.isAsExpression(init) || ts.isSatisfiesExpression(init)) {
            init = init.expression;
          }

          if (!ts.isObjectLiteralExpression(init)) continue;

          const newRows = init.properties
            .filter((p): p is ts.PropertyAssignment => ts.isPropertyAssignment(p))
            .map((p) => {
              const eventName = ts.isIdentifier(p.name)
                ? p.name.text
                : ts.isStringLiteral(p.name)
                  ? p.name.text
                  : "";

              const description = parseDescription(p);
              
              let parameters = "";
              const init = p.initializer;
              if (ts.isArrowFunction(init) || ts.isFunctionExpression(init)) {
                parameters = init.parameters.map(param => {
                  const paramName = ts.isIdentifier(param.name) ? param.name.text : "";
                  let paramType = "any";
                  if (param.type) {
                    paramType = param.type.getText(sf);
                  }
                  return `${paramName}: ${paramType}`;
                }).join(", ");
              }

              return {
                name: eventName,
                parameters,
                ...(description ? { description } : {}),
              };
            });
          target.events.push(...newRows);
        }

        // Parse Slots
        if (decl.name.text.endsWith("Slots")) {
          const rawName = decl.name.text.replace(/Slots$/, "");
          const subName = pascalCase(rawName);
          const target = getSub(subName);

          let init = decl.initializer;
          if (!init) continue;

          if (ts.isAsExpression(init) || ts.isSatisfiesExpression(init)) {
            init = init.expression;
          }

          if (!ts.isObjectLiteralExpression(init)) continue;

          const newRows = init.properties
            .filter((p): p is ts.PropertyAssignment => ts.isPropertyAssignment(p))
            .map((p) => {
              const slotName = ts.isIdentifier(p.name)
                ? p.name.text
                : ts.isStringLiteral(p.name)
                  ? p.name.text
                  : "";

              const description = parseDescription(p);

              return {
                name: slotName,
                ...(description ? { description } : {}),
              };
            });
          target.slots.push(...newRows);
        }
      }
    });

    meta.components[compName] = subComponents;
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
  const componentsMap = new Map<string, NavItem>();
  const navConfig = readNavConfig(rootDir);
  const hiddenComponents = new Set<string>(navConfig.hiddenComponents ?? []);
  const labels = navConfig.labels ?? {};
  
  // Scan components
  const componentsRoot = path.resolve(rootDir, "packages/components");
  if (fs.existsSync(componentsRoot)) {
    for (const ent of fs.readdirSync(componentsRoot, { withFileTypes: true })) {
      if (!ent.isDirectory()) continue;
      if (ent.name.startsWith(".")) continue;
      if (hiddenComponents.has(ent.name)) continue;
      // Skip icon component as it's handled by packages/icons
      if (ent.name === "icon") continue;

      const dir = path.join(componentsRoot, ent.name);
      const entry = path.join(dir, "index.ts");
      if (!fs.existsSync(entry)) continue;

      const label = labels[ent.name];
      componentsMap.set(ent.name, {
        name: ent.name,
        title: pascalCase(ent.name),
        route: `/components/${ent.name}`,
        label,
      });
    }
  }

  // Add icons if exists
  const iconsRoot = path.resolve(rootDir, "packages/icons");
  if (fs.existsSync(iconsRoot)) {
    const label = labels["icon"];
    componentsMap.set("icon", {
      name: "icon",
      title: "Icon",
      route: "/components/icon",
      label,
    });
  }

  const groups: NavGroup[] = [];
  
  if (navConfig.groups) {
    for (const groupConfig of navConfig.groups) {
      const items: NavItem[] = [];
      for (const compName of groupConfig.items) {
        const item = componentsMap.get(compName);
        if (item) {
          items.push(item);
          componentsMap.delete(compName);
        }
      }
      if (items.length > 0) {
        groups.push({
          title: groupConfig.key,
          items,
        });
      }
    }
  }

  // Handle remaining components
  if (componentsMap.size > 0) {
    const remainingItems = Array.from(componentsMap.values());
    remainingItems.sort((a, b) => a.title.localeCompare(b.title));
    groups.push({
      title: "components",
      items: remainingItems,
    });
  }

  return { groups };
}

type SearchItem = {
  title: string;
  titleZh?: string;
  route: string;
  category: string;
  keywords?: string[];
};

function collectSearchIndex(rootDir: string): SearchItem[] {
  const navMeta = collectNavMeta(rootDir);
  const items: SearchItem[] = [];

  // Add Guide pages
  items.push({
    title: "Quick Start",
    titleZh: "快速开始",
    route: "/guide/quick-start",
    category: "Guide",
    keywords: ["install", "setup", "usage", "安装", "使用"]
  });
  
  items.push({
    title: "Internationalization",
    titleZh: "国际化",
    route: "/guide/i18n",
    category: "Guide",
    keywords: ["locale", "language", "i18n", "语言"]
  });

  // Add Components
  for (const group of navMeta.groups) {
    for (const item of group.items) {
      items.push({
        title: item.title,
        titleZh: item.label,
        route: item.route,
        category: "Component",
        keywords: [item.name, item.label || ""].filter(Boolean),
      });
    }
  }

  return items;
}

export function amuDocsApiPlugin(): Plugin {
  const rootDir = findRepoRoot(process.cwd());
  const getApiCode = () =>
    `export default ${JSON.stringify(collectApiMeta(rootDir), null, 2)};`;
  const getNavCode = () =>
    `export default ${JSON.stringify(collectNavMeta(rootDir), null, 2)};`;
  const getSearchIndexCode = () =>
    `export default ${JSON.stringify(collectSearchIndex(rootDir), null, 2)};`;

  return {
    name: "amu-docs-api",
    resolveId(id) {
      if (id === API_VIRTUAL_ID) return API_RESOLVED_ID;
      if (id === NAV_VIRTUAL_ID) return NAV_RESOLVED_ID;
      if (id === SEARCH_INDEX_VIRTUAL_ID) return SEARCH_INDEX_RESOLVED_ID;
    },
    load(id) {
      if (id === API_RESOLVED_ID) return getApiCode();
      if (id === NAV_RESOLVED_ID) return getNavCode();
      if (id === SEARCH_INDEX_RESOLVED_ID) return getSearchIndexCode();
    },
    configureServer(server) {
      const componentsRoot = path.resolve(rootDir, "packages/components");
      const iconsRoot = path.resolve(rootDir, "packages/icons");
      const navConfigPath = path.resolve(rootDir, "docs/nav.config.json");
      
      if (fs.existsSync(componentsRoot)) {
        const watchFiles = walk(componentsRoot, (p) =>
          p.endsWith(path.join("src", "props.ts")),
        );
        watchFiles.forEach((f) => server.watcher.add(f));
        server.watcher.add(componentsRoot);
      }

      if (fs.existsSync(navConfigPath)) {
        server.watcher.add(navConfigPath);
      }

      if (fs.existsSync(iconsRoot)) {
        const iconProps = path.join(iconsRoot, "src", "props.ts");
        if (fs.existsSync(iconProps)) {
          server.watcher.add(iconProps);
        }
      }

      server.watcher.on("change", (file) => {
        if (file === navConfigPath) {
          const navMod = server.moduleGraph.getModuleById(NAV_RESOLVED_ID);
          if (navMod) server.moduleGraph.invalidateModule(navMod);
          const searchMod = server.moduleGraph.getModuleById(SEARCH_INDEX_RESOLVED_ID);
          if (searchMod) server.moduleGraph.invalidateModule(searchMod);
          server.ws.send({ type: "full-reload" });
          return;
        }

        if (!file.endsWith(path.join("src", "props.ts"))) return;
        const apiMod = server.moduleGraph.getModuleById(API_RESOLVED_ID);
        if (apiMod) server.moduleGraph.invalidateModule(apiMod);
        server.ws.send({ type: "full-reload" });
      });

      server.watcher.on("addDir", (dir) => {
        if (!dir.startsWith(componentsRoot)) return;
        const mod = server.moduleGraph.getModuleById(NAV_RESOLVED_ID);
        if (mod) server.moduleGraph.invalidateModule(mod);
        const searchMod = server.moduleGraph.getModuleById(SEARCH_INDEX_RESOLVED_ID);
        if (searchMod) server.moduleGraph.invalidateModule(searchMod);
        server.ws.send({ type: "full-reload" });
      });

      server.watcher.on("unlinkDir", (dir) => {
        if (!dir.startsWith(componentsRoot)) return;
        const mod = server.moduleGraph.getModuleById(NAV_RESOLVED_ID);
        if (mod) server.moduleGraph.invalidateModule(mod);
        const searchMod = server.moduleGraph.getModuleById(SEARCH_INDEX_RESOLVED_ID);
        if (searchMod) server.moduleGraph.invalidateModule(searchMod);
        server.ws.send({ type: "full-reload" });
      });
    },
  };
}
