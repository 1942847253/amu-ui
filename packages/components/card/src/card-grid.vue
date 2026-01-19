<template>
  <div class="amu-card-grid" :class="{ 'amu-card-grid--hoverable': hoverable }">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { cardGridProps } from './props'

defineOptions({
  name: 'AmuCardGrid',
})

defineProps(cardGridProps)
</script>
