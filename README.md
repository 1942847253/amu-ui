# amu-ui

基于 Vue 3 + TypeScript 的组件库仓库，包含组件库本体、文档站、演示沙盒，以及一套基于 amu-ui 的后台管理模板与配套服务端模板。

## 仓库组成

### 1. 组件库本体

- 目录：`packages/*`
- 内容：组件、图标、hooks、locale、theme、utils
- 目标：产出可发布的 `amu-ui`、`@amu-ui/icons`、`@amu-ui/hooks`、`@amu-ui/locale`

### 2. 文档与调试环境

- `docs`：组件文档站
- `playground`：本地组件调试沙盒

### 3. 后台管理模板

- `templates/amu-admin`：基于 `Vue 3 + Pinia + Vue Router + amu-ui` 的后台管理前端模板
- `templates/amu-admin-server`：基于 `NestJS + Prisma + MySQL` 的后台服务端模板

这两个模板当前默认作为本仓库内的示例与脚手架资源维护，前端模板直接依赖本仓库 workspace 中的 `amu-ui` 和 `@amu-ui/icons` 源码，不等同于已经完全独立发布的外部模板仓库。

## 快速开始

安装依赖：

```bash
pnpm install
```

启动组件沙盒：

```bash
pnpm dev
```

启动文档站：

```bash
pnpm docs:dev
```

构建组件库：

```bash
pnpm build
```

该命令会同时构建 `@amu-ui/icons`、`@amu-ui/hooks`、`@amu-ui/locale` 与主包 `amu-ui`，便于在仓库内验证“源码模式 / 包模式”两种模板依赖解析路径。

运行测试：

```bash
pnpm test
```

## 后台模板联调

启动服务端模板：

```bash
pnpm run admin-server:start
```

查看服务端日志：

```bash
pnpm run admin-server:logs
```

停止服务端模板：

```bash
pnpm run admin-server:stop
```

前端模板启动方式见 `templates/amu-admin/README.md`，服务端模板启动方式见 `templates/amu-admin-server/README.md`。

## 当前状态说明

- 组件库、前端模板、服务端模板均可独立构建
- 模板相关单测已纳入仓库统一 Vitest 流程
- 后台模板目前更适合作为本仓库生态示例和业务底座参考，而不是零依赖复制即可使用的通用脚手架

## License

本仓库使用 MIT License，详见 `LICENSE`。

## 发布检查

如果你准备发布 `amu-ui` 生态包，可先参考 `RELEASE_CHECKLIST.md`。这份清单覆盖推荐发包顺序、导出面检查、模板联动验证和发包后版本跟进。
