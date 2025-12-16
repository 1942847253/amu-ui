# Git 提交规范指南

本项目遵循 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/) 规范，使用 `commitlint` 进行自动化检查。

## 提交格式

```text
<type>(<scope>): <subject>
```

- **type**: 提交类型（必填）
- **scope**: 影响范围（选填，如 `button`, `theme`, `deps`）
- **subject**: 简短描述（必填）

## 常用类型 (Type)

| 类型 | 含义 | 示例 |
| :--- | :--- | :--- |
| **feat** | 新增功能 (Feature) | `feat(button): add loading state` |
| **fix** | 修复 Bug | `fix(theme): correct primary color variable` |
| **docs** | 文档变更 | `docs: update quick start guide` |
| **style** | 代码格式 (不影响逻辑) | `style: format code with prettier` |
| **refactor** | 代码重构 (无新功能/无Bug修复) | `refactor: simplify button logic` |
| **perf** | 性能优化 | `perf: optimize table rendering` |
| **test** | 测试相关 | `test: add unit tests for button` |
| **build** | 构建系统/依赖变更 | `build: upgrade vite to v6` |
| **ci** | CI/CD 配置变更 | `ci: add github actions` |
| **chore** | 杂项 (构建过程或辅助工具的变动) | `chore: update eslint config` |
| **revert** | 回滚提交 | `revert: feat: add input component` |

## 示例

### 简单提交
```bash
git commit -m "docs: update readme"
```

### 带范围的提交
```bash
git commit -m "fix(button): fix click event not firing"
```

### 破坏性变更 (Breaking Change)
在 type/scope 后加 `!` 或在 footer 中注明 `BREAKING CHANGE`。

```bash
git commit -m "feat(button)!: remove deprecated size prop"
```

## 自动化工具

本项目已配置 `husky` + `commitlint`。如果你提交的信息不符合上述规范，Git 会自动拒绝提交并提示错误。
