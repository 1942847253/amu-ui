<template>
  <header
    class="amu-layout-header"
    :style="headerStyle"
  >
    <slot />
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { headerProps } from './props'

defineOptions({
  name: 'AmuHeader'
})

const props = defineProps(headerProps)

const headerStyle = computed(() => {
  if (!props.height) return undefined
  
  const height = typeof props.height === 'number' 
    ? `${props.height}px` 
    : props.height
  
  return { height }
})
</script>
