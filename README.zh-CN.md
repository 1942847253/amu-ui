<p align="right">
	<a href="./README.md">English</a> | <a href="./README.zh-CN.md">简体中文</a>
</p>

<p align="center">
	<img src="./assets/amu-ui-logo.svg" alt="amu-ui logo" width="720" />
</p>

<p align="center">
	为 Vue 3 中后台与业务系统打造的组件库与 UI 基础设施
</p>

<p align="center">
	<a href="https://github.com/1942847253/amu-ui/blob/main/LICENSE">
		<img src="https://img.shields.io/npm/l/amu-ui.svg?sanitize=true" alt="License">
	</a>
	<a href="https://www.npmjs.com/package/amu-ui">
		<img src="https://img.shields.io/npm/v/amu-ui.svg?sanitize=true" alt="Version">
	</a>
	<a href="https://www.npmjs.com/package/amu-ui">
		<img src="https://img.shields.io/npm/dm/amu-ui" alt="Downloads">
	</a>
	<a href="https://github.com/1942847253/amu-ui/stargazers">
		<img src="https://img.shields.io/github/stars/1942847253/amu-ui?style=flat" alt="Stars">
	</a>
	<a href="https://github.com/1942847253/amu-ui/issues">
		<img src="https://img.shields.io/github/issues/1942847253/amu-ui?style=flat" alt="Issues">
	</a>
	<a href="https://1942847253.github.io/amu-ui/">
		<img src="https://img.shields.io/badge/docs-online-2563eb?style=flat" alt="Docs">
	</a>
</p>

<p align="center">
	<a href="#特性亮点">特性亮点</a> ·
	<a href="#包生态">包生态</a> ·
	<a href="#快速开始">快速开始</a> ·
	<a href="#开发工作流">开发工作流</a> ·
	<a href="#后台模板联调">后台模板</a> ·
	<a href="./templates/amu-admin/README.md">前端模板 README</a> ·
	<a href="./templates/amu-admin-server/README.md">服务端模板 README</a>
</p>

`amu-ui` 不只是单一组件包，而是一套围绕组件、图标、主题、国际化、文档站、调试沙盒，以及后台前后端模板构建起来的完整工作台。

## 特性亮点

- 基于 Vue 3 + TypeScript，采用严格类型约束与现代化构建链路
- 内置 45+ 常用业务组件，覆盖表单、数据展示、反馈、布局、导航等高频场景
- 同时支持全量注册与按需引入，兼顾开发效率与产物体积
- 主包输出 ESM / CJS / DTS，适配现代工程与传统构建环境
- 主题系统基于 CSS Variables，支持暗黑模式与语义化设计令牌
- 组件文档站与 Demo 系统内建 API 自动解析能力，降低维护成本
- 图标、hooks、locale 独立拆包，便于生态复用与版本管理
- 附带后台管理前端模板与 NestJS 服务端模板，方便联调与业务落地

## 包生态

| 包名 | 说明 |
| --- | --- |
| `amu-ui` | 主组件库，提供组件本体、主题入口与 locale 转导 |
| `@amu-ui/icons` | 独立图标包，支持全量注册与按需引入 |
| `@amu-ui/hooks` | 可复用 hooks 子包 |
| `@amu-ui/locale` | 语言包与国际化类型定义 |

## 快速开始

安装依赖：

```bash
pnpm install
```

### 全量注册

```ts
import { createApp } from 'vue'
import App from './App.vue'
import AmuUI from 'amu-ui'
import 'amu-ui/theme'

createApp(App).use(AmuUI).mount('#app')
```

### 按需引入

```vue
<script setup lang="ts">
import { AmuButton } from 'amu-ui/button'
</script>

<template>
	<AmuButton type="primary">主要按钮</AmuButton>
</template>
```

### 本地开发

启动组件调试沙盒：

```bash
pnpm dev
```

启动文档站：

```bash
pnpm docs:dev
```

构建整个组件生态：

```bash
pnpm build
```

该命令会依次构建 `@amu-ui/icons`、`@amu-ui/hooks`、`@amu-ui/locale`，随后自动生成主包导出并构建 `amu-ui` 本体。

运行测试：

```bash
pnpm test
```

## 开发工作流

| 命令 | 说明 |
| --- | --- |
| `pnpm dev` | 启动 playground，本地调试组件交互 |
| `pnpm docs:dev` | 启动文档站 |
| `pnpm build` | 构建 icons、hooks、locale 与主包 |
| `pnpm build:lib` | 仅构建主组件库 |
| `pnpm type:check` | 运行 TypeScript 类型检查 |
| `pnpm gen:exports` | 扫描组件目录并生成主包 exports |
| `pnpm test` | 运行 Vitest 测试 |
| `pnpm coverage` | 生成测试覆盖率报告 |

## 仓库结构

```text
amu-ui
├─ packages/                 # 组件、图标、hooks、locale、theme、utils
├─ docs/                     # 文档站
├─ playground/               # 本地调试沙盒
├─ templates/amu-admin       # 后台管理前端模板
└─ templates/amu-admin-server # 后台管理服务端模板
```

### packages 说明

- `packages/components`：主组件源码与统一导出入口
- `packages/icons`：SVG 图标生成、图标组件与独立构建配置
- `packages/hooks`：通用 hooks 子包
- `packages/locale`：国际化语言包与类型定义
- `packages/theme`：主题变量与样式基础设施
- `packages/utils`：组件安装与内部通用工具

## 工程设计

### 组件消费方式

- 主包通过 `exports` 同时提供全量入口与组件级子路径入口
- 构建采用 preserveModules，便于 tree-shaking 与目录级产物映射
- 组件样式通过构建链路注入，兼顾按需使用与样式一致性

### 文档与 API 自动化

- 文档站基于 Vite + Vue Router 自建，不依赖额外文档框架
- 组件 `props / emits / slots` 通过编译期解析自动生成 API 表格
- Demo 与导航根据约定目录自动装配，降低新增组件时的文档维护成本

### 主题与国际化

- 主题系统基于 CSS Variables，支持暗黑模式与局部主题切换
- locale 与 hooks 独立拆包，组件通过 `ConfigProvider` 注入语言上下文

## 后台模板联调

仓库内同时维护了一套基于 `amu-ui` 的后台模板生态：

- `templates/amu-admin`：Vue 3 + Pinia + Vue Router 的前端后台模板
- `templates/amu-admin-server`：NestJS + Prisma + MySQL 的服务端模板

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

更多说明可查看：

- [templates/amu-admin/README.md](templates/amu-admin/README.md)
- [templates/amu-admin-server/README.md](templates/amu-admin-server/README.md)

## 当前状态

- 组件库、前端模板、服务端模板均可独立构建
- 模板相关测试已纳入仓库统一 Vitest 流程
- 当前模板更适合作为仓库生态示例、业务底座和独立模板候选，而非零配置通用脚手架

## 发布与维护

如果你准备发布 `amu-ui` 生态包，建议先完成以下检查：

- 构建主包与独立子包
- 校验主包 `exports` 与按需路径是否正确
- 验证模板在源码模式与包模式下都可正常运行
- 确认版本变更与联动依赖一致

## License

本仓库基于 MIT License 开源，详见 `LICENSE`。