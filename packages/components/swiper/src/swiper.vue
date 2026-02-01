<template>
  <div
    class="amu-swiper"
    :class="{
      'amu-swiper--vertical': isVertical,
      'amu-swiper--disabled': disabled,
      'amu-swiper--loading': loading
    }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="amu-swiper__viewport" :style="viewportStyle">
      <div
        ref="trackRef"
        class="amu-swiper__track"
        :style="trackStyle"
        @transitionend="handleTransitionEnd"
      >
        <component
          v-for="item in displayItems"
          :is="item.vnode"
          :key="item.key"
        />
      </div>
    </div>

    <button
      v-if="shouldShowArrows"
      class="amu-swiper__arrow amu-swiper__arrow--prev"
      type="button"
      :disabled="isInteractiveDisabled"
      @click="prev"
    >
      <slot name="prev">
        <span class="amu-swiper__arrow-icon amu-swiper__arrow-icon--prev"></span>
      </slot>
    </button>

    <button
      v-if="shouldShowArrows"
      class="amu-swiper__arrow amu-swiper__arrow--next"
      type="button"
      :disabled="isInteractiveDisabled"
      @click="next"
    >
      <slot name="next">
        <span class="amu-swiper__arrow-icon amu-swiper__arrow-icon--next"></span>
      </slot>
    </button>

    <div v-if="shouldShowIndicators" class="amu-swiper__indicators">
      <button
        v-for="index in indicatorCount"
        :key="index"
        class="amu-swiper__indicator"
        :class="{ 'is-active': index - 1 === currentIndex }"
        type="button"
        :disabled="isInteractiveDisabled"
        @click="handleIndicatorClick(index - 1)"
        @mouseenter="handleIndicatorHover(index - 1)"
      >
        <slot name="indicator" :index="index - 1" :active="index - 1 === currentIndex">
          <span class="amu-swiper__indicator-dot"></span>
        </slot>
      </button>
    </div>

    <AmuLoading
      :visible="loading"
      :text="loadingText"
      :spinner="loadingSpinner"
      :size="loadingSize"
    />
  </div>
</template>

<script setup lang="ts">
import { Comment, Fragment, Text, cloneVNode, computed, nextTick, onBeforeUnmount, onMounted, ref, useSlots, watch, type VNode } from 'vue'
import { swiperEmits, swiperProps } from './props'
import { AmuLoading } from '../../loading'

defineOptions({ name: 'AmuSwiper' })

const props = defineProps(swiperProps)
const emit = defineEmits(swiperEmits)
const slots = useSlots()

const currentIndex = ref(0)
const internalIndex = ref(0)
const transitionEnabled = ref(true)
const isTransitioning = ref(false)
const isHovering = ref(false)
const autoplayTimer = ref<number | null>(null)
const trackRef = ref<HTMLElement | null>(null)

const isVertical = computed(() => props.direction === 'vertical')
const isInteractiveDisabled = computed(() => props.disabled || props.loading)

const flattenSlotNodes = (nodes: VNode[]): VNode[] => {
  const result: VNode[] = []
  nodes.forEach((node) => {
    if (node.type === Comment) return
    if (node.type === Text && typeof node.children === 'string' && node.children.trim() === '') return
    if (node.type === Fragment && Array.isArray(node.children)) {
      result.push(...flattenSlotNodes(node.children as VNode[]))
      return
    }
    result.push(node)
  })
  return result
}

const slotItems = computed(() => flattenSlotNodes((slots.default?.() ?? []) as VNode[]))

const indicatorCount = computed(() => slotItems.value.length)
const shouldLoop = computed(() => props.loop && indicatorCount.value > 1)

const displayItems = computed(() => {
  if (slotItems.value.length === 0) return [] as Array<{ vnode: VNode; key: string | number }>
  const middle = slotItems.value.map((node, index) => ({
    vnode: node,
    key: node.key ?? `item-${index}`
  }))
  if (!shouldLoop.value) return middle
  const first = slotItems.value[0]
  const last = slotItems.value[slotItems.value.length - 1]
  const result: Array<{ vnode: VNode; key: string | number }> = []
  if (last) {
    result.push({ vnode: cloneVNode(last), key: 'clone-last' })
  }
  result.push(...middle)
  if (first) {
    result.push({ vnode: cloneVNode(first), key: 'clone-first' })
  }
  return result
})

const loadingSpinner = computed(() => {
  const nodes = slots.loading?.() as VNode[] | undefined
  return nodes?.[0]
})

const shouldShowIndicators = computed(() => props.showIndicators && indicatorCount.value > 1)
const shouldShowArrows = computed(() => props.showArrows && indicatorCount.value > 1)

const normalizeIndex = (index: number) => {
  const total = indicatorCount.value
  if (total <= 0) return 0
  if (shouldLoop.value) {
    const mod = ((index % total) + total) % total
    return mod
  }
  return Math.min(Math.max(index, 0), total - 1)
}

const syncInternalFromCurrent = () => {
  internalIndex.value = shouldLoop.value ? currentIndex.value + 1 : currentIndex.value
}

const setIndex = (index: number, shouldEmit = true) => {
  if (isTransitioning.value) return
  const next = normalizeIndex(index)
  if (next === currentIndex.value) return
  currentIndex.value = next
  syncInternalFromCurrent()
  if (props.duration > 0) {
    isTransitioning.value = true
  }
  if (shouldEmit) {
    emit('update:modelValue', next)
    emit('change', next)
  }
  restartAutoplay()
}

const next = () => {
  if (isInteractiveDisabled.value) return
  if (isTransitioning.value) return
  const total = indicatorCount.value
  if (total <= 1) return
  if (!shouldLoop.value) {
    setIndex(currentIndex.value + 1)
    return
  }
  internalIndex.value += 1
  currentIndex.value = normalizeIndex(currentIndex.value + 1)

  if (props.duration > 0) {
    isTransitioning.value = true
  } else if (internalIndex.value === total + 1) {
    internalIndex.value = 1
  }

  emit('update:modelValue', currentIndex.value)
  emit('change', currentIndex.value)
  restartAutoplay()
}

const prev = () => {
  if (isInteractiveDisabled.value) return
  if (isTransitioning.value) return
  const total = indicatorCount.value
  if (total <= 1) return
  if (!shouldLoop.value) {
    setIndex(currentIndex.value - 1)
    return
  }
  internalIndex.value -= 1
  currentIndex.value = normalizeIndex(currentIndex.value - 1)

  if (props.duration > 0) {
    isTransitioning.value = true
  } else if (internalIndex.value === 0) {
    internalIndex.value = total
  }

  emit('update:modelValue', currentIndex.value)
  emit('change', currentIndex.value)
  restartAutoplay()
}

const handleIndicatorClick = (index: number) => {
  if (isInteractiveDisabled.value) return
  if (isTransitioning.value) return
  if (props.indicatorTrigger === 'click') {
    setIndex(index)
  }
}

const handleIndicatorHover = (index: number) => {
  if (isInteractiveDisabled.value) return
  if (isTransitioning.value) return
  if (props.indicatorTrigger === 'hover') {
    setIndex(index)
  }
}

const viewportStyle = computed(() => {
  const heightValue = typeof props.height === 'number' ? `${props.height}px` : props.height
  return {
    height: heightValue
  }
})

const trackStyle = computed(() => {
  const offset = `${internalIndex.value * 100}%`
  const transformValue = isVertical.value
    ? `translateY(-${offset})`
    : `translateX(-${offset})`
  return {
    transform: transformValue,
    transitionDuration: transitionEnabled.value ? `${props.duration}ms` : '0ms'
  }
})

const jumpTo = (index: number) => {
  transitionEnabled.value = false
  internalIndex.value = index
  nextTick(() => {
    if (trackRef.value) {
      void trackRef.value.offsetHeight
    }
    requestAnimationFrame(() => {
      transitionEnabled.value = true
      isTransitioning.value = false
    })
  })
}

const handleTransitionEnd = (event: TransitionEvent) => {
  if (event.target !== trackRef.value || event.propertyName !== 'transform') return
  const total = indicatorCount.value
  if (!shouldLoop.value) {
    isTransitioning.value = false
    return
  }
  if (internalIndex.value === 0) {
    jumpTo(total)
  } else if (internalIndex.value === total + 1) {
    jumpTo(1)
  } else {
    isTransitioning.value = false
  }
}

const clearAutoplay = () => {
  if (autoplayTimer.value !== null) {
    window.clearInterval(autoplayTimer.value)
    autoplayTimer.value = null
  }
}

const startAutoplay = () => {
  clearAutoplay()
  if (!props.autoplay || isInteractiveDisabled.value || indicatorCount.value <= 1) return
  if (props.pauseOnHover && isHovering.value) return
  autoplayTimer.value = window.setInterval(() => {
    next()
  }, props.interval)
}

const restartAutoplay = () => {
  if (!props.autoplay) return
  startAutoplay()
}

const handleVisibilityChange = () => {
  if (document.hidden) {
    clearAutoplay()
  } else {
    startAutoplay()
  }
}

const handleMouseEnter = () => {
  isHovering.value = true
  if (props.pauseOnHover) {
    clearAutoplay()
  }
}

const handleMouseLeave = () => {
  isHovering.value = false
  if (props.pauseOnHover) {
    startAutoplay()
  }
}

watch(
  () => props.modelValue,
  (val) => {
    const next = normalizeIndex(val)
    if (next === currentIndex.value) return
    currentIndex.value = next
    syncInternalFromCurrent()
    if (props.duration > 0) {
      isTransitioning.value = true
    }
  }
)

// Initialize index immediately
currentIndex.value = normalizeIndex(props.modelValue)
syncInternalFromCurrent()

watch(indicatorCount, () => {
  currentIndex.value = normalizeIndex(currentIndex.value)
  syncInternalFromCurrent()
  restartAutoplay()
})

watch(
  () => [props.autoplay, props.interval, props.disabled, props.loading],
  () => {
    startAutoplay()
  }
)

onMounted(() => {
  document.addEventListener('visibilitychange', handleVisibilityChange)
  startAutoplay()
})

onBeforeUnmount(() => {
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  clearAutoplay()
})
</script>
