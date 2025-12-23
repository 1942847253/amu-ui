import Basic from './Basic.vue?raw'
import Disabled from './Disabled.vue?raw'
import Text from './Text.vue?raw'
import Loading from './Loading.vue?raw'
import Async from './Async.vue?raw'
import Size from './Size.vue?raw'
import CustomColor from './CustomColor.vue?raw'

import BasicComp from './Basic.vue'
import DisabledComp from './Disabled.vue'
import TextComp from './Text.vue'
import LoadingComp from './Loading.vue'
import AsyncComp from './Async.vue'
import SizeComp from './Size.vue'
import CustomColorComp from './CustomColor.vue'

export const demos = [
  {
    path: 'Basic.vue',
    code: Basic,
    component: BasicComp,
    title: {
      'zh-CN': '基础用法',
      'en-US': 'Basic Usage'
    },
    description: {
      'zh-CN': '最简单的用法。',
      'en-US': 'The simplest usage.'
    }
  },
  {
    path: 'Disabled.vue',
    code: Disabled,
    component: DisabledComp,
    title: {
      'zh-CN': '禁用状态',
      'en-US': 'Disabled'
    },
    description: {
      'zh-CN': '设置 `disabled` 属性即可禁用开关。',
      'en-US': 'Set the `disabled` attribute to disable the switch.'
    }
  },
  {
    path: 'Text.vue',
    code: Text,
    component: TextComp,
    title: {
      'zh-CN': '文字和图标',
      'en-US': 'Text & Icon'
    },
    description: {
      'zh-CN': '带有文字或图标的开关。',
      'en-US': 'Switch with text or icon.'
    }
  },
  {
    path: 'Size.vue',
    code: Size,
    component: SizeComp,
    title: {
      'zh-CN': '尺寸',
      'en-US': 'Size'
    },
    description: {
      'zh-CN': '支持 `small`、`medium`、`large` 三种尺寸。',
      'en-US': 'Supports `small`, `medium`, `large` sizes.'
    }
  },
  {
    path: 'Loading.vue',
    code: Loading,
    component: LoadingComp,
    title: {
      'zh-CN': '加载中',
      'en-US': 'Loading'
    },
    description: {
      'zh-CN': '设置 `loading` 属性即可让开关处于加载中状态。',
      'en-US': 'Set the `loading` attribute to show loading state.'
    }
  },
  {
    path: 'Async.vue',
    code: Async,
    component: AsyncComp,
    title: {
      'zh-CN': '异步切换',
      'en-US': 'Async Switching'
    },
    description: {
      'zh-CN': '使用 `beforeChange` 属性可以拦截切换操作，支持异步操作。',
      'en-US': 'Use `beforeChange` property to intercept switching operations, supporting async operations.'
    }
  },
  {
    path: 'CustomColor.vue',
    code: CustomColor,
    component: CustomColorComp,
    title: {
      'zh-CN': '自定义颜色',
      'en-US': 'Custom Color'
    },
    description: {
      'zh-CN': '支持自定义开关的颜色。',
      'en-US': 'Support custom color for switch.'
    }
  }
]

export const meta = {
  title: 'Switch 开关',
  description: {
    'zh-CN': '开关选择器。',
    'en-US': 'Switching Selector.'
  }
}
