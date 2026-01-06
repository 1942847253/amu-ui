import Basic from './basic.vue?raw'
import Placement from './placement.vue?raw'
import Size from './size.vue?raw'
import Slots from './slots.vue?raw'
import Functional from './functional.vue?raw'
import Nested from './nested.vue?raw'
import Interaction from './interaction.vue?raw'
import Mode from './mode.vue?raw'

import BasicComp from './basic.vue'
import PlacementComp from './placement.vue'
import SizeComp from './size.vue'
import SlotsComp from './slots.vue'
import FunctionalComp from './functional.vue'
import NestedComp from './nested.vue'
import InteractionComp from './interaction.vue'
import ModeComp from './mode.vue'

export const demos = [
  {
    id: 'basic',
    title: {
      'zh-CN': '基础用法',
      'en-US': 'Basic Usage'
    },
    description: {
      'zh-CN': '点击按钮打开最简单的抽屉。',
      'en-US': 'Click the button to open the simplest drawer.'
    },
    code: Basic,
    component: BasicComp
  },
  {
    id: 'placement',
    title: {
      'zh-CN': '自定义位置',
      'en-US': 'Custom Placement'
    },
    description: {
      'zh-CN': '支持 `top` / `bottom` / `left` / `right` 四个方向。',
      'en-US': 'Supports `top` / `bottom` / `left` / `right` placements.'
    },
    code: Placement,
    component: PlacementComp
  },
  {
    id: 'size',
    title: {
      'zh-CN': '自定义尺寸与可拖拽',
      'en-US': 'Custom Size & Resizable'
    },
    description: {
      'zh-CN': '通过 `size` 控制宽度/高度，`resizable` 开启拖拽调整。',
      'en-US': 'Control width/height via `size`, and enable drag resizing via `resizable`.'
    },
    code: Size,
    component: SizeComp
  },
  {
    id: 'slots',
    title: {
      'zh-CN': '自定义内容',
      'en-US': 'Custom Content'
    },
    description: {
      'zh-CN': '使用 `header` / `footer` 插槽自定义抽屉结构。',
      'en-US': 'Use `header` / `footer` slots to customize drawer structure.'
    },
    code: Slots,
    component: SlotsComp
  },
  {
    id: 'interaction',
    title: {
      'zh-CN': '交互控制',
      'en-US': 'Interaction Control'
    },
    description: {
      'zh-CN': '演示 `before-close` 拦截关闭，以及禁用 `mask-closable` / `close-on-esc`。',
      'en-US': 'Demonstrates `before-close` interception, and disabling `mask-closable` / `close-on-esc`.'
    },
    code: Interaction,
    component: InteractionComp
  },
  {
    id: 'mode',
    title: {
      'zh-CN': '显示模式',
      'en-US': 'Display Mode'
    },
    description: {
      'zh-CN': '支持非模态（非阻塞）、无遮罩、无标题、以及内容超长时的滚动。',
      'en-US': 'Supports non-modal (non-blocking), no mask, no header, and scrolling for long content.'
    },
    code: Mode,
    component: ModeComp
  },
  {
    id: 'nested',
    title: {
      'zh-CN': '多层嵌套',
      'en-US': 'Nested Drawers'
    },
    description: {
      'zh-CN': '抽屉可以嵌套使用（注意：内部抽屉会自动管理 z-index）。',
      'en-US': 'Drawers can be nested (Note: internal drawers automatically manage z-index).'
    },
    code: Nested,
    component: NestedComp
  },
  {
    id: 'functional',
    title: {
      'zh-CN': '函数式调用',
      'en-US': 'Functional Call'
    },
    description: {
      'zh-CN': '通过 `AmuDrawer.open()` 直接打开抽屉，无需定义模板。',
      'en-US': 'Open drawer directly via `AmuDrawer.open()`, no template definition needed.'
    },
    code: Functional,
    component: FunctionalComp
  }
]
