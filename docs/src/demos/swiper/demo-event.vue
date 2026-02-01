<template>
  <div class="demo-swiper__event">
    <AmuSpace>
      <AmuButton @click="active = 0">第一张</AmuButton>
      <AmuButton @click="active = 1">第二张</AmuButton>
      <AmuButton @click="active = 2">第三张</AmuButton>
    </AmuSpace>

    <AmuSwiper v-model="active" @change="handleChange" height="260px">
      <AmuSwiperItem v-for="(_, index) in items" :key="index">
        <div class="demo-swiper__item">{{ index + 1 }}</div>
      </AmuSwiperItem>
    </AmuSwiper>

    <div class="demo-swiper__info">最近切换：{{ lastChange }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuButton } from 'amu-ui/button'
import { AmuSpace } from 'amu-ui/space'
import { AmuSwiper, AmuSwiperItem } from 'amu-ui/swiper'

const items = Array.from({ length: 3 })
const active = ref(0)
const lastChange = ref(0)

const handleChange = (index: number) => {
  lastChange.value = index
}
</script>

<style scoped>
.demo-swiper__event {
  display: flex;
  flex-direction: column;
  gap: 12px;
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


.demo-swiper__info {
  color: var(--amu-color-text-default);
}
</style>
