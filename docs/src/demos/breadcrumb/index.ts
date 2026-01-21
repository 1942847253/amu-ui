import Basic from './Basic.vue?raw'
import Icon from './Icon.vue?raw'
import Separator from './Separator.vue?raw'
import Collapsing from './Collapsing.vue?raw'
import Router from './Router.vue?raw'
import BasicComp from './Basic.vue'
import IconComp from './Icon.vue'
import SeparatorComp from './Separator.vue'
import CollapsingComp from './Collapsing.vue'
import RouterComp from './Router.vue'

export const demos = [
  {
    path: 'Basic',
    component: BasicComp,
    code: Basic,
    title: {
      'zh-CN': '基础用法',
      'en-US': 'Basic Usage',
    },
    description: {
      'zh-CN': '最基础的面包屑用法。',
      'en-US': 'Basic usage of Breadcrumb.',
    },
  },
  {
    path: 'Icon',
    component: IconComp,
    code: Icon,
    title: {
      'zh-CN': '带图标',
      'en-US': 'With Icon',
    },
    description: {
      'zh-CN': '通过 `icon` 插槽或属性添加图标。',
      'en-US': 'Add icons via `icon` slot or prop.',
    },
  },
  {
    path: 'Separator',
    component: SeparatorComp,
    code: Separator,
    title: {
      'zh-CN': '自定义分隔符',
      'en-US': 'Custom Separator',
    },
    description: {
      'zh-CN': '通过 `separator` 或 `separator-icon` 自定义分隔符。',
      'en-US': 'Customize separator via `separator` or `separator-icon`.',
    },
  },
  {
    path: 'Router',
    component: RouterComp,
    code: Router,
    title: {
      'zh-CN': '配置模式 (路由集成)',
      'en-US': 'Configuration Mode (Router Integration)',
    },
    description: {
      'zh-CN': '直接传入 `routes` 数组生成面包屑，支持下拉菜单。',
      'en-US': 'Pass `routes` array to generate breadcrumbs, supports dropdown menu.',
    },
  },
  {
    path: 'Collapsing',
    component: CollapsingComp,
    code: Collapsing,
    title: {
      'zh-CN': '折叠长路径',
      'en-US': 'Collapse Long Path',
    },
    description: {
      'zh-CN': '设置 `max-items` 属性来折叠超长的路径。',
      'en-US': 'Set `max-items` prop to collapse long paths.',
    },
  },
]

export const meta = {
  description: {
    'zh-CN': '显示当前页面的路径，快速返回之前的任意页面。',
    'en-US': 'Displays the path to the current page, allowing you to quickly return to previous pages.',
  },
}
