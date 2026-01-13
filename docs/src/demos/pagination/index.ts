import type { DemoItem } from '../../types'
import Basic from './basic.vue?raw'
import More from './more.vue?raw'
import Simple from './simple.vue?raw'
import Sizes from './sizes.vue?raw'
import Background from './background.vue?raw'

import BasicComp from './basic.vue'
import MoreComp from './more.vue'
import SimpleComp from './simple.vue'
import SizesComp from './sizes.vue'
import BackgroundComp from './background.vue'

export const demos: DemoItem[] = [
  {
    key: 'basic',
    title: {
      'zh-CN': '基础用法',
      'en-US': 'Basic Usage'
    },
    description: {
      'zh-CN': '基础的分页用法。',
      'en-US': 'Basic pagination usage.'
    },
    code: Basic,
    component: BasicComp
  },
  {
    key: 'background',
    title: {
      'zh-CN': '无背景样式',
      'en-US': 'No Background'
    },
    description: {
      'zh-CN': '设置 `background` 为 `false` 可移除背景色（默认为 `true`）。',
      'en-US': 'Set `background` to `false` to remove the background color (default is `true`).'
    },
    code: Background,
    component: BackgroundComp
  },
  {
    key: 'more',
    title: {
      'zh-CN': '更多配置',
      'en-US': 'More Configurations'
    },
    description: {
      'zh-CN': '支持调整每页显示数量 `showSizeChanger`，快速跳转 `showQuickJumper`，以及显示总数 `showTotal`。',
      'en-US': 'Support changing page size `showSizeChanger`, quick jump `showQuickJumper`, and showing total `showTotal`.'
    },
    code: More,
    component: MoreComp
  },
  {
    key: 'simple',
    title: {
      'zh-CN': '简洁模式',
      'en-US': 'Simple Mode'
    },
    description: {
      'zh-CN': '简洁的分页模式，同样支持 `showSizeChanger`。',
      'en-US': 'Simple pagination mode, also supports `showSizeChanger`.'
    },
    code: Simple,
    component: SimpleComp
  },
  {
    key: 'sizes',
    title: {
      'zh-CN': '不同尺寸',
      'en-US': 'Sizes'
    },
    description: {
      'zh-CN': '提供三种尺寸：`small`（小）、`default`（默认）、`large`（大）。',
      'en-US': 'Three sizes are provided: `small`, `default`, `large`.'
    },
    code: Sizes,
    component: SizesComp
  }
]
