<template>
  <amu-space direction="vertical">
    <amu-select v-model="value1" placeholder="Small" size="small">
      <amu-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </amu-select>
    <amu-select v-model="value2" placeholder="Default">
      <amu-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </amu-select>
    <amu-select v-model="value3" placeholder="Large" size="large">
      <amu-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </amu-select>
  </amu-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')

const options = [
  { value: 'Option1', label: 'Option1' },
  { value: 'Option2', label: 'Option2' },
  { value: 'Option3', label: 'Option3' },
]
</script>
