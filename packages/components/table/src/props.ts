import type { ExtractPropTypes, PropType, CSSProperties } from 'vue'
import type { PaginationProps } from '../../pagination/src/props'

export type TableSize = 'small' | 'default' | 'large'
export type TableLayout = 'auto' | 'fixed'

export interface TableColumn<T = any> {
  id?: string
  prop?: string
  label?: string
  width?: string | number
  minWidth?: string | number
  fixed?: 'left' | 'right' | boolean
  sortable?: boolean | 'custom'
  resizable?: boolean
  align?: 'left' | 'center' | 'right'
  headerAlign?: 'left' | 'center' | 'right'
  type?: 'selection' | 'index' | 'expand'
  formatter?: (row: T, column: TableColumn<T>, cellValue: any, index: number) => any
  render?: (data: { row: T; column: TableColumn<T>; $index: number }) => any
  /**
   * @description 渲染表头
   * @en Render header
   */
  renderHeader?: (data: { column: TableColumn<T>; $index: number }) => any
  /**
   * @description 当内容过长被隐藏时显示 tooltip
   * @en Show tooltip when content is too long
   */
  showOverflowTooltip?: boolean
  /**
   * @description 列是否允许展开，仅对 type="expand" 有效
   * @en Whether the column is Expandable, only valid for type="expand"
   */
  expandable?: (row: T, index: number) => boolean
  /**
   * @description 数据过滤的选项
   * @en Data filtering options
   */
  filters?: { text: string; value: any }[]
  /**
   * @description 数据过滤使用的方法
   * @en Data filtering method
   */
  filterMethod?: (value: any, row: T, column: TableColumn<T>) => boolean
  /**
   * @description 过滤弹出框的定位
   * @en Placement of the filter popup
   */
  filterPlacement?: string
  /**
   * @description 数据过滤的默认选中值
   * @en Default selected values for data filtering
   */
  filteredValue?: any[]
  /**
   * @description 是否开启多选
   * @en Whether to enable multiple selection
   */
  filterMultiple?: boolean

  children?: TableColumn<T>[]
  // Internal properties for layout
  rowSpan?: number
  colSpan?: number
  level?: number
  renderLeft?: number
  renderRight?: number
  isLastLeft?: boolean
  isFirstRight?: boolean
  isLastFluid?: boolean
  isRightEdge?: boolean
  [key: string]: any
}

export type SpanMethodProps = {
  row: any
  column: TableColumn
  rowIndex: number
  columnIndex: number
}

export type SpanMethod = (data: SpanMethodProps) => [number, number] | { rowspan: number, colspan: number } | undefined

export const tableProps = {
  /**
   * @description 表格数据
   * @en Table data
   */
  /**
   * @description 是否开启行拖拽
   * @en Whether to enable row dragging
   */
  draggable: {
    type: Boolean,
    default: false
  },
  data: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  /**
   * @description 是否加载中
   * @en Whether to show loading
   */
  loading: Boolean,
  /**
   * @description 加载文案
   * @en Loading text
   */
  loadingText: String,
  /**
   * @description 加载图标
   * @en Loading icon
   */
  loadingSpinner: {
    type: [String, Object] as PropType<string | any>
  },
  /**
   * @description 加载背景色
   * @en Loading background color
   */
  loadingBackground: String,
  /**
   * @description 加载图标大小
   * @en Loading icon size
   */
  loadingSize: {
    type: [String, Number] as PropType<string | number>
  },
  /**
   * @description 列配置（Schema 模式）
   * @en Column configuration (Schema mode)
   */
  columns: {
    type: Array as PropType<TableColumn[]>,
    default: () => [],
  },
  /**
   * @description 表格高度，传入数字则单位为 px。如果设置为 'auto' 或 100% 需父容器有高度
   * @en Table height
   */
  height: {
    type: [String, Number] as PropType<string | number>,
  },
  /**
   * @description 最大高度
   * @en Max height
   */
  maxHeight: {
    type: [String, Number] as PropType<string | number>,
  },
  /**
   * @description 是否开启虚拟滚动
   * @en Whether to enable virtual scrolling
   */
  virtual: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 虚拟滚动行高（像素）
   * @en Virtual scroll row height
   */
  rowHeight: {
    type: Number,
    default: 50,
  },
  /**
   * @description 斑马纹
   * @en Stripe
   */
  stripe: Boolean,
  /**
   * @description 带边框
   * @en Border
   */
  border: Boolean,
  /**
   * @description 尺寸
   * @en Size
   */
  size: {
    type: String as PropType<TableSize>,
    default: 'default',
  },
  /**
   * @description 列宽拖拽
   * @en Resizable
   */
  resizable: Boolean,
  /**
   * @description 行键值（用于优化渲染和选中）
   * @en Row key
   */
  rowKey: {
    type: [String, Function] as PropType<string | ((row: any) => string)>,
    default: 'id',
  },
  /**
   * @description 合并行或列的计算方法
   * @en Method for calculating row and column span
   */
  spanMethod: {
    type: Function as PropType<SpanMethod>,
  },
  /**
   * @description 分页配置
   * @en Pagination configuration
   */
  pagination: {
    type: [Boolean, Object] as PropType<boolean | Partial<PaginationProps>>,
    default: false
  }
} as const

export type TableProps = ExtractPropTypes<typeof tableProps>

export const tableEmits = {
  /**
   * @description 当选择项发生变化时会触发该事件
   * @en Triggered when selection changes
   */
  'selection-change': (selection: any[]) => true,
  /**
   * @description 当表格的排序条件发生变化的时候会触发该事件
   * @en Triggered when table sort condition changes
   */
  'sort-change': (data: { column: any; prop: string; order: string | null }) => true,
  /**
   * @description 当某一行被点击时会触发该事件
   * @en Triggered when a row is clicked
   */
  'row-click': (row: any, column: any, event: Event) => true,
  /**
   * @description 当拖动表头改变了列的宽度的时候会触发该事件
   * @en Triggered when column width changes by dragging header
   */
  'header-dragend': (newWidth: number, oldWidth: number, column: any, event: MouseEvent) => true,
  /**
   * @description 当行拖拽结束时触发
   * @en Triggered when row dragging ends
   */
  'row-drag-end': (evt: { newIndex: number; oldIndex: number; newRow: any; oldRow: any; list: any[] }) => true,
  /**
   * @description 分页发生变化时触发
   * @en Triggered when pagination changes
   */
  'page-change': (page: number, pageSize: number) => true,
  /**
   * @description 筛选条件改变时触发
   * @en Triggered when filter condition changes
   */
  'filter-change': (filters: Record<string, any[]>) => true
}

export type TableEmits = typeof tableEmits

export const tableSlots = {
  /**
   * @description 默认插槽，用于存放 TableColumn
   * @en Default slot for TableColumn
   */
  default: () => true,
  /**
   * @description 自定义空数据时显示的内容
   * @en Custom content when data is empty
   */
  empty: () => true
} as const

export const tableColumnProps = {
  /**
   * @description 列类型
   * @en Column type
   */
  type: {
    type: String as PropType<'selection' | 'index' | 'expand'>
  },
  /**
   * @description 字段名称
   * @en Field name
   */
  prop: String,
  /**
   * @description 显示的标题
   * @en Label
   */
  label: String,
  /**
   * @description 对应列的宽度
   * @en Column width
   */
  width: [String, Number],
  /**
   * @description 对应列的最小宽度
   * @en Column min width
   */
  minWidth: [String, Number],
  /**
   * @description 对应列是否排序
   * @en Whether column is sortable
   */
  sortable: {
    type: [Boolean, String] as PropType<boolean | 'custom'>,
    default: false
  },
  /**
   * @description 列是否固定在左侧或者右侧，true 表示固定在左侧
   * @en Whether column is fixed at left or right. true means fixed at left
   */
  fixed: [Boolean, String] as PropType<boolean | 'left' | 'right'>,
  /**
   * @description 对齐方式
   * @en Alignment
   */
  align: String as PropType<'left' | 'center' | 'right'>,
  /**
   * @description 表头对齐方式
   * @en Header alignment
   */
  headerAlign: String as PropType<'left' | 'center' | 'right'>,
  /**
   * @description 格式化内容
   * @en Format content
   */
  formatter: Function as PropType<(row: any, column: TableColumn, cellValue: any, index: number) => any>,
  /**
   * @description 是否允许拖动表格列宽
   * @en Whether column width can be resized
   */
  resizable: {
    type: Boolean,
    default: true
  },
  /**
   * @description 当内容过长被隐藏时显示 tooltip
   * @en Show tooltip when content is too long
   */
  showOverflowTooltip: Boolean,
  /**
    * @description 如果设置了 type=index，可以通过传递 index 属性来自定义索引
    * @en If type=index is set, you can customize the index by passing the index attribute
    */
  index: [Number, Function] as PropType<number | ((index: number) => number)>,
  /**
   * @description 列是否允许展开，仅对 type="expand" 有效
   * @en Whether the column is Expandable, only valid for type="expand"
   */
  expandable: Function as PropType<(row: any, index: number) => boolean>,
  /**
    * @description 数据过滤的选项
    * @en Data filtering options
    */
  filters: Array as PropType<{ text: string; value: any }[]>,
  /**
    * @description 数据过滤使用的方法
    * @en Data filtering method
    */
  filterMethod: Function as PropType<(value: any, row: any, column: any) => boolean>,
  /**
    * @description 过滤弹出框的定位
    * @en Placement of the filter popup
    */
  filterPlacement: String,
  /**
    * @description 数据过滤的默认选中值
    * @en Default selected values for data filtering
    */
  filteredValue: Array as PropType<any[]>,
  /**
    * @description 是否开启多选
    * @en Whether to enable multiple selection
    */
  filterMultiple: {
    type: Boolean,
    default: true
  }
} as const

export const tableColumnSlots = {
  /**
   * @description 自定义列的内容，参数为 { row, $index }
   * @en Custom column content, parameter is { row, $index }
   */
  default: (data: { row: any; $index: number }) => true,
  /**
   * @description 自定义表头的内容，参数为 { column, $index }
   * @en Custom header content, parameter is { column, $index }
   */
  header: (data: { column: any; $index: number }) => true
} as const
