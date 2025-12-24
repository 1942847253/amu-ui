# DatePicker 日期选择器组件实现清单（专业级）

> 目标：实现一个组件库级 DatePicker，支持单日期/范围/时间组合，具备可访问性、国际化、边界处理、可扩展架构。
>
> 说明：本仓库当前 `packages/components/date-picker/` 为占位目录（`src/`、`__test__/` 为空）。本清单用于指导从 0 到 1 的实现与验收。

## 0. 与仓库约定对齐（先做，否则后续会返工）

- [ ] 目录结构补全（参考其他组件）
  - [ ] `packages/components/date-picker/index.ts`
  - [ ] `packages/components/date-picker/src/date-picker.vue`（或 `.ts`）
  - [ ] `packages/components/date-picker/src/props.ts`
  - [ ] `packages/components/date-picker/src/style.css`（如有样式）
  - [ ] `packages/components/date-picker/__test__/date-picker.test.ts`
- [ ] 组件命名稳定
  - [ ] 若使用 `script setup`：`defineOptions({ name: 'AmuDatePicker' })`
- [ ] `index.ts` 必须使用 `withInstall`，并导出 props（docs API 解析依赖）
- [ ] 若希望“全量注册”生效：把组件加入 `packages/components/index.ts` 的默认 `AmuUI.install`
- [ ] 新增目录后运行 `pnpm gen:exports`（禁止手改根 `package.json.exports`）

## 1. 组件定位

- [ ] 用于选择：单个日期、日期范围、或日期+时间组合
- [ ] 强调：精确、可扩展、可格式化（输入/展示分离）
- [ ] 场景：表单、对话框、弹窗、下拉

## 2. 基础能力（MVP 核心）

- [ ] 单日期选择（`type="date"`）
- [ ] 日期范围选择（`type="daterange"`）
- [ ] 选择时间（`showTime` 或 `type="datetime"/"datetimerange"`）
- [ ] 受控 / 非受控模式
  - [ ] `modelValue` 受控
  - [ ] `defaultValue`（可选）非受控
- [ ] 支持 `v-model` / `modelValue`（`update:modelValue`）
- [ ] 支持弹窗/下拉展示（Popover 风格；必要时可扩展到 Modal）

## 3. 状态体系

- [ ] `normal`
- [ ] `disabled`
- [ ] `error`（建议通过 `status` 或 `validateStatus` 暴露）
- [ ] `focus/active`（弹窗展开）
- [ ] `loading`（可选：异步数据/远程禁用规则）

## 4. 日期范围与限制

- [ ] `minDate` / `maxDate` 选择范围限制
- [ ] 禁用指定日期
  - [ ] `disabledDate?: (date: Date) => boolean`
  - [ ] 或 `disabledDates?: Date[]`（可选）
- [ ] 快捷选择
  - [ ] 内置：今天 / 本周 / 本月 / 最近 7 天（按 `type` 自适配）
  - [ ] 自定义：`shortcuts?: Array<{ label: string; value: () => Date | [Date, Date] }>`
- [ ] 动态禁用（与其他表单联动）
  - [ ] 禁用函数必须每次渲染生效，不缓存过期结果

## 5. 格式化与显示（专业级关键）

- [ ] 输入框显示策略（强制）
  - [ ] 聚焦：显示“原始值/可编辑格式”（例如 `YYYY-MM-DD`）
  - [ ] 失焦：显示格式化值（例如 `YYYY/MM/DD` 或本地化格式）
- [ ] 多种显示格式
  - [ ] `format: 'YYYY-MM-DD' | 'YYYY/MM/DD' | 'MM/DD/YYYY' | ...`
  - [ ] 或 `format: (date: Date) => string`
- [ ] 国际化/本地化显示（中文/英文/其他）
  - [ ] 月份/星期文案来自 `useLocale()`（仓库内统一方案）
- [ ] 周起始日设置
  - [ ] `weekStart?: 0 | 1`（0=Sunday，1=Monday）

## 6. 交互能力

- [ ] 点击输入框打开日历弹窗
- [ ] 键盘操作（可访问性强相关）
  - [ ] `Tab` 聚焦/离开
  - [ ] `ArrowKeys` 移动日期焦点
  - [ ] `Enter` 选择/确认
  - [ ] `Esc` 关闭弹窗
- [ ] 范围选择：鼠标拖拽选择（高级，可后置）
- [ ] 点击快捷选项立即更新值
- [ ] 支持清空（`clearable`）

## 7. 时间选择扩展

- [ ] 选择时间（时/分/秒）
- [ ] 12/24 小时制（建议 `use12Hours?: boolean`）
- [ ] 时间步长（建议 `step?: { hour?: number; minute?: number; second?: number }`）
- [ ] 与日期组合（DateTime）

## 8. 多选 / 范围选择

- [ ] 单选日期
- [ ] 日期范围
- [ ] 多段范围（高级：明确作为后续版本，不进入 MVP）
- [ ] 范围提示：起止日期高亮、hover 预览

## 9. 弹窗与布局

- [ ] Popover/下拉展示（MVP）
- [ ] 自动定位（避免遮挡；可先依赖现有 Popover 能力或简化实现）
- [ ] 自适应屏幕宽高（溢出时可滚动）
- [ ] 弹窗内容可插槽扩展（如 footer、快捷区）

## 10. 尺寸与样式

- [ ] `size = 'small' | 'medium' | 'large'`
- [ ] 输入框与弹窗视觉统一
- [ ] 支持主题色与暗黑模式（必须使用 `packages/theme` 的 CSS Variables）
- [ ] 自定义边框/圆角/动画（如无现有 token，先不要新增硬编码颜色/阴影）

## 11. 可访问性（必须达到“可用”）

- [ ] 日历网格语义
  - [ ] `role="grid"`
  - [ ] 日期单元：`role="gridcell"`
  - [ ] `aria-selected`
- [ ] 键盘操作可用（见第 6 条）
- [ ] 禁用/只读的聚焦策略一致（避免“看起来禁用但还能选”）
- [ ] 屏幕阅读器可读
  - [ ] 日期读法（例如 `2025-12-24`）
  - [ ] 范围读法（start/end）
  - [ ] 快捷选项可读

## 12. 国际化与本地化（进阶）

- [ ] 月份/星期语言可切换（跟随 `AmuConfigProvider` 注入的 locale）
- [ ] 本地化日期格式
- [ ] 时区设置（UTC/本地/自定义时区）
- [ ] 夏令时处理（建议依赖成熟库；如果不做，必须在文档里明确限制）

## 13. 事件体系

- [ ] `change(value)` 日期变化
- [ ] `focus` / `blur` 输入框聚焦/失焦
- [ ] `open` / `close` 弹窗开关
- [ ] `clear` 清空
- [ ] `selectShortcut(option)` 选择快捷项

## 14. 边界与异常处理

- [ ] 禁用日期/范围不可选（UI 与逻辑一致）
- [ ] 异步加载失败提示（若支持 `loading`）
- [ ] 值超出范围：禁止或回滚（策略需统一）
- [ ] 空值处理一致
  - [ ] 单选：`null` 表示无值
  - [ ] 范围：`[null, null]` 或 `null`（二选一并固定）

## 15. 对外 API（建议稿，落地时需对齐仓库 docs 解析规则）

> 注意：docs 会解析 `src/props.ts` 中导出的 `*Props/*Emits/*Slots` 常量，并读取 JSDoc（需要 `@description` 与 `@en`）。

```ts
export interface DatePickerProps {
  modelValue?: Date | [Date, Date] | null
  type?: 'date' | 'datetime' | 'daterange' | 'datetimerange'
  disabled?: boolean
  minDate?: Date
  maxDate?: Date
  clearable?: boolean
  format?: string | ((date: Date) => string)
  locale?: string
  size?: 'small' | 'medium' | 'large'
  shortcuts?: Array<{ label: string; value: () => Date | [Date, Date] }>
  showTime?: boolean
}
```

## 16. 文档与示例（必须）

> 本仓库 docs demo 约定：`docs/src/demos/<name>/index.ts` 中静态 import demo 组件；demo 代码必须按需引入（`import { AmuXxx } from 'amu-ui/xxx'`），严禁相对路径引入源码。

- [ ] 基础日期选择
- [ ] 日期范围选择
- [ ] 带时间选择
- [ ] 快捷选项
- [ ] 清空操作
- [ ] 禁用日期/范围
- [ ] 表单校验集成
- [ ] 国际化示例

## 17. 专业级验收标准（Definition of Done）

- [ ] 仅键盘可完成选择/确认/关闭
- [ ] 屏幕阅读器能读出当前日期/范围/选中状态
- [ ] 单选 + 范围 + 时间组合至少覆盖 `date/daterange/datetime/datetimerange`
- [ ] min/max/disabledDate 边界一致且无“绕过”
- [ ] i18n 文案与格式可切换；周起始日可配置
- [ ] 弹窗定位在常见容器（表单/弹窗/滚动容器）中不离谱
- [ ] 测试覆盖：核心交互 + 边界输入 + 禁用规则
