<template>
  <amu-select v-model="value" placeholder="Select">
    <amu-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
      <div style="display: flex; justify-content: space-between; align-items: center">
        <span>{{ item.label }}</span>
        <span style="color: var(--amu-color-text-disabled); font-size: 12px">{{ item.value }}</span>
      </div>
    </amu-option>
  </amu-select>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')

const options = [
  { value: 'Beijing', label: 'Beijing' },
  { value: 'Shanghai', label: 'Shanghai' },
  { value: 'Nanjing', label: 'Nanjing' },
  { value: 'Chengdu', label: 'Chengdu' },
]
</script>
