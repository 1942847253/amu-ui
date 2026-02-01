<template>
  <div class="demo-swiper">
    <AmuSwiper v-model="active" height="260px">
      <AmuSwiperItem v-for="(_, index) in items" :key="index">
        <div class="demo-swiper__item">{{ index + 1 }}</div>
      </AmuSwiperItem>
    </AmuSwiper>
    <div class="demo-swiper__info">当前索引：{{ active }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuSwiper, AmuSwiperItem } from 'amu-ui/swiper'

const items = Array.from({ length: 3 })
const active = ref(0)
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


.demo-swiper__info {
  margin-top: 12px;
  color: var(--amu-color-text-default);
}
</style>
