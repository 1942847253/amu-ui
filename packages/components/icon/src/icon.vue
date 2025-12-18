<template>
  <span
    :class="['amu-icon', { 'amu-icon--spin': spin }]"
    :style="iconStyle"
    role="img"
    aria-hidden="true"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { iconProps } from './props'
import './style.css'

defineOptions({
  name: 'AmuIcon',
})

const props = defineProps(iconProps)

const iconStyle = computed(() => {
  const size = typeof props.size === 'number' ? `${props.size}px` : props.size
  const color = props.color.startsWith('--') 
    ? `var(${props.color})` 
    : props.color
  
  return {
    width: size,
    height: size,
    fontSize: size,
    color: color,
    strokeWidth: props.strokeWidth,
  }
})
</script>
