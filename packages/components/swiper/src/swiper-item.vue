<template>
  <div class="amu-swiper__item">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { swiperItemProps } from './props'

defineOptions({ name: 'AmuSwiperItem' })

defineProps(swiperItemProps)
</script>
