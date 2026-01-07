import { createVNode, render } from 'vue'
import MessageManager from './message-manager.vue'
import type { MessageFn, MessageOptions, MessageHandle, MessageType, MessageOptionsTyped } from './types'

const isClient = typeof window !== 'undefined'

let messageContainer: any = null
let seed = 0

// 确保容器存在
const getContainer = () => {
  if (!isClient) return null
  
  if (!messageContainer) {
    const container = document.createElement('div')
    container.className = 'amu-message-container-root'
    document.body.appendChild(container)
    
    // 创建管理器的 VNode
    const vnode = createVNode(MessageManager)
    render(vnode, container)
    // 获取组件实例
    // 优先使用 exposed (script setup)，降级使用 proxy
    messageContainer = vnode.component!.exposed || vnode.component!.proxy
    
    // 增加空值检查，防止渲染失败导致 crash
    if (!messageContainer) {
      console.error('[AmuUI Message] Failed to create message container instance.')
      return null
    }
  }
  return messageContainer
}

// 规范化参数选项
const normalizeOptions = (params: MessageOptions | string): MessageOptions => {
  const isString = (val: any) => typeof val === 'string'
  const isFunction = (val: any) => typeof val === 'function'
  
  const options: MessageOptions = 
    !params || isString(params) || isFunction(params) || (typeof params === 'object' && params !== null && 'render' in (params as any)) 
      ? { message: params as any } 
      : params as MessageOptions
      
  return options
}

const createMessage = (options: MessageOptions): MessageHandle & { id: string } => {
  const container = getContainer()
  if (!container) {
    console.warn('[AmuUI Message] Failed to mount message container (SSR?)')
    return { close: () => {}, id: '' }
  }

  const id = options.id ?? `amu-message-${seed++}`
  const userOnClose = options.onClose

  // 包装 onClose 用于清理/回调
  // 注意：实际移除由容器调用 remove(id) 处理
  // 但我们希望保留用户回调
  
  const mergedOptions: MessageOptions = {
    ...options,
    id,
    onClose: () => {
      if (userOnClose) userOnClose()
    }
  }

  // 检查是否替换现有消息
  // 通过暴露的 update 方法进行检测和更新
  const updated = container.update ? container.update(id, mergedOptions) : false
  
  if (!updated && container.add) {
     // 如果 update 方法不存在或返回 false (未找到)，则添加新消息
     container.add(mergedOptions)
  }

  const handle = {
    id,
    close: () => {
      container.remove(id)
    }
  }

  return handle
}

const messageFn: any = (options: MessageOptions | string) => {
  return createMessage(normalizeOptions(options))
}

const types: MessageType[] = ['success', 'warning', 'info', 'error', 'help', 'loading']

types.forEach(type => {
  messageFn[type] = (options: MessageOptionsTyped | string) => {
    const normalized = normalizeOptions(options)
    if (type === 'loading' && normalized.duration === undefined) {
      normalized.duration = 0
    }
    return createMessage({ ...normalized, type })
  }
})

messageFn.closeAll = (type?: MessageType) => {
  const container = getContainer()
  if (container) {
    container.closeAll(type)
  }
}

export const Message = messageFn as MessageFn
