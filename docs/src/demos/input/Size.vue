<template>
  <AmuSpace direction="vertical">
    <AmuInput v-model="value1" size="large" placeholder="大尺寸" />
    <AmuInput v-model="value2" size="medium" placeholder="中等尺寸" />
    <AmuInput v-model="value3" size="small" placeholder="小尺寸" />
  </AmuSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuInput, AmuSpace } from 'amu-ui'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
</script>
