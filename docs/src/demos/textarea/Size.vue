<template>
  <AmuSpace direction="vertical" style="width: 100%">
    <AmuTextarea v-model="value1" size="small" placeholder="Small size" />
    <AmuTextarea v-model="value2" size="medium" placeholder="Medium size (Default)" />
    <AmuTextarea v-model="value3" size="large" placeholder="Large size" />
  </AmuSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuTextarea, AmuSpace } from 'amu-ui'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
</script>
