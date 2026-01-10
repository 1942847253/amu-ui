import Basic from './basic.vue'
import Half from './half.vue'
import Text from './text.vue'
import Readonly from './readonly.vue'
import More from './more.vue'
import Mapping from './mapping.vue'
import Misc from './misc.vue'

import BasicRaw from './basic.vue?raw'
import HalfRaw from './half.vue?raw'
import TextRaw from './text.vue?raw'
import ReadonlyRaw from './readonly.vue?raw'
import MoreRaw from './more.vue?raw'
import MappingRaw from './mapping.vue?raw'
import MiscRaw from './misc.vue?raw'

export const demos = [
  {
    path: 'basic',
    title: {
      'zh-CN': '基础用法',
      'en-US': 'Basic Usage',
    },
    description: {
      'zh-CN': '评分默认被分为三个等级，可以利用 `colors` 属性设置不同等级的颜色。',
      'en-US': 'Rate is divided into three levels by default, which can be distinguished by different colors using `colors` property.',
    },
    component: Basic,
    code: BasicRaw,
  },
  {
      path: 'half',
      title: {
          'zh-CN': '半星',
          'en-US': 'Half Star',
      },
      description: {
          'zh-CN': '支持选择半星。',
          'en-US': 'Support selecting half star.',
      },
      component: Half,
      code: HalfRaw,
  },
  {
      path: 'text',
      title: {
          'zh-CN': '辅助文字',
          'en-US': 'Auxiliary Text',
      },
      description: {
          'zh-CN': '用辅助文字直接地表达对应分数。',
          'en-US': 'Use auxiliary text to display rating score directly.',
      },
      component: Text,
      code: TextRaw,
  },
   {
      path: 'more',
      title: {
          'zh-CN': '更多配置',
          'en-US': 'More Configurations',
      },
      description: {
          'zh-CN': '包含自定义图标、尺寸等。',
          'en-US': 'Includes custom icons, sizes, etc.',
      },
      component: More,
      code: MoreRaw,
  },
  {
      path: 'mapping',
      title: {
          'zh-CN': '映射配置',
          'en-US': 'Mapping Configuration',
      },
      description: {
          'zh-CN': '可以通过对象来实现不同分段的颜色和图标映射。',
          'en-US': 'Different segments of color and icon mapping can be achieved through objects.',
      },
      component: Mapping,
      code: MappingRaw,
  },
  {
      path: 'misc',
      title: {
          'zh-CN': '其他配置',
          'en-US': 'Other Configurations',
      },
      description: {
          'zh-CN': '包含自定义步长、最大分值、禁止清空等。',
          'en-US': 'Includes custom step, max score, disable clear, etc.',
      },
      component: Misc,
      code: MiscRaw,
  },
  {
      path: 'readonly',
      title: {
          'zh-CN': '只读',
          'en-US': 'Readonly',
      },
      description: {
          'zh-CN': '只读的评分，通常用于展示。',
          'en-US': 'Readonly Rate, usually for display.',
      },
      component: Readonly,
      code: ReadonlyRaw,
  },
]
