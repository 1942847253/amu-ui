<template>
  <ASelect v-model="size" :options="options"></ASelect>
  <ASpace align="center"  style="margin-top: 20px;" :size="size">
    <span>{{ size }}:</span>
    <AButton>Default</AButton>
    <AButton type="primary">Primary</AButton>
    <AButton type="error">Error</AButton>
    <AButton type="warning">Warning</AButton>
    <AButton type="info">Info</AButton>
  </ASpace>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const size = ref('small')

const options = [
  {
    text: 'Small',
    value: 'small'
  },
  {
    text: 'Default',
    value: 'default'
  },
  {
    text: 'Large',
    value: 'large'
  },
]
</script>
