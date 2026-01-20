import Basic from './Basic.vue'
import Circle from './Circle.vue'
import Dashboard from './Dashboard.vue'
import Inside from './Inside.vue'
import Indeterminate from './Indeterminate.vue'

import BasicCode from './Basic.vue?raw'
import CircleCode from './Circle.vue?raw'
import DashboardCode from './Dashboard.vue?raw'
import InsideCode from './Inside.vue?raw'
import IndeterminateCode from './Indeterminate.vue?raw'

export const demos = [
  {
    title: {
      'zh-CN': '默认在线形外展示进度和状态',
      'en-US': 'Default display progress and status outside linear'
    },
    description: {
      'zh-CN': '基础的进度条。',
      'en-US': 'Basic progress bar.'
    },
    component: Basic,
    code: BasicCode
  },
  {
    title: {
      'zh-CN': '可以在线形内展示进度信息',
      'en-US': 'Can display progress info inside linear'
    },
    description: {
      'zh-CN': '进度0-10%时数字位置出现在目前进度的右边区域。',
      'en-US': 'When progress is 0-10%, the number appears on the right side of the current progress.'
    },
    component: Inside,
    code: InsideCode
  },
  {
    title: {
      'zh-CN': '环形进度条',
      'en-US': 'Circular Progress'
    },
    description: {
      'zh-CN': '环形进度条。',
      'en-US': 'Circular progress bar.'
    },
    component: Circle,
    code: CircleCode
  },
  {
    title: {
      'zh-CN': '仪表盘进度条',
      'en-US': 'Dashboard Progress'
    },
    description: {
      'zh-CN': '仪表盘动画。',
      'en-US': 'Dashboard animation.'
    },
    component: Dashboard,
    code: DashboardCode
  },
  {
    title: {
      'zh-CN': '自定义格式与动画',
      'en-US': 'Custom Format and Animation'
    },
    description: {
      'zh-CN': '不确定进度动画以及自定义文字格式。',
      'en-US': 'Indeterminate animation and custom text format.'
    },
    component: Indeterminate,
    code: IndeterminateCode
  }
]

export const meta = {
  description: {
    'zh-CN': '展示操作的当前进度。',
    'en-US': 'Display the current progress of an operation.'
  }
}
