import Basic from './Basic.vue?raw'
import BasicComp from './Basic.vue'
import Multiple from './Multiple.vue?raw'
import MultipleComp from './Multiple.vue'
import Clearable from './Clearable.vue?raw'
import ClearableComp from './Clearable.vue'
import Filterable from './Filterable.vue?raw'
import FilterableComp from './Filterable.vue'
import Size from './Size.vue?raw'
import SizeComp from './Size.vue'
import Disabled from './Disabled.vue?raw'
import DisabledComp from './Disabled.vue'
import CustomOption from './CustomOption.vue?raw'
import CustomOptionComp from './CustomOption.vue'

export const demos = [
  {
    key: 'basic',
    title: {
      'zh-CN': '基础用法',
      'en-US': 'Basic Usage',
    },
    description: {
      'zh-CN': '适用广泛的基础单选',
      'en-US': 'Basic single select',
    },
    code: Basic,
    component: BasicComp,
  },
  {
    key: 'multiple',
    title: {
      'zh-CN': '多选',
      'en-US': 'Multiple Select',
    },
    description: {
      'zh-CN': '适用性较广的基础多选，用 Tag 展示已选项',
      'en-US': 'Basic multiple select',
    },
    code: Multiple,
    component: MultipleComp,
  },
  {
    key: 'disabled',
    title: {
      'zh-CN': '禁用状态',
      'en-US': 'Disabled',
    },
    description: {
      'zh-CN': '选择器不可用状态',
      'en-US': 'Disabled state',
    },
    code: Disabled,
    component: DisabledComp,
  },
  {
    key: 'clearable',
    title: {
      'zh-CN': '可清空',
      'en-US': 'Clearable',
    },
    description: {
      'zh-CN': '包含清空按钮，可将选择器清空为初始状态',
      'en-US': 'Clearable select',
    },
    code: Clearable,
    component: ClearableComp,
  },
  {
    key: 'filterable',
    title: {
      'zh-CN': '可搜索',
      'en-US': 'Filterable',
    },
    description: {
      'zh-CN': '可以利用搜索功能快速查找选项',
      'en-US': 'Filterable select',
    },
    code: Filterable,
    component: FilterableComp,
  },
  {
    key: 'size',
    title: {
      'zh-CN': '尺寸',
      'en-US': 'Size',
    },
    description: {
      'zh-CN': '提供三种尺寸：大、默认、小',
      'en-US': 'Options: large, default, small',
    },
    code: Size,
    component: SizeComp,
  },
  {
    key: 'custom-option',
    title: {
      'zh-CN': '自定义选项',
      'en-US': 'Custom Option',
    },
    description: {
      'zh-CN': '自定义选项的渲染模板',
      'en-US': 'Customize the rendering template of options',
    },
    code: CustomOption,
    component: CustomOptionComp,
  },
]

export const meta = {
  title: {
    'zh-CN': 'Select 选择器',
    'en-US': 'Select',
  },
  description: {
    'zh-CN': '当选项过多时，使用下拉菜单展示并选择内容。',
    'en-US': 'When there are plenty of options, use a drop-down menu to display and select desired ones.',
  },
}
