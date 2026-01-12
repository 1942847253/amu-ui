import Basic from './Basic.vue?raw'
import Card from './Card.vue?raw'
import Editable from './Editable.vue?raw'
import Position from './Position.vue?raw'
import Custom from './Custom.vue?raw'
import Size from './Size.vue?raw'
import BeforeLeave from './BeforeLeave.vue?raw'
import Icon from './Icon.vue?raw'

import BasicComp from './Basic.vue'
import CardComp from './Card.vue'
import EditableComp from './Editable.vue'
import PositionComp from './Position.vue'
import CustomComp from './Custom.vue'
import SizeComp from './Size.vue'
import BeforeLeaveComp from './BeforeLeave.vue'
import IconComp from './Icon.vue'

export const demos = [
  {
    title: {
      'zh-CN': '基础用法',
      'en-US': 'Basic Usage'
    },
    description: {
      'zh-CN': '默认的标签页。',
      'en-US': 'Default Tab.'
    },
    code: Basic,
    component: BasicComp
  },
  {
    title: {
      'zh-CN': '卡片样式',
      'en-US': 'Card Type'
    },
    description: {
      'zh-CN': '设置 `type="card"` 可以显示卡片样式。',
      'en-US': 'Card type tab.'
    },
    code: Card,
    component: CardComp
  },
  {
    title: {
      'zh-CN': '位置',
      'en-US': 'Position'
    },
    description: {
      'zh-CN': '支持 `top`, `bottom`, `left`, `right` 四种位置。',
      'en-US': 'Tab position.'
    },
    code: Position,
    component: PositionComp
  },
  {
    title: {
      'zh-CN': '动态增减',
      'en-US': 'Add & Close'
    },
    description: {
      'zh-CN': '只有卡片样式支持 `editable` 模式。',
      'en-US': 'Only card type supports editable mode.'
    },
    code: Editable,
    component: EditableComp
  },
  {
    title: {
      'zh-CN': '自定义',
      'en-US': 'Custom'
    },
    description: {
      'zh-CN': '自定义标签页标题和附加内容。',
      'en-US': 'Custom tab title and extra content.'
    },
    code: Custom,
    component: CustomComp
  },
  {
    title: {
      'zh-CN': '图标',
      'en-US': 'Icons'
    },
    description: {
      'zh-CN': '通过 `icon` 属性设置图标。',
      'en-US': 'Set icon via `icon` prop.'
    },
    code: Icon,
    component: IconComp
  },
  {
    title: {
      'zh-CN': '尺寸',
      'en-US': 'Size'
    },
    description: {
      'zh-CN': '提供 `sm`, `md`, `lg` 三种尺寸。',
      'en-US': 'Three sizes are provided: `sm`, `md` and `lg`.'
    },
    code: Size,
    component: SizeComp
  },
  {
    title: {
      'zh-CN': '切换拦截',
      'en-US': 'Before Leave'
    },
    description: {
      'zh-CN': '切换标签页前触发的钩子，返回 `false` 或 `Promise.reject` 可阻止切换。',
      'en-US': 'Hook triggered before switching tabs. Returning `false` or `Promise.reject` will prevent switching.'
    },
    code: BeforeLeave,
    component: BeforeLeaveComp
  }
]

export const meta = {
  description: {
    'zh-CN': '选项卡切换组件。',
    'en-US': 'Tabs make it easy to explore and switch between different views.'
  }
}
