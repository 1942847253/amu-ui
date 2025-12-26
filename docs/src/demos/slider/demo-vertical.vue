<template>
  <div class="slider-demo-block">
    <amu-slider v-model="value" vertical style="height: 200px;" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuSlider } from 'amu-ui/slider'

const value = ref(30)
</script>

<style scoped>
.slider-demo-block {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}
</style>
