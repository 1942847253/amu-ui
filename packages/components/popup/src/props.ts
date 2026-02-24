import type { PropType, ExtractPropTypes, InjectionKey } from 'vue'

export const POPUP_KEY: InjectionKey<{
  registerChild: () => void
  unregisterChild: () => void
}> = Symbol('amu-popup')

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
   * 虚拟触发元素，用于自定义触发位置。
   * @en Virtual reference element for custom trigger position.
   */
  virtualRef: {
    type: Object as PropType<HTMLElement | { getBoundingClientRect: () => DOMRect }>,
  },
  /**
   * 是否显示箭头。
   * @en Whether to show the arrow.
   */
  showArrow: {
    type: Boolean,
    default: false,
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
   * 弹出层 CSS 类名。
   * @en Custom class name for the popup.
   */
  overlayClassName: {
    type: String,
    default: '',
  },
  /**
   * 是否将宽度与 trigger 保持一致。
   * @en Whether to match width with trigger.
   */
  matchWidth: {
    type: Boolean,
    default: false,
  },
  /**
   * 动画名称。
   * @en Transition name.
   */
  transition: {
    type: String,
    default: 'amu-popup-fade',
  },
  /**
   * 挂载节点。
   * @en Mount node.
   */
  teleportTo: {
    type: [String, Object] as PropType<string | HTMLElement>,
    default: 'body',
  },
  /**
   * z-index 层级。
   * @en z-index level.
   */
  zIndex: {
    type: Number,
    default: undefined,
  },
  /**
   * 点击外部是否关闭。
   * @en Whether to close when clicking outside.
   */
  closeOnClickOutside: {
    type: Boolean,
    default: true,
  },
  /**
   * 按 ESC 是否关闭。
   * @en Whether to close when pressing ESC.
   */
  closeOnEsc: {
    type: Boolean,
    default: true,
  },
  /**
   * 显示延迟。
   * @en Show timeout.
   */
  showTimeout: {
    type: Number,
    default: 0,
  },
  /**
   * 隐藏延迟。
   * @en Hide timeout.
   */
  hideTimeout: {
    type: Number,
    default: 200,
  },
  /**
   * 是否强制渲染内容（不使用 v-if 而是 v-show）。
   * @en Whether to force render the content (use v-show instead of v-if).
   */
  forceRender: {
    type: Boolean,
    default: false,
  },
} as const

export const popupEmits = {
  /**
   * 绑定值变化时触发。
   * @en Triggered when the bound value changes.
   */
  'update:modelValue': (visible: boolean) => typeof visible === 'boolean',
  /**
   * 显示时触发。
   * @en Triggered when shown.
   */
  show: () => true,
  /**
   * 隐藏时触发。
   * @en Triggered when hidden.
   */
  hide: () => true,
  // open/close for compatibility
  /**
   * 显示时触发（兼容）。
   * @en Triggered when shown (compatibility).
   */
  open: () => true,
  /**
   * 隐藏时触发（兼容）。
   * @en Triggered when hidden (compatibility).
   */
  close: () => true,
}

export const popupSlots = {
  /**
   * @description 触发器插槽
   * @en Trigger slot
   */
  default: {},
  /**
   * @description 弹层内容插槽
   * @en Content slot
   */
  content: {},
}

export type PopupProps = ExtractPropTypes<typeof popupProps>
export type PopupEmits = typeof popupEmits
