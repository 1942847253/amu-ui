import { type PropType } from 'vue'

export interface ColSizeObject {
  span?: number
  offset?: number
  order?: number
  push?: number
  pull?: number
}

export type ColSize = number | ColSizeObject

export const colProps = {
  /**
   * @description 栅格占位格数，为 0 时相当于 display: none
   * @en Number of grid columns to span. 0 corresponds to display: none
   */
  span: {
    type: Number,
    default: undefined
  },
  /**
   * @description 栅格左侧的间隔格数
   * @en Number of grid columns to offset from the left
   */
  offset: {
    type: Number,
    default: 0
  },
  /**
   * @description 栅格向右移动格数
   * @en Number of grid columns to push to the right
   */
  push: {
    type: Number,
    default: 0
  },
  /**
   * @description 栅格向左移动格数
   * @en Number of grid columns to pull to the left
   */
  pull: {
    type: Number,
    default: 0
  },
  /**
   * @description 栅格顺序
   * @en Grid order
   */
  order: {
    type: Number,
    default: 0
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
   * @description flex 布局属性
   * @en flex layout property
   */
  flex: {
    type: [String, Number] as PropType<string | number>
  },
  /**
   * @description <576px 响应式栅格
   * @en <576px responsive grid
   */
  xs: {
    type: [Number, Object] as PropType<ColSize>,
    default: () => undefined
  },
  /**
   * @description ≥576px 响应式栅格
   * @en ≥576px responsive grid
   */
  sm: {
    type: [Number, Object] as PropType<ColSize>,
    default: () => undefined
  },
  /**
   * @description ≥768px 响应式栅格
   * @en ≥768px responsive grid
   */
  md: {
    type: [Number, Object] as PropType<ColSize>,
    default: () => undefined
  },
  /**
   * @description ≥992px 响应式栅格
   * @en ≥992px responsive grid
   */
  lg: {
    type: [Number, Object] as PropType<ColSize>,
    default: () => undefined
  },
  /**
   * @description ≥1200px 响应式栅格
   * @en ≥1200px responsive grid
   */
  xl: {
    type: [Number, Object] as PropType<ColSize>,
    default: () => undefined
  },
  /**
   * @description ≥1600px 响应式栅格
   * @en ≥1600px responsive grid
   */
  xxl: {
    type: [Number, Object] as PropType<ColSize>,
    default: () => undefined
  },
  /**
   * @description 最小宽度
   * @en Minimum width
   */
  minWidth: {
    type: [Number, String] as PropType<number | string>
  },
  /**
   * @description 最大宽度
   * @en Maximum width
   */
  maxWidth: {
    type: [Number, String] as PropType<number | string>
  }
} as const
