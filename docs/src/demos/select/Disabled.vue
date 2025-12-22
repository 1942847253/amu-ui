<template>
  <amu-space direction="vertical">
    <amu-select v-model="value1" disabled placeholder="Disabled Select">
      <amu-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </amu-select>
    <amu-select v-model="value2" placeholder="Disabled Option">
      <amu-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      />
    </amu-select>
  </amu-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')

const options = [
  { value: 'Option1', label: 'Option1' },
  { value: 'Option2', label: 'Option2', disabled: true },
  { value: 'Option3', label: 'Option3' },
]
</script>
