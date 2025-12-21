import Basic from './Basic.vue?raw'
import BasicComp from './Basic.vue'
import Disabled from './Disabled.vue?raw'
import DisabledComp from './Disabled.vue'
import Group from './Group.vue?raw'
import GroupComp from './Group.vue'
import Button from './Button.vue?raw'
import ButtonComp from './Button.vue'
import Size from './Size.vue?raw'
import SizeComp from './Size.vue'
import Border from './Border.vue?raw'
import BorderComp from './Border.vue'

export const demos = [
  {
    path: 'Basic.vue',
    code: Basic,
    component: BasicComp,
    title: {
      'zh-CN': '基础用法',
      'en-US': 'Basic Usage',
    },
    description: {
      'zh-CN': 'Radio 的基础用法。',
      'en-US': 'Basic usage of Radio.',
    },
  },
  {
    path: 'Disabled.vue',
    code: Disabled,
    component: DisabledComp,
    title: {
      'zh-CN': '禁用状态',
      'en-US': 'Disabled State',
    },
    description: {
      'zh-CN': '通过 `disabled` 属性禁用单选框。',
      'en-US': 'Disable radio by `disabled` prop.',
    },
  },
  {
    path: 'Group.vue',
    code: Group,
    component: GroupComp,
    title: {
      'zh-CN': '单选框组',
      'en-US': 'Radio Group',
    },
    description: {
      'zh-CN': '结合 `amu-radio-group` 元素和子元素 `amu-radio` 可以实现单选组。',
      'en-US': 'Combine `amu-radio-group` with `amu-radio` to achieve a radio group.',
    },
  },
  {
    path: 'Button.vue',
    code: Button,
    component: ButtonComp,
    title: {
      'zh-CN': '按钮样式',
      'en-US': 'Button Style',
    },
    description: {
      'zh-CN': '按钮样式的单选组合。',
      'en-US': 'Button style radio group.',
    },
  },
  {
    path: 'Size.vue',
    code: Size,
    component: SizeComp,
    title: {
      'zh-CN': '尺寸',
      'en-US': 'Size',
    },
    description: {
      'zh-CN': '不同尺寸的单选框。',
      'en-US': 'Different sizes of radio.',
    },
  },
  {
    path: 'Border.vue',
    code: Border,
    component: BorderComp,
    title: {
      'zh-CN': '带有边框',
      'en-US': 'With Border',
    },
    description: {
      'zh-CN': '设置 `border` 属性可以渲染为带有边框的单选框。',
      'en-US': 'Set `border` prop to render radio with border.',
    },
  },
]

export const meta = {
  title: 'Radio 单选框',
  type: 'Data Entry',
}
