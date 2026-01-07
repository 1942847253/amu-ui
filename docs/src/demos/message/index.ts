import DemoBasic from './demo-basic.vue?raw'
import DemoTypes from './demo-types.vue?raw'
import DemoLoading from './demo-loading.vue?raw'
import DemoClose from './demo-close.vue?raw'
import DemoRawHtml from './demo-raw-html.vue?raw'
import DemoCenter from './demo-center.vue?raw'
import DemoIcon from './demo-icon.vue?raw'
import DemoPlacement from './demo-placement.vue?raw'

import CompBasic from './demo-basic.vue'
import CompTypes from './demo-types.vue'
import CompLoading from './demo-loading.vue'
import CompClose from './demo-close.vue'
import CompRawHtml from './demo-raw-html.vue'
import CompCenter from './demo-center.vue'
import CompIcon from './demo-icon.vue'
import CompPlacement from './demo-placement.vue'

export const demos = [
  {
    id: 'basic',
    title: {
      'zh-CN': '基础用法',
      'en-US': 'Basic Usage',
    },
    description: {
      'zh-CN': 'Message 的基础用法。',
      'en-US': 'Basic usage of Message.',
    },
    code: DemoBasic,
    component: CompBasic,
  },
  {
    id: 'types',
    title: {
      'zh-CN': '不同状态',
      'en-US': 'Types',
    },
    description: {
      'zh-CN': '用来显示「成功、警告、消息、错误」类的操作反馈。',
      'en-US': 'Used for different state tips.',
    },
    code: DemoTypes,
    component: CompTypes,
  },
  {
    id: 'close',
    title: {
      'zh-CN': '可关闭',
      'en-US': 'Closable',
    },
    description: {
      'zh-CN': '可以添加关闭按钮。',
      'en-US': 'A closeable message.',
    },
    code: DemoClose,
    component: CompClose,
  },
  {
    id: 'center',
    title: {
      'zh-CN': '文字居中',
      'en-US': 'Centered Content',
    },
    description: {
      'zh-CN': '使用 `center` 属性让文字水平居中。',
      'en-US': 'Use the `center` attribute to center the text.',
    },
    code: DemoCenter,
    component: CompCenter,
  },
  {
    id: 'raw-html',
    title: {
      'zh-CN': '使用 HTML 片段',
      'en-US': 'Use HTML String',
    },
    description: {
      'zh-CN': '`message` 属性支持传入 HTML 片段。',
      'en-US': 'The `message` property can be set as an HTML string.',
    },
    code: DemoRawHtml,
    component: CompRawHtml,
  },
  {
    id: 'icon',
    title: {
      'zh-CN': '自定义图标',
      'en-US': 'Custom Icon',
    },
    description: {
      'zh-CN': '可以传入自定义图标覆盖默认图标。',
      'en-US': 'You can use a unique icon for the message.',
    },
    code: DemoIcon,
    component: CompIcon,
  },
  {
    id: 'placement',
    title: {
      'zh-CN': '弹出位置',
      'en-US': 'Placement',
    },
    description: {
      'zh-CN': '自定义 Message 弹出的位置。',
      'en-US': 'Customize the placement of the message.',
    },
    code: DemoPlacement,
    component: CompPlacement,
  },
  {
    id: 'loading',
    title: {
      'zh-CN': '加载与更新',
      'en-US': 'Loading & Update',
    },
    description: {
      'zh-CN': '通过 ID 更新消息内容。',
      'en-US': 'Update message content by ID.',
    },
    code: DemoLoading,
    component: CompLoading,
  },
]

export const meta = {
  title: 'Message 全局提示',
  description: {
    'zh-CN': '在页面角落浮出消息，用于全局通知。',
    'en-US': 'Show messages in the corner of the page for global notifications.',
  },
}
