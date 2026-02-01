import type { DemoItem } from '../../components/DemoTabs.vue'

import Basic from './Basic.vue'
import BasicCode from './Basic.vue?raw'
import Multiple from './Multiple.vue'
import MultipleCode from './Multiple.vue?raw'
import Disabled from './Disabled.vue'
import DisabledCode from './Disabled.vue?raw'
import Clearable from './Clearable.vue'
import ClearableCode from './Clearable.vue?raw'
import ShowLast from './ShowLast.vue'
import ShowLastCode from './ShowLast.vue?raw'
import Hover from './Hover.vue'
import HoverCode from './Hover.vue?raw'
import Size from './Size.vue'
import SizeCode from './Size.vue?raw'
import CustomOption from './CustomOption.vue'
import CustomOptionCode from './CustomOption.vue?raw'

export const demos: DemoItem[] = [
  {
    key: 'basic',
    title: {
      'zh-CN': '基础用法',
      'en-US': 'Basic Usage',
    },
    description: {
      'zh-CN': '使用 `v-model` 绑定选中路径。',
      'en-US': 'Use `v-model` to bind the selected path.',
    },
    component: Basic,
    code: BasicCode,
  },
  {
    key: 'multiple',
    title: {
      'zh-CN': '多选',
      'en-US': 'Multiple',
    },
    description: {
      'zh-CN': '通过 `multiple` 开启多选，选中项用 Tag 展示。',
      'en-US': 'Enable multiple selection via `multiple`, selected items are shown as tags.',
    },
    component: Multiple,
    code: MultipleCode,
  },
  {
    key: 'disabled',
    title: {
      'zh-CN': '禁用状态',
      'en-US': 'Disabled',
    },
    description: {
      'zh-CN': '通过 `disabled` 设置不可用状态。',
      'en-US': 'Set disabled state via `disabled`.',
    },
    component: Disabled,
    code: DisabledCode,
  },
  {
    key: 'clearable',
    title: {
      'zh-CN': '可清空',
      'en-US': 'Clearable',
    },
    description: {
      'zh-CN': '开启 `clearable` 后可一键清空选择。',
      'en-US': 'Enable `clearable` to clear the selection.',
    },
    component: Clearable,
    code: ClearableCode,
  },
  {
    key: 'show-last',
    title: {
      'zh-CN': '仅显示最后一级',
      'en-US': 'Show Last Level',
    },
    description: {
      'zh-CN': '设置 `show-all-levels` 为 `false` 仅显示末级。',
      'en-US': 'Set `show-all-levels` to `false` to show only the last level.',
    },
    component: ShowLast,
    code: ShowLastCode,
  },
  {
    key: 'hover',
    title: {
      'zh-CN': '悬停展开',
      'en-US': 'Hover to Expand',
    },
    description: {
      'zh-CN': '通过 `expand-trigger="hover"` 使用悬停展开。',
      'en-US': 'Use hover expand via `expand-trigger="hover"`.',
    },
    component: Hover,
    code: HoverCode,
  },
  {
    key: 'size',
    title: {
      'zh-CN': '不同尺寸',
      'en-US': 'Sizes',
    },
    description: {
      'zh-CN': '提供 `small`、`medium`、`large` 三种尺寸。',
      'en-US': 'Provides `small`, `medium`, and `large` sizes.',
    },
    component: Size,
    code: SizeCode,
  },
  {
    key: 'custom-option',
    title: {
      'zh-CN': '自定义选项',
      'en-US': 'Custom Option',
    },
    description: {
      'zh-CN': '使用 `option` 插槽自定义渲染内容。',
      'en-US': 'Use `option` slot to customize rendering.',
    },
    component: CustomOption,
    code: CustomOptionCode,
  },
]

export const meta = {
  title: {
    'zh-CN': 'Cascader 级联选择器',
    'en-US': 'Cascader',
  },
  description: {
    'zh-CN': '用于选择多级数据集合中的某一项。',
    'en-US': 'Used to select an option from a set of hierarchical data.',
  },
}
