import type { VNode, ComponentPublicInstance, Ref } from 'vue'

export interface LoadingOptions {
  target?: HTMLElement | string
  body?: boolean
  fullscreen?: boolean
  lock?: boolean
  text?: string
  spinner?: VNode | string
  background?: string
  customClass?: string
  visible?: boolean
  size?: string | number
}

export interface LoadingInstance {
  close: () => void
  setText: (text: string) => void
  vm: VNode
  $el: HTMLElement
  originalPosition?: string
  originalOverflow?: string
  originalPaddingRight?: string
}

export type LoadingComponentPublicInstance = ComponentPublicInstance & {
    visible: Ref<boolean>
    setText: (text: string) => void
}

