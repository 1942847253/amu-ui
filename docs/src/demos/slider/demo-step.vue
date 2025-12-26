<template>
  <div class="slider-demo-block">
    <span class="demonstration">步长为 10</span>
    <amu-slider v-model="value1" :step="10" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">步长为 10 (显示断点)</span>
    <amu-slider v-model="value2" :step="10" show-stops />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuSlider } from 'amu-ui/slider'

const value1 = ref(0)
const value2 = ref(0)
</script>

<style scoped>
.slider-demo-block {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}
.slider-demo-block .demonstration {
  font-size: 14px;
  color: var(--amu-color-text-default);
  margin-right: 16px;
  width: 120px;
  flex-shrink: 0;
}
.slider-demo-block .amu-slider {
  flex: 1;
}
</style>
