import type { DemoItem } from '../../components/DemoTabs.vue'

import Basic from './Basic.vue'
import BasicDemo from './Basic.vue?raw'
import WithSider from './WithSider.vue'
import WithSiderDemo from './WithSider.vue?raw'
import Collapsible from './Collapsible.vue'
import CollapsibleDemo from './Collapsible.vue?raw'
import RightSider from './RightSider.vue'
import RightSiderDemo from './RightSider.vue?raw'
import CustomSize from './CustomSize.vue'
import CustomSizeDemo from './CustomSize.vue?raw'
import ZeroCollapsedWidth from './ZeroCollapsedWidth.vue'
import ZeroCollapsedWidthDemo from './ZeroCollapsedWidth.vue?raw'

export const demos: DemoItem[] = [
  {
    key: 'basic',
    title: {
      'zh-CN': '基础布局',
      'en-US': 'Basic Layout'
    },
    description: {
      'zh-CN': '经典的上中下布局。',
      'en-US': 'Classic top-middle-bottom layout.'
    },
    component: Basic,
    code: BasicDemo
  },
  {
    key: 'with-sider',
    title: {
      'zh-CN': '侧边栏布局',
      'en-US': 'Layout with Sider'
    },
    description: {
      'zh-CN': '包含侧边栏的布局，侧边栏可以在左侧或右侧。',
      'en-US': 'Layout with sider, which can be on the left or right side.'
    },
    component: WithSider,
    code: WithSiderDemo
  },
  {
    key: 'collapsible',
    title: {
      'zh-CN': '可折叠侧边栏',
      'en-US': 'Collapsible Sider'
    },
    description: {
      'zh-CN': '侧边栏支持折叠功能，通过 collapsed 属性控制折叠状态。',
      'en-US': 'Sider supports collapse feature, controlled by collapsed prop.'
    },
    component: Collapsible,
    code: CollapsibleDemo
  },
  {
    key: 'right-sider',
    title: {
      'zh-CN': '右侧侧边栏',
      'en-US': 'Right Sider'
    },
    description: {
      'zh-CN': '通过 position="right" 将侧边栏放置在右侧。',
      'en-US': 'Place sider on the right side with position="right".'
    },
    component: RightSider,
    code: RightSiderDemo
  },
  {
    key: 'custom-size',
    title: {
      'zh-CN': '自定义尺寸',
      'en-US': 'Custom Size'
    },
    description: {
      'zh-CN': 'Header 和 Footer 可以自定义高度，Sider 可以自定义宽度。',
      'en-US': 'Header and Footer can have custom height, Sider can have custom width.'
    },
    component: CustomSize,
    code: CustomSizeDemo
  },
  {
    key: 'zero-collapsed-width',
    title: {
      'zh-CN': '完全收起',
      'en-US': 'Zero Collapsed Width'
    },
    description: {
      'zh-CN': '通过设置 collapsed-width 为 0，可以让侧边栏完全隐藏。',
      'en-US': 'Set collapsed-width to 0 to completely hide the sider.'
    },
    component: ZeroCollapsedWidth,
    code: ZeroCollapsedWidthDemo
  }
]

export const meta = {
  description: {
    'zh-CN': '协助进行页面级整体布局，提供 Layout、Header、Sider、Content、Footer 组件。',
    'en-US': 'Assist in page-level overall layout, providing Layout, Header, Sider, Content, and Footer components.'
  }
}
