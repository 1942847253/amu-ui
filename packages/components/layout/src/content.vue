<template>
  <main class="amu-layout-content">
    <slot />
  </main>
</template>

<script setup lang="ts">
import { contentProps } from './props'

defineOptions({
  name: 'AmuContent'
})

defineProps(contentProps)
</script>
