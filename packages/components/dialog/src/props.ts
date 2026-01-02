import type { ExtractPropTypes, PropType, VNode, Component } from 'vue'
import type { ButtonProps } from '../../button/src/props'

export type DialogType = 'confirm' | 'feedback' | 'custom' | 'async'
export type DialogPlacement = 
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end'
  | 'center'

export type DialogButtonProps = string | Partial<ButtonProps> | VNode | Component

export const dialogProps = {
  /**
   * @description 是否显示对话框
   * @en Whether to show the dialog
   */
  modelValue: {
    type: Boolean,
    default: false
  },
  /**
   * @description 对话框类型
   * @en Dialog type
   * @values 'confirm', 'feedback', 'custom', 'async'
   */
  type: {
    type: String as PropType<DialogType>,
    default: 'confirm'
  },
  /**
   * @description 标题
   * @en Title
   */
  title: {
    type: String,
    default: ''
  },
  /**
   * @description 描述内容
   * @en Description content
   */
  description: {
    type: String,
    default: ''
  },
  /**
   * @description 自定义图标
   * @en Custom icon
   */
  icon: {
    type: [String, Object] as PropType<string | VNode | Component>,
    default: ''
  },
  /**
   * @description 确认按钮配置，支持字符串（按钮文本）或对象（按钮属性）
   * @en Confirm button configuration, supports string (button text) or object (button props)
   */
  confirmBtn: {
    type: [String, Object] as PropType<DialogButtonProps>,
    default: undefined
  },
  /**
   * @description 取消按钮配置，支持字符串（按钮文本）或对象（按钮属性）
   * @en Cancel button configuration, supports string (button text) or object (button props)
   */
  cancelBtn: {
    type: [String, Object] as PropType<DialogButtonProps>,
    default: undefined
  },
  /**
   * @description 异步加载状态，用于 async 类型
   * @en Async loading state, for async type
   */
  asyncLoading: {
    type: Boolean,
    default: false
  },
  /**
   * @description 对话框位置
   * @en Dialog placement
   * @values 'top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end', 'center'
   */
  placement: {
    type: String as PropType<DialogPlacement>,
    default: 'top'
  },
  /**
   * @description 距离顶部的偏移量，仅在 placement 为 top/bottom 相关时生效
   * @en Offset from top, only works when placement is top/bottom related
   */
  top: {
    type: [Number, String],
    default: '15vh'
  },
  /**
   * @description 对话框宽度
   * @en Dialog width
   */
  width: {
    type: [Number, String],
    default: '50%'
  },
  /**
   * @description 是否可拖拽
   * @en Whether the dialog is draggable
   */
  draggable: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否显示遮罩层
   * @en Whether to show the mask
   */
  mask: {
    type: Boolean,
    default: true
  },
  /**
   * @description 点击遮罩层是否关闭
   * @en Whether to close when clicking the mask
   */
  maskClosable: {
    type: Boolean,
    default: true
  },
  /**
   * @description 按下 ESC 键是否关闭
   * @en Whether to close when pressing ESC
   */
  closeOnEsc: {
    type: Boolean,
    default: true
  },
  /**
   * @description 指定挂载节点
   * @en Specify the mount node
   */
  teleportTo: {
    type: [String, Object, Function] as PropType<string | HTMLElement | (() => HTMLElement)>,
    default: 'body'
  },
  /**
   * @description 自定义 z-index
   * @en Custom z-index
   */
  zIndex: {
    type: Number,
    default: undefined
  },
  /**
   * @description 关闭时销毁元素
   * @en Destroy elements when closed
   */
  destroyOnClose: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否锁定背景滚动
   * @en Whether to lock background scroll
   */
  lockScroll: {
    type: Boolean,
    default: true
  },
  /**
   * @description 是否为模态对话框
   * @en Whether it is a modal dialog
   */
  modal: {
    type: Boolean,
    default: true
  },
  /**
   * @description 插件模式（内部使用）
   * @en Plugin mode (Internal use)
   */
  pluginMode: {
    type: Boolean,
    default: false
  },
  // Internal use for plugin mode to handle promise
  onBeforeClose: {
    type: Function as PropType<(done: () => void) => void>,
    default: undefined
  }
}

export type DialogProps = ExtractPropTypes<typeof dialogProps>

export const dialogEmits = {
  /**
   * @description 绑定值变化时触发
   * @en Triggered when the binding value changes
   */
  'update:modelValue': (visible: boolean) => typeof visible === 'boolean',
  /**
   * @description 打开时触发
   * @en Triggered when opened
   */
  open: () => true,
  /**
   * @description 打开动画结束时触发
   * @en Triggered when the open animation ends
   */
  opened: () => true,
  /**
   * @description 关闭时触发
   * @en Triggered when closed
   */
  close: () => true,
  /**
   * @description 关闭动画结束时触发
   * @en Triggered when the close animation ends
   */
  closed: () => true,
  /**
   * @description 点击确认按钮时触发
   * @en Triggered when the confirm button is clicked
   */
  confirm: () => true,
  /**
   * @description 点击取消按钮时触发
   * @en Triggered when the cancel button is clicked
   */
  cancel: () => true
}
