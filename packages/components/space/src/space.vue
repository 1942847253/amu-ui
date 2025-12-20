<template>
  <div class="amu-space" :class="[`amu-space--${direction}`]" :style="style">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'
import { spaceProps } from './props'
import './style.css'

defineOptions({
  name: 'AmuSpace',
})

const props = defineProps(spaceProps)

const gapSize = computed(() => {
  const { size } = props
  if (typeof size === 'number') {
    return `${size}px`
  }
  if (size === 'small') return '8px'
  if (size === 'default') return '12px'
  if (size === 'large') return '16px'
  return size
})

const style = computed<CSSProperties>(() => {
  return {
    gap: gapSize.value,
    alignItems: props.align,
    flexWrap: props.wrap ? 'wrap' : 'nowrap',
  }
})
</script>
