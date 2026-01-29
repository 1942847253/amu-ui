import { computed, onMounted, onUnmounted, ref, watch, type CSSProperties, type SetupContext, type Ref } from 'vue'
import type { ImageViewerProps, ImageViewerEmits } from './props'

const MIN_SCALE = 0.2
const MAX_SCALE = 3.0

export const useImageViewer = (
  props: ImageViewerProps,
  emit: SetupContext<ImageViewerEmits>['emit'],
  visible?: Ref<boolean>
) => {
  // --- State ---
  const index = ref(props.initialIndex)
  const wrapperRef = ref<HTMLElement>()
  const imgRef = ref<HTMLImageElement>()
  const loading = ref(false)
  
  const transform = ref({
    scale: 1,
    deg: 0,
    offsetX: 0,
    offsetY: 0,
    flipX: 1,
    enableTransition: true,
  })

  const isDragging = ref(false)

  // --- Helpers ---
  const reset = () => {
    transform.value = {
      scale: 1,
      deg: 0,
      offsetX: 0,
      offsetY: 0,
      flipX: 1,
      enableTransition: true,
    }
  }

  // --- Watch ---
  watch(() => props.initialIndex, (val) => {
    index.value = val
  })

  watch(() => props.visible, (val) => {
    if (val) {
      reset()
    }
  })

  watch(index, (val) => {
    reset()
    emit('change', val)
    // Simple preload
    const nextIndex = (val + 1) % props.urlList.length
    const prevIndex = (val - 1 + props.urlList.length) % props.urlList.length
    if (props.urlList[nextIndex]) {
      const img = new Image()
      img.src = props.urlList[nextIndex]
    }
    if (props.urlList[prevIndex]) {
      const img = new Image()
      img.src = props.urlList[prevIndex]
    }
  })

  // --- Actions ---
  const hide = () => {
    if (visible) {
      visible.value = false
    }
    emit('update:visible', false)
    emit('close')
  }

  const prev = () => {
    if (props.infinite && index.value === 0) {
      index.value = props.urlList.length - 1
    } else if (index.value > 0) {
      index.value--
    }
  }

  const next = () => {
    if (props.infinite && index.value === props.urlList.length - 1) {
      index.value = 0
    } else if (index.value < props.urlList.length - 1) {
      index.value++
    }
  }

  const handleActions = (action: 'zoomIn' | 'zoomOut' | 'clockwise' | 'anticlockwise' | 'flipHorizontal' | 'fullScreen') => {
    switch (action) {
      case 'zoomIn':
        transform.value.scale = Math.min(transform.value.scale * 1.2, MAX_SCALE)
        break
      case 'zoomOut':
        transform.value.scale = Math.max(transform.value.scale / 1.2, MIN_SCALE)
        break
      case 'clockwise':
        transform.value.deg += 90
        emit('rotate', transform.value.deg)
        break
      case 'anticlockwise':
        transform.value.deg -= 90
        emit('rotate', transform.value.deg)
        break
      case 'flipHorizontal':
        transform.value.flipX = transform.value.flipX === 1 ? -1 : 1
        break
    }
  }

  // --- Interactions ---

  // Wheel Zoom
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault() // prevent page scroll
    if (loading.value) return 

    const delta = e.deltaY < 0 ? 1.1 : 0.9
    const newScale = Math.min(Math.max(transform.value.scale * delta, MIN_SCALE), MAX_SCALE)
    
    // Zoom around mouse
    // This requires calculating the offset change
    // X2 = Mx - (Mx - X1) * (S2 / S1)
    if (imgRef.value && wrapperRef.value) {
        const rect = wrapperRef.value.getBoundingClientRect()
        // Mouse position relative to center of wrapper
        const mouseX = e.clientX - rect.left - rect.width / 2
        const mouseY = e.clientY - rect.top - rect.height / 2
        
        transform.value.offsetX = mouseX - (mouseX - transform.value.offsetX) * (newScale / transform.value.scale)
        transform.value.offsetY = mouseY - (mouseY - transform.value.offsetY) * (newScale / transform.value.scale)
    }

    transform.value.scale = newScale
  }

  // Drag
  let startX = 0
  let startY = 0
  let startOffsetX = 0
  let startOffsetY = 0

  const handlePointerDown = (e: PointerEvent) => {
    if (loading.value || e.button !== 0) return // Only left click logic
    e.preventDefault()
    
    isDragging.value = true
    startX = e.clientX
    startY = e.clientY
    startOffsetX = transform.value.offsetX
    startOffsetY = transform.value.offsetY
    transform.value.enableTransition = false

    // Capture pointer
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: PointerEvent) => {
    if (!isDragging.value) return
    e.preventDefault()

    const dx = e.clientX - startX
    const dy = e.clientY - startY

    transform.value.offsetX = startOffsetX + dx
    transform.value.offsetY = startOffsetY + dy
  }

  const handlePointerUp = (e: PointerEvent) => {
    if (!isDragging.value) return
    isDragging.value = false
    transform.value.enableTransition = true
    ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
  }

  // Key Handler
  const handleKeydown = (e: KeyboardEvent) => {
    const isVisible = visible ? visible.value : props.visible
    if (!isVisible) return
    
    e.preventDefault()
    switch (e.code) {
      case 'Escape':
        if (props.closeOnPressEscape) hide()
        break
      case 'ArrowLeft':
        prev()
        break
      case 'ArrowRight':
        next()
        break
      case 'ArrowUp':
        handleActions('zoomIn')
        break
      case 'ArrowDown':
        handleActions('zoomOut')
        break
      case 'Space':
        reset()
        break
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
  })

  // --- Styles ---
  const imgStyle = computed<CSSProperties>(() => {
    const { scale, deg, offsetX, offsetY, enableTransition, flipX } = transform.value
    return {
      transform: `translate3d(${offsetX}px, ${offsetY}px, 0) scale(${scale * flipX}, ${scale}) rotate(${deg}deg)`,
      transition: enableTransition ? 'transform 0.3s cubic-bezier(0.2, 0, 0, 1)' : 'none',
    }
  })

  const currentUrl = computed(() => props.urlList[index.value])

  const download = async () => {
    const url = currentUrl.value
    if (!url) return

    try {
      const response = await fetch(url, { mode: 'cors' })
      const blob = await response.blob()
      const objectUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = objectUrl
      link.download = ''
      link.rel = 'noopener'
      link.click()
      URL.revokeObjectURL(objectUrl)
    } catch {
      const link = document.createElement('a')
      link.href = url
      link.download = ''
      link.rel = 'noopener'
      link.click()
    }
  }

  return {
    index,
    loading,
    transform,
    isDragging,
    wrapperRef,
    imgRef,
    hide,
    prev,
    next,
    handleActions,
    handleWheel,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    reset,
    imgStyle,
    currentUrl,
    download,
  }
}
