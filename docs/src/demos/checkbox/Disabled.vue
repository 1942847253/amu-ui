<template>
  <div class="demo-section">
    <amu-checkbox v-model="checked1">可用复选框</amu-checkbox>
    <amu-checkbox v-model="checked2" disabled>禁用未选中</amu-checkbox>
    <amu-checkbox v-model="checked3" disabled>禁用已选中</amu-checkbox>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuCheckbox } from 'amu-ui/checkbox'

const checked1 = ref(false)
const checked2 = ref(false)
const checked3 = ref(true)
</script>

<style scoped>
.demo-section {
  display: flex;
  gap: 20px;
  padding: 20px;
  flex-wrap: wrap;
}
</style>
