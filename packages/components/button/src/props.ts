import type { ExtractPropTypes, PropType } from 'vue'

export type ButtonType = 'primary' | 'default' | 'dashed' | 'outline' | 'text'

export type ButtonShape = 'rect' | 'circle' | 'round'

export type ButtonSize = 'mini' | 'small' | 'default' | 'large'

export type ButtonStatus = 'warning' | 'danger' | 'success'

export const buttonProps = {
  /**
   * 按钮的原生 type 属性，支持 button、submit、reset。
   * @en Native type attribute of the button, supports button, submit, reset.
   */
  htmlType: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button'
  },
  /**
   * 按钮类型，支持 primary、default、dashed、outline 和 text。
   * @en Button type, supports primary, default, dashed, outline and text.
   */
  type: {
    type: String as PropType<ButtonType>,
    default: 'default'
  },
  /**
   * 按钮尺寸，对应 mini、small、default、large。
   * @en Button size, corresponds to mini, small, default, large.
   */
  size: {
    type: String as PropType<ButtonSize>,
    default: 'default'
  },
  /**
   * 状态色，目前支持 warning、danger、success，与 type 叠加时优先级更高。
   * @en Status color, currently supports warning, danger, success, has higher priority when stacked with type.
   */
  status: {
    type: String as PropType<ButtonStatus>,
    default: undefined
  },
  /**
   * 让按钮宽度填充父容器并保持内容居中。
   * @en Let the button width fill the parent container and keep the content centered.
   */
  fill: {
    type: Boolean,
    default: false
  },
  /**
   * 是否显示加载中状态，自动禁用按钮并展示转圈图标。
   * @en Whether to show the loading state, automatically disable the button and show the spinner icon.
   */
  loading: {
    type: Boolean,
    default: false
  },
  /**
   * 按钮形状，rect（默认）、circle、round。
   * @en Button shape, rect (default), circle, round.
   */
  shape: {
    type: String as PropType<ButtonShape>,
    default: 'rect'
  },
  /**
   * 是否禁用按钮。
   * @en Whether to disable the button.
   */
  disabled: {
    type: Boolean,
    default: false
  }
} as const

export const buttonSlots = {
  /**
   * 默认插槽
   * @en Default slot
   */
  default: {},
  /**
   * 图标插槽
   * @en Icon slot
   */
  icon: {},
  /**
   * 加载图标插槽
   * @en Loading icon slot
   */
  'loading-icon': {}
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
