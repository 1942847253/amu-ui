import { type PropType, type InjectionKey, type Ref, type ComputedRef } from 'vue'

export type GridJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'
export type GridAlign = 'top' | 'middle' | 'bottom' | 'stretch'
export type GridType = 'flex' | 'float' // Reserved for future, currently we focus on flex

export const rowProps = {
  /**
   * @description 栅格间隔，单位 px，支持 [水平, 垂直]
   * @en Grid spacing in px, supports [horizontal, vertical]
   */
  gutter: {
    type: [Number, Array, Object] as PropType<number | [number, number] | Record<string, number | [number, number]>>,
    default: undefined
  },
  /**
   * @description 水平排列方式
   * @en Horizontal alignment
   */
  justify: {
    type: String as PropType<GridJustify>,
    default: 'start'
  },
  /**
   * @description 垂直排列方式
   * @en Vertical alignment
   */
  align: {
    type: String as PropType<GridAlign>,
    default: 'top'
  },
  /**
   * @description 自定义元素标签
   * @en Custom element tag
   */
  tag: {
    type: String,
    default: 'div'
  },
  /**
   * @description 是否自动换行
   * @en Whether to wrap automatically
   */
  wrap: {
    type: Boolean,
    default: true
  },
  /**
   * @description 紧凑模式 (移除额外边距)
   * @en Dense mode (remove extra margins)
   */
  dense: {
    type: Boolean,
    default: false
  },
  /**
   * @description 开启调试模式 (显示边框)
   * @en Enable debug mode (show borders)
   */
  debug: {
    type: Boolean,
    default: false
  },
  /**
   * @description 栅格列数
   * @en Grid columns
   */
  columns: {
    type: Number,
    default: 24
  }
} as const

export const rowEmits = {}

export const rowSlots = {
  /**
   * @description 默认插槽
   * @en Default slot
   */
  default: {}
}

export interface RowContext {
  gutter: ComputedRef<[number, number]>
  columns: ComputedRef<number>
}

export const ROW_CONTEXT_KEY: InjectionKey<RowContext> = Symbol('ROW_CONTEXT_KEY')
