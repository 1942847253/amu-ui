import { AmuTable, AmuTableColumn, AmuButton, AmuTag, AmuSwitch, AmuRadioGroup, AmuRadioButton, AmuIcon } from 'amu-ui'

import Basic from './basic.vue?raw'
import BasicComp from './basic.vue'

import Size from './size.vue?raw'
import SizeComp from './size.vue'

import FixedHeader from './fixed-header.vue?raw'
import FixedHeaderComp from './fixed-header.vue'

import FixedColumn from './fixed-column.vue?raw'
import FixedColumnComp from './fixed-column.vue'

import BasicSelection from './basic-selection.vue?raw'
import BasicSelectionComp from './basic-selection.vue'

import Sorting from './sorting.vue?raw'
import SortingComp from './sorting.vue'

import CustomTemplate from './custom-template.vue?raw'
import CustomTemplateComp from './custom-template.vue'

import VirtualScroll from './virtual-scroll.vue?raw'
import VirtualScrollComp from './virtual-scroll.vue'

import MergeCell from './merge-cell.vue?raw'
import MergeCellComp from './merge-cell.vue'

import MultiHeader from './multi-header.vue?raw'
import MultiHeaderComp from './multi-header.vue'

import Empty from './empty.vue?raw'
import EmptyComp from './empty.vue'

import Draggable from './draggable.vue?raw'
import DraggableComp from './draggable.vue'

import Resizable from './resizable.vue?raw'
import ResizableComp from './resizable.vue'

import Loading from './loading.vue?raw'
import LoadingComp from './loading.vue'

import Pagination from './pagination.vue?raw'
import PaginationComp from './pagination.vue'

export const demos = [
  {
    path: 'basic',
    title: {
      'zh-CN': '基础表格',
      'en-US': 'Basic Table',
    },
    description: {
      'zh-CN': '基础的表格展示用法，包含`stripe`斑马纹和`border`边框。',
      'en-US': 'Basic table usage with `stripe` and `border`.',
    },
    component: BasicComp,
    code: Basic,
  },
  {
    path: 'size',
    title: {
      'zh-CN': '尺寸调整',
      'en-US': 'Sizes',
    },
    description: {
      'zh-CN': '通过设置 `size` 属性来控制表格的密度。',
      'en-US': 'Control table density via `size` prop',
    },
    component: SizeComp,
    code: Size,
  },
  {
    path: 'fixed-header',
    title: {
      'zh-CN': '固定表头',
      'en-US': 'Fixed Header',
    },
    description: {
      'zh-CN': '纵向内容过多时，可选择固定表头。设置 `height` 属性即可。',
      'en-US': 'When there are too many rows, you can fix the header. Set `height` prop.',
    },
    component: FixedHeaderComp,
    code: FixedHeader,
  },
  {
    path: 'fixed-column',
    title: {
      'zh-CN': '固定列',
      'en-US': 'Fixed Column',
    },
    description: {
      'zh-CN': '横向内容过多时，可选择固定列。',
      'en-US': 'When there are too many columns, you can fix columns.',
    },
    component: FixedColumnComp,
    code: FixedColumn,
  },
  {
    path: 'sorting',
    title: {
      'zh-CN': '排序',
      'en-US': 'Sorting',
    },
    description: {
      'zh-CN': '对表格进行排序，可控排序。',
      'en-US': 'Sort the table.',
    },
    component: SortingComp,
    code: Sorting,
  },
  {
    path: 'basic-selection',
    title: {
      'zh-CN': '多选',
      'en-US': 'Selection',
    },
    description: {
      'zh-CN': '包含选择列的基础表格。',
      'en-US': 'Basic table with selection column.',
    },
    component: BasicSelectionComp,
    code: BasicSelection,
  },
  {
    path: 'custom-template',
    title: {
      'zh-CN': '自定义列模板',
      'en-US': 'Custom Column Template',
    },
    description: {
      'zh-CN': '自定义列的显示内容，可组合其他组件使用。',
      'en-US': 'Customize column content.',
    },
    component: CustomTemplateComp,
    code: CustomTemplate,
  },
  {
    path: 'virtual-scroll',
    title: {
      'zh-CN': '虚拟滚动',
      'en-US': 'Virtual Scroll',
    },
    description: {
      'zh-CN': '支持处理大量数据。',
      'en-US': 'Support for handling large amount of data.',
    },
    component: VirtualScrollComp,
    code: VirtualScroll,
  },
  {
    path: 'merge-cell',
    title: {
      'zh-CN': '合并行或列',
      'en-US': 'Merge Rows or Columns',
    },
    description: {
      'zh-CN': '多行或多列共用一个单元格，设置 span-method 属性。',
      'en-US': 'Merge rows or columns via span-method.',
    },
    component: MergeCellComp,
    code: MergeCell,
  },
  {
    path: 'multi-header',
    title: {
      'zh-CN': '多级表头',
      'en-US': 'Multi-level Header',
    },
    description: {
      'zh-CN': '数据结构比较复杂的时候，可使用多级表头来展现数据的层次关系。',
      'en-US': 'When the data structure is complex, you can use multi-level headers to show the hierarchy of data.',
    },
    component: MultiHeaderComp,
    code: MultiHeader,
  },
  {
    path: 'empty',
    title: {
      'zh-CN': '空数据',
      'en-US': 'Empty Data',
    },
    description: {
      'zh-CN': '当 `data` 为空时，表格将显示空数据提示。',
      'en-US': 'When `data` is empty, the table will display an empty data message.',
    },
    component: EmptyComp,
    code: Empty,
  },
  {
    path: 'draggable',
    title: {
      'zh-CN': '拖拽排序',
      'en-US': 'Drag Sorting',
    },
    description: {
      'zh-CN': '配合 `sortablejs` 等第三方库可以实现表格拖拽排序。',
      'en-US': 'Combine with `sortablejs` to implement table drag sorting.',
    },
    component: DraggableComp,
    code: Draggable,
  },
  {
    path: 'resizable',
    title: {
      'zh-CN': '列宽拖拽',
      'en-US': 'Resizable Column',
    },
    description: {
      'zh-CN': '设置 `resizable` 属性结合 `border` 即可开启列宽拖拽功能。',
      'en-US': 'Set `resizable` attribute combined with `border` to enable column width resizing.',
    },
    component: ResizableComp,
    code: Resizable,
  },
  {
    path: 'loading',
    title: {
      'zh-CN': '加载中',
      'en-US': 'Loading',
    },
    description: {
      'zh-CN': '表格数据加载时的占位显示。',
      'en-US': 'Placeholder display when table data is loading.',
    },
    component: LoadingComp,
    code: Loading,
  },
  {
    path: 'pagination',
    title: {
      'zh-CN': '带分页的表格',
      'en-US': 'Table with Pagination'
    },
    description: {
      'zh-CN': '通过 `pagination` 属性配置内置分页组件。监听 `page-change` 事件来获取最新的页码和 pageSize。',
      'en-US': 'Configure built-in pagination via `pagination` prop. Listen to `page-change` event to get latest page and pageSize.'
    },
    component: PaginationComp,
    code: Pagination
  }]

export const meta = {
  description: {
    'zh-CN': '用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。',
    'en-US': 'Display multiple data with similar structure. You can sort, filter, compare or do other custom operations.',
  }
}
