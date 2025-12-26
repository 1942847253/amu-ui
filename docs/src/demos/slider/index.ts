import Basic from './demo-basic.vue'
import Step from './demo-step.vue'
import Input from './demo-input.vue'
import Range from './demo-range.vue'
import Vertical from './demo-vertical.vue'
import Marks from './demo-marks.vue'

export const demos = [
  {
    key: 'basic',
    title: {
      'zh-CN': '基础用法',
      'en-US': 'Basic Usage'
    },
    description: {
      'zh-CN': '基础的滑块用法。可以使用 `v-model` 双向绑定数据。',
      'en-US': 'Basic usage of slider. You can use `v-model` for two-way data binding.'
    },
    component: Basic,
    code: (await import('./demo-basic.vue?raw')).default
  },
  {
    key: 'step',
    title: {
      'zh-CN': '离散值',
      'en-US': 'Discrete Values'
    },
    description: {
      'zh-CN': '设置 `step` 属性可以定义滑块的步长。',
      'en-US': 'Set the `step` property to define the step size of the slider.'
    },
    component: Step,
    code: (await import('./demo-step.vue?raw')).default
  },
  {
    key: 'input',
    title: {
      'zh-CN': '带输入框',
      'en-US': 'With Input'
    },
    description: {
      'zh-CN': '设置 `show-input` 属性可以在滑块右侧显示一个输入框，实现数值的精确控制。',
      'en-US': 'Set the `show-input` property to display an input box on the right side of the slider for precise control.'
    },
    component: Input,
    code: (await import('./demo-input.vue?raw')).default
  },
  {
    key: 'range',
    title: {
      'zh-CN': '范围选择',
      'en-US': 'Range Selection'
    },
    description: {
      'zh-CN': '设置 `range` 属性开启范围选择模式，此时 `v-model` 绑定值为数组 `[start, end]`。',
      'en-US': 'Set the `range` property to enable range selection mode. In this case, the bound value of `v-model` is an array `[start, end]`.'
    },
    component: Range,
    code: (await import('./demo-range.vue?raw')).default
  },
  {
    key: 'vertical',
    title: {
      'zh-CN': '垂直模式',
      'en-US': 'Vertical Mode'
    },
    description: {
      'zh-CN': '设置 `vertical` 属性并指定高度，可以垂直展示滑块。',
      'en-US': 'Set the `vertical` property and specify the height to display the slider vertically.'
    },
    component: Vertical,
    code: (await import('./demo-vertical.vue?raw')).default
  },
  {
    key: 'marks',
    title: {
      'zh-CN': '显示标记',
      'en-US': 'Marks'
    },
    description: {
      'zh-CN': '设置 `marks` 属性可以显示自定义刻度标记。',
      'en-US': 'Set the `marks` property to display custom marks.'
    },
    component: Marks,
    code: (await import('./demo-marks.vue?raw')).default
  }
]

export const meta = {
  description: {
    'zh-CN': '滑动输入条，用于在给定的范围内选择一个值或范围。',
    'en-US': 'A Slider component for displaying current value and intervals in range.'
  }
}
