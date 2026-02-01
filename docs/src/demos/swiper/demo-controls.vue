<template>
  <div class="demo-swiper__panel">
    <AmuSpace>
      <div class="demo-swiper__control">
        <span class="demo-swiper__label">自动播放</span>
        <AmuSwitch v-model="autoplay" />
      </div>
      <div class="demo-swiper__control">
        <span class="demo-swiper__label">循环</span>
        <AmuSwitch v-model="loop" />
      </div>
      <div class="demo-swiper__control">
        <span class="demo-swiper__label">显示箭头</span>
        <AmuSwitch v-model="showArrows" />
      </div>
      <div class="demo-swiper__control">
        <span class="demo-swiper__label">显示指示器</span>
        <AmuSwitch v-model="showIndicators" />
      </div>
    </AmuSpace>
    <AmuRadioGroup v-model="direction">
      <AmuRadio label="horizontal">水平</AmuRadio>
      <AmuRadio label="vertical">垂直</AmuRadio>
    </AmuRadioGroup>

    <AmuSwiper
      v-model="active"
      :autoplay="autoplay"
      :loop="loop"
      :show-arrows="showArrows"
      :show-indicators="showIndicators"
      :direction="direction"
      height="260px"
    >
      <AmuSwiperItem v-for="(_, index) in items" :key="index">
        <div class="demo-swiper__item">{{ index + 1 }}</div>
      </AmuSwiperItem>
    </AmuSwiper>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuRadio, AmuRadioGroup } from 'amu-ui/radio'
import { AmuSpace } from 'amu-ui/space'
import { AmuSwitch } from 'amu-ui/switch'
import { AmuSwiper, AmuSwiperItem } from 'amu-ui/swiper'

const items = Array.from({ length: 4 })
const active = ref(0)
const autoplay = ref(true)
const loop = ref(true)
const showArrows = ref(true)
const showIndicators = ref(true)
const direction = ref<'horizontal' | 'vertical'>('horizontal')
</script>

<style scoped>
.demo-swiper__panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.demo-swiper__control {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.demo-swiper__label {
  color: var(--amu-color-text-default);
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
