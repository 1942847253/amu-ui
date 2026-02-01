<template>
  <AmuSwiper indicator-trigger="hover" :show-arrows="false" height="260px">
    <AmuSwiperItem v-for="(_, index) in items" :key="index">
      <div class="demo-swiper__item">{{ index + 1 }}</div>
    </AmuSwiperItem>
    <template #indicator="{ active }">
      <span class="demo-swiper__dot" :class="{ 'is-active': active }"></span>
    </template>
  </AmuSwiper>
</template>

<script setup lang="ts">
import { AmuSwiper, AmuSwiperItem } from 'amu-ui/swiper'

const items = Array.from({ length: 3 })
</script>

<style scoped>
.demo-swiper__item {
  height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--amu-color-swiper-card);
  color: var(--amu-color-on-primary);
  border: 1px solid var(--amu-color-swiper-card);
  border-radius: 0;
  box-sizing: border-box;
}


.demo-swiper__dot {
  width: 8px;
  height: 4px;
  border-radius: 999px;
  background: var(--amu-color-text-disabled);
  display: inline-block;
  transition: width 0.2s ease, background 0.2s ease;
}

.demo-swiper__dot.is-active {
  width: 18px;
  background: var(--amu-color-on-primary);
}
</style>
