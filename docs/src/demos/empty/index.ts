import type { DemoItem } from '../../components/DemoTabs.vue'
import DemoBasic from './basic.vue?raw'
import DemoBasicComp from './basic.vue'
import DemoImage from './image.vue?raw'
import DemoImageComp from './image.vue'
import DemoSize from './size.vue?raw'
import DemoSizeComp from './size.vue'
import DemoBottom from './bottom.vue?raw'
import DemoBottomComp from './bottom.vue'

export const demos: DemoItem[] = [
  {
    key: 'basic',
    title: {
      'zh-CN': '基本用法',
      'en-US': 'Basic Usage',
    },
    description: {
      'zh-CN': '最简单的用法。',
      'en-US': 'Simple usage.',
    },
    code: DemoBasic,
    component: DemoBasicComp,
  },
  {
    key: 'image',
    title: {
      'zh-CN': '自定义图片',
      'en-US': 'Custom Image',
    },
    description: {
      'zh-CN': '通过 `image` 属性传入图片的 URL。',
      'en-US': 'Set image via `image` prop.',
    },
    code: DemoImage,
    component: DemoImageComp,
  },
  {
    key: 'size',
    title: {
      'zh-CN': '图片大小',
      'en-US': 'Image Size',
    },
    description: {
      'zh-CN': '通过 `image-size` 属性改变默认图片大小。',
      'en-US': 'Change image size via `image-size` prop.',
    },
    code: DemoSize,
    component: DemoSizeComp,
  },
  {
    key: 'bottom',
    title: {
      'zh-CN': '底部内容',
      'en-US': 'Bottom Content',
    },
    description: {
      'zh-CN': '通过默认插槽在底部添加内容。',
      'en-US': 'Add content at bottom via default slot.',
    },
    code: DemoBottom,
    component: DemoBottomComp,
  },
]

export const meta = {
  description: {
    'zh-CN': '空状态时的展示占位图。',
    'en-US': 'Placeholder for empty state.',
  },
}
