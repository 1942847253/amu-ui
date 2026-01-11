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
   * 图标名称或组件
   * @en Icon name or component
   */
  name: {
    type: [String, Object] as PropType<string | object>,
  },
  /**
   * 旋转方向 (legacy support via name prop usually, but here just name)
   * Alias for name to support <AmuIcon :icon="..." />
   */
  icon: {
    type: [String, Object] as PropType<string | object>,
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
