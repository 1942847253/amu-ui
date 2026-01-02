import { createVNode, render, type AppContext } from 'vue'
import DialogComponent from './dialog.vue'
import type { DialogProps } from './props'

export type DialogOptions = Partial<DialogProps> & {
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void
  appContext?: AppContext
}

const Dialog = (options: DialogOptions) => {
  const container = document.createElement('div')
  
  const originalOnConfirm = options.onConfirm
  
  let onBeforeClose: ((done: () => void) => void) | undefined = undefined
  
  if (originalOnConfirm) {
      onBeforeClose = (done: () => void) => {
          const res = originalOnConfirm()
          if (res && (res instanceof Promise || typeof (res as any).then === 'function')) {
              res.then(() => {
                  done()
              }).catch((e: any) => {
                  console.error(e)
                  // If promise rejects, we don't call done(), so dialog stays open and loading stops
              })
          } else {
              done()
          }
      }
  }

  // We need to keep track of current props to update them
  let currentProps = {
    ...options,
    modelValue: true,
    pluginMode: true,
    onBeforeClose,
    'onUpdate:modelValue': (val: boolean) => {
      if (!val) {
        close()
      }
    },
    onClosed: () => {
        render(null, container)
    },
    onCancel: () => {
        options.onCancel?.()
    },
    // onConfirm event is emitted by component, but we handled logic via onBeforeClose
  }

  const close = () => {
      currentProps.modelValue = false
      const newVNode = createVNode(DialogComponent, { ...currentProps })
      if (options.appContext) {
        newVNode.appContext = options.appContext
      }
      render(newVNode, container)
  }

  const vnode = createVNode(DialogComponent, { ...currentProps })
  if (options.appContext) {
    vnode.appContext = options.appContext
  }
  
  render(vnode, container)
  
  return {
    close
  }
}

export default Dialog
