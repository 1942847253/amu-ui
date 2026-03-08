# amu-ui 发包前检查清单

这份清单用于在正式发布 `amu-ui` 生态包之前，统一检查版本、导出面、构建产物和模板联动，避免再次出现“源码里有组件，但 npm 上还是老版本”的问题。

## 适用范围

当前仓库涉及以下对外包：

- `@amu-ui/locale`
- `@amu-ui/hooks`
- `@amu-ui/icons`
- `amu-ui`

其中：

- `amu-ui` 依赖 `@amu-ui/hooks` 和 `@amu-ui/locale`
- `amu-admin-template` 依赖 `amu-ui` 和 `@amu-ui/icons`
- `@amu-ui/hooks` 依赖 `@amu-ui/locale`

## 当前已识别的问题

- npm 上现有 `amu-ui` 版本明显落后于当前仓库源码
- 已发布的 `amu-ui` 包导出面不完整，缺少大量模板实际使用到的组件子路径
- 这会直接导致 `amu-admin-template` 在包模式下解析失败，哪怕模板自身已经整理完成

## 推荐发包顺序

推荐顺序如下：

1. `@amu-ui/locale`
2. `@amu-ui/hooks`
3. `@amu-ui/icons`
4. `amu-ui`

原因：

- `@amu-ui/hooks` 依赖 `@amu-ui/locale`
- `amu-ui` 依赖 `@amu-ui/hooks` 和 `@amu-ui/locale`
- `@amu-ui/icons` 与主包发布解耦，但 `amu-admin-template` 要同时消费它和 `amu-ui`

## 版本策略建议

当前仓库版本基线：

- `@amu-ui/locale`: `0.1.0`
- `@amu-ui/hooks`: `0.1.0`
- `@amu-ui/icons`: `0.2.0`
- `amu-ui`: `2.1.2`

建议：

- 只要导出面、构建链路或模板可用性发生实质变化，这一轮不要只发主包
- 至少给上述 4 个包都发一个新版本
- 如果这次是“补齐大量组件导出、让模板首次真正可用”，建议按 `minor` 级别处理，而不是仅做 `patch`

## 发包前必须检查

### 1. 组件导出面

检查主包 `package.json.exports` 是否覆盖当前模板实际用到的全部子路径，例如：

- `./message`
- `./empty`
- `./layout`
- `./menu`
- `./table`
- `./tree`
- `./form`
- `./select`
- `./dropdown`
- `./drawer`
- `./tabs`
- `./switch`
- `./input`
- `./input-number`
- `./scrollbar`

同时确认这些导出对应的 `types`、`import`、`require` 路径都存在。

### 2. 构建产物完整性

在仓库根目录执行：

```bash
pnpm build
```

检查以下目录是否已生成且内容齐全：

- `dist/es`
- `dist/cjs`
- `dist/types`
- `packages/icons/dist`
- `packages/hooks/dist`
- `packages/locale/dist`

### 3. 类型入口完整性

重点确认：

- `dist/types/components/*/index.d.ts` 是否齐全
- `packages/icons/dist/types/index.d.ts` 是否齐全
- `packages/hooks/dist/types/index.d.ts` 是否包含模板使用到的导出，例如 `useZIndex`
- `packages/locale/dist/types/index.d.ts` 是否存在

### 4. 模板联动验证

在当前仓库内至少验证以下两条路径：

源码模式：

```bash
Remove-Item Env:VITE_USE_WORKSPACE_SOURCE -ErrorAction SilentlyContinue
pnpm --filter amu-admin-template test
pnpm --filter amu-admin-template build
```

包模式：

```bash
$env:VITE_USE_WORKSPACE_SOURCE='false'
pnpm --filter amu-admin-template build
```

如果包模式失败，优先检查主包和子包导出面，而不是先怀疑模板本身。

### 5. 依赖版本联动

检查以下依赖关系是否与即将发布的新版本一致：

- 根 `package.json` 中 `amu-ui` 对 `@amu-ui/hooks`、`@amu-ui/locale` 的依赖
- `packages/hooks/package.json` 中对 `@amu-ui/locale` 的依赖
- `templates/amu-admin/package.json` 中对 `amu-ui`、`@amu-ui/icons` 的依赖

额外必须检查：

- **对外发布的包清单里不能出现 `workspace:*`**。这项不能只看仓库源码里的 `package.json`，还要在发包后用 `npm view` 再确认一次 registry 上的最终 manifest。
- 至少确认以下结果：
	- `npm view amu-ui dependencies --json`
	- `npm view @amu-ui/hooks dependencies --json`
	- `npm view @amu-ui/icons dependencies --json`
- 如果 registry 上的主包依赖仍然是 `workspace:*`，仓库外 `pnpm install` 会直接失败。

如果你打算让模板立刻切到新版本，请在发包完成后同步更新：

- `templates/amu-admin/package.json`
- `templates/amu-admin/README.md`
- `templates/amu-admin/README.standalone.md`

## 推荐发包命令

### 分包逐个发布

先发 locale：

```bash
pnpm release:locale
```

再发 hooks：

```bash
pnpm release:hooks
```

再发 icons：

```bash
pnpm release:icons
```

最后发主包：

```bash
pnpm release
```

### 注意事项

- `pnpm release` 会先执行 `pnpm build`
- 根仓库 `release` 会递归 publish，所以在执行前要确认 private 包不会被误发
- 不要在未验证 `exports` 和模板联动前直接 bump 版本并发布

## 发包后必须做的事

### 1. 安装最新包回归验证

在 `templates/amu-admin` 中重新安装依赖后验证：

```bash
pnpm install
pnpm --filter amu-admin-template build
```

如果你要验证“模板是否真的可以脱离 monorepo 使用”，这一步还不够。

### 1.1 仓库外真实验证

必须额外做一次**仓库外**验证，而不是只在当前 workspace 内验证：

1. 把 `templates/amu-admin` 复制到一个不包含 `packages/*` 的临时目录
2. 复制时排除 `node_modules`、`dist`、`.git`
3. 在临时目录执行：

```bash
pnpm install
pnpm build
pnpm test
```

这一步可以直接暴露出以下问题：

- 已发布主包依赖里残留 `workspace:*`
- 模板 `vite.config.ts` 默认强制走 workspace alias，导致仓库外构建时去找不存在的 `../../packages/*`
- 模板 `vitest.config.ts` 仍强依赖 workspace alias
- 包模式测试时外部依赖中的 CSS 没有被 Vite 内联处理，导致测试在 Node 侧直接报错

只有这一步也通过，才能说明 `amu-admin-template` 在 npm 生态下真正可用。

### 2. 更新模板依赖范围

把 `templates/amu-admin/package.json` 中的：

- `amu-ui`
- `@amu-ui/icons`

同步改到新版本范围。

### 3. 更新文档

至少同步以下文档：

- `README.md`
- `templates/amu-admin/README.md`
- `templates/amu-admin/EXTRACTION_CHECKLIST.md`

### 4. 抽样验证 npm 包内容

建议至少在一个全新目录里做一次真实安装验证：

- 安装 `amu-ui`
- 安装 `@amu-ui/icons`
- 直接写一个最小 Vite + Vue 页面
- 验证按需引入和类型提示都正常

建议再补一条严格检查：

- 如果这轮修改涉及类型声明生成，至少做一次 `skipLibCheck=false` 的外部消费验证，避免出现“模板能用，但严格 TS 消费者会因为库声明报错”的情况。

## 最终发布判断标准

满足以下条件再认为这轮发包完成：

1. npm 上的 `amu-ui`、`@amu-ui/icons`、`@amu-ui/hooks`、`@amu-ui/locale` 都是本轮新版本
2. `npm view amu-ui dependencies --json` 等 registry 元数据中，不再出现 `workspace:*`
3. `amu-admin-template` 在源码模式和包模式下都能构建
4. `amu-admin-template` 在仓库外纯 npm 环境下可以完成 `install`、`build`、`test`
5. 模板不再因为“已发布包太旧”或“默认强依赖 workspace alias”而依赖额外兜底说明
6. README 中的依赖版本与 npm 实际版本一致