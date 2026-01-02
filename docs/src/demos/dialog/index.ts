import Basic from './basic.vue?raw'
import Types from './types.vue?raw'
import Position from './position.vue?raw'
import Interaction from './interaction.vue?raw'
import Custom from './custom.vue?raw'
import Async from './async.vue?raw'
import Plugin from './plugin.vue?raw'

import BasicComp from './basic.vue'
import TypesComp from './types.vue'
import PositionComp from './position.vue'
import InteractionComp from './interaction.vue'
import CustomComp from './custom.vue'
import AsyncComp from './async.vue'
import PluginComp from './plugin.vue'

export const demos = [
  {
    id: 'basic',
    title: {
      'zh-CN': '基础用法',
      'en-US': 'Basic Usage'
    },
    description: {
      'zh-CN': '最简单的用法。',
      'en-US': 'Simplest usage.'
    },
    code: Basic,
    component: BasicComp
  },
  {
    id: 'types',
    title: {
      'zh-CN': '不同类型',
      'en-US': 'Different Types'
    },
    description: {
      'zh-CN': '支持 `confirm`、`feedback` 等类型，以及自定义图标。',
      'en-US': 'Supports `confirm`, `feedback` types, and custom icons.'
    },
    code: Types,
    component: TypesComp
  },
  {
    id: 'position',
    title: {
      'zh-CN': '位置与尺寸',
      'en-US': 'Position & Size'
    },
    description: {
      'zh-CN': '通过 `placement`、`top`、`width` 控制对话框的位置和大小。',
      'en-US': 'Control dialog position and size via `placement`, `top`, `width`.'
    },
    code: Position,
    component: PositionComp
  },
  {
    id: 'interaction',
    title: {
      'zh-CN': '交互控制',
      'en-US': 'Interaction'
    },
    description: {
      'zh-CN': '支持拖拽、模态/非模态、遮罩点击关闭、ESC 关闭等交互配置。',
      'en-US': 'Supports draggable, modal/non-modal, mask closable, ESC close, etc.'
    },
    code: Interaction,
    component: InteractionComp
  },
  {
    id: 'custom',
    title: {
      'zh-CN': '自定义内容',
      'en-US': 'Custom Content'
    },
    description: {
      'zh-CN': '通过 Props 自定义按钮，或通过 Slots 自定义头部、内容和底部。',
      'en-US': 'Customize buttons via Props, or header, content, footer via Slots.'
    },
    code: Custom,
    component: CustomComp
  },
  {
    id: 'async',
    title: {
      'zh-CN': '异步关闭',
      'en-US': 'Async Close'
    },
    description: {
      'zh-CN': '通过 `async-loading` 控制确认按钮的加载状态。',
      'en-US': 'Control loading state of confirm button via `async-loading`.'
    },
    code: Async,
    component: AsyncComp
  },
  {
    id: 'plugin',
    title: {
      'zh-CN': '函数式调用',
      'en-US': 'Function Call'
    },
    description: {
      'zh-CN': '通过 `Dialog` 函数直接创建对话框，支持 Promise 化的 `onConfirm`。',
      'en-US': 'Create dialog directly via `Dialog` function, supports Promise-based `onConfirm`.'
    },
    code: Plugin,
    component: PluginComp
  }
]
