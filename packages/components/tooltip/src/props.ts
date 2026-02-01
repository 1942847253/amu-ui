import type { ExtractPropTypes, PropType } from 'vue'
import type { PopupProps } from '../../popup/src/props'

export const tooltipProps = {
  /**
   * @description 是否显示提示。
   * @en Whether the tooltip is visible.
   */
  modelValue: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description 提示文字内容。
   * @en Tooltip text content.
   */
  content: {
    type: String,
    default: '',
  },
  /**
   * @description 触发方式，支持 click、hover、manual。
   * @en Trigger mode, supports click, hover, manual.
   */
  trigger: {
    type: String as PropType<PopupProps['trigger']>,
    default: 'hover',
  },
  /**
   * @description 弹出位置。
   * @en Tooltip placement.
   */
  placement: {
    type: String as PropType<PopupProps['placement']>,
    default: 'top',
  },
  /**
   * @description 弹出层偏移量。
   * @en Tooltip offset.
   */
  offset: {
    type: [Number, Array] as PropType<number | [number, number]>,
    default: 8,
  },
  /**
   * @description 是否显示箭头。
   * @en Whether to show the arrow.
   */
  showArrow: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否禁用。
   * @en Whether to disable.
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 点击外部是否关闭。
   * @en Whether to close when clicking outside.
   */
  closeOnClickOutside: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 按 ESC 是否关闭。
   * @en Whether to close when pressing ESC.
   */
  closeOnEsc: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 挂载节点。
   * @en Mount node.
   */
  teleportTo: {
    type: [String, Object] as PropType<string | HTMLElement>,
    default: 'body',
  },
  /**
   * @description z-index 层级。
   * @en z-index level.
   */
  zIndex: {
    type: Number,
  },
  /**
   * @description 虚拟触发元素。
   * @en Virtual reference element.
   */
  virtualRef: {
    type: Object as PropType<HTMLElement | { getBoundingClientRect: () => DOMRect }>,
  },
  /**
   * @description 最大宽度。
   * @en Max width.
   */
  maxWidth: {
    type: [Number, String] as PropType<number | string>,
    default: 320,
  },
  /**
   * @description 额外的弹出层类名。
   * @en Extra class name for the popup.
   */
  overlayClassName: {
    type: String,
    default: '',
  },
  /**
   * @description 底层 Popup 属性透传。
   * @en Underlying Popup properties pass-through.
   */
  popupProps: {
    type: Object as PropType<Partial<PopupProps>>,
  },
  /**
   * @description 主题类型。
   * @en Tooltip theme type.
   */
  type: {
    type: String as PropType<
      'default' | 'primary' | 'success' | 'warning' | 'danger' | 'light'
    >,
    default: 'default',
  },
} as const

export const tooltipEmits = {
  /**
   * @description 绑定值变化时触发。
   * @en Triggered when the bound value changes.
   */
  'update:modelValue': (visible: boolean) => typeof visible === 'boolean',
  /**
   * @description 显示时触发。
   * @en Triggered when shown.
   */
  show: () => true,
  /**
   * @description 隐藏时触发。
   * @en Triggered when hidden.
   */
  hide: () => true,
}

export const tooltipSlots = {
  /**
   * @description 提示内容
   * @en Tooltip content
   */
  default: {},
  /**
   * @description 触发元素
   * @en Trigger element
   */
  reference: {},
}

export type TooltipProps = ExtractPropTypes<typeof tooltipProps>
export type TooltipEmits = typeof tooltipEmits
