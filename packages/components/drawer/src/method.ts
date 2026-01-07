import { createVNode, render, shallowReactive } from 'vue'
import type { ComponentPublicInstance, VNode } from 'vue'
import AmuDrawer from './drawer.vue'
import { DrawerProps } from './props'

type DrawerOptions = Partial<DrawerProps> & {
  onClosed?: () => void
}

export interface DrawerInstance {
  close: () => void
  destroy: () => void
  component: ComponentPublicInstance
}

const instances = shallowReactive<DrawerInstance[]>([])

export const Drawer = {
  open(options: DrawerOptions = {}) {
    const container = document.createElement('div')
    let vnode: VNode | null = null

    const cleanup = () => {
      render(null, container)
      const idx = instances.indexOf(instance)
      if (idx !== -1) instances.splice(idx, 1)
    }

    const props = {
      ...options,
      destroyOnClose: true, // 函数式 API 默认为关闭后销毁，以清理 DOM
      'onUpdate:modelValue': (val: boolean) => {
        if (!val) {
          renderVNode(false)
        }
      },
      onClosed: () => {
        if (options.onClosed) options.onClosed() // 调用用户回调
        cleanup()
      }
    }

    const renderVNode = (visible: boolean) => {
      vnode = createVNode(AmuDrawer, {
        ...props,
        modelValue: visible,
      })
      render(vnode, container)
    }
    
    // Initial render
    renderVNode(true)
    
    const instance: DrawerInstance = {
      close: () => {
        renderVNode(false)
      },
      destroy: cleanup,
      get component() {
        return vnode!.component!.proxy as ComponentPublicInstance
      }
    }

    instances.push(instance)

    return instance
  }
}
