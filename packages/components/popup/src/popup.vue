<template>
  <div
    ref="referenceRef"
    class="amu-popup-reference"
    @click="onClick"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <slot name="reference" />
  </div>

  <Teleport :to="teleportTo || 'body'" :disabled="!teleportTo">
    <Transition :name="transition" @after-leave="onAfterLeave">
      <div
        v-if="visible"
        ref="popupRef"
        class="amu-popup"
        v-bind="$attrs"
        :style="popupStyle"
        :data-placement="currentPlacement"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
        @click.stop
      >
        <div v-if="showArrow" class="amu-popup__arrow" />
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useZIndex } from '@amu-ui/hooks'
import { popupProps, popupEmits, type PopupPlacement } from './props'

defineOptions({
  name: 'AmuPopup',
  inheritAttrs: false,
})

const props = defineProps(popupProps)
const emit = defineEmits(popupEmits)
const { nextZIndex } = useZIndex()

const referenceRef = ref<HTMLElement | null>(null)
const popupRef = ref<HTMLElement | null>(null)
const visible = ref(props.modelValue)
const currentPlacement = ref(props.placement)
const position = ref({ top: 0, left: 0 })
const isPositioned = ref(false)
const currentZIndex = ref(props.zIndex || nextZIndex())
let timer: ReturnType<typeof setTimeout> | null = null
let resizeObserver: ResizeObserver | null = null

const popupStyle = computed(() => ({
  zIndex: currentZIndex.value,
  top: `${position.value.top}px`,
  left: `${position.value.left}px`,
  position: 'absolute' as const,
  visibility: isPositioned.value ? 'visible' as const : 'hidden' as const,
}))

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      show()
    } else {
      hide()
    }
  }
)

watch(
  () => props.zIndex,
  (val) => {
    if (val !== undefined) {
      currentZIndex.value = val
    }
  }
)

watch(
  () => props.placement,
  (val) => {
    currentPlacement.value = val
    updatePosition()
  }
)

const show = () => {
  if (props.disabled) return
  clearTimer()
  if (props.zIndex !== undefined) {
    currentZIndex.value = props.zIndex
  } else {
    currentZIndex.value = nextZIndex()
  }
  visible.value = true
  isPositioned.value = false
  emit('update:modelValue', true)
  emit('show')
  nextTick(() => {
    updatePosition()
    window.addEventListener('click', onClickOutside)
    window.addEventListener('keydown', onEsc)
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    if (referenceRef.value) {
      resizeObserver = new ResizeObserver(updatePosition)
      resizeObserver.observe(referenceRef.value)
    }
  })
}

const hide = () => {
  clearTimer()
  visible.value = false
  isPositioned.value = false
  emit('update:modelValue', false)
  emit('hide')
  window.removeEventListener('click', onClickOutside)
  window.removeEventListener('keydown', onEsc)
  window.removeEventListener('resize', updatePosition)
  window.removeEventListener('scroll', updatePosition, true)

  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
}

const toggle = () => {
  if (visible.value) {
    hide()
  } else {
    show()
  }
}

const onClick = (e: MouseEvent) => {
  if (props.trigger === 'click') {
    e.stopPropagation()
    toggle()
  }
}

const onMouseEnter = () => {
  if (props.trigger === 'hover') {
    clearTimer()
    if (!visible.value) {
      show()
    }
  }
}

const onMouseLeave = () => {
  if (props.trigger === 'hover') {
    timer = setTimeout(() => {
      hide()
    }, 200)
  }
}

const onClickOutside = (e: MouseEvent) => {
  if (!props.closeOnClickOutside) return
  const target = e.target as Node
  if (
    referenceRef.value &&
    !referenceRef.value.contains(target) &&
    popupRef.value &&
    !popupRef.value.contains(target)
  ) {
    hide()
  }
}

const onEsc = (e: KeyboardEvent) => {
  if (props.closeOnEsc && e.key === 'Escape') {
    hide()
  }
}

const clearTimer = () => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

const onAfterLeave = () => {
  // Cleanup if needed
}

const getTeleportTargetRect = () => {
  if (!props.teleportTo) return { top: 0, left: 0 }
  if (typeof props.teleportTo === 'string') {
    if (props.teleportTo === 'body') return { top: 0, left: 0 }
    const el = document.querySelector(props.teleportTo)
    return el ? el.getBoundingClientRect() : { top: 0, left: 0 }
  }
  return (props.teleportTo as HTMLElement).getBoundingClientRect()
}

const updatePosition = () => {
  if (!visible.value || !referenceRef.value || !popupRef.value) return

  const refRect = referenceRef.value.getBoundingClientRect()
  
  if (props.matchWidth) {
    popupRef.value.style.minWidth = `${refRect.width}px`
  }

  const popupWidth = popupRef.value.offsetWidth
  const popupHeight = popupRef.value.offsetHeight
  const targetRect = getTeleportTargetRect()
  
  let top = 0
  let left = 0
  let placement = props.placement

  // Basic positioning logic
  const calculate = (p: PopupPlacement) => {
    const scrollX = window.scrollX
    const scrollY = window.scrollY

    // Calculate offset based on placement
    let offsetX = 0
    let offsetY = 0
    if (Array.isArray(props.offset)) {
      offsetX = props.offset[0]
      offsetY = props.offset[1]
    } else {
      if (p.startsWith('top') || p.startsWith('bottom')) {
        offsetY = props.offset
      } else {
        offsetX = props.offset
      }
    }

    // Add arrow offset if needed
    if (props.showArrow) {
      const arrowOffset = 4
      if (p.startsWith('top') || p.startsWith('bottom')) {
        offsetY += arrowOffset
      } else if (p.startsWith('left') || p.startsWith('right')) {
        offsetX += arrowOffset
      }
    }
    
    // Adjust for teleport target offset
    const baseTop = refRect.top - targetRect.top
    const baseLeft = refRect.left - targetRect.left

    // If teleport target is body, we need to add scroll. 
    // If it's not body, we assume it's a positioned element and we are calculating relative to it.
    // However, getBoundingClientRect is viewport relative.
    // If target is body, targetRect is (0,0) usually (unless body has margin/transform).
    // If target is a div, targetRect is its viewport position.
    // The popup is absolute positioned.
    // If target is body: top = refRect.top + scrollY. (baseTop + scrollY)
    // If target is div (relative): top = refRect.top - targetRect.top + target.scrollTop?
    // Wait, if target is relative, absolute child is relative to padding box.
    // refRect.top - targetRect.top gives the distance from target top border to ref top border.
    // This is exactly what we need for 'top'.
    // BUT, if we are teleported to body, we need scrollY because body is the initial containing block (usually).
    
    const isBody = props.teleportTo === 'body' || (typeof props.teleportTo === 'object' && props.teleportTo === document.body)
    const scrollAdjustmentX = isBody ? scrollX : 0
    const scrollAdjustmentY = isBody ? scrollY : 0

    switch (p) {
      case 'top':
        top = baseTop - popupHeight - offsetY + scrollAdjustmentY
        left = baseLeft + (refRect.width - popupWidth) / 2 + scrollAdjustmentX
        break
      case 'top-start':
        top = baseTop - popupHeight - offsetY + scrollAdjustmentY
        left = baseLeft + scrollAdjustmentX
        break
      case 'top-end':
        top = baseTop - popupHeight - offsetY + scrollAdjustmentY
        left = baseLeft + refRect.width - popupWidth + scrollAdjustmentX
        break
      case 'bottom':
        top = baseTop + refRect.height + offsetY + scrollAdjustmentY
        left = baseLeft + (refRect.width - popupWidth) / 2 + scrollAdjustmentX
        break
      case 'bottom-start':
        top = baseTop + refRect.height + offsetY + scrollAdjustmentY
        left = baseLeft + scrollAdjustmentX
        break
      case 'bottom-end':
        top = baseTop + refRect.height + offsetY + scrollAdjustmentY
        left = baseLeft + refRect.width - popupWidth + scrollAdjustmentX
        break
      case 'left':
        top = baseTop + (refRect.height - popupHeight) / 2 + scrollAdjustmentY
        left = baseLeft - popupWidth - offsetX + scrollAdjustmentX
        break
      case 'left-start':
        top = baseTop + scrollAdjustmentY
        left = baseLeft - popupWidth - offsetX + scrollAdjustmentX
        break
      case 'left-end':
        top = baseTop + refRect.height - popupHeight + scrollAdjustmentY
        left = baseLeft - popupWidth - offsetX + scrollAdjustmentX
        break
      case 'right':
        top = baseTop + (refRect.height - popupHeight) / 2 + scrollAdjustmentY
        left = baseLeft + refRect.width + offsetX + scrollAdjustmentX
        break
      case 'right-start':
        top = baseTop + scrollAdjustmentY
        left = baseLeft + refRect.width + offsetX + scrollAdjustmentX
        break
      case 'right-end':
        top = baseTop + refRect.height - popupHeight + scrollAdjustmentY
        left = baseLeft + refRect.width + offsetX + scrollAdjustmentX
        break
    }
    return { top, left }
  }

  // Auto flip logic
  const { top: calculatedTop, left: calculatedLeft } = calculate(placement)
  
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  const scrollTop = window.scrollY
  const scrollLeft = window.scrollX
  
  // Vertical flip
  if (placement.startsWith('top') && calculatedTop - scrollTop < 0) {
    const newPlacement = placement.replace('top', 'bottom') as PopupPlacement
    placement = newPlacement
    const res = calculate(newPlacement)
    top = res.top
    left = res.left
  } else if (placement.startsWith('bottom') && calculatedTop + popupHeight - scrollTop > viewportHeight) {
    const newPlacement = placement.replace('bottom', 'top') as PopupPlacement
    placement = newPlacement
    const res = calculate(newPlacement)
    top = res.top
    left = res.left
  } else {
    top = calculatedTop
    left = calculatedLeft
  }

  // Horizontal flip (simple check for left/right placements)
  if (placement.startsWith('left') && left - scrollLeft < 0) {
     const newPlacement = placement.replace('left', 'right') as PopupPlacement
     placement = newPlacement
     const res = calculate(newPlacement)
     top = res.top
     left = res.left
  } else if (placement.startsWith('right') && left + popupWidth - scrollLeft > viewportWidth) {
     const newPlacement = placement.replace('right', 'left') as PopupPlacement
     placement = newPlacement
     const res = calculate(newPlacement)
     top = res.top
     left = res.left
  }

  currentPlacement.value = placement
  position.value = { top, left }
  isPositioned.value = true
}

onMounted(() => {
  if (props.modelValue) {
    show()
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('click', onClickOutside)
  window.removeEventListener('keydown', onEsc)
  window.removeEventListener('resize', updatePosition)
  window.removeEventListener('scroll', updatePosition, true)
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
})
defineExpose({
  popupRef,
  updatePosition,
})
</script>

<style scoped>
.amu-popup-reference {
  display: inline-flex;
}

.amu-popup {
  position: absolute;
  color: var(--amu-color-text);
  box-sizing: border-box;
  z-index: 2000; /* Ensure stacking context */
}

/* Background layer (No shadow) */
.amu-popup::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--amu-color-bg-elevated);
  border-radius: var(--amu-radius);
  z-index: -1;
}

/* Shadow layer */
.amu-popup::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--amu-radius);
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
  z-index: -3;
}

/* Fade transition */
.amu-popup-fade-enter-active,
.amu-popup-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.amu-popup-fade-enter-from,
.amu-popup-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.amu-popup__arrow {
  position: absolute;
  width: 8px;
  height: 8px;
  background: var(--amu-color-bg-elevated);
  transform: rotate(45deg);
  z-index: -2; /* Between Shadow and Background */
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
}

/* Top placements -> Arrow at bottom */
.amu-popup[data-placement^='top'] .amu-popup__arrow {
  bottom: -4px;
}
.amu-popup[data-placement='top'] .amu-popup__arrow {
  left: 50%;
  margin-left: -4px;
}
.amu-popup[data-placement='top-start'] .amu-popup__arrow {
  left: 16px;
}
.amu-popup[data-placement='top-end'] .amu-popup__arrow {
  right: 16px;
}

/* Bottom placements -> Arrow at top */
.amu-popup[data-placement^='bottom'] .amu-popup__arrow {
  top: -4px;
}
.amu-popup[data-placement='bottom'] .amu-popup__arrow {
  left: 50%;
  margin-left: -4px;
}
.amu-popup[data-placement='bottom-start'] .amu-popup__arrow {
  left: 16px;
}
.amu-popup[data-placement='bottom-end'] .amu-popup__arrow {
  right: 16px;
}

/* Left placements -> Arrow at right */
.amu-popup[data-placement^='left'] .amu-popup__arrow {
  right: -4px;
}
.amu-popup[data-placement='left'] .amu-popup__arrow {
  top: 50%;
  margin-top: -4px;
}
.amu-popup[data-placement='left-start'] .amu-popup__arrow {
  top: 12px;
}
.amu-popup[data-placement='left-end'] .amu-popup__arrow {
  bottom: 12px;
}

/* Right placements -> Arrow at left */
.amu-popup[data-placement^='right'] .amu-popup__arrow {
  left: -4px;
}
.amu-popup[data-placement='right'] .amu-popup__arrow {
  top: 50%;
  margin-top: -4px;
}
.amu-popup[data-placement='right-start'] .amu-popup__arrow {
  top: 12px;
}
.amu-popup[data-placement='right-end'] .amu-popup__arrow {
  bottom: 12px;
}
</style>
