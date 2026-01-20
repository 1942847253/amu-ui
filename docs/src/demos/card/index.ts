import Basic from './Basic.vue?raw'
import Simple from './Simple.vue?raw'
import Shadow from './Shadow.vue?raw'
import Grid from './Grid.vue?raw'
import Meta from './Meta.vue?raw'
import Loading from './Loading.vue?raw'
import Complex from './Complex.vue?raw'

import BasicComp from './Basic.vue'
import SimpleComp from './Simple.vue'
import ShadowComp from './Shadow.vue'
import GridComp from './Grid.vue'
import MetaComp from './Meta.vue'
import LoadingComp from './Loading.vue'
import ComplexComp from './Complex.vue'

export const demos = [
  {
    title: {
      'zh-CN': '基础用法',
      'en-US': 'Basic Usage',
    },
    description: {
      'zh-CN': '包含标题、内容、操作区域。',
      'en-US': 'Title, content, and extra area.',
    },
    code: Basic,
    component: BasicComp,
  },
  {
    title: {
      'zh-CN': '简单卡片',
      'en-US': 'Simple Card',
    },
    description: {
      'zh-CN': '只有内容区域。',
      'en-US': 'Only content area.',
    },
    code: Simple,
    component: SimpleComp,
  },
  {
    title: {
      'zh-CN': '阴影与边框',
      'en-US': 'Shadow and Border',
    },
    description: {
      'zh-CN': '可以设置阴影显示时机 `shadow` 和是否有边框 `bordered`。',
      'en-US': 'You can set when to show the shadow with `shadow` and whether to show border with `bordered`.',
    },
    code: Shadow,
    component: ShadowComp,
  },
  {
    title: {
      'zh-CN': '网格布局',
      'en-US': 'Card Grid',
    },
    description: {
      'zh-CN': '一种常见的卡片内容布局。',
      'en-US': 'A common layout for card content.',
    },
    code: Grid,
    component: GridComp,
  },
  {
    title: {
      'zh-CN': '灵活内容',
      'en-US': 'Flexible Content',
    },
    description: {
      'zh-CN': '可以利用 `cover` 插槽和 `AmuCardMeta` 组件展示更丰富的内容。',
      'en-US': 'You can use `cover` slot and `AmuCardMeta` component to display richer content.',
    },
    code: Meta,
    component: MetaComp,
  },
  {
    title: {
      'zh-CN': '预加载',
      'en-US': 'Loading',
    },
    description: {
      'zh-CN': '数据加载中占位。',
      'en-US': 'Shows a placeholder when data is loading.',
    },
    code: Loading,
    component: LoadingComp,
  },
  {
    title: {
      'zh-CN': '综合功能',
      'en-US': 'Complex Functionality',
    },
    description: {
      'zh-CN': '支持折叠、全屏、关闭等高级功能。',
      'en-US': 'Supports advanced features such as collapsible, maximizable, and closable.',
    },
    code: Complex,
    component: ComplexComp,
  },
]

export const meta = {
  description: {
    'zh-CN': '通用容器，用来包裹内容。',
    'en-US': 'A common container for wrapping content.',
  },
}

