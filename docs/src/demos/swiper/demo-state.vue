<template>
  <div class="demo-swiper__stack">
    <AmuSwiper disabled height="260px">
      <AmuSwiperItem v-for="(_, index) in items" :key="index">
        <div class="demo-swiper__item">{{ index + 1 }}</div>
      </AmuSwiperItem>
    </AmuSwiper>

    <AmuSwiper loading loading-text="数据加载中" height="260px">
      <AmuSwiperItem v-for="(_, index) in items" :key="index">
        <div class="demo-swiper__item">{{ index + 1 }}</div>
      </AmuSwiperItem>
    </AmuSwiper>
  </div>
</template>

<script setup lang="ts">
import { AmuSwiper, AmuSwiperItem } from 'amu-ui/swiper'

const items = Array.from({ length: 3 })
</script>

<style scoped>
.demo-swiper__stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

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

</style>
