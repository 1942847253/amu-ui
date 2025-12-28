import type { DemoItem } from '../../components/DemoTabs.vue'

import Basic from './Basic.vue'
import BasicCode from './Basic.vue?raw'
import Placement from './Placement.vue'
import PlacementCode from './Placement.vue?raw'
import Trigger from './Trigger.vue'
import TriggerCode from './Trigger.vue?raw'

export const demos: DemoItem[] = [
  {
    key: 'basic',
    component: Basic,
    code: BasicCode,
    title: '基础用法',
    description: '最简单的用法。',
  },
  {
    key: 'placement',
    component: Placement,
    code: PlacementCode,
    title: '位置',
    description: '支持 12 个不同的方向。',
  },
  {
    key: 'trigger',
    component: Trigger,
    code: TriggerCode,
    title: '触发方式',
    description: '支持 `hover`、`click` 和 `manual` 触发。',
  },
]

export const meta = {
  description: {
    'zh-CN': '基础的弹出层组件，用于构建 Popover、Tooltip 等。',
    'en-US': 'Basic popup component for building Popover, Tooltip, etc.',
  },
}
