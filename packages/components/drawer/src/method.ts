import { createVNode, render, shallowReactive } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import AmuDrawer from './drawer.vue'
import { DrawerProps } from './props'

type DrawerOptions = Partial<DrawerProps>

export interface DrawerInstance {
  close: () => void
  destroy: () => void
  component: ComponentPublicInstance
}

const instances = shallowReactive<DrawerInstance[]>([])

export const Drawer = {
  open(options: DrawerOptions = {}) {
    const container = document.createElement('div')
    
    // 函数式调用的默认选项
    const props = {
      ...options,
      modelValue: true, // 强制打开
      destroyOnClose: true, // 函数式 API 默认为关闭后销毁，以清理 DOM
      'onUpdate:modelValue': (val: boolean) => {
         if (!val) {
             cleanup()
         }
      },
      onClosed: () => {
        if (options.onClosed) options.onClosed() // 调用用户回调
        cleanup()
      }
    }

    const vnode = createVNode(AmuDrawer, props)
    
    // 渲染到容器
    // 注意：AmuDrawer 内部使用了 Teleport，所以实际内容会渲染到目标（body）， 
    // 但组件实例存在于 container 中。
    render(vnode, container)
    
    // 我们不必将 container 挂载到 body，因为 Teleport 会处理 UI。
    // 但我们需要保持 vnode 存活。
    // 实际上，createVNode + render 就足够了。
    
    const instance: DrawerInstance = {
      close: () => {
        if (vnode.component?.exposed?.close) {
             vnode.component.exposed.close()
        } else {
             // 如果无法访问 exposed 的兜底处理
             ;(vnode.component as any).props.modelValue = false
             // 重新渲染？不，vnode props 通常是只读的或需要更新机制。
             // 最好的方式是使用响应式 prop 或 exposed 方法。
        }
      },
      destroy: cleanup,
      component: vnode.component!.proxy!
    }

    function cleanup() {
      render(null, container)
      // 检查是否需要移除容器？它并未挂载到 DOM。
    }

    instances.push(instance)

    return instance
  }
}
