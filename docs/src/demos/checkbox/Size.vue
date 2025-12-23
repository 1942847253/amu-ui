<template>
  <div class="demo-section">
    <div class="size-group">
      <h4>小尺寸</h4>
      <amu-checkbox v-model="checked1" size="small">Small</amu-checkbox>
    </div>
    <div class="size-group">
      <h4>中尺寸（默认）</h4>
      <amu-checkbox v-model="checked2" size="medium">Medium</amu-checkbox>
    </div>
    <div class="size-group">
      <h4>大尺寸</h4>
      <amu-checkbox v-model="checked3" size="large">Large</amu-checkbox>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuCheckbox } from 'amu-ui/checkbox'

const checked1 = ref(true)
const checked2 = ref(true)
const checked3 = ref(true)
</script>

<style scoped>
.demo-section {
  display: flex;
  gap: 40px;
  padding: 20px;
  flex-wrap: wrap;
}

.size-group h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: var(--amu-text-color-secondary);
}
</style>
