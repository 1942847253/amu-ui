import Basic from './Basic.vue?raw'
import Horizontal from './Horizontal.vue?raw'
import MaxHeight from './MaxHeight.vue?raw'
import Manual from './Manual.vue?raw'
import Native from './Native.vue?raw'

import BasicComp from './Basic.vue'
import HorizontalComp from './Horizontal.vue'
import MaxHeightComp from './MaxHeight.vue'
import ManualComp from './Manual.vue'
import NativeComp from './Native.vue'

export const demos = [
  {
    id: 'basic',
    title: {
      'zh-CN': '基础用法',
      'en-US': 'Basic Usage',
    },
    description: {
      'zh-CN': '通过 `height` 属性设置滚动条高度，若不设置则根据父容器高度自适应。',
      'en-US': 'Use `height` prop to set the height of the scrollbar.',
    },
    code: Basic,
    component: BasicComp,
  },
  {
    id: 'horizontal',
    title: {
      'zh-CN': '横向滚动',
      'en-US': 'Horizontal Scroll',
    },
    description: {
      'zh-CN': '当元素宽度大于滚动条宽度时，会显示横向滚动条。',
      'en-US': 'Horizontal scrollbar appears when content width exceeds container width.',
    },
    code: Horizontal,
    component: HorizontalComp,
  },
  {
    id: 'max-height',
    title: {
      'zh-CN': '最大高度',
      'en-US': 'Max Height',
    },
    description: {
      'zh-CN': '当元素高度超过 `max-height` 时，触发滚动条。',
      'en-US': 'Scrollbar appears when content height exceeds `max-height`.',
    },
    code: MaxHeight,
    component: MaxHeightComp,
  },
  {
    id: 'manual',
    title: {
      'zh-CN': '手动滚动',
      'en-US': 'Manual Scroll',
    },
    description: {
      'zh-CN': '通过 `setScrollTop` 与 `setScrollLeft` 方法手动控制滚动条位置。同时演示了 `always` 属性。',
      'en-US': 'Control scroll position manually via `setScrollTop` and `setScrollLeft` methods. Also demonstrates the `always` prop.',
    },
    code: Manual,
    component: ManualComp,
  },
  {
    id: 'native',
    title: {
      'zh-CN': '原生滚动条',
      'en-US': 'Native Scrollbar',
    },
    description: {
      'zh-CN': '使用 `native` 属性来使用浏览器原生的滚动条样式。',
      'en-US': 'Use `native` prop to use the browser native scrollbar styles.',
    },
    code: Native,
    component: NativeComp,
  },
]
