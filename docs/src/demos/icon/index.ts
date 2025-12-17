import Basic from './Basic.vue'
import BasicCode from './Basic.vue?raw'

import Size from './Size.vue'
import SizeCode from './Size.vue?raw'

import Color from './Color.vue'
import ColorCode from './Color.vue?raw'

import Stroke from './Stroke.vue'
import StrokeCode from './Stroke.vue?raw'

import Spin from './Spin.vue'
import SpinCode from './Spin.vue?raw'

import List from './List.vue'

export const demos = [
  {
    title: '基础用法',
    description: 'Icon 组件的基础用法。',
    component: Basic,
    code: BasicCode
  },
  {
    title: '尺寸',
    description: '可以通过 size 属性调整图标尺寸。',
    component: Size,
    code: SizeCode
  },
  {
    title: '颜色',
    description: '可以通过 color 属性调整图标颜色。',
    component: Color,
    code: ColorCode
  },
  {
    title: '线条粗细',
    description: '调整图标的线条粗细。',
    component: Stroke,
    code: StrokeCode
  },
  {
    title: '旋转',
    description: '可以通过 spin 属性让图标旋转。',
    component: Spin,
    code: SpinCode
  },
  {
    title: '图标列表',
    description: '所有可用图标的列表。',
    component: List,
    code:''
  }
]
export const meta = {
  description: '语义化的矢量图形。'
}
