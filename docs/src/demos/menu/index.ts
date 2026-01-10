import { DefaultMenu, Item, Sub, Group } from './demo-helper'
import Basic from './basic.vue?raw'
import Operations from './operations.vue?raw'
import ReplicaVertical from './replica-vertical.vue?raw'

import BasicDemo from './basic.vue'
import OperationsDemo from './operations.vue'
import ReplicaVerticalDemo from './replica-vertical.vue'

export const demos = [
  {
      title: {
          'zh-CN': '企业级垂直菜单',
          'en-US': 'Enterprise Vertical Menu'
      },
      description: {
          'zh-CN': '经典的企业级后台管理垂直菜单样式（包含悬浮、选中态、Logo 布局）。',
          'en-US': 'Classic enterprise admin vertical menu style (including hover, active states, and logo layout).'
      },
      code: ReplicaVertical,
      component: ReplicaVerticalDemo
  },
  {
    title: {
        'zh-CN': '顶部导航菜单',
        'en-US': 'Top Navigation Menu'
    },
    description: {
        'zh-CN': '水平导航模式，支持 Logo、菜单项与右侧操作区的组合布局。',
        'en-US': 'Horizontal navigation mode, supports layout combination of Logo, menu items, and right-side operations.'
    },
    code: Operations,
    component: OperationsDemo
  },
  {
    title: {
        'zh-CN': '基础用法',
        'en-US': 'Basic Usage'
    },
    description: {
        'zh-CN': '最基础的菜单结构，展示 SubMenu 与 MenuItem 的嵌套关系。',
        'en-US': 'Most basic menu structure, showing nesting of SubMenu and MenuItem.'
    },
    code: Basic,
    component: BasicDemo
  }
]

