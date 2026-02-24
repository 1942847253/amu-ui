import type { ExtractPropTypes, PropType } from 'vue'

export const paginationProps = {
  /**
   * @description 当前页数
   * @en Current page number
   */
  current: {
    type: Number,
    default: undefined
  },
  /**
   * @description 默认当前页数（非受控模式）
   * @en Default current page number (uncontrolled mode)
   */
  defaultCurrent: {
    type: Number,
    default: 1
  },
  /**
   * @description v-model 绑定值，当前页数
   * @en v-model binding value, current page number
   */
  modelValue: {
    type: Number,
    default: undefined
  },
  /**
   * @description 每页条数
   * @en Number of items per page
   */
  pageSize: {
    type: Number,
    default: undefined
  },
  /**
   * @description 默认每页条数（非受控模式）
   * @en Default number of items per page (uncontrolled mode)
   */
  defaultPageSize: {
    type: Number,
    default: 10
  },
  /**
   * @description 数据总数
   * @en Total number of data items
   */
  total: {
    type: Number,
    default: 0
  },
  /**
   * @description 页码按钮的数量，当总页数超过该值时会折叠。大于等于 5 且小于 equal 21 的奇数
   * @en Number of pagers. Pagers will be folded when the total page count exceeds this value. Odd number >= 5 and <= 21
   */
  pagerCount: {
    type: Number,
    default: 7
  },
  /**
   * @description 是否展示 pageSize 切换器
   * @en Whether to show pageSize changer
   */
  showSizeChanger: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否展示快速跳转
   * @en Whether to show quick jumper
   */
  showQuickJumper: {
    type: Boolean,
    default: false
  },
  /**
   * @description 用于显示总数和当前范围的函数或布尔值
   * @en Function or boolean to display total number and current range
   */
  showTotal: {
    type: [Boolean, Function] as PropType<boolean | ((total: number, range: [number, number]) => string)>,
    default: false
  },
  /**
   * @description 指定每页可以显示多少条
   * @en Specify the size of options for the size changer
   */
  pageSizeOptions: {
    type: Array as PropType<number[]>,
    default: () => [10, 20, 50, 100]
  },
  /**
   * @description 是否禁用
   * @en Whether to disable the pagination
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否为简洁模式
   * @en Whether to use simple mode
   */
  simple: {
    type: Boolean,
    default: false
  },
  /**
   * @description 组件尺寸
   * @en Component size
   */
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium'
  },
  /**
   * @description 是否带有背景色（此时页码为方框形状）
   * @en Whether to have a background color (pagers will be box-shaped)
   */
  background: {
    type: Boolean,
    default: true
  }
} as const

export type PaginationProps = ExtractPropTypes<typeof paginationProps>

export const paginationEmits = {
  /**
   * @description 当前页数改变时触发
   * @en Triggered when current page changes
   */
  'update:modelValue': (val: number) => typeof val === 'number',
  /**
   * @description 每页条数改变时触发
   * @en Triggered when page size changes
   */
  'update:pageSize': (val: number) => typeof val === 'number',
  /**
   * @description 页码或每页条数改变时触发
   * @en Triggered when current page or page size changes
   */
  'change': (page: number, pageSize: number) => typeof page === 'number' && typeof pageSize === 'number',
  /**
   * @description 每页条数改变时触发
   * @en Triggered when page size changes
   */
  'pageSizeChange': (pageSize: number) => typeof pageSize === 'number'
}

export const paginationSlots = {
  /**
   * @description 总数展示插槽
   * @en Total display slot
   */
  total: {},
}

export type PaginationEmits = typeof paginationEmits
