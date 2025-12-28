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

  <Teleport :to="teleportTo" :disabled="!teleportTo">
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
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { popupProps, popupEmits, type PopupPlacement } from './props'

defineOptions({
  name: 'AmuPopup',
  inheritAttrs: false,
})

const props = defineProps(popupProps)
const emit = defineEmits(popupEmits)

const referenceRef = ref<HTMLElement | null>(null)
const popupRef = ref<HTMLElement | null>(null)
const visible = ref(props.modelValue)
const currentPlacement = ref(props.placement)
const position = ref({ top: 0, left: 0 })
const isPositioned = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null
let resizeObserver: ResizeObserver | null = null

const zIndex = computed(() => props.zIndex)

const popupStyle = computed(() => ({
  zIndex: zIndex.value,
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
  () => props.placement,
  (val) => {
    currentPlacement.value = val
    updatePosition()
  }
)

const show = () => {
  if (props.disabled) return
  clearTimer()
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

const getOffset = () => {
  if (Array.isArray(props.offset)) {
    return { x: props.offset[0], y: props.offset[1] }
  }
  return { x: 0, y: props.offset }
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

  const popupRect = popupRef.value.getBoundingClientRect()
  const targetRect = getTeleportTargetRect()
  const { x: offsetX, y: offsetY } = getOffset()
  
  let top = 0
  let left = 0
  let placement = props.placement

  // Basic positioning logic
  const calculate = (p: PopupPlacement) => {
    const scrollX = window.scrollX
    const scrollY = window.scrollY
    
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
        top = baseTop - popupRect.height - offsetY + scrollAdjustmentY
        left = baseLeft + (refRect.width - popupRect.width) / 2 + scrollAdjustmentX
        break
      case 'top-start':
        top = baseTop - popupRect.height - offsetY + scrollAdjustmentY
        left = baseLeft + scrollAdjustmentX
        break
      case 'top-end':
        top = baseTop - popupRect.height - offsetY + scrollAdjustmentY
        left = baseLeft + refRect.width - popupRect.width + scrollAdjustmentX
        break
      case 'bottom':
        top = baseTop + refRect.height + offsetY + scrollAdjustmentY
        left = baseLeft + (refRect.width - popupRect.width) / 2 + scrollAdjustmentX
        break
      case 'bottom-start':
        top = baseTop + refRect.height + offsetY + scrollAdjustmentY
        left = baseLeft + scrollAdjustmentX
        break
      case 'bottom-end':
        top = baseTop + refRect.height + offsetY + scrollAdjustmentY
        left = baseLeft + refRect.width - popupRect.width + scrollAdjustmentX
        break
      case 'left':
        top = baseTop + (refRect.height - popupRect.height) / 2 + scrollAdjustmentY
        left = baseLeft - popupRect.width - offsetX + scrollAdjustmentX
        break
      case 'left-start':
        top = baseTop + scrollAdjustmentY
        left = baseLeft - popupRect.width - offsetX + scrollAdjustmentX
        break
      case 'left-end':
        top = baseTop + refRect.height - popupRect.height + scrollAdjustmentY
        left = baseLeft - popupRect.width - offsetX + scrollAdjustmentX
        break
      case 'right':
        top = baseTop + (refRect.height - popupRect.height) / 2 + scrollAdjustmentY
        left = baseLeft + refRect.width + offsetX + scrollAdjustmentX
        break
      case 'right-start':
        top = baseTop + scrollAdjustmentY
        left = baseLeft + refRect.width + offsetX + scrollAdjustmentX
        break
      case 'right-end':
        top = baseTop + refRect.height - popupRect.height + scrollAdjustmentY
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
  } else if (placement.startsWith('bottom') && calculatedTop + popupRect.height - scrollTop > viewportHeight) {
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
  } else if (placement.startsWith('right') && left + popupRect.width - scrollLeft > viewportWidth) {
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
  background: var(--amu-color-bg-elevated);
  color: var(--amu-color-text);
  border-radius: var(--amu-radius);
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
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
</style>
