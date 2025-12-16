import type { ExtractPropTypes, PropType } from 'vue'

export type ButtonType = 'primary' | 'default' | 'dashed' | 'outline' | 'text'

export type ButtonShape = 'rect' | 'circle' | 'round'

export type ButtonSize = 'mini' | 'small' | 'default' | 'large'

export type ButtonStatus = 'warning' | 'danger' | 'success'

export const buttonProps = {
  /**
   * 按钮的原生 type 属性，支持 button、submit、reset。
   */
  htmlType: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button'
  },
  /**
   * 按钮类型，支持 primary、default、dashed、outline 和 text。
   */
  type: {
    type: String as PropType<ButtonType>,
    default: 'default'
  },
  /**
   * 按钮尺寸，对应 mini、small、default、large。
   */
  size: {
    type: String as PropType<ButtonSize>,
    default: 'default'
  },
  /**
   * 状态色，目前支持 warning、danger、success，与 type 叠加时优先级更高。
   */
  status: {
    type: String as PropType<ButtonStatus>,
    default: undefined
  },
  /**
   * 让按钮宽度填充父容器并保持内容居中。
   */
  fill: {
    type: Boolean,
    default: false
  },
  /**
   * 是否显示加载中状态，自动禁用按钮并展示转圈图标。
   */
  loading: {
    type: Boolean,
    default: false
  },
  /**
   * 按钮形状，rect（默认）、circle、round。
   */
  shape: {
    type: String as PropType<ButtonShape>,
    default: 'rect'
  },
  /**
   * 是否禁用按钮。
   */
  disabled: {
    type: Boolean,
    default: false
  }
} as const

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
