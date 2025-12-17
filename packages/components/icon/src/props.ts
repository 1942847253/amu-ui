import type { ExtractPropTypes, PropType } from 'vue'

export const iconProps = {
  /**
   * 图标尺寸（像素）
   */
  size: {
    type: [Number, String] as PropType<number | string>,
    default: 16,
  },
  /**
   * 图标颜色（CSS 颜色值或主题变量）
   */
  color: {
    type: String,
    default: 'currentColor',
  },
  /**
   * 是否持续旋转
   */
  spin: {
    type: Boolean,
    default: false,
  },
  /**
   * 图标描边宽度
   */
  strokeWidth: {
    type: [Number, String] as PropType<number | string>,
    default: 2,
  },
} as const

export type IconProps = ExtractPropTypes<typeof iconProps>
