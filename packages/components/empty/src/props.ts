import type { ExtractPropTypes, PropType } from 'vue'

export const emptyProps = {
  /**
   * @description 空状态图片地址
   * @en image URL for empty state
   */
  image: {
    type: String,
    default: '',
  },
  /**
   * @description 空状态图片尺寸（宽度）
   * @en image size (width) for empty state
   */
  imageSize: [Number, String] as PropType<number | string>,
  /**
   * @description 空状态描述文案
   * @en description text for empty state
   */
  description: {
    type: String,
    default: '',
  },
  /**
   * @description 图片替代文本
   * @en image alt text
   */
  imageAlt: {
    type: String,
    default: '',
  },
} as const

export type EmptyProps = ExtractPropTypes<typeof emptyProps>

export const emptyEmits = {}

export const emptySlots = {
  /**
   * @description 底部操作区域
   * @en bottom content
   */
  default: {},
  /**
   * @description 自定义图片
   * @en custom image
   */
  image: {},
  /**
   * @description 自定义描述
   * @en custom description
   */
  description: {},
}
