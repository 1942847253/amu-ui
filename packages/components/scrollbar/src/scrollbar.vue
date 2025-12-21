<template>
  <div ref="scrollbar" class="amu-scrollbar" :style="rootStyle">
    <div
      ref="wrap"
      :class="[
        wrapClass,
        'amu-scrollbar__wrap',
        { 'amu-scrollbar__wrap--hidden-default': !native },
      ]"
      :style="wrapStyle"
      @scroll="handleScroll"
    >
      <component
        :is="tag"
        ref="resize"
        :class="['amu-scrollbar__view', viewClass]"
        :style="viewStyle"
      >
        <slot />
      </component>
    </div>
    <template v-if="!native">
      <Thumb
        ref="barRef"
        :move="moveX"
        :ratio="ratioX"
        :size="sizeWidth"
        :always="always"
      />
      <Thumb
        ref="barRef"
        :move="moveY"
        :ratio="ratioY"
        :size="sizeHeight"
        vertical
        :always="always"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  nextTick,
  onMounted,
  onUpdated,
  provide,
  ref,
  onBeforeUnmount,
} from 'vue'
import { scrollbarContextKey } from './constants'
import { scrollbarProps, scrollbarEmits } from './props'
import Thumb from './thumb.vue'
import './style.css'

defineOptions({
  name: 'AmuScrollbar',
})

const props = defineProps(scrollbarProps)
const emits = defineEmits(scrollbarEmits)

const sizeWidth = ref('')
const sizeHeight = ref('')
const moveX = ref(0)
const moveY = ref(0)
const scrollbar = ref<HTMLDivElement>()
const wrap = ref<HTMLDivElement>()
const resize = ref<HTMLElement>()

const ratioY = ref(1)
const ratioX = ref(1)
const thumbHeight = ref(0)
const thumbWidth = ref(0)

const rootStyle = computed(() => {
  const style: any = {}
  if (props.height) style.height = addUnit(props.height)
  return style
})

const wrapStyle = computed(() => {
  const style: any = {}
  if (props.maxHeight) style.maxHeight = addUnit(props.maxHeight)
  return [props.wrapStyle, style]
})

const handleScroll = () => {
  if (wrap.value) {
    const offsetHeight = wrap.value.offsetHeight - GAP
    const offsetWidth = wrap.value.offsetWidth - GAP

    // Calculate move based on scrollTop
    // move = thumbTop / thumbHeight * 100
    // thumbTop = scrollTop / ratio
    // ratio = (scrollHeight - offsetHeight) / (offsetHeight - thumbHeight)
    
    // So move = (scrollTop / ratio) / thumbHeight * 100
    
    // But wait, I passed ratio to Thumb as (scrollHeight - offsetHeight) / (offsetHeight - thumbHeight)
    // So thumbTop = scrollTop / ratio
    
    if (ratioY.value > 0 && thumbHeight.value > 0) {
        moveY.value = ((wrap.value.scrollTop / ratioY.value) / thumbHeight.value) * 100
    }
    if (ratioX.value > 0 && thumbWidth.value > 0) {
        moveX.value = ((wrap.value.scrollLeft / ratioX.value) / thumbWidth.value) * 100
    }

    emits('scroll', {
      scrollTop: wrap.value.scrollTop,
      scrollLeft: wrap.value.scrollLeft,
    })
  }
}

const update = () => {
  if (!wrap.value) return
  const offsetHeight = wrap.value.offsetHeight - GAP
  const offsetWidth = wrap.value.offsetWidth - GAP

  const originalHeight = offsetHeight ** 2 / wrap.value.scrollHeight
  const originalWidth = offsetWidth ** 2 / wrap.value.scrollWidth
  const height = Math.max(originalHeight, props.minSize)
  const width = Math.max(originalWidth, props.minSize)
  
  thumbHeight.value = height
  thumbWidth.value = width

  // Calculate ratio
  // ratio = (scrollHeight - offsetHeight) / (offsetHeight - thumbHeight)
  
  const scrollHeight = wrap.value.scrollHeight
  const scrollWidth = wrap.value.scrollWidth
  
  if (scrollHeight > offsetHeight) {
      ratioY.value = (scrollHeight - offsetHeight) / (offsetHeight - height)
  } else {
      ratioY.value = 1 // Should be irrelevant as thumb is hidden
  }
  
  if (scrollWidth > offsetWidth) {
      ratioX.value = (scrollWidth - offsetWidth) / (offsetWidth - width)
  } else {
      ratioX.value = 1
  }

  sizeHeight.value = height + GAP < offsetHeight ? `${height}px` : ''
  sizeWidth.value = width + GAP < offsetWidth ? `${width}px` : ''
}

const GAP = 4 // The gap for scrollbar

provide(scrollbarContextKey, {
  wrapElement: wrap,
})

const addUnit = (value: string | number) => {
  if (typeof value === 'string') return value
  return `${value}px`
}

let resizeObserver: ResizeObserver | undefined

onMounted(() => {
  if (!props.native) {
    nextTick(() => {
      update()
    })
  }
  if (!props.noresize) {
    resizeObserver = new ResizeObserver(() => update())
    if (resize.value) resizeObserver.observe(resize.value)
    if (scrollbar.value) resizeObserver.observe(scrollbar.value)
  }
})

onUpdated(() => update())

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})

const setScrollTop = (value: number) => {
  if (!wrap.value) return
  wrap.value.scrollTop = value
}

const setScrollLeft = (value: number) => {
  if (!wrap.value) return
  wrap.value.scrollLeft = value
}

defineExpose({
  wrap,
  update,
  setScrollTop,
  setScrollLeft,
  handleScroll,
})
</script>
