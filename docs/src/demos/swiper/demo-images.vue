<template>
  <AmuSwiper height="300px" autoplay :interval="3500" loop>
    <AmuSwiperItem v-for="(item, index) in images" :key="index">
      <img class="demo-swiper__image" :src="item" alt="示例图片" />
    </AmuSwiperItem>
  </AmuSwiper>
</template>

<script setup lang="ts">
import { AmuSwiper, AmuSwiperItem } from 'amu-ui/swiper'

const images = [
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=80'
]
</script>

<style scoped>
.demo-swiper__image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
}
</style>
