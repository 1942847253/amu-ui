import Basic from './basic.vue'
import Disabled from './disabled.vue'
import Step from './step.vue'
import Strict from './strict.vue'
import Precision from './precision.vue'
import Size from './size.vue'
import ControlsPosition from './controls-position.vue'
import Status from './status.vue'

import BasicRaw from './basic.vue?raw'
import DisabledRaw from './disabled.vue?raw'
import StepRaw from './step.vue?raw'
import StrictRaw from './strict.vue?raw'
import PrecisionRaw from './precision.vue?raw'
import SizeRaw from './size.vue?raw'
import ControlsPositionRaw from './controls-position.vue?raw'
import StatusRaw from './status.vue?raw'

export const demos = [
  {
    path: 'basic.vue',
    title: {
      'zh-CN': '基础用法',
      'en-US': 'Basic Usage',
    },
    description: {
      'zh-CN': '数字输入框的基础用法。',
      'en-US': 'Basic usage of InputNumber.',
    },
    component: Basic,
    code: BasicRaw,
  },
  {
    path: 'disabled.vue',
    title: {
      'zh-CN': '禁用状态',
      'en-US': 'Disabled',
    },
    description: {
      'zh-CN': '通过设置 `disabled` 属性来禁用输入框。',
      'en-US': 'Disable the input by setting the `disabled` property.',
    },
    component: Disabled,
    code: DisabledRaw,
  },
  {
    path: 'step.vue',
    title: {
      'zh-CN': '步长',
      'en-US': 'Step',
    },
    description: {
      'zh-CN': '设置 `step` 属性可以控制步长。',
      'en-US': 'Set the `step` property to control the step size.',
    },
    component: Step,
    code: StepRaw,
  },
  {
    path: 'strict.vue',
    title: {
      'zh-CN': '严格步长',
      'en-US': 'Strict Step',
    },
    description: {
      'zh-CN': '`step-strictly` 属性接受一个 `boolean`。如果这个属性被设置为 `true`，则只能输入步长的倍数。',
      'en-US': 'The `step-strictly` prop accepts a `boolean`. If this prop is set to `true`, the input value can only be a multiple of step.',
    },
    component: Strict,
    code: StrictRaw,
  },
  {
    path: 'precision.vue',
    title: {
      'zh-CN': '精度',
      'en-US': 'Precision',
    },
    description: {
      'zh-CN': '设置 `precision` 属性可以控制数值精度。',
      'en-US': 'Set the `precision` property to control the numerical precision.',
    },
    component: Precision,
    code: PrecisionRaw,
  },
  {
    path: 'size.vue',
    title: {
      'zh-CN': '尺寸',
      'en-US': 'Size',
    },
    description: {
      'zh-CN': '提供三种尺寸：`large`、`medium` 和 `small`。',
      'en-US': 'Three sizes are available: `large`, `medium` and `small`.',
    },
    component: Size,
    code: SizeRaw,
  },
  {
    path: 'controls-position.vue',
    title: {
      'zh-CN': '按钮位置',
      'en-US': 'Controls Position',
    },
    description: {
      'zh-CN': '设置 `controls-position` 属性可以控制按钮位置。',
      'en-US': 'Set the `controls-position` property to control the position of the buttons.',
    },
    component: ControlsPosition,
    code: ControlsPositionRaw,
  },
  {
    path: 'status.vue',
    title: {
      'zh-CN': '状态',
      'en-US': 'Status',
    },
    description: {
      'zh-CN': '通过 `status` 属性设置输入框状态，可选值为 `error`、`warning`、`success`。',
      'en-US': 'Set the input status via the `status` prop, optional values: `error`, `warning`, `success`.',
    },
    component: Status,
    code: StatusRaw,
  },
]
