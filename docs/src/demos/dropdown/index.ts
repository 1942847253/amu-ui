import Basic from './basic.vue'
import BasicCode from './basic.vue?raw'
import Trigger from './trigger.vue'
import TriggerCode from './trigger.vue?raw'
import Placement from './placement.vue'
import PlacementCode from './placement.vue?raw'
import Submenu from './submenu.vue'
import SubmenuCode from './submenu.vue?raw'
import Command from './command.vue'
import CommandCode from './command.vue?raw'
import Manual from './manual.vue'
import ManualCode from './manual.vue?raw'
import Group from './group.vue'
import GroupCode from './group.vue?raw'
import Options from './options.vue'
import OptionsCode from './options.vue?raw'

export const demos = [
  {
    title: {
      'zh-CN': '基础用法',
      'en-US': 'Basic Usage',
    },
    description: {
      'zh-CN': '移动到下拉菜单上，展开更多操作。',
      'en-US': 'Hover on the dropdown menu to see more options.',
    },
    code: BasicCode,
    component: Basic,
  },
  {
    title: {
      'zh-CN': '触发方式',
      'en-US': 'Trigger Mode',
    },
    description: {
      'zh-CN': '支持 `hover`、`click` (默认)、`contextmenu` 等触发方式。',
      'en-US': 'Supports `hover`, `click` (default), `contextmenu` and other triggers.',
    },
    code: TriggerCode,
    component: Trigger,
  },
  {
    title: {
      'zh-CN': '弹出位置',
      'en-US': 'Placement',
    },
    description: {
      'zh-CN': '支持 12 个弹出方位。',
      'en-US': 'Supports 12 different placements.',
    },
    code: PlacementCode,
    component: Placement,
  },
  {
    title: {
      'zh-CN': '分组与快捷键',
      'en-US': 'Groups & Shortcuts',
    },
    description: {
      'zh-CN': '使用 `is-title` 进行分组，支持 `shortcut` 显示快捷键，以及 `active` 状态。',
      'en-US': 'Use `is-title` for grouping, `shortcut` for displaying shortcut keys, and `active` for selected state.',
    },
    code: GroupCode,
    component: Group,
  },
  {
    title: {
      'zh-CN': '更多配置',
      'en-US': 'Options',
    },
    description: {
      'zh-CN': '`hide-on-click` 控制点击后是否关闭；`auto-width` 使菜单宽度跟随触发器。',
      'en-US': '`hide-on-click` controls whether to close after clicking; `auto-width` makes the menu width match the trigger.',
    },
    code: OptionsCode,
    component: Options,
  },
   {
    title: {
      'zh-CN': '受控模式',
      'en-US': 'Controlled Mode',
    },
    description: {
      'zh-CN': '通过 `v-model:visible` 和 `trigger="manual"` 手动控制显示隐藏。',
      'en-US': 'Manually control visibility via `v-model:visible` and `trigger="manual"`.',
    },
    code: ManualCode,
    component: Manual,
  },
  {
    title: {
      'zh-CN': '级联菜单',
      'en-US': 'Cascading Menu',
    },
    description: {
      'zh-CN': '支持多层级嵌套的子菜单。',
      'en-US': 'Supports multi-level nested menus.',
    },
    code: SubmenuCode,
    component: Submenu,
  },
  {
    title: {
      'zh-CN': '指令与图标',
      'en-US': 'Command and Icons',
    },
    description: {
      'zh-CN': '通过 `command` 属性配置指令，`select` 事件中可以获取该指令。支持 `icon` 属性显示图标。',
      'en-US': 'Configure commands via the `command` prop, which can be retrieved in the `select` event. Supports `icon` prop to display icons.',
    },
    code: CommandCode,
    component: Command,
  },
]

export const meta = {
  description: {
    'zh-CN': '操作列表。',
    'en-US': 'Menu for a list of actions.',
  },
}
