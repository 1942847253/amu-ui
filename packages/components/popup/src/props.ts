import type { PropType, ExtractPropTypes } from 'vue'

export type PopupTrigger = 'click' | 'hover' | 'manual'
export type PopupPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'

export const popupProps = {
  /**
   * 是否显示弹出层。
   * @en Whether the popup is visible.
   */
  modelValue: {
    type: Boolean,
    default: false,
  },
  /**
   * 触发方式，支持 click、hover、manual。
   * @en Trigger mode, supports click, hover, manual.
   */
  trigger: {
    type: String as PropType<PopupTrigger>,
    default: 'click',
  },
  /**
   * 弹出位置，支持 12 个方向。
   * @en Popup placement, supports 12 directions.
   */
  placement: {
    type: String as PropType<PopupPlacement>,
    default: 'bottom',
  },
  /**
   * 弹出层偏移量，支持数字或数组 [x, y]。
   * @en Offset of the popup, supports number or array [x, y].
   */
  offset: {
    type: [Number, Array] as PropType<number | [number, number]>,
    default: 4,
  },
  /**
   * 是否禁用。
   * @en Whether the popup is disabled.
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否在点击外部时关闭。
   * @en Whether to close the popup when clicking outside.
   */
  closeOnClickOutside: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否在按下 ESC 键时关闭。
   * @en Whether to close the popup when pressing ESC.
   */
  closeOnEsc: {
    type: Boolean,
    default: true,
  },
  /**
   * 挂载的节点，默认为 body。
   * @en Teleport to which element, defaults to body.
   */
  teleportTo: {
    type: [String, Object] as PropType<string | HTMLElement>,
    default: 'body',
  },
  /**
   * 弹出层的 z-index 值。
   * @en Z-index of the popup.
   */
  zIndex: {
    type: Number,
  },
  /**
   * 是否将弹出层宽度设置为与触发元素一致。
   * @en Whether to set the popup width to match the trigger element.
   */
  matchWidth: {
    type: Boolean,
    default: false,
  },
  /**
   * 弹出层过渡动画名称。
   * @en Transition name of the popup.
   */
  transition: {
    type: String,
    default: 'amu-popup-fade',
  },
  /**
   * 是否显示箭头。
   * @en Whether to show the arrow.
   */
  showArrow: {
    type: Boolean,
    default: false,
  },
} as const

export type PopupProps = ExtractPropTypes<typeof popupProps>

export const popupEmits = {
  /**
   * 显示状态改变时触发。
   * @en Triggered when the visibility changes.
   */
  'update:modelValue': (value: boolean) => typeof value === 'boolean',
  /**
   * 显示时触发。
   * @en Triggered when the popup is shown.
   */
  show: () => true,
  /**
   * 隐藏时触发。
   * @en Triggered when the popup is hidden.
   */
  hide: () => true,
}

export type PopupEmits = typeof popupEmits

export const popupSlots = {
  /**
   * 弹出层内容。
   * @en Popup content.
   */
  default: {},
  /**
   * 触发元素。
   * @en Reference element.
   */
  reference: {},
}
