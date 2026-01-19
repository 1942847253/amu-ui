import Basic from './Basic.vue?raw'
import Grid from './Grid.vue?raw'
import Meta from './Meta.vue?raw'
import Loading from './Loading.vue?raw'
import Complex from './Complex.vue?raw'

import BasicComp from './Basic.vue'
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
      'en-US': 'Includes title, content, and action area.',
    },
    component: BasicComp,
    code: Basic,
  },
  {
    title: {
      'zh-CN': '网格卡片',
      'en-US': 'Card Grid',
    },
    description: {
      'zh-CN': '一种常见的卡片内容区隔模式。',
      'en-US': 'A common content partition mode for cards.',
    },
    component: GridComp,
    code: Grid,
  },
  {
    title: {
      'zh-CN': '元数据卡片',
      'en-US': 'Meta Card',
    },
    description: {
      'zh-CN': '支持封面、头像、标题和描述信息。',
      'en-US': 'Supports cover, avatar, title, and description.',
    },
    component: MetaComp,
    code: Meta,
  },
  {
    title: {
      'zh-CN': '加载状态',
      'en-US': 'Loading State',
    },
    description: {
      'zh-CN': '数据加载时的占位显示。',
      'en-US': 'Placeholder display during data loading.',
    },
    component: LoadingComp,
    code: Loading,
  },
  {
    title: {
      'zh-CN': '复杂交互',
      'en-US': 'Complex Interaction',
    },
    description: {
      'zh-CN': '支持折叠、全屏、关闭等微交互。',
      'en-US': 'Supports collapse, fullscreen, close and other micro-interactions.',
    },
    component: ComplexComp,
    code: Complex,
  },
]
