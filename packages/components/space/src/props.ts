import type { PropType } from 'vue'

export type SpaceSize = 'small' | 'default' | 'large' | number | string

export const spaceProps = {
  /**
   * @description 子项在容器中的对齐方式
   * @en The alignment of items in the container
   */
  align: {
    type: String as PropType<'start' | 'end' | 'center' | 'baseline'>,
  },
  /**
   * @description 布局方向
   * @en The direction of the layout
   */
  direction: {
    type: String as PropType<'vertical' | 'horizontal'>,
    default: 'horizontal',
  },
  /**
   * @description 间距大小
   * @en The size of the space
   */
  size: {
    type: [String, Number] as PropType<SpaceSize>,
    default: 'small',
  },
  /**
   * @description 是否自动换行
   * @en Whether to wrap items
   */
  wrap: {
    type: Boolean,
    default: false,
  },
} as const
