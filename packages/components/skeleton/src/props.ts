import type { ExtractPropTypes, PropType } from 'vue'

export type SkeletonItemVariant = 'text' | 'image' | 'circle' | 'rect' | 'button' | 'caption' | 'h1' | 'h3'

export const skeletonProps = {
  /**
   * @description 是否显示骨架屏
   * @en Whether to show skeleton
   */
  loading: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否开启加载动画
   * @en Whether to enable loading animation
   */
  animated: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 骨架屏行数，仅在无 template 插槽时生效
   * @en Number of rows, only works when template slot is absent
   */
  rows: {
    type: Number,
    default: 0,
  },
  /**
   * @description 延迟渲染时间（毫秒）
   * @en Delay rendering time (ms)
   */
  throttle: {
    type: Number,
    default: 0,
  },
} as const

export const skeletonItemProps = {
  /**
   * @description 骨架项形状变体
   * @en Skeleton item variant
   */
  variant: {
    type: String as PropType<SkeletonItemVariant>,
    default: 'text',
  },
} as const

export type SkeletonProps = ExtractPropTypes<typeof skeletonProps>
export type SkeletonItemProps = ExtractPropTypes<typeof skeletonItemProps>

export const skeletonEmits = {}
export const skeletonItemEmits = {}

export const skeletonSlots = {
  /**
   * @description 骨架模板插槽
   * @en Template slot
   */
  template: {},
  /**
   * @description 加载完成内容插槽
   * @en Default slot
   */
  default: {},
}

export const skeletonItemSlots = {}
