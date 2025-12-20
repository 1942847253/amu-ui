import type { ExtractPropTypes, PropType } from 'vue'

export const iconProps = {
  /**
   * 图标尺寸（像素）
   * @en Icon size (pixels)
   */
  size: {
    type: [Number, String] as PropType<number | string>,
    default: 16,
  },
  /**
   * 图标颜色（CSS 颜色值或主题变量）
   * @en Icon color (CSS color value or theme variable)
   */
  color: {
    type: String,
    default: 'currentColor',
  },
  /**
   * 是否持续旋转
   * @en Whether to spin continuously
   */
  spin: {
    type: Boolean,
    default: false,
  },
  /**
   * 图标描边宽度
   * @en Icon stroke width
   */
  strokeWidth: {
    type: [Number, String] as PropType<number | string>,
    default: 2,
  },
} as const

export const iconSlots = {
  /**
   * 默认插槽
   * @en Default slot
   */
  default: {}
}

export type IconProps = ExtractPropTypes<typeof iconProps>
