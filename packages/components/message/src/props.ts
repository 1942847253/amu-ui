// packages/components/message/src/props.ts
import { PropType, VNode, ExtractPropTypes } from 'vue'
import type { MessageType, MessagePlacement, MessageContent, MessageIcon } from './types'

export const messageProps = {
  /**
   * @description 消息的唯一标识
   * @en Message ID
   */
  id: {
    type: String,
    default: '',
  },
  /**
   * @description 消息文字
   * @en Message text
   */
  message: {
    type: [String, Object, Function] as PropType<MessageContent>,
    default: '',
  },
  /**
   * @description 消息类型
   * @en Message type
   */
  type: {
    type: String as PropType<MessageType>,
    values: ['success', 'warning', 'info', 'error', 'help', 'loading'],
    default: 'info',
  },
  /**
   * @description 自定义图标组件，覆盖 type 对应的图标
   * @en Custom icon component, overrides the icon corresponding to type
   */
  icon: {
    type: [String, Object, Function] as PropType<MessageIcon>,
    default: '',
  },
  /**
   * @description 是否将 message 属性作为 HTML 片段处理
   * @en Whether to treat the message property as an HTML string
   */
  dangerouslyUseHTMLString: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 自定义类名
   * @en Custom class name
   */
  customClass: {
    type: String,
    default: '',
  },
  /**
   * @description 显示时间，单位为毫秒。设为 0 则不会自动关闭
   * @en Display duration, millisecond. If set to 0, it will not turn off automatically
   */
  duration: {
    type: Number,
    default: 3000,
  },
  /**
   * @description 是否显示关闭按钮
   * @en Whether to show a close button
   */
  showClose: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 文字是否居中
   * @en Whether to center the text
   */
  center: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 关闭时的回调函数
   * @en Callback function when closed
   */
  onClose: {
    type: Function as PropType<() => void>,
    required: false,
  },
  /**
   * @description 距离顶部的偏移量
   * @en Offset from the top
   */
  offset: {
    type: Number,
    default: 20,
  },
  /**
   * @description 设置层级
   * @en Initial z-index
   */
  zIndex: {
    type: Number,
    default: 0,
  },
  /**
   * @description 弹出位置
   * @en Position of the Message
   */
  placement: {
    type: String as PropType<MessagePlacement>,
    values: ['top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right'],
    default: 'top',
  },
  /**
   * @description 自定义关闭按钮文本，当 showClose 为 true 时有效
   * @en Custom close button text
   */
  closeText: {
    type: String,
    default: '',
  },
  /**
   * @description 同组消息是否合并 (TODO: 暂未实现)
   * @en Whether to merge messages with the same content (TODO: Not implemented yet)
   */
  grouping: {
    type: Boolean,
    default: false,
  },
} as const

export const messageEmits = {
  /**
   * @description 关闭消息时触发
   * @en Triggers when the message is being closed
   */
  close: () => true,
}

export const messageSlots = {
  /**
   * @description 自定义消息内容
   * @en Custom message content
   */
  default: {},
}

export type MessageProps = ExtractPropTypes<typeof messageProps>
export type MessageEmits = typeof messageEmits


