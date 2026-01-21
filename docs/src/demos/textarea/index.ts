import Basic from './Basic.vue'
import BasicCode from './Basic.vue?raw'
import Size from './Size.vue'
import SizeCode from './Size.vue?raw'
import Variant from './Variant.vue'
import VariantCode from './Variant.vue?raw'
import Autosize from './Autosize.vue'
import AutosizeCode from './Autosize.vue?raw'
import Resize from './Resize.vue'
import ResizeCode from './Resize.vue?raw'
import Status from './Status.vue'
import StatusCode from './Status.vue?raw'
import WordLimit from './WordLimit.vue'
import WordLimitCode from './WordLimit.vue?raw'
import Disabled from './Disabled.vue'
import DisabledCode from './Disabled.vue?raw'
import Readonly from './Readonly.vue'
import ReadonlyCode from './Readonly.vue?raw'

export const demos = [
  {
    path: 'basic',
    title: {
      'zh-CN': '基础用法',
      'en-US': 'Basic Usage'
    },
    description: {
      'zh-CN': '多行文本框的基础用法。',
      'en-US': 'Basic usage of textarea.'
    },
    component: Basic,
    code: BasicCode
  },
  {
    path: 'size',
    title: {
      'zh-CN': '尺寸',
      'en-US': 'Size'
    },
    description: {
      'zh-CN': '提供 `small`、`medium`、`large` 三种尺寸，默认为 `medium`。',
      'en-US': 'Three sizes are available: `small`, `medium`, and `large`. default is `medium`.'
    },
    component: Size,
    code: SizeCode
  },
  {
    path: 'variant',
    title: {
      'zh-CN': '风格变体',
      'en-US': 'Variant'
    },
    description: {
      'zh-CN': '提供 `outline` 和 `filled` 两种风格，默认为 `outline`。',
      'en-US': 'Two variants are available: `outline` and `filled`. default is `outline`.'
    },
    component: Variant,
    code: VariantCode
  },
  {
    path: 'autosize',
    title: {
      'zh-CN': '自适应高度',
      'en-US': 'Auto Size'
    },
    description: {
      'zh-CN': '设置 `autosize` 属性可以使文本框高度根据内容自动调整。',
      'en-US': 'Textarea height adjusts automatically based on content when `autosize` is set.'
    },
    component: Autosize,
    code: AutosizeCode
  },
  {
    path: 'resize',
    title: {
      'zh-CN': '调整大小',
      'en-US': 'Resize'
    },
    description: {
      'zh-CN': '通过 `resize` 属性控制文本框的可缩放方向。',
      'en-US': 'Control resize direction via `resize` prop.'
    },
    component: Resize,
    code: ResizeCode
  },
  {
    path: 'status',
    title: {
      'zh-CN': '状态',
      'en-US': 'Status'
    },
    description: {
      'zh-CN': '通过 `status` 属性设置文本框的状态（错误/警告/成功）。',
      'en-US': 'Set textarea status (error/warning/success) via `status` prop.'
    },
    component: Status,
    code: StatusCode
  },
  {
    path: 'word-limit',
    title: {
      'zh-CN': '字数统计',
      'en-US': 'Word Limit'
    },
    description: {
      'zh-CN': '设置 `maxlength` 和 `show-word-limit` 属性来显示字数统计。',
      'en-US': 'Show word limit by setting `maxlength` and `show-word-limit`.'
    },
    component: WordLimit,
    code: WordLimitCode
  },
  {
    path: 'disabled',
    title: {
      'zh-CN': '禁用状态',
      'en-US': 'Disabled State'
    },
    description: {
      'zh-CN': '通过 `disabled` 属性禁用文本框。',
      'en-US': 'Disable textarea via `disabled` prop.'
    },
    component: Disabled,
    code: DisabledCode
  },
  {
    path: 'readonly',
    title: {
      'zh-CN': '只读状态',
      'en-US': 'Readonly State'
    },
    description: {
      'zh-CN': '通过 `readonly` 属性设置文本框为只读状态。',
      'en-US': 'Set textarea to readonly via `readonly` prop.'
    },
    component: Readonly,
    code: ReadonlyCode
  }
]
