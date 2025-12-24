import { nextTick, onBeforeUnmount, watch, type Ref } from 'vue'

export type TriggerPopupPlacement = 'bottom-start' | 'top-start'

export type TriggerPopupStrategy = 'absolute' | 'fixed'

export type TriggerPopupOutsideEvent = 'click' | 'mousedown'

export type UseTriggerPopupOptions = {
  placement?: TriggerPopupPlacement
  strategy?: TriggerPopupStrategy
  outsideEvent?: TriggerPopupOutsideEvent
  /**
   * @description 弹层与触发器的间距（像素）
   */
  offset?: number
  /**
   * @description 视口边界留白（像素），用于 clamp
   */
  boundaryPadding?: number
  /**
   * @description 弹层 z-index
   */
  zIndex?: number
  /**
   * @description 是否让弹层宽度等于触发器宽度（Select 用）
   */
  matchWidth?: boolean
  /**
   * @description 是否启用“空间不足自动翻转”
   */
  autoFlip?: boolean
  /**
   * @description 是否把弹层位置 clamp 在视口内（DatePicker 用）
   */
  clamp?: boolean
  /**
   * @description top-start 是否使用 transform(-100%)（Select 用），否则使用实际高度计算 top（DatePicker 用）
   */
  useTransformTop?: boolean
  /**
   * @description 是否监听触发器尺寸变化并重定位（需要 ResizeObserver）
   */
  observeResize?: boolean
  /**
   * @description 关闭弹层的回调
   */
  onClose?: () => void

  /**
   * @description outside 关闭时需要忽略的选择器（用于弹层内嵌 Teleport 子弹层场景）
   */
  outsideIgnoreSelectors?: string[]
}

export function useTriggerPopup(
  triggerRef: Ref<HTMLElement | undefined>,
  popupRef: Ref<HTMLElement | undefined>,
  visible: Ref<boolean>,
  popupStyle: Ref<Record<string, string | number>>,
  options: UseTriggerPopupOptions = {},
) {
  const {
    placement = 'bottom-start',
    strategy = 'absolute',
    outsideEvent = 'click',
    offset = 4,
    boundaryPadding = 8,
    zIndex = 2000,
    matchWidth = false,
    autoFlip = true,
    clamp = false,
    useTransformTop = strategy === 'absolute',
    observeResize = false,
    onClose,
    outsideIgnoreSelectors = [],
  } = options

  let resizeObserver: ResizeObserver | null = null

  const updatePosition = () => {
    if (!visible.value) return
    const trigger = triggerRef.value
    const popup = popupRef.value
    if (!trigger || !popup) return

    const rect = trigger.getBoundingClientRect()
    const scrollTop = strategy === 'absolute' ? document.documentElement.scrollTop || document.body.scrollTop : 0
    const scrollLeft = strategy === 'absolute' ? document.documentElement.scrollLeft || document.body.scrollLeft : 0
    const viewportHeight = window.innerHeight
    const viewportWidth = window.innerWidth

    const popupRect = popup.getBoundingClientRect()

    let finalPlacement: TriggerPopupPlacement = placement

    if (autoFlip) {
      const spaceBelow = viewportHeight - rect.bottom
      const spaceAbove = rect.top
      const needSpace = Math.max(200, popupRect.height + offset + boundaryPadding)
      if (spaceBelow < needSpace && spaceAbove > spaceBelow) {
        finalPlacement = 'top-start'
      }
    }

    const style: Record<string, string | number> = {
      zIndex,
      left: `${rect.left + scrollLeft}px`,
    }

    if (matchWidth) {
      style.width = `${rect.width}px`
      style.minWidth = `${rect.width}px`
    }

    if (finalPlacement === 'top-start') {
      if (useTransformTop) {
        style.top = `${rect.top + scrollTop - offset}px`
        style.transform = 'translateY(-100%)'
        style.transformOrigin = 'center bottom'
      } else {
        style.top = `${rect.top + scrollTop - popupRect.height - offset}px`
        style.transformOrigin = 'center bottom'
      }
    } else {
      style.top = `${rect.bottom + scrollTop + offset}px`
      style.transformOrigin = 'center top'
      if (useTransformTop) {
        style.transform = ''
      }
    }

    if (clamp) {
      const leftNum = Number(String(style.left).replace('px', ''))
      const topNum = Number(String(style.top).replace('px', ''))

      const maxLeft = viewportWidth - popupRect.width - boundaryPadding
      const clampedLeft = Math.min(Math.max(boundaryPadding, leftNum), Math.max(boundaryPadding, maxLeft))
      style.left = `${clampedLeft}px`

      const maxTop = viewportHeight - popupRect.height - boundaryPadding
      const clampedTop = Math.min(Math.max(boundaryPadding, topNum), Math.max(boundaryPadding, maxTop))
      style.top = `${clampedTop}px`
    }

    popupStyle.value = style
  }

  const handleOutsideClick = (e: MouseEvent) => {
    if (!visible.value) return
    const trigger = triggerRef.value
    const popup = popupRef.value
    const target = e.target as Node

    if (outsideIgnoreSelectors.length) {
      const el = (e.target as Element | null) ?? null
      if (
        el &&
        outsideIgnoreSelectors.some((selector) => {
          try {
            return !!el.closest(selector)
          } catch {
            return false
          }
        })
      ) {
        return
      }
    }

    if (trigger && trigger.contains(target)) return
    if (popup && popup.contains(target)) return

    onClose?.()
  }

  const handleKeydown = (e: KeyboardEvent) => {
    if (!visible.value) return
    if (e.key !== 'Escape') return
    onClose?.()
  }

  const bind = () => {
    window.addEventListener(outsideEvent, handleOutsideClick)
    window.addEventListener('keydown', handleKeydown)
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    if (observeResize && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        if (visible.value) updatePosition()
      })
      if (triggerRef.value) resizeObserver.observe(triggerRef.value)
    }
  }

  const unbind = () => {
    window.removeEventListener(outsideEvent, handleOutsideClick)
    window.removeEventListener('keydown', handleKeydown)
    window.removeEventListener('resize', updatePosition)
    window.removeEventListener('scroll', updatePosition, true)

    resizeObserver?.disconnect()
    resizeObserver = null
  }

  watch(
    visible,
    (val) => {
      if (val) {
        nextTick(() => {
          updatePosition()
          bind()
        })
      } else {
        unbind()
      }
    },
    { immediate: false },
  )

  onBeforeUnmount(() => {
    unbind()
  })

  return {
    updatePosition,
  }
}
