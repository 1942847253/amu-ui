import Basic from './Basic.vue?raw'
import Size from './Size.vue?raw'
import Clearable from './Clearable.vue?raw'
import Password from './Password.vue?raw'
import Status from './Status.vue?raw'
import Limit from './Limit.vue?raw'
import Format from './Format.vue?raw'
import Group from './Group.vue?raw'
import Variant from './Variant.vue?raw'
import Icon from './Icon.vue?raw'

import BasicComp from './Basic.vue'
import SizeComp from './Size.vue'
import ClearableComp from './Clearable.vue'
import PasswordComp from './Password.vue'
import StatusComp from './Status.vue'
import LimitComp from './Limit.vue'
import FormatComp from './Format.vue'
import GroupComp from './Group.vue'
import VariantComp from './Variant.vue'
import IconComp from './Icon.vue'

export const demos = [
  {
    path: 'basic',
    title: {
      'zh-CN': '基础用法',
      'en-US': 'Basic Usage'
    },
    description: {
      'zh-CN': '最简单的用法。',
      'en-US': 'The simplest usage.'
    },
    component: BasicComp,
    code: Basic
  },
  {
    path: 'variant',
    title: {
      'zh-CN': '风格变体',
      'en-US': 'Variants'
    },
    description: {
      'zh-CN': '提供 `outline` (默认) 和 `filled` 两种风格。',
      'en-US': 'Two variants are available: `outline` (default) and `filled`.'
    },
    component: VariantComp,
    code: Variant
  },
  {
    path: 'size',
    title: {
      'zh-CN': '三种尺寸',
      'en-US': 'Three Sizes'
    },
    description: {
      'zh-CN': '提供 `large`、`medium`、`small` 三种尺寸。',
      'en-US': 'Three sizes are available: `large`, `medium`, and `small`.'
    },
    component: SizeComp,
    code: Size
  },
  {
    path: 'clearable',
    title: {
      'zh-CN': '可清空',
      'en-US': 'Clearable'
    },
    description: {
      'zh-CN': '使用 `clearable` 属性即可得到一个可清空的输入框。',
      'en-US': 'Use `clearable` prop to get a clearable input.'
    },
    component: ClearableComp,
    code: Clearable
  },
  {
    path: 'password',
    title: {
      'zh-CN': '密码框',
      'en-US': 'Password Input'
    },
    description: {
      'zh-CN': '使用 `show-password` 属性即可得到一个可切换显示/隐藏的密码框。',
      'en-US': 'Use `show-password` prop to get a password input with toggle.'
    },
    component: PasswordComp,
    code: Password
  },
  {
    path: 'status',
    title: {
      'zh-CN': '状态',
      'en-US': 'Status'
    },
    description: {
      'zh-CN': '通过 `status` 属性设置校验状态。',
      'en-US': 'Set validation status via `status` prop.'
    },
    component: StatusComp,
    code: Status
  },
  {
    path: 'icon',
    title: {
      'zh-CN': '带图标',
      'en-US': 'With Icon'
    },
    description: {
      'zh-CN': '可以通过 `#prefix` / `#suffix` 插槽来添加图标。',
      'en-US': 'Add icons via `#prefix` / `#suffix` slots.'
    },
    component: IconComp,
    code: Icon
  },
  {
    path: 'limit',
    title: {
      'zh-CN': '长度限制',
      'en-US': 'Length Limit'
    },
    description: {
      'zh-CN': '支持 `maxlength` 和 `maxcharacter` (中文算2字符) 限制，配合 `show-limit-number` 显示统计。',
      'en-US': 'Support `maxlength` and `maxcharacter` (Chinese counts as 2 chars) limits, with `show-limit-number` to display statistics.'
    },
    component: LimitComp,
    code: Limit
  },
  {
    path: 'format',
    title: {
      'zh-CN': '格式化',
      'en-US': 'Formatting'
    },
    description: {
      'zh-CN': '配合 `formatter` 和 `parser` 属性，可以格式化展示内容。',
      'en-US': 'Use `formatter` and `parser` props to format display content.'
    },
    component: FormatComp,
    code: Format
  },
  {
    path: 'group',
    title: {
      'zh-CN': '组合',
      'en-US': 'Group'
    },
    description: {
      'zh-CN': '输入框组合，支持前后缀和前置/后置元素。',
      'en-US': 'Input group, supporting prefix/suffix and prepend/append elements.'
    },
    component: GroupComp,
    code: Group
  }
]

export const meta = {
  title: 'Input 输入框',
  type: 'Data Entry'
}
