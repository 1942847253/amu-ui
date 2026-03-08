# amu-admin 仓库外抽离清单

这份清单用于模拟把 `templates/amu-admin` 从当前 monorepo 中单独抽成一个独立仓库时，需要补齐的文件、配置和发布步骤。

## 当前结论

前端模板已经完成以下基础工作：

- `package.json` 已改为真实 semver 依赖，不再使用 `workspace:*`
- 支持“源码模式 / 包模式”两套依赖解析路径
- 模板测试已使用本地 `vitest.config.ts`
- 模板已经有独立的 `.env.example`
- 仓库许可证已补齐为 MIT

但它仍然没有达到“直接复制目录后立即对外发布”的状态，原因主要集中在仓库清理、脚手架包装、CI、模板初始化说明这几个层面。

另外还有一个已经验证过的真实阻塞：如果 npm 上已发布的 `amu-ui` 版本落后于当前仓库源码，导出面就可能不足以覆盖模板使用到的全部子路径类型入口，此时在当前 monorepo 内执行 `vue-tsc` 时，仍需要依赖本地 `tsconfig.json` 的路径映射来解析组件源码。

## 一次性复制时应该带走的文件

建议保留：

- `index.html`
- `package.json`
- `tsconfig.json`
- `vite.config.ts`
- `vitest.config.ts`
- `env.d.ts`
- `.env.example`
- `README.md`
- `SMOKE_CHECKLIST.md`
- `src/`
- `public/`
- `tests/`
- `__test__/`

建议新增：

- `pnpm-lock.yaml` 或目标包管理器对应锁文件
- `.editorconfig`
- 如果你不直接复用当前目录下的 `.github/workflows/ci.yml`，则至少补一份等价 CI
- 如果你不直接复用当前目录下的 `.gitignore`、`.nvmrc`，则需要在新仓库补齐对应文件

建议删除：

- `dist/`
- `node_modules/`
- `patch2.diff`
- `patch3.diff`
- `patch_dialog.cjs`
- `temp_header_css.txt`
- `test.js`

## 抽离步骤

### 1. 清理目录

目标：只保留模板运行、构建、测试真正需要的文件。

检查项：

- 删除本地构建产物和依赖目录
- 删除临时补丁和试验脚本
- 确认没有把本地 `.env`、私有凭据或本地调试文件带入新仓库

### 2. 固化依赖来源

目标：让模板在独立仓库里只依赖 npm 包，而不是当前 monorepo 源码。

检查项：

- 在 `.env.example` 中将 `VITE_USE_WORKSPACE_SOURCE=false` 作为独立仓库默认值
- 在 `README.md` 中把源码模式说明降级为“仅 monorepo 内联调可用”
- 在独立仓库首次安装前确认 `amu-ui` 和 `@amu-ui/icons` 的版本范围可从外部 registry 正常安装
- 在独立仓库首次发布前，确认 `amu-ui` 的正式发布版本已经补齐模板所需的全部子路径导出与类型入口；否则需要临时保留一份兼容路径映射或等待组件库发布新版本

### 3. 补仓库基础设施

目标：让新仓库具备最小可维护性。

检查项：

- 新增 `.gitignore`
- 新增 CI 工作流，至少覆盖 `pnpm install`、`pnpm build`、`pnpm test`
- 新增 Node.js 版本声明，例如 `.nvmrc` 或 `package.json.engines`
- 如果计划公开发布模板，补上截图、版本说明和更新日志策略

### 4. 调整 README 为独立仓库视角

目标：把 README 从“仓库内模板说明”改成“陌生用户可直接上手的仓库说明”。

必须改的点：

- 去掉“在仓库根目录执行”这类 monorepo 语义
- 把 `pnpm --filter amu-admin-template ...` 改成独立仓库命令
- 把服务端联调说明改成远端后端地址配置或配套仓库地址
- 增加首次启动步骤、截图、FAQ 和常见错误排查

### 5. 决定服务端协作方式

目标：明确独立前端仓库如何与 `amu-admin-server` 协作。

可选方案：

- 方案 A：继续推荐配套使用 `amu-admin-server` 独立仓库
- 方案 B：仅保留前端模板，README 中说明所需 API 契约
- 方案 C：用 Docker Compose 或脚本把前后端模板一并组合发布

建议：

- 如果目标是快速开源展示，优先采用方案 A
- 如果目标是最大复用性，优先采用方案 B

## 当前还没补的独立仓库文件

以下文件在当前模板目录中还不存在，但独立仓库基本都需要：

- 独立仓库发布说明
- 独立仓库截图或演示地址说明

当前模板目录中已经补入以下独立仓库骨架文件，可在抽离时直接带走：

- `.gitignore`
- `.nvmrc`
- `.github/workflows/ci.yml`
- `README.standalone.md`

## 发布前自检

### 必须通过

- `pnpm install`
- `pnpm build`
- `pnpm test`
- `.env.example` 可直接复制为 `.env`
- 不依赖当前 monorepo 根目录命令
- README 不再出现 `pnpm --filter amu-admin-template`

### 建议通过

- 提供最少一张登录页与工作台截图
- 提供一份 API 契约摘要或后端仓库链接
- 提供 GitHub Actions CI 结果徽章

## 当前状态评估

如果今天就要把它拆出去，新仓库已经有能力跑起来，但还不够像一个成熟的独立模板仓库。

最重要的外部阻塞不是模板本身，而是组件库已发布版本的导出面还没有完全覆盖模板所需的全部子路径类型。

离“可公开发布”最近的几件事是：

1. 清理模板目录中的临时文件
2. 新增 `.gitignore` 和 CI
3. 把 README 改成独立仓库视角
4. 设定独立仓库默认使用包模式
5. 决定是否同步拆出 `amu-admin-server` 配套仓库