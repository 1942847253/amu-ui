<template>
  <footer
    class="amu-layout-footer"
    :data-amu-theme="themeAttr"
    :style="footerStyle"
  >
    <slot />
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { footerProps } from './props'

defineOptions({
  name: 'AmuFooter'
})

const props = defineProps(footerProps)

const themeAttr = computed(() => {
  return props.theme === 'dark' ? 'dark' : undefined
})

const footerStyle = computed(() => {
  if (!props.height) return undefined
  
  const height = typeof props.height === 'number' 
    ? `${props.height}px` 
    : props.height
  
  return { height }
})
</script>
