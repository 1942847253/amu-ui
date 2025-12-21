import Basic from './Basic.vue'
import BasicCode from './Basic.vue?raw'
import Vertical from './Vertical.vue'
import VerticalCode from './Vertical.vue?raw'
import Size from './Size.vue'
import SizeCode from './Size.vue?raw'

export const demos = [
  {
    key: 'basic',
    title: {
      'zh-CN': '基础用法',
      'en-US': 'Basic Usage',
    },
    description: {
      'zh-CN': '相邻组件水平间距。',
      'en-US': 'Horizontal spacing between adjacent components.',
    },
    code: BasicCode,
    component: Basic,
  },
  {
    key: 'vertical',
    title: {
      'zh-CN': '垂直间距',
      'en-US': 'Vertical Spacing',
    },
    description: {
      'zh-CN': '相邻组件垂直间距。',
      'en-US': 'Vertical spacing between adjacent components.',
    },
    code: VerticalCode,
    component: Vertical,
  },
  {
    key: 'size',
    title: {
      'zh-CN': '间距大小',
      'en-US': 'Space Size',
    },
    description: {
      'zh-CN': '通过 `size` 设置间距大小。',
      'en-US': 'Set the spacing size via `size`.',
    },
    code: SizeCode,
    component: Size,
  },
]
