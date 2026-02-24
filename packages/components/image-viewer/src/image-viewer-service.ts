import { createVNode, render } from 'vue'
import ImageViewer from './image-viewer.vue'
import type { ImageViewerProps } from './props'

type ImageViewerServiceOptions = Partial<ImageViewerProps> & {
  onClose?: () => void
}

export const previewImage = (options: ImageViewerServiceOptions = {}) => {
  if (typeof document === 'undefined') return

  const container = document.createElement('div')

  // We need to capture the close event to unmount
  const props = {
    ...options,
    visible: true, // Force visible
    
    // Override onClose to include cleanup
    onClose: () => {
      options.onClose?.()
      // Give time for transition
      setTimeout(() => {
        render(null, container)
      }, 500)
    },
    'onUpdate:visible': (val: boolean) => {
       if (!val) {
         // Trigger close logic
         props.onClose()
       }
    }
  }

  const vnode = createVNode(ImageViewer, props)
  render(vnode, container)
}
