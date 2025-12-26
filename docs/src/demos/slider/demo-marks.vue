<template>
  <div class="slider-demo-block">
    <amu-slider v-model="value" :marks="marks" :min="0" :max="100" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { AmuSlider } from 'amu-ui/slider'

const value = ref(37)
const marks = reactive({
  0: '0°C',
  37: '37°C',
  100: '100°C'
})
</script>

<style scoped>
.slider-demo-block {
  padding: 20px 0;
  margin-bottom: 40px; /* Leave space for marks */
}
</style>
