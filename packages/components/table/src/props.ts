import type { ExtractPropTypes, PropType, CSSProperties } from 'vue'

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
  renderHeader?: (data: { column: TableColumn<T>; $index: number }) => any
  showOverflowTooltip?: boolean
  children?: TableColumn<T>[]
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
  data: {
    type: Array as PropType<any[]>,
    default: () => [],
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
}

export type TableEmits = typeof tableEmits
