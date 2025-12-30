import type { PropType, ExtractPropTypes } from 'vue'
import type { ButtonProps } from '../../button/src/props'
import type { PopupProps } from '../../popup/src/props'

export type PopconfirmIcon = 'info' | 'warning' | 'error'

export const popconfirmProps = {
  /**
   * 是否显示气泡确认框。
   * @en Whether to show the popconfirm.
   */
  modelValue: {
    type: Boolean,
    default: undefined
  },
  /**
   * 触发方式，支持 click、hover、manual。
   * @en Trigger mode, supports click, hover, manual.
   */
  trigger: {
    type: String as PropType<PopupProps['trigger']>,
    default: 'click'
  },
  /**
   * 主说明文字。
   * @en Main description text.
   */
  title: {
    type: String,
    default: ''
  },
  /**
   * 详细描述。
   * @en Detailed description.
   */
  description: {
    type: String,
    default: ''
  },
  /**
   * 图标类型，支持 info、warning、error。
   * @en Icon type, supports info, warning, error.
   */
  icon: {
    type: String as PropType<PopconfirmIcon>
  },
  /**
   * 自定义图标颜色。
   * @en Custom icon color.
   */
  iconColor: {
    type: String
  },
  /**
   * 确认前的回调，返回 false 或 Promise reject 则阻止关闭。
   * @en Callback before confirm, return false or Promise reject to prevent closing.
   */
  onBeforeConfirm: {
    type: Function as PropType<() => boolean | Promise<boolean>>
  },
  /**
   * 确认按钮配置，支持 Button 属性。
   * @en Confirm button configuration, supports Button properties.
   */
  confirmBtn: {
    type: [Object, String] as PropType<Partial<ButtonProps> | string>
  },
  /**
   * 取消按钮配置，支持 Button 属性。
   * @en Cancel button configuration, supports Button properties.
   */
  cancelBtn: {
    type: [Object, String] as PropType<Partial<ButtonProps> | string>
  },
  /**
   * 底层 Popup 属性透传。
   * @en Underlying Popup properties pass-through.
   */
  popupProps: {
    type: Object as PropType<Partial<PopupProps>>
  },
  /**
   * 弹出位置。
   * @en Popup placement.
   */
  placement: {
    type: String as PropType<PopupProps['placement']>,
    default: 'top'
  },
  /**
   * 弹出层偏移量。
   * @en Popup offset.
   */
  offset: {
    type: [Number, Array] as PropType<number | [number, number]>,
    default: 10
  },
  /**
   * 是否禁用。
   * @en Whether to disable.
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * 是否在点击外部时关闭。
   * @en Whether to close when clicking outside.
   */
  closeOnClickOutside: {
    type: Boolean,
    default: true
  },
  /**
   * 是否在按下 ESC 键时关闭。
   * @en Whether to close when pressing ESC.
   */
  closeOnEsc: {
    type: Boolean,
    default: true
  },
  /**
   * 挂载的节点。
   * @en Teleport to which element.
   */
  teleportTo: {
    type: [String, Object] as PropType<string | HTMLElement>,
    default: 'body'
  },
  /**
   * 弹出层的 z-index 值。
   * @en Z-index of the popup.
   */
  zIndex: {
    type: Number
  }
} as const

export const popconfirmEmits = {
  /**
   * 显示状态改变时触发。
   * @en Triggered when visibility changes.
   */
  'update:modelValue': (visible: boolean) => true,
  /**
   * 点击确认按钮时触发。
   * @en Triggered when the confirm button is clicked.
   */
  confirm: () => true,
  /**
   * 点击取消按钮时触发。
   * @en Triggered when the cancel button is clicked.
   */
  cancel: () => true,
  /**
   * 显示时触发。
   * @en Triggered when shown.
   */
  show: () => true,
  /**
   * 隐藏时触发。
   * @en Triggered when hidden.
   */
  hide: () => true
}

export const popconfirmSlots = {
  /**
   * 弹出层内容自定义（通常用于替代 title/description）
   * @en Custom popup content (usually replaces title/description)
   */
  default: {},
  /**
   * 触发元素
   * @en Trigger element
   */
  reference: {},
  /**
   * 自定义确认按钮
   * @en Custom confirm button
   */
  confirmBtn: {},
  /**
   * 自定义取消按钮
   * @en Custom cancel button
   */
  cancelBtn: {},
  /**
   * 自定义图标
   * @en Custom icon
   */
  icon: {}
}

export type PopconfirmProps = ExtractPropTypes<typeof popconfirmProps>
