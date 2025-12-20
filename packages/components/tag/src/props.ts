import type { ExtractPropTypes, PropType } from 'vue'

export type TagType = 'default' | 'primary' | 'success' | 'warning' | 'danger'
export type TagSize = 'small' | 'default' | 'large'
export type TagShape = 'square' | 'round' | 'mark'

export const tagProps = {
  /**
   * 标签类型，支持 default、primary、success、warning、danger
   * @en Tag type, supports default, primary, success, warning, danger
   */
  type: {
    type: String as PropType<TagType>,
    default: 'default'
  },
  /**
   * 标签尺寸，支持 small、default、large
   * @en Tag size, supports small, default, large
   */
  size: {
    type: String as PropType<TagSize>,
    default: 'default'
  },
  /**
   * 标签形状，支持 square、round、mark
   * @en Tag shape, supports square, round, mark
   */
  shape: {
    type: String as PropType<TagShape>,
    default: 'square'
  },
  /**
   * 是否可关闭
   * @en Whether the tag is closable
   */
  closable: {
    type: Boolean,
    default: false
  },
  /**
   * 是否禁用
   * @en Whether the tag is disabled
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * 是否为边框模式
   * @en Whether to show border
   */
  bordered: {
    type: Boolean,
    default: false
  },
  /**
   * 标签颜色
   * @en Background color of the tag
   */
  color: {
    type: String,
    default: ''
  }
}

export const tagEmits = {
  /**
   * 点击关闭按钮时触发
   * @en Emitted when the close button is clicked
   */
  close: (ev: MouseEvent) => true,
  /**
   * 点击标签时触发
   * @en Emitted when the tag is clicked
   */
  click: (ev: MouseEvent) => true,
}

export const tagSlots = {
  /**
   * 默认插槽
   * @en Default slot
   */
  default: {},
  /**
   * 图标插槽
   * @en Icon slot
   */
  icon: {}
}

export type TagProps = ExtractPropTypes<typeof tagProps>
