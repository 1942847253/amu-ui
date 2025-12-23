import type { DemoItem } from '../../types'

// 导入 demo 代码（使用 ?raw 后缀）
import BasicCode from './Basic.vue?raw'
import DisabledCode from './Disabled.vue?raw'
import IndeterminateCode from './Indeterminate.vue?raw'
import SizeCode from './Size.vue?raw'
import GroupCode from './Group.vue?raw'
import LimitCode from './Limit.vue?raw'
import CustomCode from './Custom.vue?raw'

// 导入 demo 组件
import Basic from './Basic.vue'
import Disabled from './Disabled.vue'
import Indeterminate from './Indeterminate.vue'
import Size from './Size.vue'
import Group from './Group.vue'
import Limit from './Limit.vue'
import Custom from './Custom.vue'

export const demos: DemoItem[] = [
  {
    id: 'basic',
    title: {
      'zh-CN': '基础用法',
      'en-US': 'Basic Usage',
    },
    description: {
      'zh-CN': '最简单的用法，通过 `v-model` 绑定选中状态。',
      'en-US': 'Basic usage with `v-model` binding.',
    },
    component: Basic,
    code: BasicCode,
  },
  {
    id: 'disabled',
    title: {
      'zh-CN': '禁用状态',
      'en-US': 'Disabled',
    },
    description: {
      'zh-CN': '通过 `disabled` 属性禁用复选框。',
      'en-US': 'Disable checkbox with `disabled` prop.',
    },
    component: Disabled,
    code: DisabledCode,
  },
  {
    id: 'indeterminate',
    title: {
      'zh-CN': '半选状态',
      'en-US': 'Indeterminate',
    },
    description: {
      'zh-CN':
        '使用 `indeterminate` 属性实现半选状态，常用于全选场景。半选状态表示部分子项被选中。',
      'en-US':
        'Use `indeterminate` prop for partial selection, commonly used in "select all" scenarios.',
    },
    component: Indeterminate,
    code: IndeterminateCode,
  },
  {
    id: 'size',
    title: {
      'zh-CN': '不同尺寸',
      'en-US': 'Sizes',
    },
    description: {
      'zh-CN': '通过 `size` 属性设置复选框尺寸，支持 `small`、`medium`、`large` 三种尺寸。',
      'en-US':
        'Set checkbox size with `size` prop. Supports `small`, `medium`, and `large`.',
    },
    component: Size,
    code: SizeCode,
  },
  {
    id: 'group',
    title: {
      'zh-CN': '复选框组',
      'en-US': 'Checkbox Group',
    },
    description: {
      'zh-CN':
        '使用 `CheckboxGroup` 组件管理多个复选框。支持通过 `options` 配置快速生成，或使用默认插槽自定义内容。',
      'en-US':
        'Use `CheckboxGroup` to manage multiple checkboxes. Supports quick generation via `options` or custom content via default slot.',
    },
    component: Group,
    code: GroupCode,
  },
  {
    id: 'limit',
    title: {
      'zh-CN': '数量限制',
      'en-US': 'Limit',
    },
    description: {
      'zh-CN':
        '通过 `min` 和 `max` 属性限制复选框组的最小和最大选中数量。',
      'en-US':
        'Limit the minimum and maximum number of checked items with `min` and `max` props.',
    },
    component: Limit,
    code: LimitCode,
  },
  {
    id: 'custom',
    title: {
      'zh-CN': '自定义内容',
      'en-US': 'Custom Content',
    },
    description: {
      'zh-CN': '通过默认插槽自定义复选框的标签内容，支持富内容展示。',
      'en-US': 'Customize checkbox label content with default slot.',
    },
    component: Custom,
    code: CustomCode,
  },
]

export const meta = {
  description: {
    'zh-CN': '在一组可选项中进行多选。',
    'en-US': 'Select multiple options from a set of choices.',
  },
}
