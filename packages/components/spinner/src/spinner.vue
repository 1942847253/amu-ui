<template>
  <span class="amu-spinner" aria-hidden="true" :style="spinnerStyle"></span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import './style.css'

defineOptions({
  name: 'AmuSpinner'
})

const props = defineProps({
  size: {
    type: [Number, String],
    default: undefined
  }
})

const spinnerStyle = computed(() => {
  if (!props.size) return {}
  const sizeVal = typeof props.size === 'number' ? `${props.size}px` : props.size
  return {
    fontSize: sizeVal
  }
})
</script>
