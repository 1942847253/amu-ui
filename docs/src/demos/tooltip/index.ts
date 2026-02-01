import type { DemoItem } from '../../components/DemoTabs.vue'

import Basic from './Basic.vue'
import BasicCode from './Basic.vue?raw'
import Placement from './Placement.vue'
import PlacementCode from './Placement.vue?raw'
import Trigger from './Trigger.vue'
import TriggerCode from './Trigger.vue?raw'
import Theme from './Theme.vue'
import ThemeCode from './Theme.vue?raw'
import Disabled from './Disabled.vue'
import DisabledCode from './Disabled.vue?raw'

export const demos: DemoItem[] = [
  {
    key: 'basic',
    component: Basic,
    code: BasicCode,
    title: {
      'zh-CN': '基础用法',
      'en-US': 'Basic',
    },
    description: {
      'zh-CN': '通过 `content` 设置提示文字。',
      'en-US': 'Use `content` to set the tooltip text.',
    },
  },
  {
    key: 'placement',
    component: Placement,
    code: PlacementCode,
    title: {
      'zh-CN': '位置',
      'en-US': 'Placement',
    },
    description: {
      'zh-CN': '支持 12 个不同方向的 `placement`。',
      'en-US': 'Supports 12 `placement` directions.',
    },
  },
  {
    key: 'trigger',
    component: Trigger,
    code: TriggerCode,
    title: {
      'zh-CN': '触发方式',
      'en-US': 'Trigger',
    },
    description: {
      'zh-CN': '支持 `hover`、`click` 与 `manual`。',
      'en-US': 'Supports `hover`, `click`, and `manual`.',
    },
  },
  {
    key: 'theme',
    component: Theme,
    code: ThemeCode,
    title: {
      'zh-CN': '主题色文字提示',
      'en-US': 'Tooltip with Theme Color',
    },
    description: {
      'zh-CN': '提供浅灰色、蓝色、绿色、红色、黄色主题的文字提示。',
      'en-US': 'Tooltips in light gray, blue, green, red, yellow themes.',
    },
  },
  {
    key: 'disabled',
    component: Disabled,
    code: DisabledCode,
    title: {
      'zh-CN': '禁用与样式',
      'en-US': 'Disabled & Style',
    },
    description: {
      'zh-CN': '展示 `disabled`、`maxWidth` 与 `showArrow`。',
      'en-US': 'Shows `disabled`, `maxWidth`, and `showArrow`.',
    },
  },
]

export const meta = {
  description: {
    'zh-CN': '基于 Popup 的文字提示组件，用于展示简短说明。',
    'en-US': 'A tooltip component built on Popup for short hints.',
  },
}
