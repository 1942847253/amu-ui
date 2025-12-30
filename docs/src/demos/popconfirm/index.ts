import basic from './basic.vue?raw'
import basicComp from './basic.vue'
import icon from './icon.vue?raw'
import iconComp from './icon.vue'
import description from './description.vue?raw'
import descriptionComp from './description.vue'
import custom from './custom.vue?raw'
import customComp from './custom.vue'
import asyncDemo from './async.vue?raw'
import asyncComp from './async.vue'

export const demos = [
  {
    id: 'basic',
    title: {
      'zh-CN': '基础用法',
      'en-US': 'Basic Usage'
    },
    description: {
      'zh-CN': '最简单的用法。',
      'en-US': 'The simplest usage.'
    },
    code: basic,
    component: basicComp
  },
  {
    id: 'icon',
    title: {
      'zh-CN': '图标',
      'en-US': 'Icon'
    },
    description: {
      'zh-CN': '使用 `icon` 属性显示图标。',
      'en-US': 'Use `icon` prop to show icon.'
    },
    code: icon,
    component: iconComp
  },
  {
    id: 'description',
    title: {
      'zh-CN': '描述',
      'en-US': 'Description'
    },
    description: {
      'zh-CN': '使用 `description` 属性显示详细描述。',
      'en-US': 'Use `description` prop to show detailed description.'
    },
    code: description,
    component: descriptionComp
  },
  {
    id: 'custom',
    title: {
      'zh-CN': '自定义按钮',
      'en-US': 'Custom Buttons'
    },
    description: {
      'zh-CN': '使用插槽自定义按钮。',
      'en-US': 'Use slots to customize buttons.'
    },
    code: custom,
    component: customComp
  },
  {
    id: 'async',
    title: {
      'zh-CN': '异步关闭',
      'en-US': 'Async Close'
    },
    description: {
      'zh-CN': '使用 `onBeforeConfirm` 属性处理异步关闭。返回 `Promise` 且 resolve `false` 可以阻止关闭。',
      'en-US': 'Use `onBeforeConfirm` prop to handle async close. Return `Promise` and resolve `false` to prevent closing.'
    },
    code: asyncDemo,
    component: asyncComp
  }
]
