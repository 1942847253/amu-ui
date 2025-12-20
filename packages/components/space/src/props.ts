import type { PropType } from 'vue'

export type SpaceSize = 'small' | 'default' | 'large' | number | string

export const spaceProps = {
  /**
   * @description The alignment of the items in the container
   * @default 'center'
   */
  align: {
    type: String as PropType<'start' | 'end' | 'center' | 'baseline'>,
  },
  /**
   * @description The direction of the layout
   * @default 'horizontal'
   */
  direction: {
    type: String as PropType<'vertical' | 'horizontal'>,
    default: 'horizontal',
  },
  /**
   * @description The size of the space
   * @default 'small'
   */
  size: {
    type: [String, Number] as PropType<SpaceSize>,
    default: 'small',
  },
  /**
   * @description Whether to wrap the items
   * @default false
   */
  wrap: {
    type: Boolean,
    default: false,
  },
} as const
