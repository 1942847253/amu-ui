<template>
  <AmuSpace direction="vertical">
    <AmuInput v-model="value1" variant="outline" placeholder="Outline (默认)" />
    <AmuInput v-model="value2" variant="filled" placeholder="Filled" />
  </AmuSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuInput, AmuSpace } from 'amu-ui'

const value1 = ref('')
const value2 = ref('')
</script>
