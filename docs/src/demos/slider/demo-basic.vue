<template>
  <div class="slider-demo-block">
    <span class="demonstration">默认值 (0)</span>
    <amu-slider v-model="value1" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">自定义初始值 (50)</span>
    <amu-slider v-model="value2" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">禁用状态</span>
    <amu-slider v-model="value3" disabled />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuSlider } from 'amu-ui/slider'

const value1 = ref(0)
const value2 = ref(50)
const value3 = ref(42)
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
