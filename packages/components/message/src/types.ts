// packages/components/message/src/types.ts
import type { VNode, ComponentInternalInstance, Ref } from 'vue'

export type MessageType = 'info' | 'success' | 'warning' | 'error' | 'help' | 'loading'

export type MessagePlacement = 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right'

export type MessageContent = string | VNode | (() => VNode)
export type MessageIcon = string | VNode | (() => VNode)

export interface MessageOptions {
  id?: string
  message?: MessageContent
  type?: MessageType
  icon?: MessageIcon
  dangerouslyUseHTMLString?: boolean
  customClass?: string
  duration?: number
  showClose?: boolean
  center?: boolean
  onClose?: () => void
  offset?: number
  zIndex?: number
  grouping?: boolean
  placement?: MessagePlacement
  closeText?: string
  appendTo?: HTMLElement | string
}

export interface MessageInstanceProps {
  id: string
  message?: MessageContent
  type?: MessageType
  icon?: MessageIcon
  dangerouslyUseHTMLString?: boolean
  customClass?: string
  duration?: number
  showClose?: boolean
  center?: boolean
  onClose?: () => void
  offset?: number
  zIndex?: number
  placement?: MessagePlacement
  closeText?: string
}

export type MessageOptionsTyped = Omit<MessageOptions, 'type'>

export interface MessageHandle {
  close: () => void
  id: string
}

export interface MessageInstance {
  id: string
  vnode: VNode
  vm: ComponentInternalInstance
  handler: MessageHandle
  props: MessageInstanceProps
  close: () => void
  bottom: Ref<number>
  visible: Ref<boolean>
}

export type MessageFn = {
  (options: MessageOptions | string): MessageHandle
  info: (options: MessageOptionsTyped | string) => MessageHandle
  success: (options: MessageOptionsTyped | string) => MessageHandle
  warning: (options: MessageOptionsTyped | string) => MessageHandle
  error: (options: MessageOptionsTyped | string) => MessageHandle
  help: (options: MessageOptionsTyped | string) => MessageHandle
  loading: (options: MessageOptionsTyped | string) => MessageHandle
  closeAll: (type?: MessageType) => void
}
