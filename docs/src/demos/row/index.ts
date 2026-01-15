import Basic from './basic.vue'
import BasicCode from './basic.vue?raw'
import Gutter from './gutter.vue'
import GutterCode from './gutter.vue?raw'
import Responsive from './responsive.vue'
import ResponsiveCode from './responsive.vue?raw'
import Alignment from './alignment.vue'
import AlignmentCode from './alignment.vue?raw'
import Offset from './offset.vue'
import OffsetCode from './offset.vue?raw'
import Order from './order.vue'
import OrderCode from './order.vue?raw'
import Flex from './flex.vue'
import FlexCode from './flex.vue?raw'
import Nested from './nested.vue'
import NestedCode from './nested.vue?raw'
import CustomColumns from './custom-columns.vue'
import CustomColumnsCode from './custom-columns.vue?raw'

export const demos = [
  {
    path: 'basic',
    title: {
      'zh-CN': '基础布局',
      'en-US': 'Basic Layout'
    },
    description: {
      'zh-CN': '使用 `row` 和 `col` 组件进行基础布局。',
      'en-US': 'Use `row` and `col` to create basic grid layout.'
    },
    component: Basic,
    code: BasicCode
  },
  {
    path: 'gutter',
    title: {
      'zh-CN': '区块间隔',
      'en-US': 'Column spacing'
    },
    description: {
      'zh-CN': '栅格间隔。',
      'en-US': 'Grid spacing.'
    },
    component: Gutter,
    code: GutterCode
  },
  {
    path: 'offset',
    title: {
      'zh-CN': '列偏移',
      'en-US': 'Column Offset'
    },
    description: {
      'zh-CN': '使用 `offset` 属性指定分栏偏移的栏数。',
      'en-US': 'Specify the number of columns to offset by using the `offset` attribute.'
    },
    component: Offset,
    code: OffsetCode
  },
  {
    path: 'alignment',
    title: {
      'zh-CN': '对齐方式',
      'en-US': 'Alignment'
    },
    description: {
      'zh-CN': '通过 `justify` 和 `align` 来定义子元素的排版方式。',
      'en-US': 'Use `justify` and `align` to define the layout of child elements.'
    },
    component: Alignment,
    code: AlignmentCode
  },
  {
    path: 'order',
    title: {
      'zh-CN': '列排序',
      'en-US': 'Column Ordering'
    },
    description: {
      'zh-CN': '通过 `order` 属性改变列的视觉顺序。',
      'en-US': 'Change the visual order of columns by `order` prop.'
    },
    component: Order,
    code: OrderCode
  },
  {
    path: 'flex',
    title: {
      'zh-CN': 'Flex 布局',
      'en-US': 'Flex Layout'
    },
    description: {
      'zh-CN': '通过 `flex` 属性可以实现更灵活的布局。',
      'en-US': 'More flexible layout can be achieved by `flex` prop.'
    },
    component: Flex,
    code: FlexCode
  },
  {
    path: 'responsive',
    title: {
      'zh-CN': '响应式布局',
      'en-US': 'Responsive Layout'
    },
    description: {
      'zh-CN': '参照 Bootstrap 的 响应式设计，预设了五个响应尺寸：`xs`、`sm`、`md`、`lg` 和 `xl`。',
      'en-US': 'Responsive layout reference Bootstrap design.'
    },
    component: Responsive,
    code: ResponsiveCode
  },
  {
    path: 'nested',
    title: {
      'zh-CN': '嵌套布局',
      'en-US': 'Nested Layout'
    },
    description: {
      'zh-CN': '可以嵌套 `row` 和 `col`。',
      'en-US': 'Row and Col can be nested.'
    },
    component: Nested,
    code: NestedCode
  },
  {
    path: 'custom-columns',
    title: {
      'zh-CN': '自定义列数',
      'en-US': 'Custom Columns'
    },
    description: {
      'zh-CN': '通过 `columns` 属性自定义栅格列数（默认为 24）。',
      'en-US': 'Customize grid columns via `columns` prop (default 24).'
    },
    component: CustomColumns,
    code: CustomColumnsCode
  }
]

export const meta = {
  description: {
    'zh-CN': '24 栅格系统。',
    'en-US': '24 Grid System.'
  }
}
