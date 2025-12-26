<template>
  <div class="slider-demo-block">
    <amu-slider v-model="value" show-input />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuSlider } from 'amu-ui/slider'

const value = ref(0)
</script>

<style scoped>
.slider-demo-block {
  padding: 20px 0;
}
</style>
