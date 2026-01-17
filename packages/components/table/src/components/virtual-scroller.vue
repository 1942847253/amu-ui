<template>
  <div 
    class="amu-table__virtual-scroller" 
    :style="scrollerStyle"
  >
    <AmuScrollbar 
      ref="scrollerRef" 
      @scroll="onScroll" 
      :style="{ height: '100%' }"
      :view-style="{ position: 'relative' }"
    >
        <div class="amu-table__virtual-phantom" :style="phantomStyle"></div>
        <div class="amu-table__virtual-content" :style="contentStyle">
          <slot :data="visibleData"></slot>
        </div>
    </AmuScrollbar>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, watch, onBeforeUnmount } from 'vue'
import { AmuScrollbar } from '../../../scrollbar'

const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  },
  itemHeight: {
    type: Number,
    default: 50
  },
  buffer: {
    type: Number,
    default: 5
  },
  enabled: {
    type: Boolean,
    default: false
  }
})

const scrollerRef = ref<InstanceType<typeof AmuScrollbar> | null>(null)
const scrollTop = ref(0)
const viewportHeight = ref(0)

const scrollerStyle = computed(() => {
  return {
    height: '100%',
    // overflowY: 'auto',  // Managed by AmuScrollbar
    position: 'relative' as const
  }
})

// 总高度（Phantom）
const totalHeight = computed(() => props.items.length * props.itemHeight)

const phantomStyle = computed(() => ({
  height: props.enabled ? `${totalHeight.value}px` : 'auto',
  width: '100%',
  position: 'relative' as const, // Must be in flow to stretch scrollbar view
  zIndex: -1
}))

// 可视区域计算
const visibleRange = computed(() => {
  if (!props.enabled) {
    return { start: 0, end: props.items.length }
  }
  
  const rawStart = Math.floor(scrollTop.value / props.itemHeight)
  const visibleCount = Math.ceil(viewportHeight.value / props.itemHeight)
  
  const start = Math.max(0, rawStart - props.buffer)
  const end = Math.min(props.items.length, rawStart + visibleCount + props.buffer)
  
  return { start, end }
})

// 可视数据
const visibleData = computed(() => {
  if (!props.enabled) return props.items
  return props.items.slice(visibleRange.value.start, visibleRange.value.end).map((item, index) => ({
    item,
    index: visibleRange.value.start + index
  }))
})

// 内容偏移
const offsetY = computed(() => {
  if (!props.enabled) return 0
  return visibleRange.value.start * props.itemHeight
})

const contentStyle = computed(() => ({
  transform: `translateY(${offsetY.value}px)`,
  position: 'absolute' as const,
  left: 0,
  top: 0,
  width: '100%' // Ensure it takes full width of container
}))

const emit = defineEmits(['scroll'])
// Resize Observer
let resizeObserver: ResizeObserver | null = null

const onScroll = (e: any) => {
  if (!props.enabled) return
  // AmuScrollbar emits { scrollTop, scrollLeft }
  scrollTop.value = e.scrollTop
  emit('scroll', e)
}

// Expose scrollbar wrap for Table to handle shadows
defineExpose({
    wrap: computed(() => scrollerRef.value?.wrap)
})

onMounted(() => {
  if (scrollerRef.value) {
    const wrap = scrollerRef.value.wrap
    if (wrap) {
        viewportHeight.value = wrap.clientHeight
        
        // Observe resize
        resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                viewportHeight.value = entry.contentRect.height
            }
        })
        resizeObserver.observe(wrap)
    }
  }
})

// Cleanup
onBeforeUnmount(() => {
    if (resizeObserver) {
        resizeObserver.disconnect()
    }
})

// 如果不是虚拟滚动，content应该就是普通流
// 上面的 contentStyle position absolute 可能会破坏普通流，修正一下
// 当 enabled=false 时，phantom 和 content 的样式应该回归普通
</script>

<style scoped>
.amu-table__virtual-scroller {
  /* 必须有高度才能虚拟滚动，由外部样式决定 */
}
</style>
